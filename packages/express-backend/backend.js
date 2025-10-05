import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = {
    users_list: [
        {
            id: "xyz789",
            name: "Charlie",
            job: "Janitor"
        },
        {
            id: "abc123",
            name: "Mac",
            job: "Bouncer"
        },
        {
            id: "ppp222",
            name: "Mac",
            job: "Professor"
        },
        {
            id: "yat999",
            name: "Dee",
            job: "Aspring actress"
        },
        {
            id: "zap555",
            name: "Dennis",
            job: "Bartender"
        }
    ]
};
app.use(cors());
app.use(express.json());

//find user by both name and job
const findUsersbyNameAndJob =(name, job) => {
 return users["users_list"].filter((user) => user["name"] === name && user["job"] === job);
};
//find user by Name only
const findUserbyName = (name) => {
    return users["users_list"].find((user) => user["name"] === name);
}
const findUserById = (id) => users["users_list"].find((user) => user["id"] === id);

//adding new Users
const addUser = (user) => {
    if (!user.hasOwnProperty("id")) {
       generateUserId(user)
    }
    users["users_list"].push(user);

    return user;
}
//find user that matches certain id
const generateUserId = (user) => {
    user.id = Math.floor(Math.random() * 99999);
}

//deleting Users
/**
 * Delete a user by their id
 * @param id The id of the user to be deleted
 * @returns {boolean} `true` if user is successfully deleted and `false` user does not exist in database
 */
const userToDelete = (id) => {
    //check if user exist in database
    let userToDelete = users["users_list"].find((user) => user.id === id);
    if (userToDelete === undefined) {
        return false;
    }
    users["users_list"] = users["users_list"].filter((user) => user !== userToDelete);
    return true;
}

app.get("/users", (req, res) => {
    let name = req.query.name;
    let job = req.query.job;
    // if job is undefined just look for name
    if (job === undefined ) {
        let result = findUserbyName(name);
        res.send(result);
    }
    else if (name !== undefined) { // if both name and user are defined then look for matching job and name user
        let result = findUsersbyNameAndJob(name, job);
        res.send(result)
    }
    else { //error
        res.code(400).send("Bad request");
    }
})
//finding Users by id
app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});
app.post("/users", (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd)
    res.status(201).send(userToAdd);
});
app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    let status = userToDelete(id)

    if (status) {
        res.status(204).send("User successfully deleted");
    }
    else {
        res.status(404).send("resource not found");
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});