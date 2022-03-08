import express from "express";
import { promises as fs } from "fs";

const app = express();

app.use(express.json());

global.filename = "car-list.json";

app.get("/marcas/maisModelos", async (req, res) => {
  const data = JSON.parse(await fs.readFile(global.filename));

  const carNomeMarcarMaior = data.sort((i1, i2) => {
    /** */
    if (i1.models.length < i2.models.length) {
      return -1;
    } else if (i1.models.length > i2.models.length) {
      return 1;
    } else {
      return 0;
    }
  });

  let ultimoElemento = carNomeMarcarMaior.length - 1;

  let novoElemento;
  let elementosAlterados = [];

  for (let i = 0; i < carNomeMarcarMaior.length; i++) {
    let quantidadeMarcaMaior = carNomeMarcarMaior[ultimoElemento].models.length;

    if (quantidadeMarcaMaior === carNomeMarcarMaior[i].models.length) {
      novoElemento = carNomeMarcarMaior[i].brand;
      elementosAlterados.push(novoElemento);
    }
  }

  let novaData = elementosAlterados;
  // console.log(novaData);
  res.send(JSON.stringify(novaData));
});

app.get("/marcas/menosModelos", async (req, res) => {
  const data = JSON.parse(await fs.readFile(global.filename));

  const carNomeMarcaMenor = data.sort((i1, i2) => {
    if (i1.models.length < i2.models.length) {
      return -1;
    } else if (i1.models.length > i2.models.length) {
      return 1;
    } else {
      return 0;
    }
  });

  //console.log(carNomeMarcaMenor);

  let primeiroElemento = 0;
  let novoElemento = [];
  let elementosAlterados = [];

  for (let i = 0; i < carNomeMarcaMenor.length; i++) {
    let quantidadeMarcaMenor =
      carNomeMarcaMenor[primeiroElemento].models.length;

    if (quantidadeMarcaMenor === carNomeMarcaMenor[i].models.length) {
      novoElemento = carNomeMarcaMenor[i].brand;
      elementosAlterados.push(novoElemento);
    }
  }

  let novaData = elementosAlterados;
  //console.log(novaData);

  res.send(JSON.stringify(novaData));
});

app.get("/marcas/listaMaisModelos/:id", async (req, res, next) => {
  const data = JSON.parse(await fs.readFile(global.filename));

  const carNomeMarcaMaiorModelos = data.sort((i1, i2) => {
    if (i1.models.length < i2.models.length) {
      return 1;
    } else if (i1.models.length > i2.models.length) {
      return -1;
    } else {
      return 0;
    }
  });

  const carNomeMarcaMaiorModelosIguais = carNomeMarcaMaiorModelos.sort(
    (i1, i2) => {
      if (i1.models.length === i2.models.length) {
        var valorAlfabeto1 = i1.brand.charCodeAt(0);
        var valorAlfabeto2 = i2.brand.charCodeAt(0);
        var valor2Alfabeto1 = i1.brand.charCodeAt(1);
        var valor2Alfabeto2 = i2.brand.charCodeAt(1);

        console.log("valorAlfabeto1" + valorAlfabeto1);
        console.log("valorAlfabeto2" + valorAlfabeto2);
        if (valorAlfabeto1 < valorAlfabeto2) {
          return -1;
        } else if (valorAlfabeto1 == valorAlfabeto2) {
          if (valor2Alfabeto1 < valor2Alfabeto2) {
            return -1;
          } else {
            return 1;
          }
        } else {
          return 1;
        }
      }
    }
  );
  console.log(carNomeMarcaMaiorModelosIguais);

  // const buscador = parseInt(req.params.id);
  // console.log(carNomeMarcaMaiorModelos);

  let novoMarca;
  let novoModelo;
  let elementosAlterados = [];

  for (let i = 0; i < carNomeMarcaMaiorModelosIguais.length; i++) {
    //console.log("PAssou por aqui carNomeMarcaMenor.length"+carNomeMarcaMaisModelos[i].models.length+"index"+carNomeMarcaMaisModelos.length);

    if (
      carNomeMarcaMaiorModelosIguais[i].models.length > parseInt(req.params.id)
    ) {
      //  console.log("buscador2");
      //    console.log("Entrou no if");
      novoMarca = carNomeMarcaMaiorModelosIguais[i].brand;
      //   console.log("novoMarca" + novoMarca);

      novoModelo = carNomeMarcaMaiorModelosIguais[i].models.length;
      //    console.log("novoModelo" + novoModelo);
      elementosAlterados.push(novoMarca + "-" + novoModelo);
      //    console.log(elementosAlterados);
    }
  }

  //console.log("elementosAlterados"+elementosAlterados);

  res.send(JSON.stringify(elementosAlterados));
});

/////////////////listaMenos///////////////////listaMenos

app.get("/marcas/listaMenos/:id", async (req, res, next) => {
  const data = JSON.parse(await fs.readFile(global.filename));

  const carNomeMarcaMenosModelos = data.sort((i1, i2) => {
    if (i1.models.length < i2.models.length) {
      return -1;
    } else if (i1.models.length > i2.models.length) {
      return 1;
    } else {
      return 0;
    }
  });

  // const buscador = parseInt(req.params.id);
  //console.log(buscador);

  let novoMarca;
  let novoModelo;
  let elementosAlterados = [];

  for (let i = 0; i < carNomeMarcaMenosModelos.length; i++) {
    //console.log("PAssou por aqui carNomeMarcaMenor.length"+carNomeMarcaMaisModelos[i].models.length+"index"+carNomeMarcaMaisModelos.length);

    if (carNomeMarcaMenosModelos[i].models.length < parseInt(req.params.id)) {
      console.log("buscador2");
      console.log("Entrou no if");
      novoMarca = carNomeMarcaMenosModelos[i].brand;
      console.log("novoMarca" + novoMarca);

      novoModelo = carNomeMarcaMenosModelos[i].models.length;
      console.log("novoModelo" + novoModelo);
      elementosAlterados.push(novoMarca + "-" + novoModelo);
      console.log(elementosAlterados);
    }
  }

  res.send(JSON.stringify(elementosAlterados));
});

app.post("/marcas/listaModelos", async (req, res, next) => {
  console.log("Entou no post");

  const data = JSON.parse(await fs.readFile(global.filename));

  let listaBody = req.body;

  console.log("listaBody" + listaBody.nomeMarca);
  let nomeMarca = listaBody.nomeMarca;
  // console.log(nomeMarca.toLowerCase());
  console.log("CONTADOR" + nomeMarca);

  let novoMarca;
  let novoModelo;
  let elementosAlterados = [];

  for (let i = 0; i < data.length; i++) {
    //		let nomeMarca = (listaBody.nomeMarca);
    // let nomeMarca = "suzuki";

    if (nomeMarca.toLowerCase() == data[i].brand.toLowerCase()) {
      novoMarca = data[i].brand;
      novoModelo = data[i].models;
      console.log("nomeMarca.toLowerCase()" + nomeMarca.toLowerCase());
      console.log("data[i].brand.toLowerCase()" + data[i].brand.toLowerCase());
      elementosAlterados.push([novoMarca, novoModelo]);
    }
  }

  console.log(JSON.stringify(elementosAlterados));

  res.send(JSON.stringify(elementosAlterados));
});

app.listen(3000, () => {
  console.log("Api rodando!!");
  console.log(filename);
});
