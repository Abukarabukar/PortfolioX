import dayjs from 'dayjs';
import { IAbukarUser } from 'app/shared/model/abukar-user.model';

export interface IPhoto {
  id?: number;
  title?: string;
  url?: string;
  date?: dayjs.Dayjs;
  abukarUser?: IAbukarUser | null;
}

export const defaultValue: Readonly<IPhoto> = {};
