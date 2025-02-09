import { FOOTMAN_ORDER, FootmanBehaviour } from "behaviour/FootmanBehaviour"
import { Footman } from "game/Footman"
import { GamePlayer } from "game/GamePlayer"
import { Task } from "global/Task"
import { FOOTMAN_MODE, TooltipService } from "service/TooltipService"
import { createTask } from "util/CommonUtil"

export class FootmanManager {
  private readonly player: GamePlayer
  private readonly footmans: Array<Footman> = []
  private readonly behaviour: FootmanBehaviour
  private readonly behaviourTask: Task = createTask(() => this.updateBehavior(), 3)
  private readonly footmanAbility: Task = createTask(() => this.onFootmanCast(), 5)

  private currentMode = FOOTMAN_MODE.DEFENCE
  private footmanLimit = 6

  constructor(player: GamePlayer) {
    this.player = player
    this.behaviour = new FootmanBehaviour(this.player)
    this.behaviour.addOrder(FOOTMAN_ORDER.DEFEND, this.footmanLimit)
  }

  public init() {
    this.footmanAbility.reset()
  }

  public update(delta: number) {
    this.behaviourTask.update(delta)
    this.footmanAbility.update(delta)
  }

  public onWarModeSwitch() {
    this.currentMode === FOOTMAN_MODE.DEFENCE ? (this.currentMode = FOOTMAN_MODE.WAR) : (this.currentMode = FOOTMAN_MODE.DEFENCE)
    const newOrder = this.currentMode === FOOTMAN_MODE.DEFENCE ? FOOTMAN_ORDER.DEFEND : FOOTMAN_ORDER.WAR
    this.behaviour.addOrder(newOrder, this.footmanLimit)
  }

  public stats(): string {
    return TooltipService.footmanText(this.footmans.length, this.footmanLimit)
  }

  private updateBehavior() {
    this.behaviour.updateState(this.footmans)
  }

  private onFootmanCast() {
    const barracks = this.player.getBarracks()
    const point = barracks?.getPoint()
    const direction = this.player.getDirection()

    if (!barracks) return

    if (this.footmans.length >= this.footmanLimit || !point || !direction) return
    this.footmans.push(new Footman(point, this.player.allyId))
  }
}
