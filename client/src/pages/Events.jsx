import Timeline from "../components/Timeline.jsx";

import "./Events.css";
import { useState } from "react";

export default function Events() {

  const events = [
  {
    id: 1,
    title: "Food Drive",
    date: "2026-06-12",
    location: "Vellore",
    image: "./public/hummingbird-hero.jpg",
    description: "Distributed meals to over 180 families.",
    volunteers: 42,
    impact: "180+ Meals"
  },

  {
    id: 2,
    title: "Old Age Home Visit",
    date: "2026-04-04",
    location: "Chennai",
    image: "./public/hummingbird-hero.jpg",
    description: "Spent a day with senior citizens.",
    volunteers: 18,
    impact: "65 Residents"
  },

  {
    id: 3,
    title: "Blood Donation Camp",
    date: "2025-12-18",
    location: "Vellore",
    image: "./public/hummingbird-hero.jpg",
    description: "Blood donation drive.",
    volunteers: 70,
    impact: "120 Units"
  },
  {
    id: 4,
    date: "NOV 18",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    category: "VOLUNTEER TRAINING",
    title: "Hummingbird Ambassador Summit",
    description: "Our annual briefing for global ambassadors. Align on the 2025 impact roadmap and strategic goals.",
    location: "📍 The Shard Conference Center",
  },
  {
    id: 5,
    date: "NOV 18",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    category: "VOLUNTEER TRAINING",
    title: "Hummingbird Ambassador Summit",
    description: "Our annual briefing for global ambassadors. Align on the 2025 impact roadmap and strategic goals.",
    location: "📍 The Shard Conference Center",
  },
  {
    id: 6,
    date: "NOV 18",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    category: "VOLUNTEER TRAINING",
    title: "Hummingbird Ambassador Summit",
    description: "Our annual briefing for global ambassadors. Align on the 2025 impact roadmap and strategic goals.",
    location: "📍 The Shard Conference Center",
  },
  {
    id: 7,
    date: "NOV 18",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    category: "VOLUNTEER TRAINING",
    title: "Hummingbird Ambassador Summit",
    description: "Our annual briefing for global ambassadors. Align on the 2025 impact roadmap and strategic goals.",
    location: "📍 The Shard Conference Center",
  },
  {
    id: 8,
    date: "NOV 18",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    category: "VOLUNTEER TRAINING",
    title: "Hummingbird Ambassador Summit",
    description: "Our annual briefing for global ambassadors. Align on the 2025 impact roadmap and strategic goals.",
    location: "📍 The Shard Conference Center",
  },
  {
    id: 9,
    date: "NOV 18",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    category: "VOLUNTEER TRAINING",
    title: "Hummingbird Ambassador Summit",
    description: "Our annual briefing for global ambassadors. Align on the 2025 impact roadmap and strategic goals.",
    location: "📍 The Shard Conference Center",
  },
  {
    id: 10,
    date: "NOV 18",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    category: "VOLUNTEER TRAINING",
    title: "Hummingbird Ambassador Summit",
    description: "Our annual briefing for global ambassadors. Align on the 2025 impact roadmap and strategic goals.",
    location: "📍 The Shard Conference Center",
  },
];

const upcomingFlights = [
  {
    id: 1,
    date: "OCT 22",
    image: "https://images.unsplash.com/photo-1511497584788-8767610419ea?auto=format&fit=crop&w=600&q=80",
    category: "WORKSHOP",
    title: "Sustainable Habitat Building",
    description: "Learn advanced modular techniques for creating temporary shelters in climate-affected zones.",
    location: "📍 Berlin Innovation Hub",
  },
  {
    id: 2,
    date: "NOV 05",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
    category: "FIELD MISSION",
    title: "Health Cloud Deployment",
    description: "Support our tech team as we launch decentralized health records in rural clinics.",
    location: "📍 Hanoi Medical Plaza",
  },
  {
    id: 3,
    date: "NOV 18",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    category: "VOLUNTEER TRAINING",
    title: "Hummingbird Ambassador Summit",
    description: "Our annual briefing for global ambassadors. Align on the 2025 impact roadmap and strategic goals.",
    location: "📍 The Shard Conference Center",
  },
  
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [open, setOpen] = useState(false);
  const eventsPerPage = 6;
  const totalPages = Math.ceil(events.length / eventsPerPage);
  const currentEvents = showAll 
    ? events 
    : events.slice(currentPage * eventsPerPage, (currentPage + 1) * eventsPerPage);
  const goToNextPage = () => {
    if (!showAll && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (!showAll && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
    if (!showAll) {
      setCurrentPage(0);
    }
  };
   const renderPaginationDots = () => {
    if (showAll || totalPages <= 1) return null;
     return (
      <div className="navigation-buttons">
        <button 
          className="nav-button prev" 
          onClick={goToPrevPage}
          disabled={currentPage === 0}
        >
          ← Prev
        </button>
        <span className="page-info">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button 
          className="nav-button next" 
          onClick={goToNextPage}
          disabled={currentPage === totalPages - 1}
        >
          Next →
        </button>
      </div>
    );
  };

   const renderNavigationButtons = () => {
    if (showAll || totalPages <= 1) return null;
    
    return (
      <div className="navigation-buttons">
        <button 
          className="nav-button prev" 
          onClick={goToPrevPage}
          disabled={currentPage === 0}
        >
          ← Prev
        </button>
        <span className="page-info">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button 
          className="nav-button next" 
          onClick={goToNextPage}
          disabled={currentPage === totalPages - 1}
        >
          Next →
        </button>
      </div>
    );
  };




  return (
    <div className="page-wrapper events-page">
      <div className="container">
        {/* Hero Header */}
        {/* <div className="events-hero">
          <div className="events-badge">
            <span className="pulse-dot"></span> LIVE GLOBAL OPERATIONS
          </div>
          <h1 className="events-title">
            Wings of Change: <br />
            <span className="highlight-blue">Our Journey Together.</span>
          </h1>
          <p className="events-desc">
            Join Hummingbird NGO at our upcoming flights and missions. Whether it's a field
            operation or a gala evening, your presence creates the momentum needed for
            global impact.
          </p>
        </div>*/}

        <div className="Hero">
          <div className="imgCont">
            <img src="./public/hummingbird-hero.jpg" className="HeroImg"></img>
          </div>
          <div className="imgContent">
            <span className="cont1">Changing lives</span>
            <p className="cont2">one flight at a time</p>
            <p className="cont3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error qui similique neque incidunt, quisquam odit, commodi dolores rerum quia eos autem dolore aliquid ratione excepturi adipisci? Enim deserunt quisquam vero?</p>
            <button>Join our Next Event</button>
          </div>
          <div className="HeroContent">
            <div className="content">
              <img src="./public/hummingbird-hero.jpg"></img>
              <span>20+</span>
              <p>Drives completed</p>
            </div>
            <div className="content">
              <img src="./public/hummingbird-hero.jpg"></img>
              <span>3000+</span>
              <p>Lives Impacted</p>
            </div>
            <div className="content">
              <img src="./public/hummingbird-hero.jpg"></img>
              <span>130+</span>
              <p>Volunteers</p>
            </div>
            <div className="content">
              <img src="./public/hummingbird-hero.jpg"></img>
              <span>5+</span>
              <p>Locations</p>
            </div>
          </div>
          
        </div>

        <div>
          <div className="upcoming-section-header">
            <h2 className="upcoming-title">Past Flights</h2>
            <button className="filter-select-btn">
              All Flight Types ▾
            </button>
          </div>

          <div className={`event-carousel ${showAll ? "expanded" : ""}`}>
      
      

      <div className="events-grid">
        {currentEvents.map(event => (
          <div key={event.id} className="event-card">
            <div className="event-image">
              <span>{event.image}</span>
            </div>
            <div className="event-details">
              <h3 className="event-title">{event.title}</h3>
              <p className="event-date">{event.date}</p>
              <p className="event-description">{event.description}</p>
              <button className="event-button">Register Now</button>
            </div>
          </div>
        ))}
      </div>

      
      {renderPaginationDots()}

      {!showAll && totalPages > 1 && (
        <div className="page-indicator">
          Showing page {currentPage + 1} of {totalPages}
        </div>
      )}

      <div className="controls">
        <button 
          className={`show-all-button ${showAll ? 'active' : ''} ` }
          onClick={()=>{toggleShowAll(); setOpen(!open)}}
        >
          {showAll ? 'Show Pages' : 'Show All Events'}
        </button>
      </div>
    </div>
        </div>

        {/* Upcoming Flights */}
        <div>
          <div className="upcoming-section-header">
            <h2 className="upcoming-title">Upcoming Flights</h2>
            <button className="filter-select-btn">
              All Flight Types ▾
            </button>
          </div>

          <div className="upcoming-grid">
            {upcomingFlights.map((flight) => (
              <div key={flight.id} className="flight-card">
                <div>
                  <div className="flight-img-wrapper">
                    <img src={flight.image} alt={flight.title} />
                    <span className="date-tag-badge">{flight.date}</span>
                  </div>
                  <div className="flight-card-body">
                    <span className="flight-category">{flight.category}</span>
                    <h3 className="flight-name">{flight.title}</h3>
                    <p className="flight-desc">{flight.description}</p>
                    <p className="flight-loc">{flight.location}</p>
                  </div>
                </div>
                <div className="flight-card-footer">
                  <button className="btn-secure-invitation" style={{ width: "100%", justifyContent: "center" }}>
                    Secure Invitation
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


