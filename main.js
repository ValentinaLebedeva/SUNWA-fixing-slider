const links = document.querySelectorAll("a");
links.forEach(function (item) {
    item.setAttribute(
        "target",
        "_blank");
});


/* search within website input */

/* the look of search btn */

const searchForm = document.querySelector(".search");
const searchBtn = document.querySelector(".search__button");

searchBtn.addEventListener("click", openSearchInput);

function openSearchInput(e) {
    e.preventDefault();
    if (!searchForm.classList.contains("search--visible")) {
        searchForm.classList.add("search--visible");
    } else {
        searchForm.classList.remove("search--visible");

    }
};


/* mobile menu */

const mobileNavBtn = document.querySelector('.mobile-nav-icon');
const mobileNav = document.querySelector('.mobile-nav');

mobileNavBtn.addEventListener("click", openMenu);

function openMenu() {
    mobileNav.classList.toggle("mobile-nav--active");
    mobileNavBtn.classList.toggle("mobile-nav-icon-close");
}

/* pop up menu */

const categoryBtn = document.querySelector(".category");
const popUpMenu = document.querySelector(".category-popup-menu");

categoryBtn.addEventListener("click", openCategoryMenu);

function openCategoryMenu(e) {
    e.preventDefault();
    popUpMenu.classList.toggle("category-popup-menu--active");
}

/* language */

const langBtn = document.querySelector(".language");
const dropDownMenu = document.querySelector(".drop-down-menu-list");
const langItems = document.querySelectorAll(".lang-item");
const currentLang = document.querySelector(".current-lang");


langBtn.addEventListener("click", chooseLangBtn);

function chooseLangBtn() {
    dropDownMenu.classList.toggle("drop-down-menu-list--active");
    for (i = 0; i < langItems.length; i++) {
        langItems[i].addEventListener("click", function () {
            currentLang.innerHTML = this.innerHTML;
        });
    };
};

/* email validation */

const inputSubscribe = document.querySelector(".input-subscribe");
const subscribeBtn = document.querySelector(".subscribe_btn");

function validateEmail(email) {
    const emailLowCase = email.toLowerCase();
    const pattern = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    return pattern.test(emailLowCase);
}


/* creating default message if subscribe email is invalid */

subscribeBtn.addEventListener("click", subscribeEmail);

function subscribeEmail(e) {
    e.preventDefault();

    if (!validateEmail(inputSubscribe.value)) {
        inputSubscribe.value = "Please write your email";
        inputSubscribe.classList.add("input-subscribe--active")
    } else {
        inputSubscribe.value = "";

    }

}




/* opening news links index.html news.html */

const newsRow = document.querySelector(".section-news-row");
if (newsRow) {
    const newsItemLinks = document.querySelectorAll(".news-item-link");

    newsRow.addEventListener("click", openNews);

    function openNews() {
        for (i = 0; i < newsItemLinks.length; i++) {
            newsItemLinks[i].setAttribute("href", `events${i}.html`);
        }
    };
}


/* article style on hover index.html news.html  */

/*
const newsItems = document.querySelectorAll(".news-item")

for (i = 0; i < newsItems.length; i++) {
    let itemText = newsItems[i].querySelector(".news-item-text");
    newsItems[i].addEventListener("mouseover", function () {
        itemText.classList.add("news-item-text-active");
    })
}
*/

const newsItems = document.querySelectorAll(".news-item");

newsItems.forEach(function (item) {
    const itemText = item.querySelector(".news-item-text");
    const readBtn = item.querySelector(".read-more-btn");

    item.addEventListener("mouseover", function () {
        itemText.classList.add("news-item-text-active");
        if (readBtn) {
            readBtn.classList.add("read-more-btn--active");
        }
    })

    item.addEventListener("mouseout", function () {
        itemText.classList.remove("news-item-text-active");
        if (readBtn) {
            readBtn.classList.remove("read-more-btn--active");
        }
    })
})


/// ADD HOVER ON READ-BTN ON OTHER PAGES ????????

/* contact.html, documents.html, news.html, about.html tabs */

const tabButtons = document.querySelectorAll(".tab-link");
const tabColumn = document.querySelector(".tab-column");
const columnItems = document.querySelectorAll(".column-item");

if (tabColumn) {
    tabColumn.addEventListener("click", choseTab);

    function choseTab(e) {
        const sectionTitle = document.querySelector(".news-section-title");

        tabButtons.forEach(function (item) {
            item.classList.remove("tab-link-active");
        });

        if (e.target.dataset.tab) {
            e.target.classList.add("tab-link-active");
        }
        /* filter documents by tab */
        columnItems.forEach(function (item) {
            item.classList.remove("hidden")
            if (e.target.dataset.tab != item.dataset.tab) {
                item.classList.add("hidden")
            }
        })
        /* chaning title depends on a chosen tab */
        if (e.target.classList.contains("tab-link-active") && sectionTitle) {
            sectionTitle.innerText = e.target.dataset.tab.toUpperCase();
        }
    }
}

/* contact.html, inquiry.html inquiry form information */


//* collecting data from inquiry form */

const inquiryForm = document.querySelector(".inquiry-form");
let inputName = document.querySelector("#name");
let formItems = document.querySelectorAll(".form-item")
const submitBtn = document.querySelector(".submit-btn");

/* changing style for default popup message */

let inputItems = document.querySelectorAll(".input-item")
let inputMessage;

formItems.forEach(function (item) {
    inputMessage = document.createElement("div");
    inputMessage.style.display = "none";
    item.append(inputMessage);
})

inputItems.forEach(function (item) {
    if (item.hasAttribute("required")) {
        item.addEventListener("invalid", function (e) {
            e.preventDefault();

            if (!e.target.validity.valid) {
                inputMessage = item.nextElementSibling;
                inputMessage.className = "input-error";
                inputMessage.style.display = "block";
                //item.classList.add("invalid");
                if (item.classList.contains("input-name")) {
                    inputMessage.textContent = "Please write your full name";
                } else if (item.classList.contains("input-phone")) {
                    inputMessage.textContent = "Please write your phone";
                } else if (item.classList.contains("input-email")) {
                    inputMessage.textContent = "Please write your email";
                }
            }
        })
        item.addEventListener("input", function (e) {
            if ("block" === inputMessage.style.display) {
                item.classList.remove("invalid")
                inputMessage.style.display = "none"
            }
        })
    }

})

/* submiting the form */

if (inquiryForm) {
    inquiryForm.addEventListener("submit", collectInquiryData);

    function collectInquiryData(e) {
        // e.preventDefault()

        /* checking if all required filed are filled */
        if (inquiryForm.checkValidity()) {
            /* creating form requiest if the form is filled */
            let inquiryName, inquiryPhone, inquiryEmail, inquiryCompany, inquiryItems;
            inquiryName = document.querySelector("#name").value;
            inquiryPhone = document.querySelector("#phone").value;
            inquiryEmail = document.querySelector("#form-email").value;
            inquiryCompany = document.querySelector("#company").value || null;


            let inquiryRequest = {
                inquiryName: inquiryName,
                inquiryPhone: inquiryPhone,
                inquiryEmail: inquiryEmail,
                inquiryCompany: inquiryCompany,
                inquiryItems: dataFromLocalStorage
            }
            console.log(inquiryRequest)
        }

        /* clear the form and localStorage after submiting the form */
        dataFromLocalStorage = localStorage.removeItem("requestedItemtoStorage");
        quoteNumberAmount = localStorage.removeItem("requestItemNumber");
        quoteNumber.innerText = quoteNumberAmount;
        inquiryForm.reset()

    }
}

/* LOCAL STORAGE upload number in cart and qoute from localStorage */

const cartNumber = document.querySelector(".cart-number");
let cartNumberAmount = parseInt(JSON.parse(localStorage.getItem("addedItemCartNumber"))) || 0;
cartNumber.innerText = cartNumberAmount || "";

const quoteNumber = document.querySelector(".quote-number");
let quoteNumberAmount = parseInt(JSON.parse(localStorage.getItem("requestItemNumber"))) || 0;
quoteNumber.innerText = quoteNumberAmount || "";

/* PRODUCTS.HTML */


/* filter by brand */

const productCategory = document.querySelectorAll(".category-item");
const productItems = document.querySelectorAll(".products-item");

productCategory.forEach(function (selectedTab) {
    selectedTab.addEventListener("click", function () {
        const selectedCategory = selectedTab.getAttribute("data-category");
        const selectedItems = Array.from(document.querySelectorAll(`[data-brand=${selectedCategory}]`));

        productCategory.forEach(function (item) {
            item.classList.remove("category-item--active");
        });
        selectedTab.classList.add("category-item--active");

        productItems.forEach(function (item) {
            if (selectedCategory !== item.dataset.brand) {
                item.classList.add("hidden")
            } else {
                item.classList.remove("hidden");
            }
        })
    })
})

/* search filter by brand name on product page */

searchForm.addEventListener("keyup", searchItems);

function searchItems(e) {

    // need to save all items in LocalStorage and do search within it
    const searchedText = e.target.value.toLowerCase();
    productItems.forEach(function (item) {
        const itemText = item.dataset.brand.toLowerCase();
        // Проверяем вхождение искомой подстроки в текст задачи
        if (itemText.indexOf(searchedText) != -1) {
            // Если вхождение есть - показываем элемент с задачей
            item.classList.remove("hidden");

        } else {
            // Если вхождения нет - скрываем элемент с задачей
            item.classList.add("hidden");
        }
    })
}

/* moving item sliders by clicking */

const productRow = document.querySelector("[data-target=productRow]");
const productSlider = document.querySelector("[data-slider=slider");
const productItemsLinks = document.querySelectorAll(".product-item-link");
//const productItemsData = document.querySelectorAll("[data-product=item]");
const productItem = document.querySelector("[data-product=item]");

function moveSlider() {
    const btnLeft = document.querySelector("[data-arrow=btnLeft]");
    const btnRight = document.querySelector("[data-arrow=btnRight]");

    const productSliderWidth = productSlider.offsetWidth;
    const itemStyle = productItem.currentStyle || window.getComputedStyle(productItem);
    const itemMarginRight = Number(itemStyle.marginRight.match(/\d+/g)[0]);
    const itemWidth = Number(itemStyle.width.match(/\d+/g)[0]);

    const itemCount = productSlider.querySelectorAll("[data-product=item]").length;
    const itemWidthT = productSlider.querySelector("[data-product=item]").offsetWidth;

    let offset = 0;

    const check = Math.round(productSliderWidth / (itemWidthT + itemMarginRight)); // how many items in a row
    const maxX = -((itemCount / check) * productSliderWidth + (itemMarginRight * (itemCount / check)) - productSliderWidth - itemMarginRight);

    btnLeft.addEventListener("click", function () {
        if (offset !== 0) {
            offset += itemWidthT + itemMarginRight;

            productSlider.style.transform = `translateX(${offset}px)`;
        }
    });

    btnRight.addEventListener("click", function () {
        if (offset >= maxX) {
            offset -= itemWidthT + itemMarginRight;

            productSlider.style.transform = `translateX(${offset}px)`;
        }
    })
}

if (productSlider) {
    moveSlider()
}

/* opening item link on click */

const productRowAll = document.querySelectorAll("[data-target=productRow]");

productRowAll.forEach(function (item) {

    for (i = 0; i < productItemsLinks.length; i++) {
        productItemsLinks[i].setAttribute(
            "href",
            `./item${i}.html`);
    };
});

/* hover on items */

let productHoverList, requestBtnAll, addToCartBtnAll;

productItems.forEach(function (item) {
    let productHover = item.appendChild(document.createElement("div"));
    productHover.classList.add("product-item-hover");
    productHoverList = document.querySelectorAll(".product-item-hover")

    const selectedItem = item.querySelector(".product-price").innerText;

    /* additing HTML code for hover */

    if (selectedItem === "unlisted") {

        productHover.innerHTML = `
                <a href="#" class="product-item--add" data-item="request-item">
                <img src="./img/products/icons/request-icon.svg" alt="request">
                request a quote
            </a>
            <p class="product-item-storage">Storage: <span>29</span></p>
                `;
    } else {
        productHover.innerHTML = `
                <a href="#" class="product-item--add" data-item="add-item">
                    <img src="./img/products/icons/add-icon.svg" alt="add">
                    Add to cart
                </a>
                <p class="product-item-storage">Storage: <span>359</span></p>
                `;
    }

    /* creating cart and request btn outside the loop */

    addToCartBtnAll = document.querySelectorAll('[data-item="add-item"]');
    requestBtnAll = document.querySelectorAll('[data-item="request-item"]')
    /* mouse action */

    item.addEventListener("mouseenter", function () {
        productHover.style.display = "inline-block";
    })
    item.addEventListener("mouseleave", function () {
        productHover.style.display = "none";
    })
})
