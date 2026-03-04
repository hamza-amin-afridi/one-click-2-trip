let x = 10;
let y = 20;
let sum = x + y;
console.log("The sum of x and y is: " + sum);

// Comment for github commit: Initial commit of the One Click 2 Trip website, including the homepage layout with navbar, hero section, categories, services, and contact form.

// add something to commit: Added responsive design and improved accessibility features for better user experience across devices.

function greetUser(name) {
    console.log("Hello, " + name + "! Welcome to One Click 2 Trip.");
};
greetUser("Alice")

function calculateTotal(price, quantity) {
    return price * quantity;
}       
let total = calculateTotal(19.99, 3);
console.log("The total price is: $" + total);                   




function displayCategories(categories) {
    categories.forEach(category => {
        console.log("Category: " + category);
    });
}