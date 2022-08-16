module.exports = (app) => {
  const { existsOrError, notExistsOrError } = app.api.validation;

  const save = async (req, res) => {
    const pet = { ...req.body };
    if (req.params.id) pet.id = req.params.id;
    try {
      existsOrError(pet.name, "Nome não informado");
      existsOrError(pet.race, "Raça não informada");
      existsOrError(pet.tutor, "Tutor não informado")
      
    } catch (msg) {
      return res.status(400).send(msg);
    }

    if (pet.id) {
      app
        .db("pets")
        .update(pet)
        .where({ id: pet.id })
        .then(() => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db("pets")
        .insert(pet)
        .then(() => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    }
  };

  const get = (req, res) => {
    app
      .db("pets")
      .select()
      .then((pets) => res.json(pets))
      .catch((err) => res.status(400).send(err));
  };

  const getPetById = (req, res) => {
    app
      .db("pets")
      .select()
      .where({ id: req.params.id })
      .first()
      .then((pet) => res.json(pet))
      .catch((err) => res.status(500).send(err));
  };

  const remove = (req, res) => {
    app
      .db("pets")
      .where({ id: req.params.id })
      .first()
      .del()
      .then(() => res.status(204).send())
      .catch((err) => res.status(400).send(err));
  };

  return { save, get, getPetById, remove };
};
