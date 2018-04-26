import React from 'react';
import ContentEditable from 'react-contenteditable'

class Notes extends React.Component{
    render(){
        return(
            <div className='notesContainer'>
                {
                    this.props.notes.map((object, index) => {
                        return <OneNote
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
    // constructor(props){
    //     super(props)
    //     this.setState({
    //         obj:this.props.object
    //     })
    // }

    deleteBtn = () => {
        if ( typeof this.props.deleteNote === 'function' ){
            this.props.deleteNote( this.props.index );
        }
    }


    render(){
        return(
            <div className='note'>
                <Goal goal={this.props.goal}
                      index={this.props.index}
                      editNote={this.props.editNote}/>
                <Links link={this.props.link} editNote={this.props.editNote}/>
                <NumberOfNights numberOfNights={this.props.numberOfNights}
                                editNote={this.props.editNote}/>
                <Accomodation accomodation={this.props.accomodation}
                              editNote={this.props.editNote}/>
                <Transportation transportation={this.props.transportation}
                                editNote={this.props.editNote}/>
                <Food food={this.props.food} editNote={this.props.editNote}/>
                <OtherCosts other={this.props.other} editNote={this.props.editNote}/>
                <button onClick={this.deleteBtn} className='btn deleteBtn'>DELETE</button>
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
            this.props.editNote( this.state.goal, this.props.index, 'goal' );
        }
    }

    editBtn = () => {
        console.log('edit');
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
                        <h1>Cel podróży:
                            <div style={{backgroundColor:'pink'}}>
                                <ContentEditable
                                    html={this.state.goal}
                                    disabled={false}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </h1>

                }
                <button onClick={this.editBtn} className='btn'>{this.state.editBtn}</button>
            </div>
        )
    }
}


///////////////////////////////////////////////////////////////////////////////////////////

class EditButton extends React.Component{
    editBtn = () => {
        console.log('click');
    }

    render(){
        return <button onClick={this.editBtn} className='btn'>Edit</button>
    }
}

class Links extends React.Component{
    render(){
        return(
            <div>
                <p>Linki: {this.props.link}</p>
                <EditButton/>
            </div>
        )
    }
}

class NumberOfNights extends React.Component{
    render(){
        return(
            <div>
                <p>Number of night: {this.props.goal}</p>
                <EditButton/>
            </div>
        )
    }
}

class Accomodation extends React.Component{
    render(){
        return(
            <div>
                <p>Noclegi: {this.props.accomodation}</p>
                <EditButton/>
            </div>
        )
    }
}

class Transportation extends React.Component{
    render(){
        return(
            <div>
                <p>Transportation: {this.props.transportation}</p>
                <EditButton/>
            </div>
        )
    }
}

class Food extends React.Component{
    render(){
        return(
            <div>
                <p>Food: {this.props.food}</p>
                <EditButton/>
            </div>
        )
    }
}

class OtherCosts extends React.Component{
    render(){
        return(
            <div>
                <p>OtherCosts: {this.props.other}</p>
                <EditButton/>
            </div>
        )
    }
}


export { Notes };