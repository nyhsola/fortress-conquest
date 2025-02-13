import { setAliance, setEnemies } from "./CommonUtil"
import { ALLY_SHIFT } from "global/Globals"

export class AllyUtil {
  static setEnemies() {
    for (let i = 0; i <= 4; i++) {
      const player = i
      const ally = i + ALLY_SHIFT
      for (let j = 0; j <= 4; j++) {
        const allyEnemy = j + ALLY_SHIFT
        if (player != j) {
          setEnemies(Player(player), Player(j))
          setEnemies(Player(ally), Player(j))

          setEnemies(Player(player), Player(allyEnemy))
          setEnemies(Player(ally), Player(allyEnemy))
        }
      }
    }
  }

  static setAllyInit() {
    setAliance(Player(0), Player(12))
    setAliance(Player(1), Player(13))
    setAliance(Player(2), Player(14))
    setAliance(Player(3), Player(15))
    setAliance(Player(4), Player(16))
  }
}
