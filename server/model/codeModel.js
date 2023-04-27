const mongoose = require('mongoose')

const codeSchema = mongoose.Schema(
    {
        title: {
            type: String
        },
        code: {
            type: String
        },
        solution: {
            type: String
        }
    }
)

const codeModel = mongoose.model('Code', codeSchema);

module.exports = codeModel;