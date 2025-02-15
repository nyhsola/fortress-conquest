import { Footman } from "game/Footman"

export class FootmanBehaviour {
  public updateState(footman: Array<Footman>) {
    footman.forEach((it) => it.updateState())
  }
}
