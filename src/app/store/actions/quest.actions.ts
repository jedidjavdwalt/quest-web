import { Action } from "@ngrx/store";
import { Quest } from "src/app/models/quest";

export const REQUEST_IN_PROGRESS_QUEST_EXISTS = "[quest] REQUEST_IN_PROGRESS_QUEST_EXISTS";
export const REQUEST_GET_IN_PROGRESS_QUEST = "[quest] REQUEST_GET_IN_PROGRESS_QUEST";
export const REQUEST_MODERATING_QUEST_EXISTS = "[quest] REQUEST_MODERATING_QUEST_EXISTS";
export const REQUEST_GET_MODERATING_QUEST = "[quest] REQUEST_GET_MODERATING_QUEST";
export const GET_QUEST_SUCCESS = "[quest] GET_QUEST_SUCCESS";
export const NO_CURRENT_QUEST = "[quest] NO_CURRENT_QUEST";
export const REQUEST_GET_PLANET_QUESTS = "[quest] REQUEST_GET_PLANET_QUESTS";
export const GET_PLANET_QUESTS_SUCCESS = "[quest] GET_PLANET_QUESTS_SUCCESS";
export const REQUEST_EXPLORER_QUESTS_EXIST = "[quest] REQUEST_INTERACTED_QUEST_EXISTS";
export const REQUEST_GET_EXPLORER_QUESTS = "[quest] REQUEST_GET_INTERACTED_QUESTS";
export const GET_EXPLORER_QUESTS_SUCCESS = "[quest] GET_EXPLORER_QUESTS_SUCCESS";
export const NO_EXPLORER_QUESTS = "[quest] NO_EXPLORER_QUESTS";
export const REQUEST_GET_SELECTED_QUEST = "[quest] REQUEST_GET_SELECTED_QUEST";
export const GET_SELECTED_QUEST_SUCCESS = "[quest] GET_SELECTED_QUEST_SUCCESS";
export const CLEAR_QUEST_STATE = "[logout] CLEAR_QUEST_STATE";

export class RequestInProgressQuestExists implements Action {
    type = REQUEST_IN_PROGRESS_QUEST_EXISTS;
    constructor(public planetNamePayload: string, public userIdPayload: string) {}
}

export class RequestGetInProgressQuest implements Action {
    type = REQUEST_GET_IN_PROGRESS_QUEST;
    constructor() {}
}

export class RequestModeratingQuestExists implements Action {
    type = REQUEST_GET_MODERATING_QUEST;
    constructor() {}
}

export class RequestGetModeratingQuest implements Action {
    type = REQUEST_GET_MODERATING_QUEST;
    constructor() {}
}

export class GetQuestSuccess implements Action {
    type = GET_QUEST_SUCCESS;
    constructor(public payload: Quest)  {}
}

export class NoCurrentQuest implements Action {
    type = NO_CURRENT_QUEST;
    constructor() {}
}

export class RequestGetPlanetQuests implements Action {
    type = REQUEST_GET_PLANET_QUESTS;
    constructor(public payload: string) {}
}

export class GetPlanetQuestsSuccess implements Action {
    type = GET_PLANET_QUESTS_SUCCESS;
    constructor(public payload: Quest) {}
}

export class RequestExplorerQuestsExist implements Action {
    type = REQUEST_EXPLORER_QUESTS_EXIST;
    constructor(public planetNamePayload: string, public userIdPayload: string) {}
}

export class RequestGetExplorerQuests implements Action {
    type = REQUEST_GET_EXPLORER_QUESTS;
    constructor(public planetNamePayload: string, public userIdPayload: string) {}
}

export class GetExplorerQuestsSuccess implements Action {
    type = GET_EXPLORER_QUESTS_SUCCESS;
    constructor(public payload: Quest) {}
}

export class NoExplorerQuest implements Action {
    type = NO_EXPLORER_QUESTS;
    constructor() {}
}

export class RequestGetSelectedQuest implements Action {
    type = REQUEST_GET_SELECTED_QUEST;
    constructor(public planetNamePayload: string, public questIdPayload: string) {}
}

export class GetSelectedQuestSuccess implements Action {
    type = GET_SELECTED_QUEST_SUCCESS;
    constructor(public payload: Quest) {}
}

export class ClearQuestState implements Action {
    type = CLEAR_QUEST_STATE;
    constructor() {}
}

export type QuestActions = 
    | RequestInProgressQuestExists
    | RequestGetInProgressQuest
    | RequestModeratingQuestExists
    | RequestGetModeratingQuest
    | GetQuestSuccess
    | NoCurrentQuest
    | RequestGetPlanetQuests
    | GetPlanetQuestsSuccess
    | RequestExplorerQuestsExist
    | RequestGetExplorerQuests
    | GetExplorerQuestsSuccess
    | NoExplorerQuest
    | RequestGetSelectedQuest
    | GetSelectedQuestSuccess
    | ClearQuestState