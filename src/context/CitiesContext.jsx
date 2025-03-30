import { createContext, useState, useEffect, useContext } from "react";
import { getVisitedCities, getVisitedCityById } from "../services/api";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);

const CitiesContext = createContext();

// Helper: Country name → ISO Alpha-2 code
function getCountryCodeFromName(name) {
  return countries.getAlpha2Code(name, "en");
}

// Helper: Country code → Emoji flag
export function convertToEmoji(countryCode) {
  if (!countryCode || countryCode.length !== 2) return "🌍";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  const fetchCities = async () => {
    try {
      setIsLoading(true);
      const rawData = await getVisitedCities();

      const dataWithEmoji = rawData.map((city) => {
        const code = getCountryCodeFromName(city.countryName);
        const emoji = code ? convertToEmoji(code) : "🌍";
        return { ...city, emoji };
      });

      setCities(dataWithEmoji);
    } catch (err) {
      console.error("Failed to fetch cities", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const data = await getVisitedCityById(id);

      const code = getCountryCodeFromName(data.countryName);
      const emoji = code ? convertToEmoji(code) : "🌍";

      setCurrentCity({ ...data, emoji });
    } catch {
      alert("There is an error fetching cities");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        fetchCities,
        getCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Cities Context was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };