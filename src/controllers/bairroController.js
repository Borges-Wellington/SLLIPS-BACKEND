const database = require('../database/connection')

class bairroController {

    getBairro(request,response){
        const dados = request.params
        console.log(dados.BairroID)
        database.select("*").table("bairro").where({BairroID: dados.BairroID}).then(retorno=>{
            console.log("bairro")
            console.log(retorno)
            response.json(retorno)
        }).catch(error=>{
            console.log(error)
        })
    }

    getBuscaBairro(request,response){
        const dados = request.params
        console.log(dados.NomeBairro)
        if(dados.NomeBairro == "*" ) {
            database.select("*").table("bairro").then(retorno=>{
                console.log("todos")
                console.log(retorno)
                response.json(retorno)
            }).catch(error=>{
                console.log(error)
            })
        } else{
            database.select("*").table("bairro").where({NomeBairro: dados.NomeBairro}).then(retorno=>{
                console.log("bairro")
                console.log(retorno)
                response.json(retorno)
            }).catch(error=>{
                console.log(error)
            })
        }
    }

    postBairro(request,response){
        const insertData = request.body
        database.insert(insertData).into('bairro').then(data => { 
           console.log({"insert": "OK"})
           response.send({"insert": "OK"})
        }).catch(err => {
          console.log(err)
          response.send(err)
        })
    }

    deleteBairro(request,response){
        const dados = request.params
        console.log(dados.BairroID)
        database.table("bairro").where({BairroID: dados.BairroID}).del().then(data => { 
           console.log({"Delete": "OK"})
           response.send({"Delete": "OK"})
        }).catch(err => {
          console.log(err)
          response.send(err)
        })
    }
}

module.exports = new bairroController()