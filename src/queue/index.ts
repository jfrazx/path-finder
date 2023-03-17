import type { RequiredPathFinderOptions } from '../interfaces';
import type { KeyPath } from '../keyPath';

export class KeyPathQueue {
  private readonly queue: KeyPath<any>[] = [];
  private currentIndex = 0;

  constructor(paths: KeyPath<any>[], private options: RequiredPathFinderOptions) {
    this.addBreadthFirst(paths);
  }

  add(paths: KeyPath<any>[]): void {
    this.options.depthFirst ? this.addDepthFirst(paths) : this.addBreadthFirst(paths);
  }

  private addBreadthFirst(paths: KeyPath<any>[]): void {
    this.queue.push(...paths);
  }

  private addDepthFirst(paths: KeyPath<any>[]): void {
    this.queue.splice(this.currentIndex + 1, 0, ...paths);
  }

  *process(): Generator<KeyPath<any>, void, void> {
    for (const [index, keyPath] of this.queue.entries()) {
      this.currentIndex = index;

      yield keyPath;
    }
  }
}
