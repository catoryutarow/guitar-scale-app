/**
 * チューニング機能のテスト
 */

import { TUNINGS, transposeTuning, pitchClassToFriendlyNote } from './tunings';
import { getPitchClass } from './scales';

console.log('=== チューニング機能テスト ===\n');

// テスト1: Standard 6弦
console.log('【テスト1】 Standard 6弦');
const std6 = TUNINGS.standard_6;
console.log(`  弦数: ${std6.strings.length}`);
console.log(`  チューニング: ${std6.strings.join(' ')}`);
console.log(`  期待: E A D G B E`);
console.log(`  ✓ ${std6.strings.join(' ') === 'E A D G B E' ? '成功' : '失敗'}\n`);

// テスト2: Standard 7弦
console.log('【テスト2】 Standard 7弦');
const std7 = TUNINGS.standard_7;
console.log(`  弦数: ${std7.strings.length}`);
console.log(`  チューニング: ${std7.strings.join(' ')}`);
console.log(`  期待: B E A D G B E`);
console.log(`  ✓ ${std7.strings.join(' ') === 'B E A D G B E' ? '成功' : '失敗'}\n`);

// テスト3: Standard 8弦
console.log('【テスト3】 Standard 8弦');
const std8 = TUNINGS.standard_8;
console.log(`  弦数: ${std8.strings.length}`);
console.log(`  チューニング: ${std8.strings.join(' ')}`);
console.log(`  期待: F# B E A D G B E`);
console.log(`  ✓ ${std8.strings.join(' ') === 'F# B E A D G B E' ? '成功' : '失敗'}\n`);

// テスト4: Drop D
console.log('【テスト4】 Drop D');
const dropD = TUNINGS.drop_d;
console.log(`  チューニング: ${dropD.strings.join(' ')}`);
console.log(`  期待: D A D G B E（6弦がE→D）`);
console.log(`  ✓ ${dropD.strings.join(' ') === 'D A D G B E' ? '成功' : '失敗'}\n`);

// テスト5: Open D
console.log('【テスト5】 Open D');
const openD = TUNINGS.open_d;
console.log(`  チューニング: ${openD.strings.join(' ')}`);
console.log(`  期待: D A D F# A D`);
console.log(`  ✓ ${openD.strings.join(' ') === 'D A D F# A D' ? '成功' : '失敗'}\n`);

// テスト6: 半音下げ（Standard 6弦）
console.log('【テスト6】 半音下げ（Standard 6弦）');
const std6HalfDown = transposeTuning(std6, -1);
console.log(`  元: ${std6.strings.join(' ')}`);
console.log(`  結果: ${std6HalfDown.strings.join(' ')}`);
console.log(`  期待: D# G# C# F# A# D#`);

// ピッチクラスで検証
const expected = ['D#', 'G#', 'C#', 'F#', 'A#', 'D#'];
let allMatch = true;
for (let i = 0; i < 6; i++) {
  const resultPitch = getPitchClass(std6HalfDown.strings[i]);
  const expectedPitch = getPitchClass(expected[i]);
  if (resultPitch !== expectedPitch) {
    allMatch = false;
    console.log(`  ✗ 弦${i + 1}: ${std6HalfDown.strings[i]} (pitch=${resultPitch}) != ${expected[i]} (pitch=${expectedPitch})`);
  }
}
console.log(`  ✓ ${allMatch ? '成功（ピッチクラス一致）' : '失敗'}\n`);

// テスト7: Drop D 半音下げ
console.log('【テスト7】 Drop D 半音下げ');
const dropDHalfDown = transposeTuning(dropD, -1);
console.log(`  元: ${dropD.strings.join(' ')}`);
console.log(`  結果: ${dropDHalfDown.strings.join(' ')}`);
console.log(`  期待: C# G# C# F A# D#（全弦-1）`);

const expectedDropD = ['C#', 'G#', 'C#', 'F', 'A#', 'D#'];
let allMatchDropD = true;
for (let i = 0; i < 6; i++) {
  const resultPitch = getPitchClass(dropDHalfDown.strings[i]);
  const expectedPitch = getPitchClass(expectedDropD[i]);
  if (resultPitch !== expectedPitch) {
    allMatchDropD = false;
  }
}
console.log(`  ✓ ${allMatchDropD ? '成功（ピッチクラス一致）' : '失敗'}\n`);

// テスト8: pitchClassToFriendlyNote
console.log('【テスト8】 pitchClassToFriendlyNote');
console.log(`  0 → ${pitchClassToFriendlyNote(0)} (期待: C)`);
console.log(`  1 → ${pitchClassToFriendlyNote(1)} (期待: C#)`);
console.log(`  6 → ${pitchClassToFriendlyNote(6)} (期待: F#)`);
console.log(`  11 → ${pitchClassToFriendlyNote(11)} (期待: B)`);

const testPitches = [
  { pc: 0, expected: 'C' },
  { pc: 1, expected: 'C#' },
  { pc: 6, expected: 'F#' },
  { pc: 11, expected: 'B' },
];
const allPitchMatch = testPitches.every(t => pitchClassToFriendlyNote(t.pc) === t.expected);
console.log(`  ✓ ${allPitchMatch ? '成功' : '失敗'}\n`);

console.log('=== テスト完了 ===');
