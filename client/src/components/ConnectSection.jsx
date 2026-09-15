import { useState } from "react";
import api from "../services/api";
import "./ConnectSection.css";

function ConnectSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter a valid email address");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await api.post("/subscribers", { email, source: "connect_section" });
      setMessage(res.data.message || "Thank you for subscribing!");
      setMessageType("success");
      setEmail("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Subscription failed. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 5000);
    }
  };

  return (
    <section className="connect-section" id="contact-form">
      <div className="container" style={{ display: "flex", justifyContent: "center" }}>
        <div className="connect-card">
          <h2 className="connect-title">Stay Connected</h2>
          <p className="connect-subtitle">
            Subscribe to receive updates on our field missions, impact stories, and volunteer opportunities.
          </p>

          {message && (
            <div
              style={{
                padding: "1rem",
                borderRadius: "6px",
                marginBottom: "1.5rem",
                textAlign: "center",
                backgroundColor: messageType === "success" ? "#10b981" : "#ef4444",
                color: "white",
                fontWeight: "600",
              }}
            >
              {messageType === "success" ? "✓" : "✗"} {message}
            </div>
          )}

          <form className="connect-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="btn-send-message"
                disabled={loading}
                style={{ opacity: loading ? 0.6 : 1 }}
              >
                {loading ? "Subscribing..." : "Subscribe to Updates ➔"}
              </button>
            </div>
          </form>

          <p style={{ fontSize: "0.875rem", color: "#64748b", marginTop: "1rem", textAlign: "center" }}>
            For general inquiries or volunteer applications, visit our <a href="/contact" style={{ color: "#00c4df", textDecoration: "none" }}>Contact page</a>.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ConnectSection;
