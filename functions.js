const money_amount = document.getElementById("money_amount");
const tip_amount = Array.from(document.getElementsByClassName("tip_amount"));
const custom_button = document.getElementById("custom");
const error = document.getElementById("error_msg");
const people_amount = document.getElementById("people_amount");
const tip_per_person = document.getElementById("tip_per_person");
const total_bill = document.getElementById("total_bill");
const reset_button = document.getElementById("reset_button");
let percent;
let lastButton;
let customInput;

function updateInfo(){
    let moneyAmount = Number(money_amount.value);
    let NumberOfpeople = Number(people_amount.value);
    if (!percent || NumberOfpeople === 0){
        return;
    }
    let tipAmount = (moneyAmount * percent) / 100 / NumberOfpeople;
    let total = ((moneyAmount * percent) / 100 + moneyAmount) / NumberOfpeople;
    tip_per_person.textContent = "$" + tipAmount.toFixed(2);
    total_bill.textContent = "$" + total.toFixed(2);
    reset_button.style.backgroundColor = "#26C2AE";
}

money_amount.addEventListener("input" , () => {
    if (money_amount.value <= 0){
    reset_button.style.backgroundColor = "#0D686D";
    reset_button.style.cursor = "unset";
    } else {
    reset_button.style.backgroundColor = "#26C2AE";
    reset_button.style.cursor = "pointer";
    };
    updateInfo();
});

tip_amount.map((button) => {
    button.addEventListener("click", (e) => {
        if (button.classList != ("tip_amount selected")){
            document.querySelector(".selected")?.classList.remove("selected");
            button.classList.add("selected");
        }
        reset_button.style.backgroundColor = "#26C2AE";
        reset_button.style.cursor = "pointer";
        custom_button.value = "";
        percent = parseInt(e.target.textContent);
        lastButton = e.target;

        updateInfo();
    });
});

people_amount.addEventListener("input", (e) => {
    if (e.target.value <= 0){
        people_amount.style.border = "2px solid red";
        error.style.display = "block";
        reset_button.style.backgroundColor = "#26C2AE";
        reset_button.style.cursor = "pointer";
    } else {
        people_amount.style.border = "2px solid #26C2AE";
        error.style.display = "none";
        reset_button.style.backgroundColor = "#26C2AE";
        reset_button.style.cursor = "pointer";
    }
    updateInfo();
});

custom_button.addEventListener("input", (e) => {
    if (custom_button.value <= 0){
        reset_button.style.backgroundColor = "#0D686D";
        reset_button.style.cursor = "unset";
        tip_per_person.textContent= "$0.00";
        total_bill.textContent= "$0.00";
        } else {
        reset_button.style.backgroundColor = "#26C2AE";
        tip_amount.forEach(button => {
            button.classList.remove("selected");
        });
        reset_button.style.cursor = "pointer";
        percent = e.target.value;
        updateInfo();
        }
});

reset_button.addEventListener("click", (e) => {
    money_amount.value = "";
    total_bill.innerHTML = "$0.00";
    tip_per_person.innerHTML = "$0.00";
    tip_amount.forEach(button => {
        button.classList.remove("selected");
    });
    people_amount.value = "";
    people_amount.style.border = "none";
    error.style.display = "none";
    custom_button.value = "";
    reset_button.style.backgroundColor = "#0D686D";
    reset_button.style.cursor = "unset";
    updateInfo();
});