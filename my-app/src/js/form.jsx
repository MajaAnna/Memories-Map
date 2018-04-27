import React from 'react';

class Form extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            goal:'',
            link:'',
            numberOfNights:'',
            accomodation:'',
            transportation:'',
            food:'',
            other:'',
            formMessages: [],
            formError: false
        }
    }

    handleFormInputs = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })

    }

    formSubmit = (e) => {
        e.preventDefault()
        let error = false
        let messages = []

        //text
        if(this.state.goal.length === 0 || this.state.link.length === 0){
            error = true
            messages.push(<p key='messageSign'>Nie wpisano żadnego znaku!</p>)
        }

        //numbers
        if(this.state.numberOfNights < 1){
            error = true
            messages.push(<p key='messageNumbers'>Liczba nocy nie może być mniejsza od 1!</p>)
        }

        this.setState({
            formMessages:messages,
            formError: error
        })

        error === false && this.props.addNewNotesContainer(this.state)
    }

    render() {
        return (
            <div>
                {
                    this.state.formMessages === [] ? null : <div>{this.state.formMessages}</div>
                }
                <form className='formStyle' onSubmit={this.formSubmit}>
                    <label>Co chcesz zobaczyć?
                        <input
                            type='text'
                            id='goal'
                            value={this.state.goal}
                            key='goal'
                            placeholder='What places would you like to see?'
                            onChange={this.handleFormInputs}
                        />
                    </label>
                    <label>Zapisz przydatne linki!
                        <input
                            type='text'
                            id='link'
                            value={this.state.link}
                            key='link'
                            placeholder='What places would you like to see?'
                            onChange={this.handleFormInputs}
                        />
                    </label>
                    <label>Oszacuj koszty podróży
                        <input
                            type='number'
                            placeholder='Number of nights'
                            id='numberOfNights'
                            value={this.state.numberOfNights}
                            key='numberOfNights'
                            onChange={this.handleFormInputs}
                        />
                        <input
                            type='number'
                            placeholder='Accomodation per night'
                            id='accomodation'
                            value={this.state.accomodation}
                            key='accomodation'
                            onChange={this.handleFormInputs}
                        />
                        <input
                            type='number'
                            placeholder='Transportation'
                            id='transportation'
                            value={this.state.transportation}
                            key='transportation'
                            onChange={this.handleFormInputs}
                        />
                        <input
                            type='number'
                            placeholder='Food'
                            id='food'
                            value={this.state.food}
                            key='food'
                            onChange={this.handleFormInputs}
                        />
                        <input
                            type='number'
                            placeholder='Other costs'
                            id='other'
                            value={this.state.other}
                            key='other'
                            onChange={this.handleFormInputs}
                        />
                    </label>
                    <input type="submit" value="Add note" className='btn addNoteBtn'/>
                </form>
            </div>
        )
    }
}

export { Form };