# try-mcp

Anthropic Claude APIを使用したシンプルなMCPサーバーの実装例です。

## 必要条件

- Node.js (v18以上推奨)
- npm または yarn

## セットアップ

1. リポジトリをクローン:
```bash
git clone https://github.com/yourusername/try-mcp.git
cd try-mcp
```

2. 依存パッケージをインストール:
```bash
npm install
```

3. 環境変数の設定:
`.env.example`をコピーして`.env`を作成し、必要な環境変数を設定してください。

## 使い方

開発モード（ホットリロード有効）で実行:
```bash
npm run dev
```

本番モードで実行:
```bash
npm start
```

ビルド:
```bash
npm run build
```

## 技術スタック

- TypeScript
- Anthropic Claude API
- dotenv (環境変数管理)
- nodemon (開発用ホットリロード)
