const server = require("express").Router();
const axios = require("axios");
const { request, response } = require("express");
const { Raza, Temperament } = require("../db");
const { YOUR_API_KEY } = process.env;

server.get("/", async (req, res, next) => {
  try {
    let word = req.query.name;
    if (word) {
      word = word.toLowerCase();
      try {
        console.log(word);
        let all = [];
        const list = await axios
          .get("https://api.thedogapi.com/v1/breeds?api_key={YOUR_API_KEY}")
          .then((e) => {
            all = e.data;
          });
        const perri = await Raza.findAll({
          include: [{ model: Temperament }],
        });

        if (perri.length) {
          perri.map((e) => {
            all.push(e);
          });
        }

        let filteredBreeds = all.filter((p) =>
          p.name.toLowerCase().includes(word)
        );
        if (!filteredBreeds.length) {
          return res.status(400).json({
            error:
              "No existe ninguna raza de perro que coincida con ese parámetro",
          });
        }
        filteredBreeds = filteredBreeds.map(({ name }) => ({ name }));
        return res.json(filteredBreeds);
      } catch (error) {
        next(error);
      }
    }

    // get sin word

    let all = [];
    const list = await axios
      .get("https://api.thedogapi.com/v1/breeds?api_key={YOUR_API_KEY}")
      .then((e) => {
        all = e.data;
      });
    const perri = await Raza.findAll({
      include: [{ model: Temperament }],
    });
    if (perri.length) {
      perri.map((e) => {
        all.push(e);
      });
      all = all.sort(function (a, b) {
        return a.name - b.name;
      });
    }
    let catalog = [];
    if (all.length) {
      all.forEach((element) => {
        let temps = "";
        if (element.temperament) {
          temps = element.temperament;
        } else if (element.temperaments) {
          const aux = element.temperaments.map((te) => {
            return te["temperament"];
          });
          temps = aux.join(", ");
        } else {
          temps = "No tiene temperamentos cargados";
        }

        const obj = {
          id: element.id,
          name: element.name,
          image: element.image.url,
          height: element.height.metric,
          weight: element.weight.metric,
          lifeSpan: element.life_span,
          temperament: temps,
        };
        catalog.push(obj);
      });
    }

    return res.json(catalog);
  } catch (error) {
    next(error);
  }
});

server.get("/:idRaza", async (req, res, next) => {
  const { idRaza } = req.params;
  console.log(idRaza);
  try {
    let all = [];
    const list = await axios
      .get("https://api.thedogapi.com/v1/breeds?api_key={YOUR_API_KEY}")
      .then((e) => {
        all = e.data;
      });
    const perri = await Raza.findAll({
      include: [{ model: Temperament }],
    });
    if (perri.length) {
      perri.map((e) => {
        all.push(e);
      });
    }
    let filteredBreeds = all.filter((p) => p.id.toString() === idRaza);
    if (!filteredBreeds.length) {
      return res.status(400).json({
        error: "No existe ninguna raza de perro que coincida con ese parámetro",
      });
    }
    let catalog = [];
    filteredBreeds.forEach((element) => {
      let temps = "";
      if (element.temperament) {
        temps = element.temperament;
      } else if (element.temperaments) {
        const aux = element.temperaments.map((te) => {
          return te["temperament"];
        });
        temps = aux.join(", ");
      } else {
        temps = "No tiene temperamentos cargados";
      }
      const obj = {
        id: element.id,
        name: element.name,
        image: element.image.url,
        height: element.height.metric,
        weight: element.weight.metric,
        lifeSpan: element.life_span,
        temperament: temps,
      };
      return res.json(obj);
    });
  } catch (error) {
    next(error);
  }
});

module.exports = server;
