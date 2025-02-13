import { LOCAL_COLOR, withColor } from "util/TextUtil"

const workerTemplate = (workerCount: number, workerLimit: number): string => "Workers (" + workerCount + "/" + workerLimit + ")"
const workerTemplateExtended = (): string => withColor("Trains every 5 sec", LOCAL_COLOR.GREY)

const footmanTemplate = (count: number, limit: number): string => "Footman (" + count + "/" + limit + ") "
const footmanTemplateExtended = (): string => withColor("Trains every 5 sec", LOCAL_COLOR.GREY)

const enemiesTemplate = (enemies: number): string => "Enemies (" + enemies + ")"
const enemiesTemplateExtended = (): string => withColor("Nearby enemies", LOCAL_COLOR.GREY)

export class TooltipService {
  static readonly footmanAbilityText = "Footman|n"
  static readonly footmanAbilityExtendedText = withColor("By default, you have one defense squad consisting of six footmen", LOCAL_COLOR.GREY)

  static readonly incomeAbilityText = "Income|n"
  static readonly incomeAbilityExtendedText = withColor("Every 10 sec, your allies' gold is transferred to you", LOCAL_COLOR.GREY)

  static workerText(workersCount: number | undefined, workersLimit: number | undefined): string {
    const template = workerTemplate(workersCount ?? 0, workersLimit ?? 0)
    const extended = workerTemplateExtended()
    return template + "|n" + extended
  }

  static footmanText(footmanCount: number | undefined, footmanLimit: number | undefined): string {
    const template = footmanTemplate(footmanCount ?? 0, footmanLimit ?? 0)
    const extended = footmanTemplateExtended()
    return template + "|n" + extended
  }

  static enemiesText(enemies: number | undefined): string {
    const text = enemiesTemplate(enemies ?? 0)
    const extended = enemiesTemplateExtended()
    return text + "|n" + extended
  }
}
