import capitalize from 'lodash/capitalize';

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

export enum DisplayType {
  Intro,
  Star,
  Heart,
  Smiley,
  Thumbs,
  Choice,
  Nps,
  Slider,
  Textarea,
  Textfield,
  Dropdown,
  Outro,
  Unknown,
}

export const getDisplayTypeEnum = (question: Question): DisplayType => {
  return DisplayType[capitalize(question.displayType) as keyof typeof DisplayType] ?? DisplayType.Unknown;
};
