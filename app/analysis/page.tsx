import { Metadata } from 'next';
import AnalysisClient from './AnalysisClient';

export const metadata: Metadata = {
  title: '音源解析・キー判定',
  description: '音源ファイルをアップロードするだけで自動的にキー（調）を解析。楽曲のスケールを判定し、ギター指板上で確認できます。',
  openGraph: {
    title: '音源解析・キー判定 | ギタースケールわかる君',
    description: '音源ファイルをアップロードするだけで自動的にキー（調）を解析。楽曲のスケールを判定し、ギター指板上で確認できます。',
    url: 'https://guitar-scale-wakarun.com/analysis',
    type: 'website',
  },
  alternates: {
    canonical: 'https://guitar-scale-wakarun.com/analysis',
  },
};

export default function AnalysisPage() {
  return <AnalysisClient />;
}
