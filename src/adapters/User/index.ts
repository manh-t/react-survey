import { getAuth } from 'adapters/BaseAuth';

export const getUserInfo = () => getAuth('me');
