/**
 * scales.ts - 新しいscaleEngineベースの実装
 *
 * 旧実装から新実装への移行:
 * - 内部では厳密な音名表記（PitchSpelling）を使用
 * - 既存のAPIとの互換性を保つため、文字列ベースのインターフェースを提供
 */

import {
  generateScale,
  formatScale,
  SCALE_DEFINITIONS as ENGINE_SCALE_DEFINITIONS,
  ScaleTone,
} from './scaleEngine';
import { parsePitchSpelling, getPitchClass as getPitchClassFromSpelling } from './pitchSpelling';

// 音名の定義（クロマティック、半音単位）- 後方互換性のために残す
export const CHROMATIC_SCALE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const;

// すべての可能な音名（エンハーモニック含む）- 後方互換性のために残す
export const ALL_NOTE_NAMES = [
  'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'E#', 'Fb',
  'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb',
  'B', 'B#', 'Cb'
];

// 音名から半音番号へのマッピング - 後方互換性のために残す
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

// 旧インターフェースとの互換性のため、ScalePatternを残す
export interface ScalePattern {
  semitones: number;
  interval: string;
}

// SCALE_PATTERNSは後方互換性のために残すが、内部では使用しない
// 新しい実装では SCALE_DEFINITIONS を使用
export const SCALE_PATTERNS: { [key: string]: ScalePattern[] } = {
  'メジャー': [
    { semitones: 0, interval: 'P1' },   // Perfect 1st
    { semitones: 2, interval: 'M2' },   // Major 2nd
    { semitones: 4, interval: 'M3' },   // Major 3rd
    { semitones: 5, interval: 'P4' },   // Perfect 4th
    { semitones: 7, interval: 'P5' },   // Perfect 5th
    { semitones: 9, interval: 'M6' },   // Major 6th
    { semitones: 11, interval: 'M7' },  // Major 7th
  ],
  'マイナー': [
    { semitones: 0, interval: 'P1' },
    { semitones: 2, interval: 'M2' },
    { semitones: 3, interval: 'm3' },   // minor 3rd
    { semitones: 5, interval: 'P4' },
    { semitones: 7, interval: 'P5' },
    { semitones: 8, interval: 'm6' },   // minor 6th
    { semitones: 10, interval: 'm7' },  // minor 7th
  ],
  'ドリアン': [
    { semitones: 0, interval: 'P1' },
    { semitones: 2, interval: 'M2' },
    { semitones: 3, interval: 'm3' },
    { semitones: 5, interval: 'P4' },
    { semitones: 7, interval: 'P5' },
    { semitones: 9, interval: 'M6' },
    { semitones: 10, interval: 'm7' },
  ],
  'ミクソリディアン': [
    { semitones: 0, interval: 'P1' },
    { semitones: 2, interval: 'M2' },
    { semitones: 4, interval: 'M3' },
    { semitones: 5, interval: 'P4' },
    { semitones: 7, interval: 'P5' },
    { semitones: 9, interval: 'M6' },
    { semitones: 10, interval: 'm7' },
  ],
  'フリジアン': [
    { semitones: 0, interval: 'P1' },
    { semitones: 1, interval: 'm2' },   // minor 2nd
    { semitones: 3, interval: 'm3' },
    { semitones: 5, interval: 'P4' },
    { semitones: 7, interval: 'P5' },
    { semitones: 8, interval: 'm6' },
    { semitones: 10, interval: 'm7' },
  ],
  'リディア': [
    { semitones: 0, interval: 'P1' },
    { semitones: 2, interval: 'M2' },
    { semitones: 4, interval: 'M3' },
    { semitones: 6, interval: 'aug4' }, // augmented 4th
    { semitones: 7, interval: 'P5' },
    { semitones: 9, interval: 'M6' },
    { semitones: 11, interval: 'M7' },
  ],
  'ロクリアン': [
    { semitones: 0, interval: 'P1' },
    { semitones: 1, interval: 'm2' },
    { semitones: 3, interval: 'm3' },
    { semitones: 5, interval: 'P4' },
    { semitones: 6, interval: 'dim5' }, // diminished 5th
    { semitones: 8, interval: 'm6' },
    { semitones: 10, interval: 'm7' },
  ],
  'ハーモニックマイナー': [
    { semitones: 0, interval: 'P1' },
    { semitones: 2, interval: 'M2' },
    { semitones: 3, interval: 'm3' },
    { semitones: 5, interval: 'P4' },
    { semitones: 7, interval: 'P5' },
    { semitones: 8, interval: 'm6' },
    { semitones: 11, interval: 'M7' },
  ],
  'メロディックマイナー': [
    { semitones: 0, interval: 'P1' },
    { semitones: 2, interval: 'M2' },
    { semitones: 3, interval: 'm3' },
    { semitones: 5, interval: 'P4' },
    { semitones: 7, interval: 'P5' },
    { semitones: 9, interval: 'M6' },
    { semitones: 11, interval: 'M7' },
  ],
  'ブルース': [
    { semitones: 0, interval: 'P1' },
    { semitones: 3, interval: 'm3' },
    { semitones: 5, interval: 'P4' },
    { semitones: 6, interval: 'dim5' },
    { semitones: 7, interval: 'P5' },
    { semitones: 10, interval: 'm7' },
  ],
  'メジャーペンタトニック': [
    { semitones: 0, interval: 'P1' },
    { semitones: 2, interval: 'M2' },
    { semitones: 4, interval: 'M3' },
    { semitones: 7, interval: 'P5' },
    { semitones: 9, interval: 'M6' },
  ],
  'マイナーペンタトニック': [
    { semitones: 0, interval: 'P1' },
    { semitones: 3, interval: 'm3' },
    { semitones: 5, interval: 'P4' },
    { semitones: 7, interval: 'P5' },
    { semitones: 10, interval: 'm7' },
  ],
  '都節音階': [
    { semitones: 0, interval: 'P1' },
    { semitones: 1, interval: 'm2' },
    { semitones: 5, interval: 'P4' },
    { semitones: 7, interval: 'P5' },
    { semitones: 8, interval: 'm6' },
  ],
};

// スケール名の配列（表示順）
export const SCALE_NAMES = Object.keys(ENGINE_SCALE_DEFINITIONS);

// ギターのチューニング（標準チューニング、6弦から1弦）
export const GUITAR_TUNING = ['E', 'A', 'D', 'G', 'B', 'E'];

// 音名から半音番号を取得（後方互換性のために残す）
export function getPitchClass(note: string): number {
  const pitch = NOTE_TO_PITCH[note];
  if (pitch === undefined) {
    // 新しいエンジンで解析を試みる
    try {
      const spelling = parsePitchSpelling(note);
      return getPitchClassFromSpelling(spelling);
    } catch {
      throw new Error(`Invalid note: ${note}`);
    }
  }
  return pitch;
}

// 内部キャッシュ（パフォーマンス最適化）
const scaleCache = new Map<string, ScaleTone[]>();

/**
 * スケールの音を計算（新エンジンを使用）
 * 音楽理論的に正しい音名で返す
 */
export function getScaleNotes(rootNote: string, scaleName: string): string[] {
  const cacheKey = `${rootNote}-${scaleName}`;

  // キャッシュチェック
  let scaleTones = scaleCache.get(cacheKey);

  if (!scaleTones) {
    // 新エンジンでスケールを生成
    const scaleDefinition = ENGINE_SCALE_DEFINITIONS[scaleName];
    if (!scaleDefinition) {
      console.warn(`Scale definition not found: ${scaleName}`);
      return [];
    }

    try {
      scaleTones = generateScale(rootNote, scaleDefinition);
      scaleCache.set(cacheKey, scaleTones);
    } catch (error) {
      console.error(`Error generating scale ${rootNote} ${scaleName}:`, error);
      return [];
    }
  }

  // 親切モード（friendly）で文字列に変換
  return formatScale(scaleTones, 'friendly');
}

// 後方互換性のための旧関数（内部では新エンジンを使用）
export function getScaleNoteNames(rootNote: string, patterns: ScalePattern[]): string[] {
  // この関数は使われなくなる予定だが、後方互換性のために残す
  // パターンから一致するスケール名を探す
  for (const [scaleName, scalePatterns] of Object.entries(SCALE_PATTERNS)) {
    if (JSON.stringify(scalePatterns) === JSON.stringify(patterns)) {
      return getScaleNotes(rootNote, scaleName);
    }
  }

  // 見つからない場合は空配列
  console.warn('Unknown scale pattern, returning empty array');
  return [];
}

// キーに基づいて12音すべての正しい音名表記を取得
export function getChromaticScaleForKey(rootNote: string): string[] {
  // 新エンジンでメジャースケールを生成
  const majorScale = getScaleNotes(rootNote, 'メジャー');

  if (majorScale.length === 0) {
    // フォールバック: デフォルトは♯系
    return ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  }

  // メジャースケールの7音のピッチをマッピング
  const scaleNoteMap = new Map<number, string>();
  for (const note of majorScale) {
    scaleNoteMap.set(getPitchClass(note), note);
  }

  // 12音すべてを埋める
  const chromaticScale: string[] = [];
  const isFlat = rootNote.includes('b') || rootNote.includes('♭');

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

// メジャースケールの各度数の基準半音数
const MAJOR_SEMITONES_BY_DEGREE = [0, 2, 4, 5, 7, 9, 11] as const;

/**
 * 半音差分から変化記号文字列を生成
 * @param diff メジャー基準からの半音差分
 * @returns 変化記号文字列 ('b', '##', '', など)
 */
function semitoneDiffToAccidental(diff: number): string {
  if (diff === 0) return '';
  if (diff > 0) return '#'.repeat(diff);   // +1 => #, +2 => ##, +3 => ###
  return 'b'.repeat(-diff);                // -1 => b, -2 => bb, -3 => bbb
}

/**
 * interval表記とsemitonesから度数ラベルを生成
 * @param interval インターバル表記 (例: 'P1', 'M2', 'm3', 'aug4')
 * @param semitones ルートからの半音数
 * @returns 度数ラベル (例: '1', 'b3', '#4', '5')
 */
export function intervalToDegreeLabel(interval: string, semitones: number): string {
  // interval例: P1, M2, m3, aug4, dim5, m7 など
  const match = interval.match(/\d+/);
  if (!match) return '?';

  const degreeNum = parseInt(match[0], 10);       // 1..7
  const majorBase = MAJOR_SEMITONES_BY_DEGREE[degreeNum - 1]; // その度数のメジャー基準の半音
  const diff = semitones - majorBase;             // 例: m3(3)-M3(4)=-1 => b3

  const accidental = semitoneDiffToAccidental(diff);
  return `${accidental}${degreeNum}`;             // "b3", "#4", "5", "6" ...
}

/**
 * 音名から度数ラベルを取得（欠番を保持）
 * @param note 音名
 * @param rootNote ルート音
 * @param scaleName スケール名
 * @param scaleNotes スケールの音名配列
 * @returns 度数ラベル (例: '1', 'b3', '5') または null
 */
export function getScaleDegreeLabel(
  note: string,
  rootNote: string,
  scaleName: string,
  scaleNotes: string[]
): string | null {
  const patterns = SCALE_PATTERNS[scaleName];
  if (!patterns) return null;

  const notePitch = getPitchClass(note);

  // scaleNotes 上で該当音を探す（pitchで照合）
  const idx = scaleNotes.findIndex(n => getPitchClass(n) === notePitch);
  if (idx === -1) return null;

  // idx は "スケール内での順番" なので、同じ順番の pattern を参照できる
  const p = patterns[idx];
  return intervalToDegreeLabel(p.interval, p.semitones);
}

// 音階での度数を取得（1-7）- 後方互換性のために残す
// 注意: この関数はペンタトニックで1-5に詰めてしまうため、新規コードではgetScaleDegreeLabelを使用すること
export function getScaleDegree(note: string, scaleNotes: string[]): number | null {
  const notePitch = getPitchClass(note);
  const index = scaleNotes.findIndex(scaleNote => getPitchClass(scaleNote) === notePitch);
  return index !== -1 ? index + 1 : null;
}
