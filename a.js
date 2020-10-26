 var month = document.querySelector("#month");
        var monthes = ["January", 'February', "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var monthLength = monthes.length;

        var monthStr = '';

        for (let i = 0; i < monthLength; i++) {
            monthStr += `<option values="${i}">${monthes[i]}</option>`;
        }

        month.innerHTML = monthStr;

        // form modal info
        let formModal = document.querySelector("#addModal");
        let form = formModal.querySelector("form");
        let formLength = form.length;

        // change values from
        function makeFormEmpty() {

            for (let i = 0; i < formLength; i++) {
                // console.log(form[i].type)
                if (form[i].type === "text") {
                    form[i].value = '';
                }

                if(form[i].type === "select-one") {
                    form[i].innerHTML = monthStr;
                }

                if (form[i].type === "radio" && form[i].checked === true) {
                    form[i].checked = false;
                }
            }
        }


        // form modal add
        var formModalAdd = function () {
            let add = document.querySelector("#addBtn");

            add.addEventListener('click', function (e) {
                makeFormEmpty();
            })
        }()

        // change modal
        var formModalEdit = function () {
            let title = formModal.querySelector(".modal-title");

            let editButton = document.querySelector("#editBtn")
            let parentElChildren;
            var born;

            editButton.addEventListener("click", function (e) {
                title.innerText = "Form edit user";
                parentElChildren = this.parentElement.parentElement.children;

                // first name
                form.fname.value = parentElChildren[1].innerText;
                // last name
                form.lname.value = parentElChildren[2].innerText;
                // born date
                born = this.dataset.born.split("-");
                // year
                form.year.value = born[0]
                // month
                var opt = document.createElement("option")
                    opt.value = (born[1] - 1).toString();
                    opt.innerHTML = monthes[(born[1] - 1)];
                    opt.checked = true;

                // change lists of month
                let monthStr2 = '';
                for (let i = 0; i < monthLength; i++) {
                    if ((born[1] - 1) == i) {
                        monthStr2 += `<option selected="true" values="${i}">${monthes[i]}</option>`;       
                    } else {
                        monthStr2 += `<option values="${i}">${monthes[i]}</option>`;
                    }
                }

                month.innerHTML = monthStr2;

                // day
                form.day.value = born[2]
                // married

                if (parentElChildren[4].innerText.toLowerCase() === "no") {
                    form.married[1].checked = true
                } else {
                    form.married[0].checked = true
                }
            })
        }()