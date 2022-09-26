export type ContentWithSearchablePath<T = any> = T extends object ? T : Array<T>;

export interface MetaContent<T> {
  original: ContentWithSearchablePath<T>;
  source: T;
}

export interface PathFinderOptions {
  endPoint: string;
  hints?: string[];
  firstMatch?: boolean;
}

export type RequiredPathFinderOptions = Required<PathFinderOptions>;

export interface Metadata {
  type: string;
}

export interface Finder<T = any> {
  find(searchObject: ContentWithSearchablePath<T>): any;
}
