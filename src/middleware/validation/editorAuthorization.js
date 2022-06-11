/**
 * authorization of admin or editor user
 */
import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.redirect('/login');
    }
    const user = jwt.verify(token, process.env.TOKEN_SALT);

    if (!(user.role === 'editor' || user.role === 'admin')) {
      return res.status(500).json({
        status: `only an admin or an editor can preform this action.`,
      });
    }
    next();
  } catch (e) {
    next(e.message);
  }
};
