/**
 * コード進行タイムライン コンポーネント（簡略版）
 *
 * 役割：
 * - 冒頭のコード進行（最初の4〜6個）のみを表示
 * - シンプルで見やすい表示
 */

'use client';

import type { ChordTimelineProps } from '@/lib/audio-analysis-types';

export default function ChordTimeline({
  chordProgression,
}: ChordTimelineProps) {
  // 最初の6個のコードのみを取得
  const displayChords = chordProgression.slice(0, 6);

  return (
    <div className="w-full bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-5 border-2 border-indigo-200">
      <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
        <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
        冒頭のコード進行（推定）
      </h3>

      {/* コード進行が空の場合 */}
      {displayChords.length === 0 ? (
        <div className="text-center py-4 text-gray-500 text-sm">
          コード進行が検出されませんでした
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {displayChords.map((chord, index) => (
            <div
              key={index}
              className="inline-flex items-center px-4 py-2 bg-white rounded-lg border-2 border-indigo-200 shadow-sm"
            >
              <span className="text-xs text-gray-500 mr-2">{index + 1}.</span>
              <span className="text-xl font-bold text-gray-800">{chord.chord}</span>
            </div>
          ))}
        </div>
      )}

      {/* 説明テキスト */}
      <div className="mt-3 text-xs text-gray-600">
        ※ AIによる推定結果です。実際のコード進行と異なる場合があります。
      </div>
    </div>
  );
}
