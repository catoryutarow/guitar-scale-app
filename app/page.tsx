'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import NoteSelector from '@/components/NoteSelector';
import ScaleSelector from '@/components/ScaleSelector';
import GuitarFretboard from '@/components/GuitarFretboard';
import YoutubeSection from '@/components/YoutubeSection';
import { getScaleNotes } from '@/lib/scales';
import Link from 'next/link';

function HomeContent() {
  const searchParams = useSearchParams();
  const [selectedNote, setSelectedNote] = useState('G');
  const [selectedScale, setSelectedScale] = useState('メジャー');

  // URLパラメータからnoteとscaleを取得
  useEffect(() => {
    const noteParam = searchParams.get('note');
    const scaleParam = searchParams.get('scale');

    if (noteParam) {
      setSelectedNote(noteParam);
    }
    if (scaleParam) {
      setSelectedScale(scaleParam);
    }

    // パラメータがあれば指板までスクロール
    if (noteParam || scaleParam) {
      setTimeout(() => {
        const fretboardSection = document.getElementById('fretboard-section');
        if (fretboardSection) {
          fretboardSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [searchParams]);

  // スケール選択時のハンドラー（スマホのみスクロール）
  const handleScaleSelect = (scale: string) => {
    setSelectedScale(scale);

    // スマホ判定（画面幅768px以下）
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setTimeout(() => {
        const fretboardSection = document.getElementById('fretboard-section');
        if (fretboardSection) {
          fretboardSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const scaleNotes = getScaleNotes(selectedNote, selectedScale);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="container mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            ギタースケールわかる君
          </h1>
          <p className="text-gray-600">Guitar Scale Visualizer</p>
        </div>

        {/* 音名選択 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            ルート音を選択
          </h2>
          <NoteSelector
            selectedNote={selectedNote}
            onSelectNote={setSelectedNote}
          />
        </div>

        {/* スケール選択 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            スケールを選択
          </h2>
          <ScaleSelector
            selectedScale={selectedScale}
            onSelectScale={handleScaleSelect}
          />
        </div>

        {/* 音源自動解析へのリンク */}
        <div className="text-center mb-8">
          <Link
            href="/analysis"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
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
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </svg>
            音源からスケールを自動解析
          </Link>
          <p className="text-sm text-gray-500 mt-2">
            音源ファイルをアップロードして自動でスケールを検出
          </p>
        </div>

        {/* 選択中のスケール表示 */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            {selectedNote} {selectedScale} スケール
          </h2>
          <div className="mt-2 text-gray-600">
            構成音: {scaleNotes.join(' - ')}
          </div>
        </div>

        {/* YouTube参考動画セクション */}
        <YoutubeSection rootNote={selectedNote} currentScale={selectedScale} />

        {/* ギター指板 */}
        <div id="fretboard-section" className="mb-8">
          <GuitarFretboard
            rootNote={selectedNote}
            scaleNotes={scaleNotes}
            numFrets={15}
          />
        </div>

        {/* 説明 */}
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">使い方</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>ルート音（キー）を選択してください</li>
            <li>切り替えボタンで♯系/♭系を変更できます</li>
            <li>表示したいスケールを選択してください</li>
            <li>黄色の丸がスケール上の音を示しています</li>
            <li>濃い黄色の丸がルート音（1度）を示しています</li>
            <li>数字はスケール内での度数（1-7）を表します</li>
            <li>音名は、メジャースケールのディグリーを基準に音楽理論的に正しく表示されます</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
