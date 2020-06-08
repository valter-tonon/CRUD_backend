const model = require('../model/index')
const { check, validationResult } = require('express-validator');
const data = require('date-fns')


const getUserList = db => async(req,res,next)=>{
    const usuario = await model.getUser(db)()
     res.send(usuario)
}


const addUser = db=> async(req,res)=>{
    
    const {nome, email, nasc, profissao, observacoes} = req.body
    const startHour = data.startOfHour(data.parseISO(nasc))
    let yesterday = ( d => new Date(d.setDate(d.getDate()-1)) )(new Date);
    if(data.isAfter(startHour,yesterday)){
        res.send('Data não permitida !!!')
    }
    const user = await db('usuario').where({email:email})
    if(!user[0]){
        const errors = validationResult(req);
         if (!errors.isEmpty()) {
             res.json({ errors: errors.array() });
        }if(await db('usuario').select('email'))
        try{
            await db('usuario').insert({nome:nome, email:email,
                nasc:nasc, profissao: profissao, observacoes:observacoes})
                .then(res.send('usuário adicionado com sucesso !!!'))
        }
       catch(error){
            res.send(error)
       }
    }else{
        res.send('Este usuário já existe')
    }
}

   
  const removeUser = db => async(req,res)=>{
    await db('usuario').where({id: req.params.id}).del()
        .then(res.send('Deletado com sucesso!'))
}
const updateUser = db =>async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    await db('usuario').where({id: req.params.id}).update(req.body)
        .then(res.send('Usuário alterado'))
}
const getUserByID = db => async(req,res) =>{
    const usuario = await model.userById(db)(req.params.id)
        res.send(usuario)
}

module.exports = {
    getUserList,
    addUser,
    removeUser,
    updateUser,
    getUserByID
}