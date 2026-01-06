const express = require("express");
const { DbConnection } = require("./DbConnection/DbConnect");
const authPath = require("./routes/auth")


const app = express();

app.use(express.json());



app.use('/api/auth', authPath);


const PORT = process.env.PORT || 5000;

DbConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Database connection failed:", err);
        process.exit(1);
    });