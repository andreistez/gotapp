import React, { Component } from 'react'

import gotService from '../../services/gotService'

import ItemList from '../itemList'
import CharDetails, { Field } from '../charDetails'
import RowBlock from '../rowBlock'
import ErrorMessage from '../errorMessage'

import './characterPage.css'

export default class CharacterPage extends Component {
    state = {
        selectedItem: 41,
        error       : false
    }
    gotService = new gotService()

    componentDidCatch( error, errorInfo ){
        this.setState( { error: true } )
    }

    onItemSelected = id => {
        this.setState( { selectedItem: id } )
    }

    render() {
        const { selectedItem, error } = this.state,
              itemList = (
                  <ItemList
                      onItemSelected={ this.onItemSelected }
                      getData={ this.gotService.getAllCharacters }
                      renderItem={ ( { name, gender, culture } ) => `${ name } (${ gender }, ${ culture })` }
                  />
              ),
            charDetails = (
                <CharDetails selectedItem={ selectedItem }>
                    <Field field='gender' label='Gender' />
                    <Field field='born' label='Born' />
                    <Field field='died' label='Died' />
                    <Field field='culture' label='Culture' />
                </CharDetails>
            )

        if( error ) return <ErrorMessage msg="Error!" />

        return <RowBlock left={ itemList } right={ charDetails } />
    }
}