import { Resource } from 'types/resource';

import { Answer } from './answer';

export interface Question extends Resource {
  text?: string;
  helpText?: string;
  displayOrder?: number;
  shortText?: string;
  pick?: string;
  displayType?: string;
  isMandatory?: boolean;
  imageUrl?: string;
  coverImageUrl?: string;
  coverImageOpacity?: number;
  coverBackgroundColor?: string;
  answers: Answer[];
}
