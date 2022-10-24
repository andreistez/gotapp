import React, { Component } from 'react'
import './charDetails.css'
import Spinner from '../spinner'
import gotService from '../../services/gotService'

export default class CharDetails extends Component {
    gotService = new gotService()
    state = {
        char: null
    }

    componentDidMount(){
        this.updateChar()
    }

    componentDidUpdate( prevProps){
        if( this.props.selectedChar !== prevProps.selectedChar )
            this.updateChar()
    }

    updateChar = () => {
        const { selectedChar } = this.props

        if( ! selectedChar ) return

        this.gotService.getCharacter( selectedChar )
            .then( char => this.setState( { char } ) )
    }

    render() {
        const { char } = this.state

        return (
            <div className="char-details rounded">
                { char ? <View selectedChar={ char }/> : <Spinner/> }
            </div>
        )
    }
}

const View = ( { selectedChar } ) => {
    const { name, gender, born, died, culture } = selectedChar

    return (
        <>
            <h4>{ name }</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender</span>
                    <span>{ gender }</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born</span>
                    <span>{ born }</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died</span>
                    <span>{ died }</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture</span>
                    <span>{ culture }</span>
                </li>
            </ul>
        </>
    )
}