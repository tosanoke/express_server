import { Response, Request } from "express";
import { v4 as uuidv4 } from "uuid";
import { userId, writeDataToFile, update, remove, readUserDataBase, database } from "../utils/utils";
import { validationResult } from "express-validator";
import { promises as fs } from 'fs';


// ----------------Controllers----------------
interface UsersInfo {
  id?: string;
  organization?: string;
  products?: string[];
  marketValue?: string;
  address?: string;
  ceo?: string;
  country?: string;
  noOfEmployees?: number;
  employees?: string[];
  createdAt?: string;
  updatedAt?: string;
}

// getAllUsers: returns all users in the database
async function getUsers(_req: Request, res: Response) {
  try {
    let getAllUsers = await readUserDataBase();
    res.status(200).json(getAllUsers);
  } catch (err) {
    res.status(400).json({msg: 'Cannot get all users'});
  }
}

// GetUserByID: returns a single user object based on the  userId
async function getUserById(req: Request, res: Response) {
  try {
    const user = await userId(req.params.id);
    if (!user) {
      res.status(404).json({ msg: `No member with the id of ${req.params.id}` });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
  }
}

// createUser: creates a new User object based on a post request
async function createUser(req: Request, res: Response) {
  try {
    // creates database file if it doesnt exist yet
    try {
      await fs.access(database)
    } catch(err) {
      await writeDataToFile(database, [])
    }

    // express validator 
    const errors = validationResult(req);
    // if there is error then return Error
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const data = req.body;
    const newUser = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      organization: data.organization,
      products: data.products,
      marketValue: data.marketValue,
      address: data.address,
      ceo: data.ceo,
      country: data.country,
      noOfEmployees: data.noOfEmployees,
      employees: data.employees,
 };

    let users = await readUserDataBase();
    users.push(newUser);
    writeDataToFile(database, users);
    return res.status(201).json(users);

  } catch (error) {
    return res.status(400).json({ msg: "Please include valid details" });
  }
}

// updateUserInfo: updates a existing user info using a PUT request and ID
async function updateUser(req: Request, res: Response) {
  try {
    const user = await userId(req.params.id);
    if (!user) {
      res.status(400).json({ message: "User Not Found" });
    } else {
      const body = req.body;
      const {
        organization,
        products,
        marketValue,
        address,
        ceo,
        country,
        noOfEmployees,
        employees,
      } = body;

      const usersData: UsersInfo = {
        createdAt: user.createdAt,
        updatedAt: new Date().toISOString(),
        organization: organization || user.organization,
        products: products || user.products,
        marketValue: marketValue || user.marketValue,
        address: address || user.address,
        ceo: ceo || user.ceo,
        country: country || user.country,
        noOfEmployees: noOfEmployees || user.noOfEmployees,
        employees: employees || user.employees,
      };

      const updUser = await update(req.params.id, usersData);
      res.status(200).json(updUser);
    }
  } catch (error) {
    console.log(error);
  }
}

// deleteUser: deletes a user from the database based on their id
async function deleteUser(req: Request, res: Response) {
  try {
    const user = await userId(req.params.id);
    if (!user) {
      res.status(401).json({ msg: `No user with the id of ${req.params.id}` });
    } else {
      const users = await remove(req.params.id);
      res.status(200).json({
        message: `User with ${req.params.id} has been removed`,
        users: users,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export { getUsers, getUserById, createUser, updateUser, deleteUser, UsersInfo };
