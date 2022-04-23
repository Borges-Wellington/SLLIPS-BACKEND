const database = require('../database/connection')

class cidadeController {

    getAllCidade(request,response){
        database.select("*").table("cidade").then(retorno=>{
            console.log("cidade", retorno)
            response.json(retorno)
        }).catch(error=>{
            console.log(error)
        })
    } 

    getCidade(request,response){
        const dados = request.params
        console.log(dados.BairroID)
        database.select("*").table("cidade").where({CidadeID: dados.CidadeID}).then(retorno=>{
            console.log("cidade")
            console.log(retorno)
            response.json(retorno)
        }).catch(error=>{
            console.log(error)
        })
    }

    getBuscaCidade(request,response){
        const dados = request.params
        console.log(dados.NomeCidade)
        if(dados.NomeCidade == "*" ) {
            database.select("*").table("cidade").then(retorno=>{
                console.log("todos")
                console.log(retorno)
                response.json(retorno)
            }).catch(error=>{
                console.log(error)
            })
        } else{
            database.select("*").table("cidade").where({NomeCidade: dados.NomeCidade}).then(retorno=>{
                console.log("cidade")
                console.log(retorno)
                response.json(retorno)
            }).catch(error=>{
                console.log(error)
            })
        }
    }

    postCidade(request,response){
        const insertData = request.body
        database.insert(insertData).into('cidade').then(data => { 
           console.log({"insert": "OK"})
           response.send({"insert": "OK"})
        }).catch(err => {
          console.log(err)
          response.send(err)
        })
    }

    deleteCidade(request,response){
        const dados = request.params
        console.log(dados.BairroID)
        database.table("cidade").where({CidadeID: dados.CidadeID}).del().then(data => { 
           console.log({"Delete": "OK"})
           response.send({"Delete": "OK"})
        }).catch(err => {
          console.log(err)
          response.send(err)
        })
    }
}

module.exports = new cidadeController()