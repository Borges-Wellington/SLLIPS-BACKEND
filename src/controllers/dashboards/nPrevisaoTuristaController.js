const database = require("../../database/connection");

class nprevisaoTurista {
  getprevisaoturista(request, response) {
    const dados = request.params
    console.log(dados.idcidade);
    database
    .raw(
        "select count(*) " +
        "as n from viagem v " +
        "inner join tipo t on v.TipoID = t.TipoID " +
        "where DATE_FORMAT(v.Checkin,'%Y/%m/%d') = CURDATE() " +
        "and t.NomeTipo not in('ONIBUS') and v.CidadeIDDestino = ?;", 
        [dados.idcidade]
    )
    .then((retorno) => {
        console.log("Numero : ");
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

module.exports = new nprevisaoTurista();