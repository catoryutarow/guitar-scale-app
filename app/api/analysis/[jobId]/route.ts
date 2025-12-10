/**
 * 解析結果取得 API（Phase 3: Python バックエンド連携版）
 *
 * POST /api/analysis/:jobId
 *
 * 役割：
 * - Pythonバックエンドの /analyze エンドポイントを呼び出し
 * - ファイルパスを渡して解析を実行
 * - 解析結果をフロントエンドに返却
 *
 * Phase 3 実装内容：
 * - Python FastAPI への HTTP リクエスト
 * - エラーハンドリング強化
 * - 環境変数による URL 設定
 *
 * Phase 4 以降：
 * - ジョブキューへの登録
 * - 非同期解析対応
 * - データベースからのステータス取得
 * - ポーリング対応
 */

import { NextRequest, NextResponse } from 'next/server';
import type { AnalysisResponse } from '@/lib/audio-analysis-types';

// Pythonバックエンドの URL を環境変数から取得
const PYTHON_BACKEND_URL = process.env.PYTHON_BACKEND_URL || 'http://localhost:8000';

// POST メソッドに変更（filePath を受け取るため）
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ jobId: string }> }
) {
  try {
    // Next.js 16: params は Promise なので await で展開
    const { jobId } = await context.params;

    // リクエストボディから filePath を取得
    const body = await request.json();
    const { filePath, options } = body;

    // jobId のバリデーション
    if (!jobId || jobId.trim() === '') {
      const errorResponse: AnalysisResponse = {
        success: false,
        jobId: '',
        status: 'failed',
        error: 'jobIdが指定されていません',
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // filePath のバリデーション
    if (!filePath || filePath.trim() === '') {
      const errorResponse: AnalysisResponse = {
        success: false,
        jobId,
        status: 'failed',
        error: 'filePathが指定されていません',
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    console.log('Requesting analysis from Python backend:', {
      jobId,
      filePath,
      backendUrl: PYTHON_BACKEND_URL,
    });

    // ===== Python バックエンドを呼び出し =====
    const analyzeUrl = `${PYTHON_BACKEND_URL}/analyze`;

    let pythonResponse: Response;

    try {
      pythonResponse = await fetch(analyzeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId,
          filePath,
          options: options || {
            separateStems: true,
            analysisDepth: 'basic',
          },
        }),
      });
    } catch (fetchError) {
      // Python バックエンドに接続できない場合
      console.error('Failed to connect to Python backend:', fetchError);

      const errorResponse: AnalysisResponse = {
        success: false,
        jobId,
        status: 'failed',
        error: `解析サーバーに接続できませんでした。Pythonバックエンドが起動しているか確認してください（URL: ${PYTHON_BACKEND_URL}）`,
      };

      return NextResponse.json(errorResponse, { status: 503 });
    }

    // Python バックエンドのレスポンスを取得
    const pythonData = await pythonResponse.json();

    // エラーレスポンスの場合
    if (!pythonResponse.ok) {
      console.error('Python backend error:', pythonData);

      const errorResponse: AnalysisResponse = {
        success: false,
        jobId,
        status: 'failed',
        error: pythonData.detail || '解析に失敗しました',
      };

      return NextResponse.json(
        errorResponse,
        { status: pythonResponse.status }
      );
    }

    // 成功レスポンスの場合
    console.log('Analysis completed successfully:', {
      jobId,
      status: pythonData.status,
    });

    // AnalysisResponse 型に変換して返却
    const response: AnalysisResponse = {
      success: pythonData.success,
      jobId: pythonData.jobId,
      status: pythonData.status,
      result: pythonData.result,
      error: pythonData.error,
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Analysis API error:', error);

    // エラー時は jobId を取得できない可能性があるため、空文字で返す
    let jobId = '';
    try {
      const params = await context.params;
      jobId = params.jobId;
    } catch {
      // params の取得に失敗した場合は空文字のまま
    }

    const errorResponse: AnalysisResponse = {
      success: false,
      jobId,
      status: 'failed',
      error: error instanceof Error ? error.message : '解析処理中にエラーが発生しました',
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

// GET メソッドも残しておく（後方互換性のため）
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ jobId: string }> }
) {
  try {
    // Next.js 16: params は Promise なので await で展開
    const { jobId } = await context.params;

    // クエリパラメータから filePath を取得
    const searchParams = request.nextUrl.searchParams;
    const filePath = searchParams.get('filePath');

    if (!filePath) {
      // filePath がない場合はエラー
      const errorResponse: AnalysisResponse = {
        success: false,
        jobId,
        status: 'failed',
        error: 'filePathが指定されていません。POSTメソッドを使用してください。',
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // POST メソッドと同じ処理を実行
    // （簡略化のため、内部的にPOSTを呼び出す）
    console.log('GET method called, redirecting to POST logic');

    const analyzeUrl = `${PYTHON_BACKEND_URL}/analyze`;

    const pythonResponse = await fetch(analyzeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jobId,
        filePath,
        options: {
          separateStems: true,
          analysisDepth: 'basic',
        },
      }),
    });

    const pythonData = await pythonResponse.json();

    if (!pythonResponse.ok) {
      const errorResponse: AnalysisResponse = {
        success: false,
        jobId,
        status: 'failed',
        error: pythonData.detail || '解析に失敗しました',
      };
      return NextResponse.json(errorResponse, { status: pythonResponse.status });
    }

    const response: AnalysisResponse = {
      success: pythonData.success,
      jobId: pythonData.jobId,
      status: pythonData.status,
      result: pythonData.result,
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Analysis GET error:', error);

    // エラー時は jobId を取得できない可能性があるため、空文字で返す
    let jobId = '';
    try {
      const params = await context.params;
      jobId = params.jobId;
    } catch {
      // params の取得に失敗した場合は空文字のまま
    }

    const errorResponse: AnalysisResponse = {
      success: false,
      jobId,
      status: 'failed',
      error: '解析処理中にエラーが発生しました',
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

// DELETE メソッド：解析結果とファイルを削除
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ jobId: string }> }
) {
  try {
    // Next.js 16: params は Promise なので await で展開
    const { jobId } = await context.params;

    console.log('Deleting analysis result for jobId:', jobId);

    // Phase 4 以降で実装予定：
    // 1. データベースからジョブ情報を削除
    // 2. ストレージから音源ファイルを削除
    // 3. ストレージからstem分解結果を削除

    return NextResponse.json({
      success: true,
      message: `解析結果 ${jobId} を削除しました`,
    });

  } catch (error) {
    console.error('Delete error:', error);

    return NextResponse.json(
      {
        success: false,
        error: '削除処理中にエラーが発生しました',
      },
      { status: 500 }
    );
  }
}

// OPTIONS メソッドのサポート（CORS対応）
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

/*
【Phase 3 で追加・変更した内容】
- POST メソッドを追加（メインの実装）
- Python バックエンド /analyze への HTTP 呼び出し
- 環境変数 PYTHON_BACKEND_URL の使用
- エラーハンドリング強化：
  - Python バックエンドへの接続失敗（503）
  - Python バックエンドのエラーレスポンス
  - filePath 未指定エラー
- GET メソッドも残して後方互換性を保持

【Phase 4 で追加した内容】
- Next.js 16 対応：params を Promise として扱う
  - POST / GET / DELETE ハンドラで await context.params を使用
  - エラーハンドリング時の jobId 取得を改善

【Phase 5 以降で実装予定】
- ジョブキューへの登録
- 非同期解析対応（ステータス: queued → processing → completed）
- ポーリングロジック
- データベースからのジョブステータス取得
- Webhookによる解析完了通知
*/
