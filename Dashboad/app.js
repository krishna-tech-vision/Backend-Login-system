// add hovered class to selected list 

const list = document.querySelectorAll(".navigation li");
console.log(list);

function activeLink() {
    list.forEach( item =>{
        item.classList.remove("hovered");
    })
    this.classList.add("hovered");
}


list.forEach(item => item.addEventListener("mouseover", activeLink));

const toggle = document.querySelector(".toggle");
const navigation = document.querySelector(".navigation");
const main = document.querySelector(".main");

toggle.onclick = function() {
    navigation.classList.toggle("active");
    main.classList.toggle("active");
}
