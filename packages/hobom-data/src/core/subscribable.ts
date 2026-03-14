type Listener = () => void;

export class Subscribable {
  protected listeners = new Set<Listener>();

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  protected notify(): void {
    for (const listener of this.listeners) {
      listener();
    }
  }

  getListenerCount(): number {
    return this.listeners.size;
  }
}
