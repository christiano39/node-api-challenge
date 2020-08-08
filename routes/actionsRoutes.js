const express = require('express');
const Actions = require('../data/helpers/actionModel');
const Projects = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/', (req, res) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(() => {
            res.status(500).json({ message: "Error getting actions" });
        })
});

router.get('/:id', validateActionId, (req, res) => {
    res.status(200).json(req.action);
});

router.post('/', validateAction, (req, res) => {
    Actions.insert(req.body)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(() => {
            res.status(500).json({ message: "Error creating action" });
        })
});

router.put('/:id', validateActionId, validateAction, (req, res) => {
    Actions.update(req.params.id, req.body)
        .then(updated => {
            res.status(200).json(updated);
        })
        .catch(() => {
            res.status(500).json({ message: "Error updating action" });
        })
});

router.delete('/:id', validateActionId, (req, res) => {
    Actions.remove(req.params.id)
        .then(() => {
            res.status(204).end();
        })
        .catch(() => {
            res.status(500).json({ message: "Error deleting action" });
        })
})

// validation middleware

function validateActionId(req, res, next) {
    Actions.get(req.params.id)
        .then(action => {
            if (action) {
                req.action = action;
                next();
            } else {
                res.status(400).json({ message: "Invalid action id" });
            }
        })
        .catch(() => {
            res.status(500).json({ message: "Error getting action" });
        })
}

function validateAction(req, res, next) {
    Projects.get(req.body.project_id)
        .then(project => {
            if (project) {
                if (!req.body.project_id || !req.body.description || !req.body.notes) {
                    res.status(400).json({ message: "Missing required fields: project_id, description, notes" });
                } else {
                    next();
                }
            } else {
                res.status(400).json({ message: "Invalid project_id" });
            }
        })
}

module.exports = router;