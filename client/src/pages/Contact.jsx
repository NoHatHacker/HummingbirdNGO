import { useRef, useState } from "react";
import "./Contact.css";

const contactOptions = [
  {
    title: "General Enquiry",
    description:
      "Questions about Hummingbird NGO, our work, events, or initiatives.",
    value: "General Enquiry",
  },
  {
    title: "Volunteer With Us",
    description:
      "Interested in contributing your time, skills, or ideas to our mission.",
    value: "Volunteering",
  },
  {
    title: "Partnership",
    description:
      "Connect with us for institutional, community, or project partnerships.",
    value: "Partnership",
  },
];

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function Contact() {
  const formSectionRef = useRef(null);
  const messageFieldRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "General Enquiry",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleContactOptionClick = (subject) => {
    setFormData((previousData) => ({
      ...previousData,
      subject,
    }));

    formSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    window.setTimeout(() => {
      messageFieldRef.current?.focus();
    }, 700);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setSubmitted(true);

    setFormData({
      fullName: "",
      email: "",
      subject: "General Enquiry",
      message: "",
    });

    window.setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero-content">
            <span className="contact-eyebrow">
              <span className="contact-eyebrow-dot" />
              Contact Hummingbird
            </span>

            <h1>
              Let&apos;s start a
              <span> meaningful conversation.</span>
            </h1>

            <p>
              Have a question, an idea, or an interest in supporting our work?
              Reach out to our team and tell us how you would like to connect.
            </p>
          </div>
        </div>
      </section>

      <section className="contact-content-section">
        <div className="container">
          <div className="contact-layout">
            <aside className="contact-info-panel">
              <div className="contact-info-heading">
                <span className="contact-section-label">Get in touch</span>

                <h2>We would love to hear from you.</h2>

                <p>
                  Choose the most convenient way to contact us. Our team will
                  review your message and respond as soon as possible.
                </p>
              </div>

              <div className="contact-details-list">
                <div className="contact-detail">
                  <span className="contact-detail-icon">
                    <MailIcon />
                  </span>

                  <div>
                    <span className="contact-detail-label">Email us</span>

                    <a href="mailto:contact@hummingbirdngo.org">
                      official email to be added
                    </a>
                  </div>
                </div>

                <div className="contact-detail">
                  <span className="contact-detail-icon">
                    <PhoneIcon />
                  </span>

                  <div>
                    <span className="contact-detail-label">Call us</span>
                    <span>Official phone number to be added</span>
                  </div>
                </div>

                <div className="contact-detail">
                  <span className="contact-detail-icon">
                    <LocationIcon />
                  </span>

                  <div>
                    <span className="contact-detail-label">Visit us</span>
                    <span>Official office address to be added</span>
                  </div>
                </div>

                <div className="contact-detail">
                  <span className="contact-detail-icon">
                    <ClockIcon />
                  </span>

                  <div>
                    <span className="contact-detail-label">Availability</span>
                    <span>Monday to Saturday</span>
                  </div>
                </div>
              </div>

              <div className="contact-note">
                <span className="contact-note-icon">✦</span>

                <div>
                  <strong>Every message matters.</strong>

                  <p>
                    Please share enough detail so that your enquiry can reach
                    the right member of our team.
                  </p>
                </div>
              </div>
            </aside>

            <div className="contact-form-card" ref={formSectionRef}>
              <div className="contact-form-heading">
                <span className="contact-section-label">Send a message</span>

                <h2>How can we help?</h2>

                <p>
                  Fill out the form below and tell us what you would like to
                  discuss.
                </p>
              </div>

              {submitted && (
                <div className="contact-success" role="status">
                  <span>✓</span>

                  <div>
                    <strong>Your message has been recorded.</strong>

                    <p>
                      Thank you for contacting Hummingbird NGO. Form delivery
                      will be enabled when the backend is connected.
                    </p>
                  </div>
                </div>
              )}

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form-row">
                  <div className="contact-form-group">
                    <label htmlFor="fullName">
                      Full name <span>*</span>
                    </label>

                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      autoComplete="name"
                      required
                    />
                  </div>

                  <div className="contact-form-group">
                    <label htmlFor="email">
                      Email address <span>*</span>
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                <div className="contact-form-group">
                  <label htmlFor="subject">
                    What would you like to discuss? <span>*</span>
                  </label>

                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="General Enquiry">General enquiry</option>
                    <option value="Volunteering">Volunteering</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Donation">Donation</option>
                    <option value="Media Enquiry">Media enquiry</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="contact-form-group">
                  <label htmlFor="message">
                    Your message <span>*</span>
                  </label>

                  <textarea
                    ref={messageFieldRef}
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    rows="6"
                    required
                  />
                </div>

                <button className="contact-submit-button" type="submit">
                  Send message
                  <ArrowIcon />
                </button>

                <p className="contact-form-disclaimer">
                  Please do not include passwords, banking information, or
                  other sensitive personal details.
                </p>
              </form>
            </div>
          </div>

          <div className="contact-options">
            <div className="contact-options-heading">
              <span className="contact-section-label">
                Reasons to contact us
              </span>

              <h2>Find the right starting point.</h2>
            </div>

            <div className="contact-option-grid">
              {contactOptions.map((option, index) => (
                <button
                  className="contact-option-card"
                  type="button"
                  key={option.title}
                  onClick={() => handleContactOptionClick(option.value)}
                >
                  <span className="contact-option-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h3>{option.title}</h3>
                    <p>{option.description}</p>
                  </div>

                  <span className="contact-option-arrow">
                    <ArrowIcon />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;