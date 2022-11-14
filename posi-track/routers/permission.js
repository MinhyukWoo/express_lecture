exports.isLogin = function (request, response, next) {
  if (request.isAuthenticated()) {
    next();
  } else {
    response.redirect("/login");
  }
};

exports.isLogout = function (request, response, next) {
  if (!request.isAuthenticated()) {
    next();
  } else {
    response.redirect("/tracker");
  }
};
