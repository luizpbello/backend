module.exports = (app) => {
  const { existsOrError } = app.api.validation;

  const save = async (req, res) => {
    const client = { ...req.body };
    try {
      existsOrError(client.clientName, "Nome não informado");
      existsOrError(client.phone, "Telefone não informado");
    } catch (msg) {
      return res.status(400).send(msg);
    }

    app
      .db("clients")
      .insert(client)
      .then(() => res.status(204).send())
      .catch((err) => res.tatus(400).send(err));
  };

  const get = (req, res) => {
    app
      .db("clients")
      .select("id", "clientName", "phone", "adress")
      .then((clients) => res.json(clients))
      .catch((err) => res.status(400).send(err));
  };

  const remove = (req, res) => {
    app
      .db("clients")
      .where({ id: req.params.id })
      .first()
      .del()
      .then(() => res.status(204).send())
      .catch((err) => res.status(400).send(err));
  };

  return { save, get, remove };
};
