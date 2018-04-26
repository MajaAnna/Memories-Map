import React from 'react';

class RenderApi extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            data : false
        }
    }

    componentDidMount(){

        fetch(`https://restcountries.eu/rest/v2/alpha/${this.props.id}`).then( response =>{
            return response.json()
        }).then(data =>{
            console.log(data)
            this.setState({
                data
            })
        }).catch(err => {
            console.log(err)
        })
    }

    render(){
        if(this.state.data === false){
            return <h1>Pobieram dane...</h1>
        } else {
            return(
                <div>
                    <p>{this.state.data.name}</p>
                 </div>
            )
        }
    }
}

export { RenderApi };