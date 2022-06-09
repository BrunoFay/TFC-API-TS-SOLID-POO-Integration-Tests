import { ErrorRequestHandler } from 'express';

const gerenicError: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
};
export default gerenicError;
