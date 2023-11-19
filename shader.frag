#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_seed;

uniform sampler2D u_texture;

varying vec2 v_texcoord;

vec2 getAspectRatio(vec2 uv, float texture_ratio, float canvas_ratio)
{
    // copy original coordinate system
    vec2 coords = uv;
    
    
    // if canvas is too portrait for the texture, stretch across
    // else canvas too landscape for the texutre, stretch down
    if (texture_ratio > canvas_ratio) {
        float diff = canvas_ratio / texture_ratio;
        coords.x *= diff;
        // center the texture
        coords.x += (1.0 - diff) / 2.0;
    } else {
        float diff = texture_ratio / canvas_ratio;
        coords.y *= diff;
        // center the texture
        coords.y += (1.0 - diff) / 2.0;
    }
    
    return coords;
}

void main() {
    vec2 uv = v_texcoord;

    // find out aspect ratios
    float texture_ratio = 1200.0 / 1800.0;
    float canvas_ratio = u_resolution.x / u_resolution.y;
    
    vec2 coords = getAspectRatio(uv, texture_ratio, canvas_ratio);
    
    // make a normalize mouse
    vec2 mouse = u_mouse / u_resolution;
    
    // make a safe area
    coords = mix(vec2(0.1, 0.1), vec2(0.9, 0.9), coords);
    
    float blocks = 12.0;
    float x = floor(uv.x * blocks) / blocks;
    float y = floor(uv.y * blocks) / blocks;
    
    vec2 distortion = 0.1 * vec2(
        sin(u_time * 0.5 + x * 1.0 + y * 1.5 + mouse.x + u_seed),
        cos(u_time * 0.2 + x * 1.1 + y * 2.0 + mouse.y + u_seed)
    );

    vec4 texture = texture2D(u_texture, coords + distortion);
    
    vec4 color = vec4(1.0, 0.0, 0.0, 1.0);
    gl_FragColor = texture;
}
