const Project = require("./../models/project.model");

const project = Project;

// Retrieve all Projects from the database.
exports.getAll = (req, res) => {
    project
        .find({})
        .then((data) => res.send(data))
        .catch((error) => res.status(500).send({ message: error.message }));
};

// Find a single Project with an id
exports.getById = (req, res) => {
    const id = req.params.id;
    project
        .findById(id)
        .then((data) => {
            if (!data)
                res.status(404).send({
                    message: `Project with id ${id} was not found!`,
                });
            else res.send(data);
        })
        .catch((error) => res.status(500).send({ message: error.message }));
};

// Create a new Project
exports.create = async (req, res) => {
    project
        .create(req.body)
        .then((data) => res.send(data))
        .catch((error) => res.status(500).send({ message: error.message }));
};

// Update a Project by the id in the request
exports.update = async (req, res) => {
    project
        .findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
        .then((data) => {
            if (!data)
                res.status(404).send({
                    message: `Project with id ${id} was not found!`,
                });
            else res.send(req.body);
        })
        .catch((error) => res.status(500).send({ message: error.message }));
};

// Delete a Project with the specified id in the request
exports.deleteById = (req, res) => {
    const id = req.params.id;
    project
        .findByIdAndRemove(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Project with id ${id} was not found!`,
                });
            } else res.send();
        })
        .catch((error) => res.status(500).send({ message: error.message }));
};

// Delete all Projects from the database.
exports.deleteAll = (req, res) => {
    project
        .deleteMany()
        .then((_data) => res.send())
        .catch((error) => res.status(500).send({ message: error.message }));
};
