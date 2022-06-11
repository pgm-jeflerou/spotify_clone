/**
 * authorization of admin user
 */
import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.redirect('/login');
    }
    const user = jwt.verify(token, process.env.TOKEN_SALT);

    if (user.role !== 'admin') {
      return res
        .status(500)
        .json({ status: `only an admin can preform this action.` });
    }
    next();
  } catch (e) {
    next(e.message);
  }
};
