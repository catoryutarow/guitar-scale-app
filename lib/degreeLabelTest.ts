/**
 * 度数ラベルのテスト
 * ペンタトニックや都節音階で度数が詰められていないことを確認
 */

import { getScaleNotes, getScaleDegreeLabel } from './scales';

console.log('=== 度数ラベルテスト ===\n');

// テスト1: メジャーペンタトニック（期待: 1, 2, 3, 5, 6）
console.log('【テスト1】 C メジャーペンタトニック');
const cMajorPenta = getScaleNotes('C', 'メジャーペンタトニック');
console.log('音名:', cMajorPenta.join(', '));
console.log('度数:');
cMajorPenta.forEach(note => {
  const label = getScaleDegreeLabel(note, 'C', 'メジャーペンタトニック', cMajorPenta);
  console.log(`  ${note} → ${label}`);
});
console.log('期待: 1, 2, 3, 5, 6\n');

// テスト2: マイナーペンタトニック（期待: 1, b3, 4, 5, b7）
console.log('【テスト2】 E♭ マイナーペンタトニック');
const ebMinorPenta = getScaleNotes('Eb', 'マイナーペンタトニック');
console.log('音名:', ebMinorPenta.join(', '));
console.log('度数:');
ebMinorPenta.forEach(note => {
  const label = getScaleDegreeLabel(note, 'Eb', 'マイナーペンタトニック', ebMinorPenta);
  console.log(`  ${note} → ${label}`);
});
console.log('期待: 1, b3, 4, 5, b7\n');

// テスト3: 都節音階（期待: 1, b2, 4, 5, b6）
console.log('【テスト3】 C 都節音階');
const cMiyako = getScaleNotes('C', '都節音階');
console.log('音名:', cMiyako.join(', '));
console.log('度数:');
cMiyako.forEach(note => {
  const label = getScaleDegreeLabel(note, 'C', '都節音階', cMiyako);
  console.log(`  ${note} → ${label}`);
});
console.log('期待: 1, b2, 4, 5, b6\n');

// テスト4: ブルース（期待: 1, b3, 4, b5, 5, b7）
console.log('【テスト4】 C ブルース');
const cBlues = getScaleNotes('C', 'ブルース');
console.log('音名:', cBlues.join(', '));
console.log('度数:');
cBlues.forEach(note => {
  const label = getScaleDegreeLabel(note, 'C', 'ブルース', cBlues);
  console.log(`  ${note} → ${label}`);
});
console.log('期待: 1, b3, 4, b5, 5, b7\n');

// テスト5: メジャー（基準、期待: 1, 2, 3, 4, 5, 6, 7）
console.log('【テスト5】 C メジャー（基準）');
const cMajor = getScaleNotes('C', 'メジャー');
console.log('音名:', cMajor.join(', '));
console.log('度数:');
cMajor.forEach(note => {
  const label = getScaleDegreeLabel(note, 'C', 'メジャー', cMajor);
  console.log(`  ${note} → ${label}`);
});
console.log('期待: 1, 2, 3, 4, 5, 6, 7\n');

// テスト6: マイナー（期待: 1, 2, b3, 4, 5, b6, b7）
console.log('【テスト6】 A マイナー');
const aMinor = getScaleNotes('A', 'マイナー');
console.log('音名:', aMinor.join(', '));
console.log('度数:');
aMinor.forEach(note => {
  const label = getScaleDegreeLabel(note, 'A', 'マイナー', aMinor);
  console.log(`  ${note} → ${label}`);
});
console.log('期待: 1, 2, b3, 4, 5, b6, b7\n');

console.log('=== テスト完了 ===');
