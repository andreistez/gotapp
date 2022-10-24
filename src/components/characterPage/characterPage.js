import React, { Component } from 'react'
import './characterPage.css'
import { Col, Row } from 'reactstrap'
import ItemList from '../itemList'
import CharDetails from '../charDetails'
import ErrorMessage from '../errorMessage'

export default class CharacterPage extends Component {
    state = {
        page        : 7,
        pageSize    : 10,
        selectedChar: 130,
        error       : false
    }

    componentDidCatch( error, errorInfo ){
        this.setState( { error: true } )
    }

    onCharSelected = index => {
        this.setState( { selectedChar: ( this.state.page - 1 ) * this.state.pageSize + ( ++index ) } )
    }

    render() {
        const { page, pageSize, selectedChar, error } = this.state

        if( error ) return <ErrorMessage msg="Error!" />

        return <View page={ page } pageSize={ pageSize } char={ selectedChar } onCharSelected={ this.onCharSelected } />
    }
}

const View = ( { page, pageSize, onCharSelected, char } ) => {
    return (
        <Row>
            <Col md='6'>
                <ItemList
                    page={ page }
                    pageSize={ pageSize }
                    onCharSelected={ onCharSelected }
                />
            </Col>
            <Col md='6'>
                <CharDetails selectedChar={ char }/>
            </Col>
        </Row>
    )
}