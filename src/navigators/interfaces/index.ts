import type { KeyPath } from '../../keyPath';

export interface Navigator<T> {
  navigate(currentPath: string): KeyPath<T>[];
}
