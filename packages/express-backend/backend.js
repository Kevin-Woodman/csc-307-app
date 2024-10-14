import express from "express"
import cors from "cors"

const app = express()
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

app.use(cors())
app.use(express.json())

app.get("/",(req,res) => {
    res.send("Hello World!");
});

const findUserByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => {
      let found = true
      if(name != undefined){
        found &= (user["name"] === name)
      }
      if(job != undefined){
        found &= (user["job"] === job)
      }
      return found
    }
  );
};

app.get("/users",(req,res) => {
  const name = req.query.name;
  const job = req.query.job;
  if(name != undefined || job != undefined){
    let result = findUserByNameAndJob(name,job);
    result = {users_list: result};
    res.send(result);
  } else {
    res.send(users);
  }
});

const findUserById = (id) =>
  users["users_list"].find((user)=> user["id"] === id);

app.get("/users/:id",(req,res)=> {
  const id = req.params.id;
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.")
  } else {
    res.send(result);
  }
});

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
}

app.post("/users",(req,res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

const deleteUserById = (id)=>{
  let index = users["users_list"].findIndex((user)=> user["id"] === id)
  if(index !== -1){
    users["users_list"].splice(index, 1)
    return true
  }else{
    return false
  }
    
}

app.delete("/users",(req,res) => {
  const idToDelete = req.body.id;
  if(deleteUserById(idToDelete)){
    res.send("Deleted users")
  }else
    res.status(404).send("Resouce not found")
});

app.listen(port,() => {
    console.log(`Example app listening at http://localhost:${port}`);
});
