const database = require("../../database/connection");

class ncheckin {
  getNcheckin(request, response) {
    const dados = request.params
    console.log(dados.idcidade);
    database
    .raw(
        "select count(distinct r.UsuarioID) " +
        "as n from registro r " +
        "inner join estabelecimento e on e.EstabelecimentoID = r.EstabelecimentoID " +
        "where DATE_FORMAT(r.DataHora,'%Y/%m/%d')  = CURDATE() and e.CidadeID = ?;", 
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

module.exports = new ncheckin();