const express = require('express');
const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  changeUserPasswordValidator,
//   updateLoggedUserValidator,
} = require('../validators/userValidator');

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  uploadUserImage,
  resizeImage,
  changeUserPassword,
  getLoggedUserData,
  updateLoggedUserPassword,
//   updateLoggedUserData,
//   deleteLoggedUserData,
} = require('../services/userService');

const authService = require('../services/authService');

const router = express.Router();

router.use(authService.protect);


router.get('/logOut', ()=>{
   res.cookie("token", token, {
    maxAge: 1, httpOnly: true,

    // until deploying
    secure: false
})
res.status(200).json(
    {
        username: userData.username,
        email: userData.email,
        name: userData.name,
        profileImage: userData.profileImage,
        role: userData.role,
        balance: userData.balance,
        verified: userData.verified,
    }

) 
});


router.get('/getMe', getLoggedUserData);
router.put('/changeMyPassword', updateLoggedUserPassword);
// router.put('/updateMe', updateLoggedUserValidator, updateLoggedUserData);
// router.delete('/deleteMe', deleteLoggedUserData);

// Admin
router.use(authService.allowedTo('admin', 'manager'));
router.put(
  '/changePassword/:id',
  changeUserPasswordValidator,
  changeUserPassword
);

router
  .route('/')
  .get(getUsers)
  .post(uploadUserImage, resizeImage, createUserValidator, createUser);
router
  .route('/:id')
  .get(getUserValidator, getUser)
  .put(uploadUserImage, resizeImage, updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;
