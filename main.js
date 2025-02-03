const imgSrcList = [
  "images/job-2025-02-01-130326.png",
  "images/job-20240320-072828.jpg",
  "images/quit-20250201-121908.jpg",
  "images/retry-20240822-130351.jpg",
  "images/retry-20240905-205608.jpg",
  "images/trip-20241003-162907.jpg",
  "images/trip-20241002-194334.jpg",
  "images/trip-20241003-120458.jpg",
  "images/ureka-20250108-095534.jpg",
  "images/retry-133314732515599451.png",
];

const scrollBar = document.querySelector(".bar div");
const lastPoint = document.querySelectorAll(".point")[1];
const slideImgs = document.querySelectorAll(".slide img");
const modal = document.querySelector("#modal");

document.addEventListener(
  "scroll",
  throttle(() => {
    fillTimelin();
    lazyLoadImgs();
  }, 300)
);

slideImgs.forEach((img) =>
  img.addEventListener("click", (e) => {
    const modalImg = document.querySelector("#modal img");
    let currentIndex = Number(e.target.dataset.index);

    setModalImg(modalImg, e.target.src);
    slideWhenClickBtns(modalImg, currentIndex);
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

function fillTimelin() {
  const percent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  scrollBar.style.height = percent + "%";

  if (percent === 100) lastPoint.style.backgroundColor = "#78cdc9";
  else lastPoint.style.backgroundColor = "#d3d3d3";
}

function lazyLoadImgs() {
  const lazyImgs = document.querySelectorAll(".lazy");

  lazyImgs.forEach((img) => {
    if (img.offsetTop < window.innerHeight + window.scrollY) {
      img.setAttribute("src", img.dataset.src);
      img.classList.remove("lazy");
    }
  });
}

function setModalImg(modalImg, imgSrc) {
  modalImg.src = imgSrc;
  modalImg.onclick = (e) => {
    e.stopPropagation();
  };
  document.body.style.overflowY = "hidden"; // Prevent scroll
  modal.style.display = "flex";
}

function slideWhenClickBtns(modalImg, index) {
  const [leftBtn, rightBtn] = document.querySelectorAll("button");

  leftBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    index = index > 0 ? index - 1 : imgSrcList.length - 1;
    modalImg.src = imgSrcList[index];
  });
  rightBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    index = (index + 1) % imgSrcList.length;
    modalImg.src = imgSrcList[index];
  });
}
