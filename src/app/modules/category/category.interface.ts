import { Types } from 'mongoose';

export interface ICategory {
  name: string;
  category_image: string;
}

export interface ISubCategory {
  shop: Types.ObjectId;
  category: Types.ObjectId;
  name: string;
  image: string;
}
