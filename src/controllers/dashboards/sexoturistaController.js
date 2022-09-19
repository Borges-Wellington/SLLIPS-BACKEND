const database = require("../../database/connection");

class sexoTuristas {
    getSexoTuristas(request, response) {
    const dados = request.params
    console.log(dados.idcidade);
    database
    .raw(
        "select p.Sexo as name, count(*) as data  from usuario  u " +
        "inner join viagem v on v.UsuarioID = u.UsuarioID " +
        "inner join pessoa p on p.PessoaID = u.PessoaID " +
        "where now() >= Checkin and now() <= Checkout and CidadeIDDestino = ? " +
        "group by p.Sexo;", 
        [dados.idcidade]
    )
    .then((retorno) => {
        var resposta = retorno[0];
        resposta = resposta[0];
        console.log(resposta);
        response.json(resposta);
    })
    .catch((error) => {
        console.log(error);
    });
  }
}

module.exports = new sexoTuristas();