const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const projectsRoutes = require('./routes/projectsRoutes');
const actionsRoutes = require('./routes/actionsRoutes');

const server = express();
const port = process.env.PORT || 8000;

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/projects', projectsRoutes);
server.use('/api/actions', actionsRoutes);

server.listen(port, () => console.log("Server running..."));