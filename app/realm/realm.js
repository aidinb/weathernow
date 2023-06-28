const CitySchema = {
  name: 'City',
  primaryKey: 'name',
  properties: {
    name: 'string',
    picture: 'string',
    temperatures: 'Temperatures[]',
  },
};

const temperatureSchema = {
  name: 'Temperatures',
  properties: {
    date: 'string',
    temp: 'float?',
    tempType: 'string',
  },
};
const schema = [CitySchema, temperatureSchema];

export default schema;
