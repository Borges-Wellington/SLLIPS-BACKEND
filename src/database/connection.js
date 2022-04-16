var knex = require('knex')({
    client: 'mysql',
    connection: {
        host : 'localhost',
        port: '3306',      
        user : 'root',       
        password : 'Teste@@123',  
        database : 'sllips'       
     }
});
module.exports = knex