import countries from './countriesData';

export const isValidCountry = (country) => countries.indexOf(country) > -1;

export const getCountries = () => countries;
