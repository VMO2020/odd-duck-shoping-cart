'use strict';
// console.log('app.js works!');

// State object keeps track of the application state (all available products and current state of the user's cart)
const state = {
	allProducts: [],
	cart: null,
};

// *********************************** Cart constructor ***********************************
const Cart = function (items) {
	// this.items is an array of CartItem instances.
	this.items = items;
};

// *************************************** Cart Items ***************************************

let allCartItems = [];

const CartItem = function (product, quantity) {
	this.product = product;
	this.quantity = quantity;
};

// *********************************** Product Constructor ***********************************
const Product = function (filePath, name) {
	this.filePath = filePath;
	this.name = name;
};

function generateCatalog() {
	let bag = new Product('assets/bag.jpg', 'Bag');
	let banana = new Product('assets/banana.jpg', 'Banana');
	let bathroom = new Product('assets/bathroom.jpg', 'Bathroom');
	let boots = new Product('assets/boots.jpg', 'Boots');
	let breakfast = new Product('assets/breakfast.jpg', 'Breakfast');
	let bubblegum = new Product('assets/bubblegum.jpg', 'Bubblegum');
	let chair = new Product('assets/chair.jpg', 'Chair');
	let cthulu = new Product('assets/cthulhu.jpg', 'Cthulhu');
	let dogDuck = new Product('assets/dog-duck.jpg', 'Dog-Duck');
	let dragon = new Product('assets/dragon.jpg', 'Dragon');
	let pen = new Product('assets/pen.jpg', 'Pen');
	let petSweep = new Product('assets/pet-sweep.jpg', 'Pet Sweep');
	let scissors = new Product('assets/scissors.jpg', 'Scissors');
	let shark = new Product('assets/shark.jpg', 'Shark');
	let sweep = new Product('assets/sweep.png', 'Sweep');
	let tauntaun = new Product('assets/tauntaun.jpg', 'Taun-Taun');
	let unicorn = new Product('assets/unicorn.jpg', 'Unicorn');
	let waterCan = new Product('assets/water-can.jpg', 'Water Can');
	let wineGlass = new Product('assets/wine-glass.jpg', 'Wine Glass');
	state.allProducts.push(
		bag,
		banana,
		bathroom,
		boots,
		breakfast,
		bubblegum,
		chair,
		cthulu,
		dogDuck,
		dragon,
		pen,
		petSweep,
		scissors,
		shark,
		sweep,
		tauntaun,
		unicorn,
		waterCan,
		wineGlass
	);
	// console.log(state.allProducts);
}

// **************************************** Initialize ****************************************
// Initialize the app by creating the big list of products with images and names
generateCatalog();

// ******************************************* DOM *******************************************
// console.log(state.allProducts);

// Selectors
const select = document.getElementById('items');
const quantity = document.getElementById('quantity');
const cartContent = document.getElementById('cartContents');

// Create HTML options
function createOptions() {
	for (let i = 0; i < state.allProducts.length; i++) {
		let name = state.allProducts[i].name;
		const option = document.createElement('option');
		option.innerHTML = name;
		option.setAttribute('value', name);
		select.append(option);
	}
}

// Create HTML table
function createCartList() {
	cartContent.innerHTML = '';
	const h3 = document.createElement('h3');
	h3.innerHTML = 'Cart preview: ';
	cartContent.append(h3);

	const table = document.createElement('table');

	for (let i = 0; i < allCartItems.length; i++) {
		const tr = document.createElement('tr');

		const td = document.createElement('td');
		td.innerHTML = allCartItems[i].product;
		tr.append(td);

		const td2 = document.createElement('td');
		td2.innerHTML = allCartItems[i].quantity;
		tr.append(td2);

		cartContent.append(tr);
	}
}

createOptions();

// Update the contents of the cart from localStorage
function loadAllCartItems() {
	allCartItems = [];
	let getCart = localStorage.getItem('cart');
	if (getCart) {
		let cart = JSON.parse(getCart);
		allCartItems = cart;
	}
	createCartList();
}

loadAllCartItems();

// Save the contents of the cart to localStorage
function saveAllCartItems() {
	let stringify = JSON.stringify(allCartItems);
	localStorage.setItem('cart', stringify);
}

// Create a new CartItem and add it to this.items

const submitButton = document.getElementById('catalog');

submitButton.addEventListener('submit', function (event) {
	event.preventDefault(); // Stope refresh page`
	const name = event.target.items.value;
	const quantity = event.target.quantity.value;

	const newProduct = new CartItem(name, quantity);
	allCartItems.push(newProduct);
	// console.log(allCartItems);
	submitButton.reset();
	saveAllCartItems();
	createCartList();
});
