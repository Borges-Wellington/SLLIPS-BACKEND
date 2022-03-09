const database = require('../database/connection')

class alimentoController {

    getAtividade(request,response){
        const dados = request.params
        console.log(dados.NomeAtividade)
        if(dados.NomeAtividade == "*" ) {
            database.select("*").table("atividade").then(retorno=>{
                console.log("todos")
                console.log(retorno)
                response.json(retorno)
            }).catch(error=>{
                console.log(error)
            })
        } else{
            database.select("*").table("atividade").where({NomeAtividade: dados.NomeAtividade}).then(retorno=>{
                console.log("atividade")
                console.log(retorno)
                response.json(retorno)
            }).catch(error=>{
                console.log(error)
            })
        }
    }

    postAtividade(request,response){
        const insertData = request.body
        database.insert(insertData).into('atividade').then(data => { 
           console.log({"insert": "OK"})
           response.send({"insert": "OK"})
        }).catch(err => {
          console.log(err)
          response.send(err)
        })
    }

    deleteAtividade(request,response){
        const dados = request.params
        console.log(dados.NomeAtividade)
        database.table("atividade").where({NomeAtividade: dados.NomeAtividade}).del().then(data => { 
           console.log({"Delete": "OK"})
           response.send({"Delete": "OK"})
        }).catch(err => {
          console.log(err)
          response.send(err)
        })
    }
}

module.exports = new alimentoController()