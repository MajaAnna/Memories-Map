import React from 'react';

//components' import
import { NotFound } from './notFound.jsx';
import { Map } from './map.jsx';
import { Home } from './home.jsx';
import { AboutProject } from './aboutProject.jsx';

import {
    Route,
    Switch
} from 'react-router-dom';

class MainContent extends React.Component{
    render(){
        return(
            <main>
                <Switch>
                    <Route key='routeHome' exact path='/' component={Home}/>
                    <Route key='routeMap' path='/map' component={Map}/>
                    <Route key='routeAboutProject' path='/aboutProject' component={AboutProject}/>
                    <Route key='routeNotFound' component={NotFound}/>
                </Switch>
            </main>
        )
    }
}

export { MainContent };