import { FootmanBehaviour } from "./FootmanBehaviour"
import { Squad } from "game/Squad"

export class SquadBehaviour {
  private readonly footmanBehaviour: FootmanBehaviour

  constructor() {
    this.footmanBehaviour = new FootmanBehaviour()
  }

  public updateState(squads: Array<Squad>) {
    squads.forEach((it) => this.proceedSquad(it))
  }

  private proceedSquad(squad: Squad) {
    squad.updateState()
    this.footmanBehaviour.updateState(squad.getFootmans())
  }
}
