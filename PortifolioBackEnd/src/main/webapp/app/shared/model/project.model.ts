import dayjs from 'dayjs';
import { IAbukarUser } from 'app/shared/model/abukar-user.model';

export interface IProject {
  id?: number;
  title?: string;
  description?: string;
  date?: dayjs.Dayjs;
  url?: string | null;
  abukarUser?: IAbukarUser | null;
}

export const defaultValue: Readonly<IProject> = {};
