const database = require('../database/connection')

class estabelecimentoController {

    getEstabelecimento(request,response){
        const dados = request.params
        console.log(dados.EstabelecimentoID)
        database.select("*").table("estabelecimento").where({EstabelecimentoID: dados.EstabelecimentoID}).then(retorno=>{
            console.log("estabelecimento")
            console.log(retorno)
            response.json(retorno)
        }).catch(error=>{
            console.log(error)
        })
    }

    getBuscaEstabelecimento(request,response){
        const dados = request.params
        console.log(dados.NomeEstabelecimento)
        if(dados.NomeCidade == "*" ) {
            database.select("*").table("estabelecimento").then(retorno=>{
                console.log("todos")
                console.log(retorno)
                response.json(retorno)
            }).catch(error=>{
                console.log(error)
            })
        } else{
            database.select("*").table("estabelecimento").where({NomeEstabelecimento: dados.NomeEstabelecimento}).then(retorno=>{
                console.log("estabelecimento")
                console.log(retorno)
                response.json(retorno)
            }).catch(error=>{
                console.log(error)
            })
        }
    }

    postEstabelecimento(request,response){
        const insertData = request.body
        database.insert(insertData).into('estabelecimento').then(data => { 
           console.log({"insert": "OK"})
           response.send({"insert": "OK"})
        }).catch(err => {
          console.log(err)
          response.send(err)
        })
    }

    deleteEstabelecimento(request,response){
        const dados = request.params
        console.log(dados.EstabelecimentoID)
        database.table("estabelecimento").where({EstabelecimentoID: dados.EstabelecimentoID}).del().then(data => { 
           console.log({"Delete": "OK"})
           response.send({"Delete": "OK"})
        }).catch(err => {
          console.log(err)
          response.send(err)
        })
    }
}

module.exports = new estabelecimentoController()