const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
const saltRounds = 10

const UserSchema = new Schema({
   name:{
      type: String,
   },
   email:{
      type: String,
      unique: true,
   },
   password:{
      type: String,
   },
   profileUrl: {
       type: String,
   }
}, { timestamps: true })

UserSchema.pre("save", function(next){
    let user = this

    if(!user.isModified('password')){
        return next()
    }

    bcrypt.genSalt(saltRounds, function(err, salt ){
        if(err) return err

        bcrypt.hash(user.password, salt ,function(err, hash){
            if(err) {
                return next(err)
            }

            user.password = hash
            next()
        })
    })

})

UserSchema.methods.comparePassword = function (input, cb){
    bcrypt.compare(input, this.password,  function(err, isMatch){
        if(err) return cb(err)

        cb(null, isMatch)
    })
}

const User = mongoose.model("User", UserSchema)

module.exports = User