import { SCALE_NAMES } from '@/lib/scales';

interface ScaleSelectorProps {
  selectedScale: string;
  onSelectScale: (scale: string) => void;
}

export default function ScaleSelector({ selectedScale, onSelectScale }: ScaleSelectorProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2 justify-center">
        {SCALE_NAMES.map(scale => (
          <button
            key={scale}
            onClick={() => onSelectScale(scale)}
            className={`
              px-4 py-2 rounded-full font-medium text-sm transition-all
              ${selectedScale === scale
                ? 'bg-yellow-400 text-black shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }
            `}
          >
            {scale}
          </button>
        ))}
      </div>
    </div>
  );
}
