const router = require('express').Router()
const db = require('../../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// GET  /users -- test api endpoint
router.get('/', (req,res) => {
    res.json({msg: 'hi the user endpoint is ok'})
})

// POST  /users/register -- CREATE a new user (aka registration)
router.post('/register', async (req, res) => {
    try{
        // check if user exists
        const findUser = await db.User.findOne({
            email: req.body.email
        })

        // if user is found -- dont let them register
        if(findUser) return res.status(400).json({msg: 'user already exists in the DB'})
        console.log(findUser)

        // hash their password from req.body
        const password = req.body.password
        const salt = 12
        const hashedPassword = await bcrypt.hash(password, salt)

        // create our new user
        const newUser = db.User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })

        await newUser.save()

        // create jwt payload -- everything in user model minus pass
        const payload = {
            name: newUser.name,
            email: newUser.email,
            id: newUser.id
        }

        // sign the jwt and send a response
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 60 * 60})
        console.log(err)
        res.status(500).json({msg: 'internal server error'})
    }
    catch(err){
        console.log(err)
        res.status(500).json({msg: 'internal server error'})
    }
})

// POST /user/login -- validate login credentials

// GET /auth-locked -- will redirect if a bad jwt is found


module.exports = router