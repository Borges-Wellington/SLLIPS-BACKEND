const database = require("../../database/connection");

class nEstados {
  getNEstados(request, response) {
    const dados = request.params
    console.log(dados.idcidade);
    database
    .raw(
        "select if(isnull(c.UF),'-',c.UF) as estado, count(*) as qtde  from usuario  u " +
        "inner join viagem v on v.UsuarioID = u.UsuarioID " +
        "inner join localidade l on l.LocalidadeID = u.LocalidadeID " +
        "inner join logradouro lo on lo.LogradouroID = l.LogradouroID " +
        "inner join bairro b on b.BairroID = lo.BairroID " +
        "inner join cidade c on c.CidadeID = b.CidadeID " +
        "where now() >= Checkin and now() <= Checkout and CidadeIDDestino = ? order by c.UF;", 
        [dados.idcidade]
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

module.exports = new nEstados();