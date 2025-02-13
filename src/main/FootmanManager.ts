import { FOOTMAN_ORDER, FootmanBehaviour } from "behaviour/FootmanBehaviour"
import { Footman } from "game/Footman"
import { GamePlayer } from "game/GamePlayer"
import { Squad } from "game/Squad"
import { Task } from "global/Task"
import { TooltipService } from "service/TooltipService"
import { createTask } from "util/CommonUtil"

export class FootmanManager {
  private readonly player: GamePlayer
  private readonly behaviour: FootmanBehaviour
  private readonly behaviourTask: Task = createTask(() => this.updateBehavior(), 3)
  private readonly footmanAbility: Task = createTask(() => this.onFootmanCast(), 5)

  private squads: Array<Squad> = []

  constructor(player: GamePlayer) {
    this.player = player
    this.behaviour = new FootmanBehaviour()

    const defSquad = new Squad(player)
    const attackSquad = new Squad(player)

    defSquad.setOrderForSquad(FOOTMAN_ORDER.DEFEND)
    attackSquad.setOrderForSquad(FOOTMAN_ORDER.WAR)

    this.squads.push(defSquad)
    this.squads.push(attackSquad)
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
    this.behaviour.updateState(this.squads)
  }

  private onFootmanCast() {
    const barracks = this.player.getBarracks()
    const point = barracks?.getPoint()

    if (!barracks || !point) return

    const freeSquad = this.squads.filter((it) => it.isSquadFree())
    freeSquad[0]?.addUnit(new Footman(point, this.player.allyId))
  }
}
