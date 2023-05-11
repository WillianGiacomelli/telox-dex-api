const { Router } = require("express");

trainerController = require("../controllers/trainers.controllers");

routes = Router();

routes.post("/trainers", trainerController.create);

routes.get("/trainers", trainerController.list);

routes.get("/trainers/:id", trainerController.getById);

routes.put("/trainers/:id", trainerController.update);

routes.delete("/trainers/:id", trainerController.remove);

module.exports = routes;
