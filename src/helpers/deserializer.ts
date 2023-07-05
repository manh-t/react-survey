import { AxiosResponse } from 'axios';

import { Resource } from 'types/resource';

import { JSONObject } from './json';

export type DeserializableResponse = AxiosResponse<Deserializable>;

export type DeserializableArrayResponse = AxiosResponse<Deserializable[]>;

export interface Deserializable {
  type: string;
  id: string;
  attributes: JSONObject;
}

export const deserialize = <T extends Resource>(data: Deserializable): T => {
  const attributes = data.attributes;
  const resource = {
    id: data.id,
    resourceType: data.type,
    ...attributes,
  };

  return resource as T;
};

export const deserializeList = <T extends Resource>(data: Deserializable[]): T[] => {
  return data.map((item) => deserialize<T>(item));
};
