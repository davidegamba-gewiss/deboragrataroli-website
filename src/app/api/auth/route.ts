import { NextRequest, NextResponse } from 'next/server';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || 'Ov23lie5ZAfI8YGAL9S0';
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || '';

function getBaseUrl(request: NextRequest): string {
  const host = request.headers.get('host') || 'localhost:3000';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  return `${protocol}://${host}`;
}

function renderAuthResult(status: 'success' | 'error', content: string): string {
  const message = status === 'success'
    ? `authorization:github:success:${JSON.stringify({ token: content, provider: 'github' })}`
    : `authorization:github:error:${JSON.stringify({ error: content })}`;

  // This HTML page handles OAuth callback communication with Decap CMS
  // It sends the auth result back to the opener window (CMS admin panel)
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>GitHub OAuth - ${status === 'success' ? 'Success' : 'Error'}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      background: #f5f5f5;
    }
    .message {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      text-align: center;
    }
    .success { color: #2e7d32; }
    .error { color: #c62828; }
  </style>
</head>
<body>
  <div class="message">
    <p class="${status}">${status === 'success' ? 'Autenticazione completata. Chiusura in corso...' : content}</p>
  </div>
  <script>
    (function() {
      var message = ${JSON.stringify(message)};

      // Send message to opener (Decap CMS)
      if (window.opener) {
        window.opener.postMessage(message, '*');

        // Try closing the window after a short delay
        setTimeout(function() {
          window.close();
        }, 1000);
      } else {
        // If no opener, redirect to admin
        document.querySelector('.message p').textContent =
          'Autenticazione completata. Torna alla pagina admin.';
        setTimeout(function() {
          window.location.href = '/admin/';
        }, 2000);
      }
    })();
  </script>
</body>
</html>`;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');

  // If no code, redirect to GitHub OAuth
  if (!code) {
    const redirectUri = `${getBaseUrl(request)}/api/auth`;
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo,user`;

    return NextResponse.redirect(githubAuthUrl);
  }

  // Exchange code for access token
  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error('GitHub OAuth error:', tokenData);
      return new NextResponse(
        renderAuthResult('error', tokenData.error_description || tokenData.error),
        { status: 400, headers: { 'Content-Type': 'text/html' } }
      );
    }

    if (!tokenData.access_token) {
      console.error('No access token received:', tokenData);
      return new NextResponse(
        renderAuthResult('error', 'No access token received from GitHub'),
        { status: 400, headers: { 'Content-Type': 'text/html' } }
      );
    }

    return new NextResponse(
      renderAuthResult('success', tokenData.access_token),
      { status: 200, headers: { 'Content-Type': 'text/html' } }
    );
  } catch (error) {
    console.error('OAuth error:', error);
    return new NextResponse(
      renderAuthResult('error', 'Failed to authenticate with GitHub'),
      { status: 500, headers: { 'Content-Type': 'text/html' } }
    );
  }
}
