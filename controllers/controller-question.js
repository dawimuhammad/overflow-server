const Question  = require('../models/question')
const moment = require('moment')

class QuestionController {

    static postQuestion (req, res, next) {
        let { userId,
            title,
            content,
            tags } = req.body

        Question.create({
            userId: userId,
            title : title,
            content : content,
            tags : tags,
            date : moment().format('LL')
        })
        .then(function (createdQuestion) {
            res
            .status(200)
            .send(createdQuestion)
        })
        .catch(function (err) {
            res
                .status(500)
                .send(err)
        })
    }
}

module.exports = QuestionController
