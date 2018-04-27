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
            value: 'Plan your journey!',
            data:false, //for fetch
            showForm:false, //for form
            showInfo:false,
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
                data,
                showInfo:true
            })
        }).catch(err => {
            console.log(err)
        })
    }

    //closing info after clicking on 'x' icon
    closeInfo = () => {
        this.setState({
            showInfo:false
        })
    }


    //shows information about the countries
    showForm = () => {
        this.setState({
            showForm:this.state.showForm === false ? true : false,
            value: this.state.value === 'Plan your journey!' ? 'Hide form!' : 'Plan your journey!'
        })
    }

    //adds new note using values from form
    addNewNote = (formData) =>{

        let localStorageNotes = JSON.parse( localStorage.getItem('notes') );
        if( localStorageNotes === null ){
            localStorageNotes = [formData]
        } else {
            localStorageNotes.push( formData )
        }
        localStorage.setItem('notes', JSON.stringify( localStorageNotes ) );

        this.setState({
            newStateFromForm: [...this.state.newStateFromForm, formData]
        })

    }

    deleteNote = (id) => {
        let newArray = this.state.newStateFromForm.filter((element, index)=>{
            return id !== index
        })

        this.setState({
            newStateFromForm: newArray
        })

        localStorage.setItem('notes', JSON.stringify( newArray ) );
    }

    editNote = (changedObject, index, key) => {
        console.log( changedObject, index, key)

        let tempArray = [...this.state.newStateFromForm]
        tempArray[ index ][ key ] = changedObject

        this.setState({
            newStateFromForm: tempArray
        })

        localStorage.setItem('notes', JSON.stringify( tempArray ) );
    }

    render() {

        //INFORMATION ABOUT THE COUNTRY
        let res;

        //in the beginning
        if(this.state.data === false){
            res = null
        //when country is clicked
        } else {
            if(this.state.showInfo === true){
                res =
                    <div className='info'>
                        <div className='inforHeader'>
                            <img className='flag' src={this.state.data.flag} alt='flag'/>
                            <h2 className='infoTitle'>{this.state.data.name}</h2>
                            <span className='icon-cancel-circled icons' onClick={this.closeInfo}></span>
                        </div>
                        <div className='infoBody'>
                            <p><span className='boldSpan'>Native name: </span>{this.state.data.nativeName}</p>
                            <p><span className='boldSpan'>Capital: </span>{this.state.data.capital}</p>
                            <p><span className='boldSpan'>Currencies: </span>
                                {
                                    this.state.data.currencies.map((curr) => {
                                        return <span key={curr.code}> code: {curr.code}, name: {curr.name}, symbol: {curr.symbol}</span>
                                    })
                                }
                            </p>
                            <p><span className='boldSpan'>Languages: </span>
                                {
                                    this.state.data.languages.map((lang) => {
                                        return <span key={lang.name}>{lang.name}</span>
                                    })
                                }
                            </p>
                            <p className='question'>Do you want to travel there? <button className='btn' onClick={this.showForm} >{this.state.value}</button></p>

                            {
                                this.state.showForm === true && <Form addNewNotesContainer={this.addNewNote}/>
                            }
                        </div>
                    </div>
            } else {
                res =  null
            }
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
                    key='notes'
                    id='notes'
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