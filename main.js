const slideImgList = [
  "job-2025-02-01-130326.png",
  "job-20240320-072828.jpg",
  "quit-20250201-121908.jpg",
  "retry-20240822-130351.jpg",
  "retry-20240905-205608.jpg",
  "trip-20241003-162907.jpg",
  "trip-20241002-194334.jpg",
  "trip-20241003-120458.jpg",
  "ureka-20250108-095534.jpg",
  "retry-133314732515599451.png",
];

const scrollBar = document.querySelector(".bar div");
const lastPoint = document.querySelectorAll(".point")[1];
const slideImgs = document.querySelectorAll(".slide img");
const modal = document.querySelector("#modal");

document.addEventListener(
  "scroll",
  throttle(() => {
    const percent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    scrollBar.style.height = percent + "%";

    if (percent === 100) lastPoint.style.backgroundColor = "#78cdc9";
    else lastPoint.style.backgroundColor = "#d3d3d3";

    lazyLoadImgs();
  }, 300)
);

slideImgs.forEach((img) =>
  img.addEventListener("click", (e) => {
    const modalImg = document.querySelector("#modal img");

    modalImg.src = e.target.src;
    modalImg.alt = e.target.alt;
    modalImg.onclick = (e) => {
      e.stopPropagation();
    };
    document.body.style.overflowY = "hidden"; // Prevent scroll
    modal.style.display = "flex";
  })
);

modal.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.style.overflowY = "unset";
});

function throttle(callback, delay) {
  let timerId = null;

  return () => {
    if (timerId) return;
    timerId = setTimeout(() => {
      callback();
      timerId = null;
    }, delay);
  };
}

let timeoutId;

function lazyLoadImgs() {
  const lazyImgs = document.querySelectorAll(".lazy");

  lazyImgs.forEach((img) => {
    if (img.offsetTop < window.innerHeight + window.scrollY) {
      img.setAttribute("src", img.dataset.src);
      img.classList.remove("lazy");
    }
  });
}
