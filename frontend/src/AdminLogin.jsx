// Login.jsx
import { Container, Card, Button } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  // 👇 agar already logged in ho to direct dashboard
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, []);

  const loginWithGoogle = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", backgroundColor: "#f5f7fa" }}
    >
      <Card style={{ width: "350px" }} className="shadow p-3">
        <Card.Body className="text-center">
          <Card.Title className="mb-2 fs-4">
            Admin Login
          </Card.Title>

          <Card.Text className="text-muted mb-4">
            Login to access dashboard
          </Card.Text>

          <Button
            variant="light"
            className="w-100 d-flex align-items-center justify-content-center gap-2 border"
            onClick={loginWithGoogle}
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              width="18"
            />
            Login with Google
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminLogin;
