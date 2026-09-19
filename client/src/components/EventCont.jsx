export default function EventCont({ event }) {

    return (

        <section
            id={`event-${event.id}`}
            className="event-card"
        >

            <img
                src={event.image}
                alt={event.title}
            />

            <h1>{event.title}</h1>

            <p>{event.description}</p>

            <div className="stats">

                <span>{event.impact}</span>

                <span>{event.volunteers} Volunteers</span>

            </div>

        </section>

    );

}