import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import controller from './methods';

mongoose.connect(
    "mongodb://localhost/app",
     (): void => {
    console.log("connected");
}
);

const app = express();
app.use(cors());
app.use(express.json());

//CRUD - Account.

app.get('api/accounts', (req, res) => {
    controller.getAllAccounts(req, res);
});

app.get('/api/account/:accountID', (req, res) => {
    controller.getAccount(req, res);
});

app.put('api/:accountID', (req, res) => {
    controller.updateAccount(req, res);
});

app.post('/api/create/account', (req, res) => {
    controller.createAccount(req, res);
});

app.delete('/api/:accountID', (req, res) => {
    controller.deleteAccount(req, res);
});

//CRUD - Group.

app.get('api/groups', (req, res) => {
    controller.getAllGroups(req, res);
});

app.get('/api/group/:groupID', (req, res) => {
    controller.getGroup(req, res);
});

app.put('api/:groupID', (req, res) => {
    controller.updateGroup(req, res);
});

app.post('/api/create/group', (req, res) => {
    controller.createGroup(req, res);
});

app.delete('/api/:groupID', (req, res) => {
    controller.deleteGroup(req, res);
});


//Extra methods.


app.delete('/', (req, res) => {
    controller.deleteAll(req, res);
});

app.delete('/api/deleteGroups', (req, res) => {
    controller.deleteGroups(req, res);
});

app.put('/api/accountJoinGroup', (req, res) => {
    controller.accountJoinGroup(req, res);
});

app.put('/api/groupJoinGroup', (req, res) => {
controller.groupJoinGroup(req, res);
});

app.get('/', (req, res) => {
    controller.getAll(req, res);
});

app.get('/api/checkUserInGroup', (req, res) => {
    controller.searchMemberInGroup(req, res);
});

app.get('/api/AllUsersGroups', (req, res) => {
    controller.allUsersGroups(req, res);
});




const port: number = (process.env.PORT || 3000) as number;
app.listen(port, () => console.log(`Listening on port ${port}...`));