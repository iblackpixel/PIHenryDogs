const server = require("express").Router();
const axios = require("axios");
const { Model } = require("sequelize");
const { request, response } = require("express");
const { Raza, Temperament } = require("../db.js");
let serie = 0;

server.post("/", async (req, res, next) => {
  try {
    const { name, height, weight, lifespan, temperaments } = req.body;
    const perri = await Raza.findAll({
      include: [{ model: Temperament }],
    });
    const perro = await Temperament.findAll({
      include: [{ model: Raza }],
    });
    serie = perri.length;
    const result = await Raza.create({
      name: name,
      id: "b" + serie,
      height: { metric: height },
      weight: { metric: weight },
      life_span: lifespan,

      image: { url: "https://i.ibb.co/xD1DvjM/dog.png" },
    });

    let ide = [];
    temperaments.forEach((element) => {
      const filtroId = perro.filter((p) => p.temperament === element);
      ide.push(filtroId[0].id);
    });
    ide.map((t) => {
      Temperament.findByPk(t).then((oneTemperament) => {
        Raza.findByPk("b" + serie)
          .then((newRaza) => {
            oneTemperament.addRaza(newRaza);
          })
          .catch((error) => {
            return res.status(400).json(console.log(error));
          });
      });
    });
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = server;
