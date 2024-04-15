import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Person from "../../models/person.js";
import transporter from "../../utilities/mailer.js";

async function signUp(req, res) {
  try {
    const { name, email, password } = req.body;

    const isVerifiedUser = await Person.findOne({ email, verified: true });

    if (isVerifiedUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newPerson = new Person({ name, email, password: hashedPassword });
    await newPerson.save();

    //------------ Send email-------------

    const token = jwt.sign(
      {
        userId: newPerson._id,
        email: newPerson.email,
        type: "Email verification",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    let mailOptions = {
      from: process.env.EMAIL_AC,
      to: newPerson.email,
      subject: "Verify Your Email with UIU Solutions",
      text: `Click the link to verify you email \n ${process.env.SERVER_URL}user/verify/${token}`,
    };

    //await transporter.sendMail(mailOptions); // this is too slow

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        // console.log("Email sent: " + info.response);
      }
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function logIn(req, res) {
  try {
    const { email, password } = req.body;
    const user = await Person.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check if the user's email is verified
    if (!user.verified) {
      return res.status(401).json({ error: "Email not verified" });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "10d" } //Expire in 10 Days
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error occurred during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function verifyEmail(req, res) {
  console.log("Token: ", req.params.token);
  res.status(200).json({ status: "Success" });
}

export { signUp, logIn, verifyEmail };
