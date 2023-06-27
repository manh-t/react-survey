import camelCase from 'lodash/camelCase';
import snakeCase from 'lodash/snakeCase';

export type JSONValue = string | number | boolean | JSONObject | JSONArray;
export type JSONArray = Array<JSONValue>;

export interface JSONObject {
  [key: string]: JSONValue;
}

export const keysToCamelCase = (json: JSONValue | JSONObject | JSONArray): JSONValue | JSONObject | JSONArray => {
  if (Array.isArray(json)) {
    return json.map((jsonObject) => keysToCamelCase(jsonObject as JSONValue));
  } else if (json === Object(json)) {
    const resultObject: JSONObject = {};
    Object.keys(json).forEach((key) => {
      resultObject[camelCase(key)] = keysToCamelCase((json as JSONObject)[key]);
    });

    return resultObject;
  }
  return json;
};

export const keysToSnakeCase = (json: JSONValue | JSONObject | JSONArray): JSONValue | JSONObject | JSONArray => {
  if (Array.isArray(json)) {
    return json.map((jsonObject) => keysToSnakeCase(jsonObject as JSONValue));
  } else if (json === Object(json)) {
    const resultObject: JSONObject = {};
    Object.keys(json).forEach((key) => {
      resultObject[snakeCase(key)] = keysToSnakeCase((json as JSONObject)[key]);
    });

    return resultObject;
  }
  return json;
};
