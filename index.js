
const PORT = process.env.PORT || 3333

const db = require('knex')({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'UsuariosTeste'
    }
})

const app = require('./app')(db)


app.listen(PORT,()=> console.log(`api rodando n porta ${PORT}`))
