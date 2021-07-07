const jwt = require('jsonwebtoken')

const jwtTest = () => {
    try{
        // // user login process:
        // create data payload
        const payload = {
            name: 'Weston',
            id: 5
        }

        // signing the jwt token
        const token = jwt.sign(payload, 'This is my secret', { expiresIn: 60 * 60 })
        console.log(token)

        // // request to server:
        // decode incoming jwt
        const decoded = jwt.verify(token, 'This is my secret')
        console.log(decoded)
    }
    catch(err){
        console.log('This is the catch: ', err)
    }
}

jwtTest()