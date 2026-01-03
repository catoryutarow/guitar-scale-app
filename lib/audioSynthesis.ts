/**
 * Web Audio API を使用した音声合成ユーティリティ
 * スケールの再生機能を提供
 */

import { getPitchClass } from './scales';

/**
 * 音名とオクターブから周波数を計算
 * A4 = 440Hz を基準に平均律で計算
 *
 * @param note 音名 ("C", "C#", "D", etc.)
 * @param octave オクターブ (4 = middle C octave)
 * @returns 周波数 (Hz)
 */
export function noteToFrequency(note: string, octave: number = 4): number {
  const pitchClass = getPitchClass(note);
  // A4 = 440Hz (pitchClass 9)
  // C4 = pitchClass 0, octave 4
  const semitonesFromA4 = (octave - 4) * 12 + pitchClass - 9;
  return 440 * Math.pow(2, semitonesFromA4 / 12);
}

/**
 * 単一の音を再生
 *
 * @param frequency 周波数 (Hz)
 * @param duration 再生時間 (秒)
 * @param audioContext Web Audio API コンテキスト
 * @param startTime 開始時刻 (audioContext.currentTime からの相対時間)
 */
function playTone(
  frequency: number,
  duration: number,
  audioContext: AudioContext,
  startTime: number
): void {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = 'sine'; // シンプルなサイン波
  oscillator.frequency.value = frequency;

  // エンベロープ（音量の時間変化）
  const attackTime = 0.01; // アタック: 10ms
  const releaseTime = 0.05; // リリース: 50ms

  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(0.3, startTime + attackTime); // 音量0.3まで上昇
  gainNode.gain.setValueAtTime(0.3, startTime + duration - releaseTime);
  gainNode.gain.linearRampToValueAtTime(0, startTime + duration); // フェードアウト

  oscillator.start(startTime);
  oscillator.stop(startTime + duration);
}

/**
 * スケールを上昇→下降で再生
 * 例: Gメジャーなら G4-A4-B4-C5-D5-E5-F#5-G5-F#5-E5-D5-C5-B4-A4-G4
 *
 * @param scaleNotes スケールの構成音配列 (例: ["G", "A", "B", "C", "D", "E", "F#"] for G Major)
 * @param onComplete 再生完了時のコールバック
 * @param onStop 停止用コールバックを受け取る関数
 */
export function playScale(
  scaleNotes: string[],
  onComplete?: () => void,
  onStop?: (stopFn: () => void) => void
): void {
  // AudioContext を作成
  const audioContext = new AudioContext();

  const tempo = 120; // BPM
  const noteDuration = 60 / tempo; // 1音あたりの秒数 (0.5秒)
  const baseOctave = 4; // 開始オクターブ

  if (scaleNotes.length === 0) {
    return;
  }

  // ルート音のピッチクラス
  const rootPitchClass = getPitchClass(scaleNotes[0]);

  // 上昇部分: ルートから1オクターブ上のルートまで（ピッチクラスベース）
  const ascendingSequence: Array<{ note: string; octave: number }> = [];

  scaleNotes.forEach((note, index) => {
    const pitchClass = getPitchClass(note);
    let octave = baseOctave;

    // ピッチクラスがルートより小さい場合は次のオクターブ
    if (pitchClass < rootPitchClass) {
      octave = baseOctave + 1;
    }

    ascendingSequence.push({ note, octave });
  });

  // 最後に1オクターブ上のルートを追加
  ascendingSequence.push({ note: scaleNotes[0], octave: baseOctave + 1 });

  // 下降部分: 1オクターブ上のルートから元のルートまで（逆順、上端のG5は除く、下端のG4は含む）
  const descendingSequence: Array<{ note: string; octave: number }> = [];

  for (let i = scaleNotes.length - 1; i >= 1; i--) {
    const note = scaleNotes[i];
    const pitchClass = getPitchClass(note);
    let octave = baseOctave;

    // ピッチクラスがルートより小さい場合は次のオクターブ
    if (pitchClass < rootPitchClass) {
      octave = baseOctave + 1;
    }

    descendingSequence.push({ note, octave });
  }

  // 最後に元のオクターブのルートを追加
  descendingSequence.push({ note: scaleNotes[0], octave: baseOctave });

  // 全体のシーケンス
  const noteSequence = [...ascendingSequence, ...descendingSequence];

  // 各音を順番にスケジュール
  let currentTime = audioContext.currentTime;

  noteSequence.forEach(({ note, octave }) => {
    const frequency = noteToFrequency(note, octave);
    playTone(frequency, noteDuration * 0.9, audioContext, currentTime); // 0.9倍で音を少し短くして区切りを明確に
    currentTime += noteDuration;
  });

  // 停止関数を提供
  if (onStop) {
    onStop(() => {
      audioContext.close();
      if (onComplete) {
        onComplete();
      }
    });
  }

  // 再生完了時にAudioContextをクローズ
  const totalDuration = noteSequence.length * noteDuration * 1000; // ミリ秒
  setTimeout(() => {
    audioContext.close();
    if (onComplete) {
      onComplete();
    }
  }, totalDuration);
}
