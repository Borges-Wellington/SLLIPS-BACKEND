var knex = require('knex')({
    client: 'mysql',
    connection: {
        host : 'mysql.sllips.kinghost.net',
        port: '3306',      
        user : 'sllips',       
        password : 'sllips123',  
        database : 'sllips'       
     }
});
module.exports = knex