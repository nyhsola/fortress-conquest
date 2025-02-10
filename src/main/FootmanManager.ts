import { FOOTMAN_ORDER, FootmanBehaviour } from "behaviour/FootmanBehaviour"
import { Footman } from "game/Footman"
import { GamePlayer } from "game/GamePlayer"
import { Squad } from "game/Squad"
import { BaseFormation } from "global/BaseFormation"
import { Task } from "global/Task"
import { TooltipService } from "service/TooltipService"
import { createTask } from "util/CommonUtil"

export class FootmanManager {
  private readonly player: GamePlayer
  private readonly behaviour: FootmanBehaviour
  private readonly behaviourTask: Task = createTask(() => this.updateBehavior(), 3)
  private readonly footmanAbility: Task = createTask(() => this.onFootmanCast(), 5)

  private squad: Squad

  constructor(player: GamePlayer) {
    this.player = player
    this.behaviour = new FootmanBehaviour()
    this.squad = new Squad(player)
  }

  public init() {
    this.footmanAbility.reset()
  }

  public update(delta: number) {
    this.behaviourTask.update(delta)
    this.footmanAbility.update(delta)
  }

  public stats(): string {
    return TooltipService.footmanText(0, 0)
  }

  private updateBehavior() {
    this.behaviour.updateState(this.squad)
  }

  private onFootmanCast() {
    const barracks = this.player.getBarracks()
    const point = barracks?.getPoint()

    if (!barracks) return

    if (this.squad.isSquadFree() && point) {
      this.squad.addUnit(new Footman(point, this.player.allyId))
    }
  }
}
