import React from 'react';
import {
    HashRouter
} from 'react-router-dom';

import '../scss/main.css';
import { Header } from './header.jsx';
import { Footer } from './footer.jsx';
import { MainContent } from './mainContent.jsx';




class App extends React.Component{
    render(){
        return(
            <div>
                <HashRouter>
                    <div className='mainContainer'>
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