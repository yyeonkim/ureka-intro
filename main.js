const scrollBar = document.querySelector(".bar div");
const lastPoint = document.querySelectorAll(".point")[1];

document.addEventListener(
  "scroll",
  throttle(() => {
    const percent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    scrollBar.style.height = percent + "%";

    if (percent === 100) lastPoint.style.backgroundColor = "#78cdc9";
    else lastPoint.style.backgroundColor = "#d3d3d3";
  }, 300)
);

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
