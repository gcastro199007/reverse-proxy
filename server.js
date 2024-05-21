// server.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 3000;

// Proxy configuration
app.use('/recipes', createProxyMiddleware({
  target: 'https://craftedpour.vercel.app/', // Replace with your Vercel app URL
  changeOrigin: true,
  pathRewrite: {
    '^/': '/', // Rewrite URL if needed
  },
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader('Host', req.headers.host);
    proxyReq.setHeader('X-Real-IP', req.connection.remoteAddress);
    proxyReq.setHeader('X-Forwarded-For', req.headers['x-forwarded-for'] || req.connection.remoteAddress);
    proxyReq.setHeader('X-Forwarded-Proto', req.protocol);
  },
}));


app.listen(port, () => {
  console.log(`Reverse proxy server is running on http://localhost:${port}`);
});