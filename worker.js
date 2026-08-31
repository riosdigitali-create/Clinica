export default {
  async fetch(request, env) {
    if (!['GET','HEAD'].includes(request.method)) return new Response('Método no permitido',{status:405,headers:{Allow:'GET, HEAD'}});
    const url=new URL(request.url);
    if(url.pathname==='/api/checkout')return new Response(JSON.stringify({error:'checkout_unavailable',message:'Catálogo y pagos pendientes de configuración.'}),{status:503,headers:{'Content-Type':'application/json'}});
    const response=await env.ASSETS.fetch(request);
    if(!response.headers.get('Content-Type')?.includes('text/html'))return response;
    const result=new Response(response.body,response);
    result.headers.set('X-Content-Type-Options','nosniff');
    result.headers.set('Referrer-Policy','strict-origin-when-cross-origin');
    result.headers.set('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; media-src 'self'; connect-src 'none'; form-action 'none'; base-uri 'self'");
    const imageUrl=new URL('/assets/img/reprofem-social-preview.png',url.origin).href;
    return new HTMLRewriter().on('meta[property="og:image"], meta[name="twitter:image"]',{element(element){element.setAttribute('content',imageUrl)}}).transform(result);
  }
};
