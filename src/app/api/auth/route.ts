import { NextRequest, NextResponse } from 'next/server';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || 'Ov23lie5ZAfI8YGAL9S0';
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || '';

function getBaseUrl(request: NextRequest): string {
  const host = request.headers.get('host') || 'localhost:3000';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  return protocol + '://' + host;
}

function renderMessage(status: 'success' | 'error', content: string): string {
  const messageType = status === 'success' ? 'success' : 'error';
  const payload = status === 'success' 
    ? '{"token":"' + content + '","provider":"github"}'
    : '{"error":"' + content + '"}';
  
  return '<!DOCTYPE html><html><head><meta charset="utf-8"><title>GitHub OAuth</title></head><body><p>' + 
    (status === 'success' ? 'Autenticazione completata.' : content) + 
    '</p><script>(function(){function receiveMessage(e){window.opener.postMessage("authorization:github:' + 
    messageType + ':' + payload + '",e.origin);window.removeEventListener("message",receiveMessage,false);}' +
    'window.addEventListener("message",receiveMessage,false);window.opener.postMessage("authorizing:github","*");})();</script></body></html>';
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');

  if (!code) {
    const redirectUri = getBaseUrl(request) + '/api/auth';
    const githubAuthUrl = 'https://github.com/login/oauth/authorize?client_id=' + 
      GITHUB_CLIENT_ID + '&redirect_uri=' + encodeURIComponent(redirectUri) + '&scope=repo,user';
    
    return NextResponse.redirect(githubAuthUrl);
  }

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
      return new NextResponse(
        renderMessage('error', tokenData.error_description || tokenData.error),
        { status: 400, headers: { 'Content-Type': 'text/html' } }
      );
    }

    return new NextResponse(
      renderMessage('success', tokenData.access_token),
      { status: 200, headers: { 'Content-Type': 'text/html' } }
    );
  } catch (error) {
    console.error('OAuth error:', error);
    return new NextResponse(
      renderMessage('error', 'Failed to authenticate with GitHub'),
      { status: 500, headers: { 'Content-Type': 'text/html' } }
    );
  }
}
