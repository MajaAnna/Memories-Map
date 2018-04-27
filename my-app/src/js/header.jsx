import React from 'react';
import {
    NavLink
} from 'react-router-dom';

class Header extends React.Component{
    render(){
        return(
            <header>
                <div className='container flexContainer'>
                    <div className='logo' key='logo'/>
                    <Navigation key='navigation'/>
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
                                 activeClassName="active"
                                 key='navLinkHome'>Home</NavLink>
                    </li>
                    <li key='map'>
                        <NavLink to='/map'
                                 className='navText'
                                 activeClassName="active"
                                 key='navLinkMap'>Mapa</NavLink>
                    </li>
                    <li key='aboutProject'>
                        <NavLink to='/aboutProject'
                                 className='navText'
                                 activeClassName="active"
                                 key='navLinkAboutProject'>O projekcie</NavLink>
                    </li>
                </ul>
            </nav>
        )
    }
}

export { Header };