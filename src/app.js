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

  if(!repository) {
    return response.status(400).json({Error: 'Repository not found'});
  }

  repository.title = title;
  repository.url = url;
  repository.techs = techs;

  return response.json(repositories);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const respositoryIndex = repositories.findIndex(p => p.id == id);

  if(respositoryIndex === -1) {
    return response.status(400).json({Error: 'Repository not found'});
  }

  repositories.splice(respositoryIndex, 1);

  return response.status(200).json({ status: "Success"});
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
