"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const methods_1 = __importDefault(require("./methods"));
mongoose_1.default.connect("mongodb://localhost/app", () => {
    console.log("connected");
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//CRUD - Account.
app.get('api/accounts', (req, res) => {
    methods_1.default.getAllAccounts(req, res);
});
app.get('/api/account/:accountID', (req, res) => {
    methods_1.default.getAccount(req, res);
});
app.put('api/:accountID', (req, res) => {
    methods_1.default.updateAccount(req, res);
});
app.post('/api/create/account', (req, res) => {
    methods_1.default.createAccount(req, res);
});
app.delete('/api/:accountID', (req, res) => {
    methods_1.default.deleteAccount(req, res);
});
//CRUD - Group.
app.get('api/groups', (req, res) => {
    methods_1.default.getAllGroups(req, res);
});
app.get('/api/group/:groupID', (req, res) => {
    methods_1.default.getGroup(req, res);
});
app.put('api/:groupID', (req, res) => {
    methods_1.default.updateGroup(req, res);
});
app.post('/api/create/group', (req, res) => {
    methods_1.default.createGroup(req, res);
});
app.delete('/api/:groupID', (req, res) => {
    methods_1.default.deleteGroup(req, res);
});
//Extra methods.
app.delete('/', (req, res) => {
    methods_1.default.deleteAll(req, res);
});
app.delete('/api/deleteGroups', (req, res) => {
    methods_1.default.deleteGroups(req, res);
});
app.put('/api/accountJoinGroup', (req, res) => {
    methods_1.default.accountJoinGroup(req, res);
});
app.put('/api/groupJoinGroup', (req, res) => {
    methods_1.default.groupJoinGroup(req, res);
});
app.get('/', (req, res) => {
    methods_1.default.getAll(req, res);
});
app.get('/api/checkUserInGroup', (req, res) => {
    methods_1.default.searchMemberInGroup(req, res);
});
app.get('/api/AllUsersGroups', (req, res) => {
    methods_1.default.allUsersGroups(req, res);
});
const port = (process.env.PORT || 3000);
app.listen(port, () => console.log(`Listening on port ${port}...`));
