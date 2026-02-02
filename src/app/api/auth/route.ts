import { NextRequest, NextResponse } from 'next/server';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || 'Ov23lie5ZAfI8YGAL9S0';
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || '';

function getBaseUrl(request: NextRequest): string {
  const host = request.headers.get('host') || 'localhost:3000';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  return `${protocol}://${host}`;
}

function renderAuthResult(status: 'success' | 'error', content: string): string {
  // Decap CMS expects this exact message format
  const message = status === 'success'
    ? `authorization:github:success:${JSON.stringify({ token: content, provider: 'github' })}`
    : `authorization:github:error:${JSON.stringify({ error: content })}`;

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>GitHub OAuth</title>
</head>
<body>
  <p id="message">${status === 'success' ? 'Autenticazione in corso...' : content}</p>
  <script>
    (function() {
      var status = "${status}";
      var token = ${status === 'success' ? JSON.stringify(content) : 'null'};
      var message = ${JSON.stringify(message)};
      var messageEl = document.getElementById('message');

      function sendMessage() {
        // Try multiple approaches to communicate with Decap CMS

        // Approach 1: postMessage to opener (standard popup flow)
        if (window.opener) {
          console.log('Sending postMessage to opener');
          window.opener.postMessage(message, '*');
          messageEl.textContent = 'Autenticazione completata!';

          // Close popup after message is sent
          setTimeout(function() {
            window.close();
          }, 500);
          return;
        }

        // Approach 2: postMessage to parent (iframe flow)
        if (window.parent && window.parent !== window) {
          console.log('Sending postMessage to parent');
          window.parent.postMessage(message, '*');
          messageEl.textContent = 'Autenticazione completata!';
          return;
        }

        // Approach 3: Store in localStorage and redirect (fallback)
        if (status === 'success' && token) {
          console.log('Storing token and redirecting to admin');
          try {
            localStorage.setItem('netlify-cms-user', JSON.stringify({
              token: token,
              provider: 'github'
            }));
          } catch (e) {
            console.error('Failed to store token:', e);
          }
          messageEl.textContent = 'Autenticazione completata! Reindirizzamento...';
          window.location.href = '/admin/';
          return;
        }

        // No valid communication method found
        messageEl.textContent = 'Autenticazione completata. Torna manualmente alla pagina admin.';
      }

      // Execute immediately
      sendMessage();
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
