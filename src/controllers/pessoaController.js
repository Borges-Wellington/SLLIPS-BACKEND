const database = require('../database/connection')

class pessoaController {

    getPessoa(request,response){
        const dados = request.params
        console.log(dados.CPF)

        if(dados.NomeAtividade == "*" ) {
            database.select("*").table("pessoa").then(retorno=>{
                console.log("todos")
                console.log(retorno)
                response.json(retorno)
            }).catch(error=>{
                console.log(error)
            })
        } else{
            var cpf = dados.Cpf;
            //tira . e -
            if (cpf.length == 14) {
                cpf = cpf.charAt(0)+cpf.charAt(1)+cpf.charAt(2)+
                    cpf.charAt(4)+cpf.charAt(5)+cpf.charAt(6)+   
                    cpf.charAt(8)+cpf.charAt(9)+cpf.charAt(10)+   
                    cpf.charAt(12)+cpf.charAt(13);
            }
            database.select("*").table("pessoa").where({Cpf: cpf}).then(retorno=>{
                console.log("pessoa")
                console.log(retorno)
                response.json(retorno)
            }).catch(error=>{
                console.log(error)
            })
        }
    }

    putPessoa(request,response){
        const dados = request.body
        database.table('pessoa').where({PessoaID: dados.PessoaID})
        .update({Nome: dados.Nome, RG: dados.RG, Mae: dados.Mae, Pai: dados.Pai, Datanasc: dados.Datanasc})
        .then(data => { 
           console.log({"update": "OK"})
           response.send({"update": "OK"})
        }).catch(err => {
          console.log(err)
          response.send(err)
        })
    }

    postPessoa(request,response){
        const insertData = request.body
        database.insert(insertData).into('pessoa').then(data => { 
           console.log({"insert": "OK"})
           response.send({"insert": "OK"})
        }).catch(err => {
          console.log(err)
          response.send(err)
        })
    }

    deletePesoa(request,response){
        const dados = request.params
        console.log(dados.PessoaID)
        database.table("pessoa").where({PessoaID: dados.PessoaID}).del().then(data => { 
           console.log({"Delete": "OK"})
           response.send({"Delete": "OK"})
        }).catch(err => {
          console.log(err)
          response.send(err)
        })
    }
}

module.exports = new pessoaController()