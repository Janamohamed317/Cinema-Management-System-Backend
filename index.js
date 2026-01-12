const express = require("express");
const authPath = require("./routes/authRoute")
const EmployeeManagementPath = require("./routes/employeeManagementRoute")
const moviePath = require("./routes/movieRoute")
const hallPath = require("./routes/hallRoute")



const app = express();

app.use(express.json());



app.use('/api/auth', authPath);

app.use('/api/hall', hallPath);

app.use('/api/EmployeeManagement', EmployeeManagementPath);

app.use('/api/movie', moviePath);


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});