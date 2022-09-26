import type { Metadata, MetaContent, PathFinderOptions } from '../../interfaces';

export interface NavigatorOptions<T> extends MetaContent<T>, PathFinderOptions {}

export interface Navigator<T> {
  navigate(currentPath: string): NavigationEnd<T>[];
}

export interface KeyOptions<T> extends NavigatorOptions<T> {
  key: string | number;
  currentPath: string;
  value: any;
}

export interface NavigationEnd<T> extends NavigatorOptions<T> {
  isEndPoint: boolean;
  meta: Metadata;
  path: string;
  source: T;
}
