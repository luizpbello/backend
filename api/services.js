module.exports = (app) => {
  const { existsOrError } = app.api.validation;

  const save = (req, res) => {
    const service = { ...req.body };
    if (req.params.id) service.id = req.params.id;

    try {
      existsOrError(service.name, "Descrição do serviço não informada.");
      existsOrError(service.value, "Valor do serviço não informado");
    } catch (msg) {
      return res.status(400).send(msg);
    }

    if (service.id) {
      app
        .db("services")
        .update(service)
        .where({ id: service.id })
        .then(() => res.status(204).send())
        .catch((err) => res.status(400).send(err));
    } else {
      app
        .db("services")
        .insert(service)
        .then(() => res.status(204).send())
        .catch((err) => res.status(400).send(err));
    }
  };

  const get = (req, res) => {
    app
      .db("services")
      .select()
      .then((service) => res.json(service))
      .catch((err) => res.status(err));
  };

  const remove = (req, res) => {
    app
      .db("services")
      .where({ id: req.params.id })
      .first()
      .del()
      .then(() => res.status(204).send())
      .catch((err) => res.status(400).send(err));
  };

  return { save, get, remove };
};
