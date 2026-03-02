let myDishes = [
  {
    name: "Fufu - 300g",
    price: 5.0,
    description:
      "A traditional West African dish made from cassava flour, often served with soup or stew.",
  },
  {
    name: "Jollof Rice - 300g",
    price: 7.0,
    description:
      "A popular West African dish made with rice, tomatoes, onions, and various spices.",
  },
];

let mySupplements = [
  {
    name: "Pepper Stew",
    price: 14.0,
    description: "A spicy stew made with peppers, tomatoes, onions.",
  },
  {
    name: "Casava Leaves",
    price: 8.5,
    description:
      "A dish made from the leaves of the cassava plant, often cooked with palm oil and spices.",
  },
  {
    name: "Okra Soup",
    price: 12.5,
    description:
      "A flavorful soup made with okra, tomatoes, onions, and various spices.",
  },
  {
    name: "Capenta",
    price: 10.5,
    description:
      "A dish made from small dried fish, often served with sadza or rice.",
  },
  {
    name: "Ogbono Soup",
    price: 13.5,
    description:
      "A thick soup made from ground ogbono seeds, often cooked with meat and vegetables.",
  },
  {
    name: "Madesu",
    price: 12.0,
    description:
      "A dish made from black-eyed peas, often cooked with tomatoes and spices.",
  },
];

let myDrinks = [
  {
    name: "Coca-Cola",
    price: 3.5,
  },
  {
    name: "Fanta",
    price: 3.5,
  },
  {
    name: "Sprite",
    price: 3.5,
  },
  {
    name: "Water",
    price: 2.0,
  },
  {
    name: "Orange Juice",
    price: 4.0,
  },
  {
    name: "Apple Juice",
    price: 4.0,
  },
  {
    name: "Mango Juice",
    price: 4.0,
  },
];

let myalcoholicDrinks = [
  {
    name: "Krombacher Pils",
    price: 5.0,
  },
  {
    name: "Heineken",
    price: 5.0,
  },
  {
    name: "Guinness",
    price: 6.0,
  },
  {
    name: "Red Wine",
    price: 7.0,
  },
];

let mealOfTheDay = {
  name: "Jollof Rice with Okra Soup",
  price: 15,
  description:
    "A delicious combination of spicy Jollof rice served with a hearty Okra soup.",
};

let favoriteDishes = [];

const categoryMap = {
  dishes: myDishes,
  supplements: mySupplements,
  alcoholicDrinks: myalcoholicDrinks,
  drinks: myDrinks,
  mealOfTheDay: [mealOfTheDay],
  favorites: favoriteDishes,
};

let deliveryCost = 2.99;

let basketItems = [];
let deliveryMode = "delivery";