import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Spinner from "../Spinner";
import Message from "../Message";
import { useCities } from "../../context/CitiesContext";

function CountryList() {
  const {cities, isLoading} = useCities();
  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.countryName).includes(city.countryName))
      return [...arr, { country: city.countryName, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((countryName) => (
        <CountryItem country={countryName} key={countryName} />
      ))}
    </ul>
  );
}

export default CountryList;
