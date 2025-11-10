export const runtime = 'nodejs';

export async function GET() {
  return Response.json({ ok: true, env: { hasOpenAIKey: Boolean(process.env.OPENAI_API_KEY) } });
}
