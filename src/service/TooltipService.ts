import { FOOTMAN_SPAWN_TIME } from "main/SquadManager"
import { LOCAL_COLOR, withColor } from "util/TextUtil"

export class TooltipService {
  static readonly footmanAbilityText = "Footmen|n"
  static readonly footmanAbilityExtendedText =
    withColor("By default, you have 1 defense squad consisting of 6 footmen, which are replenished as a priority as new ones are trained.|n|n", LOCAL_COLOR.GREY) +
    withColor("Attack squads consist of 3 footmen.|n|n", LOCAL_COLOR.GREY) +
    "Footman trains every " +
    FOOTMAN_SPAWN_TIME +
    " sec"

  static readonly incomeAbilityText = "Income|n"
  static readonly incomeAbilityExtendedText = withColor("Every 10 sec, your allies' gold is transferred to you", LOCAL_COLOR.GREY)

  static readonly workerAbilityText = "Workers|n"
  static readonly workerAbilityExtendedText = withColor("By default, you have 1 worker squad consisting of 3 workers.|n|n", LOCAL_COLOR.GREY) + "Trains every 5 sec"
}
