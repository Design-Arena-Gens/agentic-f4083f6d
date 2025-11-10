import { NextRequest } from 'next/server';
import { decodeState, encodeState, type ChatMessage } from '@/lib/state';
import { generateAssistantReply } from '@/lib/assistant';
import { twimlGather, twimlSayHangup } from '@/lib/twiml';

export const runtime = 'nodejs';

function getFormField(form: FormData, key: string): string | undefined {
  const v = form.get(key);
  return typeof v === 'string' ? v : undefined;
}

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const encoded = url.searchParams.get('state') ?? undefined;
  const baseMessages = decodeState(encoded);

  const form = await req.formData();
  const speech = getFormField(form, 'SpeechResult')?.trim();
  const from = getFormField(form, 'From') || '';
  const language = getFormField(form, 'CurrentSpeechLanguage') || 'en-US';

  if (!speech) {
    const xml = twimlGather({
      prompt: "I didn't catch that. Could you please repeat?",
      stateParam: encodeState(baseMessages),
      language,
    });
    return new Response(xml, { headers: { 'Content-Type': 'text/xml' } });
  }

  const messages: ChatMessage[] = [
    ...baseMessages,
    { role: 'user', content: speech },
  ];

  const reply = await generateAssistantReply(messages, from);
  const updated = encodeState([...messages, { role: 'assistant', content: reply }]);

  const xml = twimlGather({ prompt: reply, stateParam: updated, language });
  return new Response(xml, { headers: { 'Content-Type': 'text/xml' } });
}

export async function GET() {
  return new Response(twimlSayHangup('Goodbye.'), { headers: { 'Content-Type': 'text/xml' } });
}
