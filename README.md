# CampusMarket

CampusMarket is a simple campus marketplace website with product filtering and an interactive shopping cart.

## JavaScript Concepts Used

### 1. Loops

`forEach()` is used to loop through:

* All products when filtering the catalogue.
* All items in the shopping cart when displaying and calculating the cart.
* Cart buttons such as Add to Cart, Increase, Decrease, and Remove.

**Example:**

```javascript
products.forEach(function(product) {
    // Filter each product
});
```

---

### 2. Event Listeners

`addEventListener()` is used to make the website interactive.

* **Search:** `input` event filters products as the user types.
* **Category:** `change` event filters products according to the selected category.
* **Add to Cart:** `click` event adds a product to the cart.
* **Increase Quantity:** `click` event increases the quantity.
* **Decrease Quantity:** `click` event decreases the quantity.
* **Remove Item:** `click` event removes an item from the cart.

**Example:**

```javascript
searchInput.addEventListener("input", filterProducts);
```

---

### 3. Click Events

Click events are handled using `addEventListener("click", ...)`.

For example:

```javascript
button.addEventListener("click", function() {
    addToCart(product);
});
```

This allows the user to interact with the Add to Cart, `+`, `−`, and Remove buttons.

---

### 4. Cart Interactivity

The shopping cart allows the user to:

* Add products.
* Increase quantity.
* Decrease quantity.
* Remove products.
* View the total quantity of items.
* View the calculated cart total.

---

## Summary

| Requirement            | Implementation                           |
| ---------------------- | ---------------------------------------- |
| **Loops**              | `forEach()`                              |
| **Event Listeners**    | `addEventListener()`                     |
| **Click Events**       | `addEventListener("click", ...)`         |
| **Input Event**        | `addEventListener("input", ...)`         |
| **Change Event**       | `addEventListener("change", ...)`        |
| **Cart Interactivity** | Add, increase, decrease and remove items |
| **Calculations**       | Cart quantity and total price            |
