import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Button, Badge, Spinner } from "react-bootstrap";
import "./index.css";
import { useNavigate, useSearchParams } from "react-router-dom";
const Dashboard = () => {
    const [params] = useSearchParams();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [importingId, setImportingId] = useState(null);

  const [city, setCity] = useState("Sydney");
  const [keyword, setKeyword] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // 🔥 SINGLE SOURCE OF TRUTH
  const loadEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://event-platform-d4hu.onrender.com/api/events/event", {
      
        params: {
          city,
          keyword: keyword.trim(),
          startDate,
          endDate,
        },
      });

      setEvents(res.data);
    } catch (err) {
      console.error("FETCH ERROR:", err);
      setEvents([]); // ⬅ IMPORTANT
      alert("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  // ✅ AUTO FILTERING (REAL FILTERING)
  useEffect(() => {
    loadEvents();
  }, [city, keyword, startDate, endDate]);

  const importEvent = async (id) => {
    try {
      setImportingId(id);

      await axios.post(
        `https://event-platform-d4hu.onrender.com/api/events/${id}/import`);

      loadEvents(); // ONLY ONE SOURCE
    } catch (err) {
      alert("Import failed");
    } finally {
      setImportingId(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "imported":
        return <Badge bg="success">Imported</Badge>;
      case "new":
        return <Badge bg="primary">New</Badge>;
      case "updated":
        return <Badge bg="warning">Updated</Badge>;
      case "inactive":
        return <Badge bg="secondary">Inactive</Badge>;
      default:
        return <Badge bg="dark">{status}</Badge>;
    }
  };
 useEffect(() => {
    const token = params.get("token") || localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      localStorage.setItem("token", token);
    }
  }, []);
  return (
    <Container className="py-4">
      <h2 className="mb-4">🛠 Admin Dashboard</h2>

      {/* FILTER BAR */}
      <div className="filters mb-3">
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="sydney">Sydney</option>
          <option value="melbourne">Melbourne</option>
          <option value="delhi">Delhi</option>
        </select>

        <input
          type="text"
          placeholder="Search title / venue / description"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Date</th>
              <th style={{ width: "150px" }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center text-muted">
                  No events found
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr key={event._id}>
                  <td>{event.title}</td>
                  <td>{getStatusBadge(event.status)}</td>
                   <td>
          { new Date(event.date).toLocaleDateString("en-AU", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
        </td>
                  <td>
                    {event.status !== "imported" ? (
                      <Button
                        size="sm"
                        disabled={importingId === event._id}
                        onClick={() => importEvent(event._id)}
                      >
                        {importingId === event._id ? "Importing..." : "Import"}
                      </Button>
                    ) : (
                      <Button size="sm" variant="success" disabled>
                        Imported
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Dashboard;
