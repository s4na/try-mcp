import { Anthropic } from '@anthropic-ai/sdk';
import * as dotenv from 'dotenv';

dotenv.config();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

// MCPサーバーの基本的な実装
class MCPServer {
  private tools: Record<string, Function>;

  constructor() {
    this.tools = {
      // 簡単な計算ツール
      calculate: async (params: { expression: string }) => {
        try {
          return { result: eval(params.expression) };
        } catch (error) {
          return { error: 'Invalid expression' };
        }
      },
      // メッセージを返すツール
      echo: async (params: { message: string }) => {
        return { message: params.message };
      },
      // Claude APIを使用するツール
      askClaude: async (params: { question: string }) => {
        try {
          const message = await anthropic.messages.create({
            model: 'claude-3-opus-20240229',
            max_tokens: 1000,
            messages: [{ role: 'user', content: params.question }],
          });
          return { answer: message.content[0].text };
        } catch (error) {
          return { error: 'Failed to get response from Claude' };
        }
      }
    };
  }

  // ツールを実行するメソッド
  async executeTool(toolName: string, params: any) {
    const tool = this.tools[toolName];
    if (!tool) {
      return { error: `Tool ${toolName} not found` };
    }
    try {
      return await tool(params);
    } catch (error) {
      return { error: `Error executing tool ${toolName}` };
    }
  }
}

// サーバーのインスタンスを作成
const server = new MCPServer();

// テスト用のコード
async function test() {
  console.log(await server.executeTool('calculate', { expression: '2 + 2' }));
  console.log(await server.executeTool('echo', { message: 'Hello, MCP!' }));
  console.log(await server.executeTool('askClaude', { question: 'What is MCP?' }));
}

test(); 
