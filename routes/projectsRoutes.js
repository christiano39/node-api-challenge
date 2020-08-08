const express = require('express');
const Projects = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(() => {
            res.status(500).json({ message: "Error getting projects" });
        })
});

router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project);
});

router.get('/:id/actions', validateProjectId, (req, res) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(() => {
            res.status(500).json({ message: "Error getting actions for project" });
        })
})

router.post('/', validateProject, (req, res) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(() => {
            res.status(500).json({ message: "Error adding project" });
        })
});

router.put('/:id', validateProjectId, validateProject, (req, res) => {
    Projects.update(req.params.id, req.body)
        .then(updated => {
            res.status(200).json(updated);
        })
        .catch(() => {
            res.status(500).json({ message: "Error updating project" });
        })
});

router.delete('/:id', validateProjectId, (req, res) => {
    Projects.remove(req.params.id)
        .then(() => {
            res.status(204).end();
        })
        .catch(() => {
            res.status(500).json({ message: "Error deleting project" });
        })
})

// validation middleware

function validateProjectId(req, res, next){
    Projects.get(req.params.id)
        .then(project => {
            if (project) {
                req.project = project;
                next();
            } else {
                res.status(400).json({ message: "Invalid project id" });
            }
        })
        .catch(() => {
            res.status(500).json({ message: "Error getting project" });
        })
}

function validateProject(req, res, next){
    if(!req.body) {
        res.status(400).json({ message: "missing project data" });
    } else if (!req.body.name || !req.body.description) {
        res.status(400).json({ message: "missing required name and description" });
    } else {
        next();
    }
}

module.exports = router;