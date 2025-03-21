export enum LOCAL_COLOR {
  RED,
  GREEN,
  GREY,
}

export function withColor(text: string, localColor: LOCAL_COLOR): string {
  switch (localColor) {
    case LOCAL_COLOR.RED:
      return "|c00FF0000" + text + "|r"
    case LOCAL_COLOR.GREEN:
      return "|c0096FF96" + text + "|r"
    case LOCAL_COLOR.GREY:
      return "|c00BEBEBE" + text + "|r"
  }
}
