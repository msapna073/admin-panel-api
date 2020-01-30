const express = require('express')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const SECRETKEY = "qwerty@321"
app.use(bodyParser.json())

app.use(cors())
const verifyTheToken = (req, res, next) => {
    // getting the token from the header
    const bearer = req.headers["authorization"]
    if(bearer){
        const bearerToken = bearer.split(" ")
        const token = bearerToken[1]

        jwt.verify(token, SECRETKEY, (err, data) => {
            if(err){
                res.sendStatus(403)
            }else{

                req.userData = data
                next()
            }
        })
    }else{
        res.sendStatus(403)
    }
}



app.post("/login", (req, res) => {
    console.log("got the request")
    // check for the username and password
    console.log(req.body)
    const { username, password } = req.body

    // database authenticate username and password 
    if(username === "sapna" && password === "sapna@123"){
        console.log('1');
        const user = {
            username,
            
            
        }
        jwt.sign({user}, SECRETKEY, (err, token) => {
            if(err){
                res.sendStatus(403)
                console.log('2');
            }else{
                console.log('3');
                res.json({
                    token
                })
            }
        })
        
    }else{
        console.log('4')
        res.json('Unauthorized user');
    }
    
})

app.listen(8080, () => {
    console.log("Server started at port 8080")
})

/**
 * eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiY29kZXJzaW5naCIsImFnZSI6MjJ9LCJpYXQiOjE1NzQyNDUwODh9.WI4JkvIMVer45766QyMQrdJgpGKurtB5TQeuyIcQQk0
 */