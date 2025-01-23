import httpStatus from 'http-status';
import AppError from '../../error/appError';
import { INormalUser } from './normalUser.interface';
import NormalUser from './normalUser.model';
import QueryBuilder from '../../builder/QueryBuilder';

const updateUserProfile = async (id: string, payload: Partial<INormalUser>) => {
  const user = await NormalUser.findById(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Profile not found');
  }
  const result = await NormalUser.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const getAllNormalUser = async (query: Record<string, unknown>) => {
  const normalUserQuery = new QueryBuilder(
    NormalUser.find().populate({ path: 'user', select: 'status' }),
    query,
  )
    .search(['username'])
    .fields()
    .filter()
    .paginate()
    .sort();
  const meta = await normalUserQuery.countTotal();
  const result = await normalUserQuery.modelQuery;
  return {
    meta,
    result,
  };
};

const getSingleUser = async (id: string) => {
  const normalUser = await NormalUser.findById(id);
  if (!normalUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  return normalUser;
};

const NormalUserServices = {
  updateUserProfile,
  getAllNormalUser,
  getSingleUser,
};

export default NormalUserServices;
