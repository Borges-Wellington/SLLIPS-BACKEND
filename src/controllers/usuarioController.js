const database = require("../database/connection");

class usuarioController {
  getUsuarioSenha(request, response) {
    const dados = request.params;
    console.log(dados.Login);
    console.log(dados.Senha);
    database
      .select("*")
      .table("usuario")
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

  getUsuarioDash(request, response) {
    const dados = request.params;
    console.log(dados.Login);
    console.log(dados.Senha);
    database
      .select("*")
      .table("usuario_dash")
      .innerJoin("cidade", "usuario_dash.CidadeID", "cidade.CidadeID")
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
      .innerJoin("pessoa", "usuario.PessoaID", "pessoa.PessoaID")
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
    console.log(dados.cpf);
    console.log(dados.email);
    console.log(dados.novasenha);
    database
      .table("usuario")
      .where({ Cpf: dados.cpf, Login: dados.email })
      .innerJoin("pessoa", "usuario.PessoaID", "pessoa.PessoaID")
      .update({ Senha: dados.novasenha })
      .then((data) => {
        console.log({ Update: "OK", dados: data });
        response.send({ Update: "OK", dados: data });
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
        .insert({ Nome: insertData.Nome, Cpf: insertData.Cpf })
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
  putUsuario(request, response) {
    const dados = request.body;
    database
      .table("usuario")
      .where({ UsuarioID: dados.UsuarioID })
      .update({
        Nome: dados.Nome,
        Uri: dados.Uri,
      })
      .then((data) => {
        console.log({ update: "OK" });
        response.send({ update: "OK" });
      })
      .catch((err) => {
        console.log(err);
        response.send(err);
      });
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
