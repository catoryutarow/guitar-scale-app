/**
 * YouTube動画データ定義
 *
 * このファイルでは、各ルート音×スケールの組み合わせに紐づくYouTube動画の情報を管理しています。
 * 動画を追加・編集する場合は、SCALE_YOUTUBE_MAP オブジェクトを編集してください。
 *
 * 編集方法：
 * 1. 追加したいルート音とスケールの組み合わせのキーを探す（例: 'G-メジャー'）
 * 2. 配列に新しい動画オブジェクトを追加
 *    - id: YouTube動画のID（URLの v= 以降の部分）
 *    - title: 動画のタイトル
 *    - url: YouTube動画の完全なURL
 *
 * 注意：
 * - キーは「ルート音-スケール名」の形式（例: 'G-メジャー', 'A-マイナー'）
 * - エンハーモニック（C#/Db等）は自動で共通化されます
 *   （例: 'Db-メジャー' は内部的に 'C#-メジャー' と同じ動画を参照）
 */

// YouTube動画の型定義
export type YoutubeVideo = {
  id: string;        // YouTube動画ID（例: "dQw4w9WgXcQ"）
  title: string;     // 動画のタイトル
  url: string;       // YouTube動画のURL（例: "https://www.youtube.com/watch?v=..."）
};

// スケール名をキーとした動画マッピングの型
export type ScaleYoutubeMap = {
  [key: string]: YoutubeVideo[];  // キー形式: 'ルート音-スケール名' (例: 'G-メジャー')
};

// スケール名の定義（lib/scales.tsと同じ順序）
const SCALE_NAMES = [
  'メジャー',
  'マイナー',
  'ドリアン',
  'ミクソリディアン',
  'フリジアン',
  'リディア',
  'ロクリアン',
  'ハーモニックマイナー',
  'メロディックマイナー',
  'ブルース',
  'メジャーペンタトニック',
  'マイナーペンタトニック',
  '都節音階',
];

// ルート音の定義（♯系に統一、エンハーモニックは正規化関数で処理）
const ROOT_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

/**
 * エンハーモニック（異名同音）を正規化
 * ♭系の音名を♯系に統一します
 *
 * @param note - 音名（例: 'Db', 'C#'）
 * @returns 正規化された音名（♯系、例: 'C#'）
 */
export function normalizeEnharmonic(note: string): string {
  const enharmonicMap: { [key: string]: string } = {
    'Db': 'C#',
    'Eb': 'D#',
    'Gb': 'F#',
    'Ab': 'G#',
    'Bb': 'A#',
    'Cb': 'B',
    'E#': 'F',
    'B#': 'C',
    'Fb': 'E',
  };

  return enharmonicMap[note] || note;
}

/**
 * ルート音とスケール名から動画マップのキーを生成
 *
 * @param rootNote - ルート音（例: 'G', 'Db'）
 * @param scaleName - スケール名（例: 'メジャー'）
 * @returns キー文字列（例: 'G-メジャー', 'C#-メジャー'）
 */
export function getVideoKey(rootNote: string, scaleName: string): string {
  const normalizedRoot = normalizeEnharmonic(rootNote);
  return `${normalizedRoot}-${scaleName}`;
}

/**
 * すべてのルート音×スケールの組み合わせを生成する関数
 * 156通り（12音×13スケール）のエントリを自動生成
 */
function generateAllCombinations(): ScaleYoutubeMap {
  const map: ScaleYoutubeMap = {};

  for (const root of ROOT_NOTES) {
    for (const scale of SCALE_NAMES) {
      const key = `${root}-${scale}`;
      map[key] = [];  // 初期値は空配列
    }
  }

  return map;
}

/**
 * スケール別YouTube動画マッピング
 *
 * 各ルート音×スケールの組み合わせに対応する参考曲・教材動画を定義します。
 * 動画がない組み合わせは空配列 [] になっています。
 *
 * すべての組み合わせ（156通り）が自動生成されています。
 * 動画を追加したい場合は、該当するキーの配列に動画オブジェクトを追加してください。
 *
 * 例：
 * 'G-メジャー': [
 *   {
 *     id: 'VIDEO_ID',
 *     title: 'Gメジャースケールの練習曲',
 *     url: 'https://www.youtube.com/watch?v=VIDEO_ID'
 *   }
 * ],
 */
export const SCALE_YOUTUBE_MAP: ScaleYoutubeMap = generateAllCombinations();

// メジャースケールの参考動画
SCALE_YOUTUBE_MAP['C-メジャー'] = [
  {
    id: 'BNVbWDIT4eo',
    title: 'C Major Scale',
    url: 'https://www.youtube.com/watch?v=BNVbWDIT4eo'
  }
];

SCALE_YOUTUBE_MAP['C#-メジャー'] = [
  {
    id: '6Dn6DTE-xlM',
    title: 'C# Major Scale',
    url: 'https://www.youtube.com/watch?v=6Dn6DTE-xlM'
  }
];

SCALE_YOUTUBE_MAP['D-メジャー'] = [
  {
    id: 'HoR-wGfJU08',
    title: 'D Major Scale',
    url: 'https://www.youtube.com/watch?v=HoR-wGfJU08'
  }
];

SCALE_YOUTUBE_MAP['D#-メジャー'] = [
  {
    id: 'tHpg-veuvpA',
    title: 'D# Major Scale',
    url: 'https://www.youtube.com/watch?v=tHpg-veuvpA'
  }
];

SCALE_YOUTUBE_MAP['E-メジャー'] = [
  {
    id: 'a-u6Q4Vzhjg',
    title: 'E Major Scale',
    url: 'https://www.youtube.com/watch?v=a-u6Q4Vzhjg'
  }
];

SCALE_YOUTUBE_MAP['F-メジャー'] = [
  {
    id: 'wKbg6iDSXJQ',
    title: 'F Major Scale',
    url: 'https://www.youtube.com/watch?v=wKbg6iDSXJQ'
  }
];

SCALE_YOUTUBE_MAP['F#-メジャー'] = [
  {
    id: 'BRarPwy0O-U',
    title: 'F# Major Scale',
    url: 'https://www.youtube.com/watch?v=BRarPwy0O-U'
  }
];

SCALE_YOUTUBE_MAP['G-メジャー'] = [
  {
    id: 'xVLjezAhDS8',
    title: 'G Major Scale',
    url: 'https://www.youtube.com/watch?v=xVLjezAhDS8'
  }
];

SCALE_YOUTUBE_MAP['G#-メジャー'] = [
  {
    id: 'u0hFi65uYg8',
    title: 'G# Major Scale',
    url: 'https://www.youtube.com/watch?v=u0hFi65uYg8'
  }
];

SCALE_YOUTUBE_MAP['A-メジャー'] = [
  {
    id: '78-nA8U6Rj8',
    title: 'A Major Scale',
    url: 'https://www.youtube.com/watch?v=78-nA8U6Rj8'
  }
];

SCALE_YOUTUBE_MAP['A#-メジャー'] = [
  {
    id: 'i4vK-x69AJ8',
    title: 'A# Major Scale',
    url: 'https://www.youtube.com/watch?v=i4vK-x69AJ8'
  }
];

SCALE_YOUTUBE_MAP['B-メジャー'] = [
  {
    id: 'LDyNr3jP3ZE',
    title: 'B Major Scale',
    url: 'https://www.youtube.com/watch?v=LDyNr3jP3ZE'
  }
];

// マイナースケールの参考動画
SCALE_YOUTUBE_MAP['C-マイナー'] = [
  {
    id: '9oMJHUkWOLE',
    title: 'C Minor Scale',
    url: 'https://www.youtube.com/watch?v=9oMJHUkWOLE'
  }
];

SCALE_YOUTUBE_MAP['C#-マイナー'] = [
  {
    id: 'Ieu0elFHuv4',
    title: 'C# Minor Scale',
    url: 'https://www.youtube.com/watch?v=Ieu0elFHuv4'
  }
];

SCALE_YOUTUBE_MAP['D-マイナー'] = [
  {
    id: 'RRuL6f75Hsw',
    title: 'D Minor Scale',
    url: 'https://www.youtube.com/watch?v=RRuL6f75Hsw'
  }
];

SCALE_YOUTUBE_MAP['D#-マイナー'] = [
  {
    id: 'Tw2HGQdyvfY',
    title: 'D# Minor Scale',
    url: 'https://www.youtube.com/watch?v=Tw2HGQdyvfY'
  }
];

SCALE_YOUTUBE_MAP['E-マイナー'] = [
  {
    id: 'bhqp2LpnyOc',
    title: 'E Minor Scale',
    url: 'https://www.youtube.com/watch?v=bhqp2LpnyOc'
  }
];

SCALE_YOUTUBE_MAP['F-マイナー'] = [
  {
    id: 'yEFIftyE-og',
    title: 'F Minor Scale',
    url: 'https://www.youtube.com/watch?v=yEFIftyE-og'
  }
];

SCALE_YOUTUBE_MAP['F#-マイナー'] = [
  {
    id: 'TsSxSZ8h4ak',
    title: 'F# Minor Scale',
    url: 'https://www.youtube.com/watch?v=TsSxSZ8h4ak'
  }
];

SCALE_YOUTUBE_MAP['G-マイナー'] = [
  {
    id: '2gjI2brnvtQ',
    title: 'G Minor Scale',
    url: 'https://www.youtube.com/watch?v=2gjI2brnvtQ'
  }
];

SCALE_YOUTUBE_MAP['G#-マイナー'] = [
  {
    id: 'y_NMsAJ17RU',
    title: 'G# Minor Scale',
    url: 'https://www.youtube.com/watch?v=y_NMsAJ17RU'
  }
];

SCALE_YOUTUBE_MAP['A-マイナー'] = [
  {
    id: '1O-8KHd7i2o',
    title: 'A Minor Scale',
    url: 'https://www.youtube.com/watch?v=1O-8KHd7i2o'
  }
];

SCALE_YOUTUBE_MAP['A#-マイナー'] = [
  {
    id: 'rYQgVYRK9LM',
    title: 'A# Minor Scale',
    url: 'https://www.youtube.com/watch?v=rYQgVYRK9LM'
  }
];

SCALE_YOUTUBE_MAP['B-マイナー'] = [
  {
    id: 'm6fpnACLZ6s',
    title: 'B Minor Scale',
    url: 'https://www.youtube.com/watch?v=m6fpnACLZ6s'
  }
];

/*
SCALE_YOUTUBE_MAP['G-メジャー'] = [
  {
    id: 'pAgnJDJN4VA',
    title: 'Gメジャースケールの基礎練習',
    url: 'https://www.youtube.com/watch?v=example123'
  }
];

SCALE_YOUTUBE_MAP['A-マイナー'] = [
  {
    id: 'example456',
    title: 'Aマイナースケールを使った名曲',
    url: 'https://www.youtube.com/watch?v=example456'
  }
];

// 複数の動画を追加する例
SCALE_YOUTUBE_MAP['C-ブルース'] = [
  {
    id: 'blues1',
    title: 'Cブルーススケール入門',
    url: 'https://www.youtube.com/watch?v=blues1'
  },
  {
    id: 'blues2',
    title: 'Cブルーススケールでアドリブ',
    url: 'https://www.youtube.com/watch?v=blues2'
  }
];
*/

/**
 * YouTube動画URLから埋め込み用URLを生成
 *
 * @param url - YouTube動画のURL（例: "https://www.youtube.com/watch?v=VIDEO_ID"）
 * @returns 埋め込み用URL（例: "https://www.youtube.com/embed/VIDEO_ID"）
 *
 * サポートする形式：
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID (そのまま返す)
 */
export function getYoutubeEmbedUrl(url: string): string {
  try {
    // すでに埋め込みURLの場合はそのまま返す
    if (url.includes('/embed/')) {
      return url;
    }

    // 通常の watch URL の場合
    if (url.includes('watch?v=')) {
      const videoId = url.split('watch?v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    // 短縮URL（youtu.be）の場合
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    // その他の形式の場合は、とりあえず元のURLを返す
    return url;
  } catch (error) {
    console.error('YouTube URL の変換に失敗しました:', error);
    return url;
  }
}

/**
 * 特定のルート音とスケールに紐づく動画を取得
 *
 * @param rootNote - ルート音（例: "G", "Db"）
 * @param scaleName - スケール名（例: "メジャー"）
 * @returns 動画の配列（見つからない場合は空配列）
 *
 * 注意：エンハーモニック（異名同音）は自動で正規化されます
 * 例: rootNote='Db' は内部的に 'C#' として検索されます
 */
export function getVideosForRootAndScale(rootNote: string, scaleName: string): YoutubeVideo[] {
  const key = getVideoKey(rootNote, scaleName);
  return SCALE_YOUTUBE_MAP[key] || [];
}
