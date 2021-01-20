import('./app')
  .then(app => {
    const port = process.env.PORT || 3333;
    app.default.listen(process.env.PORT || 3333, () => {
      console.log(`⚡️ Server listening on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
