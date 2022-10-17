import mongoose from "mongoose";

const accountSchema: mongoose.Schema = new mongoose.Schema({
    user: { type: String, required: true, unique: true } ,
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    groups: {type: [String], default: null}
});

export default mongoose.model("Account", accountSchema);

//account schema