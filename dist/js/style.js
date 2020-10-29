/**
 * -------------------------------------------------------------------------
 * Month
 * -------------------------------------------------------------------------
 */ 

var monthEl = document.querySelector("#born");

// define month
var monthes = ["January", 'February', "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var monthLength = monthes.length; // month length

var month = function () {
    let monthStr = '';

    for (let i = 0; i < monthLength; i++) {
        monthStr += `<option value="${i+1}">${monthes[i]}</option>`;
    }

    return monthStr;
}


/**
 * -------------------------------------------------------------------------
 * Modal
 * -------------------------------------------------------------------------
 */ 

let _MODAL = document.querySelector("#addModal"); // get modal element
let _FORM = _MODAL.querySelector("form"); // get form element
let _TITLE = _MODAL.querySelector(".modal-title"); // get title
let _formLength = _FORM.length; // get length of form inputs
let _SUBMIT_BUTTON = document.querySelector("#submit-form"); // submit button

/**
 * -------------------------------------------------------------------------
 * Add new item
 * -------------------------------------------------------------------------
 */ 


// remove all value from form
function makeFormEmpty() {
    for (let i = 0; i < _formLength; i++) {
        // console.log(form[i].type)
        if (_FORM[i].type === "text") {
            _FORM[i].value = ''; // remove all value
        }

        if(_FORM[i].type === "select-one") {
            _FORM[i].innerHTML = month(); // passing data to month select
        }

        if (_FORM[i].type === "radio" && _FORM[i].checked === true) {
            _FORM[i].checked = false; // set to default all radio
        }
    }
}

// add form
var modalAdd = function () {
    let add = document.querySelector("#addBtn");

    add.addEventListener('click', function (e) {
        makeFormEmpty(); // remove all value
        _TITLE.innerText = "Form add user"; // change title

        // add form type to submit button
        // @value add
        _SUBMIT_BUTTON.setAttribute("data-submit-type", "add");
    })
}()


/**
 * -------------------------------------------------------------------------
 * update form
 * -------------------------------------------------------------------------
 */ 


var modalEdit = function (elem) {

    let editButton = document.querySelector("#editBtn"); // get element
    let parentElChildren; // define children
    let born; // define born
 
// editButton.addEventListener("click", function (e) {
    _TITLE.innerText = "Form edit user"; // change title
    parentElChildren = elem.parentElement.parentElement.children; // get children of parent

    _FORM.fname.value = parentElChildren[1].innerText; // firstname
    _FORM.lname.value = parentElChildren[2].innerText; // lastname
    born = elem.dataset.born.split("-"); // born date from dataset
    _FORM.year.value = born[0]; // passing year of born

    // change the month
    let opt = document.createElement("option") // create option
        opt.value = (born[1] - 1).toString(); // set value
        opt.innerHTML = monthes[(born[1] - 1)]; // set inner of html

    let monthStr = ''; // define month string

    // looping data of month
    for (let i = 0; i < monthLength; i++) {
        if ((born[1] - 1) == i) {
            // if matching with data then make selected to that
            monthStr += `<option selected="true" values="${i}">${monthes[i]}</option>`;       
        } else {
            // if no is nothing
            monthStr += `<option value="${i+1}">${monthes[i]}</option>`;
        }
    } // looping

    // passing data to month element
    monthEl.innerHTML = monthStr;

    // change day of form
    _FORM.day.value = born[2]

    // married status
    if (parentElChildren[4].innerText.toLowerCase() === "no") {
        _FORM.married[1].checked = true;
    } else {
        _FORM.married[0].checked = true;
    }

    // add submit type to submit button
    // @value edit
    _SUBMIT_BUTTON.setAttribute("data-submit-type", "edit");

// }); // listener

}

