# EC2 デプロイガイド

## 1. EC2インスタンス作成

### AWSコンソールでの設定

1. **EC2ダッシュボード** → **インスタンスを起動**

2. **設定項目**:
   | 項目 | 値 |
   |------|-----|
   | 名前 | guitar-scale-backend |
   | AMI | Amazon Linux 2023 |
   | インスタンスタイプ | t3.small (2GB RAM) |
   | キーペア | 新規作成 or 既存選択 |
   | ネットワーク | デフォルトVPC |

3. **セキュリティグループ設定**:
   | タイプ | ポート | ソース |
   |--------|--------|--------|
   | SSH | 22 | マイIP |
   | HTTP | 80 | 0.0.0.0/0 |
   | HTTPS | 443 | 0.0.0.0/0 |
   | カスタムTCP | 8000 | 0.0.0.0/0 |

4. **ストレージ**: 20GB gp3

5. **起動** をクリック

## 2. SSH接続

```bash
# キーペアの権限設定
chmod 400 ~/Downloads/your-key.pem

# SSH接続
ssh -i ~/Downloads/your-key.pem ec2-user@<EC2_PUBLIC_IP>
```

## 3. 初期セットアップ

```bash
# システム更新
sudo dnf update -y

# Docker インストール
sudo dnf install -y docker git
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER

# Docker Compose インストール
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 一度ログアウト・再ログイン（docker権限を反映）
exit
```

再度SSH接続:
```bash
ssh -i ~/Downloads/your-key.pem ec2-user@<EC2_PUBLIC_IP>
```

## 4. アプリケーションデプロイ

### Option A: Git Clone（パブリックリポジトリの場合）

```bash
cd ~
git clone https://github.com/your-username/guitar-scale-app.git
cd guitar-scale-app/python-backend
```

### Option B: SCPでファイル転送

ローカルから:
```bash
scp -i ~/Downloads/your-key.pem -r python-backend ec2-user@<EC2_PUBLIC_IP>:~/
```

EC2で:
```bash
cd ~/python-backend
```

## 5. Docker起動

```bash
# uploadsディレクトリ作成
mkdir -p uploads

# 本番用compose fileでビルド・起動
docker-compose -f docker-compose.prod.yml up -d --build

# ログ確認
docker-compose -f docker-compose.prod.yml logs -f

# ヘルスチェック
curl http://localhost:8000/health
```

## 6. Vercel環境変数設定

Vercelダッシュボードで以下を設定:

| 変数名 | 値 |
|--------|-----|
| PYTHON_BACKEND_URL | http://<EC2_PUBLIC_IP>:8000 |

※ 後でElastic IP + ドメイン + SSL設定推奨

## 7. 動作確認

1. https://guitar-scale.com/ja/analysis にアクセス
2. 音源ファイルをアップロード
3. 解析が正常に完了することを確認

## 8. （推奨）Elastic IP設定

EC2の再起動でIPが変わるのを防ぐ:

1. **EC2** → **Elastic IP** → **割り当て**
2. 作成したIPを選択 → **アクション** → **関連付け**
3. guitar-scale-backendインスタンスを選択
4. Vercelの環境変数を新しいIPに更新

## 9. （推奨）SSL/ドメイン設定

### Route 53 + ALB方式

1. **Route 53** でサブドメイン作成: `api.guitar-scale.com`
2. **ALB** (Application Load Balancer) 作成
3. **ACM** でSSL証明書取得
4. VercelでPYTHON_BACKEND_URLを `https://api.guitar-scale.com` に更新

### Caddy方式（簡易）

```bash
# Caddy インストール
sudo dnf install -y caddy

# /etc/caddy/Caddyfile
api.guitar-scale.com {
    reverse_proxy localhost:8000
}

# 起動
sudo systemctl enable caddy
sudo systemctl start caddy
```

## トラブルシューティング

### コンテナが起動しない
```bash
docker-compose -f docker-compose.prod.yml logs
```

### メモリ不足
t3.smallからt3.mediumにスケールアップ

### 接続できない
- セキュリティグループで8000番ポートが開いているか確認
- `curl http://localhost:8000/health` で内部確認
