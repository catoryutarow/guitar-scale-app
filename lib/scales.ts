// 音名の定義（クロマティック、半音単位）
export const CHROMATIC_SCALE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const;

// すべての可能な音名（エンハーモニック含む）
export const ALL_NOTE_NAMES = [
  'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'E#', 'Fb',
  'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb',
  'B', 'B#', 'Cb'
];

// 音名から半音番号へのマッピング
const NOTE_TO_PITCH: { [key: string]: number } = {
  'C': 0, 'B#': 0,
  'C#': 1, 'Db': 1,
  'D': 2,
  'D#': 3, 'Eb': 3,
  'E': 4, 'Fb': 4,
  'E#': 5, 'F': 5,
  'F#': 6, 'Gb': 6,
  'G': 7,
  'G#': 8, 'Ab': 8,
  'A': 9,
  'A#': 10, 'Bb': 10,
  'B': 11, 'Cb': 11,
};

// 各キーのメジャースケール（音楽理論的に正しい音名）
export const MAJOR_SCALES: { [key: string]: string[] } = {
  'C': ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
  'G': ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
  'D': ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
  'A': ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
  'E': ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
  'B': ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'],
  'F#': ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#'],
  'C#': ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#'],

  'F': ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
  'Bb': ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'],
  'Eb': ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'],
  'Ab': ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'],
  'Db': ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C'],
  'Gb': ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F'],
  'Cb': ['Cb', 'Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bb'],
};

// エンハーモニック（異名同音）のペア
export const ENHARMONIC_PAIRS: { [key: string]: string } = {
  'C#': 'Db', 'Db': 'C#',
  'D#': 'Eb', 'Eb': 'D#',
  'F#': 'Gb', 'Gb': 'F#',
  'G#': 'Ab', 'Ab': 'G#',
  'A#': 'Bb', 'Bb': 'A#',
};

// キー選択肢（♯系と♭系）
export const ROOT_NOTES = [
  { note: 'C', display: 'C', enharmonic: null },
  { note: 'C#', display: 'C# / Db', enharmonic: 'Db' },
  { note: 'D', display: 'D', enharmonic: null },
  { note: 'D#', display: 'D# / Eb', enharmonic: 'Eb' },
  { note: 'E', display: 'E', enharmonic: null },
  { note: 'F', display: 'F', enharmonic: null },
  { note: 'F#', display: 'F# / Gb', enharmonic: 'Gb' },
  { note: 'G', display: 'G', enharmonic: null },
  { note: 'G#', display: 'G# / Ab', enharmonic: 'Ab' },
  { note: 'A', display: 'A', enharmonic: null },
  { note: 'A#', display: 'A# / Bb', enharmonic: 'Bb' },
  { note: 'B', display: 'B', enharmonic: null },
];

// スケールパターン（半音単位のインターバル）
export const SCALE_PATTERNS: { [key: string]: number[] } = {
  'メジャー': [0, 2, 4, 5, 7, 9, 11],
  'マイナー': [0, 2, 3, 5, 7, 8, 10],
  'ドリアン': [0, 2, 3, 5, 7, 9, 10],
  'ミクソリディアン': [0, 2, 4, 5, 7, 9, 10],
  'フリジアン': [0, 1, 3, 5, 7, 8, 10],
  'リディア': [0, 2, 4, 6, 7, 9, 11],
  'ロクリアン': [0, 1, 3, 5, 6, 8, 10],
  'ハーモニックマイナー': [0, 2, 3, 5, 7, 8, 11],
  'メロディックマイナー': [0, 2, 3, 5, 7, 9, 11],
  'ブルース': [0, 3, 5, 6, 7, 10],
  'ペンタトニックメジャー': [0, 2, 4, 7, 9],
  'ペンタトニックマイナー': [0, 3, 5, 7, 10],
};

// スケール名の配列（表示順）
export const SCALE_NAMES = Object.keys(SCALE_PATTERNS);

// ギターのチューニング（標準チューニング、6弦から1弦）
export const GUITAR_TUNING = ['E', 'A', 'D', 'G', 'B', 'E'];

// 音名から半音番号を取得
export function getPitchClass(note: string): number {
  const pitch = NOTE_TO_PITCH[note];
  if (pitch === undefined) {
    throw new Error(`Invalid note: ${note}`);
  }
  return pitch;
}

// メジャースケールのディグリー（度数）を基準に音名を決定
export function getScaleNoteNames(rootNote: string, intervals: number[]): string[] {
  const rootPitch = getPitchClass(rootNote);

  // ルート音のメジャースケールを取得（これが基準となる）
  const majorScale = MAJOR_SCALES[rootNote];

  if (!majorScale) {
    // メジャースケールが定義されていない場合は、エンハーモニックを試す
    const enharmonic = ENHARMONIC_PAIRS[rootNote];
    if (enharmonic && MAJOR_SCALES[enharmonic]) {
      return getScaleNoteNames(enharmonic, intervals);
    }
    // それでもない場合は、単純な変換
    return intervals.map(interval => {
      const pitch = (rootPitch + interval) % 12;
      return CHROMATIC_SCALE[pitch];
    });
  }

  // 自然音名（ナチュラルな7音）
  const naturalNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

  // ルート音の自然音名を取得
  const rootNatural = rootNote.replace(/[#b]/g, '');
  const rootNaturalIndex = naturalNotes.indexOf(rootNatural);

  return intervals.map((interval, index) => {
    const targetPitch = (rootPitch + interval) % 12;

    // このディグリーで使うべき自然音名を決定
    const degreeIndex = (rootNaturalIndex + index) % 7;
    const expectedNatural = naturalNotes[degreeIndex];

    // その自然音名を持つ音名を探す
    // 例：expectedNatural = 'A' なら、'A', 'A#', 'Ab' のいずれか
    const candidates = ALL_NOTE_NAMES.filter(n => n.startsWith(expectedNatural));

    for (const candidate of candidates) {
      if (getPitchClass(candidate) === targetPitch) {
        return candidate;
      }
    }

    // 見つからない場合は、メジャースケールから推測
    // これは理論上起こらないはずだが、フォールバック
    return CHROMATIC_SCALE[targetPitch];
  });
}

// スケールの音を計算（音楽理論的に正しい音名で）
export function getScaleNotes(rootNote: string, scaleName: string): string[] {
  const pattern = SCALE_PATTERNS[scaleName];
  if (!pattern) return [];

  return getScaleNoteNames(rootNote, pattern);
}

// キーに基づいて12音すべての正しい音名表記を取得
export function getChromaticScaleForKey(rootNote: string): string[] {
  // メジャースケールを基準とする
  const majorScale = MAJOR_SCALES[rootNote] || MAJOR_SCALES[ENHARMONIC_PAIRS[rootNote] || rootNote];

  if (!majorScale) {
    // デフォルトは♯系
    return ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  }

  // メジャースケールの7音のピッチをマッピング
  const scaleNoteMap = new Map<number, string>();
  for (const note of majorScale) {
    scaleNoteMap.set(getPitchClass(note), note);
  }

  // 12音すべてを埋める
  const chromaticScale: string[] = [];
  const naturalNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const isFlat = rootNote.includes('b');

  for (let pitch = 0; pitch < 12; pitch++) {
    if (scaleNoteMap.has(pitch)) {
      // メジャースケールに含まれる音はそのまま使用
      chromaticScale[pitch] = scaleNoteMap.get(pitch)!;
    } else {
      // メジャースケールに含まれない音は、キーの♭/♯系に合わせる
      if (isFlat) {
        const flatNotes: { [key: number]: string } = {
          1: 'Db', 3: 'Eb', 6: 'Gb', 8: 'Ab', 10: 'Bb'
        };
        chromaticScale[pitch] = flatNotes[pitch] || CHROMATIC_SCALE[pitch];
      } else {
        const sharpNotes: { [key: number]: string } = {
          1: 'C#', 3: 'D#', 6: 'F#', 8: 'G#', 10: 'A#'
        };
        chromaticScale[pitch] = sharpNotes[pitch] || CHROMATIC_SCALE[pitch];
      }
    }
  }

  return chromaticScale;
}

// 指板上の位置から音名を取得（キーに応じた正しい表記で）
export function getNoteAtPosition(
  stringIndex: number,
  fret: number,
  rootNote: string,
  scaleNotes: string[]
): string {
  const openString = GUITAR_TUNING[stringIndex];
  const openPitch = getPitchClass(openString);
  const targetPitch = (openPitch + fret) % 12;

  // スケール内の音であれば、スケールの表記を使う
  for (const scaleNote of scaleNotes) {
    if (getPitchClass(scaleNote) === targetPitch) {
      return scaleNote;
    }
  }

  // スケール外の音の場合、キーのクロマティックスケール（12音）から取得
  const chromaticScale = getChromaticScaleForKey(rootNote);
  return chromaticScale[targetPitch];
}

// 特定の音がスケールに含まれるかチェック（ピッチで比較）
export function isNoteInScale(note: string, scaleNotes: string[]): boolean {
  const notePitch = getPitchClass(note);
  return scaleNotes.some(scaleNote => getPitchClass(scaleNote) === notePitch);
}

// 音階での度数を取得（1-7）
export function getScaleDegree(note: string, scaleNotes: string[]): number | null {
  const notePitch = getPitchClass(note);
  const index = scaleNotes.findIndex(scaleNote => getPitchClass(scaleNote) === notePitch);
  return index !== -1 ? index + 1 : null;
}
