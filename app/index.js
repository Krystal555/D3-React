/**
 * Created by zaoyu on 2018/1/24.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './containers/home/index';

//ReactDOM.render(<App/>,document.getElementById('app'));
const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component/>
        </AppContainer>,
        document.getElementById('app')
    )
};
render(App);

/*if (module.hot) {
    module.hot.accept('./components/App', () => { render(App) });
}*/
// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./containers/home/index', () => {
        render(require('./containers/home/index').default)
    })
}