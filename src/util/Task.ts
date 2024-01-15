abstract class Task {
  private accumulate: number = 0.0

  constructor(private interval: number) {}

  update(delta: number): void {
    this.accumulate += delta
    while (this.accumulate >= this.interval) {
      this.accumulate -= this.interval
      this.action()
    }
  }

  reset(): void {
    this.accumulate = 0.0
  }

  abstract action(): void
}
