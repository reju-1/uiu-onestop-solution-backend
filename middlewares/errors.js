function notFoundHandler(req, res, next) {
  next("Requested resource is not found");
}
function commonErrorHandler(err, req, res, next) {
  //console.log(err);
  res.json({ Error: err });
}

export { commonErrorHandler, notFoundHandler };
