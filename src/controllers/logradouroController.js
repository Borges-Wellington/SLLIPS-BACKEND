const database = require('../database/connection')

class logradouroController {

    getLogradouro(request,response){
        const dados = request.params
        console.log(dados.LogradouroID)
        database.select("*").table("logradouro").where({LogradouroID: dados.LogradouroID}).then(retorno=>{
            console.log("logradouro")
            console.log(retorno)
            response.json(retorno)
        }).catch(error=>{
            console.log(error)
        })
    }

    getLogradouroBusca(request,response){
        const dados = request.params
        console.log(dados.Nome)
        database.select("*").table("logradouro").where({nome: dados.Nome}).then(retorno=>{
            console.log("logradouro")
            console.log(retorno)
            response.json(retorno)
        }).catch(error=>{
            console.log(error)
        })
    }

    postLogradouro(request,response){
        const insertData = request.body
        database.insert(insertData).into('logradouro').then(data => { 
           console.log({"insert": "OK"})
           response.send({"insert": "OK"})
        }).catch(err => {
          console.log(err)
          response.send(err)
        })
    }

    deleteLogradouro(request,response){
        const dados = request.params
        console.log(dados.LogradouroID)
        database.table("logradouro").where({LogradouroID: dados.LogradouroID}).del().then(data => { 
           console.log({"Delete": "OK"})
           response.send({"Delete": "OK"})
        }).catch(err => {
          console.log(err)
          response.send(err)
        })
    }
}

module.exports = new logradouroController()