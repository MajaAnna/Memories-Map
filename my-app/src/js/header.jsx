import React from 'react';
import {
    NavLink
} from 'react-router-dom';
import MediaQuery from 'react-responsive';

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
    constructor(props){
        super(props)

        this.state={
            showMenu:false,
            hamburgerShow:true,
            hideMenu:false
        }
    }

    showMenuFunc = () => {
        this.setState({
            showMenu:this.state.showMenu === true ? false : true,
            hamburgerShow: false,
            hideMenu: this.state.hideMenu === true ? false : true
        })
    }

    hideMenu = () => {
        console.log('hide')
        this.setState({
            showMenu:false,
            hideMenu:false,
            hamburgerShow:true
        })
    }

    render(){
        return(
            <nav>
                <MediaQuery query="(min-width: 420px)">
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
                </MediaQuery>


                <MediaQuery query="(max-width: 420px)">
                    {
                        this.state.hamburgerShow === true ?
                            <span className='icon-menu hamburgerIcon iconBig' onClick={this.showMenuFunc}></span>
                            : null
                    }
                    {
                        this.state.showMenu === true ?
                            <ul className='menu hamburger'>
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
                                {
                                    this.state.hideMenu === true ?
                                        <li key='hideMenu'>
                                            <span className='icon-cancel-circled iconBig' onClick={this.hideMenu}></span>
                                        </li>
                                        : null
                                }
                            </ul>
                            : null
                    }
                </MediaQuery>
            </nav>
        )
    }
}

export { Header };