const encoder = new TextEncoder();
async function signature(secret) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const bytes = new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode('reprofem-admin-session')));
  return [...bytes].map((value) => value.toString(16).padStart(2, '0')).join('');
}
function cookieValue(request, name) {
  const match = request.headers.get('Cookie')?.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match?.[1] || '';
}
export async function onRequest(context) {
  const pathname = new URL(context.request.url).pathname;
  if (pathname !== '/admin' && pathname !== '/admin.html') return context.next();
  const expected = await signature(context.env.ADMIN_SESSION_SECRET);
  if (cookieValue(context.request, 'reprofem_admin') !== expected) {
    return Response.redirect(new URL('/admin-login.html', context.request.url), 302);
  }
  return context.next();
}