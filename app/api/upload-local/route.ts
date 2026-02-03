/**
 * ローカル開発用ファイルアップロード API
 *
 * POST /api/upload-local
 *
 * ローカル開発時に使用。ファイルをpython-backend/uploadsに保存。
 */

import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'ファイルが見つかりません' },
        { status: 400 }
      );
    }

    // ジョブID生成
    const jobId = `job_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    // ファイル名をサニタイズ
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `${jobId}_${sanitizedName}`;

    // 保存先ディレクトリ
    const uploadDir = path.join(process.cwd(), 'python-backend', 'uploads');

    // ディレクトリが存在しない場合は作成
    await mkdir(uploadDir, { recursive: true });

    // ファイルパス
    const filePath = path.join(uploadDir, fileName);

    // ファイルをバッファに読み込んで保存
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    console.log('Local upload completed:', {
      jobId,
      fileName,
      filePath,
      size: file.size,
    });

    // Docker内からアクセスするパス
    const dockerFilePath = `/app/uploads/${fileName}`;

    return NextResponse.json({
      success: true,
      jobId,
      url: dockerFilePath,
      fileName,
      size: file.size,
    });

  } catch (error) {
    console.error('Local upload error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'アップロード処理中にエラーが発生しました'
      },
      { status: 500 }
    );
  }
}
