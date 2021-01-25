import app from './app';

const port = process.env.PORT || 3333;
try {
  app.listen(port, () => {
    console.log(`⚡️ Server listening on http://localhost:${port}`);
  });
} catch (e) {
  console.log(JSON.stringify(e) || e);
}
