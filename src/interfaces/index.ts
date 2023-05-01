export type ContentWithSearchablePath<T = any> = T extends object ? T : Array<T>;

export interface PathFinderOptions {
  /**
   * @description Indicates if all paths to endpoints should be collected
   *
   * @default false
   *
   * @type {boolean}
   * @memberof PathFinderOptions
   */
  alwaysCollect?: boolean;

  /**
   * @description Terminate path endpoint discovery on first path endpoint identification
   *
   * @default true
   *
   * @type {boolean}
   * @memberof PathFinderOptions
   */
  preemptiveEndpoints?: boolean;

  /**
   * @description String or regexp that identifies a path endpoint
   *
   * @note Passing '*' will map all endpoints
   *
   * @type {string}
   * @memberof PathFinderOptions
   */
  endpoint?: string | RegExp;

  /**
   * @description Paths hints to indicate accurate endpoints.
   *
   * @default []
   *
   * @note Default mode is hints need to exist somewhere in the current path
   *
   * @type {string[]}
   * @memberof PathFinderOptions
   */
  hints?: string[];

  /**
   * @description Exit path traversal on first endpoint match
   *
   * @type {boolean}
   * @memberof PathFinderOptions
   */
  firstMatch?: boolean;

  /**
   * @description if true, then hints must be in order
   *
   * @default false
   *
   * @type {boolean}
   * @memberof PathFinderOptions
   */
  strictHints?: boolean;

  /**
   * @description Numeric value that represents the maximum search depth within an object or array
   *
   * @default Infinity
   *
   * @type {number}
   * @memberof PathFinderOptions
   */
  maxDepth?: number;

  /**
   * @description Define the search pattern as depth first (true) vs breadth first (false)
   *
   * @type {boolean}
   * @memberof PathFinderOptions
   */
  depthFirst?: boolean;

  /**
   * @description Retrieve endpoints until sample size is met
   *
   * @type {number}
   * @memberof PathFinderOptions
   */
  sample?: number;
}

export type RequiredPathFinderOptions = Required<PathFinderOptions>;
export type DefaultPathFinderOptions = Omit<RequiredPathFinderOptions, 'endpoint'>;

export interface Metadata {
  readonly type: string;
}

export interface Finder<T = any> {
  find<Source = T>(
    searchObject: ContentWithSearchablePath<Source>,
    options?: Partial<PathFinderOptions>,
  ): Endpoint<Source>[];

  map<Source = T>(
    searchObject: ContentWithSearchablePath<Source>,
    options?: Partial<PathFinderOptions>,
  ): Endpoint<Source>[];

  first<Source = T>(
    searchObject: ContentWithSearchablePath<Source>,
    options?: Partial<PathFinderOptions>,
  ): Endpoint<Source> | undefined;
}

export interface NavigatorOptions<T> extends RequiredPathFinderOptions {
  original: ContentWithSearchablePath<T>;
  depth: number;
  source: T;
}

interface SharedOptions<T> extends NavigatorOptions<T> {
  key: string | number | null;
  currentPath: string;
}

export interface EndpointIdentityOptions<T> extends SharedOptions<T> {
  /**
   * @description Indicates if there is a navigable structure beyond the current point
   *
   * @type {boolean}
   * @memberof EndpointIdentityOptions
   */
  pathComplete: boolean;

  /**
   * @description The number of collected endpoints
   *
   * @type {number}
   * @memberof EndpointIdentityOptions
   */
  collected: number;
}

export interface KeyOptions<T> extends SharedOptions<T> {
  value: any;
}

/**
 * @description Endpoint information
 *
 * @export
 * @interface Endpoint
 * @extends {Omit<NavigatorOptions<T>, keyof Omit<PathFinderOptions, 'endpoint'>>}
 * @template T
 */
export interface Endpoint<T = any>
  extends Omit<NavigatorOptions<T>, keyof Omit<PathFinderOptions, 'endpoint'>> {
  pathComplete: boolean;
  isEndpoint: boolean;
  meta: Metadata;
  path: string;
  source: T;
}

export type Endpoints<T = any> = Endpoint<T>[];
