import { Resource } from 'types/resource';

import { Question } from './question';

export interface Survey extends Resource {
  title: string;
  description: string;
  thankEmailAboveThreshold?: string;
  thankEmailBelowThreshold?: string;
  isActive?: boolean;
  coverImageUrl?: string;
  createdAt?: string;
  activeAt?: string;
  inactiveAt?: string;
  survey_type?: string;
  questions?: Question[];
}
