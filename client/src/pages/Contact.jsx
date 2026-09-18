import { useEffect, useState } from "react";
import api from "../services/api";
import "./Contact.css";

const Contact = () => {
  const [scrollAmount, setScrollAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ text: "", type: "" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organisation: "",
    subject: "General enquiry",
    message: "",
  });

  useEffect(() => {
    const updateScroll = () => {
      const animationLength = window.innerHeight * 0.65;
      const progress = window.scrollY / animationLength;

      setScrollAmount(Math.min(Math.max(progress, 0), 1));
    };

    updateScroll();

    window.addEventListener("scroll", updateScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setFeedback({ text: "", type: "" });

    try {
      const res = await api.post("/contact", formData);
      setFeedback({
        text: res.data.message || "Message sent successfully!",
        type: "success",
      });
      setFormData({
        name: "",
        email: "",
        organisation: "",
        subject: "General enquiry",
        message: "",
      });
    } catch (err) {
      setFeedback({
        text: err.response?.data?.message || "Failed to send message. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
      setTimeout(() => {
        setFeedback({ text: "", type: "" });
      }, 6000);
    }
  };

  const heroStyles = {
    opacity: 1 - scrollAmount,
    transform: `translateY(${-scrollAmount * 90}px) scale(${
      1 - scrollAmount * 0.05
    })`,
  };

  const formStyles = {
    opacity: 0.25 + scrollAmount * 0.75,
    transform: `translateY(${60 - scrollAmount * 60}px)`,
  };

  return (
    <main className="contact-page">
      <section className="contact-intro">
        <div className="contact-shape contact-shape-left" />
        <div className="contact-shape contact-shape-right" />

        <div className="contact-heading" style={heroStyles}>
          <p className="contact-label">Contact us</p>

          <h1>
            Let&apos;s start
            <span> a conversation.</span>
          </h1>

          <p className="contact-description">
            Have a question, an idea, or want to get involved? Send us a
            message and we&apos;ll get back to you.
          </p>
        </div>

        <div
          className="scroll-hint"
          style={{ opacity: 1 - scrollAmount * 2 }}
        >
          <span>Scroll to continue</span>
          <div className="scroll-line" />
        </div>
      </section>

      <section className="contact-form-section">
        <div className="contact-form-wrapper" style={formStyles}>
          <div className="form-heading">
            <div>
              <p className="form-label">Send a message</p>
              <h2>Write to us</h2>
            </div>

            <p className="required-text">
              Fields marked with <span>*</span> are required.
            </p>
          </div>

          {feedback.text && (
            <div
              style={{
                padding: "1.25rem",
                borderRadius: "8px",
                marginBottom: "2rem",
                textAlign: "center",
                backgroundColor: feedback.type === "success" ? "#10b981" : "#ef4444",
                color: "white",
                fontWeight: "600",
                fontSize: "0.95rem",
              }}
            >
              {feedback.type === "success" ? "✓" : "✗"} {feedback.text}
            </div>
          )}

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="name">
                  Full name <span>*</span>
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="email">
                  Email address <span>*</span>
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="organisation">
                Organisation or college
                <small>Optional</small>
              </label>

              <input
                id="organisation"
                name="organisation"
                type="text"
                placeholder="Where are you writing from?"
                value={formData.organisation}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="form-field">
              <label htmlFor="subject">
                Subject <span>*</span>
              </label>

              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                disabled={loading}
                required
              >
                <option value="General enquiry">General enquiry</option>
                <option value="Volunteering">Volunteering</option>
                <option value="Partnership">Partnership</option>
                <option value="Donation">Donation</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="message">
                Message <span>*</span>
              </label>

              <textarea
                id="message"
                name="message"
                rows="7"
                placeholder="Tell us what you would like to discuss."
                value={formData.message}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>

            <div className="form-bottom">
              <button
                type="submit"
                className="send-button"
                disabled={loading}
                style={{ opacity: loading ? 0.6 : 1 }}
              >
                {loading ? "Sending..." : "Send message"}
                {!loading && <span aria-hidden="true">↗</span>}
              </button>

              <p>We usually reply within 2–3 working days.</p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Contact;