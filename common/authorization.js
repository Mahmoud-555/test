var jwt = require('jsonwebtoken');
const user = require("../models/userModel")
var createError = require('http-errors');






adminAuth = (req, res, next) => {

    const token = req.cookies.token
    if (token) {
        jwt.verify(token,  process.env.JWT_SECRET_KEY, (err, decoded) => {

            if (err) {
                res.json(err)  
            } else {
                const userId = decoded.userId

                user.findOne({ _id: userId })
                    .then((userData) => {
                        if (userData) {
                            const role = userData.role
                            if (role === "admin") {
                                next()
                            } else { next(createError(401, "you must be admin to do this action")) }

                        } else { next(createError(401, "It is necessary to regester befor")) }

                    })
                    .catch((err) => {
                        console.log("err",err)
                         })

            }

        })




    } else { next(createError(401, "It is necessary to login befor")) }



}

userAuth = (req, res, next) => {
    const token = req.cookies.token
    if (token) {
        jwt.verify(token,  process.env.JWT_SECRET_KEY, (err, decoded) => {

            if (err) {
                res.json(err)  
            } else {
                const userId = decoded.userId

                user.findOne({ _id: userId })
                    .then((userData) => {
                        if (userData) {
                            const role = userData.role
                            if (role === "admin"|role === "user") {
                                next()
                            } else { next(createError(401)) }

                        } else { next(createError(401, "It is necessary to regester befor")) }

                    })
                    .catch((err) => {
                        console.log("err",err)
                         })

            }

        })




    } else { next(createError(401, "It is necessary to login befor")) }



}

isSignIn = (req, res, next) => {

    const token = req.cookies.token
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {

            if (err) {
                res.json(err)  
            } else {
                const userId = decoded.userId

                user.findOne({ _id: userId })
                    .then((userData) => {
                        if (userData) {
                                next()

                        } else {   res.render('index',{"isSignIn":false});
                    }

                    })
                    .catch((err) => {
                        console.log("err",err)
                         })

            }

        })




    } else {  res.render('index',{"isSignIn":false});
}



}


module.exports = { adminAuth ,userAuth,isSignIn}