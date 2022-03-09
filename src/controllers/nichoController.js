const database = require('../database/connection')

class nichoController {

    getNicho(request,response){
        const dados = request.params
        console.log(dados.NomeNicho)
        if(dados.NomeAtividade == "*" ) {
            database.select("*").table("nicho").then(retorno=>{
                console.log("todos")
                console.log(retorno)
                response.json(retorno)
            }).catch(error=>{
                console.log(error)
            })
        } else{
            database.select("*").table("nicho").where({NomeNicho: dados.NomeNicho}).then(retorno=>{
                console.log("nicho")
                console.log(retorno)
                response.json(retorno)
            }).catch(error=>{
                console.log(error)
            })
        }
    }

    postNicho(request,response){
        const insertData = request.body
        database.insert(insertData).into('nicho').then(data => { 
           console.log({"insert": "OK"})
           response.send({"insert": "OK"})
        }).catch(err => {
          console.log(err)
          response.send(err)
        })
    }

    deleteNicho(request,response){
        const dados = request.params
        console.log(dados.NichoID)
        database.table("nicho").where({NichoID: dados.NichoID}).del().then(data => { 
           console.log({"Delete": "OK"})
           response.send({"Delete": "OK"})
        }).catch(err => {
          console.log(err)
          response.send(err)
        })
    }
}

module.exports = new nichoController()