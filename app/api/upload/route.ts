/**
 * 音源ファイルアップロード API（本実装版）
 *
 * POST /api/upload
 *
 * 役割：
 * - multipart/form-data で送られてきた音源ファイルを受け取る
 * - ファイルのバリデーション（形式・サイズ）を実施
 * - ローカル（/tmp）またはクラウドストレージにファイルを保存
 * - 保存先情報を含むレスポンスを返却
 *
 * Phase 2 実装内容：
 * - 実際のファイル保存処理
 * - バリデーション強化
 * - エラーハンドリング
 *
 * Phase 3 以降：
 * - Pythonバックエンドへの解析リクエスト送信
 * - ジョブキューへの登録
 */

import { NextRequest, NextResponse } from 'next/server';
import type { UploadResponse, UploadedFileInfo } from '@/lib/audio-analysis-types';
import { SUPPORTED_AUDIO_FORMATS, MAX_FILE_SIZE } from '@/lib/audio-analysis-types';
import { saveAudioFile } from '@/lib/file-storage';

export async function POST(request: NextRequest) {
  try {
    // フォームデータを取得
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    // ===== バリデーション =====

    // 1. ファイルが存在しない場合
    if (!file) {
      const errorResponse: UploadResponse = {
        success: false,
        jobId: '',
        estimatedTime: 0,
        status: 'failed',
        error: 'ファイルが指定されていません',
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // 2. ファイルサイズチェック
    if (file.size > MAX_FILE_SIZE) {
      const errorResponse: UploadResponse = {
        success: false,
        jobId: '',
        estimatedTime: 0,
        status: 'failed',
        error: `ファイルサイズが大きすぎます（最大 ${Math.round(MAX_FILE_SIZE / (1024 * 1024))}MB）`,
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // 3. ファイル形式チェック
    if (!SUPPORTED_AUDIO_FORMATS.includes(file.type as any)) {
      const errorResponse: UploadResponse = {
        success: false,
        jobId: '',
        estimatedTime: 0,
        status: 'failed',
        error: `サポートされていないファイル形式です（${file.type}）。対応形式: MP3, WAV, M4A, FLAC, OGG`,
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // ===== ファイル保存処理 =====

    // ジョブIDを生成
    const jobId = `job_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    console.log('Processing upload:', {
      jobId,
      fileName: file.name,
      type: file.type,
      size: file.size,
    });

    // ファイルを保存（lib/file-storage.tsのユーティリティを使用）
    const saveResult = await saveAudioFile(file, jobId, file.name);

    if (!saveResult.success) {
      const errorResponse: UploadResponse = {
        success: false,
        jobId,
        estimatedTime: 0,
        status: 'failed',
        error: saveResult.error || 'ファイルの保存に失敗しました',
      };
      return NextResponse.json(errorResponse, { status: 500 });
    }

    // ===== ファイル情報の構築 =====

    const fileInfo: UploadedFileInfo = {
      jobId,
      originalFileName: file.name,
      mimeType: file.type,
      size: file.size,
      storedFilePath: saveResult.filePath || saveResult.fileUrl,
      uploadedAt: new Date().toISOString(),
    };

    // ===== レスポンスの返却 =====

    const response: UploadResponse = {
      success: true,
      jobId,
      estimatedTime: 5,  // 推定5秒（仮）
      status: 'queued',
      filePath: saveResult.filePath,
      fileUrl: saveResult.fileUrl,
      fileInfo,
    };

    console.log('Upload successful:', {
      jobId,
      filePath: saveResult.filePath,
      fileUrl: saveResult.fileUrl,
      storedFilePath: fileInfo.storedFilePath,
    });

    // ===== Phase 3 以降で実装予定 =====
    // TODO: Pythonバックエンドへの解析リクエスト送信
    // const analysisResponse = await fetch('http://python-backend/analyze', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     jobId,
    //     audioFileUrl: saveResult.fileUrl || saveResult.filePath,
    //     options: {
    //       separateStems: true,
    //       analysisDepth: 'detailed',
    //     },
    //   }),
    // });

    // TODO: ジョブステータスをデータベースに保存
    // await db.jobs.create({
    //   jobId,
    //   status: 'queued',
    //   fileInfo,
    //   createdAt: new Date(),
    // });

    return NextResponse.json(response);
  } catch (error) {
    console.error('Upload error:', error);

    const errorResponse: UploadResponse = {
      success: false,
      jobId: '',
      estimatedTime: 0,
      status: 'failed',
      error: error instanceof Error ? error.message : 'アップロード処理中にエラーが発生しました',
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

// OPTIONS メソッドのサポート（CORS対応）
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

/*
【Phase 2 で追加した内容】
- 実際のファイル受け取り処理
- バリデーション強化（サイズ・形式チェック）
- lib/file-storage.ts を使ったファイル保存
- UploadedFileInfo の構築
- filePath / fileUrl のレスポンス追加
- エラーハンドリング強化
- 詳細なログ出力

【Phase 3 以降で実装予定】
- Pythonバックエンドへの解析リクエスト送信
- ジョブキューへの登録
- データベースへのジョブ情報保存
- Webhookによる解析完了通知
*/
