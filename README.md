# CloudFront + S3 + React アプリケーション

このプロジェクトは、AWS CloudFront と S3 を使用してReactアプリケーションをホスティングするためのフルスタック構成です。インフラストラクチャはAWS CDKで管理され、IP制限とBasic認証によるセキュリティ機能を含んでいます。

## 🏗️ 技術スタック

### インフラストラクチャ
- **AWS CDK** (TypeScript) - インフラ管理
- **AWS CloudFront** - CDN配信
- **AWS S3** - 静的ファイルホスティング
- **AWS Lambda@Edge** - エッジレベルでのIP制限・Basic認証

### フロントエンド
- **React 19** - UIライブラリ
- **Vite** - ビルドツール
- **TanStack Router** - ルーティング
- **Tailwind CSS** - スタイリング
- **TypeScript** - 型安全性
- **Biome** - リンター・フォーマッター

## 📁 プロジェクト構成

```
cloudfront-s3/
├── infra/                    # AWS CDKインフラストラクチャ
│   ├── lib/
│   │   ├── functions/        # Lambda@Edge関数
│   │   │   └── ip-restriction.js
│   │   └── infra-stack.ts    # CDKスタック定義
│   └── package.json
├── react/                    # Reactアプリケーション
│   ├── src/
│   │   ├── components/       # Reactコンポーネント
│   │   ├── routes/          # TanStack Routerページ
│   │   └── main.tsx
│   └── package.json
└── README.md
```

## 🚀 セットアップ手順

### 前提条件

- **Node.js** 18.x 以上
- **npm** または **yarn**
- **AWS CLI** 設定済み
- **AWS CDK CLI** インストール済み (`npm install -g aws-cdk`)

### 1. リポジトリのクローン

```bash
git clone https://github.com/Masuda-1246/cloudfront-s3.git
cd cloudfront-s3
```

### 2. 依存関係のインストール

```bash
# インフラ側の依存関係
cd infra
npm install

# React側の依存関係
cd ../react
npm install
```

### 3. 環境設定

#### Lambda@Edge関数の設定
`infra/lib/functions/ip-restriction.js` でセキュリティ設定を行います：

```javascript
// IPホワイトリストの設定
const IP_WHITE_LIST = ['your.ip.address.here'];

// Basic認証の設定
const authUser = 'your-username';
const authPass = 'your-password';
```

## 🏃‍♂️ 開発・デプロイ

### ローカル開発

React アプリケーションをローカルで開発する場合：

```bash
cd react
npm run dev  # http://localhost:3000 で起動
```

### プロダクションビルド

```bash
cd react
npm run build  # dist/ フォルダにビルド成果物を生成
```

### AWS へのデプロイ

1. **CDK の初期化** (初回のみ)
```bash
cd infra
npx cdk bootstrap
```

2. **デプロイ**
```bash
cd infra
npx cdk deploy
```

デプロイが完了すると、CloudFrontのディストリビューションURLが出力されます。

### CDK コマンド

```bash
cd infra

# TypeScriptをJavaScriptにコンパイル
npm run build

# ファイル変更を監視してコンパイル
npm run watch

# CloudFormationテンプレートの生成
npx cdk synth

# 現在のスタックとの差分確認
npx cdk diff

# スタックの削除
npx cdk destroy
```

## 🔒 セキュリティ機能

このプロジェクトには以下のセキュリティ機能が実装されています：

### IP制限
指定されたIPアドレスからのアクセスのみを許可します。
設定は `infra/lib/functions/ip-restriction.js` の `IP_WHITE_LIST` で行います。

### Basic認証
サイトへのアクセス時にBasic認証を要求します。
ユーザー名とパスワードは同ファイルで設定できます。

**重要**: 本番環境では、認証情報をハードコードせず、AWS Secrets Manager や環境変数を使用することを推奨します。

## 🛠️ 開発

### React側の開発

```bash
cd react

# 開発サーバー起動
npm run dev

# リント・フォーマット
npm run lint
npm run format
npm run check

# テスト実行
npm run test
```

### インフラ側の開発

```bash
cd infra

# テスト実行
npm run test

# ビルド
npm run build
```

## 📝 その他

- React アプリケーションは TanStack Router によるファイルベースルーティングを使用
- Tailwind CSS による効率的なスタイリング
- Lambda@Edge により CloudFront エッジでのセキュリティ処理
- S3 への直接アクセスはブロックされ、CloudFront経由のみアクセス可能
