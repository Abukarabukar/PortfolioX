import dayjs from 'dayjs';

export interface IAbukarUser {
  id?: number;
  login?: string;
  passwordHash?: string;
  email?: string;
  activated?: boolean | null;
  langKey?: string | null;
  imageUrl?: string | null;
  activationKey?: string | null;
  resetKey?: string | null;
  resetDate?: dayjs.Dayjs | null;
}

export const defaultValue: Readonly<IAbukarUser> = {
  activated: false,
};
