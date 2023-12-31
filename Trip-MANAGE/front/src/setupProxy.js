const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/tripManager', // 프록시할 URL 패턴
    createProxyMiddleware({
      target: 'http://localhost:8090', // 실제 API 서버 주소
      changeOrigin: true
    })
  );
};