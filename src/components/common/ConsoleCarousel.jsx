import React, { useState, useEffect } from "react";
import { getAllConsoles } from "../utils/ApiFunctions";
import { Link } from "react-router-dom";
import { Carousel, Container, Row, Col, Card } from "react-bootstrap";

const ConsoleCarousel = () => {
  const [consoles, setConsoles] = useState([
    { id: "", consoleName: "", consolePrice: "", photo: "" },
  ]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllConsoles()
      .then((data) => {
        setConsoles(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="mt-5">Loading Consoles...</div>;
  }
  if (errorMessage) {
    return <div className="text-danger mb-5 mt-5">Error: {errorMessage}</div>;
  }
  return (
    <section className="bg-light mb-5 mt-5 shadow">
      <Link
        to={"/browse-consoles"}
        className="store-color"
        style={{ textAlign: "left", display: "block", marginLeft: "20px" }}
      >
        Browse all consoles
      </Link>
      <Container>
        <Carousel indicators={false}>
          {[...Array(Math.ceil(consoles.length / 4))].map((_, index) => (
            <Carousel.Item key={index}>
              <Row>
                {consoles.slice(index * 4, index * 4 + 4).map((console) => (
                  <Col key={console.id} className="mb-4" xs={12} md={6} lg={3}>
                    <Card>
                      <Link to={`/rent-console/${console.id}`}>
                        <Card.Img
                          variant="top"
                          src={`data:image/png;base64,${console.photo}`}
                          alt="Console Photo"
                          className="w-100"
                          style={{ height: "200px" }}
                        />
                      </Link>
                      <Card.Body>
                        <Card.Title className="store-color mt-2 mb-3">
                          {console.consoleName}
                        </Card.Title>
                        <Card.Title className="console-price">
                          {" "}
                          ${console.consolePrice} / Day
                        </Card.Title>
                        <Card.Text>
                          Some random information for customer to fill in the
                          blank space
                        </Card.Text>
                        <div className="flex-shrink-0 mt-3">
                          <Link
                            to={`rent-console/${console.id}`}
                            className="btn btn-store btn-sm"
                          >
                            Rent Now
                          </Link>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  );
};

export default ConsoleCarousel;
