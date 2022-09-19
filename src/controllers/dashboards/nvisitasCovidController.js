const database = require("../../database/connection");

class visitasCovid {
    getVisitasCovid(request, response) {
    const dados = request.params
    console.log(dados.idcidade);
    database
    .raw(
        "select 'primeira' as name, count(*) as data from usuario  u " +
        "inner join viagem v on v.UsuarioID = u.UsuarioID " +
        "inner join pessoa p on p.PessoaID = u.PessoaID " +
        "where now() >= Checkin and now() <= Checkout and CidadeIDDestino = ? " +
        "and v.Primeiravez = 1 " +
        "union all " +
        "select 'mais' as name, count(*) as data from usuario  u " +
        "inner join viagem v on v.UsuarioID = u.UsuarioID " +
        "inner join pessoa p on p.PessoaID = u.PessoaID " +
        "where now() >= Checkin and now() <= Checkout and CidadeIDDestino = ? " +
        "and v.Primeiravez = 0 " +
        "union all " +
        "select 'covidSprimeira' as name, count(*) as data from usuario  u " +
        "inner join viagem v on v.UsuarioID = u.UsuarioID " +
        "inner join pessoa p on p.PessoaID = u.PessoaID " +
        "where now() >= Checkin and now() <= Checkout and CidadeIDDestino = ? " +
        "and v.VacinaCovid = 1 " +
        "union all " +
        "select 'covidSmais' as name, count(*) as data from usuario  u " +
        "inner join viagem v on v.UsuarioID = u.UsuarioID " +
        "inner join pessoa p on p.PessoaID = u.PessoaID " +
        "where now() >= Checkin and now() <= Checkout and CidadeIDDestino = ? " +
        "and v.VacinaCovid > 1 " +
        "union all " +
        "select 'naoVacinado' as name, count(*) as data from usuario  u " +
        "inner join viagem v on v.UsuarioID = u.UsuarioID " +
        "inner join pessoa p on p.PessoaID = u.PessoaID " +
        "where now() >= Checkin and now() <= Checkout and CidadeIDDestino = ? " +
        "and v.VacinaCovid = 0;", 
        [dados.idcidade,dados.idcidade,dados.idcidade,dados.idcidade,dados.idcidade]
    )
    .then((retorno) => {
        console.log("Numero: ");
        console.log(retorno[0]);
        response.json(retorno[0]);
    })
    .catch((error) => {
        console.log(error);
    });
  }
}

module.exports = new visitasCovid();