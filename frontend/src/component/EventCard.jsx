import { useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import TicketModal from "./TicketModal";

const EventCard = ({ event }) => {
  const [open, setOpen] = useState(false);

  const statusVariant =
    event.status === "Available"
      ? "success"
      : event.status === "Sold Out"
      ? "danger"
      : "secondary";

  return (
    <>
      <Card className="h-100 shadow-sm">
        {/* Image */}     

 <Card.Img
    variant="top"
    src={event.image || "https://via.placeholder.com/400x200?text=Event"}
    alt={event.title}
    style={{ height: "200px", objectFit: "cover" }}
  /> 
        <Card.Body className="d-flex flex-column">
          {/* Title */}
          <Card.Title>{event.title}</Card.Title>

          {/* Details */}
          <Card.Text className="mb-1">
            <strong>City:</strong> {event.city}
          </Card.Text>

          <Card.Text className="mb-2">
            <strong>Source:</strong> {event.source}
          </Card.Text>

          {/* Status */}
          <Badge bg={statusVariant} className="mb-3 align-self-start">
            {event.status}
          </Badge>
 <Card.Text className="mb-2">
            <strong>Date:</strong> {new Date(event.date).toLocaleDateString("en-AU", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
          </Card.Text>
          {/* Button */}
          <Button
            variant="secondary"
            className="mt-auto"
            onClick={() => setOpen(true)}
          >
            🎟 Get Tickets
          </Button>
        </Card.Body>
      </Card>

      {/* Modal */}
      {open && (
        <TicketModal
          event={event}
          close={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default EventCard;
