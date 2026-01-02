/**
 * PitchSpelling: 音名の厳密な表記を扱う値オブジェクト
 *
 * 仕様:
 * - letter: A-G の文字名
 * - accidental: 変化記号（整数）♭=-1, 𝄫=-2, ♯=+1, 𝄪=+2, ...
 * - octave: オクターブ（任意、指板表示用）
 */

export type Letter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

export interface PitchSpelling {
  letter: Letter;
  accidental: number;
  octave?: number;
}

// 文字名から0-6のインデックスを取得
const LETTER_TO_INDEX: Record<Letter, number> = {
  'C': 0, 'D': 1, 'E': 2, 'F': 3, 'G': 4, 'A': 5, 'B': 6
};

const INDEX_TO_LETTER: Letter[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

// 各文字名の基準ピッチクラス（C=0）
const LETTER_BASE_PITCH: Record<Letter, number> = {
  'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11
};

/**
 * PitchSpellingからピッチクラス(0-11)を計算
 * これは派生情報であり、内部表現ではない
 */
export function getPitchClass(spelling: PitchSpelling): number {
  const basePitch = LETTER_BASE_PITCH[spelling.letter];
  return (basePitch + spelling.accidental + 12 * 10) % 12; // 12*10は負数対応
}

/**
 * 文字列表記からPitchSpellingを解析
 * 例: "C#" -> {letter: 'C', accidental: 1}
 *     "Ebb" -> {letter: 'E', accidental: -2}
 */
export function parsePitchSpelling(noteString: string): PitchSpelling {
  if (!noteString || noteString.length === 0) {
    throw new Error('Invalid note string');
  }

  const letter = noteString[0].toUpperCase() as Letter;
  if (!['A', 'B', 'C', 'D', 'E', 'F', 'G'].includes(letter)) {
    throw new Error(`Invalid letter: ${letter}`);
  }

  let accidental = 0;
  const rest = noteString.slice(1);

  for (const char of rest) {
    if (char === '#' || char === '♯') {
      accidental++;
    } else if (char === 'b' || char === '♭') {
      accidental--;
    } else if (char === '𝄪') {
      accidental += 2;
    } else if (char === '𝄫') {
      accidental -= 2;
    }
  }

  return { letter, accidental };
}

/**
 * PitchSpellingを文字列に変換（厳密モード）
 */
export function formatPitchSpelling(spelling: PitchSpelling, useUnicode = true): string {
  let result = spelling.letter;

  if (spelling.accidental === 0) {
    return result;
  }

  if (useUnicode) {
    // Unicode記号を使用
    if (spelling.accidental > 0) {
      const doubleSharp = Math.floor(spelling.accidental / 2);
      const sharp = spelling.accidental % 2;
      result += '𝄪'.repeat(doubleSharp) + '♯'.repeat(sharp);
    } else {
      const doubleFlat = Math.floor(Math.abs(spelling.accidental) / 2);
      const flat = Math.abs(spelling.accidental) % 2;
      result += '𝄫'.repeat(doubleFlat) + '♭'.repeat(flat);
    }
  } else {
    // ASCII記号を使用
    if (spelling.accidental > 0) {
      result += '#'.repeat(spelling.accidental);
    } else {
      result += 'b'.repeat(Math.abs(spelling.accidental));
    }
  }

  return result;
}

/**
 * 親切表記（Enharmonic Simplification）
 * 表示専用：内部データは書き換えない
 *
 * ダブルフラット/ダブルシャープなどを可能な限りシンプルな異名同音に変換
 */
export function toFriendlySpelling(spelling: PitchSpelling): PitchSpelling {
  const pitch = getPitchClass(spelling);

  // accidentalが-1, 0, +1の範囲内ならそのまま返す（既に親切）
  if (spelling.accidental >= -1 && spelling.accidental <= 1) {
    return spelling;
  }

  // ナチュラル音（accidental=0）に変換できる場合
  const naturalCandidates: Letter[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  for (const letter of naturalCandidates) {
    if (LETTER_BASE_PITCH[letter] === pitch) {
      return { letter, accidental: 0 };
    }
  }

  // シングルシャープ/フラットで表現できる場合
  // 元の記号の方向性を維持（♭系は♭系に、♯系は♯系に）
  const preferFlat = spelling.accidental < 0;

  for (const letter of naturalCandidates) {
    const basePitch = LETTER_BASE_PITCH[letter];

    if (preferFlat) {
      // ♭系を優先
      if ((basePitch - 1 + 12) % 12 === pitch) {
        return { letter, accidental: -1 };
      }
    } else {
      // ♯系を優先
      if ((basePitch + 1) % 12 === pitch) {
        return { letter, accidental: 1 };
      }
    }
  }

  // 優先方向で見つからなかった場合は逆方向も試す
  for (const letter of naturalCandidates) {
    const basePitch = LETTER_BASE_PITCH[letter];

    if (!preferFlat) {
      if ((basePitch - 1 + 12) % 12 === pitch) {
        return { letter, accidental: -1 };
      }
    } else {
      if ((basePitch + 1) % 12 === pitch) {
        return { letter, accidental: 1 };
      }
    }
  }

  // 変換できない場合は元のまま返す
  return spelling;
}

/**
 * 指定したletterと同じ文字名を維持したまま、accidentalを調整
 * これはreplace操作で使用される
 */
export function adjustAccidental(
  spelling: PitchSpelling,
  targetPitch: number
): PitchSpelling {
  const basePitch = LETTER_BASE_PITCH[spelling.letter];
  let accidental = targetPitch - basePitch;

  // -6 ~ +6 の範囲に正規化（最も近い異名同音を選択）
  // 例: -7 -> +5, -8 -> +4, +7 -> -5, +8 -> -4
  while (accidental > 6) accidental -= 12;
  while (accidental < -6) accidental += 12;

  return {
    letter: spelling.letter,
    accidental,
  };
}

/**
 * 2つのPitchSpellingが等価かチェック（letterとaccidentalで比較）
 */
export function isEqualSpelling(a: PitchSpelling, b: PitchSpelling): boolean {
  return a.letter === b.letter && a.accidental === b.accidental;
}

/**
 * 2つのPitchSpellingが同じピッチクラスかチェック（異名同音を含む）
 */
export function isEnharmonic(a: PitchSpelling, b: PitchSpelling): boolean {
  return getPitchClass(a) === getPitchClass(b);
}

/**
 * 次の文字名を取得（Cの次はD、Bの次はC）
 */
export function nextLetter(letter: Letter): Letter {
  const index = LETTER_TO_INDEX[letter];
  return INDEX_TO_LETTER[(index + 1) % 7];
}
