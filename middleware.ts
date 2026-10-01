import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isAllowedAdminEmail, isSupabaseConfigured } from '@/lib/supabase/env';
import { redirectWithSession, updateSession } from '@/lib/supabase/middleware';

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 100; // Maximum requests per window

// Store for rate limiting
const rateLimit = new Map();

// Function to check rate limit
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;

  // Clean up old entries
  for (const [key, timestamp] of rateLimit.entries()) {
    if (timestamp < windowStart) {
      rateLimit.delete(key);
    }
  }

  // Count requests for this IP
  const requestCount = Array.from(rateLimit.entries())
    .filter(([key, timestamp]) => key.startsWith(ip) && timestamp > windowStart)
    .length;

  // Add current request
  rateLimit.set(`${ip}-${now}`, now);

  return requestCount >= MAX_REQUESTS;
}

const LOGIN_PATH = '/admin/login';

function isAdminPath(pathname: string): boolean {
  return pathname === '/admin' || pathname.startsWith('/admin/');
}

/**
 * Admin routes only: refresh the Supabase session and gate the dashboard.
 * Pages re-check the user server-side (requireAdmin) and the database enforces
 * RLS, so this is the first of three layers, not the only one.
 */
async function handleAdmin(request: NextRequest): Promise<NextResponse> {
  // Not configured yet: let the admin UI render its setup screen.
  if (!isSupabaseConfigured()) return NextResponse.next();

  const { response, user } = await updateSession(request);
  const allowed = Boolean(user && isAllowedAdminEmail(user.email));
  const { pathname } = request.nextUrl;
  const onLogin = pathname === LOGIN_PATH || pathname.startsWith(`${LOGIN_PATH}/`);

  // Server actions answer for themselves ({ ok: false }) instead of being
  // redirected mid-request, which the client could not follow.
  if (request.headers.has('next-action')) return response;

  if (onLogin && allowed) return redirectWithSession(request, response, '/admin');
  if (!onLogin && !allowed) return redirectWithSession(request, response, LOGIN_PATH);
  return response;
}

export async function middleware(request: NextRequest) {
  // Get client IP from headers
  const forwardedFor = request.headers.get('x-forwarded-for');
  const ip = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';

  // Rate limiting
  if (isRateLimited(ip)) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': '60',
        'Content-Type': 'text/plain',
      },
    });
  }

  // Block potential malicious requests
  const url = request.url.toLowerCase();
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';

  // Block known malicious patterns
  const maliciousPatterns = [
    '/wp-admin',
    '/wordpress',
    '/wp-login',
    'eval(',
    '.php',
    '.asp',
    'union select',
    'concat(',
    '../',
    './.',
  ];

  if (maliciousPatterns.some(pattern => url.includes(pattern))) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  // Block suspicious user agents
  const suspiciousAgents = [
    'sqlmap',
    'nikto',
    'nmap',
    'masscan',
    'wget/',
    'curl/',
    'python-requests',
  ];

  if (suspiciousAgents.some(agent => userAgent.includes(agent))) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  const response = isAdminPath(request.nextUrl.pathname)
    ? await handleAdmin(request)
    : NextResponse.next();

  // Basic security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // Add security timestamp to detect replay attacks
  const timestamp = Date.now().toString();
  const nonce = Math.random().toString(36).substring(7);
  response.headers.set('X-Security-Timestamp', timestamp);
  response.headers.set('X-Security-Nonce', nonce);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
