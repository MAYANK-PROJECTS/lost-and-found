function searchItems() {
    const search = document.getElementById("searchInput").value.toLowerCase();
    const cards = document.querySelectorAll(".item-card");

    cards.forEach(function(card) {
        const name = card.querySelector("h3").innerText.toLowerCase();

        if (name.includes(search)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

function filterItems() {
    const filter = document.getElementById("filter").value;
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
        "Item Details\n\n" +
        "Item: " + itemName +
        "\nStatus: Reported\n\n" +
        "More details will be available after verification."
    );
}

function showMatch() {
    alert(
        "Possible Match Found!\n\n" +
        "Item: Black Wallet\n" +
        "Location: Computer Lab\n\n" +
        "Please verify ownership before claiming."
    );
}
