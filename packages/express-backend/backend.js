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
const findUserbyName = (name) => {
    return users["users_list"].find((user) => user["name"] === name);
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
const findUserById = (id) => users["users_list"].find((user) => user["id"] === id);
app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});
//adding new Users
const addUser = (user) => {
    users["users_list"].push(user);
    return user;
}
app.post("/users", (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd)
    res.send();
});
//deleting Users
const userToDelete = (id) => {
    let userIndex = users["users_list"].indexOf(findUserById(id));
    if (userIndex !== 1) {
        users["users_list"].splice(userIndex, 1);
    }
}
app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    userToDelete(id)
    res.status(204).send("User successfully deleted");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});