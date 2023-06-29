import _ from 'lodash';
import camelCase from 'lodash/camelCase';

interface ConfigProps {
  [key: string]: string;
}

const envConfig = process.env;
const configurationPrefix = 'REACT_APP_';

const convertedConfig: ConfigProps = {};

const convertConfig = () => {
  Object.keys(envConfig).forEach((key: string) => {
    const newKey = camelCase(key.replace(configurationPrefix, '').toLowerCase());

    convertedConfig[newKey] = envConfig[key] || '';
  });

  return convertedConfig;
};

export const config = () => (_.isEmpty(convertedConfig) ? convertConfig() : convertedConfig);
