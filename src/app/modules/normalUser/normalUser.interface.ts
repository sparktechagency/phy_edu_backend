import { Types } from 'mongoose';

export interface INormalUser {
  user: Types.ObjectId;
  username: string;
  phone: string;
  email: string;
  profile_image: string;
  dateOfBirth: Date;
  gender: 'Male' | 'Female';
}
