import { Conversation } from '@/app/types';
import HttpService from './HttpService';

export default new HttpService<Conversation>('/conversations');
