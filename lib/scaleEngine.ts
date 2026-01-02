/**
 * ScaleEngine: 音楽理論的に正しいスケール生成エンジン
 *
 * 絶対方針:
 * 1. 内部表現は「理論的に正しい音名のみ」（異名同音の簡略化をしない）
 * 2. すべてのスケールは「メジャースケール基準」で定義
 * 3. 度数は常に1-7を基準（欠けていても詰めない）
 */

import {
  PitchSpelling,
  Letter,
  getPitchClass,
  parsePitchSpelling,
  formatPitchSpelling,
  adjustAccidental,
  nextLetter,
  toFriendlySpelling,
} from './pitchSpelling';

/**
 * スケールトーン: 度数ラベル + 厳密な音名表記 + ピッチクラス
 */
export interface ScaleTone {
  degreeLabel: string; // '1', 'b2', '2', '#4', 'b3', etc.
  spelling: PitchSpelling;
  pitchClass: number; // 指板・UI用の派生情報
}

/**
 * 度数操作: keep / replace / add / remove
 */
export type DegreeNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface DegreeOperation {
  keep?: boolean;
  replace?: string; // 'b2', '#4', 'bb3', etc.
  add?: string[]; // ['b3', '#5']
  remove?: boolean;
}

/**
 * スケール定義
 */
export interface ScaleDefinition {
  base: 'major'; // 将来的には他のベースも追加可能
  degrees: {
    [K in DegreeNumber]?: DegreeOperation;
  };
}

/**
 * Step 1: ルートからメジャースケールを厳密に生成
 *
 * ルール:
 * - A-Gの文字名を順番に必ず1回ずつ使う
 * - ピッチクラスを見てaccidentalを決定
 * - E♯、B♯、C𝄪などが出るのは正常
 */
export function generateMajorScale(root: PitchSpelling): ScaleTone[] {
  const rootPitch = getPitchClass(root);

  // メジャースケールのインターバル（半音単位）
  const intervals = [0, 2, 4, 5, 7, 9, 11];

  // 度数ラベル
  const degreeLabels = ['1', '2', '3', '4', '5', '6', '7'];

  const scale: ScaleTone[] = [];
  let currentLetter = root.letter;

  for (let i = 0; i < 7; i++) {
    const targetPitch = (rootPitch + intervals[i]) % 12;

    // この度数で使うべき文字名
    const spelling: PitchSpelling = {
      letter: currentLetter,
      accidental: 0, // まず仮置き
    };

    // accidentalを計算して調整
    const adjustedSpelling = adjustAccidental(spelling, targetPitch);

    scale.push({
      degreeLabel: degreeLabels[i],
      spelling: adjustedSpelling,
      pitchClass: targetPitch,
    });

    // 次の文字名へ
    currentLetter = nextLetter(currentLetter);
  }

  return scale;
}

/**
 * Step 2: 度数操作を適用してスケールを変形
 *
 * ルール:
 * - replace: 文字名を維持したままaccidentalを変更（元は消える）
 * - add: 度数に音を追加（元は残る）
 * - remove: 度数の音を消す
 * - keep: 明示的に残す（デフォルトではない）
 */
export function applyDegreeOperations(
  majorScale: ScaleTone[],
  definition: ScaleDefinition
): ScaleTone[] {
  const result: ScaleTone[] = [];

  for (let i = 0; i < 7; i++) {
    const degree = (i + 1) as DegreeNumber;
    const operation = definition.degrees[degree];
    const originalTone = majorScale[i];

    if (!operation) {
      // 操作が指定されていない場合は削除（keepのみが明示的に残す）
      continue;
    }

    if (operation.remove) {
      // 削除
      continue;
    }

    if (operation.replace) {
      // replace: 同じ文字名で異なるaccidental
      const alteredTone = createAlteredTone(
        originalTone,
        operation.replace
      );
      result.push(alteredTone);
    } else if (operation.keep) {
      // keep: 元の音をそのまま残す
      result.push(originalTone);
    }

    // add: 追加の音（元の音は上でkeepされているはず）
    if (operation.add) {
      for (const addLabel of operation.add) {
        const addedTone = createAlteredTone(originalTone, addLabel);
        result.push(addedTone);
      }
    }
  }

  return result;
}

/**
 * 度数ラベル（'b2', '#4'など）から変化量を計算
 */
function parseDegreeLabel(label: string): { accidentalChange: number; degreeLabel: string } {
  let accidentalChange = 0;
  let i = 0;

  while (i < label.length) {
    const char = label[i];
    if (char === 'b' || char === '♭') {
      accidentalChange--;
      i++;
    } else if (char === '#' || char === '♯') {
      accidentalChange++;
      i++;
    } else if (char === '𝄫') {
      accidentalChange -= 2;
      i++;
    } else if (char === '𝄪') {
      accidentalChange += 2;
      i++;
    } else {
      break;
    }
  }

  return { accidentalChange, degreeLabel: label };
}

/**
 * 元の音から変化した音を生成（replaceまたはadd用）
 */
function createAlteredTone(
  originalTone: ScaleTone,
  alteration: string
): ScaleTone {
  const { accidentalChange, degreeLabel } = parseDegreeLabel(alteration);

  // 元の音のピッチクラスから変化量を適用
  const newPitch = (originalTone.pitchClass + accidentalChange + 12) % 12;

  // 文字名は維持してaccidentalを調整
  const newSpelling = adjustAccidental(
    { letter: originalTone.spelling.letter, accidental: 0 },
    newPitch
  );

  return {
    degreeLabel,
    spelling: newSpelling,
    pitchClass: newPitch,
  };
}

/**
 * スケール生成のメイン関数
 */
export function generateScale(
  rootNote: string,
  scaleDefinition: ScaleDefinition
): ScaleTone[] {
  // Step 1: ルートの音名を解析
  const root = parsePitchSpelling(rootNote);

  // Step 2: メジャースケールを生成
  const majorScale = generateMajorScale(root);

  // Step 3: 度数操作を適用
  const scale = applyDegreeOperations(majorScale, scaleDefinition);

  return scale;
}

/**
 * スケール定義のプリセット
 */
export const SCALE_DEFINITIONS: Record<string, ScaleDefinition> = {
  'メジャー': {
    base: 'major',
    degrees: {
      1: { keep: true },
      2: { keep: true },
      3: { keep: true },
      4: { keep: true },
      5: { keep: true },
      6: { keep: true },
      7: { keep: true },
    },
  },

  'マイナー': {
    base: 'major',
    degrees: {
      1: { keep: true },
      2: { keep: true },
      3: { replace: 'b3' },
      4: { keep: true },
      5: { keep: true },
      6: { replace: 'b6' },
      7: { replace: 'b7' },
    },
  },

  'ドリアン': {
    base: 'major',
    degrees: {
      1: { keep: true },
      2: { keep: true },
      3: { replace: 'b3' },
      4: { keep: true },
      5: { keep: true },
      6: { keep: true },
      7: { replace: 'b7' },
    },
  },

  'フリジアン': {
    base: 'major',
    degrees: {
      1: { keep: true },
      2: { replace: 'b2' },
      3: { replace: 'b3' },
      4: { keep: true },
      5: { keep: true },
      6: { replace: 'b6' },
      7: { replace: 'b7' },
    },
  },

  'リディア': {
    base: 'major',
    degrees: {
      1: { keep: true },
      2: { keep: true },
      3: { keep: true },
      4: { replace: '#4' },
      5: { keep: true },
      6: { keep: true },
      7: { keep: true },
    },
  },

  'ミクソリディアン': {
    base: 'major',
    degrees: {
      1: { keep: true },
      2: { keep: true },
      3: { keep: true },
      4: { keep: true },
      5: { keep: true },
      6: { keep: true },
      7: { replace: 'b7' },
    },
  },

  'ロクリアン': {
    base: 'major',
    degrees: {
      1: { keep: true },
      2: { replace: 'b2' },
      3: { replace: 'b3' },
      4: { keep: true },
      5: { replace: 'b5' },
      6: { replace: 'b6' },
      7: { replace: 'b7' },
    },
  },

  'ハーモニックマイナー': {
    base: 'major',
    degrees: {
      1: { keep: true },
      2: { keep: true },
      3: { replace: 'b3' },
      4: { keep: true },
      5: { keep: true },
      6: { replace: 'b6' },
      7: { keep: true },
    },
  },

  'メロディックマイナー': {
    base: 'major',
    degrees: {
      1: { keep: true },
      2: { keep: true },
      3: { replace: 'b3' },
      4: { keep: true },
      5: { keep: true },
      6: { keep: true },
      7: { keep: true },
    },
  },

  'メジャーペンタトニック': {
    base: 'major',
    degrees: {
      1: { keep: true },
      2: { keep: true },
      3: { keep: true },
      4: { remove: true },
      5: { keep: true },
      6: { keep: true },
      7: { remove: true },
    },
  },

  'マイナーペンタトニック': {
    base: 'major',
    degrees: {
      1: { keep: true },
      2: { remove: true },
      3: { replace: 'b3' },
      4: { keep: true },
      5: { keep: true },
      6: { remove: true },
      7: { replace: 'b7' },
    },
  },

  'ブルース': {
    base: 'major',
    degrees: {
      1: { keep: true },
      2: { remove: true },
      3: { replace: 'b3' },
      4: { keep: true },
      5: { keep: true, add: ['b5'] },
      6: { remove: true },
      7: { replace: 'b7' },
    },
  },

  '都節音階': {
    base: 'major',
    degrees: {
      1: { keep: true },
      2: { replace: 'b2' },
      3: { remove: true },
      4: { keep: true },
      5: { keep: true },
      6: { replace: 'b6' },
      7: { remove: true },
    },
  },
};

/**
 * スケールトーンを文字列に変換（厳密モードまたは親切モード）
 */
export function formatScaleTone(
  tone: ScaleTone,
  displayMode: 'strict' | 'friendly' = 'strict'
): string {
  if (displayMode === 'friendly') {
    const friendly = toFriendlySpelling(tone.spelling);
    return formatPitchSpelling(friendly, true);
  }
  return formatPitchSpelling(tone.spelling, true);
}

/**
 * スケール全体を文字列配列に変換
 */
export function formatScale(
  scale: ScaleTone[],
  displayMode: 'strict' | 'friendly' = 'strict'
): string[] {
  return scale.map(tone => formatScaleTone(tone, displayMode));
}
