const database = require("../database/connection");

class usuarioController {
  getUsuarioSenha(request, response) {
    const dados = request.params;
    console.log(dados.Login);
    console.log(dados.Senha);
    database
      .select("*")
      .table("usuario")
      .innerJoin("estabelecimento", "usuario.UsuarioID", "estabelecimento.UsuarioID")
      .where({ Login: dados.Login, Senha: dados.Senha })
      .then((retorno) => {
        console.log("usuario");
        console.log(retorno);
        response.json(retorno);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getUsuario(request, response) {
    const dados = request.params;
    console.log(dados.UsuarioID);
    database
      .select("*")
      .table("usuario")
      .where({ UsuarioID: dados.UsuarioID })
      .then((retorno) => {
        console.log("usuario");
        console.log(retorno);
        response.json(retorno);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  alterarSenha(request, response) {
    const dados = request.body;
    console.log(dados.UsuarioID);
    console.log(dados.NovaSenha);
    database
      .table("usuario")
      .where({ UsuarioID: dados.UsuarioID })
      .update({ Senha: dados.Senha })
      .then((data) => {
        console.log({ Update: "OK" });
        response.send({ Update: "OK" });
      })
      .catch((err) => {
        console.log(err);
        response.send(err);
      });
  }

  postUsuario(request, response) {
    const insertData = request.body;
    try {
      database
        .insert({ Nome: insertData.Nome })
        .returning("PessoaID")
        .into("pessoa")
        .then((PessoaID) => {
          console.log({ insert: "OK" });

          database
            .insert({
              Login: insertData.Login,
              Senha: insertData.Senha,
              PessoaID: PessoaID,
            })
            .into("usuario")
            .then((data) => {
              console.log({ "insert user": "OK" });
              response.send({ insert: "OK" });
            })
            .catch((err) => {
              console.log(err);
              response.send(err);
            });
        })
        .catch((err) => {
          console.log(err);
          response.send(err);
        });
    } catch (error) {
      console.log(err);
      response.send(err);
    }
  }

  deleteUsuario(request, response) {
    const dados = request.params;
    console.log(dados.UsuarioID);
    database
      .table("usuario")
      .where({ UsuarioID: dados.UsuarioID })
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

module.exports = new usuarioController();
