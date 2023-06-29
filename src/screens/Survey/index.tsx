import React from 'react';
import { useParams } from 'react-router-dom';

const SurveyScreen = (): JSX.Element => {
  const { id } = useParams();

  return <div>Dashboard detail {id}</div>;
};

export default SurveyScreen;
