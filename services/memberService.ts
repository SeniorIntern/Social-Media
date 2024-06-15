import { Player } from '@/app/types';

import HttpService from './HttpService';

export default new HttpService<Player>('/conversations/members');
