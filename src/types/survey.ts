import { Resource } from 'types/resource';

export interface Survey extends Resource {
  imageUrl: string;
  title: string;
  description: string;
}
