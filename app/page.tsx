import { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'ギタースケールわかる君 | ギタースケールを視覚的に学べる無料アプリ',
  description: 'ギタースケールを視覚的に学べる無料ウェブアプリ。40種類以上のスケールをギター指板上で確認、音源自動解析でキー判定も可能。初心者からプロまで使えるギター練習ツール。',
  openGraph: {
    title: 'ギタースケールわかる君 | ギタースケールを視覚的に学べる無料アプリ',
    description: 'ギタースケールを視覚的に学べる無料ウェブアプリ。40種類以上のスケールをギター指板上で確認、音源自動解析でキー判定も可能。',
    url: 'https://www.guitar-scale.com',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.guitar-scale.com',
  },
};

export default function Home() {
  return <HomeClient />;
}
