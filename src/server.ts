import express from "express";

const app = express();

app.get('/', (request, response) => {
  return response.json({
    message: "Ola NLW 05"
  });
})

app.post("/", (request, response) => {
  return response.json({
    message: "Usario salvo com sucesso!"
  })

})

app.listen(3333, () => console.log("Server is runing on port 3333"));