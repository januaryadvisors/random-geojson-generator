import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Provider as ReduxQueryProvider } from 'redux-query-react';
import store from './reducers/store';
import 'react-toastify/dist/ReactToastify.css';
import { Main } from './components/Main';
import ScrollToTop from './components/general/ScrollToTop';

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Switch>
          <Route exact={true} component={Main} />
        </Switch>
      </ScrollToTop>
    </BrowserRouter>
  );
};

const App = () => (
  <Provider store={store}>
    <ReduxQueryProvider queriesSelector={(state) => state.queries}>
      <Router />
    </ReduxQueryProvider>
  </Provider>
);

export default App;