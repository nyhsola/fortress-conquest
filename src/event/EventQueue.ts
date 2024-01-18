export class EventQueue {
  private eventQueue: Array<Record<string, any>> = []
  private tmp: Array<Record<string, any>> = []

  public proceed(array: Array<Record<string, () => boolean>>) {
    this.tmp = []
    for (const entry of array) {
      this.proceedInternal(entry)
    }
    this.eventQueue = this.eventQueue.filter((e, i) => !this.contains(e, this.tmp))
  }

  private proceedInternal(record: Record<string, (...args: any) => boolean>) {
    for (const eventRecord of this.eventQueue) {
      const eventKey = Object.keys(eventRecord)?.[0]
      const eventArgs = Object.values(eventRecord)?.[0]
      const handlerEventKey = Object.keys(record)?.[0]
      if (handlerEventKey == eventKey) {
        const operation = record[handlerEventKey]
        const succeed = operation(eventArgs)
        if (succeed) {
          this.tmp.push(eventRecord)
        }
      }
    }
  }

  public receive(args: Record<string, any>) {
    this.eventQueue.push(args)
  }

  private contains(record: Record<string, any>, array: Array<Record<string, any>>): boolean {
    let contains = false
    const eventKey = Object.keys(record)?.[0]
    const eventValue = Object.values(record)?.[0]

    for (const value of array) {
      const tmpEventKey = Object.keys(value)?.[0]
      const tmpEventValues = Object.values(value)?.[0]

      if (tmpEventKey == eventKey && eventValue == tmpEventValues) return true
    }
    return contains
  }
}
