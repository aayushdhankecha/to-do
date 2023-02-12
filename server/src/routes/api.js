import express from 'express';
import Register from '../controllers/register.controller.js';
import { RegisterSchema } from '../validateSchema/RegisterSchema.js';
import { LoginSchema } from '../validateSchema/LoginSchema.js';
import Login from "../controllers/login.controller.js"
import todocontroll from '../controllers/todo.controller.js';
import { GetList } from '../controllers/todoList.controller.js';
import { check } from 'express-validator';
import { markTodo } from '../controllers/markTodo.controller.js';
import { dltTodo } from '../controllers/dltTodo.controller.js';
const apiRoute = express.Router();
export const apiProtected = express.Router();

//Routers
apiRoute.post('/register',RegisterSchema,Register);
apiRoute.post('/login',LoginSchema,Login);

//Protected
apiProtected.post('/createTodo',
    [check("desc","Todo desc is required").exists()],
    todocontroll
);
apiProtected.get('/todoList',GetList);
apiProtected.post('/markTodo',
    [check("todo_id","Todo id is required").exists()],
    markTodo
);
apiProtected.post('/dltTodo',
    dltTodo
);
export default apiRoute;
