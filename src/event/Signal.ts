import { EventQueue } from "./EventQueue"

export class Signal {
  private eventQueue: Array<EventQueue> = []

  public add(eventQueue: EventQueue) {
    this.eventQueue.push(eventQueue)
  }

  public dispatch(args: Record<string, any>) {
    for (const eventQueueL of this.eventQueue) {
      eventQueueL.receive(args)
    }
  }
}
