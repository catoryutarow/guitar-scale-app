# ギタースケールわかる君 - Project Status

**Generated:** 2026-02-03
**Version:** 0.1.0
**Live Domain:** guitar-scale.com

---

## 1. Project Overview

ギタリストがスケールを学習・視覚化するためのWebアプリケーション。指板上のスケール表示、音声ファイルからのキー/スケール検出、YouTube動画による学習支援を提供する。

### Main Features
- インタラクティブなギター指板表示（6〜9弦、各種チューニング対応）
- 13種類のスケール対応（メジャー、マイナー、ペンタトニック、モード等）
- 音声ファイル解析によるキー/スケール検出（開発中）
- スケール再生（Web Audio API）
- 多言語対応（日本語、英語、中国語、スペイン語）
- 教育コンテンツ（ブログ記事、YouTube動画リファレンス）

---

## 2. Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.1 | フレームワーク（App Router + Turbopack） |
| React | 19.2.0 | UIライブラリ |
| TypeScript | 5.x | 型安全性 |
| Tailwind CSS | 4.x | スタイリング |
| Vercel Blob | - | ファイルストレージ |
| Google Analytics 4 | - | アクセス解析 |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| FastAPI | - | APIフレームワーク |
| Python | 3.11 | ランタイム |
| librosa | 0.10.1 | 音声処理（予定） |
| Docker | - | コンテナ化 |

---

## 3. Project Structure

```
guitar-scale-app/
├── app/                    # Next.js App Router
│   ├── page.tsx           # メインページ（スケール可視化）
│   ├── analysis/          # 音声解析ページ
│   ├── api/               # APIルート（upload, analysis proxy）
│   └── articles/          # ブログ記事（5記事）
│
├── components/            # Reactコンポーネント
│   ├── GuitarFretboard.tsx    # 指板表示（メイン）
│   ├── AudioAnalyzer.tsx      # 音声解析オーケストレーター
│   ├── ScalePlayer.tsx        # スケール再生
│   └── [その他15+コンポーネント]
│
├── lib/                   # ユーティリティ・コアロジック
│   ├── scales.ts          # スケール定義・計算API
│   ├── scaleEngine.ts     # 音楽理論準拠エンジン
│   ├── pitchSpelling.ts   # 音名・異名同音処理
│   ├── tunings.ts         # チューニング定義（13種類）
│   ├── i18n.ts            # 国際化（4言語）
│   └── audioSynthesis.ts  # Web Audio合成
│
├── contexts/              # React Context
│   └── LanguageContext.tsx
│
├── python-backend/        # FastAPIバックエンド
│   ├── main.py            # APIエンドポイント
│   ├── Dockerfile
│   └── docker-compose.yml
│
└── public/                # 静的ファイル
    └── ads.txt           # AdSense設定
```

---

## 4. Current Development Phase

### Phase Status

| Phase | Status | Description |
|-------|--------|-------------|
| Phase 1 | ✅ Complete | 基本UI・スケール表示 |
| Phase 2 | ✅ Complete | 多言語対応・チューニング拡張 |
| Phase 3 | ✅ Complete | 音声解析UI・ダミーAPI |
| Phase 4 | 🔄 In Progress | 実音声解析実装 |
| Phase 5 | ⏳ Planned | 本番環境最適化 |

### Recent Commits
- `fc99041` - GA4トラッキングコード追加
- `f5de676` - AdSense審査対策（利用規約・記事追加・カルーセル）
- `0ced99b` - AdSense対応（必要ページ追加・多言語対応）
- `5e65617` - ads.txt for Google AdSense

---

## 5. Completed Features

### ✅ Frontend
- [x] インタラクティブ指板表示
- [x] 13スケール対応（メジャー〜都節）
- [x] 6〜9弦ギター対応
- [x] 13種類のチューニング対応
- [x] 半音下げチューニング対応
- [x] スケール音声再生
- [x] URLパラメータ対応（`?note=G&scale=メジャー`）
- [x] 多言語対応（4言語）
- [x] YouTube動画リファレンス
- [x] ファイルアップロードUI（Drag & Drop）
- [x] GA4トラッキング
- [x] AdSense審査用ページ（About, Contact, Terms, Privacy, Company）
- [x] 記事カルーセル

### ✅ Backend
- [x] FastAPI基本セットアップ
- [x] Dockerコンテナ化
- [x] ダミー解析エンドポイント
- [x] Vercel Blob連携

### ✅ Music Theory
- [x] 理論準拠スケールエンジン
- [x] 異名同音（エンハーモニック）処理
- [x] 度数表記対応

---

## 6. In Progress / TODO

### 🔄 High Priority

#### Backend Implementation (Phase 4)
- [ ] librosaによる実音声解析
- [ ] キー検出アルゴリズム
- [ ] コード進行検出
- [ ] スケールマッチングアルゴリズム
- [ ] 非同期ジョブキュー

#### Error Handling
- [ ] ネットワークエラーリカバリー
- [ ] 解析失敗時のリトライ
- [ ] バリデーション強化

### ⚠️ Medium Priority

#### Testing
- [ ] E2Eテスト追加
- [ ] ユニットテスト拡充
- [ ] 音楽理論エッジケーステスト

#### Performance
- [ ] モバイル指板レンダリング最適化
- [ ] スケール計算メモ化
- [ ] 遅延読み込み実装

#### Content
- [ ] ブログ記事本文作成
- [ ] SEO最適化

### 📋 Low Priority

#### Code Quality
- [ ] console.log削除（169箇所）
- [ ] 構造化ロギング導入
- [ ] CI/CDパイプライン構築

---

## 7. Known Issues

### Critical
- なし

### Major
1. **音声解析がダミー** - Phase 4で実装予定
2. **バックエンドデプロイ戦略未定** - ローカルDockerのみ

### Minor
1. モバイルでの指板タッチ操作改善余地
2. 解析進捗がリアルタイム更新でない
3. 一部のスケールで度数ラベル表示調整必要

---

## 8. Environment Setup

### Frontend
```bash
npm install
npm run dev      # localhost:3000
```

### Backend
```bash
cd python-backend
docker compose up --build
```

### Environment Variables (.env.local)
```env
PYTHON_BACKEND_URL=http://localhost:8000
STORAGE_MODE=vercel-blob  # local | vercel-blob | s3
TMP_DIR=/tmp/guitar-scale
```

---

## 9. Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                   Browser                            │
│  ┌───────────────────────────────────────────────┐  │
│  │  React 19 + TypeScript                        │  │
│  │  ├─ GuitarFretboard (指板表示)                │  │
│  │  ├─ AudioAnalyzer (解析フロー)                │  │
│  │  └─ Scale/Note Selectors                      │  │
│  └───────────────────────────────────────────────┘  │
└───────────────────┬─────────────────────────────────┘
                    │
      ┌─────────────┴─────────────┐
      │                           │
┌─────▼─────────────┐   ┌────────▼───────────────┐
│  Next.js 16       │   │  Vercel Blob           │
│  App Router       │   │  (音声ファイル保存)    │
│  └─ API Routes    │   │                        │
└─────┬─────────────┘   └────────────────────────┘
      │
┌─────▼─────────────────────────────┐
│  Python FastAPI (Docker)          │
│  ├─ POST /analyze                 │
│  ├─ librosa音声処理               │
│  └─ スケールマッチング            │
└───────────────────────────────────┘
```

---

## 10. Next Steps

### Immediate (Phase 4 Completion)
1. Pythonバックエンドの実音声解析実装
2. コード検出・スケールマッチングアルゴリズム
3. 非同期処理・ジョブキュー導入

### Short-term
1. 本番バックエンドデプロイ
2. エラーハンドリング強化
3. テストカバレッジ向上

### Mid-term
1. ユーザーアカウント機能
2. 解析履歴保存
3. 追加スケール・チューニング

---

## 11. File Reference

| Category | Key Files |
|----------|-----------|
| Entry Point | `app/page.tsx`, `app/layout.tsx` |
| Scale Logic | `lib/scales.ts`, `lib/scaleEngine.ts` |
| i18n | `lib/i18n.ts`, `contexts/LanguageContext.tsx` |
| Audio | `lib/audioSynthesis.ts`, `components/ScalePlayer.tsx` |
| Analysis | `components/AudioAnalyzer.tsx`, `python-backend/main.py` |
| Config | `next.config.ts`, `tailwind.config.ts`, `.env.local` |
| Spec | `scale_repare.md` (音楽理論仕様書) |
