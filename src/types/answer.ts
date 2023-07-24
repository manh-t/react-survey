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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function instanceOfAnswer(object: any): object is Answer {
  return 'id' in object && 'text' in object && object.resourceType === 'answer';
}
