/**
 * チューニング定義と変換機能
 *
 * 方針:
 * - チューニングは配列として扱う（低音弦→高音弦）
 * - 半音下げは変換（transform）として実装
 * - 7/8/9弦は同一コンポーネントで扱う
 */

import { getPitchClass } from './scales';

export type InstrumentId =
  | "guitar"
  | "guitar_3"
  | "ukulele"
  | "bass_4"
  | "bass_5";

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
  | "dadgad"
  | "guitar_3_ead"
  | "ukulele_standard_gcea"
  | "bass_4_standard_eadg"
  | "bass_5_standard_beadg";

export type NoteName = string; // "C", "F#", "Eb" など

export type Tuning = {
  id: TuningId;
  instrument: InstrumentId;
  label: string;
  strings: NoteName[]; // low -> high
};

/**
 * チューニング定義
 */
export const TUNINGS: Record<TuningId, Tuning> = {
  standard_6: {
    id: "standard_6",
    instrument: "guitar",
    label: "Standard (6) - E A D G B E",
    strings: ["E", "A", "D", "G", "B", "E"],
  },

  // 7弦標準（一般的: B E A D G B E）
  standard_7: {
    id: "standard_7",
    instrument: "guitar",
    label: "Standard (7) - B E A D G B E",
    strings: ["B", "E", "A", "D", "G", "B", "E"],
  },

  // 8弦標準（一般的: F# B E A D G B E）
  standard_8: {
    id: "standard_8",
    instrument: "guitar",
    label: "Standard (8) - F# B E A D G B E",
    strings: ["F#", "B", "E", "A", "D", "G", "B", "E"],
  },

  // 9弦標準（一般的: C# F# B E A D G B E）
  standard_9: {
    id: "standard_9",
    instrument: "guitar",
    label: "Standard (9) - C# F# B E A D G B E",
    strings: ["C#", "F#", "B", "E", "A", "D", "G", "B", "E"],
  },

  drop_d: {
    id: "drop_d",
    instrument: "guitar",
    label: "Drop D - D A D G B E",
    strings: ["D", "A", "D", "G", "B", "E"],
  },

  drop_c: {
    id: "drop_c",
    instrument: "guitar",
    label: "Drop C - C G C F A D",
    strings: ["C", "G", "C", "F", "A", "D"],
  },

  open_d: {
    id: "open_d",
    instrument: "guitar",
    label: "Open D - D A D F# A D",
    strings: ["D", "A", "D", "F#", "A", "D"],
  },

  open_g: {
    id: "open_g",
    instrument: "guitar",
    label: "Open G - D G D G B D",
    strings: ["D", "G", "D", "G", "B", "D"],
  },

  open_a: {
    id: "open_a",
    instrument: "guitar",
    label: "Open A - E A E A C# E",
    strings: ["E", "A", "E", "A", "C#", "E"],
  },

  dadgad: {
    id: "dadgad",
    instrument: "guitar",
    label: "DADGAD - D A D G A D",
    strings: ["D", "A", "D", "G", "A", "D"],
  },

  // 3弦ギター
  guitar_3_ead: {
    id: "guitar_3_ead",
    instrument: "guitar_3",
    label: "3-string Guitar - E A D",
    strings: ["E", "A", "D"],
  },

  // ウクレレ
  ukulele_standard_gcea: {
    id: "ukulele_standard_gcea",
    instrument: "ukulele",
    label: "Ukulele Standard - G C E A",
    strings: ["G", "C", "E", "A"],
  },

  // 4弦ベース
  bass_4_standard_eadg: {
    id: "bass_4_standard_eadg",
    instrument: "bass_4",
    label: "Bass (4) Standard - E A D G",
    strings: ["E", "A", "D", "G"],
  },

  // 5弦ベース
  bass_5_standard_beadg: {
    id: "bass_5_standard_beadg",
    instrument: "bass_5",
    label: "Bass (5) Standard - B E A D G",
    strings: ["B", "E", "A", "D", "G"],
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
  "guitar_3_ead",
  "ukulele_standard_gcea",
  "bass_4_standard_eadg",
  "bass_5_standard_beadg",
];

/**
 * 楽器別にチューニングをグループ化
 */
export function groupTuningsByInstrument(): Record<InstrumentId, Tuning[]> {
  const grouped: Record<InstrumentId, Tuning[]> = {
    guitar: [],
    guitar_3: [],
    ukulele: [],
    bass_4: [],
    bass_5: [],
  };

  Object.values(TUNINGS).forEach(tuning => {
    grouped[tuning.instrument].push(tuning);
  });

  return grouped;
}

/**
 * チューニングをカテゴリ別に分類（旧互換性用）
 */
export const TUNING_CATEGORIES = {
  standard: ["standard_6", "standard_7", "standard_8", "standard_9"] as TuningId[],
  drop: ["drop_d", "drop_c"] as TuningId[],
  open: ["open_d", "open_g", "open_a"] as TuningId[],
  alternate: ["dadgad"] as TuningId[],
};
