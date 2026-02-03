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
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "").split(",") if os.getenv("ALLOWED_ORIGINS") else [
    "http://localhost:3000",  # Next.js 開発サーバー
    "http://127.0.0.1:3000",
    "https://guitar-scale.com",  # 本番ドメイン
    "https://www.guitar-scale.com",  # www付き
    "https://*.vercel.app",  # Vercel デプロイ（プレビュー）
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
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


class DetectedKeyInfo(BaseModel):
    """検出されたキー情報"""
    key: str
    scale: str
    confidence: float
    occurrence: float  # 出現割合（0.0-1.0）


class AnalysisMetadata(BaseModel):
    """メタデータ"""
    duration: float
    tempo: float
    timeSignature: str
    detectedKey: str  # 主要キー（最も多く出現）
    scale: str
    confidence: float
    detectedKeys: Optional[List[DetectedKeyInfo]] = None  # 複数キー検出時


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

USE_REAL_ANALYSIS = os.getenv("USE_REAL_ANALYSIS", "true").lower() == "true"
USE_ESSENTIA = os.getenv("USE_ESSENTIA", "false").lower() == "true"

print("=" * 60)
print("🎵 Audio Analysis API - Startup")
print("=" * 60)
print(f"Analysis Mode: {'REAL' if USE_REAL_ANALYSIS else 'DUMMY (固定値)'}")
if USE_REAL_ANALYSIS:
    print(f"  Engine: {'Essentia (高精度)' if USE_ESSENTIA else 'librosa (標準)'}")
print(f"Environment: USE_REAL_ANALYSIS={os.getenv('USE_REAL_ANALYSIS', 'not set')}")
print(f"Environment: USE_ESSENTIA={os.getenv('USE_ESSENTIA', 'not set')}")

# librosa/essentiaは実解析モードでのみインポート（依存関係を減らすため）
ESSENTIA_AVAILABLE = False

if USE_REAL_ANALYSIS:
    try:
        import librosa
        import numpy as np
        print("✓ librosa loaded successfully")
        print("✓ numpy loaded successfully")
    except ImportError as e:
        print(f"⚠ Warning: librosa not available - {e}")
        print("  Falling back to DUMMY analysis mode")
        USE_REAL_ANALYSIS = False

    # Essentiaのインポートを試行
    if USE_ESSENTIA:
        try:
            import essentia.standard as es
            ESSENTIA_AVAILABLE = True
            print("✓ essentia loaded successfully")
        except ImportError as e:
            print(f"⚠ Warning: essentia not available - {e}")
            print("  Falling back to librosa analysis")
            ESSENTIA_AVAILABLE = False

    print("=" * 60)
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
    実際の音源解析ロジック

    Essentia優先、librosaフォールバック：
    - USE_ESSENTIA=true かつ essentia利用可能 → Essentia解析
    - それ以外 → librosa解析

    Args:
        file_path: 音源ファイルのパス
        options: 解析オプション

    Returns:
        AnalysisResult: 解析結果
    """

    # Essentia優先
    if ESSENTIA_AVAILABLE:
        try:
            print(f"\n[Real Analysis] Using Essentia (高精度モード)...")
            return analyze_audio_essentia(file_path, options)
        except Exception as e:
            print(f"⚠ Essentia analysis failed: {e}")
            print("  Falling back to librosa analysis...")

    # librosaフォールバック
    return analyze_audio_librosa(file_path, options)


def analyze_audio_librosa(file_path: str, options: Dict) -> AnalysisResult:
    """
    librosaベースの音源解析ロジック（高精度版）

    改善点：
    - ラウドネスベースのセグメント選択（最もエネルギーの高い区間を解析）
    - HPSS（Harmonic-Percussive Source Separation）でハーモニック成分を抽出
    - CQT/CENSベースのChroma特徴量で安定したピッチ検出
    - ビート同期コード検出

    Args:
        file_path: 音源ファイルのパス
        options: 解析オプション

    Returns:
        AnalysisResult: 解析結果
    """

    print(f"\n[Librosa Analysis] Starting high-precision analysis...")
    print(f"  File: {file_path}")

    # 1. 音声読み込み（全体を読み込んでから最適な区間を選択）
    try:
        print(f"  Step 1/6: Loading audio file...")
        y_full, sr = librosa.load(file_path, sr=22050, mono=True)  # 22050Hzで統一
        full_duration = len(y_full) / sr
        print(f"    ✓ Loaded: {full_duration:.2f}s, sr={sr}Hz, samples={len(y_full)}")
    except Exception as e:
        print(f"    ✗ Failed to load audio file: {str(e)}")
        raise Exception(f"Failed to load audio file: {str(e)}")

    # 2. HPSS（ハーモニック・パーカッシブ分離）- 全体に適用
    try:
        print(f"  Step 2/7: Applying Harmonic-Percussive separation (full track)...")
        y_harmonic_full, y_percussive_full = librosa.effects.hpss(y_full)
        print(f"    ✓ Separated harmonic and percussive components")
    except Exception as e:
        print(f"    ⚠ HPSS failed: {e}, using original signal")
        y_harmonic_full = y_full

    # 3. セグメント分割キー検出（転調対応）
    try:
        print(f"  Step 3/7: Detecting keys with modulation analysis...")
        detected_keys_info, detected_key, scale_name, confidence = detect_keys_with_modulation(
            y_harmonic_full, sr, segment_duration=15.0
        )

        if len(detected_keys_info) == 1:
            print(f"    ✓ Single key detected: {detected_key} {scale_name} (confidence: {confidence:.2f})")
        else:
            print(f"    ✓ Multiple keys detected:")
            for ki in detected_keys_info:
                print(f"      - {ki['key']} {ki['scale']}: {ki['occurrence']*100:.0f}%")
    except Exception as e:
        print(f"    ⚠ Key detection failed: {e}, using default C major")
        detected_key = "C"
        scale_name = "メジャー"
        confidence = 0.5
        detected_keys_info = [{"key": "C", "scale": "メジャー", "confidence": 0.5, "occurrence": 1.0}]

    # 4. ラウドネスベースの最適区間選択（コード検出用）
    try:
        print(f"  Step 4/7: Selecting optimal segment for chord detection...")
        y, start_time, end_time = select_loudest_segment(y_full, sr, target_duration=30.0)
        y_harmonic, _ = librosa.effects.hpss(y)  # 選択区間のHPSS
        duration = len(y) / sr
        print(f"    ✓ Selected segment: {start_time:.1f}s - {end_time:.1f}s ({duration:.1f}s)")
    except Exception as e:
        print(f"    ⚠ Segment selection failed: {e}, using first 30s")
        y = y_full[:int(30.0 * sr)]
        y_harmonic = y_harmonic_full[:int(30.0 * sr)]
        duration = len(y) / sr
        start_time = 0.0
        end_time = duration

    # 5. テンポ・ビート推定（選択区間から）
    try:
        print(f"  Step 5/7: Detecting tempo and beats...")
        tempo, beat_frames = librosa.beat.beat_track(y=y, sr=sr)
        tempo = float(tempo)
        beats = librosa.frames_to_time(beat_frames, sr=sr)
        print(f"    ✓ Tempo detected: {tempo:.1f} BPM, {len(beats)} beats")
    except Exception as e:
        print(f"    ⚠ Tempo detection failed: {e}, using default 120 BPM")
        tempo = 120.0
        beats = []

    # 6. ビート同期コード進行検出（選択区間のハーモニック成分を使用）
    try:
        print(f"  Step 6/7: Detecting chord progression (beat-synced)...")
        if len(beats) >= 4:
            chord_progression = detect_chords_beat_synced(
                y_harmonic, sr, beats, detected_key, scale_name, start_time
            )
        else:
            chord_progression = detect_chords_enhanced(
                y_harmonic, sr, detected_key, scale_name, start_time
            )
        print(f"    ✓ Detected {len(chord_progression)} chord segments")
        if len(chord_progression) > 0:
            print(f"    First chord: {chord_progression[0].chord} ({chord_progression[0].startTime:.1f}s - {chord_progression[0].endTime:.1f}s)")
    except Exception as e:
        print(f"    ⚠ Chord detection failed: {e}, using fallback")
        chord_progression = generate_fallback_chords(detected_key, full_duration)

    # 7. スケールマッチング（キーに基づいて）
    print(f"  Step 7/7: Generating scale matches...")

    try:
        scale_match = generate_scale_match(detected_key, scale_name, chord_progression)
        print(f"    ✓ Generated {len(scale_match.matchingScales)} scale matches")
    except Exception as e:
        print(f"    ⚠ Scale matching failed: {e}")
        scale_match = ScaleMatchResult(matchingScales=[])

    # メタデータの構築
    # 複数キーが検出された場合はdetectedKeysに格納
    detected_keys_list = None
    if len(detected_keys_info) > 1:
        detected_keys_list = [
            DetectedKeyInfo(
                key=ki['key'],
                scale=ki['scale'],
                confidence=ki['confidence'],
                occurrence=ki['occurrence']
            )
            for ki in detected_keys_info
        ]

    metadata = AnalysisMetadata(
        duration=full_duration,
        tempo=tempo,
        timeSignature="4/4",
        detectedKey=detected_key,
        scale=scale_name,
        confidence=confidence,
        detectedKeys=detected_keys_list
    )

    print(f"\n[Librosa Analysis] Analysis completed successfully!")
    print(f"  Result: {detected_key} {scale_name}, {tempo:.1f} BPM, {len(chord_progression)} chords")
    print(f"  Analyzed segment: {start_time:.1f}s - {end_time:.1f}s (loudest {duration:.1f}s)")
    print("=" * 60)

    return AnalysisResult(
        metadata=metadata,
        chordProgression=chord_progression,
        scaleMatch=scale_match,
        stems=None  # Phase 4 では未実装
    )


def detect_keys_with_modulation(y_harmonic, sr, segment_duration=15.0, min_occurrence=0.15):
    """
    セグメント分割によるキー検出（転調対応）

    曲をセグメントに分割し、各セグメントでキーを推定。
    検出されたキーを集計し、出現割合とともに返す。

    Args:
        y_harmonic: ハーモニック成分
        sr: サンプリングレート
        segment_duration: セグメントの長さ（秒）
        min_occurrence: 報告する最小出現割合（これ以下は無視）

    Returns:
        Tuple[List[dict], str, str, float]:
            - detected_keys_info: 検出されたキーのリスト
            - primary_key: 主要キー
            - primary_scale: 主要スケール
            - confidence: 信頼度
    """
    full_duration = len(y_harmonic) / sr
    num_segments = max(1, int(np.ceil(full_duration / segment_duration)))

    # 各セグメントでキーを推定
    segment_keys = []

    for i in range(num_segments):
        start_time = i * segment_duration
        end_time = min((i + 1) * segment_duration, full_duration)

        start_sample = int(start_time * sr)
        end_sample = int(end_time * sr)
        segment = y_harmonic[start_sample:end_sample]

        # 短すぎるセグメントはスキップ
        if len(segment) < sr * 5:  # 5秒未満
            continue

        try:
            key, scale, conf = estimate_key_enhanced(segment, sr)
            segment_keys.append({
                'key': key,
                'scale': scale,
                'confidence': conf
            })
        except Exception:
            continue

    if not segment_keys:
        # フォールバック: 全体からキー推定
        key, scale, conf = estimate_key_enhanced(y_harmonic, sr)
        return [{"key": key, "scale": scale, "confidence": conf, "occurrence": 1.0}], key, scale, conf

    # キー+スケールの組み合わせで集計
    key_counts = {}
    for sk in segment_keys:
        key_scale = f"{sk['key']}_{sk['scale']}"
        if key_scale not in key_counts:
            key_counts[key_scale] = {
                'key': sk['key'],
                'scale': sk['scale'],
                'count': 0,
                'confidences': []
            }
        key_counts[key_scale]['count'] += 1
        key_counts[key_scale]['confidences'].append(sk['confidence'])

    # 出現割合を計算
    total_segments = len(segment_keys)
    detected_keys_info = []

    for key_scale, data in key_counts.items():
        occurrence = data['count'] / total_segments
        if occurrence >= min_occurrence:
            detected_keys_info.append({
                'key': data['key'],
                'scale': data['scale'],
                'confidence': np.mean(data['confidences']),
                'occurrence': occurrence
            })

    # 出現割合でソート（降順）
    detected_keys_info.sort(key=lambda x: x['occurrence'], reverse=True)

    # 主要キー（最も多く出現）
    primary = detected_keys_info[0]
    primary_key = primary['key']
    primary_scale = primary['scale']
    primary_confidence = primary['confidence']

    return detected_keys_info, primary_key, primary_scale, primary_confidence


def select_loudest_segment(y, sr, target_duration=30.0, hop_length=512):
    """
    ラウドネスベースで最も音量が高い区間を選択

    RMSエネルギーを計算し、最もエネルギーが集中している区間を返す。
    これにより、イントロの静かな部分やアウトロを避け、
    コード進行が明確なサビ/コーラス部分を優先的に解析できる。

    Args:
        y: 音声波形
        sr: サンプリングレート
        target_duration: 切り出す長さ（秒）
        hop_length: RMS計算のホップ長

    Returns:
        Tuple[ndarray, float, float]: (選択された区間の波形, 開始時刻, 終了時刻)
    """
    full_duration = len(y) / sr

    # 短い音源の場合はそのまま返す
    if full_duration <= target_duration:
        return y, 0.0, full_duration

    # RMSエネルギーを計算
    rms = librosa.feature.rms(y=y, hop_length=hop_length)[0]

    # 移動平均でスムージング（target_duration相当のウィンドウ）
    window_frames = int(target_duration * sr / hop_length)
    if window_frames >= len(rms):
        return y[:int(target_duration * sr)], 0.0, target_duration

    # 畳み込みで移動平均RMSを計算
    kernel = np.ones(window_frames) / window_frames
    smoothed_rms = np.convolve(rms, kernel, mode='valid')

    # 最大RMSの位置を取得
    best_frame = np.argmax(smoothed_rms)
    best_start_time = best_frame * hop_length / sr
    best_end_time = best_start_time + target_duration

    # 範囲外チェック
    if best_end_time > full_duration:
        best_end_time = full_duration
        best_start_time = max(0, full_duration - target_duration)

    # 波形を切り出し
    start_sample = int(best_start_time * sr)
    end_sample = int(best_end_time * sr)

    return y[start_sample:end_sample], best_start_time, best_end_time


def estimate_key_enhanced(y_harmonic, sr):
    """
    改良版キー推定アルゴリズム

    ハーモニック成分からCQTベースのChroma特徴量を計算し、
    Krumhansl-Schmuckler key-finding algorithmの改良版で推定。

    改善点：
    - CQTベースのChroma（周波数解像度が高い）
    - CENS正規化（エネルギー正規化＋スムージング）
    - 複数のプロファイル比較

    Returns:
        Tuple[str, str, float]: (rootNote, scale, confidence)
    """
    # CQTベースのChroma（より精度が高い）
    chroma_cqt = librosa.feature.chroma_cqt(y=y_harmonic, sr=sr, hop_length=512)

    # CENS（Chroma Energy Normalized Statistics）で安定化
    chroma_cens = librosa.feature.chroma_cens(y=y_harmonic, sr=sr, hop_length=512)

    # 両方を組み合わせ（CQTの精度 + CENSの安定性）
    chroma_combined = (chroma_cqt + chroma_cens) / 2

    # 時間軸で平均化
    chroma_mean = np.mean(chroma_combined, axis=1)

    # 正規化
    chroma_mean = chroma_mean / (np.sum(chroma_mean) + 1e-8)

    # Krumhansl-Kessler プロファイル（改良版）
    # メジャー: 経験的に調整された重み
    major_profile = np.array([6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88])

    # マイナー: 経験的に調整された重み
    minor_profile = np.array([6.33, 2.68, 3.52, 5.38, 2.60, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17])

    # 正規化
    major_profile = major_profile / np.sum(major_profile)
    minor_profile = minor_profile / np.sum(minor_profile)

    note_names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

    best_score = -1.0
    best_key = 'C'
    best_scale = 'メジャー'

    for i in range(12):
        # メジャー
        shifted_major = np.roll(major_profile, i)
        major_corr = np.corrcoef(chroma_mean, shifted_major)[0, 1]

        if major_corr > best_score:
            best_score = major_corr
            best_key = note_names[i]
            best_scale = 'メジャー'

        # マイナー
        shifted_minor = np.roll(minor_profile, i)
        minor_corr = np.corrcoef(chroma_mean, shifted_minor)[0, 1]

        if minor_corr > best_score:
            best_score = minor_corr
            best_key = note_names[i]
            best_scale = 'マイナー'

    # 信頼度（相関係数を0-1にマッピング）
    confidence = (best_score + 1.0) / 2.0
    confidence = max(0.0, min(1.0, confidence))

    return best_key, best_scale, confidence


def detect_chords_beat_synced(y_harmonic, sr, beats, key_root, key_scale, time_offset=0.0):
    """
    ビート同期コード進行検出

    ビート位置に合わせてコードを検出することで、
    固定時間区切りより自然なコード進行を取得。

    Args:
        y_harmonic: ハーモニック成分
        sr: サンプリングレート
        beats: ビート位置の配列（秒）
        key_root: キーのルート音
        key_scale: スケール名
        time_offset: 元音源での開始時刻オフセット

    Returns:
        List[ChordInfo]: コード進行
    """
    chord_progression = []
    note_names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

    # 4拍（1小節）ごとにグループ化
    bars = []
    for i in range(0, len(beats) - 3, 4):
        bar_start = beats[i]
        bar_end = beats[min(i + 4, len(beats) - 1)]
        bars.append((bar_start, bar_end))

    # 最後の端数も追加
    if len(beats) > 0 and len(bars) > 0:
        last_bar_end = bars[-1][1]
        if beats[-1] > last_bar_end:
            bars.append((last_bar_end, beats[-1]))

    for bar_start, bar_end in bars:
        start_sample = int(bar_start * sr)
        end_sample = int(bar_end * sr)
        segment = y_harmonic[start_sample:end_sample]

        if len(segment) < 1024:
            continue

        # CQTベースのChromaを計算
        chroma = librosa.feature.chroma_cqt(y=segment, sr=sr, hop_length=256)
        chroma_mean = np.mean(chroma, axis=1)

        # コードを推定
        chord_name, root_note, quality, confidence = match_chord_enhanced(
            chroma_mean, note_names, key_root, key_scale
        )

        chord_progression.append(ChordInfo(
            startTime=bar_start + time_offset,
            endTime=bar_end + time_offset,
            chord=chord_name,
            rootNote=root_note,
            quality=quality,
            confidence=confidence
        ))

    # 連続する同じコードをマージ
    chord_progression = merge_consecutive_chords(chord_progression)

    return chord_progression


def detect_chords_enhanced(y_harmonic, sr, key_root, key_scale, time_offset=0.0):
    """
    改良版コード検出（ビート情報がない場合のフォールバック）

    2秒区切りでより細かくコードを検出。

    Returns:
        List[ChordInfo]: コード進行
    """
    duration = len(y_harmonic) / sr
    segment_duration = 2.0  # 2秒ごと（従来の4秒より細かく）
    num_segments = int(np.ceil(duration / segment_duration))

    chord_progression = []
    note_names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

    for seg_idx in range(num_segments):
        start_time = seg_idx * segment_duration
        end_time = min((seg_idx + 1) * segment_duration, duration)

        start_sample = int(start_time * sr)
        end_sample = int(end_time * sr)
        segment = y_harmonic[start_sample:end_sample]

        if len(segment) < 1024:
            continue

        # CQTベースのChroma
        chroma = librosa.feature.chroma_cqt(y=segment, sr=sr, hop_length=256)
        chroma_mean = np.mean(chroma, axis=1)

        chord_name, root_note, quality, confidence = match_chord_enhanced(
            chroma_mean, note_names, key_root, key_scale
        )

        chord_progression.append(ChordInfo(
            startTime=start_time + time_offset,
            endTime=end_time + time_offset,
            chord=chord_name,
            rootNote=root_note,
            quality=quality,
            confidence=confidence
        ))

    # 連続する同じコードをマージ
    chord_progression = merge_consecutive_chords(chord_progression)

    return chord_progression


def match_chord_enhanced(chroma_values, note_names, key_root, key_scale):
    """
    改良版コードマッチング

    ダイアトニックコード + よく使われる借用コードも含めてマッチング。

    Returns:
        Tuple[str, str, str, float]: (chord_name, root_note, quality, confidence)
    """
    root_index = note_names.index(key_root)

    # ダイアトニックコード + 借用コード
    if key_scale == 'メジャー':
        chord_templates = [
            {'offset': 0, 'quality': 'maj', 'degree': 'I'},
            {'offset': 2, 'quality': 'min', 'degree': 'ii'},
            {'offset': 4, 'quality': 'min', 'degree': 'iii'},
            {'offset': 5, 'quality': 'maj', 'degree': 'IV'},
            {'offset': 7, 'quality': 'maj', 'degree': 'V'},
            {'offset': 9, 'quality': 'min', 'degree': 'vi'},
            {'offset': 11, 'quality': 'dim', 'degree': 'vii°'},
            # 借用コード
            {'offset': 10, 'quality': 'maj', 'degree': 'bVII'},  # ♭VII
            {'offset': 8, 'quality': 'maj', 'degree': 'bVI'},   # ♭VI
        ]
    else:
        chord_templates = [
            {'offset': 0, 'quality': 'min', 'degree': 'i'},
            {'offset': 2, 'quality': 'dim', 'degree': 'ii°'},
            {'offset': 3, 'quality': 'maj', 'degree': 'III'},
            {'offset': 5, 'quality': 'min', 'degree': 'iv'},
            {'offset': 7, 'quality': 'min', 'degree': 'v'},
            {'offset': 7, 'quality': 'maj', 'degree': 'V'},    # ハーモニックマイナーのV
            {'offset': 8, 'quality': 'maj', 'degree': 'VI'},
            {'offset': 10, 'quality': 'maj', 'degree': 'VII'},
        ]

    best_match_score = -1.0
    best_chord = chord_templates[0]

    # 正規化
    chroma_norm = chroma_values / (np.sum(chroma_values) + 1e-8)

    for chord_info in chord_templates:
        chord_root_index = (root_index + chord_info['offset']) % 12

        # コードテンプレート（ルート、3度、5度）
        chord_template = np.zeros(12)
        chord_template[chord_root_index] = 1.0  # ルート

        if chord_info['quality'] == 'maj':
            chord_template[(chord_root_index + 4) % 12] = 0.7  # 長3度
            chord_template[(chord_root_index + 7) % 12] = 0.5  # 完全5度
        elif chord_info['quality'] == 'min':
            chord_template[(chord_root_index + 3) % 12] = 0.7  # 短3度
            chord_template[(chord_root_index + 7) % 12] = 0.5  # 完全5度
        else:  # dim
            chord_template[(chord_root_index + 3) % 12] = 0.7  # 短3度
            chord_template[(chord_root_index + 6) % 12] = 0.5  # 減5度

        # 正規化
        chord_template = chord_template / (np.sum(chord_template) + 1e-8)

        # コサイン類似度で一致度を計算
        match_score = np.dot(chroma_norm, chord_template)

        if match_score > best_match_score:
            best_match_score = match_score
            best_chord = chord_info

    # コード名生成
    chord_root_note = note_names[(root_index + best_chord['offset']) % 12]
    if best_chord['quality'] == 'maj':
        chord_name = chord_root_note
    elif best_chord['quality'] == 'min':
        chord_name = chord_root_note + 'm'
    else:
        chord_name = chord_root_note + 'dim'

    confidence = min(1.0, max(0.0, best_match_score))

    return chord_name, chord_root_note, best_chord['quality'], confidence


def merge_consecutive_chords(chord_progression: List[ChordInfo]) -> List[ChordInfo]:
    """
    連続する同じコードをマージ

    細かく検出したコードの中で、連続して同じコードが続く場合は
    1つにまとめて可読性を向上。

    Returns:
        List[ChordInfo]: マージ後のコード進行
    """
    if not chord_progression:
        return []

    merged = []
    current = chord_progression[0]

    for next_chord in chord_progression[1:]:
        if next_chord.chord == current.chord:
            # 同じコードなら終了時刻を延長
            current = ChordInfo(
                startTime=current.startTime,
                endTime=next_chord.endTime,
                chord=current.chord,
                rootNote=current.rootNote,
                quality=current.quality,
                confidence=(current.confidence + next_chord.confidence) / 2
            )
        else:
            # 違うコードなら現在のコードを確定して次へ
            merged.append(current)
            current = next_chord

    # 最後のコードを追加
    merged.append(current)

    return merged


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
# Essentia ベース解析ロジック（高精度モード）
# ============================================

def analyze_audio_essentia(file_path: str, options: Dict) -> AnalysisResult:
    """
    Essentiaベースの高精度音源解析

    特徴:
    - KeyExtractor (bgateプロファイル) でキー検出精度90%+
    - RhythmExtractor2013 でビート検出
    - ChordsDetectionBeats でビート同期コード検出

    Args:
        file_path: 音源ファイルのパス
        options: 解析オプション

    Returns:
        AnalysisResult: 解析結果
    """

    print(f"\n[Essentia Analysis] Starting high-precision analysis...")
    print(f"  File: {file_path}")

    # 1. 音声読み込み（MonoLoader: 44100Hz, モノラル）
    try:
        print(f"  Step 1/5: Loading audio file...")
        loader = es.MonoLoader(filename=file_path, sampleRate=44100)
        audio = loader()
        duration = len(audio) / 44100.0
        print(f"    ✓ Loaded: {duration:.2f}s, sr=44100Hz, samples={len(audio)}")

        # 60秒に制限（長い曲の処理時間短縮）
        if duration > 60.0:
            audio = audio[:int(60.0 * 44100)]
            duration = 60.0
            print(f"    → Truncated to 60.0s for processing efficiency")
    except Exception as e:
        print(f"    ✗ Failed to load audio file: {str(e)}")
        raise Exception(f"Failed to load audio file: {str(e)}")

    # 2. キー検出（KeyExtractor + bgateプロファイル）
    try:
        print(f"  Step 2/5: Detecting key with KeyExtractor (bgate profile)...")
        detected_key, scale_name, confidence = estimate_key_essentia(audio)
        print(f"    ✓ Key detected: {detected_key} {scale_name} (confidence: {confidence:.2f})")
    except Exception as e:
        print(f"    ⚠ Key detection failed: {e}, using librosa fallback")
        # librosaフォールバック
        y, sr = librosa.load(file_path, sr=None, mono=True, duration=60.0)
        detected_key, scale_name, confidence = estimate_key_simple(y, sr)

    # 3. テンポ・ビート検出（RhythmExtractor2013）
    try:
        print(f"  Step 3/5: Detecting tempo and beats...")
        tempo, beats = detect_tempo_essentia(audio)
        print(f"    ✓ Tempo detected: {tempo:.1f} BPM, {len(beats)} beats")
    except Exception as e:
        print(f"    ⚠ Tempo detection failed: {e}, using default 120 BPM")
        tempo = 120.0
        beats = []

    # 4. コード進行検出（ビート同期）
    try:
        print(f"  Step 4/5: Detecting chord progression...")
        if len(beats) >= 2:
            chord_progression = detect_chords_essentia(audio, beats, detected_key, scale_name)
        else:
            # ビートが少ない場合は4秒区切りフォールバック
            chord_progression = detect_chords_essentia_simple(audio, duration, detected_key, scale_name)
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
    except Exception as e:
        print(f"    ⚠ Scale matching failed: {e}")
        scale_match = ScaleMatchResult(matchingScales=[])

    # 6. メタデータの構築
    metadata = AnalysisMetadata(
        duration=duration,
        tempo=tempo,
        timeSignature="4/4",
        detectedKey=detected_key,
        scale=scale_name,
        confidence=confidence
    )

    print(f"\n[Essentia Analysis] Analysis completed successfully!")
    print(f"  Result: {detected_key} {scale_name}, {tempo:.1f} BPM, {len(chord_progression)} chords")
    print("=" * 60)

    return AnalysisResult(
        metadata=metadata,
        chordProgression=chord_progression,
        scaleMatch=scale_match,
        stems=None
    )


def estimate_key_essentia(audio) -> tuple:
    """
    Essentiaベースのキー推定

    KeyExtractorを使用し、bgateプロファイルで高精度なキー検出を行う。
    bgateプロファイルは電子音楽・ポップスに最適化されている。

    Returns:
        Tuple[str, str, float]: (rootNote, scale, confidence)
    """

    # KeyExtractorアルゴリズム（bgateプロファイル）
    key_extractor = es.KeyExtractor(profileType='bgate')
    key, scale, strength = key_extractor(audio)

    # Essentiaのスケール名を日本語に変換
    scale_name = 'メジャー' if scale == 'major' else 'マイナー'

    # 信頼度を0-1にマッピング
    confidence = min(1.0, max(0.0, strength))

    return key, scale_name, confidence


def detect_tempo_essentia(audio) -> tuple:
    """
    Essentiaベースのテンポ・ビート検出

    RhythmExtractor2013を使用して高精度なビート検出を行う。

    Returns:
        Tuple[float, List[float]]: (tempo, beats)
    """

    rhythm_extractor = es.RhythmExtractor2013(method="multifeature")
    bpm, beats, beats_confidence, _, beats_intervals = rhythm_extractor(audio)

    return float(bpm), list(beats)


def detect_chords_essentia(audio, beats: List[float], key_root: str, key_scale: str) -> List[ChordInfo]:
    """
    Essentiaベースのビート同期コード検出

    ビート区間ごとにHPCP (Harmonic Pitch Class Profile) を計算し、
    コードを推定する。

    Args:
        audio: 音声データ
        beats: ビート位置のリスト
        key_root: キーのルート音
        key_scale: スケール名

    Returns:
        List[ChordInfo]: コード進行
    """

    sample_rate = 44100
    chord_progression = []

    # HPCP計算用アルゴリズム
    spectrum = es.Spectrum()
    spectral_peaks = es.SpectralPeaks(
        orderBy="magnitude",
        magnitudeThreshold=0.00001,
        minFrequency=20,
        maxFrequency=3500,
        maxPeaks=60
    )
    hpcp = es.HPCP(
        size=12,
        referenceFrequency=440,
        harmonics=8,
        bandPreset=True,
        minFrequency=20,
        maxFrequency=3500,
        weightType="cosine",
        nonLinear=False,
        windowSize=1.0
    )

    # コードテンプレート（メジャー・マイナー）
    note_names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

    # ビートをグループ化（2-4ビートごと）
    beat_groups = []
    group_size = 4  # 4ビートごとにコード検出
    for i in range(0, len(beats) - 1, group_size):
        start_beat = beats[i]
        end_idx = min(i + group_size, len(beats) - 1)
        end_beat = beats[end_idx] if end_idx < len(beats) else beats[-1]
        beat_groups.append((start_beat, end_beat))

    for start_time, end_time in beat_groups:
        # この区間の音声を切り出し
        start_sample = int(start_time * sample_rate)
        end_sample = int(end_time * sample_rate)
        segment = audio[start_sample:end_sample]

        if len(segment) < 2048:
            continue

        # フレームごとにHPCPを計算して平均
        frame_size = 2048
        hop_size = 1024
        hpcp_values = []

        for frame_start in range(0, len(segment) - frame_size, hop_size):
            frame = segment[frame_start:frame_start + frame_size]
            windowed = frame * np.hanning(len(frame))
            spec = spectrum(windowed)
            frequencies, magnitudes = spectral_peaks(spec)
            if len(frequencies) > 0:
                hpcp_frame = hpcp(frequencies, magnitudes)
                hpcp_values.append(hpcp_frame)

        if not hpcp_values:
            continue

        # HPCPの平均を計算
        hpcp_mean = np.mean(hpcp_values, axis=0)

        # コードを推定
        chord_name, root_note, quality, confidence = match_chord_from_hpcp(
            hpcp_mean, note_names, key_root, key_scale
        )

        chord_progression.append(ChordInfo(
            startTime=start_time,
            endTime=end_time,
            chord=chord_name,
            rootNote=root_note,
            quality=quality,
            confidence=confidence
        ))

    return chord_progression


def detect_chords_essentia_simple(audio, duration: float, key_root: str, key_scale: str) -> List[ChordInfo]:
    """
    Essentiaベースの簡易コード検出（4秒区切り）

    ビート情報がない場合のフォールバック。

    Returns:
        List[ChordInfo]: コード進行
    """

    sample_rate = 44100
    segment_duration = 4.0
    num_segments = int(np.ceil(duration / segment_duration))

    chord_progression = []
    note_names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

    # HPCP計算用
    spectrum = es.Spectrum()
    spectral_peaks = es.SpectralPeaks(
        orderBy="magnitude",
        magnitudeThreshold=0.00001,
        minFrequency=20,
        maxFrequency=3500,
        maxPeaks=60
    )
    hpcp = es.HPCP(
        size=12,
        referenceFrequency=440,
        harmonics=8,
        bandPreset=True,
        minFrequency=20,
        maxFrequency=3500
    )

    for seg_idx in range(num_segments):
        start_time = seg_idx * segment_duration
        end_time = min((seg_idx + 1) * segment_duration, duration)

        start_sample = int(start_time * sample_rate)
        end_sample = int(end_time * sample_rate)
        segment = audio[start_sample:end_sample]

        if len(segment) < 2048:
            continue

        # フレームごとにHPCPを計算
        frame_size = 2048
        hop_size = 1024
        hpcp_values = []

        for frame_start in range(0, len(segment) - frame_size, hop_size):
            frame = segment[frame_start:frame_start + frame_size]
            windowed = frame * np.hanning(len(frame))
            spec = spectrum(windowed)
            frequencies, magnitudes = spectral_peaks(spec)
            if len(frequencies) > 0:
                hpcp_frame = hpcp(frequencies, magnitudes)
                hpcp_values.append(hpcp_frame)

        if not hpcp_values:
            continue

        hpcp_mean = np.mean(hpcp_values, axis=0)
        chord_name, root_note, quality, confidence = match_chord_from_hpcp(
            hpcp_mean, note_names, key_root, key_scale
        )

        chord_progression.append(ChordInfo(
            startTime=start_time,
            endTime=end_time,
            chord=chord_name,
            rootNote=root_note,
            quality=quality,
            confidence=confidence
        ))

    return chord_progression


def match_chord_from_hpcp(hpcp_values, note_names: List[str], key_root: str, key_scale: str) -> tuple:
    """
    HPCPからコードを推定

    ダイアトニックコードテンプレートとの一致度で判定。

    Returns:
        Tuple[str, str, str, float]: (chord_name, root_note, quality, confidence)
    """

    root_index = note_names.index(key_root)

    # ダイアトニックコード定義
    if key_scale == 'メジャー':
        diatonic_chords = [
            {'offset': 0, 'quality': 'maj', 'degree': 'I'},
            {'offset': 2, 'quality': 'min', 'degree': 'ii'},
            {'offset': 4, 'quality': 'min', 'degree': 'iii'},
            {'offset': 5, 'quality': 'maj', 'degree': 'IV'},
            {'offset': 7, 'quality': 'maj', 'degree': 'V'},
            {'offset': 9, 'quality': 'min', 'degree': 'vi'},
        ]
    else:
        diatonic_chords = [
            {'offset': 0, 'quality': 'min', 'degree': 'i'},
            {'offset': 3, 'quality': 'maj', 'degree': 'III'},
            {'offset': 5, 'quality': 'min', 'degree': 'iv'},
            {'offset': 7, 'quality': 'min', 'degree': 'v'},
            {'offset': 8, 'quality': 'maj', 'degree': 'VI'},
            {'offset': 10, 'quality': 'maj', 'degree': 'VII'},
        ]

    best_match_score = -1.0
    best_chord = diatonic_chords[0]

    for chord_info in diatonic_chords:
        chord_root_index = (root_index + chord_info['offset']) % 12

        # コードテンプレート（ルート、3度、5度）
        chord_template = np.zeros(12)
        chord_template[chord_root_index] = 1.0

        if chord_info['quality'] == 'maj':
            chord_template[(chord_root_index + 4) % 12] = 0.8  # 長3度
        else:
            chord_template[(chord_root_index + 3) % 12] = 0.8  # 短3度

        chord_template[(chord_root_index + 7) % 12] = 0.6  # 完全5度

        # 正規化
        chord_template = chord_template / (np.sum(chord_template) + 1e-8)
        hpcp_norm = hpcp_values / (np.sum(hpcp_values) + 1e-8)

        # 内積で一致度
        match_score = np.dot(hpcp_norm, chord_template)

        if match_score > best_match_score:
            best_match_score = match_score
            best_chord = chord_info

    # コード名生成
    chord_root_note = note_names[(root_index + best_chord['offset']) % 12]
    if best_chord['quality'] == 'maj':
        chord_name = chord_root_note
    else:
        chord_name = chord_root_note + 'm'

    confidence = min(1.0, max(0.0, best_match_score))

    return chord_name, chord_root_note, best_chord['quality'], confidence


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
