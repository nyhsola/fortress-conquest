export const ABILITY = {
  WORKERS: FourCC("A003"),
  WORKERS_NEW: FourCC("A005"),
} as const

export const UNIT = {
  START_WORKER: FourCC("h000"),
  CASTLE: FourCC("h001"),
  WORKER: FourCC("h002"),
  STOCK: FourCC("h004"),
  MINE: FourCC("n000"),
} as const

export const TEXT = {
  TIMED_LIFE: FourCC("BTLF"),
} as const

export class Config {
  zone = [gg_rct_start_1, gg_rct_start_2, gg_rct_start_3, gg_rct_start_4, gg_rct_start_5, gg_rct_start_6]
}
