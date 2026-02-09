import express from "express";
import authPath from "./routes/authRoute";
import EmployeeManagementPath from "./routes/employeeManagementRoute";
import moviePath from "./routes/movieRoute";
import hallPath from "./routes/hallRoute";
import screeningPath from "./routes/screeningRoute";
import seatPath from "./routes/seatRoute";
import { errorHandler } from "./middlewares/errorHandler";


const app = express();

app.use(express.json());


app.use('/api/auth', authPath);

app.use('/api/EmployeeManagement', EmployeeManagementPath);

app.use('/api/hall', hallPath);

app.use('/api/movie', moviePath);

app.use('/api/screening', screeningPath);

app.use('/api/seat', seatPath);

app.use(errorHandler) 

export default app;