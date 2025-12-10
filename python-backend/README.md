# 音源解析バックエンド API (Python FastAPI)

ギタースケールわかる君の音源解析バックエンドサーバーです。

## Phase 3 実装内容

- FastAPI ベースの REST API
- POST `/analyze` エンドポイント（ダミー解析）
- Next.js からのリクエストを受け付け
- CORS対応

## Phase 4 実装内容（librosa ベース - 現在実装中）

- ✅ **実音源解析機能（librosa ベース）**
  - 音声読み込み（先頭60秒に制限）
  - テンポ推定（`librosa.beat.beat_track`）
  - キー/スケール推定（chroma特徴量 + Krumhansl-Kessler profiles）
  - 簡易コード進行検出（4秒ごとの区間分割 + ダイアトニックコード判定）
  - 相対調の自動計算
- ✅ **環境変数による切り替え機能**
  - `USE_REAL_ANALYSIS=true` で実解析モード
  - `USE_REAL_ANALYSIS=false` でダミーモード（デバッグ用）

## Phase 5 以降で実装予定

- 実際の stem 分解（Demucs）
- より高精度なコード進行検出（madmom / essentia）
- データベース連携

---

## セットアップ

### 1. Python仮想環境の作成

```bash
cd python-backend

# 仮想環境を作成
python3 -m venv venv

# 仮想環境を有効化
source venv/bin/activate  # macOS / Linux
# または
venv\Scripts\activate     # Windows
```

### 2. 依存関係のインストール

```bash
pip install -r requirements.txt
```

**注意:** librosa のインストールには数分かかる場合があります。また、numpy などの依存関係も一緒にインストールされます。

### 3. 環境変数の設定

```bash
# .env.example をコピー
cp .env.example .env

# .env を編集
# USE_REAL_ANALYSIS=true  # 実解析モード
# USE_REAL_ANALYSIS=false # ダミーモード（デフォルト）
```

**実解析モードを有効にする場合:**

`.env` ファイルに以下を追加：

```
USE_REAL_ANALYSIS=true
```

**ダミーモードの場合（デバッグ用）:**

```
USE_REAL_ANALYSIS=false
```

または、環境変数を設定せずに起動すると自動的にダミーモードになります。

---

## ローカル起動方法

### 方法1: uvicorn コマンド（推奨）

```bash
cd python-backend
source venv/bin/activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 方法2: Python スクリプト実行

```bash
cd python-backend
source venv/bin/activate
python main.py
```

### 起動確認

ブラウザで以下にアクセス：
- API: http://localhost:8000
- ドキュメント: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

---

## API 仕様

### POST /analyze

音源ファイルを解析し、コード進行・スケール情報を返却します。

**リクエスト:**

```json
{
  "jobId": "job_1234567890_abc",
  "filePath": "/tmp/audio-job_1234567890_abc.mp3",
  "options": {
    "separateStems": true,
    "analysisDepth": "basic"
  }
}
```

**レスポンス:**

```json
{
  "success": true,
  "jobId": "job_1234567890_abc",
  "status": "completed",
  "result": {
    "metadata": {
      "duration": 120.0,
      "tempo": 120.0,
      "timeSignature": "4/4",
      "detectedKey": "G",
      "scale": "メジャー",
      "confidence": 0.95
    },
    "chordProgression": [
      {
        "startTime": 0.0,
        "endTime": 4.0,
        "chord": "G",
        "rootNote": "G",
        "quality": "maj",
        "confidence": 0.9
      }
    ],
    "scaleMatch": {
      "matchingScales": [
        {
          "scale": "メジャー",
          "rootNote": "G",
          "matchRate": 0.95,
          "matchingChords": ["G", "C", "D", "Em", "Am"]
        }
      ]
    }
  }
}
```

---

## 開発メモ

### Phase 3 実装状況

- ✅ FastAPI アプリケーション
- ✅ POST /analyze エンドポイント
- ✅ Pydantic モデル定義
- ✅ CORS 設定
- ✅ ダミー解析ロジック
- ✅ エラーハンドリング

### Phase 4 実装状況（librosa ベース）

- ✅ librosa による音源読み込み（先頭60秒制限）
- ✅ テンポ検出（`librosa.beat.beat_track`）
- ✅ キー/スケール推定（chroma + Krumhansl-Kessler profiles）
- ✅ 簡易コード進行検出（4秒ごとの区間分割）
- ✅ 環境変数による切り替え機能
- ✅ 相対調の自動計算

### Phase 5 実装予定

- ⏳ Demucs による stem 分解
- ⏳ madmom / essentia による高精度コード検出
- ⏳ データベース連携
- ⏳ ジョブキューシステム

---

## トラブルシューティング

### ポート 8000 が使用中

```bash
# ポートを変更して起動
uvicorn main:app --reload --port 8001
```

Next.js 側の `.env.local` も更新：
```
PYTHON_BACKEND_URL=http://localhost:8001
```

### 依存関係のエラー

```bash
pip install --upgrade pip
pip install -r requirements.txt --force-reinstall
```

### CORS エラー

`main.py` の CORS 設定を確認：
```python
allow_origins=[
    "http://localhost:3000",  # Next.js のURL
]
```

---

## ディレクトリ構成

```
python-backend/
├── main.py              # FastAPI アプリケーション
├── requirements.txt     # 依存関係
├── README.md            # このファイル
├── venv/                # Python 仮想環境（.gitignore）
└── (Phase 4以降)
    ├── models/          # 機械学習モデル
    ├── utils/           # ユーティリティ関数
    └── tests/           # テストコード
```

---

## Next.js との連携

Next.js 側の設定：

1. `.env.local` を作成：
   ```
   PYTHON_BACKEND_URL=http://localhost:8000
   ```

2. Next.js を起動：
   ```bash
   npm run dev
   ```

3. 音源ファイルをアップロードして解析実行

---

## 本番環境デプロイ

### Railway

```bash
# Railway CLI でデプロイ
railway up
```

### Google Cloud Run

```bash
# Dockerfile を作成してデプロイ
gcloud run deploy audio-analysis-api --source .
```

### Render

1. Render ダッシュボードで新しいサービスを作成
2. リポジトリを接続
3. Build Command: `pip install -r requirements.txt`
4. Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

---

## ライセンス

このプロジェクトは MIT ライセンスです。
