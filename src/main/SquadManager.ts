import { SQUAD_ORDER, SquadBehaviour } from "behaviour/SquadBehaviour"
import { Footman } from "game/Footman"
import { GamePlayer } from "game/GamePlayer"
import { Squad } from "game/Squad"
import { Task } from "global/Task"
import { TooltipService } from "service/TooltipService"
import { createTask } from "util/CommonUtil"

export class SquadManager {
  private readonly player: GamePlayer
  private readonly squadBehaviour: SquadBehaviour
  private readonly behaviourTask: Task = createTask(() => this.updateBehavior(), 3)
  private readonly footmanAbility: Task = createTask(() => this.onFootmanCast(), 5)

  private squads: Array<Squad> = []
  private defSquad: Squad
  private attackSquad: Squad

  constructor(player: GamePlayer) {
    this.player = player
    this.squadBehaviour = new SquadBehaviour(player)

    this.defSquad = new Squad(player, 6)
    this.attackSquad = new Squad(player, 3)
    this.defSquad.addOrder(SQUAD_ORDER.DEFEND_CASTLE)
    this.attackSquad.addOrder(SQUAD_ORDER.PREPARE_FOR_ATTACK)

    this.squads.push(this.defSquad)
    this.squads.push(this.attackSquad)
  }

  public init() {
    this.footmanAbility.reset()
  }

  public update(delta: number) {
    if (this.attackSquad.isAllDead()) {
      const index = this.squads.indexOf(this.attackSquad)
      this.squads.splice(index, 1)
      this.attackSquad = new Squad(this.player, 3)
      this.attackSquad.addOrder(SQUAD_ORDER.PREPARE_FOR_ATTACK)
      this.squads.push(this.attackSquad)
    }

    this.behaviourTask.update(delta)
    this.footmanAbility.update(delta)
  }

  public stats(): string {
    return TooltipService.footmanText(0, 0)
  }

  private updateBehavior() {
    this.squadBehaviour.updateState(this.squads)
  }

  private onFootmanCast() {
    const barracks = this.player.getBarracks()
    const point = barracks?.getPoint()

    if (!barracks || !point) return

    const freeSquad = this.squads.filter((it) => it.isSquadFree())
    freeSquad[0]?.addUnit(new Footman(point, this.player.allyId))
  }
}
