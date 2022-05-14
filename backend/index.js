const express = require("express");
const connectToMongo = require("./db");
const User = require('./modles/schema');
const login = require('./modles/loginSchema');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const body = require('express-validator')

// JWT_SECREAT="Signature";

connectToMongo();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
//Login -Pending
// try {
//   app.post("/login", async (req, res) => {
//     const salt = await bcrypt.genSalt(10);
//     const securePassword = await bcrypt.hash(req.body.password, salt);
//     // res.send(securePassword);
//     const data={
//       user:{
//         id:login.id
//       }
//     }
//     const authtoken=jwt.sign(data,JWT_SECREAT);
//     res.json({authtoken});
//   });
// }catch (error) {
//     console.error(error.message)
//     res.status(500).send("Internal server error");
//   }

//Create the user in the database
try {
  app.post("/",
    //  [
    //   body('name', 'Enter a valid name').isLength({ min: 3 }),
    //   body('email', 'Enter a valid email').isEmail(),
    // ],
    (req, res) => {
      res.send(req.body);
      let user = User(req.body);
      user.save();
    });
} catch (error) {
  console.error(error.message)
  res.status(500).send("Internal server error");
}
//Read all the user in the database
try {
  app.get("/read", async (req, res) => {
    res.json(await User.find());
  });
} catch (error) {
  res.status(500).send("Internal server error");
}
//Delete the user in the database
try {
  app.delete("/delete", async (req, res) => {
    res.send(await User.findByIdAndDelete(req.body.id));
  });
} catch (error) {
  res.status(500).send("Internal server error");
}
//Update the user data in the database     
try {
  app.put("/update", async (req, res) => {
    res.send(await User.findByIdAndUpdate(req.body.id, { name: req.body.name, email: req.body.email, phoneNo: req.body.phoneNo }));
  });
} catch (error) {
  res.status(500).send("Internal server error");
}

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});