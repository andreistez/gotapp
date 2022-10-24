import React, { Component } from 'react'
import { Col, Row, Container, Button } from 'reactstrap'
import Header from '../header'
import RandomChar from '../randomChar'
import CharacterPage from '../characterPage'
import ErrorMessage from '../errorMessage'
import ItemList from '../itemList'
import gotService from '../../services/gotService'

export default class App extends Component {
    state = {
        isRandomCharVisible : true,
        error               : false
    }
    gotService = new gotService()

    componentDidCatch( error, errorInfo ){
        this.setState( { error: true } )
    }

    render(){
        const { isRandomCharVisible, error } = this.state

        if( error ) return <ErrorMessage msg="Error!" />

        return (
            <>
                <Container>
                    <Header/>
                </Container>
                <Container>
                    <Row>
                        <Col lg={ { size: 5, offset: 0 } }>
                            { isRandomCharVisible ? <RandomChar/> : null }
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={ { size: 5, offset: 0 } }>
                            <Button
                                color='primary'
                                onClick={ () => this.setState( { isRandomCharVisible: ! isRandomCharVisible } ) }
                            >
                                { isRandomCharVisible ? 'Hide Random Character Block' : 'Show Random Character Block' }
                            </Button>
                        </Col>
                    </Row>

                    <CharacterPage />

                    <Row>
                        <Col md='6'>
                            <ItemList
                                onItemSelected={ this.onItemSelected }
                                getData={ this.gotService.getAllBooks }
                                renderItem={ item => item.name }
                            />
                        </Col>
                        <Col md='6'>
                            {/*<CharDetails selectedChar={ char }/>*/}
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList
                                onItemSelected={ this.onItemSelected }
                                getData={ this.gotService.getAllHouses }
                                renderItem={ item => item.name }
                            />
                        </Col>
                        <Col md='6'>
                            {/*<CharDetails selectedChar={ char }/>*/}
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}