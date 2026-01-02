/**
 * チューニング定義と変換機能
 *
 * 方針:
 * - チューニングは配列として扱う（低音弦→高音弦）
 * - 半音下げは変換（transform）として実装
 * - 7/8/9弦は同一コンポーネントで扱う
 */

import { getPitchClass } from './scales';

export type TuningId =
  | "standard_6"
  | "standard_7"
  | "standard_8"
  | "standard_9"
  | "drop_d"
  | "drop_c"
  | "open_d"
  | "open_g"
  | "open_a"
  | "dadgad";

export type NoteName = string; // "C", "F#", "Eb" など

export type Tuning = {
  id: TuningId;
  label: string;
  strings: NoteName[]; // low -> high
};

/**
 * チューニング定義
 */
export const TUNINGS: Record<TuningId, Tuning> = {
  standard_6: {
    id: "standard_6",
    label: "Standard (6) - E A D G B E",
    strings: ["E", "A", "D", "G", "B", "E"],
  },

  // 7弦標準（一般的: B E A D G B E）
  standard_7: {
    id: "standard_7",
    label: "Standard (7) - B E A D G B E",
    strings: ["B", "E", "A", "D", "G", "B", "E"],
  },

  // 8弦標準（一般的: F# B E A D G B E）
  standard_8: {
    id: "standard_8",
    label: "Standard (8) - F# B E A D G B E",
    strings: ["F#", "B", "E", "A", "D", "G", "B", "E"],
  },

  // 9弦標準（一般的: C# F# B E A D G B E）
  standard_9: {
    id: "standard_9",
    label: "Standard (9) - C# F# B E A D G B E",
    strings: ["C#", "F#", "B", "E", "A", "D", "G", "B", "E"],
  },

  drop_d: {
    id: "drop_d",
    label: "Drop D - D A D G B E",
    strings: ["D", "A", "D", "G", "B", "E"],
  },

  drop_c: {
    id: "drop_c",
    label: "Drop C - C G C F A D",
    strings: ["C", "G", "C", "F", "A", "D"],
  },

  open_d: {
    id: "open_d",
    label: "Open D - D A D F# A D",
    strings: ["D", "A", "D", "F#", "A", "D"],
  },

  open_g: {
    id: "open_g",
    label: "Open G - D G D G B D",
    strings: ["D", "G", "D", "G", "B", "D"],
  },

  open_a: {
    id: "open_a",
    label: "Open A - E A E A C# E",
    strings: ["E", "A", "E", "A", "C#", "E"],
  },

  dadgad: {
    id: "dadgad",
    label: "DADGAD - D A D G A D",
    strings: ["D", "A", "D", "G", "A", "D"],
  },
};

/**
 * ピッチクラスから親切表記の音名に変換
 * @param pitchClass 0-11
 * @returns 音名（シャープ優先）
 */
export function pitchClassToFriendlyNote(pitchClass: number): string {
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  return notes[pitchClass];
}

/**
 * チューニングを半音単位で移調する
 * @param tuning 元のチューニング
 * @param semitones 移調量（-1で半音下げ、+1で半音上げ）
 * @returns 新しいチューニング
 */
export function transposeTuning(tuning: Tuning, semitones: number): Tuning {
  const strings = tuning.strings.map(note => {
    const pc = (getPitchClass(note) + semitones + 12 * 10) % 12; // 12*10で負数対応
    return pitchClassToFriendlyNote(pc);
  });

  // ラベルに移調情報を追加
  let labelSuffix = '';
  if (semitones === -1) {
    labelSuffix = ' (Half-step down)';
  } else if (semitones === 1) {
    labelSuffix = ' (Half-step up)';
  } else if (semitones !== 0) {
    labelSuffix = ` (${semitones > 0 ? '+' : ''}${semitones})`;
  }

  return {
    ...tuning,
    label: tuning.label + labelSuffix,
    strings,
  };
}

/**
 * チューニングIDのリスト（UI用）
 */
export const TUNING_IDS: TuningId[] = [
  "standard_6",
  "standard_7",
  "standard_8",
  "standard_9",
  "drop_d",
  "drop_c",
  "open_d",
  "open_g",
  "open_a",
  "dadgad",
];

/**
 * チューニングをカテゴリ別に分類
 */
export const TUNING_CATEGORIES = {
  standard: ["standard_6", "standard_7", "standard_8", "standard_9"] as TuningId[],
  drop: ["drop_d", "drop_c"] as TuningId[],
  open: ["open_d", "open_g", "open_a"] as TuningId[],
  alternate: ["dadgad"] as TuningId[],
};
