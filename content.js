/*
 *created by Alex Verbovskiy
 *date 04.03.2023
 */

const popupUniqueClass = "twer2342rwr-popup";

function closePopup() {
    console.log("cliclked")
    document.querySelector("." + popupUniqueClass).remove();
}

function initCloseBtnEvent() {
    document.querySelector(`.${popupUniqueClass} .close-btn`).addEventListener("click", closePopup);
}

function initPopupEvents() {
    initCloseBtnEvent();

    document.querySelector(`.${popupUniqueClass} .accept-cookie`).addEventListener("click", () => {
        chrome.storage.sync.set({
            accepted: true
        }, function () {
            closePopup();
            initMessage("accepted")
        });
    });

    document.querySelector(`.${popupUniqueClass} .reject-cookie`).addEventListener("click", () => {
        chrome.storage.sync.set({
            accepted: false
        }, function () {
            closePopup();
            initMessage("rejected")
        });
    });
}

function initMessageEvents() {
    initCloseBtnEvent();
    document.querySelector(`.${popupUniqueClass} .action`).addEventListener("click", () => {
        closePopup();
        initPopup();
    })
}

function generatePopupHtml() {
    return `<div class="${popupUniqueClass}">
    <div class="header">
        <h4>Accept cookies</h4>
        <span class="close-btn">X</span>
    </div>

    <div class="body">
        <p>This site uses cookies to ensure optimal performance and appropriate display of content. By clicking the "Accept" button, you consent to the use of cookies. You can learn more about the use of cookies in our <a href="https://www.eatthismuch.com/privacy-policy/">privacy policy</a>. If you do not want cookies to be stored on your computer, you can refuse their use by clicking on the "Reject" button. Thank you for your understanding and pleasant viewing of the site!</p>
        <button class="accept-cookie btn btn-lg btn-block btn-orange gen_button">Accept</button>
        <button class="reject-cookie btn btn-lg btn-block btn-secondary gen_button">Reject</button>
    </div>
</div>`;
}

function showMessage(type) {
    return `<div class="${popupUniqueClass}">
        <span class="close-btn">X</span>
        <div class="body ${type}">
        You have <b>${type}</b> the terms of use of cookies, if you wish to change this, click <button class="action btn btn-link">this</button>.
        </div>
    </div>`;
}

function initMessage(type) {
    const popupHtml = showMessage(type);
    document.body.insertAdjacentHTML("afterbegin", popupHtml);
    initMessageEvents();
}

function initPopup() {
    const popupHtml = generatePopupHtml();
    document.body.insertAdjacentHTML("afterbegin", popupHtml);
    initPopupEvents();
}

function main() {
    chrome.storage.sync.get(['accepted'], function (result) {
        if (result.hasOwnProperty('accepted')) {
            if (result.accepted) {
                initMessage("accepted");
            } else {
                initMessage("rejected");
            }
        } else {
            initPopup();
        }
    });
}

main();