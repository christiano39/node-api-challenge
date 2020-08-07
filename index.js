const express = require('express');
const helmet = require('helmet');

const projectsRoutes = require('./routes/projectsRoutes');

const server = express();
const port = process.env.PORT || 8000;

server.use(express.json());
server.use(helmet());

server.use('/api/projects', projectsRoutes);

server.listen(port, () => console.log("Server running..."));