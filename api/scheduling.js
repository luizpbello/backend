module.exports = (app) => {
  const { existsOrError } = app.api.validation;

  const save = (req, res) => {
    const schedulings = { ...req.body };

    if (req.params.id) schedulings.id = req.params.id;

    try {
      existsOrError(schedulings.name, "Nome do pet não informado.");
      existsOrError(schedulings.date, "Por favor selecione uma data");
      existsOrError(schedulings.time, "Por favor selecione um horário.");
      existsOrError(schedulings.service, "Por favor selecione um serviço");
      existsOrError(schedulings.value, 'Informe o valor do serviço')
    } catch (msg) {
      return res.status(400).send(msg);
    }

    if (schedulings.id) {
        app
        .db("scheduling")
        .update(schedulings)
        .where({ id: schedulings.id })
        .then(() => res.status(204).send())
        .catch((err) => res.status(400).send(err));
    }else {
      app
        .db("scheduling")
        .insert(schedulings)
        .then(() => res.status(204).send())
        .catch((err) => res.status(400).send(err));
    }
  };

  const limit = 5
  const get = async (req, res) => {
    const page = req.query.page || 1
    const result = await app.db("scheduling").count("id").first()
    const count = parseInt(result.count)
    const totalPages = Math.ceil(count / limit)
    
      app.db("scheduling")
      .limit(limit).offset((page - 1) * limit)      
      .then((scheduling) => res.json({ data: scheduling, count, limit, totalPages, page }))
      .catch((err) => res.status(400).send(err));
    };

    const getById = (req, res) => {
      app
        .db("scheduling")
        .where({ id: req.params.id })
        .first()
        .then((scheduling) => res.json(scheduling))
        .catch((err) => res.status(400).send(err));
    }


    const remove = (req, res) => {
      app
      .db('scheduling')
      .where({id:req.params.id})
      .first()
      .del()
      .then(() => res.status(204).send())
      .catch(err => res.status(400).send(err))

    }
        
    return { save, get,getById, remove }

  };


    

 
  



  

