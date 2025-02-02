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
