import express from "express";
import cors from "cors";
import userService from "./user-service.js";
import User from "./user-schema.js";
//listening for items from frontend
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());


app.get("/users",  async(req, res) => {
    let name = req.query.name;
    let job = req.query.job;
    // if job is undefined just look for name
    try {
        const result = await userService.getUsers(name, job);
        res.send( {users_list: result})
    }
    catch (error) {
        console.log(error);
        res.status(500).send("An error occurred in the server.");
    }
})

//finding Users by id
app.get("/users/:id", async (req, res) => {
    const id = req.params["id"]; //or req.params.id
    const result = await userService.findUserById(id);
    if (result === undefined || result === null) {
        res.status(404).send("Resource not found.")
    }
    else {
        res.send({ users_list: result});
    }
});

app.post("/users", async (req, res) => {
    const userToAdd = req.body;
    const savedUser = await userService.addUser(userToAdd);
    if (savedUser) res.status(201).send(savedUser);
    else res.send(500).end();
});

app.delete("/users/:id", async (req, res) => {
    const id = req.params["id"];

    try {
        let query = await User.findByIdAndDelete(id);

        if (query == null ) {
            res.status(404).send("resource not found");
        }
        else {
            res.status(204).send("User successfully deleted");
        }
    }
    catch (error) {
        console.log(error);
    }

});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});