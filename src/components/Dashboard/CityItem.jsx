import { Link, useNavigate } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../../context/CitiesContext";
import { deleteVisitedCity } from "../../services/api"

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { currentCity, removeCityById } = useCities();
  const { cityName, emoji, date, id, lat, lng } = city;
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      await deleteVisitedCity(id);
      removeCityById(id);
      if (currentCity?.id === id) {
        navigate("/profile");
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${lat}&lng=${lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleDelete}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
