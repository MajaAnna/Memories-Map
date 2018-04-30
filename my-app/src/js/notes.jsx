import React from 'react';
import ContentEditable from 'react-contenteditable'
import "../../node_modules/animate.css/animate.min.css";


class Notes extends React.Component{
    render(){
        return(
            <div className='notesContainer'>
                {
                    this.props.notes.map((object, index) => {
                        return <OneNote
                            key={index}
                            id='oneNote'
                            object={object}
                            goal={object.goal}
                            link={object.link}
                            numberOfNights={object.numberOfNights}
                            accomodation={object.accomodation}
                            transportation={object.transportation}
                            food={object.food}
                            other={object.other}
                            index={index}
                            deleteNote={this.props.deleteNote}
                            editNote={this.props.editNote}
                        />
                    })
                }
            </div>
        )
    }
}

class OneNote extends React.Component{
    deleteBtn = () => {
        if ( typeof this.props.deleteNote === 'function' ){
            this.props.deleteNote( this.props.index );
        }
    }

    render(){
        return(
            <div className='note'>
                <Goal goal={this.props.goal}
                      id='goal'
                      key='goal'
                      index={this.props.index}
                      editNote={this.props.editNote}/>
                <Links link={this.props.link}
                       id='link'
                       key='link'
                       index={this.props.index}
                       editNote={this.props.editNote}/>
                <NumberOfNights numberOfNights={this.props.numberOfNights}
                                id='numberOfNights'
                                key='numberOfNights'
                                index={this.props.index}
                                editNote={this.props.editNote}/>
                <Accomodation accomodation={this.props.accomodation}
                              id='accomodation'
                              key='accomodation'
                              index={this.props.index}
                              editNote={this.props.editNote}/>
                <Transportation transportation={this.props.transportation}
                                id='transportation'
                                key='transportation'
                                index={this.props.index}
                                editNote={this.props.editNote}/>
                <Food food={this.props.food}
                      id='food'
                      key='food'
                      index={this.props.index}
                      editNote={this.props.editNote}/>
                <OtherCosts other={this.props.other}
                            id='other'
                            key='other'
                            index={this.props.index}
                            editNote={this.props.editNote}/>
                <Sum id='other'
                     key='sum'
                     numberOfNights={this.props.numberOfNights}
                     accomodation={this.props.accomodation}
                     transportation={this.props.transportation}
                     food={this.props.food}
                     other={this.props.other}/>
                <button onClick={this.deleteBtn}
                        id='deleteBtn'
                        key='deleteBtn'
                        className='btn deleteNoteBtn'>DELETE</button>
            </div>
        )
    }
}

class Goal extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            disabled:true,
            goal: this.props.goal,
            editBtn:'Edit'
        }
    }

    editNote = () => {
        if ( typeof this.props.editNote === 'function' ){
            this.props.editNote( this.state.goal, this.props.index, this.props.id );
        }
    }

    editBtn = () => {
        this.setState({
            disabled: this.state.disabled ? false : true,
            editBtn:this.state.editBtn === 'Edit'? 'Ok' : 'Edit'
        })
        this.editNote()
    }

    handleChange = e => {
        this.setState({
            goal: e.target.value,
            editBtn:'Ok'
        });
    };

    render(){
        return(
            <div>
                {
                    this.state.disabled ? <h1>Cel podróży: {this.state.goal}</h1>
                        :
                        <h1 className='labels'><span className='spanBold'>Cel podróży: </span>
                            <div className='contentEditable'>
                                <ContentEditable
                                    html={this.state.goal}
                                    disabled={false}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </h1>

                }
                <button onClick={this.editBtn} className='btn editBtn'>{this.state.editBtn}</button>
            </div>
        )
    }
}

class Links extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            disabled:true,
            link: this.props.link,
            editBtn:'Edit'
        }
    }

    editNote = () => {
        if ( typeof this.props.editNote === 'function' ){
            this.props.editNote( this.state.link, this.props.index, this.props.id );
        }
    }

    editBtn = () => {
        this.setState({
            disabled: this.state.disabled ? false : true,
            editBtn:this.state.editBtn === 'Edit'? 'Ok' : 'Edit'
        })
        this.editNote()
    }

    handleChange = e => {
        this.setState({
            link: e.target.value,
            editBtn:'Ok'
        });
    };

    render(){
        return(
            <div>
                {
                    this.state.disabled ? <h1>Miasta: {this.state.link}</h1>
                        :
                        <h1 className='labels'>Miasta:
                            <div className='contentEditable'>
                                <ContentEditable
                                    html={this.state.link}
                                    disabled={false}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </h1>

                }
                <button onClick={this.editBtn} className='btn editBtn'>{this.state.editBtn}</button>
            </div>
        )
    }
}

class NumberOfNights extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            disabled:true,
            numberOfNights: this.props.numberOfNights,
            editBtn:'Edit'
        }
    }

    editNote = () => {
        if ( typeof this.props.editNote === 'function' ){
            this.props.editNote( this.state.numberOfNights, this.props.index, this.props.id );
        }
    }

    editBtn = () => {
        this.setState({
            disabled: this.state.disabled ? false : true,
            editBtn:this.state.editBtn === 'Edit'? 'Ok' : 'Edit'
        })
        this.editNote()
    }

    handleChange = e => {
        this.setState({
            numberOfNights: e.target.value,
            editBtn:'Ok'
        });
    };

    render(){
        return(
            <div>
                {
                    this.state.disabled ? <h1>Number of nights: {this.state.numberOfNights}</h1>
                        :
                        <h1 className='labels'>Number of nights:
                            <div className='contentEditable'>
                                <ContentEditable
                                    html={this.state.numberOfNights}
                                    disabled={false}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </h1>

                }
                <button onClick={this.editBtn} className='btn editBtn'>{this.state.editBtn}</button>
            </div>
        )
    }
}

class Accomodation extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            disabled:true,
            accomodation: this.props.accomodation,
            editBtn:'Edit'
        }
    }

    editNote = () => {
        if ( typeof this.props.editNote === 'function' ){
            this.props.editNote( this.state.accomodation, this.props.index, this.props.id );
        }
    }

    editBtn = () => {
        this.setState({
            disabled: this.state.disabled ? false : true,
            editBtn:this.state.editBtn === 'Edit'? 'Ok' : 'Edit'
        })
        this.editNote()
    }

    handleChange = e => {
        this.setState({
            accomodation: e.target.value,
            editBtn:'Ok'
        });
    };

    render(){
        return(
            <div>
                {
                    this.state.disabled ? <h1>Accomodation /per day: {this.state.accomodation}</h1>
                        :
                        <h1 className='labels'>Accomodation /per day:
                            <div className='contentEditable'>
                                <ContentEditable
                                    html={this.state.accomodation}
                                    disabled={false}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </h1>

                }
                <button onClick={this.editBtn} className='btn editBtn'>{this.state.editBtn}</button>
            </div>
        )
    }
}

class Transportation extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            disabled:true,
            transportation: this.props.transportation,
            editBtn:'Edit'
        }
    }

    editNote = () => {
        if ( typeof this.props.editNote === 'function' ){
            this.props.editNote( this.state.transportation, this.props.index, this.props.id );
        }
    }

    editBtn = () => {
        this.setState({
            disabled: this.state.disabled ? false : true,
            editBtn:this.state.editBtn === 'Edit'? 'Ok' : 'Edit'
        })
        this.editNote()
    }

    handleChange = e => {
        this.setState({
            transportation: e.target.value,
            editBtn:'Ok'
        });
    };

    render(){
        return(
            <div>
                {
                    this.state.disabled ? <h1>Transportation: {this.state.transportation}</h1>
                        :
                        <h1 className='labels'>Transportation:
                            <div className='contentEditable'>
                                <ContentEditable
                                    html={this.state.transportation}
                                    disabled={false}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </h1>

                }
                <button onClick={this.editBtn} className='btn editBtn'>{this.state.editBtn}</button>
            </div>
        )
    }
}

class Food extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            disabled:true,
            food: this.props.food,
            editBtn:'Edit'
        }
    }

    editNote = () => {
        if ( typeof this.props.editNote === 'function' ){
            this.props.editNote( this.state.food, this.props.index, this.props.id );
        }
    }

    editBtn = () => {
        this.setState({
            disabled: this.state.disabled ? false : true,
            editBtn:this.state.editBtn === 'Edit'? 'Ok' : 'Edit'
        })
        this.editNote()
    }

    handleChange = e => {
        this.setState({
            food: e.target.value,
            editBtn:'Ok'
        });
    };

    render(){
        return(
            <div>
                {
                    this.state.disabled ? <h1>Costs of food /per day: {this.state.food}</h1>
                        :
                        <h1 className='labels'>Costs of food /per day:
                            <div className='contentEditable'>
                                <ContentEditable
                                    html={this.state.food}
                                    disabled={false}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </h1>

                }
                <button onClick={this.editBtn} className='btn editBtn'>{this.state.editBtn}</button>
            </div>
        )
    }
}

class OtherCosts extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            disabled:true,
            other: this.props.other,
            editBtn:'Edit'
        }
    }

    editNote = () => {
        if ( typeof this.props.editNote === 'function' ){
            this.props.editNote( this.state.other, this.props.index, this.props.id );
        }
    }

    editBtn = () => {
        this.setState({
            disabled: this.state.disabled ? false : true,
            editBtn:this.state.editBtn === 'Edit'? 'Ok' : 'Edit'
        })
        this.editNote()
    }

    handleChange = e => {
        this.setState({
            other: e.target.value,
            editBtn:'Ok'
        });
    };

    render(){
        return(
            <div>
                {
                    this.state.disabled ? <h1>Other costs /per day: {this.state.other}</h1>
                        :
                        <h1 className='labels'>Other costs:
                            <div className='contentEditable'>
                                <ContentEditable
                                    html={this.state.other}
                                    disabled={false}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </h1>

                }
                <button onClick={this.editBtn} className='btn editBtn'>{this.state.editBtn}</button>
            </div>
        )
    }
}

class Sum extends React.Component{
    constructor(props){
        super(props)

        this.state={
            numberOfNights: this.props.numberOfNights,
            accomodation: this.props.accomodation,
            transportation: this.props.transportation,
            food: this.props.food,
            other: this.props.other
        }
    }

    render(){
        let numberOfNights = parseInt(this.state.numberOfNights, 10)
        let accomodation = parseFloat(this.state.accomodation)
        let transportation = parseFloat(this.state.transportation)
        let food = parseFloat(this.state.food)
        let other = parseFloat(this.state.other)

        let costs = Math.floor(numberOfNights) * Math.round(accomodation + transportation + food + other)
        return(
            <h1 className='costs'>
                Szacowany koszt podróży trwającej {numberOfNights} {numberOfNights === 1 ? 'dzień' : 'dni'} wynosi: <span className='animated zoomIn'>{costs}</span> zł.
            </h1>
        )
    }
}


export { Notes };