import { NextRequest } from 'next/server';
import { twimlGather } from '@/lib/twiml';
import { encodeState } from '@/lib/state';

export const runtime = 'nodejs';

export async function GET(_req: NextRequest) {
  const state = encodeState([
    {
      role: 'system',
      content:
        'You are the user\'s phone assistant. Greet warmly, identify as their assistant, and ask how you can help.',
    },
  ] as any);
  const xml = twimlGather({
    prompt: "Hi, this is the assistant. How can I help you today?",
    stateParam: state,
  });
  return new Response(xml, { headers: { 'Content-Type': 'text/xml' } });
}

export async function POST(req: NextRequest) {
  return GET(req);
}
