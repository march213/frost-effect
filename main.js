import './style.css';
import GlslCanvas from 'glslCanvas';
import fragString from './shader.frag?raw';

const canvases = document.querySelectorAll('canvas');

canvases.forEach((canvas, index) => {
  const sandbox = new GlslCanvas(canvas);
  sandbox.load(fragString);
  sandbox.setUniform('u_texture', `./public/image${index + 1}.jpg`);
  sandbox.setUniform('u_seed', Math.random());

  sizer(canvas);
});

function sizer(canvas) {
  const w = canvas.parentNode.clientWidth;
  const h = canvas.parentNode.clientHeight;
  const dpi = window.devicePixelRatio || 1;

  canvas.width = w * dpi;
  canvas.height = h * dpi;
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;
}

window.addEventListener('resize', sizer);
