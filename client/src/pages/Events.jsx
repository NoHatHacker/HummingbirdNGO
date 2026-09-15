import { useState, useEffect } from "react";
import api from "../services/api";
import "./Events.css";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fallbackEvents = [
    {
      _id: "fb-1",
      date: "2026-10-22",
      images: ["https://images.unsplash.com/photo-1511497584788-8767610419ea?auto=format&fit=crop&w=600&q=80"],
      category: "WORKSHOP",
      title: "Sustainable Habitat Building",
      description: "Learn advanced modular techniques for creating temporary shelters in climate-affected zones.",
      location: "📍 Berlin Innovation Hub",
    },
    {
      _id: "fb-2",
      date: "2026-11-05",
      images: ["https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80"],
      category: "FIELD MISSION",
      title: "Health Cloud Deployment",
      description: "Support our tech team as we launch decentralized health records in rural clinics.",
      location: "📍 Hanoi Medical Plaza",
    },
    {
      _id: "fb-3",
      date: "2026-11-18",
      images: ["https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"],
      category: "VOLUNTEER TRAINING",
      title: "Hummingbird Ambassador Summit",
      description: "Our annual briefing for global ambassadors. Align on the upcoming impact roadmap and strategic goals.",
      location: "📍 The Shard Conference Center",
    },
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await api.get("/events");
        if (res.data && res.data.length > 0) {
          setEvents(res.data);
        } else {
          setEvents(fallbackEvents);
        }
      } catch (err) {
        console.error("Failed to fetch events:", err);
        setError("Showing scheduled highlight missions");
        setEvents(fallbackEvents);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDateBadge = (dateString) => {
    if (!dateString) return "UPCOMING";
    try {
      const d = new Date(dateString);
      if (isNaN(d.getTime())) return dateString;
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric" }).toUpperCase();
    } catch {
      return "UPCOMING";
    }
  };

  const getEventImage = (event) => {
    if (event.images && event.images.length > 0 && event.images[0]) {
      return event.images[0];
    }
    return "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80";
  };

  const featuredEvent = events[0] || fallbackEvents[0];
  const displayEvents = events.length > 0 ? events : fallbackEvents;

  return (
    <div className="page-wrapper events-page">
      <div className="container">
        {/* Hero Header */}
        <div className="events-hero">
          <div className="events-badge">
            <span className="pulse-dot"></span> LIVE GLOBAL OPERATIONS
          </div>
          <h1 className="events-title">
            Wings of Change: <br />
            <span className="highlight-blue">Our Journey Together.</span>
          </h1>
          <p className="events-desc">
            Join Hummingbird NGO at our upcoming flights and missions. Whether it's a field
            operation or a community initiative, your presence creates the momentum needed for
            impact.
          </p>
        </div>

        {/* Featured + Calendar Grid */}
        <div className="events-top-grid">
          {/* Featured Event Card */}
          <div className="featured-event-card">
            <div className="featured-img-wrapper">
              <img
                src={getEventImage(featuredEvent)}
                alt={featuredEvent.title}
              />
              <span className="featured-badge">Featured Event</span>
            </div>
            <div className="featured-content">
              <div>
                <span className="featured-category">{featuredEvent.category || "COMMUNITY INITIATIVE"}</span>
                <h2 className="featured-title">{featuredEvent.title}</h2>
                <p className="featured-desc">
                  {featuredEvent.description}
                </p>
                <div className="featured-meta">
                  <span>📅 {featuredEvent.date ? new Date(featuredEvent.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "Scheduled Soon"}</span>
                  <span>{featuredEvent.location || "📍 Regional Chapters"}</span>
                </div>
              </div>
              <a href="/contact" className="btn-secure-invitation" style={{ textDecoration: "none", textAlign: "center" }}>
                Secure Invitation ➔
              </a>
            </div>
          </div>

          {/* Active Missions Calendar Card */}
          <div className="calendar-card">
            <div>
              <div className="calendar-header">
                <h3 className="calendar-title">Active Missions</h3>
                <div className="calendar-nav-btns">
                  <span className="cal-nav-btn">‹</span>
                  <span className="cal-nav-btn">›</span>
                </div>
              </div>
              <div className="calendar-month">Field Deployment Schedule</div>

              <div className="calendar-grid">
                <span className="cal-day-name">M</span>
                <span className="cal-day-name">T</span>
                <span className="cal-day-name">W</span>
                <span className="cal-day-name">T</span>
                <span className="cal-day-name">F</span>
                <span className="cal-day-name">S</span>
                <span className="cal-day-name">S</span>

                <span className="cal-date muted">29</span>
                <span className="cal-date">1</span>
                <span className="cal-date">2 <span className="cal-dot"></span></span>
                <span className="cal-date">3</span>
                <span className="cal-date">4</span>
                <span className="cal-date">5</span>
                <span className="cal-date">6</span>

                <span className="cal-date">7</span>
                <span className="cal-date">8 <span className="cal-dot"></span></span>
                <span className="cal-date">9</span>
                <span className="cal-date active-today">10</span>
                <span className="cal-date">11</span>
                <span className="cal-date">12</span>
                <span className="cal-date">13</span>

                <span className="cal-date">14</span>
                <span className="cal-date">15 <span className="cal-dot"></span></span>
                <span className="cal-date">16</span>
                <span className="cal-date">17</span>
                <span className="cal-date">18</span>
                <span className="cal-date">19 <span className="cal-dot"></span></span>
                <span className="cal-date">20</span>
              </div>
            </div>

            <div className="todays-flight-box">
              <div className="tf-label">Active Field Initiative</div>
              <div className="tf-title">Flood Relief & Health Camp: Barpeta</div>
              <div className="tf-progress"></div>
              <a href="/team/regional_circles/barpeta" className="tf-link">View Regional Circle</a>
            </div>
          </div>
        </div>

        {/* Upcoming Flights */}
        <div>
          <div className="upcoming-section-header">
            <h2 className="upcoming-title">Upcoming Operations & Events</h2>
            {loading && <span style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>Syncing live missions...</span>}
          </div>

          <div className="upcoming-grid">
            {displayEvents.map((flight) => (
              <div key={flight._id || flight.id} className="flight-card">
                <div>
                  <div className="flight-img-wrapper">
                    <img src={getEventImage(flight)} alt={flight.title} />
                    <span className="date-tag-badge">{formatDateBadge(flight.date)}</span>
                  </div>
                  <div className="flight-card-body">
                    <span className="flight-category">{flight.category || "MISSION"}</span>
                    <h3 className="flight-name">{flight.title}</h3>
                    <p className="flight-desc">{flight.description}</p>
                    <p className="flight-loc">{flight.location || "📍 Assam Chapters"}</p>
                  </div>
                </div>
                <div className="flight-card-footer">
                  <a href="/contact" className="btn-secure-invitation" style={{ width: "100%", justifyContent: "center", textDecoration: "none" }}>
                    RSVP / Inquire
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;
