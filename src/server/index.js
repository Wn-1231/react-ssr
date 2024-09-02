import express from 'express';
import { renderHTML } from './utils/index';
const app = express();
app.use(express.static('public'));
const clientHtml = `
    <!doctype html>
    <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport"
                content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
          <title>降级客户端渲染</title>
      </head>
      <body>
        <div id="app"></div>
        <script>window.isCSR=true</script>
        <script src="/index.js"></script>
      </body>
    </html>
  `;

app.get('*', async function (req, res) {
  if (req.query.csr === 'true') {
    res.send(clientHtml);
    return;
  }

  try {
    const SSRHTML = await renderHTML(req, res);
    res.send(SSRHTML);
  } catch (error) {
    res.send(clientHtml);
  }
});

app.listen(6789);
