import { Article } from '../article/article.model';
import NormalUser from '../normalUser/normalUser.model';
import { Video } from '../video/video.model';

const getDashboardMetaData = async () => {
  const totalUser = await NormalUser.countDocuments();
  const totalVideo = await Video.countDocuments();
  const totalArticle = await Article.countDocuments();

  return { totalUser, totalVideo, totalArticle };
};

const getUserChartData = async (year: number) => {
  // Start of the year
  const startOfYear = new Date(year, 0, 1); // January 1st
  // End of the year
  const endOfYear = new Date(year + 1, 0, 1); // January 1st of the next year

  const chartData = await NormalUser.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startOfYear,
          $lt: endOfYear,
        },
      },
    },
    {
      $group: {
        _id: { $month: '$createdAt' },
        totalUser: { $sum: 1 },
      },
    },
    {
      $project: {
        month: '$_id',
        totalUser: 1,
        _id: 0,
      },
    },
    {
      $sort: { month: 1 },
    },
  ]);

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const data = Array.from({ length: 12 }, (_, index) => ({
    month: months[index],
    totalUser:
      chartData.find((item) => item.month === index + 1)?.totalUser || 0,
  }));

  return data;
};

const MetaService = {
  getDashboardMetaData,
  getUserChartData,
};

export default MetaService;
