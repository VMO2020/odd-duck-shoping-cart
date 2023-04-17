/* global Cart */
'use strict';
// console.log('cart.js works!');

let allCartItems = [];

//  *********************** Update the contents of the cart from localStorage ***********************
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

//  ************************* Save the contents of the cart to localStorage *************************
function saveAllCartItems() {
	let stringify = JSON.stringify(allCartItems);
	localStorage.setItem('cart', stringify);
}

//  ******************************* Create HTML cart table and render ********************************
function createCartList() {
	// Select
	const tbody = document.querySelector('tbody');
	// Reset
	tbody.innerHTML = '';

	for (let i = 0; i < allCartItems.length; i++) {
		const tr = document.createElement('tr');

		const td = document.createElement('td');
		td.innerHTML = 'X';
		// Create delete products
		td.addEventListener('click', function () {
			if (i > -1) {
				// only splice array when item is found
				allCartItems.splice(i, 1); // 2nd parameter means remove one item only
				console.log(allCartItems);
				saveAllCartItems();
				createCartList();
			}
		});
		tr.append(td);

		const td2 = document.createElement('td');
		td2.innerHTML = allCartItems[i].product;
		tr.append(td2);

		const td3 = document.createElement('td');
		td3.innerHTML = allCartItems[i].quantity;
		tr.append(td3);

		tbody.append(tr);
	}
}
