let mainCourse = [
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

let sideDishes = [
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

let softDrinks = [
  {
    name: "Coca-Cola",
    price: 3.5,
    deposit: 0.25,
  },
  {
    name: "Fanta",
    price: 3.5,
    deposit: 0.25,
  },
  {
    name: "Sprite",
    price: 3.5,
    deposit: 0.25,
  },
  {
    name: "Water",
    price: 2.0,
    deposit: 0.25,
  },
  {
    name: "Orange Juice",
    price: 4.0,
    deposit: 0.25,
  },
  {
    name: "Apple Juice",
    price: 4.0,
    deposit: 0.25,
  },
  {
    name: "Mango Juice",
    price: 4.0,
    deposit: 0.25,
  },
];

let spiritsDrinks = [
  {
    name: "Krombacher Pils",
    price: 5.0,
    deposit: 0.25,
  },
  {
    name: "Heineken",
    price: 5.0,
    deposit: 0.25,
  },
  {
    name: "Guinness",
    price: 6.0,
    deposit: 0.25,
  },
  {
    name: "Red Wine",
    price: 7.0,
    deposit: 0.25,
  },
];

let mealOfTheDay = {
  name: "Jollof Rice with Okra Soup",
  price: 15.00,
  description:
    "A delicious combination of spicy Jollof rice served with a hearty Okra soup.",
};

let favoriteDishes = [];

const categoryMap = {
  dishes: mainCourse,
  supplements: sideDishes,
  alcoholicDrinks: spiritsDrinks,
  drinks: softDrinks,
  mealOfTheDay: [mealOfTheDay],
  favorites: favoriteDishes,
};


const tip = [
  { tip1: "5%", value: 0.05 },
  { tip2: "10%", value: 0.1 },
  { tip3: "15%", value: 0.15 },
];

let basketItems = [];

const pickOrDeliveryMode ={
  deliveryMode : {
    label : "Lieferung",
    cost : 2.99,
  },
  pickupMode : {
    label : "Abholung",
    cost : 0,
  },
};

const minimumOrderValue = 15.00;

const iconMap = {
  addIcon: "./image/icon/add_icon.png",
  removeIcon: "./image/icon/remove_icon.png",
  bannerIcon1: "./image/icon/banner_icon1.png",
  bannerIcon2: "./image/icon/banner_icon2.png",
  deleteIcon: "./image/icon/delete_icon.png",
  likeIcon: "./image/icon/like_icon.png",
  likedIcon: "./image/icon/liked_icon.png",
  menuOpenIcon: "./image/icon/menuOpen_icon.png",
  menuCloseIcon: "./image/icon/menuClose_icon.png",
};

const imageMap = {
  headerLogo: "./image/img/header_logo.png",
  bannerLogo: "./image/img/banner_logo.jpg",
  footerLogo: "./image/img/footer_logo.jpg",
};
