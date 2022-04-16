const database = require("../database/connection");

class registroController {
  getTipoViagem(request, response) {
    const dados = request.params;
    console.log(dados.NomeTipo);
    if (dados.NomeTipo == "*") {
      database
        .select("*")
        .table("tipo")
        .then((retorno) => {
          console.log("todos");
          console.log(retorno);
          response.json(retorno);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      database
        .select("*")
        .table("tipo")
        .where({ NomeTipo: dados.NomeTipo })
        .then((retorno) => {
          console.log("atividade");
          console.log(retorno);
          response.json(retorno);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  getTipoviagem_Usuario(request, response) {
    const dados = request.params;
    console.log(dados.UsuarioID);
    database
      .select("*")
      .table("tipo_viagem")
      .where({ UsuarioID: dados.UsuarioID })
      .then((retorno) => {
        console.log("tipo viagem usu");
        console.log(retorno);
        response.json(retorno);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getTipoviagem(request, response) {
    const dados = request.params;
    console.log(dados.TipoViagemID);
    if (dados.TipoViagemID == "*") {
      database
        .select("*")
        .table("tipo_viagem")
        .then((retorno) => {
          console.log("todos");
          console.log(retorno);
          response.json(retorno);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      database
        .select("*")
        .table("tipo_viagem")
        .where({ TipoViagemID: dados.TipoViagemID })
        .then((retorno) => {
          console.log("tipo viagem");
          console.log(retorno);
          response.json(retorno);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  postTipoviagem(request, response) {
    const insertData = request.body;
    database
      .insert(insertData)
      .into("tipo_viagem")
      .then((data) => {
        console.log({ insert: "OK" });
        response.send({ insert: "OK" });
      })
      .catch((err) => {
        console.log(err);
        response.send(err);
      });
  }

  deleteTipoviagem(request, response) {
    const dados = request.params;
    console.log(dados.TipoViagemID);
    database
      .table("tipo_viagem")
      .where({ TipoViagemID: dados.TipoViagemID })
      .del()
      .then((data) => {
        console.log({ Delete: "OK" });
        response.send({ Delete: "OK" });
      })
      .catch((err) => {
        console.log(err);
        response.send(err);
      });
  }
}

module.exports = new registroController();
