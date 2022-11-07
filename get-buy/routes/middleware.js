exports.isLoggedIn = async (request, response, next) => {
  if (request.isAuthenticated()) {
    next();
  } else {
    const err = new Error("로그인 필요");
    console.error(err);
    response.redirect("/login");
  }
};

exports.isNotLoggedIn = async (request, response, next) => {
  if (!request.isAuthenticated()) {
    next();
  } else {
    const err = new Error("로그아웃 필요");
    console.error(err);
    response.redirect("/");
  }
};
