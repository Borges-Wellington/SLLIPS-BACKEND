const database = require('../database/connection')

class localidadeController {

    getLocalidade(request,response){
        const dados = request.params
        console.log(dados.LocalidadeID)
        database.select("*").table("localidade").where({LocalidadeID: dados.LocalidadeID}).then(retorno=>{
            console.log("localidade")
            console.log(retorno)
            response.json(retorno)
        }).catch(error=>{
            console.log(error)
        })
    }

    getLocalidadeBusca(request,response){
        const dados = request.params
        console.log(dados.LogradouroID)
        console.log(dados.Numero)
        console.log(dados.Complemento)
        database.select("*").table("localidade").where({LogradouroID: dados.LogradouroID, Numero: dados.Numero, Complemento: dados.Complemento}).then(retorno=>{
            console.log("localidade")
            console.log(retorno)
            response.json(retorno)
        }).catch(error=>{
            console.log(error)
        })
    }

    postLocalidade(request,response){
        const insertData = request.body
        database.insert(insertData).into('localidade').then(data => { 
           console.log({"insert": "OK"})
           response.send({"insert": "OK"})
        }).catch(err => {
          console.log(err)
          response.send(err)
        })
    }

    deleteLocalidade(request,response){
        const dados = request.params
        console.log(dados.LocalidadeID)
        database.table("localidade").where({LocalidadeID: dados.LocalidadeID}).del().then(data => { 
           console.log({"Delete": "OK"})
           response.send({"Delete": "OK"})
        }).catch(err => {
          console.log(err)
          response.send(err)
        })
    }
}

module.exports = new localidadeController()