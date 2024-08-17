import React from "react";
import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const ConsoleCard = ({ console }) => {
  return (
    <Col key={console.id} className="mb-4" xs={12}>
      <Card>
        <Card.Body className="d-flex flex-wrap align-items-center">
          <div className="flex-shrink-0 mr-3 mb-3 mb-md-0">
            {console.photo ? (
              <Card.Img
                variant="top"
                src={`data:image/png;base64,${console.photo}`}
                alt={`${console.consoleType} Photo`}
                style={{ width: "100%", maxWidth: "200px", height: "auto" }}
              />
            ) : (
              <Card.Img
                variant="top"
                src="path_to_placeholder_image"
                alt="Placeholder Photo"
                style={{ width: "100%", maxWidth: "200px", height: "auto" }}
              />
            )}
          </div>
          <div className="flex-grow-1 ml-3 px-5">
            <Card.Title className="store-color">
              {console.consoleName}
            </Card.Title>
            <Card.Title className="console-price">
              ${console.consolePrice} / Day
            </Card.Title>
            <Card.Text>
              Some console information goes here for the customer
            </Card.Text>
          </div>
          <div className="flex-shrink-0 mt-3">
            <Link
              to={`/rent-console/${console.id}`}
              className="btn btn-store btn-sm"
            >
              Rent Now
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ConsoleCard;
