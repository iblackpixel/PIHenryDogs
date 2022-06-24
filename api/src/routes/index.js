const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const allDogs = require("./dogs.js");
const newDog = require("./dog.js");
const allTemperamentos = require("./temperament.js");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//router.use("/razas", allRazas)
router.use("/dogs", allDogs);
router.use("/temperament", allTemperamentos);
router.use("/dog", newDog);
module.exports = router;
