import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import TemplateContainer from './components/TemplateContainer';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';

import configureStore from './store';
const Store = configureStore();

/* ReactDOM.render( 
			<Provider store={Store}>
				<div>
					<TemplateContainer />
				</div>
			</Provider>,
	document.getElementById('app')
);
*/

const renderApp = (Component) => {
  render(
    <AppContainer>
      <Provider store={Store}>
        <div>
          <Component />
          { /* <DevTools /> */ }
        </div>
      </Provider>
    </AppContainer>,
    document.querySelector('#app'),
  );
};

renderApp(TemplateContainer);

