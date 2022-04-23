const database = require("../database/connection");

class registroController {
  getRegistro_Usuario(request, response) {
    const dados = request.params;
    console.log(dados.UsuarioID);
    database
      .select("*")
      .table("registro")
      .where({ UsuarioID: dados.UsuarioID })
      .then((retorno) => {
        console.log("registro usu");
        console.log(retorno);
        response.json(retorno);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  getRegistro_Viagem(request, response) {
    const dados = request.params;
    console.log(dados.ViagemID);
    database
      .select("*")
      .table("registro")
      .innerJoin("estabelecimento", "registro.EstabelecimentoID", "estabelecimento.EstabelecimentoID")
      .innerJoin("cidade", "estabelecimento.CidadeID", "cidade.CidadeID")
      .where({ ViagemID: dados.ViagemID })
      .then((retorno) => {
        console.log("registro viagem");
        console.log(retorno);
        response.json(retorno);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getRegistro_Estabelecimento(request, response) {
    const dados = request.params;
    console.log(dados.EstabelecimentoID);
    database
      .select("*")
      .table("registro")
      .where({ EstabelecimentoID: dados.EstabelecimentoID })
      .then((retorno) => {
        console.log("registro estab");
        console.log(retorno);
        response.json(retorno);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  postRegistro(request, response) {
    const insertData = request.body;
    var today = new Date();
    var date =
      today.getFullYear() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dataagora = date + " " + time;

    const ViagemID = 0;
    database
      .raw(
        "select * from viagem where now() >= Checkin and now() <= Checkout and UsuarioID = ?;",
        [insertData.UsuarioID]
      )
      .then((retorno) => {
        console.log(retorno);
        if (retorno.ViagemID != null) {
          ViagemID = retorno.ViagemID;
        } else {
          ViagemID = 0;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    database
      .insert({
        EstabelecimentoID: insertData.EstabelecimentoID,
        UsuarioID: insertData.UsuarioID,
        Valor: insertData.Valor,
        DataHora: dataagora,
        ViagemID: ViagemID,
      })
      .into("registro")
      .then((data) => {
        console.log({ insert: "OK" });
        response.send({ insert: "OK" });
      })
      .catch((err) => {
        console.log(err);
        response.send(err);
      });
  }

  deleteRegistro(request, response) {
    const dados = request.params;
    console.log(dados.RegistroID);
    database
      .table("registro")
      .where({ RegistroID: dados.RegistroID })
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
