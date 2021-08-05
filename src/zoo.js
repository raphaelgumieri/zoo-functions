/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/
// const { TestScheduler } = require("@jest/core");
const { animals, employees, prices, hours } = require('./data');
// const data = require("./data");

function animalsByIds(...ids) {
  const spreadedArray = ids;
  const result = [];
  spreadedArray.forEach((id) => {
    result.push(animals.find((animal) => animal.id === id));
  });
  return result;
}

function animalsOlderThan(animal, age) {
  const arrayAnimal = animals.find((item) => item.name === animal).residents;
  return arrayAnimal.every((value) => value.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find(
    (employee) =>
      employee.firstName === employeeName
      || employee.lastName === employeeName,
  );
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const mapped = employees.map((employee) => employee.managers);
  const array = [].concat(...mapped);
  return array.some((value) => value === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  const animalResidentAmount = {};
  animals.forEach((animal) => { animalResidentAmount[animal.name] = animal.residents.length; });
  return species === undefined ? animalResidentAmount : animalResidentAmount[species];
}

function entryCalculator(entrants) {
  if (!entrants) return 0;
  const keys = Object.keys(entrants);
  return keys.reduce((a, b) => a + entrants[b] * prices[b], 0);
}

// function animalMap(options) {

// }

function schedule(dayName) {
  const keys = Object.keys(hours);
  const obj = {};
  keys.forEach((k) => { obj[k] = `Open from ${hours[k].open}am until ${hours[k].close - 12}pm`; });
  obj.Monday = 'CLOSED';

  if (!dayName) return obj;
  return { [dayName]: obj[dayName] };
}

function oldestFromFirstSpecies(id) {
  const responsibleFor = employees.find((employee) => employee.id === id).responsibleFor[0]; // captura as informações animais que estão no cuidado do id passado;
  const { residents } = animals.find((animal) => animal.id === responsibleFor); // isola o primeiro animal que está em cuidado do id pasasdo;
  const maxAge = residents.reduce((acc, curr) => Math.max(acc, curr.age), 0); // reduz para o maior valor com base na idade;
  const oldestAnimalInfo = residents.find((animal) => animal.age === maxAge); // busca as informações com base na idade do animal, passado na const age;
  return [oldestAnimalInfo.name, oldestAnimalInfo.sex, oldestAnimalInfo.age];
}

function increasePrices(percentage) {
  const percent = percentage / 100;
  const pricesKeys = Object.keys(prices);
  pricesKeys.forEach((item) => { prices[item] *= (1 + percent); });
  pricesKeys.forEach((value) => { prices[value] = Math.round(prices[value] * 100) / 100; });
}

function employeeCoverage(idOrName) {
  const object = {};
  employees.forEach((employee) => {
    const FirstLastName = `${employee.firstName} ${employee.lastName}`;
    const mappedName = employee.responsibleFor.map((value) => animalsByIds(value)[0].name);
    object[FirstLastName] = mappedName;
  });

  if (!idOrName) return object;

  const find = employees.find(({
    id, firstName, lastName }) =>
    idOrName === id
    || idOrName === firstName
    || idOrName === lastName);
  const key = `${find.firstName} ${find.lastName}`;
  return { [key]: object[key] };
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  // animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
