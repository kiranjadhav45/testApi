// const jwt = require("jsonwebtoken");

// const createToken = (newForm) => {
//   const token = jwt.sign({ bundle: newForm.bundle }, "your_secret_key");
//   return token;
// };

// app.post("/register", async (req, res) => {
//   try {
//     // validate the request body here
//     const {
//       firstName,
//       lastName,
//       mobile,
//       email,
//       userName,
//       password,
//       confirmPassword,
//       businessType,
//     } = req.body;

//     // create newForm object
//     let newForm = {
//       firstName,
//       lastName,
//       mobile,
//       email,
//       userName,
//       password,
//       confirmPassword,
//       businessType,
//     };

//     // validate the newForm object using Joi
//     const schema = Joi.object({
//       firstName: Joi.string().min(3).required(),
//       lastName: Joi.string().required(),
//       mobile: Joi.string().required(),
//       email: Joi.string().required(),
//       userName: Joi.string().required(),
//       password: Joi.string().required(),
//       confirmPassword: Joi.string().required(),
//       businessType: Joi.string().required(),
//     });

//     const { error } = schema.validate(newForm);

//     if (error) {
//       return res.status(400).json({ message: error.details[0].message });
//     }

//     // generate JWT containing newForm.bundle
//     const token = createToken(newForm);

//     // remove firstName and lastName from newForm and add name field
//     newForm.name = `${firstName} ${lastName}`;
//     delete newForm.firstName;
//     delete newForm.lastName;

//     // create user account in database here using newForm object
//     // ...

//     // return response with JWT in headers
//     return res
//       .status(200)
//       .header("x-auth-token", token)
//       .json({ message: "User account created successfully." });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal server error." });
//   }
// });

//second code

//

//third

const express = require("express");
const jwt = require("jsonwebtoken");
// const config = require("./config.json");
const jwtPrivateKey = "kiran1515";

const app = express();
app.use(express.json());

app.post("/api/users", (req, res) => {
  // Extract the form data from the request body
  const {
    firstName,
    lastName,
    mobile,
    email,
    userName,
    password,
    confirmPassword,
    bundle,
  } = req.body;

  // Construct the user object to save in the database
  const user = {
    name: `${firstName} ${lastName}`,
    mobile,
    email,
    userName,
    bundle,
    confirmPassword,
    password,
  };

  // Generate the JWT token
  const token = jwt.sign(user, jwtPrivateKey);

  // Set the token in the response header
  res.header("authorization", token);

  // Return the user object in the response body
  res.send(user);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
