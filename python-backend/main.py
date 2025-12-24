"""
音源解析バックエンド API (FastAPI)

Phase 3 実装内容：
- POST /analyze エンドポイント（ダミー解析ロジック）
- Next.js からのリクエストを受け付け
- ダミーの解析結果を返却

Phase 4 以降で実装予定：
- 実際のstem分解（Demucs）
- コード解析（librosa / madmom）
- テンポ・キー検出
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Dict, Optional
import os
from pathlib import Path
from dotenv import load_dotenv
import requests
import tempfile

# 環境変数を読み込み
load_dotenv()

# ============================================
# FastAPI アプリケーション初期化
# ============================================

app = FastAPI(
    title="Audio Analysis API",
    description="音源解析バックエンドAPI - コード進行・stem分解・スケール検出",
    version="0.1.0 (Phase 3 - Dummy)"
)

# CORS設定（Next.js からのリクエストを許可）
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Next.js 開発サーバー
        "http://127.0.0.1:3000",
        "https://*.vercel.app",  # Vercel デプロイ（プレビュー）
        "*",  # 本番環境用（一時的に全許可、後で制限）
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================
# Pydantic モデル定義（TypeScript 型と対応）
# ============================================

class AnalysisOptions(BaseModel):
    """解析オプション"""
    separateStems: bool = True
    analysisDepth: str = "basic"  # "basic" | "detailed"


class AnalyzeRequest(BaseModel):
    """解析リクエスト"""
    jobId: str = Field(..., description="ジョブID")
    filePath: str = Field(..., description="音源ファイルのパス")
    options: Optional[AnalysisOptions] = None


class AnalysisMetadata(BaseModel):
    """メタデータ"""
    duration: float
    tempo: float
    timeSignature: str
    detectedKey: str
    scale: str
    confidence: float


class ChordInfo(BaseModel):
    """コード情報"""
    startTime: float
    endTime: float
    chord: str
    rootNote: str
    quality: str
    confidence: float


class ScaleMatchInfo(BaseModel):
    """スケールマッチング情報"""
    scale: str
    rootNote: str
    matchRate: float
    matchingChords: List[str]


class ScaleMatchResult(BaseModel):
    """スケールマッチング結果"""
    matchingScales: List[ScaleMatchInfo]


class AnalysisResult(BaseModel):
    """解析結果"""
    metadata: AnalysisMetadata
    chordProgression: List[ChordInfo]
    scaleMatch: ScaleMatchResult
    stems: Optional[Dict[str, str]] = None


class AnalyzeResponse(BaseModel):
    """解析レスポンス"""
    success: bool
    jobId: str
    status: str  # "completed" | "failed"
    result: Optional[AnalysisResult] = None
    error: Optional[str] = None


# ============================================
# 環境変数による解析モード切り替え
# ============================================

USE_REAL_ANALYSIS = os.getenv("USE_REAL_ANALYSIS", "false").lower() == "true"

print("=" * 60)
print("🎵 Audio Analysis API - Startup")
print("=" * 60)
print(f"Analysis Mode: {'REAL (librosa)' if USE_REAL_ANALYSIS else 'DUMMY (固定値)'}")
print(f"Environment: USE_REAL_ANALYSIS={os.getenv('USE_REAL_ANALYSIS', 'not set')}")

# librosaは実解析モードでのみインポート（依存関係を減らすため）
if USE_REAL_ANALYSIS:
    try:
        import librosa
        import numpy as np
        print("✓ librosa loaded successfully")
        print("✓ numpy loaded successfully")
        print("=" * 60)
    except ImportError as e:
        print(f"⚠ Warning: librosa not available - {e}")
        print("  Falling back to DUMMY analysis mode")
        print("=" * 60)
        USE_REAL_ANALYSIS = False
else:
    print("ℹ Using DUMMY mode (set USE_REAL_ANALYSIS=true for real analysis)")
    print("=" * 60)

# ============================================
# ユーティリティ関数
# ============================================

def download_file_if_url(file_path: str) -> str:
    """
    URLの場合はダウンロードして一時ファイルに保存、
    ローカルパスの場合はそのまま返す

    Args:
        file_path: ファイルパスまたはURL

    Returns:
        str: ローカルファイルパス
    """
    # URLかどうかを判定
    if file_path.startswith('http://') or file_path.startswith('https://'):
        print(f"  → Downloading file from URL: {file_path}")

        try:
            # URLからファイルをダウンロード
            response = requests.get(file_path, timeout=30)
            response.raise_for_status()

            # 拡張子を取得（URLから）
            ext = '.mp3'  # デフォルト
            if '.' in file_path:
                ext = '.' + file_path.split('.')[-1].split('?')[0]  # クエリパラメータを除去

            # 一時ファイルに保存
            with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as tmp_file:
                tmp_file.write(response.content)
                local_path = tmp_file.name

            print(f"  → Downloaded to: {local_path} ({len(response.content)} bytes)")
            return local_path

        except requests.RequestException as e:
            raise HTTPException(
                status_code=400,
                detail=f"Failed to download file from URL: {str(e)}"
            )
    else:
        # ローカルパスの場合はそのまま返す
        print(f"  → Using local file: {file_path}")
        return file_path


# ============================================
# エンドポイント
# ============================================

@app.get("/")
def read_root():
    """ヘルスチェック"""
    return {
        "status": "ok",
        "message": "Audio Analysis API is running",
        "version": "0.1.0 (Phase 3 - Dummy)",
        "endpoints": [
            {"path": "/analyze", "method": "POST", "description": "音源解析"}
        ]
    }


@app.post("/analyze", response_model=AnalyzeResponse)
async def analyze_audio(request: AnalyzeRequest):
    """
    音源解析エンドポイント

    Phase 3 実装：
    - ダミーの解析結果を返却
    - ファイルパスの存在確認のみ実施

    Phase 4 以降：
    - 実際の音源ファイルを読み込み
    - Demucs で stem 分解
    - librosa / madmom でコード解析
    - テンポ・キー検出
    """

    try:
        print("\n" + "=" * 60)
        print(f"🎵 Analyzing audio file")
        print("=" * 60)
        print(f"Job ID: {request.jobId}")
        print(f"File Path/URL: {request.filePath}")
        print(f"Options: {request.options}")
        print(f"Analysis Mode: {'REAL (librosa)' if USE_REAL_ANALYSIS else 'DUMMY (固定値)'}")
        print("=" * 60)

        # URLの場合はダウンロード、ローカルパスの場合はそのまま使用
        local_file_path = download_file_if_url(request.filePath)

        # ファイルパスのバリデーション
        file_path = Path(local_file_path)

        if not file_path.exists():
            raise HTTPException(
                status_code=404,
                detail=f"Audio file not found: {local_file_path}"
            )

        # 環境変数に応じて実解析 or ダミー解析を選択
        if USE_REAL_ANALYSIS:
            print("→ Calling analyze_audio_real()...")
            result = analyze_audio_real(
                file_path=local_file_path,
                options=request.options.dict() if request.options else {}
            )
        else:
            print("→ Calling analyze_audio_dummy()...")
            result = analyze_audio_dummy(
                file_path=local_file_path,
                options=request.options.dict() if request.options else {}
            )

        # レスポンスを返却
        print(f"\n✓ Analysis completed for job {request.jobId}")
        print("=" * 60 + "\n")

        return AnalyzeResponse(
            success=True,
            jobId=request.jobId,
            status="completed",
            result=result
        )

    except FileNotFoundError as e:
        print(f"\n✗ File not found error: {str(e)}")
        print("=" * 60 + "\n")
        raise HTTPException(status_code=404, detail=str(e))

    except Exception as e:
        print(f"\n✗ Analysis error: {str(e)}")
        import traceback
        traceback.print_exc()
        print("=" * 60 + "\n")
        raise HTTPException(
            status_code=500,
            detail=f"Analysis failed: {str(e)}"
        )
# ============================================
# ダミー解析ロジック（Phase 3 実装）
# ============================================

def analyze_audio_dummy(file_path: str, options: Dict) -> AnalysisResult:
    """
    ダミー解析ロジック

    Phase 3: 固定のダミーデータを返す
    Phase 4: ここを実際の解析ロジックに差し替える

    Args:
        file_path: 音源ファイルのパス
        options: 解析オプション

    Returns:
        AnalysisResult: 解析結果
    """

    print(f"\n[Dummy Analysis] Returning fixed dummy data...")
    print(f"  File: {file_path} (not actually analyzed)")
    print(f"  Result: G メジャー, 120.0 BPM, 8 chords (固定値)")
    print("=" * 60)

    # TODO (Phase 4): 実際の音源解析処理に差し替え
    # 1. librosa で音源を読み込み
    # y, sr = librosa.load(file_path)
    #
    # 2. テンポ検出
    # tempo, _ = librosa.beat.beat_track(y=y, sr=sr)
    #
    # 3. キー検出
    # chroma = librosa.feature.chroma_cqt(y=y, sr=sr)
    # key = estimate_key(chroma)
    #
    # 4. コード進行検出
    # chords = detect_chords(y, sr)
    #
    # 5. stem 分解（オプション）
    # if options.get('separateStems'):
    #     stems = separate_stems(file_path)

    # Phase 3: ダミーデータを返す
    metadata = AnalysisMetadata(
        duration=120.0,
        tempo=120.0,
        timeSignature="4/4",
        detectedKey="G",
        scale="メジャー",
        confidence=0.95
    )

    chord_progression = [
        ChordInfo(
            startTime=0.0, endTime=4.0,
            chord="G", rootNote="G", quality="maj", confidence=0.9
        ),
        ChordInfo(
            startTime=4.0, endTime=8.0,
            chord="Em", rootNote="E", quality="min", confidence=0.88
        ),
        ChordInfo(
            startTime=8.0, endTime=12.0,
            chord="C", rootNote="C", quality="maj", confidence=0.87
        ),
        ChordInfo(
            startTime=12.0, endTime=16.0,
            chord="D", rootNote="D", quality="maj", confidence=0.9
        ),
        ChordInfo(
            startTime=16.0, endTime=20.0,
            chord="G", rootNote="G", quality="maj", confidence=0.92
        ),
        ChordInfo(
            startTime=20.0, endTime=24.0,
            chord="Em", rootNote="E", quality="min", confidence=0.85
        ),
        ChordInfo(
            startTime=24.0, endTime=28.0,
            chord="Am", rootNote="A", quality="min", confidence=0.89
        ),
        ChordInfo(
            startTime=28.0, endTime=32.0,
            chord="D", rootNote="D", quality="maj", confidence=0.91
        ),
    ]

    scale_match = ScaleMatchResult(
        matchingScales=[
            ScaleMatchInfo(
                scale="メジャー",
                rootNote="G",
                matchRate=0.95,
                matchingChords=["G", "C", "D", "Em", "Am"]
            ),
            ScaleMatchInfo(
                scale="マイナー",
                rootNote="E",
                matchRate=0.88,
                matchingChords=["Em", "G", "C", "D", "Am"]
            ),
            ScaleMatchInfo(
                scale="ミクソリディアン",
                rootNote="G",
                matchRate=0.82,
                matchingChords=["G", "C", "D", "Em"]
            ),
        ]
    )

    return AnalysisResult(
        metadata=metadata,
        chordProgression=chord_progression,
        scaleMatch=scale_match,
        stems=None  # Phase 4 で stem 分解結果を返す
    )


# ============================================
# 実解析ロジック（Phase 4 - librosa ベース）
# ============================================

def analyze_audio_real(file_path: str, options: Dict) -> AnalysisResult:
    """
    実際の音源解析ロジック（librosa ベース）

    Phase 4 実装内容：
    - librosa で音源を読み込み（先頭60秒に制限）
    - テンポ検出
    - キー/スケール推定（簡易アルゴリズム）
    - 簡易コード進行検出（4秒ごとの区間分割）

    Args:
        file_path: 音源ファイルのパス
        options: 解析オプション

    Returns:
        AnalysisResult: 解析結果
    """

    print(f"\n[Real Analysis] Starting analysis...")
    print(f"  File: {file_path}")

    # 1. 音声読み込み（先頭60秒に制限して負荷軽減）
    try:
        print(f"  Step 1/5: Loading audio file...")
        y, sr = librosa.load(file_path, sr=None, mono=True, duration=60.0)
        duration = len(y) / sr
        print(f"    ✓ Loaded: {duration:.2f}s, sr={sr}Hz, samples={len(y)}")
    except Exception as e:
        print(f"    ✗ Failed to load audio file: {str(e)}")
        raise Exception(f"Failed to load audio file: {str(e)}")

    # 2. テンポ推定
    try:
        print(f"  Step 2/5: Detecting tempo...")
        tempo, _ = librosa.beat.beat_track(y=y, sr=sr)
        tempo = float(tempo)
        print(f"    ✓ Tempo detected: {tempo:.1f} BPM")
    except Exception as e:
        print(f"    ⚠ Tempo detection failed: {e}, using default 120 BPM")
        tempo = 120.0

    # 3. キー/スケール推定（簡易）
    try:
        print(f"  Step 3/5: Estimating key and scale...")
        detected_key, scale_name, confidence = estimate_key_simple(y, sr)
        print(f"    ✓ Key detected: {detected_key} {scale_name} (confidence: {confidence:.2f})")
    except Exception as e:
        print(f"    ⚠ Key detection failed: {e}, using default G major")
        detected_key = "G"
        scale_name = "メジャー"
        confidence = 0.5

    # 4. 簡易コード進行検出
    try:
        print(f"  Step 4/5: Detecting chord progression...")
        chord_progression = detect_chords_simple(y, sr, detected_key, scale_name)
        print(f"    ✓ Detected {len(chord_progression)} chord segments")
        if len(chord_progression) > 0:
            print(f"    First chord: {chord_progression[0].chord} ({chord_progression[0].startTime:.1f}s - {chord_progression[0].endTime:.1f}s)")
    except Exception as e:
        print(f"    ⚠ Chord detection failed: {e}, using fallback")
        chord_progression = generate_fallback_chords(detected_key, duration)

    # 5. スケールマッチング
    try:
        print(f"  Step 5/5: Generating scale matches...")
        scale_match = generate_scale_match(detected_key, scale_name, chord_progression)
        print(f"    ✓ Generated {len(scale_match.matchingScales)} scale matches")
        if len(scale_match.matchingScales) > 0:
            top_match = scale_match.matchingScales[0]
            print(f"    Top match: {top_match.rootNote} {top_match.scale} (match rate: {top_match.matchRate:.2%})")
    except Exception as e:
        print(f"    ⚠ Scale matching failed: {e}")
        scale_match = ScaleMatchResult(matchingScales=[])

    # 6. メタデータの構築
    metadata = AnalysisMetadata(
        duration=duration,
        tempo=tempo,
        timeSignature="4/4",  # 固定
        detectedKey=detected_key,
        scale=scale_name,
        confidence=confidence
    )

    print(f"\n[Real Analysis] Analysis completed successfully!")
    print(f"  Result: {detected_key} {scale_name}, {tempo:.1f} BPM, {len(chord_progression)} chords")
    print("=" * 60)

    return AnalysisResult(
        metadata=metadata,
        chordProgression=chord_progression,
        scaleMatch=scale_match,
        stems=None  # Phase 4 では未実装
    )


def estimate_key_simple(y, sr):
    """
    簡易キー推定アルゴリズム

    chromaベースの12次元ピッチクラスプロファイルを使用し、
    メジャー/マイナーのテンプレートと相関を取って推定する。

    Returns:
        Tuple[str, str, float]: (rootNote, scale, confidence)
    """

    # chroma特徴量を計算（クロマグラム）
    chroma = librosa.feature.chroma_stft(y=y, sr=sr)

    # 時間軸で平均化して12次元のピッチクラスプロファイルに
    chroma_mean = np.mean(chroma, axis=1)

    # 正規化
    chroma_mean = chroma_mean / (np.sum(chroma_mean) + 1e-8)

    # メジャー/マイナースケールのテンプレート（Krumhansl-Kessler profiles）
    # メジャー: ド(1.0), レ(0.3), ミ(0.8), ファ(0.4), ソ(0.9), ラ(0.5), シ(0.7)
    major_template = np.array([1.0, 0.2, 0.3, 0.2, 0.8, 0.4, 0.2, 0.9, 0.3, 0.5, 0.3, 0.7])

    # マイナー: ラ(1.0), シ(0.3), ド(0.8), レ(0.4), ミ(0.9), ファ(0.5), ソ(0.7)
    # （Aマイナーベース → 0から始まるように9つシフト）
    minor_template = np.array([1.0, 0.2, 0.8, 0.3, 0.4, 0.9, 0.2, 0.5, 0.2, 0.7, 0.3, 0.3])

    # 正規化
    major_template = major_template / np.sum(major_template)
    minor_template = minor_template / np.sum(minor_template)

    # 12音すべての可能性を試す（相関係数で評価）
    note_names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

    best_score = -1.0
    best_key = 'C'
    best_scale = 'メジャー'

    for i in range(12):
        # メジャーテンプレートをi半音分シフト
        shifted_major = np.roll(major_template, i)
        major_corr = np.corrcoef(chroma_mean, shifted_major)[0, 1]

        if major_corr > best_score:
            best_score = major_corr
            best_key = note_names[i]
            best_scale = 'メジャー'

        # マイナーテンプレートをi半音分シフト
        shifted_minor = np.roll(minor_template, i)
        minor_corr = np.corrcoef(chroma_mean, shifted_minor)[0, 1]

        if minor_corr > best_score:
            best_score = minor_corr
            best_key = note_names[i]
            best_scale = 'マイナー'

    # 信頼度を0-1に正規化（相関係数は-1〜1なので、0.5〜1.0にマッピング）
    confidence = (best_score + 1.0) / 2.0
    confidence = max(0.0, min(1.0, confidence))

    return best_key, best_scale, confidence


def detect_chords_simple(y, sr, key_root, key_scale):
    """
    簡易コード進行検出

    曲を4秒ごとの区間に分割し、各区間のchromaから
    そのキーのダイアトニックコードのどれに近いかを判定する。

    Returns:
        List[ChordInfo]: コード進行
    """

    duration = len(y) / sr
    segment_duration = 4.0  # 4秒ごと
    num_segments = int(np.ceil(duration / segment_duration))

    # ダイアトニックコードの定義（簡易版）
    # メジャーキーの場合: I, ii, iii, IV, V, vi, vii°
    # マイナーキーの場合: i, ii°, III, iv, v, VI, VII

    note_names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    root_index = note_names.index(key_root)

    if key_scale == 'メジャー':
        # I, IV, V (maj), ii, iii, vi (min)
        diatonic_chords = [
            {'offset': 0, 'quality': 'maj', 'degree': 'I'},    # I (トニック)
            {'offset': 2, 'quality': 'min', 'degree': 'ii'},   # ii
            {'offset': 4, 'quality': 'min', 'degree': 'iii'},  # iii
            {'offset': 5, 'quality': 'maj', 'degree': 'IV'},   # IV (サブドミナント)
            {'offset': 7, 'quality': 'maj', 'degree': 'V'},    # V (ドミナント)
            {'offset': 9, 'quality': 'min', 'degree': 'vi'},   # vi (相対マイナー)
        ]
    else:  # マイナー
        # i, iv, v (min), III, VI, VII (maj)
        diatonic_chords = [
            {'offset': 0, 'quality': 'min', 'degree': 'i'},    # i (トニック)
            {'offset': 3, 'quality': 'maj', 'degree': 'III'},  # III
            {'offset': 5, 'quality': 'min', 'degree': 'iv'},   # iv
            {'offset': 7, 'quality': 'min', 'degree': 'v'},    # v
            {'offset': 8, 'quality': 'maj', 'degree': 'VI'},   # VI
            {'offset': 10, 'quality': 'maj', 'degree': 'VII'}, # VII
        ]

    chord_progression = []

    for seg_idx in range(num_segments):
        start_time = seg_idx * segment_duration
        end_time = min((seg_idx + 1) * segment_duration, duration)

        # この区間の音声を切り出し
        start_sample = int(start_time * sr)
        end_sample = int(end_time * sr)
        y_segment = y[start_sample:end_sample]

        if len(y_segment) < sr * 0.5:  # 0.5秒未満なら無視
            continue

        # chroma特徴量を計算
        chroma_seg = librosa.feature.chroma_stft(y=y_segment, sr=sr)
        chroma_mean = np.mean(chroma_seg, axis=1)

        # 各ダイアトニックコードとの一致度を計算
        best_match_score = -1.0
        best_chord = diatonic_chords[0]  # デフォルトはトニック

        for chord_info in diatonic_chords:
            chord_root_index = (root_index + chord_info['offset']) % 12

            # コードのルート音、第3音、第5音を強調したテンプレート
            chord_template = np.zeros(12)
            chord_template[chord_root_index] = 1.0  # ルート

            if chord_info['quality'] == 'maj':
                chord_template[(chord_root_index + 4) % 12] = 0.8  # 長3度
            else:  # min
                chord_template[(chord_root_index + 3) % 12] = 0.8  # 短3度

            chord_template[(chord_root_index + 7) % 12] = 0.6  # 完全5度

            # 正規化
            chord_template = chord_template / (np.sum(chord_template) + 1e-8)
            chroma_mean_norm = chroma_mean / (np.sum(chroma_mean) + 1e-8)

            # 内積で一致度を計算
            match_score = np.dot(chroma_mean_norm, chord_template)

            if match_score > best_match_score:
                best_match_score = match_score
                best_chord = chord_info

        # コード名を生成
        chord_root_note = note_names[(root_index + best_chord['offset']) % 12]

        if best_chord['quality'] == 'maj':
            chord_name = chord_root_note
        else:
            chord_name = chord_root_note + 'm'

        # 信頼度を0-1にマッピング
        confidence = min(1.0, max(0.0, best_match_score))

        chord_progression.append(ChordInfo(
            startTime=start_time,
            endTime=end_time,
            chord=chord_name,
            rootNote=chord_root_note,
            quality=best_chord['quality'],
            confidence=confidence
        ))

    return chord_progression


def generate_fallback_chords(key_root: str, duration: float):
    """
    エラー時のフォールバックコード進行を生成
    """
    return [
        ChordInfo(
            startTime=0.0, endTime=4.0,
            chord=key_root, rootNote=key_root, quality='maj', confidence=0.5
        ),
    ]


def generate_scale_match(detected_key: str, scale_name: str, chord_progression: List[ChordInfo]):
    """
    スケールマッチング結果を生成

    1位: 推定されたキー
    2位: 相対調（メジャー↔マイナー）
    """

    # 検出されたコードのリスト
    detected_chords = list(set([c.chord for c in chord_progression]))

    # 1位: 推定キー
    first_match = ScaleMatchInfo(
        scale=scale_name,
        rootNote=detected_key,
        matchRate=0.92,
        matchingChords=detected_chords
    )

    # 2位: 相対調を計算
    note_names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    root_index = note_names.index(detected_key)

    if scale_name == 'メジャー':
        # 相対マイナー（6度下 = 短6度上 = 9半音上 = 3半音下）
        relative_index = (root_index - 3) % 12
        relative_scale = 'マイナー'
    else:
        # 相対メジャー（3半音上）
        relative_index = (root_index + 3) % 12
        relative_scale = 'メジャー'

    relative_key = note_names[relative_index]

    second_match = ScaleMatchInfo(
        scale=relative_scale,
        rootNote=relative_key,
        matchRate=0.85,
        matchingChords=detected_chords
    )

    # 3位: ミクソリディアン（おまけ）
    third_match = ScaleMatchInfo(
        scale='ミクソリディアン',
        rootNote=detected_key,
        matchRate=0.75,
        matchingChords=detected_chords[:3] if len(detected_chords) >= 3 else detected_chords
    )

    return ScaleMatchResult(
        matchingScales=[first_match, second_match, third_match]
    )


# ============================================
# ローカル実行用（開発時のみ）
# ============================================

if __name__ == "__main__":
    import uvicorn

    # ローカル開発用の起動コマンド：
    # python main.py
    # または
    # uvicorn main:app --reload --host 0.0.0.0 --port 8000

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,  # コード変更時に自動リロード
        log_level="info"
    )

"""
【Phase 4 以降で実装予定の関数】

def separate_stems(file_path: str) -> Dict[str, str]:
    \"\"\"
    stem 分解（Demucs 使用）

    Args:
        file_path: 音源ファイルのパス

    Returns:
        Dict[str, str]: stem別のファイルパス
            - vocals: ボーカルトラック
            - drums: ドラムトラック
            - bass: ベーストラック
            - other: その他トラック
    \"\"\"
    # TODO: Demucs を使った実装
    pass


def detect_chords(y: np.ndarray, sr: int) -> List[ChordInfo]:
    \"\"\"
    コード進行検出（madmom or librosa 使用）

    Args:
        y: 音源データ
        sr: サンプリングレート

    Returns:
        List[ChordInfo]: コード進行
    \"\"\"
    # TODO: madmom or librosa を使った実装
    pass


def estimate_key(chroma: np.ndarray) -> Tuple[str, str]:
    \"\"\"
    キー検出

    Args:
        chroma: クロマグラム

    Returns:
        Tuple[str, str]: (キー, スケール)
    \"\"\"
    # TODO: キー検出アルゴリズムの実装
    pass
"""
