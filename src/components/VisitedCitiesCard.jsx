import VisitedCityItem from "./VisitedCityItem";
import styles from "./VisitedCitiesCard.module.css";

function VisitedCitiesCard({ cities }) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Visited Cities</h2>
      {cities && cities.length > 0 ? (
        <div className={styles.listContainer}>
        <ul className={styles.list}>
          {cities.map((city) => (
            <VisitedCityItem key={city.id} city={city} />
          ))}
        </ul>
        </div>
      ) : (
        <p className={styles.noCities}>No visited cities yet.</p>
      )}
    </div>
  );
}

export default VisitedCitiesCard;
