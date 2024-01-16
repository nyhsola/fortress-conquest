export const ABILITY = {
  WORKERS: FourCC("A003"),
}

export const UNIT = {
  START_WORKER: FourCC("h000"),
  CASTLE: FourCC("h001"),
  WORKER: FourCC("h002"),
  MINE: FourCC("n000"),
}

export const TEXT = {
  TIMED_LIFE: FourCC("BTLF"),
}

export class Config {
  zone = [gg_rct_start_1, gg_rct_start_2, gg_rct_start_3, gg_rct_start_4, gg_rct_start_5, gg_rct_start_6]
}
