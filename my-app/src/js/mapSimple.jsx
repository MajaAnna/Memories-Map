import React from 'react';
import ReactTooltip from "react-tooltip";
import Mapka from "../static/world-50m.json";
import { Form } from './form.jsx';
import { Notes } from './notes.jsx';

import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
} from "react-simple-maps"

const wrapperStyles = {
    width: "100%",
    // height:'100%'
    maxWidth: 980
    // margin: "0 auto"
}

class MapSimple extends React.Component {
    constructor(props){
        super(props)

        //tutaj wyświetlamy nasze dane, zapisane w LS
        let localStorageNotes = JSON.parse( localStorage.getItem('notes') );

        this.state = {
            selected: [],
            tooltipText: '',
            data:false, //for fetch
            showInfo:false, //for information
            newStateFromForm: localStorageNotes === null ? [] : localStorageNotes //if the LS is empty, show empty array (nothing), if there is sth, show it
        }
    }

    //for tooltip
    componentDidMount() {
        setTimeout(() => {
            ReactTooltip.rebuild()
        }, 100)
    }

    //loading data from api when country clicked
    handleClick = (geography) => {

        fetch(`https://restcountries.eu/rest/v2/alpha/${geography.id}`).then( response =>{
            return response.json()
        }).then(data =>{
            // console.log(data);
            this.setState({
                data
            })
        }).catch(err => {
            console.log(err)
        })
    }

    //shows information about the countries
    showInfo = () => {
        this.setState({
            showInfo:true
        })
    }

    //adds new note using values from form
    addNewNote = (formData) =>{

        //parsing data from string into JS object
        //The getItem() method of the Storage interface, when passed a key name, will return that key's value.
        //var aValue = storage.getItem(keyName);
        let localStorageNotes = JSON.parse( localStorage.getItem('notes') );

        //jeśli LS jest równe null, czyli jest puste (null to obiekt)
        //to wrzucamy obiekt formData, przekazany w parametrze funkcji
        //na poziomie komponentu Form, czyli this.state z form - czyli wpisane value w inputy

        //if the LS is empty, then it's first object is the one from function's parameter
        //else we push object from the parameter to the array of previously added objects
        if( localStorageNotes === null ){
            localStorageNotes = [formData]
        } else {

            //pushujemy obiekt formData do tablicy
            localStorageNotes.push( formData )
        }

        //a teraz chcemy wyświetlać nasz obiekt z LS

        //JSON.stringify() method converts a JavaScript value to a JSON string
        //The setItem() method of the Storage interface, when passed a key name and value, will add that key to the storage, or update that key's value if it already exists
        //storage.setItem(keyName, keyValue);
        localStorage.setItem('notes', JSON.stringify( localStorageNotes ) );

        this.setState({
            //destructuring, since it is an ARRAY of OBJECTS
            newStateFromForm: [...this.state.newStateFromForm, formData]
        })

    }

    deleteNote = (id) => {
        let newArray = this.state.newStateFromForm.filter((element, index)=>{
            //ma nam zwrócić tablicę, w której nie ma danego id
            return id !== index
        })

        this.setState({
            newStateFromForm: newArray
        })

        //to nam wyświetla nasz obiekt
        localStorage.setItem('notes', JSON.stringify( newArray ) );
    }

    editNote = (changedObject, index, key) => {

        console.log( changedObject, index, key)


        //rozbijamy tablicę na obiekty
        let tempArray = [...this.state.newStateFromForm]
        tempArray[ index ][ key ] = changedObject


        this.setState({
            newStateFromForm: tempArray
        })

        //tu wyświetlamy
        localStorage.setItem('notes', JSON.stringify( tempArray ) );
    }

    render() {

        //INFORMATION ABOUT THE COUNTRY
        let res;

        //at the beginning
        if(this.state.data === false){
            res = null

        //when country is clicked
        } else {
            res =
                <div className='info'>
                    <div className='inforHeader'>
                        <img className='flag' src={this.state.data.flag} alt='flag'/>
                        <h2 className='infoTitle'>{this.state.data.name}</h2>
                        <span>X</span>
                    </div>
                    <div className='infoBody'>
                        <p><span className='boldSpan'>Native name: </span>{this.state.data.nativeName}</p>
                        <p><span className='boldSpan'>Capital: </span>{this.state.data.capital}</p>
                        <p><span className='boldSpan'>Currencies: </span>
                        {
                            this.state.data.currencies.map((curr) => {
                                return <span> code: {curr.code}, name: {curr.name}, symbol: {curr.symbol}</span>
                            })
                        }
                        </p>
                        <p><span className='boldSpan'>Languages: </span>
                        {
                            this.state.data.languages.map((lang) => {
                                return <span>{lang.name}</span>
                            })
                        }
                        </p>
                        <p onClick={this.showInfo} className='question'>Do you want to travel there? Plan your journey!</p>

                        {
                            this.state.showInfo === true && <Form addNewNotesContainer={this.addNewNote}/>
                        }
                    </div>
                </div>
        }
        return (
            <div className='centerContainer notesContainer'>

                {/*information about the country*/}
                <div className='infoContainer'>{res}</div>

                {/*map*/}
                <div style={wrapperStyles}>
                    <ComposableMap
                        projectionConfig={{
                            scale: 205,
                        }}
                        width={980}
                        height={551}
                        style={{
                            width: "100%",
                            height: "auto",
                        }}
                    >
                        <ZoomableGroup center={[0,20]} disablePanning>
                            <Geographies geography={Mapka}>
                                {(geographies, projection) => geographies.map((geography, i) => geography.id !== "ATA" && (
                                            <Geography
                                                key={i}
                                                cacheId={geography.properties.ISO_A3 + i}
                                                data-tip={geography.properties.name}
                                                geography={geography}
                                                projection={projection}
                                                onClick={this.handleClick}
                                                style={{
                                                    default: {
                                                        fill: '#d4d7cd',
                                                        stroke: "#32363f",
                                                        strokeWidth: 0.75,
                                                        outline: "none",
                                                    },
                                                    hover: {
                                                        fill: "#32363f",
                                                        stroke: "#112503",
                                                        strokeWidth: 0.75,
                                                        outline: "none",
                                                    },
                                                    pressed: {
                                                        fill: "#e9a655",
                                                        stroke: "#32363f",
                                                        strokeWidth: 0.75,
                                                        outline: "none",
                                                    },
                                                }}
                                            />
                                        )
                                )}
                            </Geographies>
                        </ZoomableGroup>
                    </ComposableMap>
                    <ReactTooltip border={true}/>
                </div>
                {
                    this.state.newStateFromForm.length > 0 && <Notes
                    notes={this.state.newStateFromForm}
                    className='notesContainer'
                    deleteNote={this.deleteNote}
                    editNote={this.editNote}
                    />
                }
            </div>
        )
    }
}




export { MapSimple};