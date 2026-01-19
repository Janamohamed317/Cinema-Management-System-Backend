import express from "express";
import authPath from "./routes/authRoute";
import EmployeeManagementPath from "./routes/employeeManagementRoute";
import moviePath from "./routes/movieRoute";
import hallPath from "./routes/hallRoute";
import "dotenv/config"; 

const app = express();

app.use(express.json());



app.use('/api/auth', authPath);

app.use('/api/EmployeeManagement', EmployeeManagementPath);

app.use('/api/hall', hallPath);

app.use('/api/movie', moviePath);


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("DATABASE_URL loaded:", process.env.DATABASE_URL ? "✅" : "❌");
});