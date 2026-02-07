let myDishes = [
    {
        "name" : "Fufu - 300g",
        "price": 5.00,
        "description": "A traditional West African dish made from cassava flour, often served with soup or stew.",
    },
    {
        "name" : "Jollof Rice - 300g",
        "price": 7.00,
        "description": "A popular West African dish made with rice, tomatoes, onions, and various spices.",
    },
    

]

let mySupplements = [
    {
        "name" : "Pepper Stew",
        "price": 14.00,
        "description": "A spicy stew made with peppers, tomatoes, onions.",
    },
    {
        "name": "Casava Leaves",
        "price": 8.50,
        "description": "A dish made from the leaves of the cassava plant, often cooked with palm oil and spices.",
    },
    {
        "name": "Okra Soup",
        "price": 12.50,
        "description": "A flavorful soup made with okra, tomatoes, onions, and various spices.",
    },
    {
        "name": "Capenta",
        "price": 10.50,
        "description": "A dish made from small dried fish, often served with sadza or rice.",
    },
    {
        "name": "Ogbono Soup",
        "price": 13.50,
        "description": "A thick soup made from ground ogbono seeds, often cooked with meat and vegetables.",
    },
    {
        "name": "Madesu",
        "price": 12.00,
        "description": "A dish made from black-eyed peas, often cooked with tomatoes and spices.",
    }

]

let myDrinks = [
    {
        "name": "Coca-Cola",
        "price": 3.50,
    },
    {
        "name": "Fanta",
        "price": 3.50,
    },
    {
        "name": "Sprite",
        "price": 3.50,
    },
    {
        "name": "Water",
        "price": 2.00,
    },
    {
        "name": "Orange Juice",
        "price": 4.00,
    },
    {
        "name": "Apple Juice",
        "price": 4.00,
    },
    {
        "name": "Mango Juice",
        "price": 4.00,
    }
]


let myalcoholicDrinks = [
    {
        "name": "Krombacher Pils",
        "price": 5.00,
    },
    {
        "name": "Heineken",
        "price": 5.00,
    },
    {
        "name": "Guinness",
        "price": 6.00,
    },
    {
        "name": "Red Wine",
        "price": 7.00,
    }
]



let mealOfTheDay = {
    "name": "Jollof Rice with Okra Soup",
    "price": 15,
    "description": "A delicious combination of spicy Jollof rice served with a hearty Okra soup.",
}

let deliveryCost = 2.99;

let favoriteDishes = [];

let cartItems = [];
let deliveryMode = "delivery";

const categoryMap = {
    dishes: myDishes,
    supplements: mySupplements,
    alcoholicDrinks: myalcoholicDrinks,
    drinks: myDrinks,
    mealOfTheDay: [mealOfTheDay],
    favorites: favoriteDishes,
};


