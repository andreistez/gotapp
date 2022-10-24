import React, { Component } from 'react'
import gotService from '../../services/gotService'
import './itemList.css'
import Spinner from '../spinner'

export default class ItemList extends Component {
    gotService = new gotService()
    state = {
        charList: null
    }

    componentDidMount(){
        this.gotService.getAllCharacters( this.props.page, this.props.pageSize )
            .then( charList => this.setState( { charList } ) )
    }

    render() {
        const { charList } = this.state,
              { onCharSelected } = this.props

        return charList ? <View charList={ charList } onCharSelected={ onCharSelected } /> : <Spinner />
    }
}

const View = ( { charList, onCharSelected } ) => {
    return (
        <ul className="item-list list-group">
            {
                charList.length
                    ? charList.map( ( char, i ) => (
                        <li
                            key={ `${ char.name + char.gender + char.born + char.died }` }
                            className="list-group-item"
                            onClick={ () => onCharSelected( i ) }
                        >{ char.name }</li>
                    ) )
                    : <Spinner />
            }
        </ul>
    )
}