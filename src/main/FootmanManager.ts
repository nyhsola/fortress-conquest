import { FootmanBehaviour } from "behaviour/FootmanBehaviour"
import { Footman } from "game/Footman"
import { Player } from "game/Player"
import { TooltipService } from "service/TooltipService"
import { ABILITY } from "util/Config"
import { Task } from "util/Task"
import { createTask } from "util/Util"

export class FootmanManager {
  private readonly player: Player
  private readonly footmans: Array<Footman> = []
  private readonly behaviour: FootmanBehaviour
  private readonly behaviourTask: Task = createTask(() => this.updateBehavior(), 3)
  private readonly footmanAbility: Task = createTask(() => this.onFootmanCast(), 5)

  private footmanLimit = 6

  constructor(player: Player) {
    this.player = player
    this.behaviour = new FootmanBehaviour(this.player)
  }

  public init() {
    this.footmanAbility.reset()
  }

  public update(delta: number) {
    this.behaviourTask.update(delta)
    this.footmanAbility.update(delta)
  }

  private updateBehavior() {
    this.behaviour.updateState(this.footmans)
  }

  private onFootmanCast() {
    const castle = this.player.getCastle()
    const point = this.player.getPoint()
    const direction = this.player.getDirection()

    if (!castle || castle.getAbilityLevel(ABILITY.FOOTMAN) != 1) return

    if (this.footmans.length >= this.footmanLimit || !point || !direction) return
    this.footmans.push(new Footman(point, this.player.allyId))

    TooltipService.updateFootman(this.player.playerId, this.footmans.length, this.footmanLimit)
  }
}
