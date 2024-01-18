gg_rct_Playable_area = nil
gg_rct_start_1 = nil
gg_rct_start_2 = nil
gg_rct_start_3 = nil
gg_rct_start_4 = nil
gg_rct_start_5 = nil
gg_rct_start_6 = nil
gg_rct_LeftBottom = nil
gg_rct_LeftTop = nil
gg_rct_RightTop = nil
gg_rct_RightBottom = nil
gg_dest_LTbr_0412 = nil
function InitGlobals()
end

function CreateRegions()
local we

gg_rct_Playable_area = Rect(-6816.0, -7264.0, 6784.0, 6784.0)
gg_rct_start_1 = Rect(-256.0, -576.0, -128.0, -448.0)
gg_rct_start_2 = Rect(-384.0, -320.0, -256.0, -192.0)
gg_rct_start_3 = Rect(-256.0, -64.0, -128.0, 64.0)
gg_rct_start_4 = Rect(32.0, -64.0, 160.0, 64.0)
gg_rct_start_5 = Rect(128.0, -320.0, 256.0, -192.0)
gg_rct_start_6 = Rect(32.0, -576.0, 160.0, -448.0)
gg_rct_LeftBottom = Rect(-6720.0, -7232.0, -160.0, -384.0)
gg_rct_LeftTop = Rect(-6720.0, -160.0, -160.0, 6688.0)
gg_rct_RightTop = Rect(96.0, -160.0, 6656.0, 6688.0)
gg_rct_RightBottom = Rect(96.0, -7232.0, 6656.0, -384.0)
end

function InitCustomPlayerSlots()
SetPlayerStartLocation(Player(0), 0)
ForcePlayerStartLocation(Player(0), 0)
SetPlayerColor(Player(0), ConvertPlayerColor(0))
SetPlayerRacePreference(Player(0), RACE_PREF_HUMAN)
SetPlayerRaceSelectable(Player(0), true)
SetPlayerController(Player(0), MAP_CONTROL_USER)
SetPlayerStartLocation(Player(1), 1)
ForcePlayerStartLocation(Player(1), 1)
SetPlayerColor(Player(1), ConvertPlayerColor(1))
SetPlayerRacePreference(Player(1), RACE_PREF_HUMAN)
SetPlayerRaceSelectable(Player(1), true)
SetPlayerController(Player(1), MAP_CONTROL_USER)
SetPlayerStartLocation(Player(2), 2)
ForcePlayerStartLocation(Player(2), 2)
SetPlayerColor(Player(2), ConvertPlayerColor(2))
SetPlayerRacePreference(Player(2), RACE_PREF_HUMAN)
SetPlayerRaceSelectable(Player(2), true)
SetPlayerController(Player(2), MAP_CONTROL_USER)
SetPlayerStartLocation(Player(3), 3)
ForcePlayerStartLocation(Player(3), 3)
SetPlayerColor(Player(3), ConvertPlayerColor(3))
SetPlayerRacePreference(Player(3), RACE_PREF_HUMAN)
SetPlayerRaceSelectable(Player(3), true)
SetPlayerController(Player(3), MAP_CONTROL_USER)
SetPlayerStartLocation(Player(4), 4)
ForcePlayerStartLocation(Player(4), 4)
SetPlayerColor(Player(4), ConvertPlayerColor(4))
SetPlayerRacePreference(Player(4), RACE_PREF_HUMAN)
SetPlayerRaceSelectable(Player(4), true)
SetPlayerController(Player(4), MAP_CONTROL_USER)
SetPlayerStartLocation(Player(12), 5)
ForcePlayerStartLocation(Player(12), 5)
SetPlayerColor(Player(12), ConvertPlayerColor(12))
SetPlayerRacePreference(Player(12), RACE_PREF_NIGHTELF)
SetPlayerRaceSelectable(Player(12), true)
SetPlayerController(Player(12), MAP_CONTROL_COMPUTER)
SetPlayerStartLocation(Player(13), 6)
ForcePlayerStartLocation(Player(13), 6)
SetPlayerColor(Player(13), ConvertPlayerColor(13))
SetPlayerRacePreference(Player(13), RACE_PREF_NIGHTELF)
SetPlayerRaceSelectable(Player(13), true)
SetPlayerController(Player(13), MAP_CONTROL_COMPUTER)
SetPlayerStartLocation(Player(14), 7)
ForcePlayerStartLocation(Player(14), 7)
SetPlayerColor(Player(14), ConvertPlayerColor(14))
SetPlayerRacePreference(Player(14), RACE_PREF_NIGHTELF)
SetPlayerRaceSelectable(Player(14), true)
SetPlayerController(Player(14), MAP_CONTROL_COMPUTER)
SetPlayerStartLocation(Player(15), 8)
ForcePlayerStartLocation(Player(15), 8)
SetPlayerColor(Player(15), ConvertPlayerColor(15))
SetPlayerRacePreference(Player(15), RACE_PREF_NIGHTELF)
SetPlayerRaceSelectable(Player(15), true)
SetPlayerController(Player(15), MAP_CONTROL_COMPUTER)
SetPlayerStartLocation(Player(16), 9)
ForcePlayerStartLocation(Player(16), 9)
SetPlayerColor(Player(16), ConvertPlayerColor(16))
SetPlayerRacePreference(Player(16), RACE_PREF_NIGHTELF)
SetPlayerRaceSelectable(Player(16), true)
SetPlayerController(Player(16), MAP_CONTROL_COMPUTER)
SetPlayerStartLocation(Player(23), 10)
ForcePlayerStartLocation(Player(23), 10)
SetPlayerColor(Player(23), ConvertPlayerColor(23))
SetPlayerRacePreference(Player(23), RACE_PREF_UNDEAD)
SetPlayerRaceSelectable(Player(23), true)
SetPlayerController(Player(23), MAP_CONTROL_COMPUTER)
end

function InitCustomTeams()
SetPlayerTeam(Player(0), 0)
SetPlayerTeam(Player(12), 0)
SetPlayerAllianceStateAllyBJ(Player(0), Player(12), true)
SetPlayerAllianceStateAllyBJ(Player(12), Player(0), true)
SetPlayerAllianceStateVisionBJ(Player(0), Player(12), true)
SetPlayerAllianceStateVisionBJ(Player(12), Player(0), true)
SetPlayerTeam(Player(1), 1)
SetPlayerTeam(Player(13), 1)
SetPlayerAllianceStateAllyBJ(Player(1), Player(13), true)
SetPlayerAllianceStateAllyBJ(Player(13), Player(1), true)
SetPlayerAllianceStateVisionBJ(Player(1), Player(13), true)
SetPlayerAllianceStateVisionBJ(Player(13), Player(1), true)
SetPlayerTeam(Player(2), 2)
SetPlayerTeam(Player(14), 2)
SetPlayerAllianceStateAllyBJ(Player(2), Player(14), true)
SetPlayerAllianceStateAllyBJ(Player(14), Player(2), true)
SetPlayerAllianceStateVisionBJ(Player(2), Player(14), true)
SetPlayerAllianceStateVisionBJ(Player(14), Player(2), true)
SetPlayerTeam(Player(3), 3)
SetPlayerTeam(Player(15), 3)
SetPlayerAllianceStateAllyBJ(Player(3), Player(15), true)
SetPlayerAllianceStateAllyBJ(Player(15), Player(3), true)
SetPlayerAllianceStateVisionBJ(Player(3), Player(15), true)
SetPlayerAllianceStateVisionBJ(Player(15), Player(3), true)
SetPlayerTeam(Player(4), 4)
SetPlayerTeam(Player(16), 4)
SetPlayerAllianceStateAllyBJ(Player(4), Player(16), true)
SetPlayerAllianceStateAllyBJ(Player(16), Player(4), true)
SetPlayerAllianceStateVisionBJ(Player(4), Player(16), true)
SetPlayerAllianceStateVisionBJ(Player(16), Player(4), true)
SetPlayerTeam(Player(23), 5)
end

function InitAllyPriorities()
SetStartLocPrioCount(0, 1)
SetStartLocPrio(0, 0, 1, MAP_LOC_PRIO_HIGH)
SetStartLocPrioCount(1, 2)
SetStartLocPrio(1, 0, 0, MAP_LOC_PRIO_HIGH)
SetStartLocPrio(1, 1, 2, MAP_LOC_PRIO_HIGH)
SetStartLocPrioCount(2, 2)
SetStartLocPrio(2, 0, 1, MAP_LOC_PRIO_HIGH)
SetStartLocPrio(2, 1, 3, MAP_LOC_PRIO_HIGH)
SetStartLocPrioCount(3, 2)
SetStartLocPrio(3, 0, 2, MAP_LOC_PRIO_HIGH)
SetStartLocPrio(3, 1, 4, MAP_LOC_PRIO_HIGH)
SetStartLocPrioCount(4, 1)
SetStartLocPrio(4, 0, 3, MAP_LOC_PRIO_HIGH)
SetStartLocPrioCount(5, 9)
SetStartLocPrio(5, 0, 0, MAP_LOC_PRIO_LOW)
SetStartLocPrio(5, 1, 1, MAP_LOC_PRIO_LOW)
SetStartLocPrio(5, 2, 2, MAP_LOC_PRIO_LOW)
SetStartLocPrio(5, 3, 4, MAP_LOC_PRIO_LOW)
SetStartLocPrio(5, 4, 6, MAP_LOC_PRIO_LOW)
SetStartLocPrio(5, 5, 7, MAP_LOC_PRIO_LOW)
SetStartLocPrio(5, 6, 9, MAP_LOC_PRIO_LOW)
SetStartLocPrio(5, 7, 10, MAP_LOC_PRIO_LOW)
SetEnemyStartLocPrioCount(5, 2)
SetEnemyStartLocPrio(5, 0, 0, MAP_LOC_PRIO_HIGH)
SetEnemyStartLocPrio(5, 1, 9, MAP_LOC_PRIO_LOW)
SetStartLocPrioCount(6, 1)
SetStartLocPrio(6, 0, 10, MAP_LOC_PRIO_LOW)
SetEnemyStartLocPrioCount(6, 2)
SetEnemyStartLocPrio(6, 0, 1, MAP_LOC_PRIO_LOW)
SetEnemyStartLocPrio(6, 1, 10, MAP_LOC_PRIO_LOW)
SetStartLocPrioCount(7, 1)
SetStartLocPrio(7, 0, 10, MAP_LOC_PRIO_LOW)
SetEnemyStartLocPrioCount(7, 5)
SetEnemyStartLocPrio(7, 0, 0, MAP_LOC_PRIO_LOW)
SetEnemyStartLocPrio(7, 1, 1, MAP_LOC_PRIO_LOW)
SetEnemyStartLocPrio(7, 2, 3, MAP_LOC_PRIO_LOW)
SetEnemyStartLocPrio(7, 3, 4, MAP_LOC_PRIO_LOW)
SetEnemyStartLocPrio(7, 4, 10, MAP_LOC_PRIO_LOW)
SetStartLocPrioCount(8, 6)
SetStartLocPrio(8, 0, 2, MAP_LOC_PRIO_LOW)
SetStartLocPrio(8, 1, 3, MAP_LOC_PRIO_HIGH)
SetStartLocPrio(8, 2, 4, MAP_LOC_PRIO_LOW)
SetStartLocPrio(8, 3, 7, MAP_LOC_PRIO_LOW)
SetStartLocPrio(8, 4, 9, MAP_LOC_PRIO_LOW)
SetStartLocPrio(8, 5, 10, MAP_LOC_PRIO_LOW)
SetEnemyStartLocPrioCount(8, 7)
SetEnemyStartLocPrio(8, 0, 1, MAP_LOC_PRIO_LOW)
SetEnemyStartLocPrio(8, 1, 2, MAP_LOC_PRIO_HIGH)
SetEnemyStartLocPrio(8, 2, 3, MAP_LOC_PRIO_LOW)
SetEnemyStartLocPrio(8, 3, 4, MAP_LOC_PRIO_LOW)
SetEnemyStartLocPrio(8, 4, 7, MAP_LOC_PRIO_LOW)
SetEnemyStartLocPrio(8, 5, 9, MAP_LOC_PRIO_LOW)
SetEnemyStartLocPrio(8, 6, 10, MAP_LOC_PRIO_LOW)
SetStartLocPrioCount(9, 7)
SetStartLocPrio(9, 0, 1, MAP_LOC_PRIO_HIGH)
SetStartLocPrio(9, 1, 2, MAP_LOC_PRIO_LOW)
SetStartLocPrio(9, 2, 3, MAP_LOC_PRIO_LOW)
SetStartLocPrio(9, 3, 4, MAP_LOC_PRIO_LOW)
SetStartLocPrio(9, 4, 5, MAP_LOC_PRIO_HIGH)
SetStartLocPrio(9, 5, 7, MAP_LOC_PRIO_HIGH)
SetEnemyStartLocPrioCount(9, 7)
SetEnemyStartLocPrio(9, 0, 2, MAP_LOC_PRIO_LOW)
SetEnemyStartLocPrio(9, 1, 3, MAP_LOC_PRIO_LOW)
SetEnemyStartLocPrio(9, 2, 4, MAP_LOC_PRIO_LOW)
SetEnemyStartLocPrio(9, 3, 5, MAP_LOC_PRIO_HIGH)
SetEnemyStartLocPrio(9, 4, 7, MAP_LOC_PRIO_HIGH)
SetEnemyStartLocPrio(9, 5, 10, MAP_LOC_PRIO_HIGH)
SetStartLocPrioCount(10, 5)
SetStartLocPrio(10, 0, 1, MAP_LOC_PRIO_HIGH)
SetStartLocPrio(10, 1, 4, MAP_LOC_PRIO_LOW)
SetStartLocPrio(10, 2, 7, MAP_LOC_PRIO_LOW)
SetStartLocPrio(10, 3, 8, MAP_LOC_PRIO_LOW)
SetStartLocPrio(10, 4, 9, MAP_LOC_PRIO_LOW)
SetEnemyStartLocPrioCount(10, 9)
SetEnemyStartLocPrio(10, 0, 0, MAP_LOC_PRIO_HIGH)
SetEnemyStartLocPrio(10, 1, 1, MAP_LOC_PRIO_LOW)
SetEnemyStartLocPrio(10, 2, 2, MAP_LOC_PRIO_LOW)
SetEnemyStartLocPrio(10, 3, 3, MAP_LOC_PRIO_HIGH)
SetEnemyStartLocPrio(10, 4, 4, MAP_LOC_PRIO_HIGH)
SetEnemyStartLocPrio(10, 5, 5, MAP_LOC_PRIO_LOW)
SetEnemyStartLocPrio(10, 6, 7, MAP_LOC_PRIO_LOW)
SetEnemyStartLocPrio(10, 7, 8, MAP_LOC_PRIO_LOW)
SetEnemyStartLocPrio(10, 8, 9, MAP_LOC_PRIO_LOW)
end

function main()
SetCameraBounds(-7424.0 + GetCameraMargin(CAMERA_MARGIN_LEFT), -7680.0 + GetCameraMargin(CAMERA_MARGIN_BOTTOM), 7424.0 - GetCameraMargin(CAMERA_MARGIN_RIGHT), 7168.0 - GetCameraMargin(CAMERA_MARGIN_TOP), -7424.0 + GetCameraMargin(CAMERA_MARGIN_LEFT), 7168.0 - GetCameraMargin(CAMERA_MARGIN_TOP), 7424.0 - GetCameraMargin(CAMERA_MARGIN_RIGHT), -7680.0 + GetCameraMargin(CAMERA_MARGIN_BOTTOM))
SetDayNightModels("Environment\\DNC\\DNCLordaeron\\DNCLordaeronTerrain\\DNCLordaeronTerrain.mdl", "Environment\\DNC\\DNCLordaeron\\DNCLordaeronUnit\\DNCLordaeronUnit.mdl")
NewSoundEnvironment("Default")
SetAmbientDaySound("LordaeronFallDay")
SetAmbientNightSound("LordaeronFallNight")
SetMapMusic("Music", true, 0)
CreateRegions()
InitBlizzard()
InitGlobals()
end

function config()
SetMapName("TRIGSTR_009")
SetMapDescription("TRIGSTR_011")
SetPlayers(11)
SetTeams(11)
SetGamePlacement(MAP_PLACEMENT_TEAMS_TOGETHER)
DefineStartLocation(0, -7424.0, -7232.0)
DefineStartLocation(1, -7424.0, -6784.0)
DefineStartLocation(2, -7424.0, -6336.0)
DefineStartLocation(3, -7424.0, -5888.0)
DefineStartLocation(4, -7424.0, -5440.0)
DefineStartLocation(5, -6976.0, -7232.0)
DefineStartLocation(6, -6976.0, -6784.0)
DefineStartLocation(7, -6976.0, -6336.0)
DefineStartLocation(8, -6976.0, -5888.0)
DefineStartLocation(9, -6976.0, -5440.0)
DefineStartLocation(10, -6464.0, -7232.0)
InitCustomPlayerSlots()
InitCustomTeams()
InitAllyPriorities()
end

