/**
 * A Register Controller
 */

import { validationResult } from 'express-validator';
import { getConnection, getManager } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  // errors
  const formErrors = req.formErrors ? req.formErrors : [];

  // input fields
  const inputs = [
    {
      name: 'email',
      label: 'E-mail',
      type: 'text',
      value: req.body?.email ? req.body.email : '',
      error: req.formErrorFields?.email ? req.formErrorFields.email : '',
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      value: req.body?.password ? req.body.password : '',
      error: req.formErrorFields?.password ? req.formErrorFields.password : '',
    },
    {
      name: 'firstName',
      label: 'firstName',
      type: 'text',
      value: req.body?.firstName ? req.body.firstName : '',
    },
    {
      name: 'lastName',
      label: 'lastName',
      type: 'text',
      value: req.body?.lastName ? req.body.lastName : '',
    },
    {
      name: 'userName',
      label: 'userName',
      type: 'text',
      value: req.body?.userName ? req.body.userName : '',
    },
    {
      name: 'role',
      label: 'role',
      type: 'text',
      value: req.body?.role ? req.body.role : '',
    },
  ];

  // render the register page
  res.render('register', {
    layout: 'authentication',
    inputs,
    formErrors,
  });
};

export const login = async (req, res) => {
  if (req.cookies.token) {
    res.redirect('/playlist/1');
    return;
  }

  // errors
  const formErrors = req.formErrors ? req.formErrors : [];

  // input fields
  const inputs = [
    {
      name: 'userName',
      label: 'userName',
      type: 'text',
      value: req.body?.userName ? req.body.userName : '',
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      value: req.body?.password ? req.body.password : '',
      error: req.formErrorFields?.password ? req.formErrorFields.password : '',
    },
  ];

  // render the login page
  res.render('login', {
    layout: 'authentication',
    inputs,
    formErrors,
  });
};

export const postRegister = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.formErrorFields = {};

      errors.array().forEach(({ msg, param }) => {
        req.formErrorFields[param] = msg;
      });
      return next();
    }

    // get the user repository
    const userRepository = getConnection().getRepository('User');

    // validate if the user exists
    const user = await userRepository.findOne({
      where: {
        email: req.body.email,
      },
    });

    // check if we found a user
    if (user) {
      req.formErrors = [
        {
          message: 'Gebruiker bestaat reeds.',
        },
      ];
      return next();
    }

    // hash the password
    const hashedPassword = bcrypt.hashSync(req.body.password, 12);

    // create a new user
    await userRepository.save({
      email: req.body.email,
      password: hashedPassword,
      user_meta: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        avatar: '',
      },
      role: {
        name: req.body.role,
      },
    });

    // go to login page
    res.redirect('/login');
  } catch (e) {
    next(e.message);
  }
};

export const postLogin = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.formErrorFields = {};

      errors.array().forEach(({ msg, param }) => {
        req.formErrorFields[param] = msg;
      });
      return next();
    }

    // the username is in the userMeta table (specified in task) so to select user based on this I wrote a custom query because typeorm does not support this.
    const users = await getManager().query(
      `SELECT * FROM users INNER JOIN user_meta ON users.userMetaId = user_meta.id WHERE user_meta.userName ='${req.body.userName}'`
    );
    const user = users[0];

    // check if we found a user
    if (!user) {
      req.formErrors = [
        {
          message: 'Gebruiker bestaat nog niet.',
        },
      ];
      return next();
    }

    const roles = getConnection().getRepository('Role');
    const role = await roles.findOne({
      where: { id: user.roleId },
    });

    // check if password is correct
    const isEqual = bcrypt.compareSync(req.body.password, user.password);

    // if password is wrong
    if (!isEqual) {
      req.formErrors = [
        {
          message: 'wachtwoord is onjuist',
        },
      ];
      return next();
    }

    // create a webtoken
    const token = jwt.sign(
      {
        userId: user.id,
        userName: user.userName,
        role: role.name,
      },
      process.env.TOKEN_SALT,
      {
        expiresIn: '6h',
      }
    );

    // add the cookie in response
    res.cookie('token', token, {
      httpOnly: true,
    });

    // redirect to home page
    res.redirect('/playlist/1');
  } catch (e) {
    next(e.message);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie('token');
    return res.redirect('/login');
  } catch (e) {
    next(e.message);
  }
};
