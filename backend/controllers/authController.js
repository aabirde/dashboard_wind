const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hash, role });
    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role
      },
    };

    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.cookie('token', token, {
      httpOnly: true, // Makes the cookie inaccessible to client-side JavaScript, preventing XSS.
      secure: process.env.NODE_ENV === 'production', // Ensures the cookie is only sent over HTTPS in production.
      sameSite: 'strict', // Provides strong protection against CSRF attacks.
      maxAge: 3600000, // Sets the cookie's expiration time in milliseconds (e.g., 1 hour).
    });

    res.status(200).json({
        message: "Logged in successfully",
        user: {
            id: user.id,
            username: user.username,
            role: user.role
        }
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

