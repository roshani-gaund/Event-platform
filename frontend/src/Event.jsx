import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "./component/EventCard.jsx";
 import { Row, Col } from "react-bootstrap";
const Events = () => {
  const [events, setEvents] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/api/events")
  //     .then(res => setEvents(res.data));
  // }, []);



   const loadEvents = async () => {
    try {
      const res = await axios.get("https://event-platform-d4hu.onrender.com/api/events");
      setEvents(res.data);
    } catch (error) {
      console.error("Failed to fetch events", error);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="text-center mb-4">Sydney Events</h1>

<Row className="g-4 mt-2 d-flex justify-content-center ">
  {events.map((event) => (
    <Col md={4} sm={6} key={event._id}>
      <EventCard event={event} />
    </Col>
     
  ))}
</Row>

    </div>
  );
};

export default Events;
