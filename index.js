const cols = document.querySelectorAll(".col");

document.addEventListener("keydown", (event) => {
    event.preventDefault();

    if(event.code.toLowerCase() === "space") setRandomColors();
});

document.addEventListener("click", (event) => {
    const type = event.target.dataset.type;

    switch(type) {
        case "lock":
            const node = event.target.tagName.toLowerCase() === "i"
                ? event.target
                : event.target.children[0];
        
            node.classList.toggle("fa-lock-open");
            node.classList.toggle("fa-lock");

            break;
        case "copy":
            copyColor(event.target.textContent);

            break;
    }
});

function copyColor(text) {
    return navigator.clipboard.writeText(text);
}

function setTextAndButtonColor(text, button, color) {
    const luminance = chroma(color).luminance();

    color = luminance > 0.5 ? "black" : "white";

    text.style.color = color;
    button.style.color = color;
}

function setRandomColors(isInitial) {
    const colors = isInitial ? getColorsFromHash() : [];

    cols.forEach((col, index) => {
        const isLocked = col.querySelector("i").classList.contains("fa-lock");
        const text = col.querySelector("h2");

        if(isLocked) return colors.push(text.textContent);

        const color = isInitial
            ? colors[index]
                ? colors[index]
                : chroma.random()
            : chroma.random();
        const button = col.querySelector("button");
        
        if(!isInitial) colors.push(color);

        text.textContent = color;
        col.style.background = color;
 
        setTextAndButtonColor(text, button, color);
    });

    updateColorsHash(colors);
}

function updateColorsHash(colors = []) {
    document.location.hash = colors.map(color => color.toString(  ).substring(1)).join("-");
}

function getColorsFromHash() {
    if(!document.location.hash.length) return [];
    
    return document.location.hash.substring(1).split("-").map(color => `#${color}`);
}

setRandomColors(true);