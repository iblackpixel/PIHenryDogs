const server = require("express").Router();
const axios = require("axios");
const { request, response, Router } = require("express");
const { Raza, Temperament } = require("../db.js");
const { YOUR_API_KEY } = process.env;

server.get("/", async (req, res, next) => {
  try {
    let catalog = [];
    let all = [];
    const perro = await Temperament.findAll({
      include: [{ model: Raza }],
    });
    if (perro.length === 0) {
      const list = await axios
        .get("https://api.thedogapi.com/v1/breeds?api_key={YOUR_API_KEY}")
        .then((e) => {
          all = e.data;
        });
      all.forEach((element) => {
        if (element["temperament"]) {
          let aux1 = element["temperament"].split(", ");
          for (let i = 0; i < aux1.length; i++) {
            const e = aux1[i];
            if (!catalog.includes(e)) {
              catalog.push(e);
            }
          }
        }
      });
      catalog.map((t) => {
        let aux = {
          temperament: t,
          id: catalog.indexOf(t),
        };

        const tempCreated = Temperament.create(aux);
      });
      return res.json(catalog);
    }
    return res.json(perro);
  } catch (error) {
    next(error);
  }
});

module.exports = server;
