import React, { Component } from 'react'
import { Col, Row, Container, Button } from 'reactstrap'
import Header from '../header'
import RandomChar from '../randomChar'
import CharacterPage from '../characterPage'
import ErrorMessage from '../errorMessage'

export default class App extends Component {
    state = {
        isRandomCharVisible : true,
        error               : false
    }

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
                </Container>
            </>
        )
    }
}