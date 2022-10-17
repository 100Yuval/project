import e, { Request, Response } from "express";
import mongoose from "mongoose";
import Account from "./account";
import Group from "./group";
import db from "./setuptestdb";

//CRUD - Account.

const getAccount = (req: Request, res: Response) => {
  const accountID = req.params.id;
  return Account.findById(accountID)
    .then((account) =>
      account
        ? res.status(200).send(account)
        : res.status(404).send("Not found")
    )
    .catch((error) => res.status(500).send(error));
};

const getAllAccounts = (req: Request, res: Response) => {
  return Account.find()
    .then((accounts) => res.status(200).send(accounts))
    .catch((error) => res.status(500).send(error));
};

const createAccount = async (req: Request, res: Response) => {
  const { user, fullName, password } = req.body;

  const account = new Account({
    _id: new mongoose.Types.ObjectId(),
    user: user,
    fullName: fullName,
    password: password,
  });

  return account
    .save()
    .then((account) => res.status(200).send(account))
    .catch((error) => res.status(500).send(error));
};

const updateAccount = (req: Request, res: Response) => {
  const accountID = req.params.id;

  return Account.findById(accountID)
    .then((account) => {
      if (account) {
        account.set(req.body);
        return account
          .save()
          .then((account) => res.status(200).send(account))
          .catch((error) => res.status(500).send(error));
      } else {
        res.status(404).send("Not found");
      }
    })
    .catch((error) => res.status(500).send(error));
};

const deleteAccount = (req: Request, res: Response) => {
  const accountID = req.params.id;

  return Account.findByIdAndDelete(accountID)
    .then((account) =>
      account
        ? res.status(200).send("deleted")
        : res.status(404).send("not found")
    )
    .catch((error) => res.status(500).send(error));
};

//CRUD - Group.

const getGroup = (req: Request, res: Response) => {
  const groupID = req.params.id;
  return Group.findById(groupID)
    .then((group) =>
      group ? res.status(200).send(group) : res.status(404).send("Not found")
    )
    .catch((error) => res.status(500).send(error));
};

const getAllGroups = (req: Request, res: Response) => {
  return Group.find()
    .then((groups) => res.status(200).send(groups))
    .catch((error) => res.status(500).send(error));
};

const createGroup = (req: Request, res: Response) => {
  const { name } = req.body;

  const group = new Group({
    _id: new mongoose.Types.ObjectId(),
    name: name,
  });

  return group
    .save()
    .then((group) => res.status(200).send(group))
    .catch((error) => res.status(500).send(error));
};

const updateGroup = (req: Request, res: Response) => {
  const groupID = req.params.id;

  return Group.findById(groupID)
    .then((group) => {
      if (group) {
        group.set(req.body);
        return group
          .save()
          .then((account) => res.status(200).send(account))
          .catch((error) => res.status(500).send(error));
      } else {
        res.status(404).send("Not found");
      }
    })
    .catch((error) => res.status(500).send(error));
};

const deleteGroup = (req: Request, res: Response) => {
  const groupID = req.params.id;

  return Group.findByIdAndDelete(groupID)
    .then((group) =>
      group
        ? res.status(200).send("deleted")
        : res.status(404).send("not found")
    )
    .catch((error) => res.status(500).send(error));
};

//Extra methods.

const accountJoinGroup = async (req: Request, res: Response) => {
  const { account, group } = req.body;
  try {
    if (await group.members.includes(account)) {
      res.send("Already member.");
    } else {
      await group.members.push(account);
      res.send("Joined!");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const groupJoinGroup = async (req: Request, res: Response) => {
  const { group, groupToJoin } = req.body;
  try {
    if (group === groupToJoin) {
      //check if it is the same group.
      res.send("Same group...");
    }
    if (await groupToJoin.members.includes(group)) {
      res.send("Group already member.");
    } else {
      await groupToJoin.members.push(group);
      res.send("Joined!");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteGroups = async (req: Request, res: Response) => {
  try {
    await Group.deleteMany();
    res.send("Groups deleted succesfully!");
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteAll = async (req: Request, res: Response) => {
  try {
    await Group.deleteMany();
    await Account.deleteMany();
    res.send("Everything deleted succesfully!");
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAll = async (req: Request, res: Response) => {
    try {
        let accounts: any = await Account.find();
        let groups: any = await Group.find();
        let array: any = [...accounts, ...groups];
        res.status(200).send(array);
    } catch (error) {
        res.status(500).send(error);
      }};

const searchMemberInGroup = async (req: Request, res: Response) => {
    const { account, group } = req.body;
    try {
        if (await group.members.includes(account)) {
          res.send(account);
        } else {
          res.send(`${account.user} is not a member of this group.`);
        }
      } catch (error) {
        res.status(500).send(error);
      }
}

const allUsersGroups = async (req: Request, res: Response) => {
    const { account } = req.body;
    try {
        res.send(Group.find(account));
    } catch (error) {
        res.status(500).send(error);
      }} ;

export default {
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
