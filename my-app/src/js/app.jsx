import React from 'react';
import {
    HashRouter
    // ,Route,
    // Link,
    // Switch,
    // NavLink
} from 'react-router-dom';

import '../scss/main.css';

// import { RenderApi } from './renderApi.jsx';
import { Header } from './header.jsx';
import { Footer } from './footer.jsx';
import { MainContent } from './mainContent.jsx';




class App extends React.Component{
    render(){
        return(
            <div className='mainContainer' key='divApp'>
                <HashRouter key='hashRouter'>
                    <div>
                        <Header/>
                        <MainContent/>
                        <Footer/>
                    </div>
                </HashRouter>
            </div>
        )
    }
}

export default App;