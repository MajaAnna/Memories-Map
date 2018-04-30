import React from 'react';
import {
    NavLink
} from 'react-router-dom';

class Header extends React.Component{
    render(){
        return(
            <header>
                <div className='container flexContainer'>
                    <Navigation/>
                </div>
            </header>
        )
    }
}

class Navigation extends React.Component{
    render(){
        return(
            <nav>
                <ul className='menu'>
                    <li key='home'>
                        <NavLink exact to='/'
                                 className='navText'
                                 activeClassName="active">Home</NavLink>
                    </li>
                    <li key='map'>
                        <NavLink to='/map'
                                 className='navText'
                                 activeClassName="active">Mapa</NavLink>
                    </li>
                    <li key='aboutProject'>
                        <NavLink to='/aboutProject'
                                 className='navText'
                                 activeClassName="active">O projekcie</NavLink>
                    </li>
                </ul>
                <span className='icon-menu hamburger iconBig' onClick={this.showMenu}></span>
            </nav>
        )
    }
}

export { Header };