async function preloadFonts() {
  const sovPhonbook = new FontFace(
    "phon",
    "url(fonts/phon/sov_phon-webfont.woff2)",
    { style: "normal", weight: "normal" }
  );
  const espressa = new FontFace(
    "espressa",
    "url(fonts/espressa/ACEspressa.woff2)",
    { style: "normal", weight: "normal" }
  );
  const rebel = new FontFace("rebel", "url(fonts/rebel/FCRebelRegular.woff2)", {
    style: "normal",
    weight: "normal",
  });

  await Promise.all([sovPhonbook.load(), espressa.load(), rebel.load()]);

  document.fonts.add(sovPhonbook);
  document.fonts.add(espressa);
  document.fonts.add(rebel);
}

document.addEventListener("DOMContentLoaded", () => {
  preloadFonts();
});

/*Code*/

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const image = new Image();
const image2 = new Image();

let font = "";

function drawText() {
  const text = document.getElementById("canvas");
  const ctx = text.getContext("2d");
  const input = document.getElementById("font-slider");
  const fontName = document.getElementById('fonts').value;
  font = input.value + "px " + fontName;
  ctx.font = font;

  const color = document.getElementById("color-selector").value;
  ctx.fillStyle = color;
  ctx.save();

  const upDown = document.getElementById("upDown-slider").value;
  const leftRight = document.getElementById("leftRight-slider").value;
  const tilt = document.getElementById("tilt-slider").value;
  const textRotate = tilt * Math.PI / 180;
  ctx.translate(upDown, leftRight);
  ctx.rotate(textRotate);
  ctx.fillText(document.getElementById("text-input").value, 0, 0);
  ctx.restore();
}

function loadImage() {
  image.src = "image.png";
  image2.src = "image2.png";
  
  image.onload = () => {
    
    canvas.width = image.width;
    canvas.height = image.height;
    
    context.drawImage(image2, 0, 0);
    
    context.globalCompositeOperation="destination-over";

    drawText();

    context.globalCompositeOperation="destination-over";
    
    context.drawImage(image, 0, 0);
  };
}
loadImage();

function downloadImage() {
  const canvas = document.getElementById("canvas");
  const anchor = document.createElement("a");
  anchor.href = canvas.toDataURL("image/png");
  anchor.download = "IMAGE.PNG";
  anchor.click()
}
  
const overlay = document.querySelector(".overlay");
const container = document.querySelector(".img-container");

function removeBorder() {
  const input = document.getElementById("text-input");
  input.addEventListener("input", () => {
    if (input.value !== "") {
      input.classList.add("border");
    } else {
      input.classList.remove("border");
    }
    loadImage();
  });
}
removeBorder();

function showDisclaimer() {
  if (confirm("ทุกรูปภาพที่ถูกจัดทำโดยเว็บไซต์นี้ เป็นความรับผิดชอบของผู้ใช้งานแต่เพียงผู้เดียว \n\n")) {
    downloadImage();
  }
}