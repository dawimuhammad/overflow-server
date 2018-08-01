const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
const saltRounds = 10

const UserSchema = new Schema({
   name:{
      type: String,
      required: "Please input name",
   },
   email:{
      type: String,
      required: "Please input email",
      unique: true,
      validate:{
        validator: function(value){
           let re = /^(([^<>()[\]\\., :\s@\"]+(\.[^<>()[\]\\., :\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
           return re.test(value)
        }
      },
      unique:true,
   },
   password:{
      type: String,
      required: "Please input password",
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