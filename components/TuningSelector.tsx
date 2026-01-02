'use client';

import { useState } from 'react';
import { TuningId, TUNINGS, groupTuningsByInstrument, InstrumentId } from '@/lib/tunings';
import { useLanguage } from '@/contexts/LanguageContext';

interface TuningSelectorProps {
  selectedTuningId: TuningId;
  onSelectTuning: (tuningId: TuningId) => void;
  halfStepDown: boolean;
  onToggleHalfStep: (halfStepDown: boolean) => void;
}

export default function TuningSelector({
  selectedTuningId,
  onSelectTuning,
  halfStepDown,
  onToggleHalfStep,
}: TuningSelectorProps) {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const groupedTunings = groupTuningsByInstrument();

  // 楽器ラベルマッピング
  const instrumentLabels: Record<InstrumentId, string> = {
    guitar: t.instrumentGuitar,
    guitar_3: t.instrumentGuitar3,
    ukulele: t.instrumentUkulele,
    bass_4: t.instrumentBass4,
    bass_5: t.instrumentBass5,
  };

  // 表示順序を定義
  const instrumentOrder: InstrumentId[] = ['guitar', 'guitar_3', 'ukulele', 'bass_4', 'bass_5'];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      {/* ヘッダー部分（常に表示） */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left"
      >
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{t.tuningSelection}</h3>
          <p className="text-sm text-gray-600 mt-1">
            {t.currentTuning}: {TUNINGS[selectedTuningId].label}
            {halfStepDown && ' (Half-step down)'}
          </p>
        </div>
        <svg
          className={`w-6 h-6 text-gray-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 展開可能なコンテンツ */}
      {isExpanded && (
        <div className="mt-4 space-y-4 pt-4 border-t border-gray-200">
          {/* チューニング選択（楽器別） */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {instrumentOrder.map(instrumentId => {
              const tunings = groupedTunings[instrumentId];
              if (!tunings || tunings.length === 0) return null;

              return (
                <div key={instrumentId}>
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">
                    {instrumentLabels[instrumentId]}
                  </h3>
                  <div className="space-y-2">
                    {tunings.map(tuning => (
                      <button
                        key={tuning.id}
                        onClick={() => onSelectTuning(tuning.id)}
                        className={`
                          w-full text-left px-3 py-2 rounded-lg text-sm font-medium
                          transition-all duration-200
                          ${selectedTuningId === tuning.id
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                          }
                        `}
                      >
                        {tuning.label.split(' - ')[0]}
                        <div className="text-xs opacity-75 mt-0.5">
                          {tuning.strings.join(' ')}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 半音下げトグル */}
          <div className="flex items-center justify-center pt-2">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={halfStepDown}
                onChange={(e) => onToggleHalfStep(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                {t.halfStepDown}
              </span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
