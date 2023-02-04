// Create the key board
let alphabet = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "⌫" ]
];

const keyboard = document.createElement("div");
keyboard.id = "keyboard";


for (let i = 0; i < alphabet.length; i++) {
    let currRow = alphabet[i];
    let keyboardRow = document.createElement("div");
    keyboardRow.classList.add("keyboard-row");

    for (let j = 0; j < currRow.length; j++) {
        let keyTile = document.createElement("button");

        let key = currRow[j];
        keyTile.innerText = key;
        if (key == "⌫") {
            keyTile.id = "Backspace";
        } else {
            keyTile.id = key;
        }

        keyTile.addEventListener("click", result);

        if (key == "Enter") {
            keyTile.classList.add("enter");
        }

        keyTile.classList.add("key-tile");

        keyboardRow.appendChild(keyTile);
    }
    keyboard.appendChild(keyboardRow);
    keyboard.classList.add("light");

}

document.body.appendChild(keyboard);

function result() {
    performAction(this.id);
}
