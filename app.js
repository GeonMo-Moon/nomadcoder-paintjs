const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "black";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
// ctx.fillRect(50, 20, 100, 49);

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseDown(event){
    painting = true;
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleCanavsClick(){
    if(filling)
        ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function handleCM(event){
    event.preventDefault();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanavsClick);
    canvas.addEventListener("contextmenu", handleCM);

}

Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
);

function handleRangeChange(event){
    ctx.lineWidth = event.target.value;
    console.log(event.target.value);
}

if(range){
    range.addEventListener("input", handleRangeChange);
}

function handleModeClick(){
    if(filling == true){
        filling = false;
        mode.innerText = "Fill";
    }else{
        filling = true;
        mode.innerText = "PAINT";
    }
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "hello";
    link.click();
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}