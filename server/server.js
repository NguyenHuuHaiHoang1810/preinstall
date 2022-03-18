require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload({
  useTempFiles: true
}))

//routes
app.use('/user',require('./routes/userRouter'))
app.use('/api',require('./routes/categoryRouter'))
app.use('/api',require('./routes/upload'))










const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
  }
);

<<<<<<< HEAD
// app.use("/api", require("./routes/authRouter"));
// app.use("/api", require("./routes/userRouter"));
// app.use("/api", require("./routes/postRouter"));
// app.use("/api", require("./routes/commentRouter"));
// app.use("/api", require("./routes/notifyRouter"));

=======
>>>>>>> 611ad1451fcad2ee4e1755fe04a4bb75cf6d9954
const port = 5000;
app.listen(port, () => {
  console.log("Server is running on port", port);
});
