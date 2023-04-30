import mongoose from "mongoose"

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
        },
        description:{
            type: String
        }
    }
)

const CodeModel = mongoose.model('Code', codeSchema);

export default CodeModel;