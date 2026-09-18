import styles from "./Timeline.module.css";

import { useState } from "react";

export default function Timeline() {

    const event = [
  {
    id: 1,
    title: "Food Drive",
    date: "2026-06-12",
    location: "Vellore",
    image: "/images/food.jpg",
    description: "Distributed meals to over 180 families.",
    volunteers: 42,
    impact: "180+ Meals"
  },

  {
    id: 2,
    title: "Old Age Home Visit",
    date: "2026-04-04",
    location: "Chennai",
    image: "/images/oldage.jpg",
    description: "Spent a day with senior citizens.",
    volunteers: 18,
    impact: "65 Residents"
  },

  {
    id: 3,
    title: "Blood Donation Camp",
    date: "2025-12-18",
    location: "Vellore",
    image: "/images/blood.jpg",
    description: "Blood donation drive.",
    volunteers: 70,
    impact: "120 Units"
  }
];

    const sortedEvents = [...event].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    const [selectedEvent, setSelectedEvent] = useState(sortedEvents[0]);

    const groupedEvents = sortedEvents.reduce((groups, event) => {

        const year = new Date(event.date).getFullYear();

        if (!groups[year]) {
            groups[year] = [];
        }

        groups[year].push(event);

        return groups;

    }, {});

    return (

        <section className={styles.timeline}>

            <div className={styles.timelineLeft}>

                {Object.entries(groupedEvents).map(([year, yearEvents]) => (

                    <div key={year} className={styles.yearBlock}>

                        <h2 className={styles.year}>
                            {year}
                        </h2>

                        {yearEvents.map((event) => (

                            <div
                                key={event.id}
                                className={styles.timelineItem}
                            >

                                <div className={styles.dot}></div>

                                <div>

                                    <h4>{event.title}</h4>

                                    <p>
                                        {new Date(event.date).toLocaleDateString()}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                ))}

            </div>
            <div className={styles.timelineRight}>

                <section className={styles.eventCard}>

                    <img
                        src={selectedEvent.image}
                        alt={selectedEvent.title}
                    />

                    <h1>{selectedEvent.title}</h1>

                    <p>{selectedEvent.description}</p>

                    <div className={styles.stats}>

                        <span>{selectedEvent.impact}</span>

                        <span>
                            {selectedEvent.volunteers} Volunteers
                        </span>

                    </div>

                </section>

            </div>

        </section>

    );

}