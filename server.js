const fastify = require('fastify')({
    logger: true
  });
  const path = require('path');
  const staticServe = require('@fastify/static');
  
  // Serve static files from the 'dist' directory
  fastify.register(staticServe, {
    root: path.join(__dirname, 'docs'),
    prefix: '/', // optional: default '/'
  });
  
  fastify.setNotFoundHandler((request, reply) => {
    reply.sendFile('index.html'); // serving path.join(__dirname, 'dist', 'index.html')
  });
  
  // Run the server!
  fastify.listen(3000, function(err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    fastify.log.info(`Server is running on ${address}`);
  });
  