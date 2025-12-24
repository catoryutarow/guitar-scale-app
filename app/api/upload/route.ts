/**
 * 音源ファイルアップロード API（クライアントアップロード版）
 *
 * POST /api/upload
 *
 * 役割：
 * - クライアントサイドから直接Vercel Blobにアップロードするための署名付きURLを発行
 * - Vercelの4.5MB制限を回避
 *
 * フロー：
 * 1. クライアント → /api/upload にメタデータをPOST
 * 2. サーバー → 署名付きURLを返却
 * 3. クライアント → 署名付きURLに直接ファイルをPUT
 * 4. クライアント → 解析APIを呼び出し
 */

import { NextRequest, NextResponse } from 'next/server';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import type { UploadResponse } from '@/lib/audio-analysis-types';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.json() as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        // ファイル名からジョブIDを生成
        const jobId = `job_${Date.now()}_${Math.random().toString(36).substring(7)}`;

        console.log('Generating upload token:', {
          jobId,
          pathname,
        });

        // 署名付きURLを発行（認証なし、サイズ制限20MB、上書き許可）
        return {
          allowedContentTypes: ['audio/mpeg', 'audio/wav', 'audio/mp4', 'audio/x-m4a', 'audio/flac', 'audio/ogg'],
          maximumSizeInBytes: 20 * 1024 * 1024, // 20MB
          tokenPayload: JSON.stringify({ jobId }),
          allowOverwrite: true,
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log('Upload completed:', {
          url: blob.url,
          pathname: blob.pathname,
          tokenPayload,
        });
      },
    });

    return NextResponse.json(jsonResponse);
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
