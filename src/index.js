import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router'
import * as serviceWorker from './serviceWorker';
import store from './redux/store'
import {Provider} from 'react-redux'

ReactDOM.render(<Provider store={store}><Router /></Provider>, document.getElementById('root'));

serviceWorker.unregister();
