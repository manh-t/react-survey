import { camelize } from 'helpers/string';

interface ConfigProps {
  [key: string]: string;
}

const envConfig = process.env;
const configurationPrefix = 'REACT_APP_';

const convertConfig = () => {
  const config: ConfigProps = {};

  Object.keys(envConfig).forEach((key: string) => {
    const newKey = camelize(key.replace(configurationPrefix, '').toLowerCase());

    config[newKey] = envConfig[key] || '';
  });

  return config;
};

export const Config = convertConfig();
