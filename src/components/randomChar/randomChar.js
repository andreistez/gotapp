import React, { Component } from 'react'
import Spinner from '../spinner'
import './randomChar.css'
import gotService from '../../services/gotService'
import ErrorMessage from '../errorMessage'

export default class RandomChar extends Component {
    constructor( props ){
        super( props )
        this.updateChar()
    }

    gotService = new gotService()
    state = {
        char        : {},
        charIsLoaded: false,
        error       : false
    }

    componentDidMount(){
        this.timerId = setInterval( this.updateChar, 1500 )
    }

    componentWillUnmount(){
        clearInterval( this.timerId )
    }

    onCharLoaded = char => {
        this.setState( {
            char,
            charIsLoaded: true
        } )
    }

    onError = error => {
        this.setState( {
            charIsLoaded: true,
            error: true
        } )
    }

    updateChar = () => {
        const id = Math.floor( Math.random() * 150 + 20 )
        this.gotService.getCharacter( id )
            .then( this.onCharLoaded )
            .catch( this.onError )
    }

    render(){
        const { char, charIsLoaded, error } = this.state,
              errorMessage = error ? <ErrorMessage msg="Something goes wrong..." /> : null,
              content = charIsLoaded ? <View char={ char } /> : <Spinner />

        return (
            <div className="random-block rounded">
                { errorMessage || content }
            </div>
        )
    }
}

const View = ( { char } ) => {
    const { name, gender, born, died, culture } = char

    return (
        <>
            <h4>Random Character: { name }</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{ gender }</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{ born }</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{ died }</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{ culture }</span>
                </li>
            </ul>
        </>
    )
}
