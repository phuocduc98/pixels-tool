const LAND_TOTAL = 5000;
const LAND_DISPLAY_NUM = 5;

const pixel = document.getElementById("pixel");
const empty = document.getElementById("empty");
empty.style.display = "none";

let lands = [];

const landsInit = () => {
  lands = Array.from({ length: LAND_DISPLAY_NUM }, (v, i) => i + 1);
};

landsInit();

const getLands = () => {
  if (pixel.firstChild) {
    pixel.removeChild(pixel.firstChild);
  }

  const iframes = document.createElement("div");
  iframes.id = "iframes";
  iframes.className = "iframes";

  lands.forEach((land) => {
    const iframeBox = document.createElement("div");
    iframeBox.className = "iframe-box";

    const iframe = document.createElement("iframe");
    iframe.id = "iframe";
    iframe.src = `https://play.pixels.xyz/pixels/share/${land}`;
    iframe.width = window.innerWidth / 3 - 100;
    iframe.height = window.innerHeight / 2 - 100;
    iframe.allowfullscreen = true;

    const landNum = document.createElement("p");
    landNum.innerHTML = land;
    landNum.className = "land-num";

    iframeBox.appendChild(iframe);
    iframeBox.appendChild(landNum);
    iframes.appendChild(iframeBox);
  });

  if (iframes.childElementCount) pixel.appendChild(iframes);
};

getLands();

const next = () => {
  if (lands[lands.length - 1] >= LAND_TOTAL) {
    landsInit();
    getLands();
    return;
  }
  lands = lands.map((x, i, arr) => x + arr.length);
  getLands();
};

const prev = () => {
  if (lands[0] <= LAND_DISPLAY_NUM) {
    landsInit();
    getLands();
    return;
  }
  lands = lands.map((x, i, arr) => x - arr.length);
  getLands();
};

const goToLand = () => {
  let inputLandValue = Number(document.getElementById("land").value);
  if (inputLandValue < 1 || inputLandValue > LAND_TOTAL) {
    pixel.style.display = "none";
    empty.style.display = "block";
    return;
  }

  pixel.style.display = "block";
  empty.style.display = "none";

  let newLands = [inputLandValue];

  lands.forEach((x, i) => {
    if (i !== 0) {
      let land = inputLandValue + i;
      if (land <= LAND_TOTAL) newLands.push(land);
    }
  });

  lands = newLands;
  return getLands();
};
