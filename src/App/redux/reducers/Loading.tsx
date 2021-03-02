import * as types from '../types';

export interface LoadingState {
  isLoading: boolean;
}

const INITIAL_STATE = {
  isLoading: true,
};

interface Action {
  type: string;
  payload?: any;
}

const Loading = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return {...state, isLoading: action.payload};
    default:
      return state;
  }
};

export default Loading;
