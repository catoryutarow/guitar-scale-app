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

  // フッター
  footerDescription: string;
  footerContents: string;
  footerSupport: string;
  home: string;
  aboutSite: string;
  articles: string;
  contact: string;
  privacyPolicy: string;
  companyInfo: string;
  copyright: string;

  // ナビゲーション
  backToHome: string;

  // Aboutページ
  aboutTitle: string;
  aboutServiceOverview: string;
  aboutServiceDesc1: string;
  aboutServiceDesc2: string;
  aboutMainFeatures: string;
  aboutFeatureVisualize: string;
  aboutFeatureVisualizeDesc: string;
  aboutFeatureAnalysis: string;
  aboutFeatureAnalysisDesc: string;
  aboutFeaturePlay: string;
  aboutFeaturePlayDesc: string;
  aboutFeatureVideo: string;
  aboutFeatureVideoDesc: string;
  aboutFeatureTuning: string;
  aboutFeatureTuningDesc: string;
  aboutFeatureResponsive: string;
  aboutFeatureResponsiveDesc: string;
  aboutSupportedScales: string;
  aboutBasicScales: string;
  aboutModeScales: string;
  aboutPentaOther: string;
  scaleMajor: string;
  scaleNaturalMinor: string;
  scaleHarmonicMinor: string;
  scaleMelodicMinor: string;
  scaleDorian: string;
  scalePhrygian: string;
  scaleLydian: string;
  scaleMixolydian: string;
  scaleLocrian: string;
  scaleMajorPentatonic: string;
  scaleMinorPentatonic: string;
  scaleBlues: string;
  scaleInSen: string;
  aboutHowToUse: string;
  aboutStep1: string;
  aboutStep1Desc: string;
  aboutStep2: string;
  aboutStep2Desc: string;
  aboutStep3: string;
  aboutStep3Desc: string;
  aboutStep4: string;
  aboutStep4Desc: string;
  aboutRecommendedFor: string;
  aboutRecommend1: string;
  aboutRecommend2: string;
  aboutRecommend3: string;
  aboutRecommend4: string;
  aboutRecommend5: string;
  aboutRecommend6: string;
  aboutCta: string;

  // コラム記事ページ
  articlesTitle: string;
  articlesSubtitle: string;
  articleCategory: {
    beginner: string;
    intermediate: string;
    practice: string;
  };
  articleReadMore: string;
  articleTryScale: string;
  articleTryScaleDesc: string;
  articleUseVisualizer: string;
  articleRelated: string;

  // ペンタトニック記事
  pentatonicTitle: string;
  pentatonicDesc: string;
  pentatonicWhat: string;
  pentatonicWhatDesc1: string;
  pentatonicWhatDesc2: string;
  pentatonicTypes: string;
  pentatonicMajor: string;
  pentatonicMajorDesc: string;
  pentatonicMinor: string;
  pentatonicMinorDesc: string;
  pentatonicWhy: string;
  pentatonicWhy1: string;
  pentatonicWhy1Desc: string;
  pentatonicWhy2: string;
  pentatonicWhy2Desc: string;
  pentatonicWhy3: string;
  pentatonicWhy3Desc: string;
  pentatonicPractice: string;
  pentatonicPracticeList: string[];
  pentatonicSummary: string;
  pentatonicSummaryDesc: string;
  pentatonicCta: string;
  pentatonicViewMajor: string;
  pentatonicViewMinor: string;

  // モードスケール記事
  modeTitle: string;
  modeDesc: string;
  modeWhat: string;
  modeWhatDesc1: string;
  modeWhatDesc2: string;
  mode7Modes: string;
  modeIonian: string;
  modeIonianDesc: string;
  modeDorian: string;
  modeDorianDesc: string;
  modeDorianExample: string;
  modePhrygian: string;
  modePhrygianDesc: string;
  modePhrygianExample: string;
  modeLydian: string;
  modeLydianDesc: string;
  modeLydianExample: string;
  modeMixolydian: string;
  modeMixolydianDesc: string;
  modeMixolydianExample: string;
  modeAeolian: string;
  modeAeolianDesc: string;
  modeLocrian: string;
  modeLocrianDesc: string;
  modeHowToRemember: string;
  modeHowToRememberDesc: string;
  modePracticalTips: string;
  modePracticalTipsList: string[];
  modeSummary: string;
  modeSummaryDesc: string;
  modeCta: string;

  // ブルーススケール記事
  bluesTitle: string;
  bluesDesc: string;
  bluesWhat: string;
  bluesWhatDesc1: string;
  bluesWhatDesc2: string;
  bluesStructure: string;
  bluesExample: string;
  bluesDegrees: string;
  bluesStructureDesc: string;
  bluesNote: string;
  bluesNoteMagic: string;
  bluesBending: string;
  bluesBendingDesc: string;
  bluesHammerPull: string;
  bluesHammerPullDesc: string;
  bluesSlide: string;
  bluesSlideDesc: string;
  bluesPatterns: string;
  bluesPattern1: string;
  bluesPattern1Desc: string;
  bluesPattern2: string;
  bluesPattern2Desc: string;
  bluesPattern3: string;
  bluesPattern3Desc: string;
  bluesMajorApplication: string;
  bluesMajorApplicationDesc1: string;
  bluesMajorApplicationDesc2: string;
  bluesPractice: string;
  bluesPracticeList: string[];
  bluesGuitarists: string;
  bluesGuitarist1: string;
  bluesGuitarist2: string;
  bluesGuitarist3: string;
  bluesGuitarist4: string;
  bluesSummary: string;
  bluesSummaryDesc: string;
  bluesCta: string;
  bluesViewA: string;
  bluesViewE: string;

  // ハーモニックマイナー記事
  harmonicTitle: string;
  harmonicDesc: string;
  harmonicWhat: string;
  harmonicWhatDesc1: string;
  harmonicWhatDesc2: string;
  harmonicStructure: string;
  harmonicStructureDesc: string;
  harmonicCharacteristic: string;
  harmonicCharacteristicDesc: string;
  harmonicUsage: string;
  harmonicUsage1: string;
  harmonicUsage1Desc: string;
  harmonicUsage2: string;
  harmonicUsage2Desc: string;
  harmonicUsage3: string;
  harmonicUsage3Desc: string;
  harmonicComparison: string;
  harmonicComparisonDesc: string;
  harmonicPractice: string;
  harmonicPracticeList: string[];
  harmonicSummary: string;
  harmonicSummaryDesc: string;
  harmonicCta: string;
  harmonicViewA: string;
  harmonicViewE: string;

  // スケール練習法記事
  practiceTitle: string;
  practiceDesc: string;
  practiceIntro: string;
  practiceIntroDesc: string;
  practiceStep1: string;
  practiceStep1Desc: string;
  practiceStep1List: string[];
  practiceStep2: string;
  practiceStep2Desc: string;
  practiceStep2List: string[];
  practiceStep3: string;
  practiceStep3Desc: string;
  practiceStep3List: string[];
  practiceStep4: string;
  practiceStep4Desc: string;
  practiceStep4List: string[];
  practiceTips: string;
  practiceTipsList: string[];
  practiceSummary: string;
  practiceSummaryDesc: string;
  practiceCta: string;

  // プライバシーポリシーページ
  privacyTitle: string;
  privacyIntro: string;
  privacySection1: string;
  privacySection1List: string[];
  privacySection2: string;
  privacySection2List: string[];
  privacySection3: string;
  privacySection3Desc: string;
  privacySection3List: string[];
  privacySection4: string;
  privacySection4Desc: string;
  privacySection5: string;
  privacySection5Desc: string;
  privacySection6: string;
  privacySection6Desc1: string;
  privacySection6Desc2: string;
  privacySection6Desc3: string;
  privacySection7: string;
  privacySection7Desc: string;
  privacySection8: string;
  privacySection8Desc: string;
  privacySection9: string;
  privacySection9Desc1: string;
  privacySection9Desc2: string;
  privacySection10: string;
  privacySection10Desc: string;
  privacySection11: string;
  privacySection11Desc: string;
  privacySection12: string;
  privacySection12Desc: string;
  privacyEnacted: string;
  privacyUpdated: string;

  // 運営者情報ページ
  companyTitle: string;
  companySection1: string;
  companyName: string;
  companyNameEn: string;
  companyOfficialSite: string;
  companySection2: string;
  companyBusinessDesc: string;
  companyBusinessList: string[];
  companySection3: string;
  companyServiceDesc1: string;
  companyServiceDesc2: string;
  companySection4: string;
  companyContactDesc: string;
  companyContactForm: string;
  companyOfficialSiteBtn: string;

  // お問い合わせページ
  contactTitle: string;
  contactDesc: string;
  contactNotes: string;
  contactNote1: string;
  contactNote2: string;
  contactNote3: string;

  // 利用規約ページ
  termsTitle: string;
  termsIntro: string;
  termsSection1: string;
  termsSection1Desc: string;
  termsSection2: string;
  termsSection2List: string[];
  termsSection3: string;
  termsSection3List: string[];
  termsSection4: string;
  termsSection4Desc: string;
  termsSection5: string;
  termsSection5Desc: string;
  termsSection6: string;
  termsSection6Desc: string;
  termsSection7: string;
  termsSection7Desc: string;
  termsSection8: string;
  termsSection8Desc: string;
  termsEnacted: string;
  termsUpdated: string;
  termsOfService: string;

  // メインページ説明セクション
  homeAboutTitle: string;
  homeAboutDesc: string;
  homeFeature1: string;
  homeFeature1Desc: string;
  homeFeature2: string;
  homeFeature2Desc: string;
  homeFeature3: string;
  homeFeature3Desc: string;
  homeTargetUsers: string;
  homeTargetList: string[];

  // 404ページ
  notFoundTitle: string;
  notFoundMessage: string;
  notFoundBackHome: string;
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

    referenceSongs: 'この曲に合わせてみよう',
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

    // フッター
    footerDescription: 'ギタースケールを視覚的に学べる無料Webアプリです。13種類以上のスケールをギター指板上に表示し、音源から自動でキーを検出する機能も搭載。初心者からプロまで、あなたの音楽制作・練習をサポートします。',
    footerContents: 'コンテンツ',
    footerSupport: 'サポート',
    home: 'ホーム',
    aboutSite: 'このサイトについて',
    articles: 'コラム記事',
    contact: 'お問い合わせ',
    privacyPolicy: 'プライバシーポリシー',
    companyInfo: '運営者情報',
    copyright: '© {year} ギタースケールわかる君. All rights reserved.',

    // ナビゲーション
    backToHome: '← ホームに戻る',

    // Aboutページ
    aboutTitle: 'ギタースケールわかる君について',
    aboutServiceOverview: 'サービス概要',
    aboutServiceDesc1: '「ギタースケールわかる君」は、ギタリストの練習や作曲をサポートするために開発された無料のWebアプリケーションです。ギターの指板上にスケールを視覚的に表示することで、スケールの構造や運指パターンを直感的に理解できます。',
    aboutServiceDesc2: '初心者の方がスケールを覚える際の学習ツールとして、また経験者の方が新しいスケールを探求したり、作曲時にアイデアを得るためのリファレンスとしてご活用いただけます。',
    aboutMainFeatures: '主な機能',
    aboutFeatureVisualize: 'スケール可視化',
    aboutFeatureVisualizeDesc: '13種類以上のスケール（メジャー、マイナー、ペンタトニック、モード系、都節など）をギター指板上にわかりやすく表示します。ルート音は赤、その他のスケール構成音は緑で色分けされます。',
    aboutFeatureAnalysis: '音源自動解析',
    aboutFeatureAnalysisDesc: 'MP3、WAV、M4Aファイルをアップロードすると、AIが自動的に楽曲のキーとスケールを検出します。コピーしたい曲のスケールがわからない時に便利です。',
    aboutFeaturePlay: 'スケール再生',
    aboutFeaturePlayDesc: '選択したスケールの音を実際に聴くことができます。耳でスケールの響きを確認しながら、指板上の位置と音を結びつけて覚えられます。',
    aboutFeatureVideo: '参考動画',
    aboutFeatureVideoDesc: '各スケールとルート音に対応したYouTube動画を表示。実際の演奏例や詳しい解説動画で、より深くスケールを理解できます。',
    aboutFeatureTuning: 'チューニング対応',
    aboutFeatureTuningDesc: 'スタンダードチューニングだけでなく、ドロップD、7弦ギター、半音下げなど様々なチューニングに対応。あなたのギター設定に合わせて表示を切り替えられます。',
    aboutFeatureResponsive: 'レスポンシブ対応',
    aboutFeatureResponsiveDesc: 'PC、タブレット、スマートフォンのどれでも快適に使えます。モバイルでは指板を90度回転表示することも可能です。',
    aboutSupportedScales: '対応スケール一覧',
    aboutBasicScales: '基本スケール',
    aboutModeScales: 'モードスケール',
    aboutPentaOther: 'ペンタ・その他',
    scaleMajor: 'メジャー',
    scaleNaturalMinor: 'ナチュラルマイナー',
    scaleHarmonicMinor: 'ハーモニックマイナー',
    scaleMelodicMinor: 'メロディックマイナー',
    scaleDorian: 'ドリアン',
    scalePhrygian: 'フリジアン',
    scaleLydian: 'リディアン',
    scaleMixolydian: 'ミクソリディアン',
    scaleLocrian: 'ロクリアン',
    scaleMajorPentatonic: 'メジャーペンタトニック',
    scaleMinorPentatonic: 'マイナーペンタトニック',
    scaleBlues: 'ブルース',
    scaleInSen: '都節',
    aboutHowToUse: '使い方',
    aboutStep1: 'ルート音を選ぶ',
    aboutStep1Desc: 'C、D、E...などの12音から、スケールの基準となる音を選択します。',
    aboutStep2: 'スケールを選ぶ',
    aboutStep2Desc: 'メジャー、マイナー、ペンタトニックなど、覚えたいスケールを選択します。',
    aboutStep3: '指板で確認',
    aboutStep3Desc: '指板上に表示されたポジションを見ながら、実際にギターで弾いてみましょう。',
    aboutStep4: '音を聴いて覚える',
    aboutStep4Desc: '再生ボタンでスケールの音を聴き、耳でも覚えることで定着率がアップします。',
    aboutRecommendedFor: 'こんな方におすすめ',
    aboutRecommend1: 'ギター初心者で、スケールの基礎を覚えたい方',
    aboutRecommend2: 'アドリブ演奏に挑戦したいが、何を弾けばいいかわからない方',
    aboutRecommend3: 'コピーしたい曲のキーやスケールを知りたい方',
    aboutRecommend4: '作曲時にスケールのリファレンスが欲しい方',
    aboutRecommend5: 'ペンタトニック以外のスケールも習得したい中級者の方',
    aboutRecommend6: '日本音階（都節）やモードスケールなど、多様なスケールを探求したい方',
    aboutCta: 'さっそく使ってみる →',

    // コラム記事
    articlesTitle: 'コラム記事',
    articlesSubtitle: 'ギタースケールの基礎から応用まで、ギタリストに役立つ情報をお届けします',
    articleCategory: {
      beginner: '初心者向け',
      intermediate: '中級者向け',
      practice: '実践テクニック',
    },
    articleReadMore: '続きを読む →',
    articleTryScale: 'スケールを実際に試してみよう',
    articleTryScaleDesc: '記事で学んだスケールを、ギター指板上で視覚的に確認できます。',
    articleUseVisualizer: 'スケール可視化ツールを使う →',
    articleRelated: '関連記事',

    // ペンタトニック記事
    pentatonicTitle: 'ペンタトニックスケール入門 - ギター初心者が最初に覚えるべきスケール',
    pentatonicDesc: 'ペンタトニックスケールはギタリストにとって最も重要なスケールの一つ。なぜ最初に覚えるべきなのか、その理由と練習方法を解説します。',
    pentatonicWhat: 'ペンタトニックスケールとは？',
    pentatonicWhatDesc1: 'ペンタトニックスケール（Pentatonic Scale）は、名前の通り5つの音で構成されるスケールです。「ペンタ」はギリシャ語で「5」を意味し、通常の7音スケールから2音を省略したシンプルな構造が特徴です。',
    pentatonicWhatDesc2: 'このシンプルさこそが、ペンタトニックスケールが初心者におすすめされる理由です。音の数が少ないため覚えやすく、しかも「外れにくい」という大きなメリットがあります。',
    pentatonicTypes: '2種類のペンタトニックスケール',
    pentatonicMajor: 'メジャーペンタトニック',
    pentatonicMajorDesc: 'メジャーペンタトニックは、メジャースケールから4度と7度を省略したスケールです。明るく開放的なサウンドが特徴で、カントリーやポップスでよく使われます。',
    pentatonicMinor: 'マイナーペンタトニック',
    pentatonicMinorDesc: 'マイナーペンタトニックは、ナチュラルマイナースケールから2度と6度を省略したスケールです。ロック、ブルース、メタルなど幅広いジャンルで使用される、最も汎用性の高いスケールと言えます。',
    pentatonicWhy: 'なぜペンタトニックが初心者におすすめなのか',
    pentatonicWhy1: '1. 覚えやすい',
    pentatonicWhy1Desc: '5音しかないため、指板上のポジションパターンがシンプルです。多くのギタリストは「ボックスポジション」と呼ばれる5つの基本パターンを覚えることで、指板全体でペンタトニックを弾けるようになります。',
    pentatonicWhy2: '2. 外れにくい',
    pentatonicWhy2Desc: 'ペンタトニックで省略されている4度と7度は、コードトーンとぶつかりやすい「アボイドノート」になりがちな音です。これらを省略することで、どの音を弾いても比較的安全にサウンドし、初心者でもアドリブに挑戦しやすくなります。',
    pentatonicWhy3: '3. 汎用性が高い',
    pentatonicWhy3Desc: 'ロック、ブルース、ポップス、ファンク、メタルなど、ほぼすべてのポピュラー音楽で活用できます。一度マスターすれば、様々なジャンルの楽曲で応用が利きます。',
    pentatonicPractice: '練習のポイント',
    pentatonicPracticeList: [
      'まずは1つのポジション（第1ポジションがおすすめ）を完璧に覚える',
      'メトロノームを使って、ゆっくり正確に弾く練習をする',
      'バッキングトラックに合わせてアドリブを試す',
      '好きなギタリストのフレーズをコピーして、使い方を学ぶ',
      '慣れてきたら、5つのポジションすべてを繋げる練習をする',
    ],
    pentatonicSummary: 'まとめ',
    pentatonicSummaryDesc: 'ペンタトニックスケールは、シンプルながら非常にパワフルなツールです。多くのプロギタリストも、ペンタトニックを基盤としてフレーズを構築しています。まずはこのスケールをしっかりマスターし、そこから徐々に他のスケールへと知識を広げていきましょう。',
    pentatonicCta: 'ペンタトニックスケールを指板で確認してみよう',
    pentatonicViewMajor: 'Aメジャーペンタを見る',
    pentatonicViewMinor: 'Aマイナーペンタを見る',

    // モードスケール記事
    modeTitle: 'モードスケール完全ガイド - ドリアン、フリジアン、リディアンの使い分け',
    modeDesc: '7つのモードスケールの特徴と、実際の楽曲での使い方を詳しく解説。中級者から上級者へのステップアップに。',
    modeWhat: 'モードスケールとは？',
    modeWhatDesc1: 'モードスケール（チャーチモード）は、メジャースケールの各音を起点として生成される7つのスケールの総称です。古代ギリシャの音楽理論に起源を持ち、現代のジャズやロック、フュージョンで広く使用されています。',
    modeWhatDesc2: '各モードは固有の「カラー」や「ムード」を持っており、これを使い分けることで、より豊かな音楽表現が可能になります。',
    mode7Modes: '7つのモードスケール',
    modeIonian: '1. イオニアン（Ionian）',
    modeIonianDesc: 'これは私たちがよく知る「メジャースケール」そのものです。明るく安定したサウンドが特徴。',
    modeDorian: '2. ドリアン（Dorian）',
    modeDorianDesc: 'マイナースケールに近いですが、6度がナチュラル（長6度）なのが特徴。マイナーでありながらも、どこか明るさを感じさせるサウンドです。ジャズ、ファンク、ソウルでよく使用されます。',
    modeDorianExample: '使用例: Santana「Oye Como Va」、Miles Davis「So What」',
    modePhrygian: '3. フリジアン（Phrygian）',
    modePhrygianDesc: '♭2度が最大の特徴で、スペイン風・アラビア風のエキゾチックなサウンドを生み出します。メタル、フラメンコ、プログレッシブロックで効果的に使用されます。',
    modePhrygianExample: '使用例: Metallica「Wherever I May Roam」',
    modeLydian: '4. リディアン（Lydian）',
    modeLydianDesc: 'メジャースケールの4度が半音上がった（#4）スケール。浮遊感のある、夢見るようなサウンドが特徴です。映画音楽やプログレッシブロック、フュージョンで多用されます。',
    modeLydianExample: '使用例: Steve Vai「For The Love of God」、Joe Satriani作品',
    modeMixolydian: '5. ミクソリディアン（Mixolydian）',
    modeMixolydianDesc: 'メジャースケールの7度が半音下がった（♭7）スケール。ブルージーでロックなサウンドが特徴で、ドミナント7thコード上で使用されます。ロック、ブルース、カントリーの定番スケールです。',
    modeMixolydianExample: '使用例: The Beatles「Norwegian Wood」、Guns N\' Roses「Sweet Child O\' Mine」',
    modeAeolian: '6. エオリアン（Aeolian）',
    modeAeolianDesc: '「ナチュラルマイナースケール」として知られるスケールです。悲しげで暗いサウンドが特徴で、あらゆるジャンルのマイナーキーの楽曲で使用されます。',
    modeLocrian: '7. ロクリアン（Locrian）',
    modeLocrianDesc: '最も不安定なモードで、♭5度（減5度）が特徴。緊張感のある、不協和なサウンドを生み出します。プログレッシブメタルやジャズの特定の場面で使用されます。',
    modeHowToRemember: 'モードスケールの覚え方',
    modeHowToRememberDesc: 'モードを理解する最も簡単な方法は、「メジャースケールの各音から始める」と考えることです。',
    modePracticalTips: '実践的な使い方のコツ',
    modePracticalTipsList: [
      '各モードの「特性音」（他のモードと区別する音）を意識して弾く',
      'コード進行に合わせて適切なモードを選ぶ',
      '1つのモードを徹底的にマスターしてから次へ進む',
      'バッキングトラックを使って、各モードの響きを耳で覚える',
      '好きなギタリストの演奏を分析し、モードの使い方を学ぶ',
    ],
    modeSummary: 'まとめ',
    modeSummaryDesc: 'モードスケールをマスターすることで、あなたの音楽表現は格段に広がります。最初は難しく感じるかもしれませんが、一つずつ着実に覚えていくことで、様々な音楽シーンに対応できるギタリストになれるでしょう。',
    modeCta: 'モードスケールを指板で確認してみよう',

    // ブルーススケール記事
    bluesTitle: 'ブルーススケールでソウルフルなフレーズを弾こう',
    bluesDesc: 'ブルーススケールの構造と、ブルーノートの使い方をマスター。エモーショナルなギターソロを弾くためのテクニック。',
    bluesWhat: 'ブルーススケールとは？',
    bluesWhatDesc1: 'ブルーススケールは、マイナーペンタトニックスケールに「ブルーノート」と呼ばれる♭5度の音を加えた6音スケールです。この1音が加わることで、独特の「泣き」や「うねり」のあるサウンドが生まれます。',
    bluesWhatDesc2: 'ブルースはもちろん、ロック、ジャズ、ファンクなど幅広いジャンルで使用される、非常に表現力豊かなスケールです。',
    bluesStructure: 'ブルーススケールの構造',
    bluesExample: 'Aブルーススケール',
    bluesDegrees: '音程',
    bluesStructureDesc: 'マイナーペンタトニック（1-♭3-4-5-♭7）に♭5度を追加することで、ブルーススケールが完成します。この♭5度が「ブルーノート」であり、独特の緊張感と哀愁を生み出す重要な音です。',
    bluesNote: 'ブルーノートの魔力',
    bluesNoteMagic: 'ブルーノート（♭5度）は、単に弾くだけでなく、様々なテクニックと組み合わせることで真価を発揮します：',
    bluesBending: '1. チョーキング（ベンド）',
    bluesBendingDesc: '♭5度から5度へのクォーターベンド（1/4音上げ）や、4度から♭5度へのベンドは、ブルースギターの定番テクニックです。この「中途半端な」音程が、人間の声のような表現を生み出します。',
    bluesHammerPull: '2. ハンマリング・プリング',
    bluesHammerPullDesc: '4度 → ♭5度 → 5度の流れをハンマリングオン・プリングオフで繋げると、滑らかで表情豊かなフレーズになります。BBキングやエリック・クラプトンの定番フレーズです。',
    bluesSlide: '3. スライド',
    bluesSlideDesc: 'ブルーノートへスライドで入ったり、ブルーノートからスライドで抜けることで、より「歌っている」ようなニュアンスを出せます。',
    bluesPatterns: '定番フレーズパターン',
    bluesPattern1: 'パターン1: クラシックターンアラウンド',
    bluesPattern1Desc: 'ブルース進行の最後2小節でよく使われるフレーズ。',
    bluesPattern2: 'パターン2: BBキング風ボックス',
    bluesPattern2Desc: '1〜2弦のハイポジションで弾く、歌うようなフレーズ。',
    bluesPattern3: 'パターン3: ロック定番リック',
    bluesPattern3Desc: 'ロックギターでよく使われる力強いフレーズ。',
    bluesMajorApplication: 'メジャーブルースへの応用',
    bluesMajorApplicationDesc1: 'ブルーススケールはマイナー系ですが、メジャーキーのブルース進行でも使えます。これは「メジャーコード上でマイナースケールを弾く」という、ブルース特有の響きを生み出します。',
    bluesMajorApplicationDesc2: 'さらに上級者は、マイナーペンタとメジャーペンタ、そしてブルーススケールを自在に行き来することで、より複雑で表現力豊かなソロを構築します。',
    bluesPractice: '練習のポイント',
    bluesPracticeList: [
      'まずはマイナーペンタトニックを完璧に覚える',
      'ブルーノートの位置を各ポジションで把握する',
      'ブルーノートは「経過音」として使うのが基本（長く伸ばさない）',
      '有名なブルースギタリストのフレーズをコピーして、使い方を学ぶ',
      '12小節ブルースのバッキングトラックに合わせて練習する',
      'チョーキング、ビブラートの表現力を磨く',
    ],
    bluesGuitarists: 'おすすめの参考ギタリスト',
    bluesGuitarist1: 'ブルースギターの王様。ビブラートとチョーキングの教科書的存在。',
    bluesGuitarist2: 'テキサスブルースの雄。力強いトーンと情熱的なプレイ。',
    bluesGuitarist3: 'ブルースロックの巨匠。クリアで歌うようなフレージング。',
    bluesGuitarist4: 'アイリッシュブルースの魂。感情を揺さぶる泣きのギター。',
    bluesSummary: 'まとめ',
    bluesSummaryDesc: 'ブルーススケールは、たった1音の追加で驚くほど表現の幅が広がるスケールです。ペンタトニックをマスターしたら、ぜひブルーススケールに挑戦してください。このスケールを使いこなせるようになれば、あなたのギターソロは確実にワンランク上のものになるでしょう。',
    bluesCta: 'ブルーススケールを指板で確認してみよう',
    bluesViewA: 'Aブルーススケールを見る',
    bluesViewE: 'Eブルーススケールを見る',

    // ハーモニックマイナー記事
    harmonicTitle: 'ハーモニックマイナースケールの魅力と使い方',
    harmonicDesc: 'クラシックからメタルまで幅広く使われるハーモニックマイナースケール。独特の響きと実践的な使い方を解説します。',
    harmonicWhat: 'ハーモニックマイナースケールとは？',
    harmonicWhatDesc1: 'ハーモニックマイナースケールは、ナチュラルマイナースケールの第7音を半音上げたスケールです。これにより、マイナーキーでも強い解決感を持つドミナントコード（V7）を形成できるようになります。',
    harmonicWhatDesc2: 'このスケールの最大の特徴は、第6音と第7音の間に増2度（1音半）の音程差があることです。この独特の音程がエキゾチックな響きを生み出し、中東音楽やクラシック音楽、さらにはネオクラシカルメタルなど、様々なジャンルで愛用されています。',
    harmonicStructure: 'スケールの構成',
    harmonicStructureDesc: '全音・半音・全音・全音・半音・増2度・半音という音程パターンで構成されます。',
    harmonicCharacteristic: '特徴的な響き',
    harmonicCharacteristicDesc: '第6音と第7音の間の増2度音程が、このスケール独特のエキゾチックでドラマチックな響きを生み出します。この響きはクラシック音楽の短調の楽曲で頻繁に聴くことができます。',
    harmonicUsage: '実践的な使い方',
    harmonicUsage1: 'V7コード上での使用',
    harmonicUsage1Desc: 'マイナーキーのドミナントセブンスコード（例：AmキーのE7）上で使用することで、スムーズにトニックへ解決できます。',
    harmonicUsage2: 'ネオクラシカルフレーズ',
    harmonicUsage2Desc: 'イングヴェイ・マルムスティーンに代表されるネオクラシカルメタルでは、このスケールを使った高速アルペジオやシーケンスフレーズが定番です。',
    harmonicUsage3: 'エキゾチックなメロディ',
    harmonicUsage3Desc: '中東風やスパニッシュ風のメロディを作る際にも効果的です。フラメンコギターでもよく使用されます。',
    harmonicComparison: 'ナチュラルマイナーとの比較',
    harmonicComparisonDesc: 'ナチュラルマイナーは落ち着いた悲しみを表現するのに対し、ハーモニックマイナーはよりドラマチックで緊張感のある響きを持ちます。両方を使い分けることで、表現の幅が大きく広がります。',
    harmonicPractice: '効果的な練習方法',
    harmonicPracticeList: [
      '3ノートパーストリング（1弦あたり3音）のパターンで指板全体をカバー',
      'ドミナントセブンスコード（V7）上で意識的に弾く練習',
      '増2度の音程を含むフレーズを繰り返し練習',
      'クラシック音楽やネオクラシカルメタルのフレーズをコピー',
    ],
    harmonicSummary: 'まとめ',
    harmonicSummaryDesc: 'ハーモニックマイナースケールは、マイナーキーの楽曲に強い解決感とドラマチックな響きをもたらします。クラシック、フラメンコ、メタルなど様々なジャンルで活用できる、非常に汎用性の高いスケールです。',
    harmonicCta: 'ハーモニックマイナーを指板で確認',
    harmonicViewA: 'Aハーモニックマイナーを見る',
    harmonicViewE: 'Eハーモニックマイナーを見る',

    // スケール練習法記事
    practiceTitle: 'ギター初心者のためのスケール練習法【効率的な覚え方】',
    practiceDesc: 'スケールを効率的に覚えるための練習方法を初心者向けに解説。挫折しないコツと段階的な練習ステップを紹介します。',
    practiceIntro: 'なぜスケール練習が重要なのか',
    practiceIntroDesc: 'スケールはギター演奏の基礎であり、アドリブ、作曲、耳コピなど、あらゆる音楽活動の土台となります。しかし、やみくもに練習しても効率は上がりません。正しい方法で段階的に取り組むことが上達の近道です。',
    practiceStep1: 'ステップ1：まずはペンタトニックから',
    practiceStep1Desc: 'いきなり7音スケールを覚えようとせず、まずは5音で構成されるペンタトニックスケールから始めましょう。覚えやすく、実際の楽曲でもよく使われます。',
    practiceStep1List: [
      'Aマイナーペンタトニックの第1ポジションを覚える',
      'メトロノームに合わせて上昇・下降を繰り返す',
      '最初はBPM60から始め、徐々にテンポを上げる',
      '指が滑らかに動くまで、毎日15分は練習する',
    ],
    practiceStep2: 'ステップ2：ポジションを増やす',
    practiceStep2Desc: '1つのポジションが弾けるようになったら、次のポジションに挑戦します。最終的には指板全体でスケールを弾けることを目指します。',
    practiceStep2List: [
      '5つのペンタトニックポジションを順番に覚える',
      'ポジション間をスムーズに移動する練習',
      '同じフレーズを異なるポジションで弾いてみる',
      '視覚的に指板上のスケールパターンを把握する',
    ],
    practiceStep3: 'ステップ3：7音スケールへ拡張',
    practiceStep3Desc: 'ペンタトニックに慣れたら、メジャースケールやナチュラルマイナースケールなどの7音スケールに挑戦します。',
    practiceStep3List: [
      'まずはCメジャースケールから始める',
      'ペンタトニックとの違いを意識しながら練習',
      '3ノートパーストリングのパターンを使う',
      'スケールの度数（1,2,3,4,5,6,7）を歌いながら弾く',
    ],
    practiceStep4: 'ステップ4：実際の曲で使う',
    practiceStep4Desc: 'スケールを覚えるだけでなく、実際の楽曲やバッキングトラックに合わせて使う練習が重要です。',
    practiceStep4List: [
      'YouTubeのバッキングトラックに合わせてアドリブ',
      'お気に入りの曲のソロをコピー',
      'スケールの音を使って簡単なメロディを作る',
      '異なるキーで同じフレーズを弾く移調練習',
    ],
    practiceTips: '挫折しないためのコツ',
    practiceTipsList: [
      '毎日少しずつ（15-30分）続けることが大切',
      '一度に多くを覚えようとしない',
      'メトロノームを使って正確なリズムを身につける',
      '録音して自分の演奏を客観的に聴く',
      '好きな曲やジャンルに関連するスケールから始める',
    ],
    practiceSummary: 'まとめ',
    practiceSummaryDesc: 'スケール練習は地道ですが、確実に上達につながります。焦らず段階的に取り組み、実際の音楽で使うことを意識しながら練習しましょう。このサイトのスケール可視化機能を活用して、効率的に練習を進めてください。',
    practiceCta: 'スケール可視化ツールを使う',

    // プライバシーポリシー
    privacyTitle: 'プライバシーポリシー',
    privacyIntro: 'ギタースケールわかる君（以下、「当サイト」といいます）は、ユーザーの個人情報の取り扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます）を定めます。',
    privacySection1: '1. 収集する情報',
    privacySection1List: [
      'お問い合わせフォームにご入力いただいた情報（お名前、メールアドレス、お問い合わせ内容）',
      '音源解析機能でアップロードされた音声ファイル（解析後に自動削除されます）',
      'アクセスログ情報（IPアドレス、ブラウザの種類、アクセス日時など）',
      'Cookie情報',
    ],
    privacySection2: '2. 情報の利用目的',
    privacySection2List: [
      'お問い合わせへの回答',
      'サービスの提供・運営',
      'サービスの改善・新機能の開発',
      '利用状況の分析',
      '不正利用の防止',
    ],
    privacySection3: '3. 個人情報の第三者提供',
    privacySection3Desc: '当サイトは、以下の場合を除き、ユーザーの個人情報を第三者に提供することはありません：',
    privacySection3List: [
      'ユーザーの同意がある場合',
      '法令に基づく場合',
      '人の生命、身体または財産の保護のために必要がある場合',
    ],
    privacySection4: '4. Cookieの使用について',
    privacySection4Desc: '当サイトでは、ユーザー体験の向上やアクセス解析のためにCookieを使用しています。ブラウザの設定により、Cookieの受け入れを拒否することができますが、その場合、一部の機能が利用できなくなる可能性があります。',
    privacySection5: '5. アクセス解析ツール',
    privacySection5Desc: '当サイトでは、アクセス解析のためにGoogle Analyticsを使用する場合があります。Google Analyticsは、Cookieを使用してユーザーの当サイトの利用状況を収集します。この情報は匿名で収集されており、個人を特定するものではありません。',
    privacySection6: '6. 広告について',
    privacySection6Desc1: '当サイトでは、第三者配信の広告サービス（Google AdSense）を利用しています。広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookieを使用することがあります。',
    privacySection6Desc2: 'Google AdSenseの詳細については、Google広告に関するポリシーをご確認ください。',
    privacySection6Desc3: 'ユーザーは、Googleの広告設定ページで、パーソナライズ広告を無効にすることができます。',
    privacySection7: '7. アップロードファイルについて',
    privacySection7Desc: '音源解析機能でアップロードされた音声ファイルは、解析処理のためにサーバーに一時的に保存されますが、解析完了後に自動的に削除されます。アップロードされたファイルを第三者と共有したり、解析以外の目的で使用することはありません。',
    privacySection8: '8. セキュリティ',
    privacySection8Desc: '当サイトは、個人情報の漏洩、滅失、毀損の防止その他の個人情報の安全管理のために、必要かつ適切なセキュリティ対策を講じます。',
    privacySection9: '9. 免責事項',
    privacySection9Desc1: '当サイトに掲載されている情報の正確性には万全を期していますが、利用者が当サイトの情報を用いて行う一切の行為について、当サイトは一切の責任を負いません。',
    privacySection9Desc2: '当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。',
    privacySection10: '10. 著作権について',
    privacySection10Desc: '当サイトに掲載されているコンテンツ（文章、画像、プログラム等）の著作権は、当サイトまたは正当な権利を有する第三者に帰属しています。無断での複製、転載、改変等は禁止されています。',
    privacySection11: '11. プライバシーポリシーの変更',
    privacySection11Desc: '当サイトは、必要に応じて本ポリシーを変更することがあります。変更後のプライバシーポリシーは、当サイトに掲載したときから効力を生じるものとします。',
    privacySection12: '12. お問い合わせ',
    privacySection12Desc: '本ポリシーに関するお問い合わせは、お問い合わせフォームよりご連絡ください。',
    privacyEnacted: '制定日: 2025年1月1日',
    privacyUpdated: '最終更新日: 2025年1月15日',

    // 運営者情報
    companyTitle: '運営者情報',
    companySection1: '運営会社',
    companyName: '会社名',
    companyNameEn: '英文社名',
    companyOfficialSite: '公式サイト',
    companySection2: '事業内容',
    companyBusinessDesc: '株式会社モテコロは「全ての人のQOML（クオリティ・オブ・ミュージック・ライフ）の向上」をミッションに掲げ、音楽を通じた様々なサービスを提供しています。',
    companyBusinessList: [
      '地域・学校・企業向け講演・ワークショップ',
      '音楽活動コンシェルジュサービス',
      'エンターテインメントコンテンツの企画・運営',
      'JAMセッション・音楽コラボレーションイベント',
      '音楽関連Webサービスの開発・運営',
    ],
    companySection3: '本サービスについて',
    companyServiceDesc1: '「ギタースケールわかる君」は、ギタリストの練習や作曲をサポートするために株式会社モテコロが開発・運営する無料Webアプリケーションです。',
    companyServiceDesc2: 'ギターの指板上にスケールを視覚的に表示する機能に加え、音源から自動的にキーとスケールを検出するAI解析機能を搭載しています。初心者からプロまで、すべてのギタリストの音楽ライフをサポートします。',
    companySection4: 'お問い合わせ',
    companyContactDesc: '本サービスに関するお問い合わせは、以下よりお願いいたします。',
    companyContactForm: 'お問い合わせフォーム',
    companyOfficialSiteBtn: '会社公式サイト',

    // お問い合わせ
    contactTitle: 'お問い合わせ',
    contactDesc: 'ギタースケールわかる君に関するご質問、ご要望、不具合報告などがございましたら、以下のフォームよりお気軽にお問い合わせください。',
    contactNotes: 'お問い合わせにあたって',
    contactNote1: '通常、3営業日以内にご返信いたします。',
    contactNote2: 'お問い合わせ内容によっては、回答にお時間をいただく場合があります。',
    contactNote3: '営業目的のお問い合わせには回答いたしかねます。',

    // 利用規約ページ
    termsTitle: '利用規約',
    termsIntro: '本利用規約（以下「本規約」）は、株式会社モテコロ（以下「当社」）が提供する「ギタースケールわかる君」（以下「本サービス」）の利用条件を定めるものです。本サービスをご利用になる前に、本規約をよくお読みください。',
    termsSection1: '第1条（適用範囲）',
    termsSection1Desc: '本規約は、本サービスの利用に関する当社とユーザーとの間の権利義務関係を定めることを目的とし、ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されます。',
    termsSection2: '第2条（サービス内容）',
    termsSection2List: [
      'ギタースケールの可視化表示機能',
      '音源ファイルからのスケール自動解析機能',
      'スケールの再生機能',
      'スケールに関する教育コンテンツの提供',
      'その他当社が提供する関連サービス',
    ],
    termsSection3: '第3条（禁止事項）',
    termsSection3List: [
      '法令または公序良俗に違反する行為',
      '当社または第三者の知的財産権、プライバシー、名誉、その他の権利を侵害する行為',
      '本サービスの運営を妨害する行為',
      '他のユーザーに迷惑をかける行為',
      '本サービスを商用目的で利用する行為（当社の事前許可がある場合を除く）',
      '本サービスのリバースエンジニアリング、逆コンパイル、逆アセンブル',
      '自動化ツールを使用したアクセス',
      'その他当社が不適切と判断する行為',
    ],
    termsSection4: '第4条（知的財産権）',
    termsSection4Desc: '本サービスに関する一切の知的財産権は当社または正当な権利者に帰属します。本規約に基づく本サービスの利用許諾は、本サービスに関する当社または正当な権利者の知的財産権の使用許諾を意味するものではありません。',
    termsSection5: '第5条（免責事項）',
    termsSection5Desc: '当社は、本サービスがユーザーの特定の目的に適合すること、期待する機能・正確性・有用性を有すること、ユーザーによる本サービスの利用がユーザーに適用のある法令等に適合すること、継続的に利用できること、および不具合が生じないことについて、明示または黙示を問わず何ら保証するものではありません。当社は、本サービスに起因してユーザーに生じたあらゆる損害について一切の責任を負いません。',
    termsSection6: '第6条（サービスの変更・停止）',
    termsSection6Desc: '当社は、ユーザーに事前に通知することなく、本サービスの内容を変更し、または本サービスの提供を停止もしくは中止することができるものとします。',
    termsSection7: '第7条（利用規約の変更）',
    termsSection7Desc: '当社は、必要と判断した場合には、ユーザーに事前に通知することなくいつでも本規約を変更することができます。変更後の利用規約は、本サービス上に掲載した時点から効力を生じるものとします。',
    termsSection8: '第8条（準拠法・管轄裁判所）',
    termsSection8Desc: '本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して紛争が生じた場合には、東京地方裁判所を第一審の専属的合意管轄裁判所とします。',
    termsEnacted: '制定日：2025年1月15日',
    termsUpdated: '最終更新日：2025年1月25日',
    termsOfService: '利用規約',

    // メインページ説明セクション
    homeAboutTitle: 'ギタースケールわかる君とは？',
    homeAboutDesc: 'ギタースケールを視覚的に学べる無料のWebアプリケーションです。13種類以上のスケールをギター指板上に表示し、理論と実践を結びつけます。',
    homeFeature1: 'スケールの可視化',
    homeFeature1Desc: 'メジャー、マイナー、ペンタトニック、モードスケールなど、ギタリストに必要な主要スケールを指板上に表示。ルート音と構成音が一目でわかります。',
    homeFeature2: '音源解析',
    homeFeature2Desc: '音源ファイルをアップロードするだけで、AIが自動的に楽曲のキーとスケールを検出。コピーしたい曲のスケールを素早く把握できます。',
    homeFeature3: 'スケール再生',
    homeFeature3Desc: '選択したスケールの音を実際に聴くことができます。目と耳の両方でスケールを覚え、効率的な練習が可能です。',
    homeTargetUsers: 'こんな方におすすめ',
    homeTargetList: [
      'スケールの覚え方がわからない初心者の方',
      'アドリブやソロを練習したいギタリスト',
      '楽曲のキーやスケールを知りたい作曲者・アレンジャー',
      '音楽理論をより深く理解したい方',
    ],

    // 404ページ
    notFoundTitle: 'ページが見つかりません',
    notFoundMessage: 'お探しのページは存在しないか、移動した可能性があります。',
    notFoundBackHome: 'ホームに戻る',
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

    // Footer
    footerDescription: 'A free web app to visually learn guitar scales. Display 13+ scales on the guitar fretboard, with AI-powered key detection from audio files. Supporting your music creation and practice, from beginners to pros.',
    footerContents: 'Contents',
    footerSupport: 'Support',
    home: 'Home',
    aboutSite: 'About This Site',
    articles: 'Articles',
    contact: 'Contact',
    privacyPolicy: 'Privacy Policy',
    companyInfo: 'Company Info',
    copyright: '© {year} Guitar Scale Master. All rights reserved.',

    // Navigation
    backToHome: '← Back to Home',

    // About Page
    aboutTitle: 'About Guitar Scale Master',
    aboutServiceOverview: 'Service Overview',
    aboutServiceDesc1: 'Guitar Scale Master is a free web application designed to support guitarists in their practice and songwriting. By visually displaying scales on the guitar fretboard, you can intuitively understand scale structures and fingering patterns.',
    aboutServiceDesc2: 'It serves as a learning tool for beginners memorizing scales, and as a reference for experienced players exploring new scales or seeking ideas during composition.',
    aboutMainFeatures: 'Main Features',
    aboutFeatureVisualize: 'Scale Visualization',
    aboutFeatureVisualizeDesc: 'Display 13+ scales (Major, Minor, Pentatonic, Modes, Miyako-bushi, etc.) clearly on the guitar fretboard. Root notes are shown in red, other scale notes in green.',
    aboutFeatureAnalysis: 'Audio Auto-Analysis',
    aboutFeatureAnalysisDesc: 'Upload MP3, WAV, or M4A files and AI will automatically detect the key and scale. Perfect when you want to learn a song but don\'t know the scale.',
    aboutFeaturePlay: 'Scale Playback',
    aboutFeaturePlayDesc: 'Listen to the selected scale\'s notes. Connect the sounds with fretboard positions while training your ear.',
    aboutFeatureVideo: 'Reference Videos',
    aboutFeatureVideoDesc: 'YouTube videos for each scale and root note. Deepen your understanding with performance examples and tutorials.',
    aboutFeatureTuning: 'Tuning Support',
    aboutFeatureTuningDesc: 'Supports various tunings including standard, Drop D, 7-string guitar, half-step down. Switch displays to match your guitar setup.',
    aboutFeatureResponsive: 'Responsive Design',
    aboutFeatureResponsiveDesc: 'Works comfortably on PC, tablet, and smartphone. On mobile, the fretboard can be rotated 90 degrees.',
    aboutSupportedScales: 'Supported Scales',
    aboutBasicScales: 'Basic Scales',
    aboutModeScales: 'Mode Scales',
    aboutPentaOther: 'Pentatonic & Others',
    scaleMajor: 'Major',
    scaleNaturalMinor: 'Natural Minor',
    scaleHarmonicMinor: 'Harmonic Minor',
    scaleMelodicMinor: 'Melodic Minor',
    scaleDorian: 'Dorian',
    scalePhrygian: 'Phrygian',
    scaleLydian: 'Lydian',
    scaleMixolydian: 'Mixolydian',
    scaleLocrian: 'Locrian',
    scaleMajorPentatonic: 'Major Pentatonic',
    scaleMinorPentatonic: 'Minor Pentatonic',
    scaleBlues: 'Blues',
    scaleInSen: 'In Sen',
    aboutHowToUse: 'How to Use',
    aboutStep1: 'Choose Root Note',
    aboutStep1Desc: 'Select the base note from 12 notes: C, D, E, etc.',
    aboutStep2: 'Choose Scale',
    aboutStep2Desc: 'Select the scale you want to learn: Major, Minor, Pentatonic, etc.',
    aboutStep3: 'Check the Fretboard',
    aboutStep3Desc: 'Look at the positions on the fretboard and try playing them on your guitar.',
    aboutStep4: 'Listen and Learn',
    aboutStep4Desc: 'Press the play button to hear the scale and improve retention through ear training.',
    aboutRecommendedFor: 'Recommended For',
    aboutRecommend1: 'Guitar beginners wanting to learn scale basics',
    aboutRecommend2: 'Those wanting to try improvisation but unsure what to play',
    aboutRecommend3: 'Those wanting to know the key and scale of songs to cover',
    aboutRecommend4: 'Those needing scale reference during composition',
    aboutRecommend5: 'Intermediate players wanting to learn scales beyond pentatonic',
    aboutRecommend6: 'Those wanting to explore diverse scales like Japanese scales or modes',
    aboutCta: 'Try It Now →',

    // Articles
    articlesTitle: 'Articles',
    articlesSubtitle: 'Useful information for guitarists, from basics to advanced techniques',
    articleCategory: {
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      practice: 'Practical Technique',
    },
    articleReadMore: 'Read More →',
    articleTryScale: 'Try the Scale',
    articleTryScaleDesc: 'Visually confirm the scales you learned in the article on the guitar fretboard.',
    articleUseVisualizer: 'Use Scale Visualizer →',
    articleRelated: 'Related Articles',

    // Pentatonic Article
    pentatonicTitle: 'Pentatonic Scale Guide - The First Scale Every Guitarist Should Learn',
    pentatonicDesc: 'The pentatonic scale is one of the most important scales for guitarists. Learn why it should be your first scale and how to practice it.',
    pentatonicWhat: 'What is the Pentatonic Scale?',
    pentatonicWhatDesc1: 'The Pentatonic Scale consists of 5 notes, as its name suggests. "Penta" means "five" in Greek. It\'s a simplified scale with 2 notes removed from the standard 7-note scale.',
    pentatonicWhatDesc2: 'This simplicity is exactly why the pentatonic scale is recommended for beginners. With fewer notes, it\'s easier to memorize, and it\'s hard to hit wrong notes.',
    pentatonicTypes: 'Two Types of Pentatonic Scales',
    pentatonicMajor: 'Major Pentatonic',
    pentatonicMajorDesc: 'The major pentatonic omits the 4th and 7th degrees from the major scale. It has a bright, open sound commonly used in country and pop music.',
    pentatonicMinor: 'Minor Pentatonic',
    pentatonicMinorDesc: 'The minor pentatonic omits the 2nd and 6th degrees from the natural minor scale. It\'s the most versatile scale, used across rock, blues, metal, and many other genres.',
    pentatonicWhy: 'Why Pentatonic is Perfect for Beginners',
    pentatonicWhy1: '1. Easy to Learn',
    pentatonicWhy1Desc: 'With only 5 notes, the fretboard patterns are simple. Most guitarists learn 5 "box positions" to play pentatonic across the entire fretboard.',
    pentatonicWhy2: '2. Hard to Sound Bad',
    pentatonicWhy2Desc: 'The 4th and 7th degrees omitted from pentatonic often clash with chord tones. By removing them, almost any note you play will sound good, making improvisation easier for beginners.',
    pentatonicWhy3: '3. Highly Versatile',
    pentatonicWhy3Desc: 'Works in rock, blues, pop, funk, metal, and nearly all popular music. Once mastered, it applies to songs across many genres.',
    pentatonicPractice: 'Practice Tips',
    pentatonicPracticeList: [
      'Start by perfecting one position (position 1 recommended)',
      'Practice slowly and accurately with a metronome',
      'Try improvising over backing tracks',
      'Copy phrases from your favorite guitarists to learn application',
      'Once comfortable, practice connecting all 5 positions',
    ],
    pentatonicSummary: 'Summary',
    pentatonicSummaryDesc: 'The pentatonic scale is a simple yet powerful tool. Many professional guitarists build their phrases on pentatonic foundations. Master this scale first, then gradually expand your knowledge to other scales.',
    pentatonicCta: 'Check Pentatonic Scale on Fretboard',
    pentatonicViewMajor: 'View A Major Pentatonic',
    pentatonicViewMinor: 'View A Minor Pentatonic',

    // Mode Scales Article
    modeTitle: 'Complete Mode Scale Guide - How to Use Dorian, Phrygian, and Lydian',
    modeDesc: 'Detailed explanation of the 7 mode scales and their use in actual songs. Level up from intermediate to advanced.',
    modeWhat: 'What are Mode Scales?',
    modeWhatDesc1: 'Mode scales (Church Modes) are 7 scales derived from starting on each note of the major scale. They originate from ancient Greek music theory and are widely used in modern jazz, rock, and fusion.',
    modeWhatDesc2: 'Each mode has its own unique "color" or "mood." Using them appropriately enables richer musical expression.',
    mode7Modes: 'The 7 Mode Scales',
    modeIonian: '1. Ionian',
    modeIonianDesc: 'This is the major scale we all know well. Characterized by a bright, stable sound.',
    modeDorian: '2. Dorian',
    modeDorianDesc: 'Similar to minor scale, but with a natural 6th (major 6th). Despite being minor, it has a somewhat bright quality. Commonly used in jazz, funk, and soul.',
    modeDorianExample: 'Examples: Santana "Oye Como Va", Miles Davis "So What"',
    modePhrygian: '3. Phrygian',
    modePhrygianDesc: 'The ♭2nd is its defining feature, creating an exotic Spanish or Arabic sound. Effectively used in metal, flamenco, and progressive rock.',
    modePhrygianExample: 'Example: Metallica "Wherever I May Roam"',
    modeLydian: '4. Lydian',
    modeLydianDesc: 'Major scale with raised 4th (#4). Has a floating, dreamy sound. Frequently used in film music, progressive rock, and fusion.',
    modeLydianExample: 'Examples: Steve Vai "For The Love of God", Joe Satriani works',
    modeMixolydian: '5. Mixolydian',
    modeMixolydianDesc: 'Major scale with lowered 7th (♭7). Has a bluesy, rock sound used over dominant 7th chords. A staple in rock, blues, and country.',
    modeMixolydianExample: 'Examples: The Beatles "Norwegian Wood", Guns N\' Roses "Sweet Child O\' Mine"',
    modeAeolian: '6. Aeolian',
    modeAeolianDesc: 'Known as the natural minor scale. Has a sad, dark sound used in minor key songs across all genres.',
    modeLocrian: '7. Locrian',
    modeLocrianDesc: 'The most unstable mode with a ♭5th (diminished 5th). Creates a tense, dissonant sound. Used in specific contexts in progressive metal and jazz.',
    modeHowToRemember: 'How to Remember Modes',
    modeHowToRememberDesc: 'The easiest way to understand modes is to think "start from each note of the major scale."',
    modePracticalTips: 'Practical Usage Tips',
    modePracticalTipsList: [
      'Focus on the "characteristic note" that distinguishes each mode',
      'Choose appropriate modes for chord progressions',
      'Master one mode thoroughly before moving to the next',
      'Use backing tracks to train your ear to recognize each mode\'s sound',
      'Analyze your favorite guitarists\' playing to learn mode applications',
    ],
    modeSummary: 'Summary',
    modeSummaryDesc: 'Mastering mode scales will greatly expand your musical expression. It may feel difficult at first, but by learning them one by one, you\'ll become a guitarist who can handle various musical situations.',
    modeCta: 'Check Mode Scales on Fretboard',

    // Blues Scale Article
    bluesTitle: 'Play Soulful Phrases with the Blues Scale',
    bluesDesc: 'Master the blues scale structure and blue note usage. Techniques for playing emotional guitar solos.',
    bluesWhat: 'What is the Blues Scale?',
    bluesWhatDesc1: 'The blues scale adds the "blue note" (♭5th) to the minor pentatonic, creating a 6-note scale. This single added note creates the distinctive "crying" or "wailing" sound.',
    bluesWhatDesc2: 'It\'s an extremely expressive scale used in blues, rock, jazz, funk, and many other genres.',
    bluesStructure: 'Blues Scale Structure',
    bluesExample: 'A Blues Scale',
    bluesDegrees: 'Degrees',
    bluesStructureDesc: 'By adding the ♭5th to the minor pentatonic (1-♭3-4-5-♭7), you create the blues scale. This ♭5th is the "blue note" - a crucial tone that creates unique tension and melancholy.',
    bluesNote: 'The Magic of the Blue Note',
    bluesNoteMagic: 'The blue note (♭5th) shows its true value when combined with various techniques:',
    bluesBending: '1. Bending',
    bluesBendingDesc: 'Quarter-bend from ♭5th to 5th, or bending from 4th to ♭5th, are classic blues guitar techniques. This "in-between" pitch creates vocal-like expression.',
    bluesHammerPull: '2. Hammer-on/Pull-off',
    bluesHammerPullDesc: 'Connecting 4th → ♭5th → 5th with hammer-ons and pull-offs creates smooth, expressive phrases. A signature move of B.B. King and Eric Clapton.',
    bluesSlide: '3. Slide',
    bluesSlideDesc: 'Sliding into or out of the blue note adds a "singing" quality to your playing.',
    bluesPatterns: 'Classic Phrase Patterns',
    bluesPattern1: 'Pattern 1: Classic Turnaround',
    bluesPattern1Desc: 'A phrase commonly used in the last 2 bars of a blues progression.',
    bluesPattern2: 'Pattern 2: B.B. King Box',
    bluesPattern2Desc: 'Singing phrases played in high positions on the 1st and 2nd strings.',
    bluesPattern3: 'Pattern 3: Classic Rock Lick',
    bluesPattern3Desc: 'A powerful phrase commonly used in rock guitar.',
    bluesMajorApplication: 'Application to Major Blues',
    bluesMajorApplicationDesc1: 'Though the blues scale is minor-based, it works over major key blues progressions. This "playing minor scale over major chords" creates the distinctive blues sound.',
    bluesMajorApplicationDesc2: 'Advanced players freely move between minor pentatonic, major pentatonic, and blues scale to construct more complex and expressive solos.',
    bluesPractice: 'Practice Tips',
    bluesPracticeList: [
      'First, master the minor pentatonic perfectly',
      'Learn the blue note location in each position',
      'Use the blue note as a "passing tone" (don\'t hold it long)',
      'Copy famous blues guitarists\' phrases to learn application',
      'Practice with 12-bar blues backing tracks',
      'Develop expressive bending and vibrato',
    ],
    bluesGuitarists: 'Recommended Guitarists to Study',
    bluesGuitarist1: 'The King of Blues guitar. A textbook for vibrato and bending.',
    bluesGuitarist2: 'The powerhouse of Texas blues. Powerful tone and passionate playing.',
    bluesGuitarist3: 'Blues rock master. Clear, singing phrasing.',
    bluesGuitarist4: 'The soul of Irish blues. Heart-stirring, crying guitar.',
    bluesSummary: 'Summary',
    bluesSummaryDesc: 'The blues scale dramatically expands your expression with just one added note. After mastering pentatonic, definitely try the blues scale. Once you can use this scale well, your guitar solos will definitely reach the next level.',
    bluesCta: 'Check Blues Scale on Fretboard',
    bluesViewA: 'View A Blues Scale',
    bluesViewE: 'View E Blues Scale',

    // Harmonic Minor Article
    harmonicTitle: 'The Appeal and Usage of Harmonic Minor Scale',
    harmonicDesc: 'The harmonic minor scale is used across genres from classical to metal. Learn about its distinctive sound and practical applications.',
    harmonicWhat: 'What is the Harmonic Minor Scale?',
    harmonicWhatDesc1: 'The harmonic minor scale is a natural minor scale with the 7th degree raised by a half step. This allows the formation of a dominant chord (V7) with strong resolution in minor keys.',
    harmonicWhatDesc2: 'The most distinctive feature of this scale is the augmented 2nd interval (1.5 steps) between the 6th and 7th degrees. This unique interval creates an exotic sound loved in Middle Eastern music, classical music, and even neoclassical metal.',
    harmonicStructure: 'Scale Structure',
    harmonicStructureDesc: 'The scale follows the pattern: whole-half-whole-whole-half-augmented 2nd-half.',
    harmonicCharacteristic: 'Characteristic Sound',
    harmonicCharacteristicDesc: 'The augmented 2nd interval between the 6th and 7th degrees creates the exotic and dramatic sound unique to this scale. This sound is frequently heard in classical music pieces in minor keys.',
    harmonicUsage: 'Practical Applications',
    harmonicUsage1: 'Over V7 Chords',
    harmonicUsage1Desc: 'Use over the dominant seventh chord in minor keys (e.g., E7 in the key of Am) for smooth resolution to the tonic.',
    harmonicUsage2: 'Neoclassical Phrases',
    harmonicUsage2Desc: 'In neoclassical metal, exemplified by Yngwie Malmsteen, high-speed arpeggios and sequence phrases using this scale are standard.',
    harmonicUsage3: 'Exotic Melodies',
    harmonicUsage3Desc: 'Effective for creating Middle Eastern or Spanish-flavored melodies. Also commonly used in flamenco guitar.',
    harmonicComparison: 'Comparison with Natural Minor',
    harmonicComparisonDesc: 'While natural minor expresses calm sadness, harmonic minor has a more dramatic and tense sound. Using both expands your expressive range significantly.',
    harmonicPractice: 'Effective Practice Methods',
    harmonicPracticeList: [
      'Practice 3-note-per-string patterns to cover the entire fretboard',
      'Consciously practice over dominant seventh (V7) chords',
      'Repeatedly practice phrases containing the augmented 2nd interval',
      'Copy phrases from classical music or neoclassical metal',
    ],
    harmonicSummary: 'Summary',
    harmonicSummaryDesc: 'The harmonic minor scale brings strong resolution and dramatic sound to minor key compositions. It is a highly versatile scale used across classical, flamenco, metal, and various other genres.',
    harmonicCta: 'View Harmonic Minor on Fretboard',
    harmonicViewA: 'View A Harmonic Minor',
    harmonicViewE: 'View E Harmonic Minor',

    // Scale Practice Article
    practiceTitle: 'Scale Practice Guide for Guitar Beginners [Efficient Learning Methods]',
    practiceDesc: 'Learn efficient practice methods for memorizing scales. Tips to avoid frustration and step-by-step practice guidance for beginners.',
    practiceIntro: 'Why Scale Practice is Important',
    practiceIntroDesc: 'Scales are the foundation of guitar playing, forming the basis for improvisation, composition, and transcription. However, random practice won\'t improve efficiency. Taking a structured, step-by-step approach is the fastest path to improvement.',
    practiceStep1: 'Step 1: Start with Pentatonic',
    practiceStep1Desc: 'Don\'t try to learn 7-note scales immediately. Start with the 5-note pentatonic scale. It\'s easier to learn and commonly used in real songs.',
    practiceStep1List: [
      'Learn the first position of A minor pentatonic',
      'Practice ascending and descending with a metronome',
      'Start at BPM 60 and gradually increase tempo',
      'Practice at least 15 minutes daily until fingers move smoothly',
    ],
    practiceStep2: 'Step 2: Add More Positions',
    practiceStep2Desc: 'Once you can play one position, challenge yourself with the next. The goal is to play scales across the entire fretboard.',
    practiceStep2List: [
      'Learn the 5 pentatonic positions in order',
      'Practice smooth transitions between positions',
      'Play the same phrase in different positions',
      'Visually understand scale patterns on the fretboard',
    ],
    practiceStep3: 'Step 3: Expand to 7-Note Scales',
    practiceStep3Desc: 'Once comfortable with pentatonic, challenge yourself with 7-note scales like major or natural minor scales.',
    practiceStep3List: [
      'Start with the C major scale',
      'Practice while noting differences from pentatonic',
      'Use 3-note-per-string patterns',
      'Sing the scale degrees (1,2,3,4,5,6,7) while playing',
    ],
    practiceStep4: 'Step 4: Apply to Real Music',
    practiceStep4Desc: 'It\'s important to practice using scales over actual songs and backing tracks, not just memorizing them.',
    practiceStep4List: [
      'Improvise over YouTube backing tracks',
      'Copy solos from your favorite songs',
      'Create simple melodies using scale notes',
      'Practice transposition by playing the same phrase in different keys',
    ],
    practiceTips: 'Tips to Avoid Frustration',
    practiceTipsList: [
      'Practice a little bit (15-30 minutes) every day',
      'Don\'t try to learn too much at once',
      'Use a metronome to develop accurate rhythm',
      'Record yourself and listen objectively',
      'Start with scales related to your favorite songs or genres',
    ],
    practiceSummary: 'Summary',
    practiceSummaryDesc: 'Scale practice is steady but definitely leads to improvement. Take it step by step without rushing, and practice with the intention of using scales in real music. Use this site\'s scale visualization feature to practice efficiently.',
    practiceCta: 'Use Scale Visualizer',

    // Privacy Policy
    privacyTitle: 'Privacy Policy',
    privacyIntro: 'Guitar Scale Master ("this site") establishes this Privacy Policy regarding the handling of users\' personal information.',
    privacySection1: '1. Information We Collect',
    privacySection1List: [
      'Information entered in the contact form (name, email address, inquiry content)',
      'Audio files uploaded for analysis (automatically deleted after analysis)',
      'Access log information (IP address, browser type, access date/time, etc.)',
      'Cookie information',
    ],
    privacySection2: '2. Purpose of Use',
    privacySection2List: [
      'Responding to inquiries',
      'Providing and operating the service',
      'Improving service and developing new features',
      'Usage analysis',
      'Preventing unauthorized use',
    ],
    privacySection3: '3. Third-Party Disclosure',
    privacySection3Desc: 'This site will not provide users\' personal information to third parties except in the following cases:',
    privacySection3List: [
      'With user consent',
      'When required by law',
      'When necessary to protect life, body, or property',
    ],
    privacySection4: '4. Use of Cookies',
    privacySection4Desc: 'This site uses cookies to improve user experience and for access analysis. You can refuse cookies through browser settings, but some features may become unavailable.',
    privacySection5: '5. Analytics Tools',
    privacySection5Desc: 'This site may use Google Analytics for access analysis. Google Analytics uses cookies to collect site usage data. This information is collected anonymously and does not identify individuals.',
    privacySection6: '6. Advertising',
    privacySection6Desc1: 'This site uses third-party advertising services (Google AdSense). Advertisers may use cookies to display ads based on user interests.',
    privacySection6Desc2: 'For details about Google AdSense, please refer to Google\'s advertising policies.',
    privacySection6Desc3: 'Users can disable personalized ads in Google\'s ad settings.',
    privacySection7: '7. Uploaded Files',
    privacySection7Desc: 'Audio files uploaded for analysis are temporarily stored on the server for processing but are automatically deleted after analysis. Uploaded files are not shared with third parties or used for purposes other than analysis.',
    privacySection8: '8. Security',
    privacySection8Desc: 'This site implements necessary and appropriate security measures to prevent leakage, loss, and damage of personal information.',
    privacySection9: '9. Disclaimer',
    privacySection9Desc1: 'While we strive for accuracy, this site assumes no responsibility for any actions taken based on the information provided.',
    privacySection9Desc2: 'This site assumes no responsibility for information or services provided by external sites accessed through links or banners.',
    privacySection10: '10. Copyright',
    privacySection10Desc: 'Copyright of content on this site (text, images, programs, etc.) belongs to this site or legitimate third-party rights holders. Unauthorized reproduction, reprinting, or modification is prohibited.',
    privacySection11: '11. Policy Changes',
    privacySection11Desc: 'This site may change this policy as necessary. Updated privacy policy takes effect when posted on this site.',
    privacySection12: '12. Contact',
    privacySection12Desc: 'For inquiries about this policy, please use the contact form.',
    privacyEnacted: 'Enacted: January 1, 2025',
    privacyUpdated: 'Last Updated: January 15, 2025',

    // Company Info
    companyTitle: 'Company Information',
    companySection1: 'Operating Company',
    companyName: 'Company Name',
    companyNameEn: 'English Name',
    companyOfficialSite: 'Official Site',
    companySection2: 'Business Description',
    companyBusinessDesc: 'Motechoro Co., Ltd. operates with the mission of "improving QOML (Quality of Music Life) for everyone," providing various services through music.',
    companyBusinessList: [
      'Lectures and workshops for communities, schools, and companies',
      'Music activity concierge services',
      'Entertainment content planning and management',
      'JAM sessions and music collaboration events',
      'Music-related web service development and operation',
    ],
    companySection3: 'About This Service',
    companyServiceDesc1: 'Guitar Scale Master is a free web application developed and operated by Motechoro Co., Ltd. to support guitarists in their practice and composition.',
    companyServiceDesc2: 'In addition to visually displaying scales on the guitar fretboard, it features AI analysis that automatically detects key and scale from audio. Supporting all guitarists\' music life, from beginners to professionals.',
    companySection4: 'Contact',
    companyContactDesc: 'For inquiries about this service, please use the following:',
    companyContactForm: 'Contact Form',
    companyOfficialSiteBtn: 'Company Official Site',

    // Contact
    contactTitle: 'Contact',
    contactDesc: 'For questions, requests, or bug reports about Guitar Scale Master, please feel free to contact us using the form below.',
    contactNotes: 'About Inquiries',
    contactNote1: 'We typically respond within 3 business days.',
    contactNote2: 'Depending on the content, responses may take additional time.',
    contactNote3: 'We cannot respond to business solicitations.',

    // 利用規約ページ
    termsTitle: 'Terms of Service',
    termsIntro: 'These Terms of Service (hereinafter "Terms") set forth the conditions of use for "Guitar Scale Master" (hereinafter "Service") provided by Motekoro Inc. (hereinafter "Company"). Please read these Terms carefully before using the Service.',
    termsSection1: 'Article 1 (Scope of Application)',
    termsSection1Desc: 'These Terms are intended to define the rights and obligations between the Company and users regarding the use of the Service, and apply to all relationships between users and the Company in connection with the use of the Service.',
    termsSection2: 'Article 2 (Service Description)',
    termsSection2List: [
      'Guitar scale visualization feature',
      'Automatic scale analysis from audio files',
      'Scale playback feature',
      'Educational content about scales',
      'Other related services provided by the Company',
    ],
    termsSection3: 'Article 3 (Prohibited Activities)',
    termsSection3List: [
      'Actions that violate laws or public order and morals',
      'Actions that infringe on the intellectual property rights, privacy, reputation, or other rights of the Company or third parties',
      'Actions that interfere with the operation of the Service',
      'Actions that cause inconvenience to other users',
      'Commercial use of the Service without prior permission from the Company',
      'Reverse engineering, decompiling, or disassembling of the Service',
      'Access using automated tools',
      'Other actions deemed inappropriate by the Company',
    ],
    termsSection4: 'Article 4 (Intellectual Property Rights)',
    termsSection4Desc: 'All intellectual property rights related to the Service belong to the Company or legitimate rights holders. The license to use the Service under these Terms does not imply permission to use the intellectual property of the Company or legitimate rights holders.',
    termsSection5: 'Article 5 (Disclaimer)',
    termsSection5Desc: 'The Company makes no warranties, express or implied, that the Service will meet users\' specific purposes, have the expected functionality, accuracy, or usefulness, comply with applicable laws, be continuously available, or be free from defects. The Company shall not be liable for any damages arising from the Service.',
    termsSection6: 'Article 6 (Service Changes and Suspension)',
    termsSection6Desc: 'The Company may change, suspend, or discontinue the Service without prior notice to users.',
    termsSection7: 'Article 7 (Changes to Terms of Service)',
    termsSection7Desc: 'The Company may change these Terms at any time without prior notice when deemed necessary. The revised Terms shall take effect upon posting on the Service.',
    termsSection8: 'Article 8 (Governing Law and Jurisdiction)',
    termsSection8Desc: 'These Terms shall be governed by and construed in accordance with the laws of Japan. Any disputes arising in connection with the Service shall be subject to the exclusive jurisdiction of the Tokyo District Court as the court of first instance.',
    termsEnacted: 'Enacted: January 15, 2025',
    termsUpdated: 'Last Updated: January 25, 2025',
    termsOfService: 'Terms of Service',

    // メインページ説明セクション
    homeAboutTitle: 'What is Guitar Scale Master?',
    homeAboutDesc: 'A free web application for visually learning guitar scales. Display 13+ types of scales on the guitar fretboard, connecting theory and practice.',
    homeFeature1: 'Scale Visualization',
    homeFeature1Desc: 'Display major, minor, pentatonic, mode scales, and other essential scales for guitarists on the fretboard. Root notes and scale tones are instantly recognizable.',
    homeFeature2: 'Audio Analysis',
    homeFeature2Desc: 'Just upload an audio file and AI will automatically detect the key and scale of the song. Quickly identify the scale of any song you want to cover.',
    homeFeature3: 'Scale Playback',
    homeFeature3Desc: 'Listen to the selected scale in real-time. Learn scales with both eyes and ears for more efficient practice.',
    homeTargetUsers: 'Recommended For',
    homeTargetList: [
      'Beginners who want to learn how to memorize scales',
      'Guitarists looking to practice improvisation and solos',
      'Composers and arrangers who want to know the key and scale of a song',
      'Anyone wanting to deepen their understanding of music theory',
    ],

    // 404 Page
    notFoundTitle: 'Page Not Found',
    notFoundMessage: 'The page you are looking for does not exist or may have been moved.',
    notFoundBackHome: 'Back to Home',
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

    // 页脚
    footerDescription: '免费的吉他音阶可视化网络应用。在吉他指板上显示13种以上音阶，具备从音频自动检测调性的AI功能。支持从初学者到专业人士的音乐创作和练习。',
    footerContents: '内容',
    footerSupport: '支持',
    home: '首页',
    aboutSite: '关于本站',
    articles: '专栏文章',
    contact: '联系我们',
    privacyPolicy: '隐私政策',
    companyInfo: '运营者信息',
    copyright: '© {year} 吉他音阶大师. 保留所有权利。',

    // 导航
    backToHome: '← 返回首页',

    // 关于页面
    aboutTitle: '关于吉他音阶大师',
    aboutServiceOverview: '服务概述',
    aboutServiceDesc1: '吉他音阶大师是一款免费的网络应用，旨在支持吉他手的练习和作曲。通过在吉他指板上可视化显示音阶，您可以直观地理解音阶结构和指法模式。',
    aboutServiceDesc2: '它可以作为初学者记忆音阶的学习工具，也可以作为有经验的演奏者探索新音阶或在作曲时获取灵感的参考。',
    aboutMainFeatures: '主要功能',
    aboutFeatureVisualize: '音阶可视化',
    aboutFeatureVisualizeDesc: '在吉他指板上清晰显示13种以上音阶（大调、小调、五声、调式、都节等）。根音显示为红色，其他音阶音显示为绿色。',
    aboutFeatureAnalysis: '音频自动分析',
    aboutFeatureAnalysisDesc: '上传MP3、WAV或M4A文件，AI将自动检测调性和音阶。当您想学习一首歌但不知道音阶时非常有用。',
    aboutFeaturePlay: '音阶播放',
    aboutFeaturePlayDesc: '聆听所选音阶的音符。在训练耳朵的同时，将声音与指板位置联系起来。',
    aboutFeatureVideo: '参考视频',
    aboutFeatureVideoDesc: '每个音阶和根音都有YouTube视频。通过演奏示例和教程加深理解。',
    aboutFeatureTuning: '调音支持',
    aboutFeatureTuningDesc: '支持标准、Drop D、7弦吉他、半音下调等各种调音。切换显示以匹配您的吉他设置。',
    aboutFeatureResponsive: '响应式设计',
    aboutFeatureResponsiveDesc: '在PC、平板和智能手机上都能舒适使用。在移动设备上，指板可以旋转90度。',
    aboutSupportedScales: '支持的音阶',
    aboutBasicScales: '基本音阶',
    aboutModeScales: '调式音阶',
    aboutPentaOther: '五声音阶等',
    scaleMajor: '大调',
    scaleNaturalMinor: '自然小调',
    scaleHarmonicMinor: '和声小调',
    scaleMelodicMinor: '旋律小调',
    scaleDorian: '多利亚',
    scalePhrygian: '弗里吉亚',
    scaleLydian: '利迪亚',
    scaleMixolydian: '混合利迪亚',
    scaleLocrian: '洛克里亚',
    scaleMajorPentatonic: '大调五声',
    scaleMinorPentatonic: '小调五声',
    scaleBlues: '布鲁斯',
    scaleInSen: '都节',
    aboutHowToUse: '使用方法',
    aboutStep1: '选择根音',
    aboutStep1Desc: '从12个音符中选择基准音：C、D、E等。',
    aboutStep2: '选择音阶',
    aboutStep2Desc: '选择您想学习的音阶：大调、小调、五声等。',
    aboutStep3: '查看指板',
    aboutStep3Desc: '查看指板上的位置，然后在吉他上尝试弹奏。',
    aboutStep4: '听音学习',
    aboutStep4Desc: '按播放按钮听音阶，通过听觉训练提高记忆。',
    aboutRecommendedFor: '推荐人群',
    aboutRecommend1: '想学习音阶基础的吉他初学者',
    aboutRecommend2: '想尝试即兴演奏但不知道弹什么的人',
    aboutRecommend3: '想知道要翻弹歌曲的调性和音阶的人',
    aboutRecommend4: '作曲时需要音阶参考的人',
    aboutRecommend5: '想学习五声音阶以外音阶的中级演奏者',
    aboutRecommend6: '想探索日本音阶或调式等多样音阶的人',
    aboutCta: '立即试用 →',

    // 文章
    articlesTitle: '专栏文章',
    articlesSubtitle: '为吉他手提供从基础到高级技巧的有用信息',
    articleCategory: {
      beginner: '初学者',
      intermediate: '中级',
      practice: '实践技巧',
    },
    articleReadMore: '阅读更多 →',
    articleTryScale: '试试这个音阶',
    articleTryScaleDesc: '在吉他指板上可视化确认文章中学到的音阶。',
    articleUseVisualizer: '使用音阶可视化工具 →',
    articleRelated: '相关文章',

    // 五声音阶文章
    pentatonicTitle: '五声音阶入门 - 每位吉他手应该首先学习的音阶',
    pentatonicDesc: '五声音阶是吉他手最重要的音阶之一。了解为什么它应该是您的第一个音阶以及如何练习。',
    pentatonicWhat: '什么是五声音阶？',
    pentatonicWhatDesc1: '五声音阶由5个音符组成，正如其名所示。"Penta"在希腊语中意为"五"。它是从标准7音音阶中去掉2个音的简化音阶。',
    pentatonicWhatDesc2: '这种简单性正是五声音阶被推荐给初学者的原因。音符少更容易记忆，而且很难弹错音。',
    pentatonicTypes: '两种五声音阶',
    pentatonicMajor: '大调五声音阶',
    pentatonicMajorDesc: '大调五声音阶省略了大调音阶的第4度和第7度。具有明亮、开放的音色，常用于乡村和流行音乐。',
    pentatonicMinor: '小调五声音阶',
    pentatonicMinorDesc: '小调五声音阶省略了自然小调音阶的第2度和第6度。它是最通用的音阶，广泛用于摇滚、布鲁斯、金属等多种流派。',
    pentatonicWhy: '为什么五声音阶适合初学者',
    pentatonicWhy1: '1. 容易学习',
    pentatonicWhy1Desc: '只有5个音符，指板图案简单。大多数吉他手学习5个"盒子位置"就能在整个指板上弹奏五声音阶。',
    pentatonicWhy2: '2. 难以弹错',
    pentatonicWhy2Desc: '五声音阶省略的第4度和第7度经常与和弦音冲突。去掉它们后，几乎弹任何音都会好听，使初学者更容易尝试即兴演奏。',
    pentatonicWhy3: '3. 高度通用',
    pentatonicWhy3Desc: '适用于摇滚、布鲁斯、流行、放克、金属等几乎所有流行音乐。一旦掌握，可以应用于多种流派的歌曲。',
    pentatonicPractice: '练习技巧',
    pentatonicPracticeList: [
      '首先完善一个位置（推荐位置1）',
      '使用节拍器慢速准确练习',
      '尝试在伴奏音轨上即兴演奏',
      '复制您喜欢的吉他手的乐句来学习应用',
      '熟练后，练习连接所有5个位置',
    ],
    pentatonicSummary: '总结',
    pentatonicSummaryDesc: '五声音阶是一个简单而强大的工具。许多专业吉他手都以五声音阶为基础构建乐句。首先掌握这个音阶，然后逐渐扩展到其他音阶。',
    pentatonicCta: '在指板上查看五声音阶',
    pentatonicViewMajor: '查看A大调五声音阶',
    pentatonicViewMinor: '查看A小调五声音阶',

    // 调式音阶文章
    modeTitle: '调式音阶完整指南 - 如何使用多利亚、弗里吉亚和利底亚',
    modeDesc: '详细解释7种调式音阶及其在实际歌曲中的应用。从中级到高级的进阶。',
    modeWhat: '什么是调式音阶？',
    modeWhatDesc1: '调式音阶（教会调式）是从大调音阶的每个音开始衍生出的7种音阶。它起源于古希腊音乐理论，广泛用于现代爵士、摇滚和融合音乐。',
    modeWhatDesc2: '每种调式都有其独特的"色彩"或"情绪"。适当使用它们可以实现更丰富的音乐表现。',
    mode7Modes: '7种调式音阶',
    modeIonian: '1. 伊奥尼亚（Ionian）',
    modeIonianDesc: '这就是我们熟知的大调音阶。特点是明亮、稳定的音色。',
    modeDorian: '2. 多利亚（Dorian）',
    modeDorianDesc: '类似于小调音阶，但第6度是自然音（大6度）。虽然是小调，但有一种明亮的感觉。常用于爵士、放克和灵魂乐。',
    modeDorianExample: '示例：Santana "Oye Como Va"、Miles Davis "So What"',
    modePhrygian: '3. 弗里吉亚（Phrygian）',
    modePhrygianDesc: '♭2度是其显著特征，创造出异国情调的西班牙或阿拉伯风格音色。在金属、弗拉门戈和前卫摇滚中有效使用。',
    modePhrygianExample: '示例：Metallica "Wherever I May Roam"',
    modeLydian: '4. 利底亚（Lydian）',
    modeLydianDesc: '大调音阶的第4度升高（#4）。具有飘浮、梦幻的音色。常用于电影配乐、前卫摇滚和融合音乐。',
    modeLydianExample: '示例：Steve Vai "For The Love of God"、Joe Satriani的作品',
    modeMixolydian: '5. 混合利底亚（Mixolydian）',
    modeMixolydianDesc: '大调音阶的第7度降低（♭7）。具有布鲁斯风格的摇滚音色，用于属七和弦上。是摇滚、布鲁斯和乡村音乐的常用音阶。',
    modeMixolydianExample: '示例：The Beatles "Norwegian Wood"、Guns N\' Roses "Sweet Child O\' Mine"',
    modeAeolian: '6. 艾奥利亚（Aeolian）',
    modeAeolianDesc: '被称为自然小调音阶。具有悲伤、黑暗的音色，用于各种流派的小调歌曲。',
    modeLocrian: '7. 洛克里亚（Locrian）',
    modeLocrianDesc: '最不稳定的调式，具有♭5度（减5度）。创造紧张、不协和的音色。用于前卫金属和爵士的特定场景。',
    modeHowToRemember: '如何记忆调式',
    modeHowToRememberDesc: '理解调式最简单的方法是想"从大调音阶的每个音开始"。',
    modePracticalTips: '实用技巧',
    modePracticalTipsList: [
      '关注区分每种调式的"特征音"',
      '根据和弦进行选择适当的调式',
      '在移动到下一个之前彻底掌握一个调式',
      '使用伴奏音轨训练耳朵识别每种调式的音色',
      '分析您喜欢的吉他手的演奏来学习调式应用',
    ],
    modeSummary: '总结',
    modeSummaryDesc: '掌握调式音阶将大大扩展您的音乐表现力。起初可能感觉困难，但通过逐一学习，您将成为能够应对各种音乐场景的吉他手。',
    modeCta: '在指板上查看调式音阶',

    // 布鲁斯音阶文章
    bluesTitle: '用布鲁斯音阶演奏富有灵魂的乐句',
    bluesDesc: '掌握布鲁斯音阶结构和蓝调音的使用。演奏情感吉他独奏的技巧。',
    bluesWhat: '什么是布鲁斯音阶？',
    bluesWhatDesc1: '布鲁斯音阶在小调五声音阶的基础上添加了"蓝调音"（♭5度），形成6音音阶。这一个音的添加创造了独特的"哭泣"或"呻吟"声音。',
    bluesWhatDesc2: '这是一个极具表现力的音阶，用于布鲁斯、摇滚、爵士、放克等多种流派。',
    bluesStructure: '布鲁斯音阶结构',
    bluesExample: 'A布鲁斯音阶',
    bluesDegrees: '音程',
    bluesStructureDesc: '通过在小调五声音阶（1-♭3-4-5-♭7）上添加♭5度，就形成了布鲁斯音阶。这个♭5度就是"蓝调音"——一个能创造独特张力和忧郁感的关键音。',
    bluesNote: '蓝调音的魔力',
    bluesNoteMagic: '蓝调音（♭5度）与各种技巧结合时才能展现其真正价值：',
    bluesBending: '1. 推弦',
    bluesBendingDesc: '从♭5度到5度的四分之一推弦，或从4度到♭5度的推弦，是经典的布鲁斯吉他技巧。这种"介于之间"的音高创造出类似人声的表现。',
    bluesHammerPull: '2. 击弦/勾弦',
    bluesHammerPullDesc: '用击弦和勾弦连接4度 → ♭5度 → 5度，创造流畅、富有表现力的乐句。这是B.B. King和Eric Clapton的标志性技巧。',
    bluesSlide: '3. 滑音',
    bluesSlideDesc: '滑入或滑出蓝调音可以为您的演奏增添"歌唱"般的质感。',
    bluesPatterns: '经典乐句模式',
    bluesPattern1: '模式1：经典转折',
    bluesPattern1Desc: '常用于布鲁斯进行最后2小节的乐句。',
    bluesPattern2: '模式2：B.B. King盒子',
    bluesPattern2Desc: '在1、2弦高把位演奏的歌唱般乐句。',
    bluesPattern3: '模式3：经典摇滚乐句',
    bluesPattern3Desc: '摇滚吉他常用的有力乐句。',
    bluesMajorApplication: '大调布鲁斯应用',
    bluesMajorApplicationDesc1: '虽然布鲁斯音阶是小调系的，但它可以用于大调布鲁斯进行。这种"在大调和弦上弹小调音阶"创造了独特的布鲁斯音色。',
    bluesMajorApplicationDesc2: '高级演奏者在小调五声、大调五声和布鲁斯音阶之间自由切换，构建更复杂和富有表现力的独奏。',
    bluesPractice: '练习技巧',
    bluesPracticeList: [
      '首先完美掌握小调五声音阶',
      '了解每个位置的蓝调音位置',
      '蓝调音基本用作"经过音"（不要长时间保持）',
      '复制著名布鲁斯吉他手的乐句来学习应用',
      '配合12小节布鲁斯伴奏音轨练习',
      '发展有表现力的推弦和揉弦',
    ],
    bluesGuitarists: '推荐学习的吉他手',
    bluesGuitarist1: '布鲁斯吉他之王。颤音和推弦的教科书。',
    bluesGuitarist2: '德克萨斯布鲁斯的强者。有力的音色和充满激情的演奏。',
    bluesGuitarist3: '布鲁斯摇滚大师。清晰、歌唱般的乐句。',
    bluesGuitarist4: '爱尔兰布鲁斯之魂。触动心灵的哭泣吉他。',
    bluesSummary: '总结',
    bluesSummaryDesc: '布鲁斯音阶仅添加一个音就能大大扩展您的表现力。掌握五声音阶后，一定要尝试布鲁斯音阶。一旦您能够运用这个音阶，您的吉他独奏一定会上升到新的水平。',
    bluesCta: '在指板上查看布鲁斯音阶',
    bluesViewA: '查看A布鲁斯音阶',
    bluesViewE: '查看E布鲁斯音阶',

    // 和声小调记事
    harmonicTitle: '和声小调音阶的魅力与用法',
    harmonicDesc: '和声小调音阶从古典到金属乐广泛使用。了解其独特的音色和实际应用方法。',
    harmonicWhat: '什么是和声小调音阶？',
    harmonicWhatDesc1: '和声小调音阶是将自然小调音阶的第7音升高半音的音阶。这使得在小调中也能形成具有强烈解决感的属七和弦（V7）。',
    harmonicWhatDesc2: '这个音阶最大的特点是第6音和第7音之间有增二度（1.5个全音）的音程。这种独特的音程创造出异域风情的声音，在中东音乐、古典音乐甚至新古典金属中都很受欢迎。',
    harmonicStructure: '音阶结构',
    harmonicStructureDesc: '音阶遵循全音-半音-全音-全音-半音-增二度-半音的模式。',
    harmonicCharacteristic: '特征音色',
    harmonicCharacteristicDesc: '第6音和第7音之间的增二度音程创造出这个音阶独特的异域和戏剧性音色。这种声音在小调古典音乐作品中经常听到。',
    harmonicUsage: '实际应用',
    harmonicUsage1: '在V7和弦上使用',
    harmonicUsage1Desc: '在小调的属七和弦（例如Am调中的E7）上使用，可以平滑地解决到主和弦。',
    harmonicUsage2: '新古典乐句',
    harmonicUsage2Desc: '在以Yngwie Malmsteen为代表的新古典金属中，使用此音阶的高速琶音和音序乐句是标准配置。',
    harmonicUsage3: '异域旋律',
    harmonicUsage3Desc: '有效地创造中东风格或西班牙风格的旋律。在弗拉门戈吉他中也常用。',
    harmonicComparison: '与自然小调的比较',
    harmonicComparisonDesc: '自然小调表达平静的悲伤，而和声小调具有更戏剧性和紧张的声音。同时使用两者可以大大扩展您的表现力。',
    harmonicPractice: '有效的练习方法',
    harmonicPracticeList: [
      '练习每弦三音模式以覆盖整个指板',
      '有意识地在属七（V7）和弦上练习',
      '反复练习包含增二度音程的乐句',
      '复制古典音乐或新古典金属的乐句',
    ],
    harmonicSummary: '总结',
    harmonicSummaryDesc: '和声小调音阶为小调作品带来强烈的解决感和戏剧性的声音。它是一个在古典、弗拉门戈、金属等各种风格中都可以使用的高度通用的音阶。',
    harmonicCta: '在指板上查看和声小调',
    harmonicViewA: '查看A和声小调',
    harmonicViewE: '查看E和声小调',

    // 音阶练习记事
    practiceTitle: '吉他初学者的音阶练习法【高效记忆方法】',
    practiceDesc: '为初学者讲解高效记忆音阶的练习方法。介绍避免挫折的技巧和循序渐进的练习步骤。',
    practiceIntro: '为什么音阶练习很重要',
    practiceIntroDesc: '音阶是吉他演奏的基础，是即兴演奏、作曲、扒谱等所有音乐活动的基石。然而，盲目练习无法提高效率。正确的方法和循序渐进的练习是进步的捷径。',
    practiceStep1: '第一步：从五声音阶开始',
    practiceStep1Desc: '不要一开始就尝试学习七音音阶。先从五音组成的五声音阶开始。它更容易记忆，在实际歌曲中也常用。',
    practiceStep1List: [
      '学习A小调五声音阶的第一把位',
      '配合节拍器练习上行和下行',
      '从BPM60开始，逐渐提高速度',
      '每天至少练习15分钟，直到手指灵活运动',
    ],
    practiceStep2: '第二步：增加把位',
    practiceStep2Desc: '一旦能弹好一个把位，就挑战下一个。目标是能够在整个指板上弹奏音阶。',
    practiceStep2List: [
      '依次学习5个五声音阶把位',
      '练习把位之间的平滑转换',
      '在不同把位弹奏相同的乐句',
      '视觉上理解指板上的音阶模式',
    ],
    practiceStep3: '第三步：扩展到七音音阶',
    practiceStep3Desc: '熟悉五声音阶后，挑战大调音阶或自然小调音阶等七音音阶。',
    practiceStep3List: [
      '从C大调音阶开始',
      '注意与五声音阶的区别进行练习',
      '使用每弦三音模式',
      '边弹边唱音阶级数（1,2,3,4,5,6,7）',
    ],
    practiceStep4: '第四步：在实际音乐中应用',
    practiceStep4Desc: '不仅要记住音阶，还要配合实际歌曲和伴奏进行使用练习。',
    practiceStep4List: [
      '配合YouTube伴奏进行即兴演奏',
      '复制喜欢的歌曲的独奏',
      '使用音阶音符创作简单的旋律',
      '在不同调中弹奏相同乐句的移调练习',
    ],
    practiceTips: '避免挫折的技巧',
    practiceTipsList: [
      '每天坚持少量练习（15-30分钟）很重要',
      '不要一次学太多',
      '使用节拍器培养准确的节奏感',
      '录音并客观地听自己的演奏',
      '从与喜欢的歌曲或风格相关的音阶开始',
    ],
    practiceSummary: '总结',
    practiceSummaryDesc: '音阶练习虽然枯燥，但绝对会带来进步。不要急躁，循序渐进地练习，并意识到在实际音乐中的应用。利用本站的音阶可视化功能高效练习吧。',
    practiceCta: '使用音阶可视化工具',

    // 隐私政策
    privacyTitle: '隐私政策',
    privacyIntro: '吉他音阶大师（"本站"）就用户个人信息的处理制定本隐私政策。',
    privacySection1: '1. 收集的信息',
    privacySection1List: [
      '联系表单中输入的信息（姓名、电子邮件地址、咨询内容）',
      '上传用于分析的音频文件（分析后自动删除）',
      '访问日志信息（IP地址、浏览器类型、访问日期/时间等）',
      'Cookie信息',
    ],
    privacySection2: '2. 使用目的',
    privacySection2List: [
      '回复咨询',
      '提供和运营服务',
      '改进服务和开发新功能',
      '使用分析',
      '防止未经授权的使用',
    ],
    privacySection3: '3. 第三方披露',
    privacySection3Desc: '除以下情况外，本站不会向第三方提供用户个人信息：',
    privacySection3List: [
      '经用户同意',
      '法律要求时',
      '为保护生命、身体或财产所必需时',
    ],
    privacySection4: '4. Cookie的使用',
    privacySection4Desc: '本站使用Cookie来改善用户体验和进行访问分析。您可以通过浏览器设置拒绝Cookie，但某些功能可能变得不可用。',
    privacySection5: '5. 分析工具',
    privacySection5Desc: '本站可能使用Google Analytics进行访问分析。Google Analytics使用Cookie收集网站使用数据。此信息是匿名收集的，不会识别个人。',
    privacySection6: '6. 广告',
    privacySection6Desc1: '本站使用第三方广告服务（Google AdSense）。广告商可能使用Cookie根据用户兴趣显示广告。',
    privacySection6Desc2: '有关Google AdSense的详细信息，请参阅Google的广告政策。',
    privacySection6Desc3: '用户可以在Google的广告设置中禁用个性化广告。',
    privacySection7: '7. 上传的文件',
    privacySection7Desc: '上传用于分析的音频文件暂时存储在服务器上进行处理，但分析后会自动删除。上传的文件不会与第三方共享或用于分析以外的目的。',
    privacySection8: '8. 安全',
    privacySection8Desc: '本站采取必要和适当的安全措施，以防止个人信息的泄露、丢失和损坏。',
    privacySection9: '9. 免责声明',
    privacySection9Desc1: '虽然我们力求准确，但本站对基于所提供信息采取的任何行动不承担责任。',
    privacySection9Desc2: '本站对通过链接或横幅访问的外部网站提供的信息或服务不承担责任。',
    privacySection10: '10. 版权',
    privacySection10Desc: '本站内容（文字、图片、程序等）的版权属于本站或合法的第三方权利人。禁止未经授权的复制、转载或修改。',
    privacySection11: '11. 政策变更',
    privacySection11Desc: '本站可能根据需要更改本政策。更新的隐私政策在本站发布时生效。',
    privacySection12: '12. 联系方式',
    privacySection12Desc: '有关本政策的咨询，请使用联系表单。',
    privacyEnacted: '制定日期：2025年1月1日',
    privacyUpdated: '最后更新：2025年1月15日',

    // 运营者信息
    companyTitle: '运营者信息',
    companySection1: '运营公司',
    companyName: '公司名称',
    companyNameEn: '英文名称',
    companyOfficialSite: '官方网站',
    companySection2: '业务描述',
    companyBusinessDesc: '株式会社Motechoro以"提高每个人的QOML（音乐生活质量）"为使命，通过音乐提供各种服务。',
    companyBusinessList: [
      '面向社区、学校和企业的讲座和工作坊',
      '音乐活动礼宾服务',
      '娱乐内容策划和管理',
      'JAM会议和音乐协作活动',
      '音乐相关网络服务的开发和运营',
    ],
    companySection3: '关于本服务',
    companyServiceDesc1: '吉他音阶大师是由株式会社Motechoro开发和运营的免费网络应用，旨在支持吉他手的练习和作曲。',
    companyServiceDesc2: '除了在吉他指板上可视化显示音阶外，还具有从音频自动检测调性和音阶的AI分析功能。支持从初学者到专业人士的所有吉他手的音乐生活。',
    companySection4: '联系方式',
    companyContactDesc: '有关本服务的咨询，请使用以下方式：',
    companyContactForm: '联系表单',
    companyOfficialSiteBtn: '公司官方网站',

    // 联系我们
    contactTitle: '联系我们',
    contactDesc: '如果您对吉他音阶大师有任何问题、请求或错误报告，请随时使用下面的表单与我们联系。',
    contactNotes: '关于咨询',
    contactNote1: '我们通常在3个工作日内回复。',
    contactNote2: '根据内容，回复可能需要额外时间。',
    contactNote3: '我们无法回应商业推销。',

    // 利用規約ページ
    termsTitle: '使用条款',
    termsIntro: '本使用条款（以下简称"条款"）规定了株式会社Motekoro（以下简称"公司"）提供的"吉他音阶大师"（以下简称"服务"）的使用条件。在使用本服务之前，请仔细阅读本条款。',
    termsSection1: '第1条（适用范围）',
    termsSection1Desc: '本条款旨在明确公司与用户之间关于使用本服务的权利义务关系，适用于用户与公司之间与本服务使用相关的所有关系。',
    termsSection2: '第2条（服务内容）',
    termsSection2List: [
      '吉他音阶可视化功能',
      '音频文件自动音阶分析功能',
      '音阶播放功能',
      '音阶相关教育内容',
      '公司提供的其他相关服务',
    ],
    termsSection3: '第3条（禁止事项）',
    termsSection3List: [
      '违反法律或公序良俗的行为',
      '侵犯公司或第三方的知识产权、隐私、名誉或其他权利的行为',
      '妨碍本服务运营的行为',
      '给其他用户造成困扰的行为',
      '未经公司事先许可将本服务用于商业目的',
      '对本服务进行逆向工程、反编译或反汇编',
      '使用自动化工具访问',
      '公司认为不当的其他行为',
    ],
    termsSection4: '第4条（知识产权）',
    termsSection4Desc: '与本服务相关的所有知识产权归公司或合法权利人所有。根据本条款授予的本服务使用许可并不意味着允许使用公司或合法权利人的知识产权。',
    termsSection5: '第5条（免责声明）',
    termsSection5Desc: '公司不对本服务是否符合用户的特定目的、是否具有预期的功能、准确性或实用性、是否符合适用的法律法规、是否可持续使用以及是否不存在缺陷作出任何明示或暗示的保证。公司对因本服务引起的任何损害不承担任何责任。',
    termsSection6: '第6条（服务的变更和停止）',
    termsSection6Desc: '公司可以在不事先通知用户的情况下变更本服务的内容，或停止或中止本服务的提供。',
    termsSection7: '第7条（使用条款的变更）',
    termsSection7Desc: '公司认为必要时，可以在不事先通知用户的情况下随时变更本条款。变更后的条款自在本服务上发布之时起生效。',
    termsSection8: '第8条（准据法和管辖法院）',
    termsSection8Desc: '本条款的解释以日本法律为准据法。与本服务相关的任何争议，以东京地方法院为第一审的专属合意管辖法院。',
    termsEnacted: '制定日期：2025年1月15日',
    termsUpdated: '最后更新：2025年1月25日',
    termsOfService: '使用条款',

    // メインページ説明セクション
    homeAboutTitle: '什么是吉他音阶大师？',
    homeAboutDesc: '一款免费的网络应用程序，可视化学习吉他音阶。在吉他指板上显示13种以上的音阶，将理论与实践相结合。',
    homeFeature1: '音阶可视化',
    homeFeature1Desc: '在指板上显示大调、小调、五声音阶、调式音阶等吉他手必备的主要音阶。根音和构成音一目了然。',
    homeFeature2: '音频分析',
    homeFeature2Desc: '只需上传音频文件，AI就会自动检测歌曲的调性和音阶。快速把握想要翻奏的歌曲的音阶。',
    homeFeature3: '音阶播放',
    homeFeature3Desc: '可以实时聆听所选音阶的声音。通过视觉和听觉同时记忆音阶，实现高效练习。',
    homeTargetUsers: '推荐人群',
    homeTargetList: [
      '不知道如何记忆音阶的初学者',
      '想练习即兴演奏和独奏的吉他手',
      '想了解歌曲调性和音阶的作曲家和编曲者',
      '想深入理解音乐理论的人',
    ],

    // 404页面
    notFoundTitle: '页面未找到',
    notFoundMessage: '您查找的页面不存在或可能已被移动。',
    notFoundBackHome: '返回首页',
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

    // Pie de página
    footerDescription: 'Aplicación web gratuita para aprender escalas de guitarra visualmente. Muestra más de 13 escalas en el diapasón, con detección automática de tonalidad desde audio. Apoyando tu creación musical y práctica, desde principiantes hasta profesionales.',
    footerContents: 'Contenidos',
    footerSupport: 'Soporte',
    home: 'Inicio',
    aboutSite: 'Sobre Este Sitio',
    articles: 'Artículos',
    contact: 'Contacto',
    privacyPolicy: 'Política de Privacidad',
    companyInfo: 'Información de la Empresa',
    copyright: '© {year} Maestro de Escalas de Guitarra. Todos los derechos reservados.',

    // Navegación
    backToHome: '← Volver al Inicio',

    // Página Acerca de
    aboutTitle: 'Sobre Maestro de Escalas de Guitarra',
    aboutServiceOverview: 'Descripción del Servicio',
    aboutServiceDesc1: 'Maestro de Escalas de Guitarra es una aplicación web gratuita diseñada para apoyar a los guitarristas en su práctica y composición. Al mostrar escalas visualmente en el diapasón, puedes entender intuitivamente las estructuras de escalas y patrones de digitación.',
    aboutServiceDesc2: 'Sirve como herramienta de aprendizaje para principiantes memorizando escalas, y como referencia para músicos experimentados explorando nuevas escalas o buscando ideas durante la composición.',
    aboutMainFeatures: 'Características Principales',
    aboutFeatureVisualize: 'Visualización de Escalas',
    aboutFeatureVisualizeDesc: 'Muestra más de 13 escalas (Mayor, Menor, Pentatónica, Modos, Miyako-bushi, etc.) claramente en el diapasón. Las notas raíz se muestran en rojo, otras notas de la escala en verde.',
    aboutFeatureAnalysis: 'Análisis Automático de Audio',
    aboutFeatureAnalysisDesc: 'Sube archivos MP3, WAV o M4A y la IA detectará automáticamente la tonalidad y escala. Perfecto cuando quieres aprender una canción pero no conoces la escala.',
    aboutFeaturePlay: 'Reproducción de Escalas',
    aboutFeaturePlayDesc: 'Escucha las notas de la escala seleccionada. Conecta los sonidos con las posiciones del diapasón mientras entrenas tu oído.',
    aboutFeatureVideo: 'Videos de Referencia',
    aboutFeatureVideoDesc: 'Videos de YouTube para cada escala y nota raíz. Profundiza tu comprensión con ejemplos de interpretación y tutoriales.',
    aboutFeatureTuning: 'Soporte de Afinación',
    aboutFeatureTuningDesc: 'Soporta varias afinaciones incluyendo estándar, Drop D, guitarra de 7 cuerdas, medio tono abajo. Cambia las visualizaciones para coincidir con tu configuración.',
    aboutFeatureResponsive: 'Diseño Responsivo',
    aboutFeatureResponsiveDesc: 'Funciona cómodamente en PC, tablet y smartphone. En móvil, el diapasón puede rotarse 90 grados.',
    aboutSupportedScales: 'Escalas Soportadas',
    aboutBasicScales: 'Escalas Básicas',
    aboutModeScales: 'Escalas Modales',
    aboutPentaOther: 'Pentatónica y Otras',
    scaleMajor: 'Mayor',
    scaleNaturalMinor: 'Menor Natural',
    scaleHarmonicMinor: 'Menor Armónica',
    scaleMelodicMinor: 'Menor Melódica',
    scaleDorian: 'Dórica',
    scalePhrygian: 'Frigia',
    scaleLydian: 'Lidia',
    scaleMixolydian: 'Mixolidia',
    scaleLocrian: 'Locria',
    scaleMajorPentatonic: 'Pentatónica Mayor',
    scaleMinorPentatonic: 'Pentatónica Menor',
    scaleBlues: 'Blues',
    scaleInSen: 'In Sen',
    aboutHowToUse: 'Cómo Usar',
    aboutStep1: 'Elegir Nota Raíz',
    aboutStep1Desc: 'Selecciona la nota base de 12 notas: C, D, E, etc.',
    aboutStep2: 'Elegir Escala',
    aboutStep2Desc: 'Selecciona la escala que quieres aprender: Mayor, Menor, Pentatónica, etc.',
    aboutStep3: 'Ver el Diapasón',
    aboutStep3Desc: 'Mira las posiciones en el diapasón e intenta tocarlas en tu guitarra.',
    aboutStep4: 'Escuchar y Aprender',
    aboutStep4Desc: 'Presiona el botón de reproducción para escuchar la escala y mejorar la retención mediante entrenamiento auditivo.',
    aboutRecommendedFor: 'Recomendado Para',
    aboutRecommend1: 'Principiantes de guitarra que quieren aprender los fundamentos de las escalas',
    aboutRecommend2: 'Quienes quieren intentar improvisar pero no saben qué tocar',
    aboutRecommend3: 'Quienes quieren conocer la tonalidad y escala de canciones para versionar',
    aboutRecommend4: 'Quienes necesitan referencia de escalas durante la composición',
    aboutRecommend5: 'Músicos intermedios que quieren aprender escalas más allá de la pentatónica',
    aboutRecommend6: 'Quienes quieren explorar escalas diversas como escalas japonesas o modos',
    aboutCta: 'Pruébalo Ahora →',

    // Artículos
    articlesTitle: 'Artículos',
    articlesSubtitle: 'Información útil para guitarristas, desde fundamentos hasta técnicas avanzadas',
    articleCategory: {
      beginner: 'Principiante',
      intermediate: 'Intermedio',
      practice: 'Técnica Práctica',
    },
    articleReadMore: 'Leer Más →',
    articleTryScale: 'Prueba la Escala',
    articleTryScaleDesc: 'Confirma visualmente las escalas que aprendiste en el artículo en el diapasón.',
    articleUseVisualizer: 'Usar Visualizador de Escalas →',
    articleRelated: 'Artículos Relacionados',

    // Artículo Pentatónica
    pentatonicTitle: 'Guía de Escala Pentatónica - La Primera Escala que Todo Guitarrista Debe Aprender',
    pentatonicDesc: 'La escala pentatónica es una de las escalas más importantes para guitarristas. Aprende por qué debería ser tu primera escala y cómo practicarla.',
    pentatonicWhat: '¿Qué es la Escala Pentatónica?',
    pentatonicWhatDesc1: 'La Escala Pentatónica consiste en 5 notas, como su nombre sugiere. "Penta" significa "cinco" en griego. Es una escala simplificada con 2 notas eliminadas de la escala estándar de 7 notas.',
    pentatonicWhatDesc2: 'Esta simplicidad es exactamente por qué la escala pentatónica se recomienda para principiantes. Con menos notas, es más fácil de memorizar, y es difícil tocar notas incorrectas.',
    pentatonicTypes: 'Dos Tipos de Escalas Pentatónicas',
    pentatonicMajor: 'Pentatónica Mayor',
    pentatonicMajorDesc: 'La pentatónica mayor omite los grados 4º y 7º de la escala mayor. Tiene un sonido brillante y abierto comúnmente usado en country y pop.',
    pentatonicMinor: 'Pentatónica Menor',
    pentatonicMinorDesc: 'La pentatónica menor omite los grados 2º y 6º de la escala menor natural. Es la escala más versátil, usada en rock, blues, metal y muchos otros géneros.',
    pentatonicWhy: 'Por Qué la Pentatónica es Perfecta para Principiantes',
    pentatonicWhy1: '1. Fácil de Aprender',
    pentatonicWhy1Desc: 'Con solo 5 notas, los patrones del diapasón son simples. La mayoría de guitarristas aprenden 5 "posiciones de caja" para tocar pentatónica en todo el diapasón.',
    pentatonicWhy2: '2. Difícil Sonar Mal',
    pentatonicWhy2Desc: 'Los grados 4º y 7º omitidos de la pentatónica a menudo chocan con los tonos de acordes. Al eliminarlos, casi cualquier nota que toques sonará bien, facilitando la improvisación para principiantes.',
    pentatonicWhy3: '3. Altamente Versátil',
    pentatonicWhy3Desc: 'Funciona en rock, blues, pop, funk, metal y casi toda la música popular. Una vez dominada, se aplica a canciones de muchos géneros.',
    pentatonicPractice: 'Consejos de Práctica',
    pentatonicPracticeList: [
      'Comienza perfeccionando una posición (posición 1 recomendada)',
      'Practica lenta y precisamente con un metrónomo',
      'Intenta improvisar sobre pistas de acompañamiento',
      'Copia frases de tus guitarristas favoritos para aprender aplicación',
      'Una vez cómodo, practica conectar las 5 posiciones',
    ],
    pentatonicSummary: 'Resumen',
    pentatonicSummaryDesc: 'La escala pentatónica es una herramienta simple pero poderosa. Muchos guitarristas profesionales construyen sus frases sobre fundamentos pentatónicos. Domina esta escala primero, luego expande gradualmente tu conocimiento a otras escalas.',
    pentatonicCta: 'Ver Escala Pentatónica en el Diapasón',
    pentatonicViewMajor: 'Ver A Pentatónica Mayor',
    pentatonicViewMinor: 'Ver A Pentatónica Menor',

    // Artículo Escalas Modales
    modeTitle: 'Guía Completa de Escalas Modales - Cómo Usar Dórico, Frigio y Lidio',
    modeDesc: 'Explicación detallada de las 7 escalas modales y su uso en canciones reales. Sube de nivel de intermedio a avanzado.',
    modeWhat: '¿Qué son las Escalas Modales?',
    modeWhatDesc1: 'Las escalas modales (Modos Eclesiásticos) son 7 escalas derivadas de comenzar en cada nota de la escala mayor. Se originan en la teoría musical griega antigua y se usan ampliamente en jazz, rock y fusión modernos.',
    modeWhatDesc2: 'Cada modo tiene su propio "color" o "estado de ánimo" único. Usarlos apropiadamente permite una expresión musical más rica.',
    mode7Modes: 'Las 7 Escalas Modales',
    modeIonian: '1. Jónico',
    modeIonianDesc: 'Esta es la escala mayor que todos conocemos bien. Caracterizada por un sonido brillante y estable.',
    modeDorian: '2. Dórico',
    modeDorianDesc: 'Similar a la escala menor, pero con una 6ª natural (6ª mayor). A pesar de ser menor, tiene una cualidad algo brillante. Comúnmente usado en jazz, funk y soul.',
    modeDorianExample: 'Ejemplos: Santana "Oye Como Va", Miles Davis "So What"',
    modePhrygian: '3. Frigio',
    modePhrygianDesc: 'La ♭2ª es su característica definitoria, creando un sonido exótico español o árabe. Usado efectivamente en metal, flamenco y rock progresivo.',
    modePhrygianExample: 'Ejemplo: Metallica "Wherever I May Roam"',
    modeLydian: '4. Lidio',
    modeLydianDesc: 'Escala mayor con 4ª elevada (#4). Tiene un sonido flotante y soñador. Frecuentemente usado en música de cine, rock progresivo y fusión.',
    modeLydianExample: 'Ejemplos: Steve Vai "For The Love of God", obras de Joe Satriani',
    modeMixolydian: '5. Mixolidio',
    modeMixolydianDesc: 'Escala mayor con 7ª bajada (♭7). Tiene un sonido blusero y rockero usado sobre acordes de 7ª dominante. Un básico en rock, blues y country.',
    modeMixolydianExample: 'Ejemplos: The Beatles "Norwegian Wood", Guns N\' Roses "Sweet Child O\' Mine"',
    modeAeolian: '6. Eólico',
    modeAeolianDesc: 'Conocida como la escala menor natural. Tiene un sonido triste y oscuro usado en canciones en tonalidad menor de todos los géneros.',
    modeLocrian: '7. Locrio',
    modeLocrianDesc: 'El modo más inestable con una ♭5ª (5ª disminuida). Crea un sonido tenso y disonante. Usado en contextos específicos en metal progresivo y jazz.',
    modeHowToRemember: 'Cómo Recordar los Modos',
    modeHowToRememberDesc: 'La forma más fácil de entender los modos es pensar "comenzar desde cada nota de la escala mayor".',
    modePracticalTips: 'Consejos Prácticos de Uso',
    modePracticalTipsList: [
      'Enfócate en la "nota característica" que distingue cada modo',
      'Elige modos apropiados para progresiones de acordes',
      'Domina un modo completamente antes de pasar al siguiente',
      'Usa pistas de acompañamiento para entrenar tu oído a reconocer el sonido de cada modo',
      'Analiza la interpretación de tus guitarristas favoritos para aprender aplicaciones de modos',
    ],
    modeSummary: 'Resumen',
    modeSummaryDesc: 'Dominar las escalas modales expandirá enormemente tu expresión musical. Puede sentirse difícil al principio, pero aprendiéndolas una por una, te convertirás en un guitarrista que puede manejar varias situaciones musicales.',
    modeCta: 'Ver Escalas Modales en el Diapasón',

    // Artículo Escala de Blues
    bluesTitle: 'Toca Frases con Alma con la Escala de Blues',
    bluesDesc: 'Domina la estructura de la escala de blues y el uso de la nota blue. Técnicas para tocar solos de guitarra emocionales.',
    bluesWhat: '¿Qué es la Escala de Blues?',
    bluesWhatDesc1: 'La escala de blues añade la "nota blue" (♭5ª) a la pentatónica menor, creando una escala de 6 notas. Esta única nota añadida crea el distintivo sonido de "llanto" o "lamento".',
    bluesWhatDesc2: 'Es una escala extremadamente expresiva usada en blues, rock, jazz, funk y muchos otros géneros.',
    bluesStructure: 'Estructura de la Escala de Blues',
    bluesExample: 'Escala de Blues en A',
    bluesDegrees: 'Grados',
    bluesStructureDesc: 'Al añadir la ♭5ª a la pentatónica menor (1-♭3-4-5-♭7), creas la escala de blues. Esta ♭5ª es la "nota blue" - un tono crucial que crea tensión y melancolía únicas.',
    bluesNote: 'La Magia de la Nota Blue',
    bluesNoteMagic: 'La nota blue (♭5ª) muestra su verdadero valor cuando se combina con varias técnicas:',
    bluesBending: '1. Bending',
    bluesBendingDesc: 'Bend de cuarto de tono desde ♭5ª a 5ª, o bend desde 4ª a ♭5ª, son técnicas clásicas de guitarra blues. Este tono "intermedio" crea expresión similar a la voz.',
    bluesHammerPull: '2. Hammer-on/Pull-off',
    bluesHammerPullDesc: 'Conectar 4ª → ♭5ª → 5ª con hammer-ons y pull-offs crea frases suaves y expresivas. Un movimiento característico de B.B. King y Eric Clapton.',
    bluesSlide: '3. Slide',
    bluesSlideDesc: 'Deslizar hacia o desde la nota blue añade una cualidad "cantante" a tu interpretación.',
    bluesPatterns: 'Patrones de Frases Clásicos',
    bluesPattern1: 'Patrón 1: Turnaround Clásico',
    bluesPattern1Desc: 'Una frase comúnmente usada en los últimos 2 compases de una progresión de blues.',
    bluesPattern2: 'Patrón 2: Caja B.B. King',
    bluesPattern2Desc: 'Frases cantantes tocadas en posiciones altas en las cuerdas 1ª y 2ª.',
    bluesPattern3: 'Patrón 3: Lick de Rock Clásico',
    bluesPattern3Desc: 'Una frase poderosa comúnmente usada en guitarra de rock.',
    bluesMajorApplication: 'Aplicación al Blues Mayor',
    bluesMajorApplicationDesc1: 'Aunque la escala de blues es de base menor, funciona sobre progresiones de blues en tonalidad mayor. Este "tocar escala menor sobre acordes mayores" crea el distintivo sonido blues.',
    bluesMajorApplicationDesc2: 'Los músicos avanzados se mueven libremente entre pentatónica menor, pentatónica mayor y escala de blues para construir solos más complejos y expresivos.',
    bluesPractice: 'Consejos de Práctica',
    bluesPracticeList: [
      'Primero, domina perfectamente la pentatónica menor',
      'Aprende la ubicación de la nota blue en cada posición',
      'Usa la nota blue como "nota de paso" (no la mantengas mucho)',
      'Copia frases de guitarristas de blues famosos para aprender aplicación',
      'Practica con pistas de acompañamiento de blues de 12 compases',
      'Desarrolla bending y vibrato expresivos',
    ],
    bluesGuitarists: 'Guitarristas Recomendados para Estudiar',
    bluesGuitarist1: 'El Rey de la guitarra blues. Un libro de texto para vibrato y bending.',
    bluesGuitarist2: 'La potencia del blues de Texas. Tono poderoso y interpretación apasionada.',
    bluesGuitarist3: 'Maestro del blues rock. Fraseo claro y cantante.',
    bluesGuitarist4: 'El alma del blues irlandés. Guitarra llorosa que conmueve el corazón.',
    bluesSummary: 'Resumen',
    bluesSummaryDesc: 'La escala de blues expande dramáticamente tu expresión con solo una nota añadida. Después de dominar la pentatónica, definitivamente prueba la escala de blues. Una vez que puedas usar esta escala bien, tus solos de guitarra definitivamente alcanzarán el siguiente nivel.',
    bluesCta: 'Ver Escala de Blues en el Diapasón',
    bluesViewA: 'Ver Escala de Blues en A',
    bluesViewE: 'Ver Escala de Blues en E',

    // Artículo de Escala Menor Armónica
    harmonicTitle: 'El Encanto y Uso de la Escala Menor Armónica',
    harmonicDesc: 'La escala menor armónica se usa en géneros desde clásico hasta metal. Aprende sobre su sonido distintivo y aplicaciones prácticas.',
    harmonicWhat: '¿Qué es la Escala Menor Armónica?',
    harmonicWhatDesc1: 'La escala menor armónica es una escala menor natural con el 7mo grado elevado medio tono. Esto permite formar un acorde dominante (V7) con fuerte resolución en tonalidades menores.',
    harmonicWhatDesc2: 'La característica más distintiva de esta escala es el intervalo de 2da aumentada (1.5 tonos) entre el 6to y 7mo grado. Este intervalo único crea un sonido exótico amado en música del Medio Oriente, música clásica e incluso metal neoclásico.',
    harmonicStructure: 'Estructura de la Escala',
    harmonicStructureDesc: 'La escala sigue el patrón: tono-semitono-tono-tono-semitono-2da aumentada-semitono.',
    harmonicCharacteristic: 'Sonido Característico',
    harmonicCharacteristicDesc: 'El intervalo de 2da aumentada entre el 6to y 7mo grado crea el sonido exótico y dramático único de esta escala. Este sonido se escucha frecuentemente en piezas clásicas en tonalidades menores.',
    harmonicUsage: 'Aplicaciones Prácticas',
    harmonicUsage1: 'Sobre Acordes V7',
    harmonicUsage1Desc: 'Úsala sobre el acorde de séptima dominante en tonalidades menores (ej: E7 en tonalidad de Am) para una resolución suave a la tónica.',
    harmonicUsage2: 'Frases Neoclásicas',
    harmonicUsage2Desc: 'En el metal neoclásico, ejemplificado por Yngwie Malmsteen, los arpegios a alta velocidad y frases de secuencia usando esta escala son estándar.',
    harmonicUsage3: 'Melodías Exóticas',
    harmonicUsage3Desc: 'Efectiva para crear melodías con sabor del Medio Oriente o español. También se usa comúnmente en guitarra flamenca.',
    harmonicComparison: 'Comparación con Menor Natural',
    harmonicComparisonDesc: 'Mientras que la menor natural expresa tristeza calmada, la menor armónica tiene un sonido más dramático y tenso. Usar ambas expande significativamente tu rango expresivo.',
    harmonicPractice: 'Métodos de Práctica Efectivos',
    harmonicPracticeList: [
      'Practica patrones de 3 notas por cuerda para cubrir todo el diapasón',
      'Practica conscientemente sobre acordes de séptima dominante (V7)',
      'Practica repetidamente frases que contengan el intervalo de 2da aumentada',
      'Copia frases de música clásica o metal neoclásico',
    ],
    harmonicSummary: 'Resumen',
    harmonicSummaryDesc: 'La escala menor armónica aporta fuerte resolución y sonido dramático a composiciones en tonalidades menores. Es una escala muy versátil usada en clásico, flamenco, metal y varios otros géneros.',
    harmonicCta: 'Ver Menor Armónica en el Diapasón',
    harmonicViewA: 'Ver A Menor Armónica',
    harmonicViewE: 'Ver E Menor Armónica',

    // Artículo de Práctica de Escalas
    practiceTitle: 'Guía de Práctica de Escalas para Principiantes [Métodos Eficientes]',
    practiceDesc: 'Aprende métodos de práctica eficientes para memorizar escalas. Consejos para evitar la frustración y guía paso a paso para principiantes.',
    practiceIntro: 'Por qué la Práctica de Escalas es Importante',
    practiceIntroDesc: 'Las escalas son la base de tocar guitarra, formando los cimientos para improvisación, composición y transcripción. Sin embargo, practicar al azar no mejorará la eficiencia. Un enfoque estructurado y paso a paso es el camino más rápido hacia la mejora.',
    practiceStep1: 'Paso 1: Comienza con Pentatónica',
    practiceStep1Desc: 'No intentes aprender escalas de 7 notas inmediatamente. Comienza con la escala pentatónica de 5 notas. Es más fácil de aprender y se usa comúnmente en canciones reales.',
    practiceStep1List: [
      'Aprende la primera posición de A menor pentatónica',
      'Practica ascendiendo y descendiendo con metrónomo',
      'Comienza a 60 BPM y aumenta gradualmente el tempo',
      'Practica al menos 15 minutos diarios hasta que los dedos se muevan suavemente',
    ],
    practiceStep2: 'Paso 2: Añade Más Posiciones',
    practiceStep2Desc: 'Una vez que puedas tocar una posición, desafíate con la siguiente. El objetivo es tocar escalas en todo el diapasón.',
    practiceStep2List: [
      'Aprende las 5 posiciones pentatónicas en orden',
      'Practica transiciones suaves entre posiciones',
      'Toca la misma frase en diferentes posiciones',
      'Entiende visualmente los patrones de escala en el diapasón',
    ],
    practiceStep3: 'Paso 3: Expande a Escalas de 7 Notas',
    practiceStep3Desc: 'Una vez cómodo con pentatónica, desafíate con escalas de 7 notas como mayor o menor natural.',
    practiceStep3List: [
      'Comienza con la escala de C mayor',
      'Practica notando las diferencias con pentatónica',
      'Usa patrones de 3 notas por cuerda',
      'Canta los grados (1,2,3,4,5,6,7) mientras tocas',
    ],
    practiceStep4: 'Paso 4: Aplica a Música Real',
    practiceStep4Desc: 'Es importante practicar usando escalas sobre canciones reales y pistas de acompañamiento, no solo memorizarlas.',
    practiceStep4List: [
      'Improvisa sobre pistas de YouTube',
      'Copia solos de tus canciones favoritas',
      'Crea melodías simples usando notas de la escala',
      'Practica transposición tocando la misma frase en diferentes tonalidades',
    ],
    practiceTips: 'Consejos para Evitar la Frustración',
    practiceTipsList: [
      'Practica un poco (15-30 minutos) todos los días',
      'No intentes aprender demasiado de una vez',
      'Usa metrónomo para desarrollar ritmo preciso',
      'Grábate y escucha objetivamente',
      'Comienza con escalas relacionadas a tus canciones o géneros favoritos',
    ],
    practiceSummary: 'Resumen',
    practiceSummaryDesc: 'La práctica de escalas es constante pero definitivamente lleva a la mejora. Avanza paso a paso sin prisa, y practica con la intención de usar las escalas en música real. Usa la función de visualización de escalas de este sitio para practicar eficientemente.',
    practiceCta: 'Usar Visualizador de Escalas',

    // Política de Privacidad
    privacyTitle: 'Política de Privacidad',
    privacyIntro: 'Maestro de Escalas de Guitarra ("este sitio") establece esta Política de Privacidad respecto al manejo de información personal de los usuarios.',
    privacySection1: '1. Información que Recopilamos',
    privacySection1List: [
      'Información ingresada en el formulario de contacto (nombre, correo electrónico, contenido de consulta)',
      'Archivos de audio subidos para análisis (eliminados automáticamente después del análisis)',
      'Información de registro de acceso (dirección IP, tipo de navegador, fecha/hora de acceso, etc.)',
      'Información de cookies',
    ],
    privacySection2: '2. Propósito de Uso',
    privacySection2List: [
      'Responder a consultas',
      'Proveer y operar el servicio',
      'Mejorar el servicio y desarrollar nuevas funciones',
      'Análisis de uso',
      'Prevenir uso no autorizado',
    ],
    privacySection3: '3. Divulgación a Terceros',
    privacySection3Desc: 'Este sitio no proporcionará información personal de usuarios a terceros excepto en los siguientes casos:',
    privacySection3List: [
      'Con consentimiento del usuario',
      'Cuando lo requiera la ley',
      'Cuando sea necesario para proteger vida, cuerpo o propiedad',
    ],
    privacySection4: '4. Uso de Cookies',
    privacySection4Desc: 'Este sitio usa cookies para mejorar la experiencia del usuario y para análisis de acceso. Puedes rechazar cookies a través de la configuración del navegador, pero algunas funciones pueden no estar disponibles.',
    privacySection5: '5. Herramientas de Análisis',
    privacySection5Desc: 'Este sitio puede usar Google Analytics para análisis de acceso. Google Analytics usa cookies para recopilar datos de uso del sitio. Esta información se recopila anónimamente y no identifica individuos.',
    privacySection6: '6. Publicidad',
    privacySection6Desc1: 'Este sitio usa servicios de publicidad de terceros (Google AdSense). Los anunciantes pueden usar cookies para mostrar anuncios basados en intereses del usuario.',
    privacySection6Desc2: 'Para detalles sobre Google AdSense, por favor consulta las políticas de publicidad de Google.',
    privacySection6Desc3: 'Los usuarios pueden deshabilitar anuncios personalizados en la configuración de anuncios de Google.',
    privacySection7: '7. Archivos Subidos',
    privacySection7Desc: 'Los archivos de audio subidos para análisis se almacenan temporalmente en el servidor para procesamiento pero se eliminan automáticamente después del análisis. Los archivos subidos no se comparten con terceros ni se usan para propósitos distintos al análisis.',
    privacySection8: '8. Seguridad',
    privacySection8Desc: 'Este sitio implementa medidas de seguridad necesarias y apropiadas para prevenir fuga, pérdida y daño de información personal.',
    privacySection9: '9. Descargo de Responsabilidad',
    privacySection9Desc1: 'Aunque nos esforzamos por la precisión, este sitio no asume responsabilidad por acciones tomadas basadas en la información proporcionada.',
    privacySection9Desc2: 'Este sitio no asume responsabilidad por información o servicios proporcionados por sitios externos accedidos a través de enlaces o banners.',
    privacySection10: '10. Derechos de Autor',
    privacySection10Desc: 'Los derechos de autor del contenido de este sitio (texto, imágenes, programas, etc.) pertenecen a este sitio o a titulares de derechos de terceros legítimos. La reproducción, reimpresión o modificación no autorizada está prohibida.',
    privacySection11: '11. Cambios de Política',
    privacySection11Desc: 'Este sitio puede cambiar esta política según sea necesario. La política de privacidad actualizada entra en vigor cuando se publica en este sitio.',
    privacySection12: '12. Contacto',
    privacySection12Desc: 'Para consultas sobre esta política, por favor usa el formulario de contacto.',
    privacyEnacted: 'Establecido: 1 de enero de 2025',
    privacyUpdated: 'Última Actualización: 15 de enero de 2025',

    // Información de la Empresa
    companyTitle: 'Información de la Empresa',
    companySection1: 'Empresa Operadora',
    companyName: 'Nombre de la Empresa',
    companyNameEn: 'Nombre en Inglés',
    companyOfficialSite: 'Sitio Oficial',
    companySection2: 'Descripción del Negocio',
    companyBusinessDesc: 'Motechoro Co., Ltd. opera con la misión de "mejorar el QOML (Calidad de Vida Musical) para todos", proporcionando varios servicios a través de la música.',
    companyBusinessList: [
      'Conferencias y talleres para comunidades, escuelas y empresas',
      'Servicios de conserjería de actividades musicales',
      'Planificación y gestión de contenido de entretenimiento',
      'Sesiones JAM y eventos de colaboración musical',
      'Desarrollo y operación de servicios web relacionados con música',
    ],
    companySection3: 'Sobre Este Servicio',
    companyServiceDesc1: 'Maestro de Escalas de Guitarra es una aplicación web gratuita desarrollada y operada por Motechoro Co., Ltd. para apoyar a guitarristas en su práctica y composición.',
    companyServiceDesc2: 'Además de mostrar escalas visualmente en el diapasón, cuenta con análisis de IA que detecta automáticamente tonalidad y escala desde audio. Apoyando la vida musical de todos los guitarristas, desde principiantes hasta profesionales.',
    companySection4: 'Contacto',
    companyContactDesc: 'Para consultas sobre este servicio, por favor usa lo siguiente:',
    companyContactForm: 'Formulario de Contacto',
    companyOfficialSiteBtn: 'Sitio Oficial de la Empresa',

    // Contacto
    contactTitle: 'Contacto',
    contactDesc: 'Para preguntas, solicitudes o reportes de errores sobre Maestro de Escalas de Guitarra, por favor contáctanos usando el formulario a continuación.',
    contactNotes: 'Sobre Consultas',
    contactNote1: 'Típicamente respondemos dentro de 3 días hábiles.',
    contactNote2: 'Dependiendo del contenido, las respuestas pueden tomar tiempo adicional.',
    contactNote3: 'No podemos responder a solicitudes comerciales.',

    // 利用規約ページ
    termsTitle: 'Términos de Servicio',
    termsIntro: 'Estos Términos de Servicio (en adelante "Términos") establecen las condiciones de uso de "Maestro de Escalas de Guitarra" (en adelante "Servicio") proporcionado por Motekoro Inc. (en adelante "Empresa"). Por favor, lea estos Términos cuidadosamente antes de usar el Servicio.',
    termsSection1: 'Artículo 1 (Ámbito de Aplicación)',
    termsSection1Desc: 'Estos Términos tienen como objetivo definir los derechos y obligaciones entre la Empresa y los usuarios respecto al uso del Servicio, y se aplican a todas las relaciones entre usuarios y la Empresa en conexión con el uso del Servicio.',
    termsSection2: 'Artículo 2 (Descripción del Servicio)',
    termsSection2List: [
      'Función de visualización de escalas de guitarra',
      'Análisis automático de escalas desde archivos de audio',
      'Función de reproducción de escalas',
      'Contenido educativo sobre escalas',
      'Otros servicios relacionados proporcionados por la Empresa',
    ],
    termsSection3: 'Artículo 3 (Actividades Prohibidas)',
    termsSection3List: [
      'Acciones que violen las leyes o el orden público y la moral',
      'Acciones que infrinjan los derechos de propiedad intelectual, privacidad, reputación u otros derechos de la Empresa o terceros',
      'Acciones que interfieran con la operación del Servicio',
      'Acciones que causen inconvenientes a otros usuarios',
      'Uso comercial del Servicio sin permiso previo de la Empresa',
      'Ingeniería inversa, descompilación o desensamblaje del Servicio',
      'Acceso mediante herramientas automatizadas',
      'Otras acciones consideradas inapropiadas por la Empresa',
    ],
    termsSection4: 'Artículo 4 (Derechos de Propiedad Intelectual)',
    termsSection4Desc: 'Todos los derechos de propiedad intelectual relacionados con el Servicio pertenecen a la Empresa o a los legítimos titulares de derechos. La licencia para usar el Servicio bajo estos Términos no implica permiso para usar la propiedad intelectual de la Empresa o los legítimos titulares de derechos.',
    termsSection5: 'Artículo 5 (Descargo de Responsabilidad)',
    termsSection5Desc: 'La Empresa no garantiza, expresa o implícitamente, que el Servicio cumpla con los propósitos específicos de los usuarios, tenga la funcionalidad, precisión o utilidad esperada, cumpla con las leyes aplicables, esté disponible continuamente o esté libre de defectos. La Empresa no será responsable por ningún daño derivado del Servicio.',
    termsSection6: 'Artículo 6 (Cambios y Suspensión del Servicio)',
    termsSection6Desc: 'La Empresa puede cambiar, suspender o descontinuar el Servicio sin previo aviso a los usuarios.',
    termsSection7: 'Artículo 7 (Cambios en los Términos de Servicio)',
    termsSection7Desc: 'La Empresa puede cambiar estos Términos en cualquier momento sin previo aviso cuando lo considere necesario. Los Términos revisados entrarán en vigor tras su publicación en el Servicio.',
    termsSection8: 'Artículo 8 (Ley Aplicable y Jurisdicción)',
    termsSection8Desc: 'Estos Términos se regirán e interpretarán de acuerdo con las leyes de Japón. Cualquier disputa relacionada con el Servicio estará sujeta a la jurisdicción exclusiva del Tribunal de Distrito de Tokio como tribunal de primera instancia.',
    termsEnacted: 'Fecha de vigencia: 15 de enero de 2025',
    termsUpdated: 'Última actualización: 25 de enero de 2025',
    termsOfService: 'Términos de Servicio',

    // メインページ説明セクション
    homeAboutTitle: '¿Qué es Maestro de Escalas de Guitarra?',
    homeAboutDesc: 'Una aplicación web gratuita para aprender escalas de guitarra visualmente. Muestra más de 13 tipos de escalas en el diapasón de la guitarra, conectando teoría y práctica.',
    homeFeature1: 'Visualización de Escalas',
    homeFeature1Desc: 'Muestra escalas mayores, menores, pentatónicas, modales y otras escalas esenciales para guitarristas en el diapasón. Las notas raíz y los tonos de escala son instantáneamente reconocibles.',
    homeFeature2: 'Análisis de Audio',
    homeFeature2Desc: 'Solo sube un archivo de audio y la IA detectará automáticamente la tonalidad y escala de la canción. Identifica rápidamente la escala de cualquier canción que quieras tocar.',
    homeFeature3: 'Reproducción de Escalas',
    homeFeature3Desc: 'Escucha la escala seleccionada en tiempo real. Aprende escalas con ojos y oídos para una práctica más eficiente.',
    homeTargetUsers: 'Recomendado Para',
    homeTargetList: [
      'Principiantes que quieren aprender a memorizar escalas',
      'Guitarristas que buscan practicar improvisación y solos',
      'Compositores y arreglistas que quieren conocer la tonalidad y escala de una canción',
      'Cualquiera que quiera profundizar su comprensión de la teoría musical',
    ],

    // Página 404
    notFoundTitle: 'Página No Encontrada',
    notFoundMessage: 'La página que busca no existe o puede haber sido movida.',
    notFoundBackHome: 'Volver al Inicio',
  },
};

export function getTranslation(lang: Language): Translations {
  return translations[lang];
}
