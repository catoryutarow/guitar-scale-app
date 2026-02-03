/**
 * 音源解析機能の型定義
 *
 * このファイルでは、音源アップロード・解析・結果表示に関連する
 * すべての型を定義しています。
 */

// ============================================
// API リクエスト・レスポンス型
// ============================================

/**
 * アップロードAPI のレスポンス型
 */
export interface UploadResponse {
  success: boolean;
  jobId: string;                              // 解析ジョブID（例: "job_abc123xyz"）
  estimatedTime: number;                      // 推定処理時間（秒）
  status: 'queued' | 'processing' | 'completed' | 'failed';
  filePath?: string;                          // ローカル一時ファイルパス（開発用）
  fileUrl?: string;                           // クラウドストレージURL（本番用）
  fileInfo?: UploadedFileInfo;                // アップロードされたファイルの詳細情報
  error?: string;                             // エラーメッセージ（失敗時）
}

/**
 * アップロードされたファイルの情報
 */
export interface UploadedFileInfo {
  jobId: string;                              // ジョブID
  originalFileName: string;                   // 元のファイル名
  mimeType: string;                           // MIMEタイプ（例: "audio/mpeg"）
  size: number;                               // ファイルサイズ（バイト）
  storedFilePath?: string;                    // 保存先パス（ローカル or URL）
  uploadedAt: string;                         // アップロード日時（ISO 8601形式）
}

/**
 * 解析結果取得API のレスポンス型
 */
export interface AnalysisResponse {
  success: boolean;
  jobId: string;
  status: 'processing' | 'completed' | 'failed';
  progress?: number;                          // 0-100（処理中の場合）
  result?: AnalysisResult;                    // 解析結果（完了時）
  error?: string;                             // エラーメッセージ（失敗時）
}

// ============================================
// 解析結果の型
// ============================================

/**
 * 音源解析結果の全体構造
 */
export interface AnalysisResult {
  metadata: AnalysisMetadata;                 // メタデータ（キー、テンポ等）
  chordProgression: ChordInfo[];              // コード進行のタイムライン
  stems?: StemUrls;                           // stem分解結果（オプション）
  scaleMatch: ScaleMatchResult;               // スケールマッチング結果
}

/**
 * 検出されたキー情報（転調対応）
 */
export interface DetectedKeyInfo {
  key: string;                                // キー（例: "G"）
  scale: string;                              // スケール（例: "メジャー"）
  confidence: number;                         // 信頼度 0.0-1.0
  occurrence: number;                         // 出現割合 0.0-1.0
}

/**
 * 音源のメタデータ
 */
export interface AnalysisMetadata {
  duration: number;                           // 曲の長さ（秒）
  tempo: number;                              // BPM
  timeSignature: string;                      // 拍子（例: "4/4"）
  detectedKey: string;                        // 推定キー（例: "G"）- 主要キー
  scale: string;                              // 推定スケール（例: "メジャー"）
  confidence: number;                         // 信頼度 0.0-1.0
  detectedKeys?: DetectedKeyInfo[];           // 複数キー検出時（転調がある曲）
}

/**
 * コード情報（タイムライン上の1つのコード）
 */
export interface ChordInfo {
  startTime: number;                          // 開始時刻（秒）
  endTime: number;                            // 終了時刻（秒）
  chord: string;                              // コード名（例: "Gmaj7"）
  rootNote: string;                           // ルート音（例: "G"）
  quality: string;                            // コード品質（例: "maj7", "min", "dim"）
  confidence: number;                         // 信頼度 0.0-1.0
}

/**
 * stem分解結果のURL
 */
export interface StemUrls {
  vocals: string;                             // ボーカルトラックのURL or base64
  drums: string;                              // ドラムトラックのURL
  bass: string;                               // ベーストラックのURL
  other: string;                              // その他のトラックのURL
}

/**
 * スケールマッチング結果
 */
export interface ScaleMatchResult {
  matchingScales: ScaleMatchInfo[];           // マッチしたスケールのリスト
}

/**
 * 個別のスケールマッチ情報
 */
export interface ScaleMatchInfo {
  scale: string;                              // スケール名（例: "メジャー"）
  rootNote: string;                           // ルート音（例: "G"）
  matchRate: number;                          // マッチ率 0.0-1.0
  matchingChords: string[];                   // マッチしたコード名の配列
}

// ============================================
// コンポーネント Props 型
// ============================================

/**
 * AudioAnalyzer コンポーネントの Props
 */
export interface AudioAnalyzerProps {
  onScaleSelect: (rootNote: string, scaleName: string) => void;  // スケール切り替えコールバック
}

/**
 * FileUploadZone コンポーネントの Props
 */
export interface FileUploadZoneProps {
  onFileSelect: (file: File) => void;         // ファイル選択時のコールバック
  selectedFile: File | null;                  // 現在選択中のファイル
  disabled?: boolean;                         // 無効化フラグ
}

/**
 * AnalysisProgress コンポーネントの Props
 */
export interface AnalysisProgressProps {
  progress: number;                           // 進捗率 0-100
  status: 'uploading' | 'analyzing' | 'completed';  // 処理状態
  message?: string;                           // 表示メッセージ
}

/**
 * ChordTimeline コンポーネントの Props
 */
export interface ChordTimelineProps {
  chordProgression: ChordInfo[];              // コード進行データ
  currentTime?: number;                       // 現在の再生位置（秒）
  onSeek?: (time: number) => void;            // シーク時のコールバック（オプション）
}

/**
 * ScaleMatchCard コンポーネントの Props
 */
export interface ScaleMatchCardProps {
  matchingScales: ScaleMatchInfo[];           // マッチしたスケールのリスト
  onScaleSelect: (rootNote: string, scaleName: string) => void;  // スケール選択時のコールバック
  currentRootNote?: string;                   // 現在選択中のルート音（ハイライト用）
  currentScale?: string;                      // 現在選択中のスケール（ハイライト用）
}

// ============================================
// ユーティリティ型
// ============================================

/**
 * 解析状態の型
 */
export type AnalysisStatus = 'idle' | 'uploading' | 'queued' | 'processing' | 'completed' | 'failed';

/**
 * 対応する音源ファイル形式
 */
export const SUPPORTED_AUDIO_FORMATS = [
  'audio/mpeg',        // .mp3
  'audio/wav',         // .wav
  'audio/wave',        // .wav
  'audio/x-wav',       // .wav
  'audio/mp4',         // .m4a
  'audio/x-m4a',       // .m4a
  'audio/flac',        // .flac
  'audio/ogg',         // .ogg
] as const;

/**
 * ファイルサイズ制限（バイト）
 */
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
