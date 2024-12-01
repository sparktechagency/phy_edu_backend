import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchasync';
import sendResponse from '../../utilities/sendResponse';
import userServices from './user.services';

const registerUser = catchAsync(async (req, res) => {
  const result = await userServices.registerUser(
    req.body.password,
    req.body.confirmPassword,
    req.body.userData,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registration successful',
    data: result,
  });
});

const getMyProfile = catchAsync(async (req, res) => {
  const result = await userServices.getMyProfile(req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully retrieved your data',
    data: result,
  });
});
const changeUserStatus = catchAsync(async (req, res) => {
  const result = await userServices.changeUserStatus(
    req.params.id,
    req.body.status,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `User is ${result?.status}`,
    data: result,
  });
});
const deleteUserAccount = catchAsync(async (req, res) => {
  const result = await userServices.deleteUserAccount(
    req.user,
    req.body.password,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Your account deleted successfully`,
    data: result,
  });
});

const userController = {
  registerUser,
  getMyProfile,
  changeUserStatus,
  deleteUserAccount,
};
export default userController;
