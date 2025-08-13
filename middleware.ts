import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Get client IP from headers
  const forwardedFor = request.headers.get('x-forwarded-for');
  const ip = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';

  // Basic security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');

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