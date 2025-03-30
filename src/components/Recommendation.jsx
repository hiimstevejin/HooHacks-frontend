import { useAi } from "../context/AiContext";
import styles from "./Recommendation.module.css";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import Spinner from "./Spinner";

// Register English locale for country name lookup
countries.registerLocale(enLocale);

// Convert country name → ISO Alpha-2 code
function getCountryCodeFromName(name) {
  return countries.getAlpha2Code(name, "en");
}

// Convert ISO country code → flag emoji
function convertToEmoji(countryCode) {
  if (!countryCode || countryCode.length !== 2) return "🌍";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Recommendation() {
  const { data, isLoading, refreshData } = useAi();

  if (isLoading) {
    return <Spinner/>;
  }

  return (
    <>
      <button className={styles.refreshButton} onClick={refreshData}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="23 4 23 10 17 10"></polyline>
          <polyline points="1 20 1 14 7 14"></polyline>
          <path d="M3.51 9a9 9 0 0 1 14.13-3.36L23 10M1 14l5.34 4.66A9 9 0 0 0 20.49 15"></path>
        </svg>
      </button>

      <div className={styles.container}>
        {data.map((rec) => (
          <div key={rec.id} className={styles.card}>
            <div className={styles.cardInner}>
              <div className={styles.cardFront}>
                <div className={styles.flagEmoji}>
                  {convertToEmoji(getCountryCodeFromName(rec.countryName))}
                </div>
                <h2 className={styles.cityName}>{rec.cityName}</h2>
              </div>

              <div className={styles.cardBack}>
                <p className={styles.climate}>
                  <strong>Climate:</strong> {rec.climate}
                </p>
                <p className={styles.exchangeRate}>
                  <strong>Exchange Rate (USD):</strong> {rec.exchangeRateUsd}
                </p>
                <div className={styles.touristSpots}>
                  <strong>Tourist Spots:</strong>
                  <ul>
                    {rec.touristSpots.map((spot, index) => (
                      <li key={index}>{spot}</li>
                    ))}
                  </ul>
                </div>
                <p className={styles.reason}>
                  <strong>Reason:</strong> {rec.reason}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Recommendation;