const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users.js');
const transporter = require('../config/mailer');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = await User.create({ username, email, password: hashedPassword });

        const payload = {
            user: {
                id: user.id
            }
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' } 
        );

        const verificationLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify-email/${token}`;
        
        const mailOptions = {
            from: `"Wind Dashboard" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Email Verification',
            html: `
                <p>Hello ${username},</p>
                <p>Thank you for registering. Please click the link below to verify your email address:</p>
                <a href="${verificationLink}" target="_blank" style="padding: 10px 15px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
                <p>This link will expire in 1 hour.</p>
            `,
        };

        await transporter.sendMail(mailOptions);
        
        res.status(201).json({ message: 'User registered successfully. Please check your email to verify your account.' });

    } catch (err) {
        console.error('Registration Error:', err.message);
        res.status(500).send('Server error');
    }
};

/**
 * @desc    Authenticate user and get token (login)
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5h' } // Login token valid for 5 hours
        );

        res.json({ token });

    } catch (err) {
        console.error('Login Error:', err.message);
        res.status(500).send('Server error');
    }
};

/**
 * @desc    Verify user's email from the link clicked
 * @route   GET /api/auth/verify-email/:token
 * @access  Public
 */
exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.user.id);

        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid token, user not found.' }] });
        }
        
        // TODO: Update the user model to mark the email as verified
        // user.isVerified = true;
        // await user.save();

        res.status(200).json({ message: 'Email verified successfully. You may now log in.' });
    } catch (err) {
        console.error('Email Verification Error:', err.message);
        if (err.name === 'JsonWebTokenError') {
            return res.status(400).json({ message: 'Invalid or expired verification link.' });
        }
        res.status(500).send('Server error');
    }
};

