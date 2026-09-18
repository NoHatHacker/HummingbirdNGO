import styles from './TimeCont.module.css'
import events from "../Data/EventsData";

export default function Timeline() {
    return(
        <>
        <div className={styles.timelineItem}>

        <div className={styles.dot}></div>
            <div key={events.id}>
                <h4>{events.title}</h4>
                <p>
                    {new Date(events.date).toLocaleDateString()}
                </p>
            </div>

        </div>
        </>
    )
}