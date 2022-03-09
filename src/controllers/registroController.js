const database = require('../database/connection')

class registroController {

    getRegistro_Usuario(request,response){
        const dados = request.params
        console.log(dados.UsuarioID)
        database.select("*").table("registro").where({UsuarioID: dados.UsuarioID}).then(retorno=>{
            console.log("registro usu")
            console.log(retorno)
            response.json(retorno)
        }).catch(error=>{
            console.log(error)
        })
    }

    getRegistro_Estabelecimento(request,response){
        const dados = request.params
        console.log(dados.EstabelecimentoID)
        database.select("*").table("registro").where({EstabelecimentoID: dados.EstabelecimentoID}).then(retorno=>{
            console.log("registro estab")
            console.log(retorno)
            response.json(retorno)
        }).catch(error=>{
            console.log(error)
        })
    }

    postRegistro(request,response){
        const insertData = request.body
        database.insert(insertData).into('registro').then(data => { 
           console.log({"insert": "OK"})
           response.send({"insert": "OK"})
        }).catch(err => {
          console.log(err)
          response.send(err)
        })
    }

    deleteRegistro(request,response){
        const dados = request.params
        console.log(dados.RegistroID)
        database.table("registro").where({RegistroID: dados.RegistroID}).del().then(data => { 
           console.log({"Delete": "OK"})
           response.send({"Delete": "OK"})
        }).catch(err => {
          console.log(err)
          response.send(err)
        })
    }
}

module.exports = new registroController()