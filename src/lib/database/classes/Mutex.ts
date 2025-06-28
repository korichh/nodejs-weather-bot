export class Mutex {
  private locked: boolean = false;
  private waiting: (() => void)[] = [];

  public constructor() {}

  public lock(): Promise<() => void> {
    const release = (): void => {
      const next = this.waiting.shift();

      if (next) {
        next();
      } else {
        this.locked = false;
      }
    };

    if (!this.locked) {
      this.locked = true;

      return Promise.resolve(release);
    }

    return new Promise((resolve) => {
      this.waiting.push(() => resolve(release));
    });
  }
}
