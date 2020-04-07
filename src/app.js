const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
   const { title, url, techs } = request.body;

   const id = uuid();
   const respository = {
     id,
     title,
     url,
     techs,
     likes: 0
   }
   
   repositories.push(respository);

   return response.json(respository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs} = request.body;

  const repository = repositories.find(r => r.id === id);
  repository.title = title;
  repository.url = url;
  repository.techs = techs;

  return response.json(repositories);

});

app.delete("/repositories/:id", (req, res) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
