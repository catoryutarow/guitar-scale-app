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
 *
 * @param scaleNotes スケールの構成音配列 (例: ["C", "D", "E", "F", "G", "A", "B"])
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
  const octave = 4; // 中央のオクターブ

  // 上昇 + 下降のノート配列を作成
  const ascendingNotes = [...scaleNotes];
  const descendingNotes = [...scaleNotes].reverse().slice(1); // 最高音は重複させない
  const allNotes = [...ascendingNotes, ...descendingNotes];

  // 各音を順番にスケジュール
  let currentTime = audioContext.currentTime;

  allNotes.forEach((note, index) => {
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
  const totalDuration = allNotes.length * noteDuration * 1000; // ミリ秒
  setTimeout(() => {
    audioContext.close();
    if (onComplete) {
      onComplete();
    }
  }, totalDuration);
}
