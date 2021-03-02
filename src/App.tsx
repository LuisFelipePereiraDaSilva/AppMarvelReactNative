import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './App/routes';
import Loading from './App/shared/components/Loading';

//Redux
import reducer from './App/redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {useSelector} from 'react-redux';
import {ApplicationState} from './App/redux';

//Setting Redux
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer);

const App = () => {
  const isLoading = useSelector(
    (state: ApplicationState) => state.Loading.isLoading,
  );

  return (
    <>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
      {isLoading && <Loading />}
    </>
  );
};

const ProvaiderCoponent = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default ProvaiderCoponent;
