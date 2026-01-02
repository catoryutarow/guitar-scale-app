'use client';

import { useState } from 'react';
import { getNoteAtPosition, isNoteInScale, getScaleDegreeLabel, getPitchClass } from '@/lib/scales';
import { useLanguage } from '@/contexts/LanguageContext';

interface GuitarFretboardProps {
  rootNote: string;
  scaleNotes: string[];
  scaleName: string;
  tuningStrings: string[]; // low -> high
  numFrets?: number;
}

export default function GuitarFretboard({ rootNote, scaleNotes, scaleName, tuningStrings, numFrets = 12 }: GuitarFretboardProps) {
  const { t } = useLanguage();
  const fretMarkers = [3, 5, 7, 9, 12, 15, 17, 19, 21];
  const doubleFretMarkers = [12];
  const [isRotated, setIsRotated] = useState(false);

  // 弦を逆順にして表示（上から1弦、2弦...n弦の順）
  const reversedTuning = [...tuningStrings].reverse();

  // 回転をトグル
  const toggleRotation = () => {
    setIsRotated(!isRotated);
  };

  // 指板のレンダリング関数
  const renderFretboard = () => (
    <div className="min-w-[900px] relative bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg p-6 shadow-2xl">
      {/* ヘッドストック */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-800 to-gray-700 rounded-l-lg" />

      {/* 弦とフレット */}
      <div className="ml-8 relative">
        {/* フレット番号 */}
        <div className="flex mb-2">
          <div className="w-12"></div>
          {Array.from({ length: numFrets + 1 }, (_, fret) => (
            <div key={fret} className="flex-1 text-center">
              {fret > 0 && (
                <span className="text-xs text-gray-300 font-semibold">{fret}</span>
              )}
            </div>
          ))}
        </div>

        {/* 各弦 */}
        {reversedTuning.map((openString, displayIndex) => {
          const actualStringIndex = tuningStrings.length - 1 - displayIndex;

          return (
            <div key={displayIndex} className="relative mb-3">
              <div className="flex items-center">
                <div className="w-12 text-white font-semibold text-sm text-center">
                  {openString}
                </div>

                <div className="flex-1 relative">
                  <div
                    className="absolute top-1/2 left-0 right-0 bg-gray-400"
                    style={{ height: `${1 + (reversedTuning.length - 1 - displayIndex) * 0.3}px` }}
                  />

                  <div className="flex relative">
                    {Array.from({ length: numFrets + 1 }, (_, fret) => {
                      const note = getNoteAtPosition(actualStringIndex, fret, rootNote, scaleNotes, tuningStrings);
                      const inScale = isNoteInScale(note, scaleNotes);
                      const degreeLabel = getScaleDegreeLabel(note, rootNote, scaleName, scaleNotes);
                      const isRoot = getPitchClass(note) === getPitchClass(rootNote);

                      return (
                        <div key={fret} className="flex-1 relative h-12 flex items-center justify-center">
                          {fret > 0 && (
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-300" />
                          )}

                          {inScale && (
                            <div className="relative z-10">
                              <div
                                className={`
                                  w-10 h-10 rounded-full flex flex-col items-center justify-center
                                  font-bold text-sm shadow-lg transition-transform hover:scale-110
                                  ${isRoot
                                    ? 'bg-yellow-400 text-black ring-4 ring-yellow-600'
                                    : 'bg-yellow-300 text-gray-900'
                                  }
                                `}
                              >
                                <span className="text-xs">{note}</span>
                                <span className="text-[10px] text-gray-700">{degreeLabel}</span>
                              </div>
                            </div>
                          )}

                          {displayIndex === 2 && fret > 0 && fretMarkers.includes(fret) && (
                            <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2">
                              {doubleFretMarkers.includes(fret) ? (
                                <div className="flex gap-1">
                                  <div className="w-2 h-2 rounded-full bg-gray-400" />
                                  <div className="w-2 h-2 rounded-full bg-gray-400" />
                                </div>
                              ) : (
                                <div className="w-2 h-2 rounded-full bg-gray-400" />
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="relative">
      {/* 回転ヒント（モバイル用） */}
      <div className="md:hidden text-center mb-2">
        <button
          onClick={toggleRotation}
          className="inline-flex items-center text-xs text-gray-700 bg-white rounded-full px-4 py-2 shadow hover:bg-gray-50 active:bg-gray-100 transition-colors"
        >
          <svg
            className={`w-4 h-4 mr-1 transition-transform duration-300 ${isRotated ? 'rotate-90' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {isRotated ? t.returnToNormal : t.tapToRotate}
        </button>
      </div>

      {/* 回転時フルスクリーンオーバーレイ（モバイル専用） */}
      {isRotated && (
        <div className="md:hidden fixed inset-0 z-50 bg-gray-900 flex items-center justify-center">
          {/* 元に戻すボタン（フルスクリーン内） */}
          <div className="absolute top-4 right-4 z-60">
            <button
              onClick={toggleRotation}
              className="inline-flex items-center text-xs text-white bg-gray-800 bg-opacity-80 rounded-full px-4 py-2 shadow-lg hover:bg-opacity-100 active:bg-gray-700 transition-colors"
            >
              <svg
                className="w-4 h-4 mr-1 transform rotate-90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              {t.returnToNormal}
            </button>
          </div>

          {/* 回転したコンテンツコンテナ */}
          <div
            style={{
              transform: 'rotate(-90deg)',
              transformOrigin: 'center center',
              width: '100vh',
              height: '100vw',
              maxWidth: '100vh',
              maxHeight: '100vw',
            }}
          >
            <div className="w-full h-full overflow-x-auto overflow-y-hidden flex items-center">
              <div className="py-4 px-4">
                {renderFretboard()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 通常表示 */}
      <div className={isRotated ? 'hidden md:block' : 'w-full'}>
        <div className="w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          {renderFretboard()}
        </div>
      </div>
    </div>
  );
}
