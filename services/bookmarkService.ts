import { Bookmark } from '@/app/types';

import HttpService from './HttpService';

export default new HttpService<Bookmark>('/bookmarks');
