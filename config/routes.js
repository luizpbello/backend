const admin = require("./admin");

module.exports = (app) => {
  app.post("/signup", app.api.user.save);
  app.post("/signin", app.api.auth.signin);
  app.post("/validateToken", app.api.auth.validateToken);

  app
    .route("/users")
   // .all(app.config.passport.authenticate())
    .post(admin(app.api.user.save))
    .get(admin(app.api.user.get));

  app
    .route("/users/:id")
    //.all(app.config.passport.authenticate())
    .get(admin(app.api.user.getUserById))
    .put(admin(app.api.user.save))
    .delete(admin(app.api.user.remove));

  app
    .route("/clients")
    //.all(app.config.passport.authenticate())
    .post(app.api.clients.save)
    .get(app.api.clients.get);

  app
    .route("/clients/:id")
    //.all(app.config.passport.authenticate())
    .delete(app.api.clients.remove);

  app
    .route("/pets")
    //.all(app.config.passport.authenticate())
    .post(app.api.pets.save)
    .get(app.api.pets.get);

  app
    .route("/pets/:id")
    //.all(app.config.passport.authenticate())
    .get(app.api.pets.getPetById)
    .put(app.api.pets.save)
    .delete(app.api.pets.remove);

  app
    .route("/services")
    //.all(app.config.passport.authenticate())
    .get(app.api.services.get)
    .post(app.api.services.save);

  app
    .route("/services/:id")
    //.all(app.config.passport.authenticate())
    .delete(app.api.services.remove)
    .put(app.api.services.save);

  app
    .route("/scheduling")
    //.all(app.config.passport.authenticate())
    .post(app.api.scheduling.save)
    .get(app.api.scheduling.get);

  app
    .route("/scheduling/:id")
   // .all(app.config.passport.authenticate())
    .delete(app.api.scheduling.remove)
    .put(app.api.scheduling.save)
    .get(app.api.scheduling.getById);


    app
    .route("/stat")
    //.all(app.config.passport.authenticate())
    .get(app.api.stat.get)

};
