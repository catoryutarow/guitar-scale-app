/**
 * ファイルストレージ ユーティリティ
 *
 * 役割：
 * - 音源ファイルの保存処理を一元管理
 * - ローカル開発環境では /tmp に保存
 * - 本番環境ではクラウドストレージ（Vercel Blob / AWS S3 等）に保存する想定
 * - 後からストレージ先を変更しやすいようにインターフェースを統一
 */

import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { put } from '@vercel/blob';

const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

// 環境変数で保存先を切り替え可能にする
const STORAGE_MODE = process.env.STORAGE_MODE || 'local'; // 'local' | 'vercel-blob' | 's3'
const TMP_DIR = process.env.TMP_DIR || '/tmp';

/**
 * ファイル保存結果の型
 */
export interface SaveFileResult {
  success: boolean;
  filePath?: string;      // ローカルファイルパス
  fileUrl?: string;       // クラウドストレージのURL
  error?: string;         // エラーメッセージ
}

/**
 * 音源ファイルを保存する
 *
 * @param file - アップロードされたファイル（File or Buffer）
 * @param jobId - ジョブID（ファイル名に使用）
 * @param originalFileName - 元のファイル名（拡張子取得用）
 * @returns 保存結果
 */
export async function saveAudioFile(
  file: File,
  jobId: string,
  originalFileName: string
): Promise<SaveFileResult> {
  try {
    // ファイル拡張子を取得
    const ext = path.extname(originalFileName) || '.mp3';

    // ストレージモードに応じて処理を分岐
    switch (STORAGE_MODE) {
      case 'local':
        return await saveToLocal(file, jobId, ext);

      case 'vercel-blob':
        return await saveToVercelBlob(file, jobId, ext);

      case 's3':
        // TODO: AWS S3への保存処理を実装
        // import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
        throw new Error('AWS S3 はまだ実装されていません');

      default:
        return await saveToLocal(file, jobId, ext);
    }
  } catch (error) {
    console.error('File save error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'ファイルの保存に失敗しました',
    };
  }
}

/**
 * ローカルファイルシステム（/tmp）に保存
 *
 * @param file - アップロードされたファイル
 * @param jobId - ジョブID
 * @param ext - ファイル拡張子
 * @returns 保存結果
 */
async function saveToLocal(
  file: File,
  jobId: string,
  ext: string
): Promise<SaveFileResult> {
  try {
    // /tmp ディレクトリが存在することを確認（なければ作成）
    try {
      await mkdir(TMP_DIR, { recursive: true });
    } catch (mkdirError) {
      // すでに存在する場合は無視
      if ((mkdirError as NodeJS.ErrnoException).code !== 'EEXIST') {
        throw mkdirError;
      }
    }

    // ファイル名を生成
    const fileName = `audio-${jobId}${ext}`;
    const filePath = path.join(TMP_DIR, fileName);

    // FileオブジェクトからArrayBufferを取得してBufferに変換
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // ファイルを保存
    await writeFile(filePath, buffer);

    console.log(`File saved to local: ${filePath}`);

    return {
      success: true,
      filePath,
    };
  } catch (error) {
    console.error('Local file save error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'ローカル保存に失敗しました',
    };
  }
}

/**
 * Vercel Blob Storageに保存
 *
 * @param file - アップロードされたファイル
 * @param jobId - ジョブID
 * @param ext - ファイル拡張子
 * @returns 保存結果
 */
async function saveToVercelBlob(
  file: File,
  jobId: string,
  ext: string
): Promise<SaveFileResult> {
  try {
    const fileName = `audio-${jobId}${ext}`;

    // Vercel Blobにアップロード
    const blob = await put(fileName, file, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    console.log(`File saved to Vercel Blob: ${blob.url}`);

    return {
      success: true,
      fileUrl: blob.url,
    };
  } catch (error) {
    console.error('Vercel Blob save error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Vercel Blob保存に失敗しました',
    };
  }
}

/**
 * 指定されたファイルを削除する
 *
 * @param filePath - 削除するファイルのパス
 * @returns 削除成功の可否
 */
export async function deleteAudioFile(filePath: string): Promise<boolean> {
  try {
    if (STORAGE_MODE === 'local') {
      const unlink = promisify(fs.unlink);
      await unlink(filePath);
      console.log(`File deleted: ${filePath}`);
      return true;
    }

    // TODO: クラウドストレージからの削除処理
    // Vercel Blob: await del(fileUrl);
    // S3: await s3Client.send(new DeleteObjectCommand({ ... }));

    return false;
  } catch (error) {
    console.error('File delete error:', error);
    return false;
  }
}

/**
 * ファイルが存在するかチェックする
 *
 * @param filePath - チェックするファイルのパス
 * @returns ファイルの存在確認結果
 */
export async function fileExists(filePath: string): Promise<boolean> {
  try {
    if (STORAGE_MODE === 'local') {
      const access = promisify(fs.access);
      await access(filePath, fs.constants.F_OK);
      return true;
    }

    // TODO: クラウドストレージでの存在確認
    return false;
  } catch {
    return false;
  }
}

// ============================================
// クラウドストレージ移行のためのメモ
// ============================================

/*
【Vercel Blob Storage への移行手順】

1. 依存関係をインストール：
   npm install @vercel/blob

2. 環境変数を設定（.env.local）：
   BLOB_READ_WRITE_TOKEN=vercel_blob_xxxxx
   STORAGE_MODE=vercel-blob

3. saveToVercelBlob() 関数を実装：
   import { put } from '@vercel/blob';

   const blob = await put(`audio-${jobId}${ext}`, file, {
     access: 'public',
     token: process.env.BLOB_READ_WRITE_TOKEN,
   });

   return { success: true, fileUrl: blob.url };

4. deleteAudioFile() に削除処理を追加：
   import { del } from '@vercel/blob';
   await del(fileUrl);


【AWS S3 への移行手順】

1. 依存関係をインストール：
   npm install @aws-sdk/client-s3

2. 環境変数を設定：
   AWS_ACCESS_KEY_ID=xxxxx
   AWS_SECRET_ACCESS_KEY=xxxxx
   AWS_REGION=ap-northeast-1
   S3_BUCKET_NAME=my-audio-bucket
   STORAGE_MODE=s3

3. saveToS3() 関数を実装：
   import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

   const s3Client = new S3Client({ region: process.env.AWS_REGION });
   const command = new PutObjectCommand({
     Bucket: process.env.S3_BUCKET_NAME,
     Key: `audio-${jobId}${ext}`,
     Body: buffer,
     ContentType: file.type,
   });

   await s3Client.send(command);
   const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/audio-${jobId}${ext}`;

   return { success: true, fileUrl };
*/
