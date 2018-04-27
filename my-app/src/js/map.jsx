import React from 'react';
import { MapSimple } from './mapSimple.jsx';


class Map extends React.Component{
    render(){
        return(
            <section>
                <div className='container'>
                    <div className='mapDescription'>
                        <h1 className='imageTitle accentFontColor'>The memories map</h1>
                        <p className='imageText'>Gluten observares, tanquam noster detrius. Rusticus luras ducunt ad vita. Ecce, magnum armarium! Ubi est neuter fuga? Cum accentor congregabo, omnes frondatores vitare dexter, regius equisoes. Historias prarere, tanquam festus tus.</p>
                    </div>
                    <MapSimple/>
                </div>
            </section>
        )
    }
}




export { Map };