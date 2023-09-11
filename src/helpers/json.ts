import camelCase from 'lodash/camelCase';
import isEmpty from 'lodash/isEmpty';
import snakeCase from 'lodash/snakeCase';

export type JSONValue = string | number | boolean | JSONObject | JSONArray;
export type JSONArray = Array<JSONValue>;

export interface JSONObject {
  [key: string]: JSONValue | undefined;
}

const convertKeys = (
  json: JSONValue | JSONObject | JSONArray,
  convertKeyCallback: (key: string) => string,
  convertJsonCallback: (json: JSONValue | JSONObject | JSONArray | undefined) => JSONValue | JSONObject | JSONArray
) => {
  if (Array.isArray(json)) {
    return json.map((jsonObject) => convertJsonCallback(jsonObject as JSONValue));
  } else if (json === Object(json)) {
    const resultObject: JSONObject = {};
    Object.keys(json).forEach((key) => {
      resultObject[convertKeyCallback(key)] = convertJsonCallback((json as JSONObject)[key]);
    });

    return resultObject;
  }
};

export const keysToCamelCase = (json: JSONValue | JSONObject | JSONArray): JSONValue | JSONObject | JSONArray => {
  const result = convertKeys(
    json,
    (key) => camelCase(key),
    (jsonVal) => keysToCamelCase(jsonVal as JSONValue)
  );
  if (!isEmpty(result)) {
    return result;
  }
  return json;
};

export const keysToSnakeCase = (json: JSONValue | JSONObject | JSONArray): JSONValue | JSONObject | JSONArray => {
  const result = convertKeys(
    json,
    (key) => snakeCase(key),
    (jsonVal) => keysToSnakeCase(jsonVal as JSONValue)
  );
  if (!isEmpty(result)) {
    return result;
  }
  return json;
};
