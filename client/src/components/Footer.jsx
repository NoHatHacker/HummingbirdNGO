import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
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
                required
              />

              <button type="submit">Subscribe</button>
            </form>
             <p>
              
             </p>
             <p>
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