import { NavigatorOptions, Navigator, NavigationEnd } from '../interfaces';
import { Meta } from '../../meta';

export abstract class Navigable<T> extends Meta<T> implements Navigator<T> {
  abstract navigate(currentPath: string): NavigationEnd<T>[];

  constructor(protected options: NavigatorOptions<T>) {
    super(options);
  }
}
