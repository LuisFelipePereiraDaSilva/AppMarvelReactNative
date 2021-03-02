import {combineReducers} from 'redux';

import Loading, {LoadingState} from './reducers/Loading';

export default combineReducers({
  Loading,
});

export interface ApplicationState {
  Loading: LoadingState;
}
