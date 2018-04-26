import React from 'react';
import {
    NavLink
} from 'react-router-dom';

class Header extends React.Component{
    render(){
        return(
            <header>
                <div className='container flexContainer'>
                    <div className='logo'/>
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
                    <li><NavLink exact to='/' className='navText' activeClassName="active">Home</NavLink></li>
                    <li><NavLink to='/map' className='navText' activeClassName="active">Mapa</NavLink></li>
                    <li><NavLink to='/aboutProject' className='navText' activeClassName="active">O projekcie</NavLink></li>
                </ul>
            </nav>
        )
    }
}

export { Header };