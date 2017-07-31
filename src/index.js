// let's go!
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import './css/style.css';
import StorePicker from './components/StorePicker';
import App from './components/App';
import NotFound from './components/NotFound';

const route = `/${ window.location.pathname.split('/')[1] }`

const Root = () => {
    return (
        <BrowserRouter baseName={ route } >
            <div>
                <Match exactly pattern="/" component={StorePicker}/>
                <Match exactly pattern="/store/:storeId" component={App}/>
                <Miss component={NotFound} />
            </div>
        </BrowserRouter>
    )
}

render(<Root/>, document.querySelector('#main'));