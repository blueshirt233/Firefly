const http = require('http');

function testPage(path, callback) {
  http.get('http://127.0.0.1:4321' + path, (res) => {
    let d = '';
    res.on('data', c => d += c);
    res.on('end', () => callback(res.statusCode, d));
  }).on('error', e => callback(0, e.message));
}

testPage('/shuoshuo/', (code, body) => {
  console.log('=== /shuoshuo/ ===');
  console.log('STATUS:', code);
  console.log('SIZE:', body.length);
  console.log('TITLE:', (body.match(/<title>([^<]+)<\/title>/) || ['','N/A'])[1]);
  console.log('ITEMS:', (body.match(/card-base rounded/g) || []).length + ' cards');
  
  testPage('/shuoshuo/hello/', (code2, body2) => {
    console.log('\n=== /shuoshuo/hello/ ===');
    console.log('STATUS:', code2);
    console.log('SIZE:', body2.length);
    console.log('TITLE:', (body2.match(/<title>([^<]+)<\/title>/) || ['','N/A'])[1]);
    console.log('HAS_COMMENT:', body2.includes('评论') || body2.includes('comment'));
    console.log('HAS_IMAGES:', body2.includes('object-cover'));
    
    testPage('/shuoshuo/bilibili-demo/', (code3, body3) => {
      console.log('\n=== /shuoshuo/bilibili-demo/ ===');
      console.log('STATUS:', code3);
      console.log('SIZE:', body3.length);
      console.log('TITLE:', (body3.match(/<title>([^<]+)<\/title>/) || ['','N/A'])[1]);
      console.log('HAS_BILI_IFRAME:', body3.includes('player.bilibili.com'));
      console.log('HAS_COMMENT:', body3.includes('评论') || body3.includes('comment'));
    });
  });
});