const bcrypt = require("bcrypt-nodejs");

module.exports = (app) => {
  const { existsOrError, notExistsOrError, equalsOrError, validPassword } =
    app.api.validation;

  //GERAR HASH PARA ENCRIPTAR A SENHA SALVA NO DB
  const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  //MÉTODO PARA INSERIR NOVO USUÁRIO OU ALTERAR USUÁRIO EXISTENTE
  const save = async (req, res) => {
    const user = { ...req.body };
    if (req.params.id) user.id = req.params.id; //VERIFICA SE VEIO ID NO BODY DA REQUISIÇÃO,SE NÃO,DEIXA O ID VAZIO

    //if (!req.originalUrl.startsWith("/users")) user.admin = false; //VERIFICA SE A URL DA REQUISIÇÃO É DE USUÁRIO OU DE ADMIN
    //if (!req.user || !req.user.admin) user.admin = false; //VERIFICA SE O USUÁRIO É ADMIN OU NÃO SE NÃO, SETA COMO FALSE

    try {
      existsOrError(user.name, "Nome não informado");
      existsOrError(user.email, "E-mail não informado");
      existsOrError(user.password, "Senha não informada");
      existsOrError(user.confirmPassword, "Confirmação de senha inválida");
      equalsOrError(user.password, user.confirmPassword, "Senhas não conferem");
      validPassword(user.password, "Senha precisa ter no mínimo 6 caracteres");

      const userFromDB = await app
        .db("users") //VERIFICA SE O E-MAIL JÁ EXISTE NO DB
        .where({ email: user.email })
        .first();

      if (!user.id) {
        //SE TIVER ID, SIGNIFICA QUE JA EXISTE UM USUÁRIO COM ESSE E-MAIL
        notExistsOrError(userFromDB, "Usuário já cadastrado");
      }
    } catch (msg) {
      return res.status(400).send(msg);
    }

    user.password = encryptPassword(user.password); //ENCRIPTA A SENHA
    delete user.confirmPassword;

    if (user.id) {
      app
        .db("users")
        .update(user)
        .where({ id: user.id })
        .then(() => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db("users")
        .insert(user)
        .then(() => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    }
  };

  //MÉTODO PARA BUSCAR USUÁRIO PELO ID
  const get = (req, res) => {
    app
      .db("users")
      .select("id", "name", "username", "email", "is_admin")
      .then((users) => res.json(users))
      .catch((err) => res.status(500).send(err));
  };

  const getUserById = (req, res) => {
    app
      .db("users")
      .select("id", "name", "username", "email", "is_admin")
      .where({ id: req.params.id })
      .first()
      .then((user) => res.json(user))
      .catch((err) => res.status(500).send({ erro: err }));
  };

  const remove = (req, res) => {
    app
      .db("users")
      .where({ id: req.params.id })
      .first()
      .del()
      .then(() => res.status(204).send())
      .catch((err) => res.status(500).send(err));
  };
  return { save, get, getUserById, remove };
};
