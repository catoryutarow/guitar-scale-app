'use client';

import { TuningId, TUNINGS, TUNING_CATEGORIES } from '@/lib/tunings';

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
  return (
    <div className="space-y-4">
      {/* チューニング選択 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Standard Tunings */}
        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Standard</h3>
          <div className="space-y-2">
            {TUNING_CATEGORIES.standard.map(tuningId => (
              <button
                key={tuningId}
                onClick={() => onSelectTuning(tuningId)}
                className={`
                  w-full text-left px-3 py-2 rounded-lg text-sm font-medium
                  transition-all duration-200
                  ${selectedTuningId === tuningId
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }
                `}
              >
                {TUNINGS[tuningId].label.split(' - ')[0]}
                <div className="text-xs opacity-75 mt-0.5">
                  {TUNINGS[tuningId].strings.join(' ')}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Drop Tunings */}
        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Drop</h3>
          <div className="space-y-2">
            {TUNING_CATEGORIES.drop.map(tuningId => (
              <button
                key={tuningId}
                onClick={() => onSelectTuning(tuningId)}
                className={`
                  w-full text-left px-3 py-2 rounded-lg text-sm font-medium
                  transition-all duration-200
                  ${selectedTuningId === tuningId
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }
                `}
              >
                {TUNINGS[tuningId].label.split(' - ')[0]}
                <div className="text-xs opacity-75 mt-0.5">
                  {TUNINGS[tuningId].strings.join(' ')}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Open & Alternate Tunings */}
        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Open & Alternate</h3>
          <div className="space-y-2">
            {[...TUNING_CATEGORIES.open, ...TUNING_CATEGORIES.alternate].map(tuningId => (
              <button
                key={tuningId}
                onClick={() => onSelectTuning(tuningId)}
                className={`
                  w-full text-left px-3 py-2 rounded-lg text-sm font-medium
                  transition-all duration-200
                  ${selectedTuningId === tuningId
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }
                `}
              >
                {TUNINGS[tuningId].label.split(' - ')[0]}
                <div className="text-xs opacity-75 mt-0.5">
                  {TUNINGS[tuningId].strings.join(' ')}
                </div>
              </button>
            ))}
          </div>
        </div>
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
            Half-step down (全弦 -1)
          </span>
        </label>
      </div>

      {/* 現在のチューニング表示 */}
      <div className="text-center text-sm text-gray-600">
        <span className="font-semibold">Current: </span>
        {TUNINGS[selectedTuningId].label}
        {halfStepDown && ' (Half-step down)'}
      </div>
    </div>
  );
}
