//User login
const login = async (req, res) => {};

//Non-user register new account
const register = async (req, res, next) => {};

// verify email
const verifyEmail = async (req, res) => {};

//User get profile
const getProfile = async (req, res) => {};

const getProfileByAdmin = async (req, res) => {};

//User update profile
const updateProfile = async (req, res) => {};

// update password
const updatePassword = async (req, res) => {};

//  user Forgot password
const forgotPassword = async (req, res) => {};

const resetPassword = async (req, res) => {};

//Admin get users
const getUsers = async (req, res) => {};

//User upload avatar
const uploadAvatar = async (req, res) => {};

//Admin disable user
const disableUser = async (req, res) => {};

//Admin restore disabled user
const restoreUser = async (req, res) => {};

//Admin delete user
const deleteUser = async (req, res, next) => {};

const UserController = {
    login,
    register,
    verifyEmail,
    getProfile,
    getProfileByAdmin,
    updateProfile,
    getUsers,
    uploadAvatar,
    disableUser,
    restoreUser,
    deleteUser,
    updatePassword,
    forgotPassword,
    resetPassword
};

export default UserController;
