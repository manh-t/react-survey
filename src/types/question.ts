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
  Intro = 'intro',
  Star = 'star',
  Heart = 'heart',
  Smiley = 'smiley',
  Thumbs = 'thumbs',
  Choice = 'choice',
  Nps = 'nps',
  Textarea = 'textarea',
  Textfield = 'textfield',
  Dropdown = 'dropdown',
  Outro = 'outro',
  Unknown = '',
}

export const getDisplayTypeEnum = (question: Question): DisplayType => {
  try {
    return (<never>DisplayType)[question.displayType ?? ''];
  } catch (error) {
    return DisplayType.Unknown;
  }
};
