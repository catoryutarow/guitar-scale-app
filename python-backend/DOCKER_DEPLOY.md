# Docker を使った EC2 デプロイ手順

## 概要

Python バックエンド（ffmpeg 付き）を Docker コンテナとして EC2 上で起動する手順です。

---

## 前提条件

- EC2 インスタンス（Amazon Linux 2023 推奨）
- セキュリティグループで **ポート 8000** を開放
- SSH 接続可能

---

## 1. EC2 に SSH 接続

```bash
ssh -i your-key.pem ec2-user@your-ec2-ip
```

---

## 2. Docker と Docker Compose をインストール

### Docker のインストール

```bash
# Docker をインストール
sudo dnf install -y docker

# Docker サービスを起動
sudo systemctl start docker
sudo systemctl enable docker

# ec2-user を docker グループに追加（sudo なしで docker コマンドを実行可能に）
sudo usermod -aG docker ec2-user

# 一度ログアウトして再ログイン（グループ変更を反映）
exit
```

**再度 SSH 接続してから次へ進んでください。**

```bash
# Docker が動作することを確認
docker --version
docker ps
```

### Docker Compose のインストール

```bash
# Docker Compose をインストール
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# 実行権限を付与
sudo chmod +x /usr/local/bin/docker-compose

# 確認
docker-compose --version
```

---

## 3. アプリケーションをデプロイ

### コードを EC2 に配置

**方法 A: Git でクローン（推奨）**

```bash
cd ~
git clone https://github.com/your-repo/guitar-scale-app.git
cd guitar-scale-app/python-backend
```

**方法 B: ローカルから scp でアップロード**

```bash
# ローカルマシンで実行
scp -i your-key.pem -r /path/to/guitar-scale-app/python-backend ec2-user@your-ec2-ip:~/
```

---

## 4. Docker イメージをビルド & 起動

```bash
cd ~/guitar-scale-app/python-backend

# Docker Compose でビルド & 起動
docker-compose up -d --build
```

**起動オプション:**
- `-d`: バックグラウンドで起動
- `--build`: Dockerfile から再ビルド

---

## 5. 動作確認

### ログを確認

```bash
docker-compose logs -f
```

**期待される出力:**
```
🎵 Audio Analysis API - Startup
============================================================
Analysis Mode: REAL (librosa)
Environment: USE_REAL_ANALYSIS=true
✓ librosa loaded successfully
✓ numpy loaded successfully
============================================================
INFO:     Started server process [1]
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### API をテスト

**ヘルスチェック:**
```bash
curl http://localhost:8000/health
```

**期待される応答:**
```json
{"status":"ok"}
```

---

## 6. コンテナの管理コマンド

### ログを表示

```bash
docker-compose logs -f
```

### コンテナを停止

```bash
docker-compose down
```

### コンテナを再起動

```bash
docker-compose restart
```

### コンテナを削除して再ビルド

```bash
docker-compose down
docker-compose up -d --build
```

---

## 7. アップデート手順

コードを更新した場合:

```bash
cd ~/guitar-scale-app/python-backend

# Git でコードを更新（Git を使っている場合）
git pull

# コンテナを再ビルド & 再起動
docker-compose down
docker-compose up -d --build
```

---

## 8. トラブルシューティング

### コンテナが起動しない

```bash
# ログを確認
docker-compose logs

# コンテナの状態を確認
docker ps -a
```

### ポート 8000 が使用中

```bash
# ポート 8000 を使用しているプロセスを確認
sudo lsof -i :8000

# 必要に応じてプロセスを停止
sudo kill <PID>
```

### ffmpeg が動作しない

コンテナ内で確認:

```bash
docker exec -it audio-analysis-api bash
ffmpeg -version
```

---

## 9. セキュリティグループ設定

EC2 コンソールで以下を確認:

| Type | Protocol | Port | Source |
|------|----------|------|--------|
| Custom TCP | TCP | 8000 | 0.0.0.0/0 (本番環境では制限推奨) |

---

## 完了！

バックエンドが **http://your-ec2-ip:8000** で起動しています。

Next.js フロントエンドから以下の環境変数で接続:

```bash
# .env.local
NEXT_PUBLIC_API_BASE_URL=http://your-ec2-ip:8000
```
