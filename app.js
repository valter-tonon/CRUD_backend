const init = db =>{
    const express = require('express')
    const app = express()
    const bodyParser = require('body-parser')
    const cors = require('cors')
    const Useroutes = require('./src/routes/routes')

    app.use(cors())
    app.use(bodyParser.urlencoded({extended :true }))
    app.use(bodyParser.json())
    app.use((error,req,res,next)=>{
        res.status(error.status || 500)
        res.json({error: error.message})
    })
    

    app.use(Useroutes(db))
   

    
    

    
return app
}
module.exports = init