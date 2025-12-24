# ギタースケールわかる君 (Guitar Scale Visualizer)

ギターの指板上でスケールを視覚化し、音源を自動解析してスケールを検出するWebアプリケーション。

## 主な機能

- **スケール可視化**: 13種類のスケール（メジャー、マイナー、ペンタトニック、都節など）をギター指板上に表示
- **音源自動解析**: MP3/WAV/M4Aファイルをアップロードして、自動的にキーとスケールを検出
- **YouTube参考動画**: 各スケールとルート音に対応した参考動画を表示
- **レスポンシブ対応**: モバイルでは指板を90度回転表示可能

## 技術スタック

### フロントエンド
- Next.js 16.0.4 (App Router + Turbopack)
- React 19.2.0
- TypeScript 5
- Tailwind CSS 4
- Kiwi Maru フォント

### バックエンド
- Python 3.11
- FastAPI
- librosa (音源解析)
- Docker + Docker Compose

## セットアップ

### 1. 環境変数の設定

`.env.local.example` をコピーして `.env.local` を作成:

```bash
cp .env.local.example .env.local
```

`.env.local` を編集してパスを設定:

```env
PYTHON_BACKEND_URL=http://localhost:8000
STORAGE_MODE=local
TMP_DIR=/path/to/your/guitar-scale-app/python-backend/uploads
```

### 2. フロントエンドの起動

```bash
npm install
npm run dev
```

http://localhost:3000 でアクセス可能

### 3. バックエンド（Python）の起動

#### Docker を使う場合（推奨）

```bash
cd python-backend
docker compose up --build
```

バックエンドは http://localhost:8000 で起動します。

詳細は `python-backend/DOCKER_DEPLOY.md` を参照。

#### ローカル環境で起動する場合

```bash
cd python-backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

## ビルド

```bash
npm run build
npm start
```

## プロジェクト構造

```
guitar-scale-app/
├── app/                    # Next.js App Router
│   ├── page.tsx           # メインページ（スケール選択・表示）
│   ├── analysis/          # 音源解析ページ
│   └── api/               # API Routes
├── components/            # Reactコンポーネント
│   ├── GuitarFretboard.tsx
│   ├── AudioAnalyzer.tsx
│   └── ...
├── lib/                   # ユーティリティ・ロジック
│   └── scales.ts          # スケール定義・計算
├── python-backend/        # Pythonバックエンド
│   ├── main.py           # FastAPI アプリ
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── uploads/          # アップロードファイル保存先
└── .env.local            # 環境変数（要作成）
```

## 対応スケール

メジャー、マイナー、ハーモニックマイナー、メロディックマイナー、ドリアン、フリジアン、リディアン、ミクソリディアン、ロクリアン、メジャーペンタトニック、マイナーペンタトニック、ブルース、都節（宮古節）

## ライセンス

MIT
