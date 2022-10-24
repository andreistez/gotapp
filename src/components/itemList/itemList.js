import React, { Component } from 'react'
import './itemList.css'

export default class ItemList extends Component {
    state = {
        itemList: null
    }

    componentDidMount(){
        const { getData } = this.props
        getData().then( itemList => this.setState( { itemList } ) )
    }

    renderItems = arr => {
        if( ! arr || ! arr.length ) return

        return ( arr.map( item => {
            const { id } = item,
                  label = this.props.renderItem( item )

            return (
                <li
                    key={ id }
                    className="list-group-item"
                    onClick={ () => this.props.onItemSelected( id ) }
                >{ label }</li>
            )
        } ) )
    }

    render() {
        const { itemList } = this.state

        return (
            <ul className="item-list list-group">
                { this.renderItems( itemList ) }
            </ul>
        )
    }
}