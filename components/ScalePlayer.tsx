'use client';

import { useState } from 'react';
import { playScale } from '@/lib/audioSynthesis';
import { useLanguage } from '@/contexts/LanguageContext';

interface ScalePlayerProps {
  rootNote: string;
  scaleNotes: string[];
  scaleName: string;
}

export default function ScalePlayer({
  rootNote,
  scaleNotes,
  scaleName,
}: ScalePlayerProps) {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [stopFunction, setStopFunction] = useState<(() => void) | null>(null);

  const handlePlay = () => {
    if (isPlaying || scaleNotes.length === 0) return;

    setIsPlaying(true);

    playScale(
      scaleNotes,
      // 再生完了時
      () => {
        setIsPlaying(false);
        setStopFunction(null);
      },
      // 停止関数を受け取る
      (stopFn) => {
        setStopFunction(() => stopFn);
      }
    );
  };

  const handleStop = () => {
    if (stopFunction) {
      stopFunction();
      setIsPlaying(false);
      setStopFunction(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-700">
            {t.playScale}
          </h3>
          {isPlaying && (
            <p className="text-xs text-blue-600 mt-1">
              {t.playing}...
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {!isPlaying ? (
            <button
              onClick={handlePlay}
              disabled={scaleNotes.length === 0}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium
                transition-all duration-200
                ${scaleNotes.length === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-md hover:shadow-lg'
                }
              `}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              <span className="text-sm">{t.playScale}</span>
            </button>
          ) : (
            <button
              onClick={handleStop}
              className="
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium
                bg-red-600 text-white hover:bg-red-700 active:bg-red-800
                shadow-md hover:shadow-lg transition-all duration-200
              "
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <rect x="6" y="6" width="12" height="12" />
              </svg>
              <span className="text-sm">{t.stopPlayback}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
