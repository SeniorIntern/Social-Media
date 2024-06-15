import { Tweet } from '@/app/types';
import HttpService from './HttpService';

export default new HttpService<Tweet>('/tweets/user');
