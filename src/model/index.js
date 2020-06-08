const getUser = db => async()=>{
    const user = await db('usuario').select('*')
    return user
}
const userById = db =>async(id)=>{
    const user = await db('usuario').where({id: id})
    return user
}


module.exports = {
    getUser,
    userById
}