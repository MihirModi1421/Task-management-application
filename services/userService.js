const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.registerUser = async (email, password) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('Email already in use');
    }

    // const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password });
    await user.save();
    return user;
};

exports.loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }
    return user;
};
