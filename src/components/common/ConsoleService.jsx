import React from 'react'
import {Container,Row,Col,Card} from 'react-bootstrap'
import Header from './Header'
import {FaDiscord,FaTwitter,FaInstagram} from 'react-icons/fa'
const ConsoleService = () => {
  return (
    <>
      <Container className = 'mb-2'>
        <Header title ={"Community"}></Header>
        <Row className = 'mt-3'>
          <h4 className = 'text-center'>
            Join the community of <span className = 'store-color'> Jia's Console Renter !</span>
            
          </h4>
        </Row>
        <hr></hr>

        <Row xs ={1} md={1} lg={3} className ='g-4 mt-3 mb-2'>
          <Col>
          <Card>
            <Card.Body>
              <Card.Title className ="store-color">
                <FaDiscord>Discord</FaDiscord>
              </Card.Title>
              <Card.Text>Join the community </Card.Text>
            </Card.Body>

          </Card>
          
          </Col>

          <Col>
          <Card>
            <Card.Body>
              <Card.Title className ="store-color">
                <FaTwitter>Twitter</FaTwitter>
              </Card.Title>
              <Card.Text> Tweets! </Card.Text>
            </Card.Body>

          </Card>
          
          </Col>

          <Col>
          <Card>
            <Card.Body>
              <Card.Title className ="store-color">
                <FaInstagram>Instagram</FaInstagram>
              </Card.Title>
              <Card.Text> Pictures </Card.Text>
            </Card.Body>

          </Card>
          
          </Col>


        </Row>
      </Container>
    </>
  )
}

export default ConsoleService
