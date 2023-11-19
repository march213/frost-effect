import './style.css';
import GlslCanvas from 'glslCanvas';
import fragString from './shader.frag?raw';

const canvases = document.querySelectorAll('canvas');

canvases.forEach((canvas, index) => {
  const sandbox = new GlslCanvas(canvas);
  sandbox.load(fragString);
  sandbox.setUniform('u_texture', `./public/image${index + 1}.jpg`);

  sizer(canvas);
});

function sizer(canvas) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const dpi = window.devicePixelRatio || 1;

  const s = Math.max(vw, vh);

  canvas.width = s * dpi;
  canvas.height = s * dpi;
  canvas.style.width = `${s}px`;
  canvas.style.height = `${s}px`;
}

window.addEventListener('resize', sizer);
