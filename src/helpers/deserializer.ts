import { AxiosResponse } from 'axios';

import { Resource } from 'types/resource';

import { JSONObject } from './json';

export type DeserializableResponse = AxiosResponse<Deserializer>;

export interface Deserializer {
  type: string;
  id: string;
  attributes: JSONObject;
}

export const deserialize = <T extends Resource>(data: Deserializer): T => {
  const resource = {
    id: data.id,
    resourceType: data.type,
    ...data.attributes,
  };

  return resource as T;
};
