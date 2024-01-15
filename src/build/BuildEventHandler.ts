export class BuildEventHandler {
  private subscriptions: Record<number, (building: unit | undefined) => void> = {}

  public subscribe(id: number, action: (building: unit | undefined) => void) {
    this.subscriptions[id] = action
  }

  public fire(building: unit | undefined) {
    for (let key of Object.keys(this.subscriptions)) {
      this.subscriptions[Number(key)](building)
    }
  }
}
