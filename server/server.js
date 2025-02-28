const { server } = require('./app');

const port = process.env.PORT || 5000;
console.log('port ', port);
server.listen(port, "0.0.0.0", () => {
  console.log(`Server is runing on port ${port}`);
});
