import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./Footer.css";

function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ text: "", type: "" });

  const handleNewsletterSubmit = async (event) => {
    event.preventDefault();
    if (!email) return;

    setLoading(true);
    setFeedback({ text: "", type: "" });

    try {
      const res = await api.post("/subscribers", {
        email,
        source: "website_footer",
      });
      setFeedback({
        text: res.data.message || "Subscribed successfully!",
        type: "success",
      });
      setEmail("");
    } catch (err) {
      setFeedback({
        text: err.response?.data?.message || "Failed to subscribe. Try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
      setTimeout(() => {
        setFeedback({ text: "", type: "" });
      }, 5000);
    }
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <h3>Hummingbird NGO</h3>
            <p>
              Wings that never rest. Rapid response humanitarian aid across
              the globe.
            </p>

            <div className="social-icons">
              <span className="social-icon-btn">🌐</span>
              <span className="social-icon-btn">✉️</span>
            </div>
          </div>

          <div className="footer-column">
            <h4 className="footer-col-title">Navigation</h4>

            <ul className="footer-links">
              <li>
                <Link to="/about">Impact Report</Link>
              </li>
              <li>
                <Link to="/team">Volunteer Portal</Link>
              </li>
              <li>
                <Link to="/events">Governance</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-col-title">Legal</h4>

            <ul className="footer-links">
              <li>
                <a href="#privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms">Terms of Service</a>
              </li>
              <li>
                <a href="#cookies">Cookie Policy</a>
              </li>
            </ul>
          </div>

          <div className="footer-newsletter">
            <form
              className="newsletter-form"
              onSubmit={handleNewsletterSubmit}
            >
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>

              <input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />

              <button type="submit" disabled={loading}>
                {loading ? "..." : "Subscribe"}
              </button>
            </form>

            {feedback.text && (
              <p
                style={{
                  color: feedback.type === "success" ? "#10b981" : "#ef4444",
                  fontSize: "0.85rem",
                  marginTop: "0.5rem",
                  fontWeight: "600",
                }}
              >
                {feedback.type === "success" ? "✓ " : "✗ "}
                {feedback.text}
              </p>
            )}

            <p style={{ marginTop: "0.5rem" }}>
              Subscribe to receive updates about our campaigns, events, and
              humanitarian work.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Hummingbird NGO. Wings that never rest.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;