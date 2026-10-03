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
    alert(
        "📢 Report Lost Item\n\n" +
        "Lost item reporting will be available here."
    );
}

function reportFound() {
    alert(
        "📦 Report Found Item\n\n" +
        "Found item reporting will be available here."
    );
}

document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("searchInput");

    if (searchInput) {
        searchInput.addEventListener("keyup", function(event) {
            if (event.key === "Enter") {
                searchItems();
            }
        });
    }
});
