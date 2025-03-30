import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { submitTripData } from "../../services/api";
import styles from "./Form.module.css";
import Button from "../Button";
import BackButton from "../BackButton";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract query parameters
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const latFromQuery = query.get("lat");
    const lngFromQuery = query.get("lng");
    if (latFromQuery && lngFromQuery) {
      setLat(latFromQuery);
      setLng(lngFromQuery);
    }
  }, [location.search]);

  // State for lat, lng, cityName, date, and notes
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [cityName, setCityName] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [liked, setLiked] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ lat, lng, cityName, date, notes,liked });
    const formData = { lat, lng, cityName, date, notes, liked };
    try {
      const result = await submitTripData(formData);
      console.log("POST successful", result);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="lat">Latitude</label>
        <input
          id="lat"
          value={lat}
          readOnly
          // Alternatively, if you want the user to be able to edit it, remove readOnly.
        />
      </div>
      
      <div className={styles.row}>
        <label htmlFor="lng">Longitude</label>
        <input
          id="lng"
          value={lng}
          readOnly
          // Alternatively, if you want the user to be able to edit it, remove readOnly.
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="cityName">City Name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
          placeholder="Enter city name"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="date">Date of Visit</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
          <label htmlFor="liked">Enjoyed your trip?</label>
          <input id="liked" type="checkbox" checked={liked} 
          onChange={(e)=>setLiked(e.target.checked)}
          className={styles.thumbCheckbox}/>
        </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
          placeholder="Enter your notes"
        />
      </div>

      <div className={styles.buttons}>
        <BackButton />
        <Button type="submit">Add</Button>
      </div>
    </form>
  );
}


export default Form;
