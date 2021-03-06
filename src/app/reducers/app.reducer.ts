import { Action, createReducer, on } from '@ngrx/store';
import * as AppActions from '../actions/app.action';
import { Roster } from '../models/roster';
import { Stat } from '../models/stat';

export const appFeatureKey = 'app';

export interface State {
    rosters: Roster[],
    currentTeam: string,
    teamStats: Stat[],
    playerStats: Stat[],
    player: Roster
}

export const initialState: State = {
    rosters: [],
    currentTeam: "",
    teamStats: [],
    playerStats: [],
    player: new Roster()
};

const appReducer = createReducer(
  initialState,

  on(AppActions.updateCurrentTeam, (state: State, { team }) => { 
    localStorage.setItem('team', team);
    return ({
      ...state,
      currentTeam: team
    }
  )}),

  on(AppActions.rostersLoadedSuccess, (state: State, { rosters }) => (
    {
      ...state
      , rosters: rosters
    })
  ),

  on(AppActions.currentTeamStatsSuccess, (state: State, { stats }) => (
    {
      ...state
      , teamStats: stats
    })
  ),

  on(AppActions.playerLoadedSuccess, (state: State, { roster }) => (
    {
      ...state
      , player: roster
    })
  ),

  on(AppActions.playerStatsLoadedSuccess, (state: State, { stats }) => (
    {
      ...state
      , playerStats: stats
    })
  ),

);

export function reducer(state: State | undefined, action: Action) {
  return appReducer(state, action);
}