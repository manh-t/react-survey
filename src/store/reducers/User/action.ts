import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';

import { getUserInfo } from 'adapters/User';
import { DeserializableResponse, deserialize } from 'helpers/deserializer';
import { JSONObject } from 'helpers/json';
import { User } from 'types/user';

export const getUserThunkCreator: AsyncThunkPayloadCreator<User, void, JSONObject> = async () => {
  return getUserInfo().then((response: DeserializableResponse) => {
    const user = deserialize<User>(response.data);

    return user;
  });
};
