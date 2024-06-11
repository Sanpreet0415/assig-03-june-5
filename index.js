// Constructor function for Car
function Car(make, model, year, isAvailable = true) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.isAvailable = isAvailable;
}

// Constructor function for Customer
function Customer(name, rentedCars = []) {
  this.name = name;
  this.rentedCars = rentedCars;
}

// Method to allow customers to rent a car
Customer.prototype.rentCar = function(car) {
  if (car.isAvailable) {
    car.isAvailable = false;
    this.rentedCars.push(car);
    console.log(`${this.name} rented a ${car.make} ${car.model}.`);
  } else {
    console.log(`Sorry, ${car.make} ${car.model} is already rented.`);
  }
};

// Constructor function for PremiumCustomer
function PremiumCustomer(name, discountRate, rentedCars = []) {
  Customer.call(this, name, rentedCars);
  this.discountRate = discountRate;
}

// Inherit from Customer
PremiumCustomer.prototype = Object.create(Customer.prototype);
PremiumCustomer.prototype.constructor = PremiumCustomer;

// Function to calculate rental prices
function calculateRentalPrice(car, days, isPremium) {
  let basePricePerDay = 50;
  let rentalPrice = basePricePerDay * days;
  if (isPremium) {
    rentalPrice *= (1 - car.discountRate / 100);
  }
  return rentalPrice;
}

// Method to allow customers to return a car
Customer.prototype.returnCar = function(car) {
  setTimeout(() => {
    car.isAvailable = true;
    this.rentedCars = this.rentedCars.filter(rentedCar => rentedCar !== car);
    console.log(`${this.name} returned the ${car.make} ${car.model}.`);
  }, 2000);
};

// Function to handle maintenance
function Maintenance(car, delay) {
  setTimeout(() => {
    car.isAvailable = true;
    console.log(`Maintenance completed for ${car.make} ${car.model}.`);
  }, delay);
}

// Create cars
const car1 = new Car('Toyota', 'Corolla', 2020);
const car2 = new Car('Honda', 'Accord', 2019);
const car3 = new Car('Ford', 'Explorer', 2018);

// Create customers
const customer1 = new Customer('John');
const premiumCustomer1 = new PremiumCustomer('Alice', 10);

// Rent cars
customer1.rentCar(car1);
premiumCustomer1.rentCar(car2);

// Return cars
customer1.returnCar(car1);
premiumCustomer1.returnCar(car2);

// Simulate maintenance
Maintenance(car3, 3000);
