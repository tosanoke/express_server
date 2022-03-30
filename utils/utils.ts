import { promises as fs } from 'fs';
import path from 'path';
import { UsersInfo } from "../controller/controller";


// cereate Path for database
const database = path.join(__dirname,'..', "database.json");

// read database
const readUserDataBase = async () => {
  const users = await fs.readFile(database, 'utf8');
  return JSON.parse(users)
}

// write to database function
async function writeDataToFile(filename: string, content: any) {
  await fs.writeFile(filename, JSON.stringify(content, null, 3))
}

// function to find user by ID:  returns the user with the given ID
async function userId(id: string) {
    const users = await readUserDataBase() 
    const user = users.find((user: UsersInfo) => user.id === id);
    return user
}

// function to update database: recieves an id and the userObject data makes and updates the database
async function update(id: string, usersData: any) {
    const users = await readUserDataBase() 
    const index = users.findIndex((p:{ id: string }) => p.id === id);
    users[index] = { id, ...usersData };
    writeDataToFile(database, users);
    return users[index];
    
}

//remove data based on ID and updates the database
 async function remove(id: string) {
    const users = await readUserDataBase() 
    const updusers = users.filter((p: {id: string}) => p.id !== id);
    writeDataToFile(database, updusers);
    return updusers;
}


export { userId, writeDataToFile, update, remove, readUserDataBase, database};
