const database = require('../database/connection')

class avaliacaoController {

    getAvaliacao(request,response){
        const dados = request.params
        console.log(dados.EstabelecimentoID)
        database.select("*").table("avaliacao").where({EstabelecimentoID: dados.EstabelecimentoID}).then(retorno=>{
            console.log("avaliacao")
            console.log(retorno)
            response.json(retorno)
        }).catch(error=>{
            console.log(error)
        })
    }

    postAvaliacao(request,response){
        const insertData = request.body
        database.insert(insertData).into('avaliacao').then(data => { 
           console.log({"insert": "OK"})
           response.send({"insert": "OK"})
        }).catch(err => {
          console.log(err)
          response.send(err)
        })
    }

    deleteAvaliacao(request,response){
        const dados = request.params
        console.log(dados.AvaliacaoID)
        database.table("avaliacao").where({AvaliacaoID: dados.AvaliacaoID}).del().then(data => { 
           console.log({"Delete": "OK"})
           response.send({"Delete": "OK"})
        }).catch(err => {
          console.log(err)
          response.send(err)
        })
    }
}

module.exports = new avaliacaoController()