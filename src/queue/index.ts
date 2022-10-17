import type { RequiredPathFinderOptions } from '../interfaces';
import type { KeyPath } from '../keyPath';

export class KeyPathQueue {
  private queue: KeyPath<any>[] = [];

  constructor(paths: KeyPath<any>[], private options: RequiredPathFinderOptions) {
    this.queue.push(...paths);
  }

  add(paths: KeyPath<any>[]): void {
    this.options.depthFirst ? this.addDepthFirst(paths) : this.addBreadthFirst(paths);
  }

  private addBreadthFirst(paths: KeyPath<any>[]): void {
    this.queue.push(...paths);
  }

  private addDepthFirst(paths: KeyPath<any>[]): void {
    this.queue.unshift(...paths);
  }

  *process(): Generator<KeyPath<any>, void, void> {
    for (const keyPath of this.queue) {
      yield keyPath;
    }
  }
}
