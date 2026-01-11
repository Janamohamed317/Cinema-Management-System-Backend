const express = require("express");
const authPath = require("./routes/authRoute")
const EmployeeManagementPath = require("./routes/EmployeeManagementRoute")
const moviePath = require("./routes/movieRoute")



const app = express();

app.use(express.json());



app.use('/api/auth', authPath);

app.use('/api/EmployeeManagement', EmployeeManagementPath);

app.use('/api/movie', moviePath);


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});