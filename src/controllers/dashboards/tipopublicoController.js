const database = require("../../database/connection");

class tipoPublico {
    gettipoPublico(request, response) {
    const dados = request.params
    console.log(dados.idcidade);
    database
    .raw(
        "select '17-30 anos' as name, count(*) as data from usuario  u " +
        "inner join viagem v on v.UsuarioID = u.UsuarioID " +
        "inner join pessoa p on p.PessoaID = u.PessoaID " +
        "where now() >= Checkin and now() <= Checkout and CidadeIDDestino = ? " +
        "and idade >= 17 and idade < 31 " +
        "union all " +
        "select '31-50 anos' as name, count(*) as data from usuario  u " +
        "inner join viagem v on v.UsuarioID = u.UsuarioID " +
        "inner join pessoa p on p.PessoaID = u.PessoaID " +
        "where now() >= Checkin and now() <= Checkout and CidadeIDDestino = ? " +
        "and idade >= 31 and idade < 51 " +
        "union all " +
        "select 'Acima de 51' as name, count(*) as data from usuario  u " +
        "inner join viagem v on v.UsuarioID = u.UsuarioID " +
        "inner join pessoa p on p.PessoaID = u.PessoaID " +
        "where now() >= Checkin and now() <= Checkout and CidadeIDDestino = ? " +
        "and idade >= 51;", 
        [dados.idcidade, dados.idcidade, dados.idcidade]
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

module.exports = new tipoPublico();