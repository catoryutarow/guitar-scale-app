'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { isValidLocale } from '@/lib/locale-config';
import { ComponentProps } from 'react';

type LocaleLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string;
};

/**
 * ロケール対応のLinkコンポーネント
 * 現在のロケールを自動的にパスに付与する
 */
export default function LocaleLink({ href, ...props }: LocaleLinkProps) {
  const pathname = usePathname();

  // 現在のロケールを取得
  const segments = pathname.split('/').filter(Boolean);
  const currentLocale = segments[0] && isValidLocale(segments[0]) ? segments[0] : 'ja';

  // 外部リンクや特殊なパスの場合はそのまま
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) {
    return <Link href={href} {...props} />;
  }

  // パスにすでにロケールが含まれている場合はそのまま
  const hrefSegments = href.split('/').filter(Boolean);
  if (hrefSegments[0] && isValidLocale(hrefSegments[0])) {
    return <Link href={href} {...props} />;
  }

  // ロケールを先頭に追加
  const localizedHref = `/${currentLocale}${href.startsWith('/') ? href : `/${href}`}`;

  return <Link href={localizedHref} {...props} />;
}
