const User  = require('../models/user')
const jwt = require ('jsonwebtoken')

class UserController{
  
   static logIn(req,res) {
      let { email, password } = req.body

      User.findOne({ email })
      .then(function (user) {
         user.comparePassword(password, function(err, isMatch) {
            if (err) {
               res
               .status(401)
               .json({
                  message: err.message
               })
            }
            else {
               if(isMatch) {
                  let token = jwt.sign({_id: user.id}, process.env.secretKey)
                  res
                  .status(200)
                  .json({
                     user,
                     token,
                     message: "Token generated"
                  });
               }
               else {
                  res
                  .status(400)
                  .json({
                     message: "Password is wrong!"
                  })
               }
            }
         })
      })
      .catch(function(err) {
         res
         .status(400)
         .json("User is not found!");
      })
   }

   static findAll (req, res) {
     console.log('masuk')

     User.find({}).
     exec(function (err, users) {
        if (err) {
          res
             .status(500)
             .send(err.message)
        } else {
          res
            .status(200)
            .send(users)
        }
     })
   }

   static findOne (req, res) {
      User.findById( req.params.userId )
      .then(function(user) {
         res.status(200)
         .send(user);
      })
      .catch(function(err) {
         res
         .status(400)
         .send(err.message)
      })
   }


   static register (req, res) {
      let { name, email, password, profileUrl } = req.body
      
      console.log(req.body)

       User.create({
             name: name,
             email: email,
             password: password,
             profileUrl: profileUrl
       })
       .then( function (result){
             res
             .status(201)
             .json({
                message: "Successfully created new user",
                data: result
             })
       })
       .catch(function(err){
          res.send(err)
             .status(500)
             .json({
                message: err.message
             })
       })
   }

   static updateUser (req,res) {
      // handle update user
   }
}

module.exports = UserController;
