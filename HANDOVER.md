# 引き継ぎ書

**作成日**: 2026-02-03
**プロジェクト**: ギタースケールわかる君 (guitar-scale.com)

---

## 今回のセッションで完了した作業

### Google AdSense審査対応（メタデータ層の実装）

以前のエージェントがコンテンツ層（ページ追加）を実装済みだったが、メタデータ層（Googleクローラー向け）が不足していたため補完。

#### 実装内容

| 項目 | 対応内容 |
|------|----------|
| **metadataBase** | `https://www.guitar-scale.com` を設定 |
| **タイトルテンプレート** | `%s \| ギタースケールわかる君` で統一 |
| **JSON-LD構造化データ** | WebApplication, Organization, WebSite スキーマ追加 |
| **OpenGraph / Twitter Card** | 全ページに設定、画像は `/icon.png` |
| **canonical URL** | 全ページに設定 |
| **メタデータ言語統一** | 英語→日本語に修正（5ページ） |
| **カスタム404ページ** | `app/not-found.tsx` 新規作成、多言語対応 |

#### 修正したファイル一覧

**新規作成:**
- `app/HomeClient.tsx` - ホームページUI（Client Component分離）
- `app/analysis/AnalysisClient.tsx` - 解析ページUI（Client Component分離）
- `app/not-found.tsx` - カスタム404ページ

**更新:**
- `app/layout.tsx` - metadataBase, JSON-LD, OGP/Twitter設定
- `app/page.tsx` - メタデータ追加、Server Component化
- `app/analysis/page.tsx` - メタデータ追加、Server Component化
- `app/about/layout.tsx` - 日本語メタデータ + OGP
- `app/privacy/layout.tsx` - 日本語メタデータ + OGP
- `app/terms/layout.tsx` - 日本語メタデータ + OGP
- `app/contact/layout.tsx` - OGP追加
- `app/company/layout.tsx` - 日本語メタデータ + OGP
- `app/articles/page.tsx` - タイトル修正
- `app/articles/*/layout.tsx` - 全記事のタイトル修正
- `lib/i18n.ts` - 404ページ用翻訳追加（4言語）

### レビュー指摘対応

| 指摘 | 対応 |
|------|------|
| タイトル二重問題 | 各ページから「\| ギタースケールわかる君」を削除（templateで自動追加） |
| JSON-LD logo 404 | `icon-512x512.png` → `/icon.png` に変更 |
| OG/Twitter画像なし | `/icon.png` を設定 |

### スキル作成

`~/.claude/skills/adsense-ready/` に AdSense対応スキルを作成。
今後「AdSense対応」を依頼した際、コンテンツ層とメタデータ層の両方を実装するようになる。

---

## 未完了のタスク

### タスク #7: 多言語SEO対応（URL分割 + hreflang実装）

**優先度**: 中
**規模**: 大（別セッションで対応推奨）

**現状の問題:**
- 多言語はlocalStorage切り替えのみ
- URLと`<html lang>`が固定（ja）
- Googleは日本語のみを認識する構造

**必要な対応:**
1. URL構造変更: `/ja/`, `/en/`, `/zh/`, `/es/`
2. Next.js i18n設定（App Router の `[locale]` 動的ルート）
3. hreflang実装（`alternates.languages`）
4. `<html lang>` 動的切り替え
5. サイトマップ多言語対応
6. 言語切り替えUIをURL遷移に変更

**影響範囲:**
- ディレクトリ構造の大幅変更
- 全ページのルーティング変更
- LanguageContext の仕組み変更

### 低優先度: sitemap lastModified

**現状**: すべて `new Date()` でビルド時刻固定
**理想**: 記事の公開日・更新日を使用
**対応**: 記事管理の仕組みが必要。現状でも大きな問題にはならない。

---

## 重要な設定情報

### ドメイン
```
本番: https://www.guitar-scale.com
```

### サイトマップ
```
https://www.guitar-scale.com/sitemap.xml
```

### Google関連
- **Google Analytics**: G-8PHC5QFD29
- **Google Search Console**: サイトマップ送信済み（13ページ検出）

### AdSense
- `public/ads.txt` に設定済み
- pub-ID は AdSense 管理画面から取得

---

## デプロイ後の作業

1. **Google Search Console**
   - サイトマップ再送信
   - 主要ページのURL検査でインデックス登録リクエスト
     - `/`
     - `/articles`
     - `/analysis`

2. **構造化データ検証**
   - https://search.google.com/test/rich-results でJSON-LD確認

---

## 技術的な注意点

### Server Component / Client Component 分離

Next.js App Router では `'use client'` があるとメタデータをエクスポートできない。
パターン:
```
app/page.tsx        → Server Component（メタデータ定義）
app/PageClient.tsx  → Client Component（UI、hooks使用）
```

### タイトルテンプレート

`app/layout.tsx` で設定:
```typescript
title: {
  default: 'ギタースケールわかる君',
  template: '%s | ギタースケールわかる君',
}
```

各ページでは短いタイトルのみ設定（サイト名は自動追加される）。
ホームページのみ `title: { absolute: '...' }` で上書き。

---

## 連絡事項

- ビルド成功確認済み（`npm run build`）
- TypeScriptエラーなし
- 全19ページが静的プリレンダリング
