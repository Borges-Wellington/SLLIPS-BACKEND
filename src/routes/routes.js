const connection = require('../database/connection')
var jwt = require('jsonwebtoken');
const express = require('express')
const { response } = require('express')
const router = express.Router()
const usuarioController = require('../controllers/usuarioController')
const atividadeController = require('../controllers/atividadeController')
const avaliacaoController = require('../controllers/avaliacaoController')
const bairroController = require('../controllers/bairroController')
const cidadeController = require('../controllers/cidadeController')
const contatoController = require('../controllers/contatoController')
const estabelecimentoController = require('../controllers/estabelecimentoController')
const localidadeController = require('../controllers/localidadeController')
const logradouroController = require('../controllers/logradouroController')
const nichoController = require('../controllers/nichoController')
const pessoaController = require('../controllers/pessoaController')
const registroController = require('../controllers/registroController')
const tipoViagemController = require('../controllers/tipoviagemController')

//---------------------------------Token--------------------------------------------------------
//Função verifica Token
function verifyJWT(req, res, next){
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
}
//----------------------------------fim token----------------------------------------------------

//Busca Token
router.post('/get-token', (req, res, next) => {
    if(req.body.user === 'xxtgs627683yshjsb872gd_nix*' && req.body.pwd === 'kkbecuix_jwedbxiw62734782bxib9823gsdgxxx_'){
      //auth ok
      const id = 1; //esse id viria do banco de dados
      var token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 1800 // expires in 30min
      });
      res.status(200).send({ auth: true, token: token });
    }
    
    res.status(500).send('Login inválido!');
})

router.get('/discard-token', function(req, res) {
    res.status(200).send({ auth: false, token: null });
});

//Atividade
router.get('/atividade/nicho/:NichoID',verifyJWT, atividadeController.getAtividadeByNicho)
router.get('/atividade/:NomeAtividade',verifyJWT, atividadeController.getAtividade)
router.post('/atividade',verifyJWT, atividadeController.postAtividade)
router.delete('/atividade/:NomeAtividade',verifyJWT, atividadeController.deleteAtividade)

//Avaliacao
router.get('/avaliacao/:EstabelecimentoID',verifyJWT, avaliacaoController.getAvaliacao)
router.post('/avaliacao',verifyJWT, avaliacaoController.postAvaliacao)
router.delete('/avaliacao/:AvaliacaoID',verifyJWT, avaliacaoController.deleteAvaliacao)

//Bairro
router.get('/bairro/:BairroID',verifyJWT, bairroController.getBairro)
router.get('/buscabairro/:NomeBairro',verifyJWT, bairroController.getBuscaBairro)
router.post('/bairro',verifyJWT, bairroController.postBairro)
router.delete('/bairro/:BairroID',verifyJWT, bairroController.deleteBairro)

//Cidade
router.get('/cidade',verifyJWT, cidadeController.getAllCidade)
router.get('/cidade/:CidadeID',verifyJWT, cidadeController.getCidade)
router.get('/buscacidade/:NomeCidade',verifyJWT, cidadeController.getBuscaCidade)
router.post('/cidade',verifyJWT, cidadeController.postCidade)
router.delete('/cidade/:CidadeID',verifyJWT, cidadeController.deleteCidade)

//Contato
router.get('/contatousuario/:UsuarioID',verifyJWT, contatoController.getContatoUsuario)
router.get('/contatoestabelecimento/:EstabelecimentoID',verifyJWT, contatoController.getContatoEstabelecimento)
router.post('/contato',verifyJWT, contatoController.postContato)
router.delete('/contato/:ContatoID',verifyJWT, contatoController.deleteContato)

//Estabelecimento
router.get('/estabelecimento/:EstabelecimentoID',verifyJWT, estabelecimentoController.getEstabelecimento)
router.get('/buscaestabelecimento/:NomeEstabelecimento',verifyJWT, estabelecimentoController.getBuscaEstabelecimento)
router.post('/estabelecimento',verifyJWT, estabelecimentoController.postEstabelecimento)
router.delete('/estabelecimento/:EstabelecimentoID',verifyJWT, estabelecimentoController.deleteEstabelecimento)

//Localidade
router.get('/localidade/:LocalidadeID',verifyJWT, localidadeController.getLocalidade)
router.get('/buscalocalidade/:LogradouroID/:Numero/:Complemento',verifyJWT, localidadeController.getLocalidadeBusca)
router.post('/localidade',verifyJWT, localidadeController.postLocalidade)
router.delete('/localidade/:LocalidadeID',verifyJWT, localidadeController.deleteLocalidade)

//Logradouro
router.get('/logradouro/:LogradouroID',verifyJWT, logradouroController.getLogradouro)
router.get('/buscalogradouro/:Nome',verifyJWT, logradouroController.getLogradouroBusca)
router.post('/logradouro',verifyJWT, logradouroController.postLogradouro)
router.delete('/logradouro/:LogradouroID',verifyJWT, logradouroController.deleteLogradouro)

//Nicho
router.get('/nicho',verifyJWT,nichoController.getaAllNicho )
router.get('/nicho/:NomeNicho',verifyJWT,nichoController.getNicho )
router.post('/nicho',verifyJWT, nichoController.postNicho)
router.delete('/nicho/:NichoID',verifyJWT, nichoController.deleteNicho)

//Pessoa
router.get('/pessoa/:CPF',verifyJWT,pessoaController.getPessoa)
router.post('/pessoa',verifyJWT, pessoaController.postPessoa)
router.put('/pessoa',verifyJWT, pessoaController.putPessoa)
router.delete('/pessoa/:PessoaID',verifyJWT, pessoaController.deletePesoa)

//Registro
router.get('/registrousuario/:LogradouroID',verifyJWT, registroController.getRegistro_Usuario)
router.get('/registroestabelecimento/:EstabelecimentoID',verifyJWT, registroController.getRegistro_Estabelecimento)
router.post('/registro',verifyJWT, registroController.postRegistro)
router.delete('/registro/:RegistroID',verifyJWT, registroController.deleteRegistro)

//TipoViagem
router.get('/tipoviagem/:NomeTipo',verifyJWT, tipoViagemController.getTipoViagem)
router.get('/tipoviagemusuario/:UsuarioID',verifyJWT, tipoViagemController.getTipoviagem_Usuario)
router.get('/tipoviagem/:TipoViagemID',verifyJWT, tipoViagemController.getTipoviagem)
router.post('/tipoviagem',verifyJWT, tipoViagemController.postTipoviagem)
router.delete('/tipoviagem/:TipoViagemID',verifyJWT, tipoViagemController.deleteTipoviagem)

//Usuario
router.get('/usuarioSenha/:Login/:Senha',verifyJWT, usuarioController.getUsuarioSenha)
router.get('/usuario/:UsuarioID',verifyJWT, usuarioController.getUsuario)
router.post('/usuario',verifyJWT, usuarioController.postUsuario)
router.delete('/usuario/:UsuarioID',verifyJWT, usuarioController.deleteUsuario)
router.put('/alterarsenha',verifyJWT, usuarioController.alterarSenha)

module.exports = router