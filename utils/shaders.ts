export const vertex = `
    uniform float time;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec2 pixels;
    float PI = 3.141592653589793238;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
    }`;

export const fragment = `
    uniform float time;
    uniform float progress;
    uniform sampler2D uDataTexture;
    uniform sampler2D uTexture;
    
    uniform vec4 resolution;
    varying vec2 vUv;
    varying vec3 vPosition;
    float PI = 3.141592653589793238;
    
    void main() {
        vec2 newUV = (vUv - vec2(0.5)) * resolution.w + vec2(0.5);
        vec4 color = texture2D(uTexture, newUV);
        vec4 offset = texture2D(uDataTexture, vUv);
        gl_FragColor = vec4(vUv, 0.0, 1.0);
        gl_FragColor = vec4(offset.r, 0.0, 0.0, 1.0);
        gl_FragColor = color;
        gl_FragColor = texture2D(uTexture, newUV - 0.02 * offset.rg);
    }`;

export const particles = `
    uniform float time;
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform sampler2D texture1;
    float PI=3.141592653589793238;
    void main() {
        vUv = uv;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = 1000. * (1.0 / - mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
    }`;