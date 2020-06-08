const init = db =>{


    const routes  = require('express').Router()
    const userController = require('../controller/index')
    const { check, body } = require('express-validator');
   

    routes.get('/usuarios',userController.getUserList(db))

    routes.get('/',(req,res)=>{
        res.send('Projeto Climba !!!')
    })
    routes.post('/cadastro',[check('email').isEmail().exists(),
            check('nome').isLength({ min: 2 }),
            check('nasc').isBefore()],userController.addUser(db))

    routes.delete('/remove/:id',userController.removeUser(db))
    routes.get('/usuarios/:id',userController.getUserByID(db))

    routes.post('/update/:id',[check('email').isEmail().exists(),
            check('nome').isLength({ min: 2 }),
        check('nasc').isBefore()],userController.updateUser(db))
    


    return routes
}
module.exports= init



