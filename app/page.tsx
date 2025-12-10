'use client';

import { useState } from 'react';
import NoteSelector from '@/components/NoteSelector';
import ScaleSelector from '@/components/ScaleSelector';
import GuitarFretboard from '@/components/GuitarFretboard';
import YoutubeSection from '@/components/YoutubeSection';
import AudioAnalyzer from '@/components/AudioAnalyzer';
import { getScaleNotes } from '@/lib/scales';

export default function Home() {
  const [selectedNote, setSelectedNote] = useState('G');
  const [selectedScale, setSelectedScale] = useState('メジャー');

  const scaleNotes = getScaleNotes(selectedNote, selectedScale);

  // 音源解析結果からのスケール切り替えハンドラー
  const handleScaleSelectFromAnalysis = (rootNote: string, scaleName: string) => {
    setSelectedNote(rootNote);
    setSelectedScale(scaleName);

    // スムーズスクロールで指板まで移動
    setTimeout(() => {
      const fretboardSection = document.getElementById('fretboard-section');
      if (fretboardSection) {
        fretboardSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

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
            onSelectScale={setSelectedScale}
          />
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

        {/* 音源解析セクション */}
        <AudioAnalyzer onScaleSelect={handleScaleSelectFromAnalysis} />

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
