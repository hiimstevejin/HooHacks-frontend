import { useState } from "react";
import VisitedCitiesCard from "../components/VisitedCitiesCard";
import { Link } from "react-router-dom";
import styles from "./Profile.module.css";
import { useCities } from "../context/CitiesContext"; // Adjust the path as needed
import UserNav from "../components/Navbar/UserNav";

function Profile() {
  const { cities } = useCities();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter cities based on the search term (case-insensitive)
  const filteredCities = cities.filter((city) =>
    city.cityName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.background}>
      <section>
        <UserNav />

        <div>
          <input
            type="text"
            placeholder="Search cities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <div>
          <VisitedCitiesCard cities={filteredCities} />
        </div>
        <div>
          <Link to="/dashboard" className="cta">
            View on Map
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Profile;
