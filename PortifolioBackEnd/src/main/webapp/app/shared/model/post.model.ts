import dayjs from 'dayjs';
import { IAbukarUser } from 'app/shared/model/abukar-user.model';

export interface IPost {
  id?: number;
  title?: string;
  content?: string;
  date?: dayjs.Dayjs;
  abukarUser?: IAbukarUser | null;
}

export const defaultValue: Readonly<IPost> = {};
