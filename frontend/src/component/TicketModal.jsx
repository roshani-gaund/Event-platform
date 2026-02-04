import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const TicketModal = ({ event, close }) => {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!email || !consent) {
      alert("Email and consent required");
      return;
    }

    try {
      setLoading(true);

      await axios.post("https://event-platform-d4hu.onrender.com/api/leads", {
        email,
        consent,
        eventId: event._id,
      });

      // redirect to original ticket site
      window.location.href = event.originalUrl;
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show onHide={close} centered>
      <Modal.Header closeButton>
        <Modal.Title>🎟 Get Tickets</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="text-muted">
          Enter your email to continue to ticket booking.
        </p>

        <Form>
          {/* Email */}
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          {/* Consent */}
          <Form.Group>
            <Form.Check
              type="checkbox"
              label="I agree to receive emails"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Cancel
        </Button>

        <Button variant="primary" onClick={submit} disabled={loading}>
          {loading ? "Please wait..." : "Continue"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TicketModal;
