import mongoose from "mongoose";
import Account from "./account";

const groupSchema: mongoose.Schema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    members: {type: [Account.schema || this], default: null }
});

export default mongoose.model("Group", groupSchema);
