"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const account_1 = __importDefault(require("./account"));
const group_1 = __importDefault(require("./group"));
//CRUD - Account.
const getAccount = (req, res) => {
    const accountID = req.params.id;
    return account_1.default.findById(accountID)
        .then((account) => account
        ? res.status(200).send(account)
        : res.status(404).send("Not found"))
        .catch((error) => res.status(500).send(error));
};
const getAllAccounts = (req, res) => {
    return account_1.default.find()
        .then((accounts) => res.status(200).send(accounts))
        .catch((error) => res.status(500).send(error));
};
const createAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, fullName, password } = req.body;
    const account = new account_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        user: user,
        fullName: fullName,
        password: password,
    });
    return account
        .save()
        .then((account) => res.status(200).send(account))
        .catch((error) => res.status(500).send(error));
});
const updateAccount = (req, res) => {
    const accountID = req.params.id;
    return account_1.default.findById(accountID)
        .then((account) => {
        if (account) {
            account.set(req.body);
            return account
                .save()
                .then((account) => res.status(200).send(account))
                .catch((error) => res.status(500).send(error));
        }
        else {
            res.status(404).send("Not found");
        }
    })
        .catch((error) => res.status(500).send(error));
};
const deleteAccount = (req, res) => {
    const accountID = req.params.id;
    return account_1.default.findByIdAndDelete(accountID)
        .then((account) => account
        ? res.status(200).send("deleted")
        : res.status(404).send("not found"))
        .catch((error) => res.status(500).send(error));
};
//CRUD - Group.
const getGroup = (req, res) => {
    const groupID = req.params.id;
    return group_1.default.findById(groupID)
        .then((group) => group ? res.status(200).send(group) : res.status(404).send("Not found"))
        .catch((error) => res.status(500).send(error));
};
const getAllGroups = (req, res) => {
    return group_1.default.find()
        .then((groups) => res.status(200).send(groups))
        .catch((error) => res.status(500).send(error));
};
const createGroup = (req, res) => {
    const { name } = req.body;
    const group = new group_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        name: name,
    });
    return group
        .save()
        .then((group) => res.status(200).send(group))
        .catch((error) => res.status(500).send(error));
};
const updateGroup = (req, res) => {
    const groupID = req.params.id;
    return group_1.default.findById(groupID)
        .then((group) => {
        if (group) {
            group.set(req.body);
            return group
                .save()
                .then((account) => res.status(200).send(account))
                .catch((error) => res.status(500).send(error));
        }
        else {
            res.status(404).send("Not found");
        }
    })
        .catch((error) => res.status(500).send(error));
};
const deleteGroup = (req, res) => {
    const groupID = req.params.id;
    return group_1.default.findByIdAndDelete(groupID)
        .then((group) => group
        ? res.status(200).send("deleted")
        : res.status(404).send("not found"))
        .catch((error) => res.status(500).send(error));
};
//Extra methods.
const accountJoinGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { account, group } = req.body;
    try {
        if (yield group.members.includes(account)) {
            res.send("Already member.");
        }
        else {
            yield group.members.push(account);
            res.send("Joined!");
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});
const groupJoinGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { group, groupToJoin } = req.body;
    try {
        if (group === groupToJoin) {
            //check if it is the same group.
            res.send("Same group...");
        }
        if (yield groupToJoin.members.includes(group)) {
            res.send("Group already member.");
        }
        else {
            yield groupToJoin.members.push(group);
            res.send("Joined!");
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});
const deleteGroups = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield group_1.default.deleteMany();
        res.send("Groups deleted succesfully!");
    }
    catch (error) {
        res.status(500).send(error);
    }
});
const deleteAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield group_1.default.deleteMany();
        yield account_1.default.deleteMany();
        res.send("Everything deleted succesfully!");
    }
    catch (error) {
        res.status(500).send(error);
    }
});
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let accounts = yield account_1.default.find();
        let groups = yield group_1.default.find();
        let array = [...accounts, ...groups];
        res.status(200).send(array);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
const searchMemberInGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { account, group } = req.body;
    try {
        if (yield group.members.includes(account)) {
            res.send(account);
        }
        else {
            res.send(`${account.user} is not a member of this group.`);
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});
const allUsersGroups = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { account } = req.body;
    try {
        res.send(group_1.default.find(account));
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.default = {
    getAccount,
    getAllAccounts,
    createAccount,
    updateAccount,
    deleteAccount,
    getGroup,
    getAllGroups,
    createGroup,
    updateGroup,
    deleteGroup,
    accountJoinGroup,
    groupJoinGroup,
    deleteGroups,
    deleteAll,
    getAll,
    searchMemberInGroup,
    allUsersGroups
};
