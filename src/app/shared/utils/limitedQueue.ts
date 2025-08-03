import {Queue} from './queue';

export class LimitedQueue<T> extends Queue<T> {

  private readonly limit: number;
  constructor(limit: number) {
    super();
    this.limit = Math.max(limit, 1);
  }

  override enqueue(item: T){
    if(this.size() >= this.limit){
      this.dequeue();
    }
    this.items.push(item);
  }

}
