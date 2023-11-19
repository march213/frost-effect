#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

varying vec2 v_texcoord;

void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
