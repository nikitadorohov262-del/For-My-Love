const title = document.querySelector(".title");
const sound = new Audio("wish.mp3");
sound.volume = 0.2;

const slova = [
    { bukva: "Я", text: "Ясная - подобно утреннему солнцу, даришь радость и тепло." },
    { bukva: "Т", text: "Тёплая - душа твоя как камин на пополам с горячим кофе." },
    { bukva: "Е", text: "Естественная - с тобой все словно такое, каким оно и должно быть." },
    { bukva: "Б", text: "Блестательная - яркая натура, и выразительный характер, словно пламя." },
    { bukva: "Я", text: "Ярая - рвешься к своей цели невзирая на все невзгоды и трудности." },
    { bukva: "Л", text: "Ласковая - теплота твоей заботы, даже на расстоаянии опаясывает с ног до головы." },
    { bukva: "Ю", text: "Юркая - твоей любознательности нет гранциц. Ты знаешь словно знаешь все и готова ко всему." },
    { bukva: "Б", text: "Бойкая - твердая телом и характером, несламимый дух и принципы." },
    { bukva: "Л", text: "Легкая - с тобой душа просится летать." },
    { bukva: "Ю", text: "Юморная - твоя вечная улыбка и игривый взгляд - ценная черта твоей души." }
];

let shag = 0;

function showPage(id) {
    document.querySelectorAll(".page").forEach(function (p) {
        p.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");
}

const polki = [
    ["Я", " ", "Т", "Е", "Б", "Я"],
    ["Л", "Ю", "Б", "Л", "Ю"]
];

function risovatFrazu() {
    const bukvy = slova.slice(0, shag).map(function (s) { return s.bukva; });
    let n = 0;
    ["shelf-1", "shelf-2"].forEach(function (id, ryad) {
        const box = document.getElementById(id);
        box.innerHTML = "";
        polki[ryad].forEach(function (zn) {
            const gnezdo = document.createElement("span");
            if (zn === " ") {
                gnezdo.className = "slot space";
            } else {
                gnezdo.className = "slot";
                if (n < bukvy.length) {
                    gnezdo.textContent = bukvy[n];
                }
                n += 1;
            }
            box.appendChild(gnezdo);
        });
    });
}

function pokazatKompliment() {
    document.getElementById("compliment").textContent = slova[shag].text;
    shag += 1;
    risovatFrazu();
}

document.querySelectorAll(".next").forEach(function (btn) {
    if (btn.id === "next-comp" || btn.id === "to-table") return;
    btn.addEventListener("click", function () {
        const now = document.querySelector(".page.active");
        const sled = now.nextElementSibling;
        if (sled && sled.classList.contains("page")) {
            now.classList.remove("active");
            sled.classList.add("active");
        }
    });
});

document.getElementById("surprise").addEventListener("click", function () {
    if (title) title.style.display = "none";
    shag = 0;
    showPage("page-game");
    pokazatKompliment();
});

document.getElementById("next-comp").addEventListener("click", function () {
    if (shag < slova.length) {
        pokazatKompliment();
    } else {
        showPage("page-hand");
    }
});

document.getElementById("to-table").addEventListener("click", function () {
    showPage("page-4");
});

function confetti() {
    const colors = ["#c4a0c8", "#fff4c4", "#f2c6d6", "#ffffff", "#d4b8e8"];
    for (let i = 0; i < 80; i++) {
        const piece = document.createElement("span");
        piece.className = "confetti";
        piece.style.left = Math.random() * 100 + "vw";
        piece.style.background = colors[i % colors.length];
        piece.style.animationDelay = Math.random() * 0.6 + "s";
        document.body.appendChild(piece);
        setTimeout(function () { piece.remove(); }, 3000);
    }
}

document.getElementById("zadut").addEventListener("click", function () {
    document.getElementById("page-4").classList.add("out");
    confetti();
    sound.play().catch(function () {});
});
