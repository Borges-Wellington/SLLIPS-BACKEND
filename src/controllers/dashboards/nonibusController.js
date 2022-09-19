const database = require("../../database/connection");

class nonibus {
  getNonibus(request, response) {
    const dados = request.params
    console.log(dados.idcidade);
    database
    .raw(
        'select count(*) + ' +
        '( ' +
        '    select if(isnull(Sum(Acompanhantes)),0,Sum(Acompanhantes)) as n from viagem v' +
        '    inner join tipo t on v.TipoID = t.TipoID' +
        '    where now() >= v.Checkin and now() <= v.Checkout and t.NomeTipo="ONIBUS" and v.CidadeIDDestino = ?' +
        ') ' +
        'as n from viagem v ' +
        'inner join tipo t on v.TipoID = t.TipoID  ' +
        'where now() >= v.Checkin and now() <= v.Checkout and t.NomeTipo="ONIBUS" and v.CidadeIDDestino = ?;', 
        [dados.idcidade, dados.idcidade]
    )
    .then((retorno) => {
        console.log("Numero: ");
        var resposta = retorno[0];
        resposta = resposta[0];
        console.log(resposta.n);
        response.json(resposta.n);
    })
    .catch((error) => {
        console.log(error);
    });
  }
}

module.exports = new nonibus();