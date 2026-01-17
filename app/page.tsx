'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import NoteSelector from '@/components/NoteSelector';
import ScaleSelector from '@/components/ScaleSelector';
import TuningSelector from '@/components/TuningSelector';
import ScalePlayer from '@/components/ScalePlayer';
import GuitarFretboard from '@/components/GuitarFretboard';
import YoutubeSection from '@/components/YoutubeSection';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import HelpButton from '@/components/HelpButton';
import BackgroundLogo from '@/components/BackgroundLogo';
import { getScaleNotes } from '@/lib/scales';
import { TuningId, TUNINGS, transposeTuning } from '@/lib/tunings';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import Footer from '@/components/Footer';

function HomeContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const [selectedNote, setSelectedNote] = useState('G');
  const [selectedScale, setSelectedScale] = useState('メジャー');
  const [selectedTuningId, setSelectedTuningId] = useState<TuningId>('standard_6');
  const [halfStepDown, setHalfStepDown] = useState(false);

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

  // スケール選択時のハンドラー（PC・スマホともに指板までスクロール）
  const handleScaleSelect = (scale: string) => {
    setSelectedScale(scale);

    // 指板までスクロール
    setTimeout(() => {
      const fretboardSection = document.getElementById('fretboard-section');
      if (fretboardSection) {
        fretboardSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const scaleNotes = getScaleNotes(selectedNote, selectedScale);

  // チューニングを計算（半音下げを適用）
  const baseTuning = TUNINGS[selectedTuningId];
  const tuning = halfStepDown ? transposeTuning(baseTuning, -1) : baseTuning;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* 背景ロゴ */}
      <BackgroundLogo />

      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* ヘッダーと言語切り替え */}
        <div className="flex justify-end mb-4">
          <LanguageSwitcher />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {t.appTitle}
          </h1>
          <p className="text-gray-600">{t.appSubtitle}</p>
        </div>

        {/* 音名選択 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            {t.selectRootNote}
          </h2>
          <NoteSelector
            selectedNote={selectedNote}
            onSelectNote={setSelectedNote}
          />
        </div>

        {/* スケール選択 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            {t.selectScale}
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
            {t.audioAnalysisLink}
          </Link>
          <p className="text-sm text-gray-500 mt-2">
            {t.audioAnalysisDesc}
          </p>
        </div>

        {/* 選択中のスケール表示 */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            {selectedNote} {t.scaleNames[selectedScale]} {t.currentScale}
          </h2>
          <div className="mt-2 text-gray-600">
            {t.notes}: {scaleNotes.join(' - ')}
          </div>
        </div>

        {/* YouTube参考動画セクション */}
        <YoutubeSection rootNote={selectedNote} currentScale={selectedScale} />

        {/* チューニング選択（指板の直前） */}
        <div id="fretboard-section" className="mb-2">
          <TuningSelector
            selectedTuningId={selectedTuningId}
            onSelectTuning={setSelectedTuningId}
            halfStepDown={halfStepDown}
            onToggleHalfStep={setHalfStepDown}
          />
        </div>

        {/* スケール再生 */}
        <div className="mb-4">
          <ScalePlayer
            rootNote={selectedNote}
            scaleNotes={scaleNotes}
            scaleName={selectedScale}
          />
        </div>

        {/* ギター指板 */}
        <div className="mb-8">
          <GuitarFretboard
            rootNote={selectedNote}
            scaleNotes={scaleNotes}
            scaleName={selectedScale}
            tuningStrings={tuning.strings}
            numFrets={15}
          />
        </div>

        {/* フローティングヘルプボタン */}
        <HelpButton />
      </main>

      <Footer />
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
