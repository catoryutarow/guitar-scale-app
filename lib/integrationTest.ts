/**
 * 統合テスト: 新エンジンと既存APIの互換性を検証
 */

import { getScaleNotes, SCALE_NAMES } from './scales';

console.log('=== 統合テスト: スケール生成の動作確認 ===\n');

// テスト1: Cメジャー
console.log('【テスト1】 C メジャー');
const cMajor = getScaleNotes('C', 'メジャー');
console.log('  結果:', cMajor.join(', '));
console.log('  期待: C, D, E, F, G, A, B');
console.log(`  ✓ ${cMajor.join(', ') === 'C, D, E, F, G, A, B' ? '成功' : '失敗'}\n`);

// テスト2: D♭メジャー
console.log('【テスト2】 D♭ メジャー');
const dbMajor = getScaleNotes('Db', 'メジャー');
console.log('  結果:', dbMajor.join(', '));
console.log('  期待: D♭, E♭, F, G♭, A♭, B♭, C');
console.log(`  ✓ ${dbMajor.join(', ') === 'D♭, E♭, F, G♭, A♭, B♭, C' ? '成功' : '失敗'}\n`);

// テスト3: F♯メジャー（E♯が出るか）
console.log('【テスト3】 F♯ メジャー（E♯が出るか確認）');
const fsMajor = getScaleNotes('F#', 'メジャー');
console.log('  結果:', fsMajor.join(', '));
console.log('  期待: F♯, G♯, A♯, B, C♯, D♯, E♯');
const hasEs = fsMajor.some(n => n === 'E♯' || n === 'F');
console.log(`  ✓ ${fsMajor.join(', ') === 'F♯, G♯, A♯, B, C♯, D♯, E♯' ? '成功' : '失敗'}\n`);

// テスト4: Cマイナーペンタトニック（5音）
console.log('【テスト4】 C マイナーペンタトニック（5音）');
const cMinorPenta = getScaleNotes('C', 'マイナーペンタトニック');
console.log('  結果:', cMinorPenta.join(', '));
console.log('  音数:', cMinorPenta.length);
console.log(`  ✓ ${cMinorPenta.length === 5 ? '成功（5音）' : '失敗'}\n`);

// テスト5: C都節音階
console.log('【テスト5】 C 都節音階');
const cMiyako = getScaleNotes('C', '都節音階');
console.log('  結果:', cMiyako.join(', '));
console.log('  期待: C, D♭, F, G, A♭');
console.log(`  ✓ ${cMiyako.join(', ') === 'C, D♭, F, G, A♭' ? '成功' : '失敗'}\n`);

// テスト6: Cブルース
console.log('【テスト6】 C ブルース（♭5が含まれるか）');
const cBlues = getScaleNotes('C', 'ブルース');
console.log('  結果:', cBlues.join(', '));
console.log('  音数:', cBlues.length);
const hasFlat5 = cBlues.some(n => n === 'G♭' || n === 'F♯');
console.log(`  ✓ ${cBlues.length === 6 && hasFlat5 ? '成功（6音、♭5含む）' : '失敗'}\n`);

// スケール名リスト確認
console.log('【利用可能なスケール】');
console.log('  ' + SCALE_NAMES.join(', '));
console.log(`  合計: ${SCALE_NAMES.length}種類\n`);

console.log('=== テスト完了 ===');
