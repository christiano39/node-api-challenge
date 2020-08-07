const express = require('express');
const helmet = require('helmet');

const projectsRoutes = require('./routes/projectsRoutes');
const actionsRoutes = require('./routes/actionsRoutes');

const server = express();
const port = process.env.PORT || 8000;

server.use(express.json());
server.use(helmet());

server.use('/api/projects', projectsRoutes);
server.use('/api/actions', actionsRoutes);

server.listen(port, () => console.log("Server running..."));