const { check, validationResult, body } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const validateRegister = [
    check('username', 'Username must be between 4 and 30 characters and contain only letters and numbers.')
        .isLength({ min: 4, max: 30 })
        .isAlphanumeric()
        .trim()
        .escape(),

    check('email', 'Please include a valid email.')
        .isEmail()
        .normalizeEmail(),

    check('password', 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.')
        .isLength({ min: 8 })
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match.');
        }
        return true;
    }),
    handleValidationErrors
];

const validateLogin = [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
    handleValidationErrors
];

module.exports = {
    validateRegister,
    validateLogin
};
