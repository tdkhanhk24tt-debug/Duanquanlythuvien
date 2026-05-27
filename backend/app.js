const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= MYSQL =================
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "thuvienudck",
});

db.connect((err) => {

  if (err) {

    console.log("Kết nối MySQL thất bại");
    console.log(err);

  }

  else {

    console.log("Kết nối MySQL thành công");

  }

});

// ================= ROUTES =================
const routes = require("./routes");

app.use("/", routes(db));

// ================= SERVER =================
const PORT = 5000;

app.listen(PORT, () => {

  console.log(`Server đang chạy tại port ${PORT}`);

});