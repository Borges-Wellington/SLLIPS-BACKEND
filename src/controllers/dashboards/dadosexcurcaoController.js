const database = require("../../database/connection");

class dadosExcursao {
  getDadosExcursao(request, response) {
    const dados = request.params
    console.log(dados.idcidade);
    database
    .raw(
        "select 'Hospegagem' as name, " +
        "(	 " +
        "    select count(*) from viagem v  " +
        "    inner join tipo t on v.TipoID = t.TipoID " +
        "    where now() >= v.Checkin and now() <= v.Checkout and v.CidadeIDDestino = ? " +
        "    and v.HopedagemID != null and t.NomeTipo='ONIBUS' " +
        ") as onibus, " +
        "count(*) as passageiros from usuario  u  " +
        "inner join viagem v on v.UsuarioID = u.UsuarioID " +
        "inner join pessoa p on p.PessoaID = u.PessoaID " +
        "where now() >= Checkin and now() <= Checkout and CidadeIDDestino = ? " +
        "and v.HopedagemID != null  " +
        "union all " +
        "select 'IdaEvolta' as name,  " +
        "(	 " +
        "    select count(*) from viagem v  " +
        "    inner join tipo t on v.TipoID = t.TipoID " +
        "    where now() >= v.Checkin and now() <= v.Checkout and v.CidadeIDDestino = ? " +
        "    and (v.HopedagemID = null or v.HopedagemID = 0) and t.NomeTipo='ONIBUS' " +
        ") as onibus, " +
        "count(*) as passageiros from usuario  u  " +
        "inner join viagem v on v.UsuarioID = u.UsuarioID " +
        "inner join pessoa p on p.PessoaID = u.PessoaID " +
        "where now() >= Checkin and now() <= Checkout and CidadeIDDestino = ? " +
        "and (v.HopedagemID = null or v.HopedagemID = 0);", 
        [dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade]
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

module.exports = new dadosExcursao();