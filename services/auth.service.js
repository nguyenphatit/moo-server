const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./../models/index').User;
const validateLoginInput = require('./../validations/login');
const MemoryCacher = require('./../lib/memory-cacher');

exports.login = (req, res, next) => {
    const globalSetting = MemoryCacher.retrieve('global-setting');
    const { errors, isValid } = validateLoginInput(req.body);
    const { email, password } = req.body;

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ where: { email } }).then(user => {
        if (!user) {
            errors.email = 'User not found';
            return res.status(404).json(errors);
        }

        if (user.status !== 'Enabled') {
            errors.email = 'This user account is currently disabled or locked';
            return res.status(404).json(errors);
        }

        if (user.loginFails > globalSetting.unsuccessfulLoginAttempts) {
            User.update({ status: 'Locked' }, { where: { email: user.email } });
            errors.password = 'The maximum amount of login attempts has been exceeded. The account has been locked';
            return res.status(403).json(errors);
        }

        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (!isMatch) {
                    // update login fail
                    User.update({ loginFails: user.loginFails + 1 }, { where: { email: user.email } });

                    errors.password = 'Incorrect Password';
                    return res.status(400).json(errors);
                }

                const payload = {
                    id: user.id,
                    email: user.email,
                    displayName: user.displayName
                };

                jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 30 }, (err, token) => {
                    if (err) {
                        console.error('There is some error in token', err);
                    } else {
                        res.status(200).json({
                            code: 'SUCCESS',
                            token
                        })
                    }

                })
            })
    });
}

exports.register = (req, res, next) => {
    const { errors, isValid } = validateLoginInput(req.body);
    const { email, password, firstName, lastName, phone } = req.body;

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ where: { email } }).then(user => {
        if (user) {
            return res.status(400).json({ message: 'Email already exists' })
        }

        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                console.log('There was an error', err)
            } else {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) {
                        console.log('There was an error', err)
                    } else {
                        const newUser = {
                            email,
                            password: hash,
                            firstName,
                            lastName,
                            displayName: `${firstName} ${lastName}`,
                            phone
                        };

                        User.create(newUser).then(result => {
                            if (result) {

                                return res.status(200).send(result);
                            } else {

                                return res.status(400).send('Error in insert new record');
                            }
                        })
                    }
                })
            }
        })
    });
}

exports.authenticate = (req, res, next) => {
    return res.status(200).json(req.user);
}