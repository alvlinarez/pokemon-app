import { Request } from 'express';

export interface CollectionBody {
  pageSize?: number;
  page?: number;
  sortBy?: 'order' | 'name';
  sortDescending?: boolean;
  filterBy?: string;
}

export interface CollectionRequest extends Request {
  body: CollectionBody;
}

export interface UserRequest extends Request {
  user?: {
    userId: string;
    username: string;
  };
}
