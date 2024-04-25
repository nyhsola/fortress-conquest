export const ABILITY = {
  WORKERS: FourCC("A003"),
  FOOTMAN: FourCC("A008"),
  INCOME: FourCC("A002"),
  ABILITY_1: FourCC("A005"),
  ABILITY_2: FourCC("A004"),
  ABILITY_3: FourCC("A006"),
} as const

export const UNIT = {
  START_WORKER: FourCC("h000"),
  CASTLE: FourCC("h001"),
  WORKER: FourCC("h002"),
  FOOTMAN: FourCC("h005"),
  ZOMBIE: FourCC("n001"),
  STOCK: FourCC("h004"),
  TOWER: FourCC("h003"),
  MINE: FourCC("n000"),
  BANNER: FourCC("B001"),
} as const

export const TEXT = {
  TIMED_LIFE: FourCC("BTLF"),
} as const

export class Config {
  zone = [gg_rct_start_1, gg_rct_start_2, gg_rct_start_3, gg_rct_start_4, gg_rct_start_5, gg_rct_start_6]
}
