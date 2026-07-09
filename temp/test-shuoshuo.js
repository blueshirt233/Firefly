const http = require('http');
http.get('http://127.0.0.1:4321/shuoshuo/', (res) => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    console.log('STATUS:', res.statusCode);
    console.log('SIZE:', d.length);
    const hasTitle = d.match(/<title>([^<]+)<\/title>/);
    console.log('TITLE:', hasTitle ? hasTitle[1] : 'N/A');
    console.log('PHOTO:', d.includes('photo-demo'));
    console.log('BILI:', d.includes('bilibili-demo'));
    console.log('MIXED:', d.includes('mixed-demo'));
    console.log('GRID:', d.includes('grid-template-columns'));
    console.log('ERROR:', d.includes('TypeError') || d.includes('500'));
  });
}).on('error', e => console.error('ERR:', e.message));