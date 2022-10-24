import React, { Component } from 'react'
import './charDetails.css'
import Spinner from '../spinner'
import gotService from '../../services/gotService'

const Field = ( { item, field, label } ) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{ label }</span>
            <span>{ item[field] }</span>
        </li>
    )
}

export { Field }

export default class CharDetails extends Component {
    gotService = new gotService()
    state = {
        item: null
    }

    componentDidMount(){
        this.updateItem()
    }

    componentDidUpdate( prevProps){
        if( this.props.selectedItem !== prevProps.selectedItem )
            this.updateItem()
    }

    updateItem = () => {
        const { selectedItem } = this.props

        if( ! selectedItem ) return

        this.gotService.getCharacter( selectedItem )
            .then( item => this.setState( { item } ) )
    }

    render() {
        const { item } = this.state

        if( ! item ) return <Spinner />

        return (
            <div className="char-details rounded">
                 <h4>{ item.name }</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map( this.props.children, child => {
                            return React.cloneElement( child, { item } )
                        } )
                    }
                </ul>
            </div>
        )
    }
}