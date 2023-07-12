import { AxiosResponse } from 'axios';
import { AnyObject } from 'immer/dist/internal';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';

import { Resource } from 'types/resource';

import { JSONObject } from './json';

export interface DeserializableResponse extends AxiosResponse<Deserializable> {
  included?: Deserializable[];
}

export interface DeserializableArrayResponse extends AxiosResponse<Deserializable[]> {
  included?: Deserializable[];
}

export interface Deserializable {
  type: string;
  id: string;
  attributes: JSONObject;
  relationships?: Relationship;
}

export interface Relationship {
  [key: string]: {
    data: RelationshipResource | RelationshipResource[];
  };
}

interface RelationshipResource {
  type: string;
  id: string;
}

export const deserialize = <T extends Resource>(data: Deserializable, included?: Deserializable[]): T => {
  const attributes = data.attributes;
  const relationships = data.relationships;
  const resource = {
    id: data.id,
    resourceType: data.type,
    ...attributes,
  };

  if (relationships && included) {
    const relationshipResource = (resourceId: string) => {
      const matchingItem = included.find((item) => item.id === resourceId);

      if (matchingItem) {
        return deserialize(matchingItem, included);
      }
    };

    Object.keys(relationships).forEach((resourceType: string) => {
      const relationshipData = relationships[resourceType].data;

      if (isArray(relationshipData) && !isEmpty(relationshipData)) {
        const relationshipResources = relationshipData.map((item) => relationshipResource(item.id));

        // FIXME Cannot use Object.assign because resource[resourceType] is null
        (resource as unknown as AnyObject)[resourceType] = relationshipResources;
      } else if (!isEmpty(relationshipData)) {
        // FIXME Cannot use Object.assign because resource[resourceType] is null
        (resource as unknown as AnyObject)[resourceType] = relationshipResource((relationshipData as RelationshipResource).id);
      }
    });
  }

  return resource as T;
};

export const deserializeList = <T extends Resource>(data: Deserializable[], included?: Deserializable[]): T[] => {
  return data.map((item) => deserialize<T>(item, included));
};
