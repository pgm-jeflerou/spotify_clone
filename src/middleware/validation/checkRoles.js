/**
 * filter non existing roles
 */

export default (req, res, next) => {
  try {
    const roles = ['admin', 'editor', 'reader'];

    // make sure role is written in all lowercase
    req.body.role = req.body.role.toLowerCase();

    if (roles.includes(req.body.role)) {
      return next();
    }
    req.formErrors = [
      {
        message: `de rol ${req.body.role} bestaat niet`,
      },
    ];
    return next();
  } catch (e) {
    next(e.message);
  }
};
