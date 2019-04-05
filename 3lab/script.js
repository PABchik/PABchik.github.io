var xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.unsplash.com/photos/random?client_id=26f792d8f4c0397b4ceee5c7131c30b94fdb64aa71a38630b48699c372807bab", true);
xhr.onload = function () {
    console.log(xhr.responseText);
};
xhr.send();
