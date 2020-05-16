module.exports.postAdd = (req, res, next) => {
  var name = req.body.name;
  if (name.length > 30) {
    let error = "Your username is too long (> 30 chars)!";
    res.render("users/add", {
      name: name,
      error: error
    });
    return;
  };
  next();
};