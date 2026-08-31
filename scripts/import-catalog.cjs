const fs=require('node:fs');
const categoryNames={'SALUD FEMENINA':'Salud femenina','ANALISIS COPROLOGICOS':'Análisis coprológicos','MAS SOLICITADOS':'Más solicitados','SALUD MASCULINA':'Salud masculina','EMBARAZO':'Embarazo','FERTILIDAD':'Fertilidad'};
function parseCatalog(text){
 const rows=text.replace(/^\uFEFF/,'').split(/\r?\n/).filter(line=>line.trim());const byCode=new Map(),duplicates=[];
 for(const [index,line] of rows.entries()){
  const cells=line.split('\t').map(v=>v.trim());if(cells.length!==6)throw new Error('Fila '+(index+1)+': se requieren seis columnas.');
  const [code,sourceCategory,name,priceText,sourcePreparation,sourceTurnaround]=cells;
  if(!/^\d+$/.test(code)||!categoryNames[sourceCategory]||!name||!/^\$\d{1,3}(?:,\d{3})*(?:\.\d{2})?$|^\$\d+(?:\.\d{2})?$/.test(priceText))throw new Error('Fila inválida: '+(index+1));
  const price=Number(priceText.replace(/[$,]/g,''));if(!Number.isFinite(price)||price<=0)throw new Error('Precio inválido: '+code);
  const source={category:sourceCategory,name,price:priceText,preparation:sourcePreparation,turnaround:sourceTurnaround};
  if(byCode.has(code)){if(JSON.stringify(byCode.get(code).source)!==JSON.stringify(source))throw new Error('Código con datos contradictorios: '+code);duplicates.push({code,row:index+1});continue}
  const warnings=[];let preparation=sourcePreparation,turnaround=sourceTurnaround;
  if(/12\s*a\s*4\s*hrs/i.test(sourcePreparation)){preparation=null;warnings.push('La indicación de ayuno en la fuente es ambigua. Confirma la preparación completa con el laboratorio antes de acudir.')}
  if(!/d[ií]a|hora/i.test(sourceTurnaround)){turnaround=null;warnings.push('El plazo recibido no especifica la unidad. Confirma el tiempo de entrega con el laboratorio.')}
  byCode.set(code,{id:'estudio-'+code,code,name,category:categoryNames[sourceCategory],type:'estudio',includes:[],price,currency:'MXN',verified:true,preparation,turnaround,warnings,source});
 }
 return {status:'provided-source',sourceLabel:'Catálogo proporcionado por REPROFEM',sourceDate:'2026-08-31',sourceUrl:'https://docs.google.com/spreadsheets/d/1VflhLo7e4OD1TKL-pTyUDoPEIdij1TRoDodrwqBEv50/edit?gid=0',note:'Importación del texto proporcionado por el usuario; no es una sincronización de Google Sheets ni una validación clínica independiente. verified indica cotejo con la fuente comercial.',sourceRowCount:rows.length,duplicates,products:[...byCode.values()]};
}
if(require.main===module){const c=parseCatalog(fs.readFileSync(process.argv[2]||'data/catalogo-proporcionado.tsv','utf8'));fs.writeFileSync('catalog.js','window.REPROFEM_CATALOG = '+JSON.stringify(c,null,2)+';\n');console.log(JSON.stringify({rows:c.sourceRowCount,products:c.products.length,duplicates:c.duplicates,warnings:c.products.filter(p=>p.warnings.length).map(p=>({code:p.code,warnings:p.warnings})),categories:[...new Set(c.products.map(p=>p.category))]},null,2))}
module.exports={parseCatalog};
