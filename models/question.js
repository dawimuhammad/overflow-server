const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionSchema = new Schema ({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    content: String,
    answers: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Answer'
    }],
    tags: [],
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

const Question = mongoose.model("Question", QuestionSchema)

module.exports = Question