const PORT = process.env.PORT || 3000;

module.exports = {
    info: {
      // API informations (required)
      title: 'User API sample', // Title (required)
      version: '1.0.0', // Version (required)
      description: 'A sample API to manage users.', // Description (optional)
    },
    host: `localhost:${PORT}`, // Host (optional)
    // apis:['route*.js'],
    basePath: '/', // Base path (optional)
  };