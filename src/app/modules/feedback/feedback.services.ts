/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../error/appError';
import { IFeedback } from './feedback.interface';
import Feedback from './feedback.model';
import QueryBuilder from '../../builder/QueryBuilder';
import Notification from '../notification/notification.model';
import NormalUser from '../normalUser/normalUser.model';

const createFeedBack = async (userId: string, payload: IFeedback) => {
  const normalUser = await NormalUser.findById(userId).select('username');
  const result = await Feedback.create({ ...payload,name:normalUser?.username, user: userId });
  return result;
};

const getAllFeedback = async (query: Record<string, any>) => {
  const feedbackQuery = new QueryBuilder(Feedback.find(), query)
    .search(['name'])
    .fields()
    .filter()
    .paginate()
    .sort();
  const meta = await feedbackQuery.countTotal();
  const result = await feedbackQuery.modelQuery;

  return {
    meta,
    result,
  };
};

// reply feed back
const replyFeedback = async (id: string, replyMessage: string) => {
  const feedback = await Feedback.findById(id);
  if (!feedback) {
    throw new AppError(httpStatus.NOT_FOUND, 'Feedback not found');
  }
  const result = await Feedback.findByIdAndUpdate(
    id,
    {
      replyMessage: replyMessage,
    },
    { new: true, runValidators: true },
  );

  const notificationData = {
    title: 'Feedback reply message',
    message: result?.replyMessage,
    receiver: result?.user,
  };
  await Notification.create(notificationData);
  return result;
};

// delete feedback
const deleteFeedbackFromDB = async (id: string) => {
  const result = await Feedback.findByIdAndDelete(id);
  return result;
};

const feedbackService = {
  createFeedBack,
  replyFeedback,
  deleteFeedbackFromDB,
  getAllFeedback,
};

export default feedbackService;
