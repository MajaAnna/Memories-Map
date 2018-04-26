import React from 'react';

class Footer extends React.Component{
    render(){
        return(
            <footer>
                <div className='container flexContainer'>
                    <div className='half'>left part</div>
                    <div className='half'>infos and links part</div>
                </div>
            </footer>
        )
    }
}

export { Footer };