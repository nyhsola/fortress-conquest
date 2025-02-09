export const ABILITY = {
  WORKERS: FourCC("A003"),
  FOOTMAN: FourCC("A008"),
  INCOME: FourCC("A002"),
  ABILITY_1: FourCC("A005"),
  ABILITY_2: FourCC("A004"),
  ABILITY_3: FourCC("A007"),
} as const

export const UNIT = {
  START_WORKER: FourCC("h000"),

  WORKER: FourCC("h002"),
  FOOTMAN: FourCC("h005"),
  ZOMBIE: FourCC("n001"),
  BOAR: FourCC("n002"),

  CASTLE: FourCC("h001"),
  STOCK: FourCC("h004"),
  TOWER: FourCC("h003"),
  BARRACKS: FourCC("h007"),
  MINE: FourCC("n000"),

  BANNER: FourCC("B001"),
} as const

export const TEXTURES = {
  WORKER: "ReplaceableTextures\\CommandButtons\\BTNPeasant.blp",
  FOOTMAN: "ReplaceableTextures\\CommandButtons\\BTNFootman.blp",
  GOLD_CHEST: "ReplaceableTextures\\CommandButtons\\BTNChestOfGold.blp",
  DEADLORD: "ReplaceableTextures\\CommandButtons\\BTNHeroDreadLord.blp",
}

export const TEXT = {
  TIMED_LIFE: FourCC("BTLF"),
} as const

export class Config {
  public readonly mode: Mode
  public readonly zones: Zones

  constructor(mode: Mode) {
    this.mode = mode
    this.zones = new Zones()
  }
}

export class Zones {
  zone = [gg_rct_start_1, gg_rct_start_2, gg_rct_start_3, gg_rct_start_4, gg_rct_start_5, gg_rct_start_6]
}

export enum Mode {
  DEFAULT,
  DEBUG,
}
