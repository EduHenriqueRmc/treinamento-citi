import express from "express";
import {  readAllUsers } from "./controllers/UserController";
import { createCalcado, deleteCalcados, readCalcados, updateCalcados } from "./controllers/CalcadoController";


const routes = express.Router();

routes.get("/users", readAllUsers);

//MÉTODOS HTTP E SUAS RESPECTIVAS FUNÇÕES
routes.post("/calcados", createCalcado);
routes.get("/calcados", readCalcados);
routes.patch("/calcados/:id", updateCalcados); //BUSCA POR ID
routes.delete("/calcados/:id", deleteCalcados);//BUSCA POR ID 

export default routes;
