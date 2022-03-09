const database = require('../database/connection')

class contatoController {

    getContatoUsuario(request,response){
        const dados = request.params
        console.log(dados.UsuarioID)
        database.select("*").table("contato").where({UsuarioID: dados.UsuarioID}).then(retorno=>{
            console.log("contato usuario")
            console.log(retorno)
            response.json(retorno)
        }).catch(error=>{
            console.log(error)
        })
    }

    getContatoEstabelecimento(request,response){
        const dados = request.params
        console.log(dados.EstabelecimentoID)
        database.select("*").table("contato").where({EstabelecimentoID: dados.EstabelecimentoID}).then(retorno=>{
            console.log("contato estabelecimento")
            console.log(retorno)
            response.json(retorno)
        }).catch(error=>{
            console.log(error)
        })
    }

    postContato(request,response){
        const insertData = request.body
        database.insert(insertData).into('contato').then(data => { 
           console.log({"insert": "OK"})
           response.send({"insert": "OK"})
        }).catch(err => {
          console.log(err)
          response.send(err)
        })
    }

    deleteContato(request,response){
        const dados = request.params
        console.log(dados.BairroID)
        database.table("contato").where({ContatoID: dados.ContatoID}).del().then(data => { 
           console.log({"Delete": "OK"})
           response.send({"Delete": "OK"})
        }).catch(err => {
          console.log(err)
          response.send(err)
        })
    }
}

module.exports = new contatoController()