import { ROOT_NOTES, ENHARMONIC_PAIRS } from '@/lib/scales';

interface NoteSelectorProps {
  selectedNote: string;
  onSelectNote: (note: string) => void;
}

export default function NoteSelector({ selectedNote, onSelectNote }: NoteSelectorProps) {
  // 選択中の音のエンハーモニックをチェック
  const hasEnharmonic = ENHARMONIC_PAIRS[selectedNote] !== undefined;
  const enharmonicNote = ENHARMONIC_PAIRS[selectedNote];

  const handleEnharmonicToggle = () => {
    if (enharmonicNote) {
      onSelectNote(enharmonicNote);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {ROOT_NOTES.map(({ note, display }) => (
          <button
            key={note}
            onClick={() => onSelectNote(note)}
            className={`
              relative w-20 h-16 rounded-lg font-semibold text-sm transition-all
              ${selectedNote === note || (enharmonicNote && enharmonicNote === note)
                ? 'bg-yellow-400 text-black shadow-lg scale-105'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }
            `}
          >
            {display}
          </button>
        ))}
      </div>

      {/* エンハーモニック切り替えボタン */}
      {hasEnharmonic && (
        <div className="flex justify-center">
          <button
            onClick={handleEnharmonicToggle}
            className="px-6 py-2 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors shadow-md"
          >
            {selectedNote} → {enharmonicNote} に切り替え
          </button>
        </div>
      )}
    </div>
  );
}
