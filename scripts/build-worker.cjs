const fs=require('node:fs'),path=require('node:path');
const html=fs.readFileSync('dist/client/index.html','utf8');
for(const file of ['app.js','catalog.js','commerce.js','chatbot.js'])fs.copyFileSync(file,'dist/client/'+file);
const original=fs.readFileSync('index.html','utf8');
const assets=new Set([...original.matchAll(/(?:src|poster|href)="(assets\/[^"#]+)"/g)].map(m=>m[1]));
for(const file of ['clinico-pruebas.webp','ciclo-flor.webp','fertilidad-app.webp','clinico-ultrasonido.webp','hero-cinematic.png','reprofem-social-preview.png'])assets.add('assets/img/'+file);
for(const file of assets){const dest=path.join('dist/client',file);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(file,dest)}
fs.mkdirSync('dist/server',{recursive:true});fs.copyFileSync('worker.js','dist/server/index.js');
console.log('Built static site and Worker. No patient database, payments or external submissions enabled.');
