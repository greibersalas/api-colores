import mongoose, { Schema} from "mongoose";

const ColorSchema = new Schema({
    id : { type: String, required: true },
    name: { type: String, required: true },
    color: { type: String, required: true},
    state: { type: Number, min: 0, max: 1, default: 1 },
    createAt: { type: Date, default: Date.now},
    updateAt : { type: Date },
    deleteAt :{ type: Date },
});

module.exports = mongoose.model('Color',ColorSchema);