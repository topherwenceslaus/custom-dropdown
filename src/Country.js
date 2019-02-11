const defaultCountriesData = [
  ['United Kingdom', 'gb', '44', 0],
  ['United States', 'us', '1', 0],
  ['India', 'in', '91'],
  ['Australia', 'au', '61', 0],
  ['New Zealand', 'nz', '64']
]

const  getCountries = ()  => {
  return defaultCountriesData.map(country => ({
    name: country[0],
    iso2: country[1],
    dialCode: country[2],
    priority: country[3] || 0,
    areaCodes: country[4] || null,
  }));
}

const AllCountries = {
  getCountries
};
export default AllCountries
