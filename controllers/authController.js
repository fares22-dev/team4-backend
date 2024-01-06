// Import the schemas
const Doctor = require('../models/doctorModel');
const Patient = require('../models/patientModel');
const Diagnostic = require('../models/diagnosticModel');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Example function to send verification email
function sendVerificationEmail(email, token) {
  // Replace the following lines with your actual email sending logic using a library like Nodemailer
  const nodemailer = require('nodemailer');

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
  });

  const validationLink = `http://localhost:3000/api/authRoutes/verify-email?token=${token}`;
  const mailOptions = {
    from: 'ademnouaouer8@gmail.com',
    to: email,
    subject: 'Email Verification',
    text: `Click the following link to validate your email: ${validationLink}`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error('Failed to send verification email:', error);
      // Handle the error, e.g., log it or return an error response
    }
    else{
      console.log("adem is cool")
    }
    // Email sent successfully
  });
}

async function verifyEmail(req, res) {
    try {
      const { token } = req.query;
  
      // Verify the email verification token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  
      // Find the doctor in the database based on the decoded email
      const doctor = await Doctor.findOne({ email: decodedToken.email });
  
      if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found' });
      }
  
      // Mark the email as verified in the database
      doctor.validated = true;
      await doctor.save();
  
      res.status(200).json({ message: 'Email verification successful. You can now log in.' });
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: 'Invalid or expired token' });
    }
  }
async function register(req, res) {
  try {
    const { firstname,lastname,email,password,gender,age,speciality,validated } = req.body;
// Check if email is already registered
const existingDoctor = await Doctor.findOne({ email });
if (existingDoctor) {
  return res.status(400).json({ error: 'Email is already registered' });
}

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = new Doctor({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      speciality,
      gender,
      age,
      validated    });

    // await doctor.save();

    try {
      await doctor.save();
      console.log('Doctor saved successfully!');
    } catch (saveError) {
      console.error('Error saving doctor:', saveError.message);
      // Handle the error as needed
    }
 






    // Create a JWT token for email verification
    const verificationToken = jwt.sign({ email: doctor.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send an email with the verification link containing the token
    sendVerificationEmail(email, verificationToken);

    res.status(201).json({ message: 'Doctor registered successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Find the doctor in the database by ID
    const doctor = await Doctor.findOne({email});

    if (!doctor) {
      return res.json({ error: 'Doctor not found',status:"404" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, doctor.password);

    if (!passwordMatch) {
      return res.json({ error: 'Invalid ID or password',status:"401"  });
      
    }

    // Check if the email is verified before generating the JWT
    if (!doctor.validated) {
      return res.json({ error: 'Email not verified' ,status:"402" });
    }
    
    // Generate a JWT for authentication after successful login
    const authToken = jwt.sign(
      {
        id: doctor._id,
        email: doctor.email,
      },
      process.env.JWT_SECRET
    );

    res.status(200).json({ token: authToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function update(req, res) {
  try {
    const { doctorId } = req.doctor._id; // Assuming you have the doctor's ID in the doctor object

    // Retrieve the doctor from the database using the doctorId
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    // Update the doctor's information
    if (req.body.firstname) {
      doctor.firstname = req.body.firstname;
    }
    if (req.body.lastname) {
      doctor.lastname = req.body.lastname;
    }

    if (req.body.gender) {
      doctor.gender = req.body.gender;
    }

    if (req.body.age) {
      doctor.age = req.body.age;
    }


    if (req.body.password) {
      // Hash the new password before saving it
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      doctor.password = hashedPassword;
    }
    if (req.body.specialization) {
      doctor.specialization = req.body.specialization;
    }
    // Save the updated doctor information
    await doctor.save();

    res.status(200).json({ message: 'Doctor information updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  verifyEmail,
  register,
  login,
  update,
 
};
