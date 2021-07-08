const jwt = require('jsonwebtoken')
const db = require('../../models')

const authLockedRoute = async () => {
    try{
        // get jwt from authorization headers
        const authHeaders = req.headers.authorization
        // verify the jwt -- if not valid it ends up in the catch
        const decoded = jwt.verify(authHeaders, process.env.JWT_SECRET)
        // find the user from the DB 
        const foundUser = await db.User.findById(decoded.id)
        // mount the user on the res.locals
        res.locals.user = foundUser
    }
    catch(err){
        console.log(err, ' at authLockedRoute')
        res.status(401).json({msg: 'You arent allowed to be here!'})
    }
}

module.exports = authLockedRoute