import { Resource } from 'types/resource';

export interface Answer extends Resource {
  text?: string;
  helpText?: string;
  inputMaskPlaceholder?: string;
  shortText?: string;
  displayType?: string;
  isMandatory?: boolean;
  displayOrder?: number;
  inputMask?: string;
  defaultValue?: string;
}
