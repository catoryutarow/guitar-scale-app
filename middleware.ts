import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale, isValidLocale } from '@/lib/locale-config';

/**
 * 多言語対応のためのミドルウェア
 * - ロケールなしのURLを /ja/ にリダイレクト
 * - API、静的ファイル、_next などはスキップ
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // スキップするパスのパターン
  const skipPatterns = [
    '/api/',
    '/_next/',
    '/favicon.ico',
    '/icon.png',
    '/apple-touch-icon.png',
    '/robots.txt',
    '/sitemap.xml',
    '/ads.txt',
    '/manifest.webmanifest',
    '/.well-known/',
    '/opengraph-image',
    '/twitter-image',
  ];

  // 静的ファイル拡張子
  const staticExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.webp', '.mp3', '.wav', '.ogg', '.txt', '.xml', '.json'];

  // スキップパターンに一致する場合はスルー
  if (skipPatterns.some(pattern => pathname.startsWith(pattern))) {
    return NextResponse.next();
  }

  // 静的ファイル拡張子の場合はスルー
  if (staticExtensions.some(ext => pathname.endsWith(ext))) {
    return NextResponse.next();
  }

  // パスの最初のセグメントを取得
  const pathSegments = pathname.split('/').filter(Boolean);
  const firstSegment = pathSegments[0];

  // すでにロケールが含まれている場合はスルー
  if (firstSegment && isValidLocale(firstSegment)) {
    return NextResponse.next();
  }

  // ロケールがない場合、デフォルトロケールにリダイレクト
  const url = request.nextUrl.clone();

  // 末尾スラッシュを正規化（/ja に統一、/ja/ は避ける）
  const normalizedPath = pathname === '/' ? '' : pathname.replace(/\/$/, '');
  url.pathname = `/${defaultLocale}${normalizedPath}`;

  // 308 Permanent Redirect
  return NextResponse.redirect(url, 308);
}

export const config = {
  // ミドルウェアを適用するパスのマッチャー
  matcher: [
    // APIルート、_next、静的ファイル、OG画像、ads.txtを除外
    '/((?!api|_next/static|_next/image|favicon.ico|icon.png|apple-touch-icon.png|robots.txt|sitemap.xml|ads.txt|manifest.webmanifest|opengraph-image|twitter-image).*)',
  ],
};
