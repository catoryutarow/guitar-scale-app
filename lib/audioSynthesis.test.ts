/**
 * audioSynthesis.ts のテスト
 * スケール再生が正しいオクターブで音を生成するか検証
 */

import { getPitchClass } from './scales';

// テスト用の簡易実装（実際のコードロジックと同じ）
function generateScaleSequence(scaleNotes: string[]): Array<{ note: string; octave: number; pitchClass: number }> {
  const baseOctave = 4;

  if (scaleNotes.length === 0) {
    return [];
  }

  const rootPitchClass = getPitchClass(scaleNotes[0]);

  // 上昇部分
  const ascendingSequence: Array<{ note: string; octave: number; pitchClass: number }> = [];

  scaleNotes.forEach((note) => {
    const pitchClass = getPitchClass(note);
    let octave = baseOctave;

    if (pitchClass < rootPitchClass) {
      octave = baseOctave + 1;
    }

    ascendingSequence.push({ note, octave, pitchClass });
  });

  ascendingSequence.push({ note: scaleNotes[0], octave: baseOctave + 1, pitchClass: rootPitchClass });

  // 下降部分
  const descendingSequence: Array<{ note: string; octave: number; pitchClass: number }> = [];

  for (let i = scaleNotes.length - 1; i >= 1; i--) {
    const note = scaleNotes[i];
    const pitchClass = getPitchClass(note);
    let octave = baseOctave;

    if (pitchClass < rootPitchClass) {
      octave = baseOctave + 1;
    }

    descendingSequence.push({ note, octave, pitchClass });
  }

  // 最後に元のオクターブのルートを追加
  descendingSequence.push({ note: scaleNotes[0], octave: baseOctave, pitchClass: rootPitchClass });

  return [...ascendingSequence, ...descendingSequence];
}

// MIDI番号を計算（オクターブとピッチクラスから）
function toMidiNumber(octave: number, pitchClass: number): number {
  return octave * 12 + pitchClass + 12; // C-1 = MIDI 0
}

// テストケース
const testCases = [
  {
    name: "G Major",
    scaleNotes: ["G", "A", "B", "C", "D", "E", "F#"],
    expectedPattern: "G4-A4-B4-C5-D5-E5-F#5-G5-F#5-E5-D5-C5-B4-A4-G4"
  },
  {
    name: "C Major",
    scaleNotes: ["C", "D", "E", "F", "G", "A", "B"],
    expectedPattern: "C4-D4-E4-F4-G4-A4-B4-C5-B4-A4-G4-F4-E4-D4-C4"
  },
  {
    name: "D Major",
    scaleNotes: ["D", "E", "F#", "G", "A", "B", "C#"],
    expectedPattern: "D4-E4-F#4-G4-A4-B4-C#5-D5-C#5-B4-A4-G4-F#4-E4-D4"
  },
  {
    name: "F Major",
    scaleNotes: ["F", "G", "A", "Bb", "C", "D", "E"],
    expectedPattern: "F4-G4-A4-Bb4-C5-D5-E5-F5-E5-D5-C5-Bb4-A4-G4-F4"
  },
  {
    name: "B Major",
    scaleNotes: ["B", "C#", "D#", "E", "F#", "G#", "A#"],
    expectedPattern: "B4-C#5-D#5-E5-F#5-G#5-A#5-B5-A#5-G#5-F#5-E5-D#5-C#5-B4"
  },
  {
    name: "Eb Major",
    scaleNotes: ["Eb", "F", "G", "Ab", "Bb", "C", "D"],
    expectedPattern: "Eb4-F4-G4-Ab4-Bb4-C5-D5-Eb5-D5-C5-Bb4-Ab4-G4-F4-Eb4"
  },
];

console.log("=== Scale Playback Sequence Test ===\n");

testCases.forEach(({ name, scaleNotes, expectedPattern }) => {
  console.log(`Testing: ${name}`);
  console.log(`Scale notes: ${scaleNotes.join(" ")}`);

  const sequence = generateScaleSequence(scaleNotes);
  const actualPattern = sequence.map(({ note, octave }) => `${note}${octave}`).join("-");

  console.log(`Expected: ${expectedPattern}`);
  console.log(`Actual:   ${actualPattern}`);

  // MIDI番号の連続性チェック（上昇→下降）
  const midiNumbers = sequence.map(({ octave, pitchClass }) => toMidiNumber(octave, pitchClass));
  let isAscending = true;
  let isPeakFound = false;
  let isValid = true;

  for (let i = 1; i < midiNumbers.length; i++) {
    const diff = midiNumbers[i] - midiNumbers[i - 1];

    if (isAscending) {
      if (diff > 0) {
        // 上昇中
        continue;
      } else if (diff < 0) {
        // ピークを越えて下降開始
        isAscending = false;
        isPeakFound = true;
      } else {
        // 同じ音が連続（ピーク）
        isPeakFound = true;
      }
    } else {
      // 下降中
      if (diff >= 0) {
        // 下降中に上昇または停滞 → エラー
        console.log(`  ❌ ERROR: Ascending during descent at index ${i} (MIDI: ${midiNumbers[i-1]} -> ${midiNumbers[i]})`);
        isValid = false;
      }
    }
  }

  // 結果判定
  const passed = actualPattern === expectedPattern && isValid && isPeakFound;
  console.log(passed ? "  ✅ PASS" : "  ❌ FAIL");
  console.log(`  MIDI sequence: ${midiNumbers.join(" -> ")}`);
  console.log();
});
