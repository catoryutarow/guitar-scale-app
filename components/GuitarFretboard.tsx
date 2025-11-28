import { GUITAR_TUNING, getNoteAtPosition, isNoteInScale, getScaleDegree, getPitchClass } from '@/lib/scales';

interface GuitarFretboardProps {
  rootNote: string;
  scaleNotes: string[];
  numFrets?: number;
}

export default function GuitarFretboard({ rootNote, scaleNotes, numFrets = 12 }: GuitarFretboardProps) {
  const fretMarkers = [3, 5, 7, 9, 12, 15, 17, 19, 21];
  const doubleFretMarkers = [12];

  // 弦を逆順にして表示（上から1弦、2弦...6弦の順）
  const reversedTuning = [...GUITAR_TUNING].reverse();

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="min-w-[800px] relative bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg p-6 shadow-2xl">
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
            // 元の配列でのインデックスを計算（6弦=0, 5弦=1, ..., 1弦=5）
            const actualStringIndex = GUITAR_TUNING.length - 1 - displayIndex;

            return (
              <div key={displayIndex} className="relative mb-3">
                <div className="flex items-center">
                  {/* 開放弦の音名 */}
                  <div className="w-12 text-white font-semibold text-sm text-center">
                    {openString}
                  </div>

                  {/* フレット */}
                  <div className="flex-1 relative">
                    {/* 弦（下の弦ほど太く） */}
                    <div
                      className="absolute top-1/2 left-0 right-0 bg-gray-400"
                      style={{ height: `${1 + (reversedTuning.length - 1 - displayIndex) * 0.3}px` }}
                    />

                    {/* フレットとポジションマーカー */}
                    <div className="flex relative">
                      {Array.from({ length: numFrets + 1 }, (_, fret) => {
                        const note = getNoteAtPosition(actualStringIndex, fret, rootNote, scaleNotes);
                        const inScale = isNoteInScale(note, scaleNotes);
                        const degree = getScaleDegree(note, scaleNotes);
                        const isRoot = getPitchClass(note) === getPitchClass(rootNote);

                        return (
                          <div key={fret} className="flex-1 relative h-12 flex items-center justify-center">
                            {/* フレットバー */}
                            {fret > 0 && (
                              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-300" />
                            )}

                            {/* ポジションマーカー（音符） */}
                            {inScale && (
                              <div className="relative z-10">
                                <div
                                  className={`
                                    w-10 h-10 rounded-full flex flex-col items-center justify-center
                                    font-bold text-sm shadow-lg transition-transform hover:scale-110
                                    ${isRoot
                                      ? 'bg-yellow-400 text-black ring-4 ring-yellow-600'
                                      : 'bg-yellow-300 text-black'
                                    }
                                  `}
                                >
                                  <span className="text-xs">{note}</span>
                                  {degree !== null && (
                                    <span className="text-[10px] text-gray-700">{degree}</span>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* フレットマーカー（ドット）- 3弦と4弦の間に表示 */}
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
    </div>
  );
}
