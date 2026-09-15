import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import styles from "./guwahati.module.css";

export default function Guwahati() {
  const navigate = useNavigate();
  const [directors, setDirectors] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackEvents = [
    { _id: "fb-1", title: "Community Health Camp", description: "Organized a free health screening camp serving over 200 residents in the Guwahati region.", date: "2024-03-15", location: "Guwahati", images: ["https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=400&q=80"] },
    { _id: "fb-2", title: "Education Drive", description: "Distributed school supplies and conducted educational workshops for underprivileged children.", date: "2024-06-10", location: "Guwahati", images: ["https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=80"] },
    { _id: "fb-3", title: "Flood Relief", description: "Rapid response team provided emergency relief materials to families affected by monsoon flooding.", date: "2024-08-22", location: "Guwahati", images: ["https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=400&q=80"] },
  ];


  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await api.get("/members?regionalCircle=guwahati");
        setDirectors(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events?regionalCircle=guwahati");
        setEvents(res.data && res.data.length > 0 ? res.data : fallbackEvents);
      } catch (e) { setEvents(fallbackEvents); }
    };
    fetchEvents();
  }, []);


  if (loading) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          <p style={{ textAlign: "center", padding: "2rem" }}>Loading team members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.teamSec}>
          <div className={styles.teamSectionRow}>
            <div>
              <h2 className={styles.teamSecTitle}>Guwahati Coordinators</h2>
              <p className={styles.teamSecSubtitle}>
                Leading grassroots initiatives and community outreach across Guwahati region.
              </p>
            </div>
          </div>

          {directors.length === 0 ? (
            <p style={{ textAlign: "center", padding: "2rem", color: "#64748b" }}>
              No team members assigned to Guwahati circle yet.
            </p>
          ) : (
            <div className={styles.visionariesGrid}>
              {directors.map((member) => (
                <div
                  key={member._id}
                  className={styles.visionaryCard}
                  onClick={() => navigate(member.path || "/")}
                >
                  <div>
                    <div
                      className={styles.avatarRingWrapper}
                      onClick={() => navigate(member.path || "/")}
                    >
                      <img
                        src={member.image || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"}
                        alt={member.name}
                      />
                    </div>
                    <p className={styles.visRole}>{member.role}</p>
                    {member.quote && <p className={styles.visQuote}>{member.quote}</p>}
                    <div className={styles.visKeep}>
                      <h3 className={styles.visName}>{member.name}</h3>
                      {member.age && <p className={styles.visAge}>Age: {member.age}</p>}
                      {member.servingSince && (
                        <p className={styles.visServingSince}>
                          Serving Since: {new Date(member.servingSince).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                        </p>
                      )}
                      {member.qualifications && member.qualifications.length > 0 && (
                        <div className={styles.visQualifications}>
                          <h4>Qualifications:</h4>
                          <div className={styles.qualificationList}>
                            {member.qualifications.map((qualification, index) => (
                              <li key={index}>
                                {qualification.qual} ({qualification.year})
                              </li>
                            ))}
                          </div>
                        </div>
                      )}
                      {member.achievements && member.achievements.length > 0 && (
                        <div className={styles.visAchievements}>
                          <h4>Achievements:</h4>
                          <div className={styles.achievementList}>
                            {member.achievements.map((achievement, index) => (
                              <li key={index}>
                                {achievement.title} ({achievement.year})
                              </li>
                            ))}
                          </div>
                        </div>
                      )}
                      {member.bio && (
                        <>
                          <p className={styles.visBio1}>Bio:</p>
                          <p className={styles.visBio}>{member.bio}</p>
                        </>
                      )}
                    </div>
                  </div>
                  <div className={styles.visSocials}>
                    <span>🌐</span>
                    <span>✉️</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className={styles.eventSec}>
            <div>
              <h2 className={styles.eventSecTitle}>Recent Events</h2>
              <p className={styles.eventSecSubtitle}>
                Key initiatives and community programs organized by the Guwahati circle.
              </p>
            </div>
          </div>

          <div className={styles.eventGrid}>
            {events.map((event) => (
              <div
                key={event._id || event.id}
                className={styles.eventCard}
                onClick={() => navigate(event.path || "/")}
              >
                <div>
                  <div className={styles.eventImg}>
                    <img src={(event.images && event.images[0]) || event.image || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=400&q=80"} alt={event.title || event.name} />
                  </div>
                  <div className={styles.eventDetails}>
                    <p className={styles.eveName}>{event.title || event.name}</p>
                    <p className={styles.eveDate}>{event.date ? new Date(event.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : event.date}</p>
                    <p className={styles.eveInfo}>{event.description || event.info}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}