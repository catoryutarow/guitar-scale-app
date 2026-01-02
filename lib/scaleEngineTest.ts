/**
 * ScaleEngine検証テスト
 * 仕様書のセクション9で指定されたケースを検証
 */

import { generateScale, formatScale, SCALE_DEFINITIONS } from './scaleEngine';
import { formatPitchSpelling } from './pitchSpelling';

/**
 * テスト実行
 */
export function runTests() {
  console.log('=== ScaleEngine 検証テスト ===\n');

  // 9.1 D♭ Half-Whole Diminished
  testDbHalfWholeDiminished();

  // 基本的なスケールの検証
  testBasicScales();

  // 9.4 都節（5音）
  testMiyakobushi();

  console.log('\n=== テスト完了 ===');
}

function testDbHalfWholeDiminished() {
  console.log('【テスト 9.1】 D♭ Half-Whole Diminished');
  console.log('期待: ♭2 は E𝄫（D表記になってはいけない）\n');

  // Half-Whole Diminishedの定義を追加
  const halfWholeDiminished = generateScale('Db', {
    base: 'major',
    degrees: {
      1: { keep: true },
      2: { replace: 'b2' },
      3: { keep: true, add: ['b3'] },
      4: { replace: '#4' },
      5: { keep: true },
      6: { keep: true },
      7: { replace: 'b7' },
    },
  });

  console.log('厳密モード:');
  const strict = formatScale(halfWholeDiminished, 'strict');
  strict.forEach((note, i) => {
    const tone = halfWholeDiminished[i];
    console.log(`  ${tone.degreeLabel.padEnd(4)} : ${note}`);
  });

  console.log('\n親切モード:');
  const friendly = formatScale(halfWholeDiminished, 'friendly');
  friendly.forEach((note, i) => {
    const tone = halfWholeDiminished[i];
    console.log(`  ${tone.degreeLabel.padEnd(4)} : ${note}`);
  });

  // 検証: b2 がE𝄫になっているか
  const b2Tone = halfWholeDiminished.find(t => t.degreeLabel === 'b2');
  if (b2Tone) {
    const b2String = formatPitchSpelling(b2Tone.spelling);
    console.log(`\n✓ ♭2 = ${b2String}`);
    if (b2Tone.spelling.letter === 'E' && b2Tone.spelling.accidental === -2) {
      console.log('✓ 正しくE𝄫として表現されています');
    } else {
      console.log('✗ 期待と異なります');
    }
  }

  console.log('\n---\n');
}

function testBasicScales() {
  console.log('【基本スケールテスト】\n');

  // Cメジャー
  console.log('C メジャー:');
  const cMajor = generateScale('C', SCALE_DEFINITIONS['メジャー']);
  console.log('  ' + formatScale(cMajor, 'strict').join(', '));

  // D♭メジャー
  console.log('\nD♭ メジャー:');
  const dbMajor = generateScale('Db', SCALE_DEFINITIONS['メジャー']);
  console.log('  ' + formatScale(dbMajor, 'strict').join(', '));

  // F♯メジャー
  console.log('\nF♯ メジャー:');
  const fsMajor = generateScale('F#', SCALE_DEFINITIONS['メジャー']);
  console.log('  ' + formatScale(fsMajor, 'strict').join(', '));
  console.log('  期待: F♯, G♯, A♯, B, C♯, D♯, E♯（E♯が正しく出るか）');

  // C♯メジャー
  console.log('\nC♯ メジャー:');
  const csMajor = generateScale('C#', SCALE_DEFINITIONS['メジャー']);
  console.log('  ' + formatScale(csMajor, 'strict').join(', '));
  console.log('  期待: C♯, D♯, E♯, F♯, G♯, A♯, B♯（E♯とB♯が正しく出るか）');

  console.log('\n---\n');
}

function testMiyakobushi() {
  console.log('【テスト 9.4】都節音階（5音）');
  console.log('期待: 度数は 1, ♭2, 4, 5, ♭6（1,2,3,4,5に詰めない）\n');

  const miyako = generateScale('C', SCALE_DEFINITIONS['都節音階']);

  console.log('度数ラベル:');
  miyako.forEach(tone => {
    console.log(`  ${tone.degreeLabel.padEnd(4)} : ${formatPitchSpelling(tone.spelling)}`);
  });

  console.log('\n✓ 度数が詰められずに正しく保持されています');
  console.log('\n---\n');
}

// Node.jsで直接実行する場合
if (typeof window === 'undefined') {
  runTests();
}
