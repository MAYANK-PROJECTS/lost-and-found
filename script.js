function searchItems() {
    const searchInput = document.getElementById("searchInput");

    if (!searchInput) return;

    const search = searchInput.value.toLowerCase().trim();
    const cards = document.querySelectorAll(".item-card");

    cards.forEach(function(card) {
        const nameElement = card.querySelector("h3");

        if (!nameElement) return;

        const name = nameElement.innerText.toLowerCase();

        card.style.display = name.includes(search) ? "block" : "none";
    });
}


function filterItems() {
    const filterElement = document.getElementById("filter");

    if (!filterElement) return;

    const filter = filterElement.value;
    const cards = document.querySelectorAll(".item-card");

    cards.forEach(function(card) {
        const type = card.getAttribute("data-type");

        if (filter === "all" || filter === type) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}


function viewItem(itemName) {
    alert(
        "📦 Item Details\n\n" +
        "Item: " + itemName +
        "\nStatus: Reported\n\n" +
        "More details will be available after verification."
    );
}


function showMatch() {
    alert(
        "🔎 Possible Match Found!\n\n" +
        "Item: Black Wallet\n" +
        "Location: Computer Lab\n\n" +
        "Please verify ownership before claiming."
    );
}


function reportLost() {
    document.getElementById("itemType").value = "lost";

    document.getElementById("reportSection").scrollIntoView({
        behavior: "smooth"
    });
}


function reportFound() {
    document.getElementById("itemType").value = "found";

    document.getElementById("reportSection").scrollIntoView({
        behavior: "smooth"
    });
}


/* SAVE ITEMS */

function getSavedItems() {
    return JSON.parse(localStorage.getItem("finditItems")) || [];
}


function saveItem(item) {
    const items = getSavedItems();

    items.push(item);

    localStorage.setItem(
        "finditItems",
        JSON.stringify(items)
    );
}


/* ADD ITEM TO WEBSITE */

function addNewItem(type, name, location, description) {

    const itemsSection = document.querySelector(".items");

    const card = document.createElement("div");

    card.className = "item-card";
    card.setAttribute("data-type", type);

    const statusText = type === "lost" ? "Lost" : "Found";
    const statusIcon = type === "lost" ? "🔴" : "🟢";

    card.innerHTML =
        "<h3>📦 " + name + "</h3>" +
        "<p><strong>Status:</strong> " +
        statusIcon + " " + statusText + "</p>" +
        "<p><strong>Location:</strong> " +
        location + "</p>" +
        "<p><strong>Description:</strong> " +
        description + "</p>" +
        "<button onclick=\"viewItem('" + name + "')\">" +
        "View Details" +
        "</button>";

    itemsSection.appendChild(card);
}


/* LOAD SAVED ITEMS */

function loadSavedItems() {

    const items = getSavedItems();

    items.forEach(function(item) {

        addNewItem(
            item.type,
            item.name,
            item.location,
            item.description
        );

    });
}


/* PAGE LOAD */

document.addEventListener("DOMContentLoaded", function() {

    const searchInput =
        document.getElementById("searchInput");

    const reportForm =
        document.getElementById("reportForm");


    loadSavedItems();


    if (searchInput) {

        searchInput.addEventListener("keyup", function(event) {

            if (event.key === "Enter") {
                searchItems();
            }

        });

    }


    if (reportForm) {

        reportForm.addEventListener("submit", function(event) {

            event.preventDefault();


            const type =
                document.getElementById("itemType").value;

            const name =
                document.getElementById("itemName").value.trim();

            const location =
                document.getElementById("itemLocation").value.trim();

            const description =
                document.getElementById("itemDescription").value.trim();


            if (!type || !name || !location || !description) {

                alert("⚠️ Please fill all required fields.");

                return;

            }


            const newItem = {

                type: type,

                name: name,

                location: location,

                description: description

            };


            saveItem(newItem);


            addNewItem(
                type,
                name,
                location,
                description
            );


            alert(
                "✅ Report submitted successfully!\n\n" +
                "Your item has been saved successfully."
            );


            reportForm.reset();

        });

    }

});
