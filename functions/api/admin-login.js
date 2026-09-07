const encoder = new TextEncoder();
async function signature(secret) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const bytes = new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode('reprofem-admin-session')));
  return [...bytes].map((value) => value.toString(16).padStart(2, '0')).join('');
}
export async function onRequestPost(context) {
  let payload;
  try { payload = await context.request.json(); } catch { return new Response('Solicitud inválida', { status: 400 }); }
  if (typeof payload.code !== 'string' || payload.code !== context.env.ADMIN_CODE) {
    return Response.json({ ok: false }, { status: 401 });
  }
  const token = await signature(context.env.ADMIN_SESSION_SECRET);
  return Response.json({ ok: true }, { headers: { 'Set-Cookie': `reprofem_admin=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=28800` } });
}
export function onRequest(context) {
  return new Response('Método no permitido', { status: 405, headers: { Allow: 'POST' } });
}