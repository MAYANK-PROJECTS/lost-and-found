/* ==============================
   FINDIT - SMART LOST & FOUND
   ============================== */


/* SEARCH ITEMS */

function searchItems() {

    const searchInput =
        document.getElementById("searchInput");

    const search =
        searchInput.value.toLowerCase().trim();

    const cards =
        document.querySelectorAll(".item-card");

    cards.forEach(function(card) {

        const nameElement =
            card.querySelector("h3");

        if (!nameElement) return;

        const name =
            nameElement.innerText.toLowerCase();

        if (name.includes(search)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }

    });

}


/* FILTER ITEMS */

function filterItems() {

    const filterElement =
        document.getElementById("filter");

    const filter =
        filterElement.value;

    const cards =
        document.querySelectorAll(".item-card");

    cards.forEach(function(card) {

        const type =
            card.getAttribute("data-type");

        if (filter === "all" || filter === type) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }

    });

}


/* SEARCH BUTTON FROM HERO */

function focusSearch() {

    const searchInput =
        document.getElementById("searchInput");

    searchInput.focus();

    searchInput.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


/* VIEW ITEM */

function viewItem(itemName) {

    alert(
        "📦 ITEM DETAILS\n\n" +
        "Item: " + itemName +
        "\n\nStatus: Reported" +
        "\n\nFindIt helps connect this item " +
        "with its rightful owner."
    );

}


/* POSSIBLE MATCH */

function showMatch() {

    alert(
        "🔎 POSSIBLE MATCH FOUND!\n\n" +
        "Item: Black Wallet\n" +
        "Location: Computer Lab\n\n" +
        "Please verify ownership before claiming."
    );

}


/* REPORT LOST */

function reportLost() {

    const type =
        document.getElementById("itemType");

    type.value = "lost";

    const section =
        document.getElementById("reportSection");

    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* REPORT FOUND */

function reportFound() {

    const type =
        document.getElementById("itemType");

    type.value = "found";

    const section =
        document.getElementById("reportSection");

    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* ==============================
   LOCAL STORAGE
   ============================== */

function getSavedItems() {

    return JSON.parse(
        localStorage.getItem("finditItems")
    ) || [];

}


function saveItem(item) {

    const items =
        getSavedItems();

    items.push(item);

    localStorage.setItem(
        "finditItems",
        JSON.stringify(items)
    );

}


/* ==============================
   CLAIM ITEM
   ============================== */

function claimItem(itemName) {

    const userName =
        prompt(
            "🤝 CLAIM ITEM\n\n" +
            "Item: " + itemName +
            "\n\nEnter your name:"
        );

    if (!userName) {
        return;
    }


    const contact =
        prompt(
            "Enter your contact information:\n" +
            "(Email or phone number)"
        );

    if (!contact) {
        return;
    }


    alert(
        "✅ CLAIM REQUEST CREATED!\n\n" +
        "Item: " + itemName +
        "\nName: " + userName +
        "\nContact: " + contact +
        "\n\nThe request can be reviewed by the item reporter."
    );

}


/* ==============================
   ADD NEW ITEM
   ============================== */

function addNewItem(
    type,
    name,
    location,
    description
) {

    const itemsContainer =
        document.getElementById("itemsContainer");

    if (!itemsContainer) return;


    const card =
        document.createElement("div");

    card.className = "item-card";

    card.setAttribute(
        "data-type",
        type
    );


    const statusText =
        type === "lost"
            ? "Lost"
            : "Found";


    const statusIcon =
        type === "lost"
            ? "🔴"
            : "🟢";


    const itemIcon =
        type === "lost"
            ? "📦"
            : "🔎";


    let buttons =
        "<button onclick=\"viewItem('" +
        escapeQuotes(name) +
        "')\">" +
        "View Details" +
        "</button>";


    if (type === "found") {

        buttons +=
            "<button class=\"claim-btn\" " +
            "onclick=\"claimItem('" +
            escapeQuotes(name) +
            "')\">" +
            "🤝 Claim Item" +
            "</button>";

    }


    card.innerHTML =

        "<div class=\"item-icon\">" +
        itemIcon +
        "</div>" +

        "<div class=\"item-info\">" +

        "<h3>" +
        escapeHTML(name) +
        "</h3>" +

        "<span class=\"status " +
        type +
        "\">" +
        statusIcon +
        " " +
        statusText +
        "</span>" +

        "<p>📍 " +
        escapeHTML(location) +
        "</p>" +

        "<p>" +
        escapeHTML(description) +
        "</p>" +

        buttons +

        "</div>";


    itemsContainer.appendChild(card);

}


/* ==============================
   SECURITY HELPERS
   ============================== */

function escapeHTML(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function escapeQuotes(text) {

    return text
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'")
        .replace(/"/g, "&quot;");

}


/* ==============================
   LOAD SAVED ITEMS
   ============================== */

function loadSavedItems() {

    const items =
        getSavedItems();

    items.forEach(function(item) {

        addNewItem(
            item.type,
            item.name,
            item.location,
            item.description
        );

    });

}


/* ==============================
   PAGE LOAD
   ============================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {


        loadSavedItems();


        /* SEARCH WITH ENTER */

        const searchInput =
            document.getElementById(
                "searchInput"
            );


        if (searchInput) {

            searchInput.addEventListener(
                "keyup",
                function(event) {

                    if (event.key === "Enter") {

                        searchItems();

                    }

                }
            );

        }


        /* REPORT FORM */

        const reportForm =
            document.getElementById(
                "reportForm"
            );


        if (reportForm) {

            reportForm.addEventListener(
                "submit",
                function(event) {

                    event.preventDefault();


                    const type =
                        document.getElementById(
                            "itemType"
                        ).value;


                    const name =
                        document.getElementById(
                            "itemName"
                        ).value.trim();


                    const location =
                        document.getElementById(
                            "itemLocation"
                        ).value.trim();


                    const description =
                        document.getElementById(
                            "itemDescription"
                        ).value.trim();


                    const contactName =
                        document.getElementById(
                            "contactName"
                        ).value.trim();


                    const contactInfo =
                        document.getElementById(
                            "contactInfo"
                        ).value.trim();


                    if (
                        !type ||
                        !name ||
                        !location ||
                        !description ||
                        !contactName ||
                        !contactInfo
                    ) {

                        alert(
                            "⚠️ Please fill all required fields."
                        );

                        return;

                    }


                    const newItem = {

                        type: type,

                        name: name,

                        location: location,

                        description: description,

                        contactName: contactName,

                        contactInfo: contactInfo

                    };


                    saveItem(newItem);


                    addNewItem(
                        type,
                        name,
                        location,
                        description
                    );


                    alert(
                        "✅ REPORT SUBMITTED!\n\n" +
                        "Your " +
                        (type === "lost"
                            ? "lost"
                            : "found") +
                        " item has been saved successfully."
                    );


                    reportForm.reset();


                    document
                        .getElementById("itemsContainer")
                        .lastElementChild
                        .scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });

                }
            );

        }

    }
);
