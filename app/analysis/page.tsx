'use client';

import { useRouter } from 'next/navigation';
import AudioAnalyzer from '@/components/AudioAnalyzer';
import Link from 'next/link';

export default function AnalysisPage() {
  const router = useRouter();

  // 音源解析結果からのスケール切り替えハンドラー
  const handleScaleSelectFromAnalysis = (rootNote: string, scaleName: string) => {
    // メインページに遷移してスケールを選択状態にする
    router.push(`/?note=${encodeURIComponent(rootNote)}&scale=${encodeURIComponent(scaleName)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="container mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            音源自動解析
          </h1>
          <p className="text-gray-600">Audio Analysis for Guitar Scales</p>

          {/* デバッグ: JavaScriptテスト */}
          <button
            onClick={() => {
              alert('✅ JavaScriptが動作しています！');
              console.log('✅ Test button clicked');
            }}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            🧪 JavaScript動作テスト
          </button>
        </div>

        {/* 戻るリンク */}
        <div className="max-w-4xl mx-auto mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            スケール選択画面に戻る
          </Link>
        </div>

        {/* 音源解析セクション */}
        <AudioAnalyzer onScaleSelect={handleScaleSelectFromAnalysis} />

        {/* 説明 */}
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">音源解析の使い方</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>MP3、WAV、M4Aなどの音源ファイルをアップロード</li>
            <li>AIが自動的にキー（ルート音）とスケールを検出</li>
            <li>検出されたコード進行をタイムライン表示</li>
            <li>マッチするスケールの候補を複数提案</li>
            <li>「このスケールで練習する」ボタンで指板表示画面に移動</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
