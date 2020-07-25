const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repository = {
    title,
    url,
    techs,
    likes: 0,
    id: uuid(id),
  }

  repositories.push(repository);

  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  
  repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if (repositoryIndex < 0){
    return response.status(400).json({ error: "Project not found"})
  }

  const likes = repositories[repositoryIndex].likes

  const repository = {
    title,
    url,
    techs,
    likes,
    id
  }

  repositories[repositoryIndex] = repository

  return response.json(repository)
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  
  repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if (repositoryIndex < 0){
    return response.status(400).json({ error: "Project not found"})
  }

  repositories.splice(repositoryIndex, 1)

  return response.json()
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if (repositoryIndex < 0){
    return response.status(400).json({ error: "Project not found"})
  }
  
  repositories[repositoryIndex].likes += 1

  return response.json(repositories)
});

app.listen(3000)

module.exports = app;
