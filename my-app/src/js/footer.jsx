import React from 'react';

class Footer extends React.Component{
    render(){
        return(
            <footer>
                <div className='flexContainer footerText'>
                    <div className='oneLine half copy'>Copywrite &copy;2018</div>
                    <div className='oneLine half'>
                        <a href='https://github.com/MajaAnna' className='half'><span className='icon-github iconBig'></span></a>
                        <a href='https://www.linkedin.com/in/maja-przyjazna/' className='half'><span className='icon-linkedin-squared iconBig'></span></a>
                    </div>
                </div>
            </footer>
        )
    }
}

export { Footer };