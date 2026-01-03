/**
 * 多言語対応（i18n）の翻訳データと設定
 */

export type Language = 'ja' | 'en' | 'zh' | 'es';

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

  // YouTube参考曲セクション
  referenceSongs: string;
  scale: string;
  dragAndDrop: string;
  or: string;
  selectFile: string;
  selectAnotherFile: string;
  supportedFormats: string;
  maxFileSize: string;
  fileTooLarge: string;
  unsupportedFormat: string;
  uploading: string;
  uploadingMessage: string;
  analyzing: string;
  analyzingMessage: string;
  completed: string;
  completedMessage: string;
  processing: string;
  processingMessage: string;
  scrollToResults: string;
  detectedKey: string;
  confidence: string;
  openingChords: string;
  aiEstimate: string;
  matchingScales: string;
  matchingScalesDesc: string;
  noMatchingScales: string;
  matchRate: string;
  matchedChords: string;
  currentlySelected: string;
  switchToScale: string;
  scaleHint: string;
  noChordProgression: string;
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

  // スケール名の翻訳
  scaleNames: {
    [key: string]: string;
  };

  // 指板関連
  tapToRotate: string;
  returnToNormal: string;

  // チューニング選択
  tuningSelection: string;
  tuningStandard: string;
  tuningDrop: string;
  tuningOpenAlternate: string;
  halfStepDown: string;
  currentTuning: string;

  // 楽器名
  instrumentGuitar: string;
  instrumentGuitar3: string;
  instrumentUkulele: string;
  instrumentBass4: string;
  instrumentBass5: string;

  // スケール再生
  playScale: string;
  playing: string;
  stopPlayback: string;
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

    referenceSongs: 'このスケールの参考曲',
    scale: 'スケール',
    dragAndDrop: '音源ファイルをドラッグ&ドロップ',
    or: 'または',
    selectFile: 'ファイルを選択',
    selectAnotherFile: '別のファイルを選択',
    supportedFormats: '対応形式',
    maxFileSize: '最大ファイルサイズ',
    fileTooLarge: 'ファイルサイズが大きすぎます',
    unsupportedFormat: 'サポートされていないファイル形式です',
    uploading: 'アップロード中',
    uploadingMessage: '音源ファイルをアップロードしています...',
    analyzing: '解析中',
    analyzingMessage: 'コード進行を解析しています...',
    completed: '解析完了',
    completedMessage: '解析が完了しました！',
    processing: '処理中',
    processingMessage: '処理を実行しています...',
    scrollToResults: '下にスクロールして解析結果をご確認ください',
    detectedKey: '検出されたキー',
    confidence: '信頼度',
    openingChords: '冒頭のコード進行（推定）',
    aiEstimate: 'AIによる推定結果です。実際のコード進行と異なる場合があります。',
    matchingScales: 'マッチするスケール',
    matchingScalesDesc: '検出されたコード進行にマッチする可能性の高いスケールです',
    noMatchingScales: 'マッチするスケールが見つかりませんでした',
    matchRate: 'マッチ率',
    matchedChords: 'マッチしたコード',
    currentlySelected: '現在選択中のスケール',
    switchToScale: 'このスケールに切り替える',
    scaleHint: 'マッチ率が高いスケールほど、検出されたコード進行との相性が良いです。スケールを切り替えると、指板上の表示も自動的に更新されます。',
    noChordProgression: 'コード進行が検出されませんでした',
    practiceWithScale: 'このスケールで練習する',
    backToScale: 'スケール選択画面に戻る',
    analyzeAnother: '別の音源を解析',

    audioHowToUse: '音源解析の使い方',
    audioInstruction1: 'MP3、WAV、M4Aなどの音源ファイルをアップロード',
    audioInstruction2: 'AIが自動的にキー（ルート音）とスケールを検出',
    audioInstruction3: '検出されたコード進行をタイムライン表示',
    audioInstruction4: 'マッチするスケールの候補を複数提案',
    audioInstruction5: '「このスケールで練習する」ボタンで指板表示画面に移動',

    scaleNames: {
      'メジャー': 'メジャー',
      'マイナー': 'マイナー',
      'ドリアン': 'ドリアン',
      'フリジアン': 'フリジアン',
      'リディア': 'リディア',
      'ミクソリディアン': 'ミクソリディアン',
      'ロクリアン': 'ロクリアン',
      'ハーモニックマイナー': 'ハーモニックマイナー',
      'メロディックマイナー': 'メロディックマイナー',
      'ブルース': 'ブルース',
      'メジャーペンタトニック': 'メジャーペンタトニック',
      'マイナーペンタトニック': 'マイナーペンタトニック',
      '都節音階': '都節音階',
    },

    tapToRotate: 'タップで回転',
    returnToNormal: '元に戻す',

    tuningSelection: 'チューニング選択',
    tuningStandard: 'スタンダード',
    tuningDrop: 'ドロップ',
    tuningOpenAlternate: 'オープン・オルタネート',
    halfStepDown: '半音下げ（全弦 -1）',
    currentTuning: '現在のチューニング',

    instrumentGuitar: 'ギター (6-9弦)',
    instrumentGuitar3: '3弦ギター',
    instrumentUkulele: 'ウクレレ',
    instrumentBass4: '4弦ベース',
    instrumentBass5: '5弦ベース',

    playScale: 'スケールを再生',
    playing: '再生中',
    stopPlayback: '停止',
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

    referenceSongs: 'Reference Songs for This Scale',
    scale: 'Scale',
    dragAndDrop: 'Drag & Drop Audio File',
    or: 'or',
    selectFile: 'Select File',
    selectAnotherFile: 'Select Another File',
    supportedFormats: 'Supported Formats',
    maxFileSize: 'Max File Size',
    fileTooLarge: 'File size is too large',
    unsupportedFormat: 'Unsupported file format',
    uploading: 'Uploading',
    uploadingMessage: 'Uploading audio file...',
    analyzing: 'Analyzing',
    analyzingMessage: 'Analyzing chord progression...',
    completed: 'Analysis Complete',
    completedMessage: 'Analysis completed successfully!',
    processing: 'Processing',
    processingMessage: 'Processing...',
    scrollToResults: 'Scroll down to view the analysis results',
    detectedKey: 'Detected Key',
    confidence: 'Confidence',
    openingChords: 'Opening Chords (Estimated)',
    aiEstimate: '※ AI-estimated results. May differ from actual chord progression.',
    matchingScales: 'Matching Scales',
    matchingScalesDesc: 'Scales that are likely to match the detected chord progression',
    noMatchingScales: 'No matching scales found',
    matchRate: 'Match Rate',
    matchedChords: 'Matched Chords',
    currentlySelected: 'Currently Selected Scale',
    switchToScale: 'Switch to this Scale',
    scaleHint: 'Higher match rates indicate better compatibility with the detected chord progression. Switching scales will automatically update the fretboard display.',
    noChordProgression: 'No chord progression detected',
    practiceWithScale: 'Practice with this Scale',
    backToScale: 'Back to Scale Selection',
    analyzeAnother: 'Analyze Another Audio',

    audioHowToUse: 'How to Use Audio Analysis',
    audioInstruction1: 'Upload audio files (MP3, WAV, M4A, etc.)',
    audioInstruction2: 'AI automatically detects key (root note) and scale',
    audioInstruction3: 'View detected chord progression timeline',
    audioInstruction4: 'Multiple matching scale candidates suggested',
    audioInstruction5: 'Click "Practice with this Scale" to view fretboard',

    scaleNames: {
      'メジャー': 'Major',
      'マイナー': 'Minor',
      'ドリアン': 'Dorian',
      'フリジアン': 'Phrygian',
      'リディア': 'Lydian',
      'ミクソリディアン': 'Mixolydian',
      'ロクリアン': 'Locrian',
      'ハーモニックマイナー': 'Harmonic Minor',
      'メロディックマイナー': 'Melodic Minor',
      'ブルース': 'Blues',
      'メジャーペンタトニック': 'Major Pentatonic',
      'マイナーペンタトニック': 'Minor Pentatonic',
      '都節音階': 'Miyako-bushi',
    },

    tapToRotate: 'Tap to Rotate',
    returnToNormal: 'Reset',

    tuningSelection: 'Tuning Selection',
    tuningStandard: 'Standard',
    tuningDrop: 'Drop',
    tuningOpenAlternate: 'Open & Alternate',
    halfStepDown: 'Half-step down (all strings -1)',
    currentTuning: 'Current Tuning',

    instrumentGuitar: 'Guitar (6-9 strings)',
    instrumentGuitar3: '3-string Guitar',
    instrumentUkulele: 'Ukulele',
    instrumentBass4: '4-string Bass',
    instrumentBass5: '5-string Bass',

    playScale: 'Play Scale',
    playing: 'Playing',
    stopPlayback: 'Stop',
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

    referenceSongs: '此音阶的参考歌曲',
    scale: '音阶',
    dragAndDrop: '拖放音频文件',
    or: '或',
    selectFile: '选择文件',
    selectAnotherFile: '选择其他文件',
    supportedFormats: '支持格式',
    maxFileSize: '最大文件大小',
    fileTooLarge: '文件大小过大',
    unsupportedFormat: '不支持的文件格式',
    uploading: '上传中',
    uploadingMessage: '正在上传音频文件...',
    analyzing: '分析中',
    analyzingMessage: '正在分析和弦进行...',
    completed: '分析完成',
    completedMessage: '分析成功完成！',
    processing: '处理中',
    processingMessage: '正在处理...',
    scrollToResults: '向下滚动查看分析结果',
    detectedKey: '检测到的调',
    confidence: '置信度',
    openingChords: '开头和弦进行（估计）',
    aiEstimate: '※ AI估计结果。可能与实际和弦进行不同。',
    matchingScales: '匹配的音阶',
    matchingScalesDesc: '与检测到的和弦进行可能匹配的音阶',
    noMatchingScales: '未找到匹配的音阶',
    matchRate: '匹配率',
    matchedChords: '匹配的和弦',
    currentlySelected: '当前选择的音阶',
    switchToScale: '切换到此音阶',
    scaleHint: '匹配率越高，与检测到的和弦进行的兼容性越好。切换音阶将自动更新指板显示。',
    noChordProgression: '未检测到和弦进行',
    practiceWithScale: '用这个音阶练习',
    backToScale: '返回音阶选择',
    analyzeAnother: '分析另一个音频',

    audioHowToUse: '音频分析使用方法',
    audioInstruction1: '上传音频文件（MP3、WAV、M4A等）',
    audioInstruction2: 'AI自动检测调（根音）和音阶',
    audioInstruction3: '查看检测到的和弦进行时间线',
    audioInstruction4: '提供多个匹配的音阶候选',
    audioInstruction5: '点击"用这个音阶练习"查看指板',

    scaleNames: {
      'メジャー': 'Major',
      'マイナー': 'Minor',
      'ドリアン': 'Dorian',
      'フリジアン': 'Phrygian',
      'リディア': 'Lydian',
      'ミクソリディアン': 'Mixolydian',
      'ロクリアン': 'Locrian',
      'ハーモニックマイナー': 'Harmonic Minor',
      'メロディックマイナー': 'Melodic Minor',
      'ブルース': 'Blues',
      'メジャーペンタトニック': 'Major Pentatonic',
      'マイナーペンタトニック': 'Minor Pentatonic',
      '都節音階': 'Miyako-bushi',
    },

    tapToRotate: 'Tap to Rotate',
    returnToNormal: 'Reset',

    tuningSelection: 'Tuning Selection',
    tuningStandard: 'Standard',
    tuningDrop: 'Drop',
    tuningOpenAlternate: 'Open & Alternate',
    halfStepDown: 'Half-step down (all strings -1)',
    currentTuning: 'Current Tuning',

    instrumentGuitar: 'Guitar (6-9 strings)',
    instrumentGuitar3: '3-string Guitar',
    instrumentUkulele: 'Ukulele',
    instrumentBass4: '4-string Bass',
    instrumentBass5: '5-string Bass',

    playScale: 'Play Scale',
    playing: 'Playing',
    stopPlayback: 'Stop',
  },

  es: {
    appTitle: 'Maestro de Escalas de Guitarra',
    appSubtitle: 'Visualizador de Escalas de Guitarra',

    selectRootNote: 'Seleccionar Nota Raíz',
    selectScale: 'Seleccionar Escala',
    audioAnalysisLink: 'Analizar Escala Automáticamente desde Audio',
    audioAnalysisDesc: 'Sube un archivo de audio para detectar escalas automáticamente',
    currentScale: 'Escala',
    notes: 'Notas',

    howToUse: 'Cómo Usar',
    instruction1: 'Selecciona la nota raíz (tonalidad)',
    instruction2: 'Usa el botón para cambiar entre notación sostenido/bemol',
    instruction3: 'Selecciona la escala que deseas mostrar',
    instruction4: 'Los círculos amarillos indican las notas de la escala',
    instruction5: 'Los círculos amarillos oscuros indican la nota raíz (1er grado)',
    instruction6: 'Los números representan el grado (1-7) dentro de la escala',
    instruction7: 'Los nombres de las notas se muestran según la teoría musical basada en los grados de la escala mayor',
    instruction8: '',

    audioAnalysis: 'Análisis de Audio',
    audioAnalysisSubtitle: 'Análisis de Audio para Escalas de Guitarra',
    uploadDescription: 'Sube archivos de audio para analizar automáticamente progresiones de acordes y escalas',

    referenceSongs: 'Canciones de Referencia para Esta Escala',
    scale: 'Escala',
    dragAndDrop: 'Arrastra y Suelta el Archivo de Audio',
    or: 'o',
    selectFile: 'Seleccionar Archivo',
    selectAnotherFile: 'Seleccionar Otro Archivo',
    supportedFormats: 'Formatos Compatibles',
    maxFileSize: 'Tamaño Máximo de Archivo',
    fileTooLarge: 'El tamaño del archivo es demasiado grande',
    unsupportedFormat: 'Formato de archivo no compatible',
    uploading: 'Subiendo',
    uploadingMessage: 'Subiendo archivo de audio...',
    analyzing: 'Analizando',
    analyzingMessage: 'Analizando progresión de acordes...',
    completed: 'Análisis Completo',
    completedMessage: '¡Análisis completado exitosamente!',
    processing: 'Procesando',
    processingMessage: 'Procesando...',
    scrollToResults: 'Desplázate hacia abajo para ver los resultados del análisis',
    detectedKey: 'Tonalidad Detectada',
    confidence: 'Confianza',
    openingChords: 'Acordes de Apertura (Estimados)',
    aiEstimate: '※ Resultados estimados por IA. Pueden diferir de la progresión de acordes real.',
    matchingScales: 'Escalas Coincidentes',
    matchingScalesDesc: 'Escalas que probablemente coincidan con la progresión de acordes detectada',
    noMatchingScales: 'No se encontraron escalas coincidentes',
    matchRate: 'Tasa de Coincidencia',
    matchedChords: 'Acordes Coincidentes',
    currentlySelected: 'Escala Actualmente Seleccionada',
    switchToScale: 'Cambiar a Esta Escala',
    scaleHint: 'Tasas de coincidencia más altas indican mejor compatibilidad con la progresión de acordes detectada. Cambiar escalas actualizará automáticamente la visualización del diapasón.',
    noChordProgression: 'No se detectó progresión de acordes',
    practiceWithScale: 'Practicar con Esta Escala',
    backToScale: 'Volver a Selección de Escalas',
    analyzeAnother: 'Analizar Otro Audio',

    audioHowToUse: 'Cómo Usar el Análisis de Audio',
    audioInstruction1: 'Sube archivos de audio (MP3, WAV, M4A, etc.)',
    audioInstruction2: 'La IA detecta automáticamente la tonalidad (nota raíz) y la escala',
    audioInstruction3: 'Ver línea de tiempo de la progresión de acordes detectada',
    audioInstruction4: 'Se sugieren múltiples candidatos de escalas coincidentes',
    audioInstruction5: 'Haz clic en "Practicar con Esta Escala" para ver el diapasón',

    scaleNames: {
      'メジャー': 'Mayor',
      'マイナー': 'Menor',
      'ドリアン': 'Dórico',
      'フリジアン': 'Frigio',
      'リディア': 'Lidio',
      'ミクソリディアン': 'Mixolidio',
      'ロクリアン': 'Locrio',
      'ハーモニックマイナー': 'Menor Armónico',
      'メロディックマイナー': 'Menor Melódico',
      'ブルース': 'Blues',
      'メジャーペンタトニック': 'Pentatónica Mayor',
      'マイナーペンタトニック': 'Pentatónica Menor',
      '都節音階': 'Miyako-bushi',
    },

    tapToRotate: 'Toca para Rotar',
    returnToNormal: 'Restablecer',

    tuningSelection: 'Tuning Selection',
    tuningStandard: 'Standard',
    tuningDrop: 'Drop',
    tuningOpenAlternate: 'Open & Alternate',
    halfStepDown: 'Half-step down (all strings -1)',
    currentTuning: 'Current Tuning',

    instrumentGuitar: 'Guitar (6-9 strings)',
    instrumentGuitar3: '3-string Guitar',
    instrumentUkulele: 'Ukulele',
    instrumentBass4: '4-string Bass',
    instrumentBass5: '5-string Bass',

    playScale: 'Play Scale',
    playing: 'Playing',
    stopPlayback: 'Stop',
  },
};

export function getTranslation(lang: Language): Translations {
  return translations[lang];
}
