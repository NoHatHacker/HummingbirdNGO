import { useRef, useState } from "react";
import "./Contact.css";

const enquiryTypes = [
  {
    value: "General enquiry",
    title: "General enquiry",
    description: "Questions about the organisation, its work, or upcoming events.",
  },
  {
    value: "Volunteering",
    title: "Volunteering",
    description: "Tell us how you would like to contribute your time or skills.",
  },
  {
    value: "Partnership",
    title: "Partnership",
    description: "For organisations, communities, colleges, and collaborators.",
  },
];

const initialFormData = {
  fullName: "",
  email: "",
  organisation: "",
  subject: "General enquiry",
  message: "",
};

function Contact() {
  const formSectionRef = useRef(null);
  const subjectFieldRef = useRef(null);

  const [formData, setFormData] = useState(initialFormData);
  const [showSubmissionNotice, setShowSubmissionNotice] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setShowSubmissionNotice(false);

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleTopicClick = (subject) => {
    setShowSubmissionNotice(false);

    setFormData((currentData) => ({
      ...currentData,
      subject,
    }));

    formSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    window.setTimeout(() => {
      subjectFieldRef.current?.focus({
        preventScroll: true,
      });
    }, 500);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    /*
      Connect the form to the project backend or form service here.
      Until then, this notice makes it clear that no message was delivered.
    */
    setShowSubmissionNotice(true);
  };

  return (
    <main className="contact-page">
      <div className="container">
        <header className="contact-header">
          <p className="contact-kicker">Contact</p>

          <h1>Questions, ideas, or a way to help?</h1>

          <p className="contact-introduction">
            We would like to hear from people who want to learn more about
            Hummingbird NGO, volunteer with us, or explore working together.
          </p>
        </header>

        <section className="contact-layout">
          <aside className="contact-sidebar">
            <div className="contact-sidebar-heading">
              <p className="contact-sidebar-label">Choose a topic</p>
              <h2>What are you writing about?</h2>

              <p>
                Select the option closest to your enquiry. We will add it to the
                form automatically.
              </p>
            </div>

            <div
              className="contact-topic-list"
              aria-label="Contact enquiry types"
            >
              {enquiryTypes.map((topic) => {
                const isSelected = formData.subject === topic.value;

                return (
                  <button
                    className={`contact-topic ${
                      isSelected ? "contact-topic-selected" : ""
                    }`}
                    type="button"
                    key={topic.value}
                    aria-pressed={isSelected}
                    onClick={() => handleTopicClick(topic.value)}
                  >
                    <span className="contact-topic-content">
                      <strong>{topic.title}</strong>
                      <small>{topic.description}</small>
                    </span>

                    <span className="contact-topic-arrow" aria-hidden="true">
                      →
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="contact-message-guide">
              <h3>A useful message usually includes</h3>

              <ul>
                <li>A little context about your enquiry</li>
                <li>What kind of response or support you need</li>
                <li>Any relevant links or dates</li>
              </ul>
            </div>
          </aside>

          <div className="contact-form-section" ref={formSectionRef}>
            <div className="contact-form-heading">
              <div>
                <p className="contact-form-label">Send a message</p>
                <h2>Write to us</h2>
              </div>

              <p>
                Fields marked with <span>*</span> are required.
              </p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <div className="contact-field">
                  <label htmlFor="fullName">
                    Full name <span>*</span>
                  </label>

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your name"
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="email">
                    Email address <span>*</span>
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="contact-field">
                <label htmlFor="organisation">
                  Organisation or college
                  <small>Optional</small>
                </label>

                <input
                  id="organisation"
                  name="organisation"
                  type="text"
                  value={formData.organisation}
                  onChange={handleChange}
                  placeholder="Where are you writing from?"
                  autoComplete="organization"
                />
              </div>

              <div className="contact-field">
                <label htmlFor="subject">
                  Subject <span>*</span>
                </label>

                <select
                  ref={subjectFieldRef}
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="General enquiry">General enquiry</option>
                  <option value="Volunteering">Volunteering</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Donation">Donation</option>
                  <option value="Events">Events</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="contact-field">
                <label htmlFor="message">
                  Message <span>*</span>
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what you would like to discuss."
                  rows="7"
                  required
                />
              </div>

              {showSubmissionNotice && (
                <div className="contact-development-notice" role="status">
                  <strong>No message was sent.</strong>

                  <p>
                    The form interface is working, but it still needs to be
                    connected to the project backend before deployment.
                  </p>
                </div>
              )}

              <div className="contact-form-footer">
                <button className="contact-submit-button" type="submit">
                  Send message
                  <span aria-hidden="true">→</span>
                </button>

                <p>
                  Please do not include passwords, banking information, or
                  sensitive documents.
                </p>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Contact;