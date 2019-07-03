const userController = {};

userController.getAllUser = (req, res) => {
  res.json('controllers working');
};

userController.registerUser = (req, res) => {
  res.json('reg working');
};

userController.loginUser = (req, res) => {
  res.json('login working');
};

userController.logoutUser = (req, res) => {
  res.json('logout working');
};

export default userController;
