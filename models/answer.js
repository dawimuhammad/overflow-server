const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnswerSchema = new Schema ({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: String,
    date: String,
    upvote: [{ 
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    downvote: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { 
    timestamps: true 
})

const Question = mongoose.model("Question", AnswerSchema)

module.exports = Question