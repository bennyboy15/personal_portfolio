const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");
let width, height;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Ball {
  constructor() {
    this.radius = Math.random() * 10 + 5;
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.dx = (Math.random() - 0.5) * 2;
    this.dy = (Math.random() - 0.5) * 2;
    this.color = `hsla(${Math.random() * 360}, 100%, 70%, 0.2)`;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    if (this.x + this.radius > width || this.x - this.radius < 0) this.dx *= -1;
    if (this.y + this.radius > height || this.y - this.radius < 0)
      this.dy *= -1;
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

const balls = Array.from({ length: 50 }, () => new Ball());

function animate() {
  ctx.clearRect(0, 0, width, height);
  balls.forEach((ball) => ball.update());
  requestAnimationFrame(animate);
}

animate();

// IMG & VIDEO GALLERY 
function showImage(dot) {
  const galleryIndex = dot.dataset.gallery;
  const imageIndex = parseInt(dot.dataset.index);

  // Find the right project container
  const projectGalleries = document.querySelectorAll('.flip-card-gallery');
  const currentGallery = projectGalleries[galleryIndex];

  // Get all media (images/videos) inside this gallery
  const mediaElements = currentGallery.querySelectorAll('.carousel-video');
  const dots = currentGallery.querySelectorAll('.dot');

  // Hide all and remove active class
  mediaElements.forEach(el => el.classList.remove('active'));
  dots.forEach(el => el.classList.remove('active'));

  // Show the selected
  mediaElements[imageIndex].classList.add('active');
  dots[imageIndex].classList.add('active');
}

// DARK MODE TOGGLE
const toggleBtn = document.getElementById("darkModeToggle");
toggleBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
});


function togglePlay() {
  const video = document.getElementById("home-video");
  if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
}