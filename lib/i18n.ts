/**
 * 多言語対応（i18n）の翻訳データと設定
 */

export type Language = 'ja' | 'en' | 'zh';

export interface Translations {
  // ヘッダー
  appTitle: string;
  appSubtitle: string;

  // メインページ
  selectRootNote: string;
  selectScale: string;
  audioAnalysisLink: string;
  audioAnalysisDesc: string;
  currentScale: string;
  notes: string;

  // 使い方
  howToUse: string;
  instruction1: string;
  instruction2: string;
  instruction3: string;
  instruction4: string;
  instruction5: string;
  instruction6: string;
  instruction7: string;
  instruction8: string;

  // 音源解析ページ
  audioAnalysis: string;
  audioAnalysisSubtitle: string;
  uploadDescription: string;
  dragAndDrop: string;
  or: string;
  selectFile: string;
  supportedFormats: string;
  maxFileSize: string;
  analyzing: string;
  detectedKey: string;
  confidence: string;
  openingChords: string;
  aiEstimate: string;
  matchingScales: string;
  practiceWithScale: string;
  backToScale: string;
  analyzeAnother: string;

  // 音源解析の使い方
  audioHowToUse: string;
  audioInstruction1: string;
  audioInstruction2: string;
  audioInstruction3: string;
  audioInstruction4: string;
  audioInstruction5: string;
}

export const translations: Record<Language, Translations> = {
  ja: {
    appTitle: 'ギタースケールわかる君',
    appSubtitle: 'Guitar Scale Visualizer',

    selectRootNote: 'ルート音を選択',
    selectScale: 'スケールを選択',
    audioAnalysisLink: '音源からスケールを自動解析',
    audioAnalysisDesc: '音源ファイルをアップロードして自動でスケールを検出',
    currentScale: 'スケール',
    notes: '構成音',

    howToUse: '使い方',
    instruction1: 'ルート音（キー）を選択してください',
    instruction2: '切り替えボタンで♯系/♭系を変更できます',
    instruction3: '表示したいスケールを選択してください',
    instruction4: '黄色の丸がスケール上の音を示しています',
    instruction5: '濃い黄色の丸がルート音（1度）を示しています',
    instruction6: '数字はスケール内での度数（1-7）を表します',
    instruction7: '音名は、メジャースケールのディグリーを基準に音楽理論的に正しく表示されます',
    instruction8: '',

    audioAnalysis: '音源解析',
    audioAnalysisSubtitle: 'Audio Analysis for Guitar Scales',
    uploadDescription: '音源ファイルをアップロードして、コード進行とスケールを自動解析します',
    dragAndDrop: '音源ファイルをドラッグ&ドロップ',
    or: 'または',
    selectFile: 'ファイルを選択',
    supportedFormats: '対応形式',
    maxFileSize: '最大ファイルサイズ',
    analyzing: '解析中',
    detectedKey: '検出されたキー',
    confidence: '信頼度',
    openingChords: '冒頭のコード進行（推定）',
    aiEstimate: 'AIによる推定結果です。実際のコード進行と異なる場合があります。',
    matchingScales: 'マッチするスケール',
    practiceWithScale: 'このスケールで練習する',
    backToScale: 'スケール選択画面に戻る',
    analyzeAnother: '別の音源を解析',

    audioHowToUse: '音源解析の使い方',
    audioInstruction1: 'MP3、WAV、M4Aなどの音源ファイルをアップロード',
    audioInstruction2: 'AIが自動的にキー（ルート音）とスケールを検出',
    audioInstruction3: '検出されたコード進行をタイムライン表示',
    audioInstruction4: 'マッチするスケールの候補を複数提案',
    audioInstruction5: '「このスケールで練習する」ボタンで指板表示画面に移動',
  },

  en: {
    appTitle: 'Guitar Scale Master',
    appSubtitle: 'Guitar Scale Visualizer',

    selectRootNote: 'Select Root Note',
    selectScale: 'Select Scale',
    audioAnalysisLink: 'Auto-Analyze Scale from Audio',
    audioAnalysisDesc: 'Upload audio file to automatically detect scales',
    currentScale: 'Scale',
    notes: 'Notes',

    howToUse: 'How to Use',
    instruction1: 'Select the root note (key)',
    instruction2: 'Use toggle button to switch between sharp/flat notation',
    instruction3: 'Select the scale you want to display',
    instruction4: 'Yellow circles indicate scale notes',
    instruction5: 'Dark yellow circles indicate the root note (1st degree)',
    instruction6: 'Numbers represent the degree (1-7) within the scale',
    instruction7: 'Note names are displayed according to music theory based on major scale degrees',
    instruction8: '',

    audioAnalysis: 'Audio Analysis',
    audioAnalysisSubtitle: 'Audio Analysis for Guitar Scales',
    uploadDescription: 'Upload audio files to automatically analyze chord progressions and scales',
    dragAndDrop: 'Drag & Drop Audio File',
    or: 'or',
    selectFile: 'Select File',
    supportedFormats: 'Supported Formats',
    maxFileSize: 'Max File Size',
    analyzing: 'Analyzing',
    detectedKey: 'Detected Key',
    confidence: 'Confidence',
    openingChords: 'Opening Chords (Estimated)',
    aiEstimate: '※ AI-estimated results. May differ from actual chord progression.',
    matchingScales: 'Matching Scales',
    practiceWithScale: 'Practice with this Scale',
    backToScale: 'Back to Scale Selection',
    analyzeAnother: 'Analyze Another Audio',

    audioHowToUse: 'How to Use Audio Analysis',
    audioInstruction1: 'Upload audio files (MP3, WAV, M4A, etc.)',
    audioInstruction2: 'AI automatically detects key (root note) and scale',
    audioInstruction3: 'View detected chord progression timeline',
    audioInstruction4: 'Multiple matching scale candidates suggested',
    audioInstruction5: 'Click "Practice with this Scale" to view fretboard',
  },

  zh: {
    appTitle: '吉他音阶大师',
    appSubtitle: 'Guitar Scale Visualizer',

    selectRootNote: '选择根音',
    selectScale: '选择音阶',
    audioAnalysisLink: '从音频自动分析音阶',
    audioAnalysisDesc: '上传音频文件自动检测音阶',
    currentScale: '音阶',
    notes: '音符构成',

    howToUse: '使用方法',
    instruction1: '选择根音（调）',
    instruction2: '使用切换按钮在升号/降号系统之间切换',
    instruction3: '选择要显示的音阶',
    instruction4: '黄色圆圈表示音阶上的音符',
    instruction5: '深黄色圆圈表示根音（第1度）',
    instruction6: '数字表示音阶内的度数（1-7）',
    instruction7: '音符名称根据大调音阶度数的音乐理论正确显示',
    instruction8: '',

    audioAnalysis: '音频分析',
    audioAnalysisSubtitle: 'Audio Analysis for Guitar Scales',
    uploadDescription: '上传音频文件，自动分析和弦进行和音阶',
    dragAndDrop: '拖放音频文件',
    or: '或',
    selectFile: '选择文件',
    supportedFormats: '支持格式',
    maxFileSize: '最大文件大小',
    analyzing: '分析中',
    detectedKey: '检测到的调',
    confidence: '置信度',
    openingChords: '开头和弦进行（估计）',
    aiEstimate: '※ AI估计结果。可能与实际和弦进行不同。',
    matchingScales: '匹配的音阶',
    practiceWithScale: '用这个音阶练习',
    backToScale: '返回音阶选择',
    analyzeAnother: '分析另一个音频',

    audioHowToUse: '音频分析使用方法',
    audioInstruction1: '上传音频文件（MP3、WAV、M4A等）',
    audioInstruction2: 'AI自动检测调（根音）和音阶',
    audioInstruction3: '查看检测到的和弦进行时间线',
    audioInstruction4: '提供多个匹配的音阶候选',
    audioInstruction5: '点击"用这个音阶练习"查看指板',
  },
};

export function getTranslation(lang: Language): Translations {
  return translations[lang];
}
