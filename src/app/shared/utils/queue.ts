export class Queue<T> {

  protected items: T[] = [];

  enqueue(item: T){
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  peek(): T | undefined {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  clear(){
    this.items = [];
  }

  // Returns a shallow copy
  toArray(): T[] {
    return [...this.items];
  }

  print(): void {
    console.log(...this.items);
  }

}
