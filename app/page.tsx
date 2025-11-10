export default function Page() {
  const baseUrl = 'https://agentic-f4083f6d.vercel.app';
  return (
    <main style={{ maxWidth: 840, margin: '48px auto', padding: 24 }}>
      <h1 style={{ fontSize: 32, marginBottom: 12 }}>Agentic Voice Assistant</h1>
      <p style={{ lineHeight: 1.6, marginBottom: 16 }}>
        This app can answer your phone calls and speak as your assistant using speech recognition and an LLM.
      </p>
      <div style={{ background: 'white', padding: 16, borderRadius: 8, boxShadow: '0 1px 2px rgba(0,0,0,0.08)' }}>
        <h2 style={{ marginTop: 0 }}>Twilio Webhooks</h2>
        <ul>
          <li><strong>Voice incoming webhook</strong>: <code>{baseUrl}/api/voice/incoming</code></li>
          <li><strong>Speech handler</strong>: <code>{baseUrl}/api/voice/handle-speech</code></li>
          <li><strong>Health check</strong>: <code>{baseUrl}/api/voice/health</code></li>
        </ul>
        <p style={{ marginTop: 12 }}>
          Point your Twilio phone number's Voice & Fax webhook to the incoming URL. Ensure <code>OPENAI_API_KEY</code> is set in your Vercel project environment.
        </p>
      </div>
    </main>
  );
}
