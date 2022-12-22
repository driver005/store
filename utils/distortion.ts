import * as THREE from 'three'

function clamp(number: number, min: number, max: number) {
    return Math.max(min, Math.min(number, max))
}

export default class Distortion {
    scene: THREE.Scene
    container: any
    img: any
    width: any
    height: any
    renderer: THREE.WebGLRenderer
    camera: any
    time: number
    mouse: {
        x: number
        y: number
        prevX: number
        prevY: number
        vX: number
        vY: number
    }
    isPlaying: boolean
    imageAspect: number | undefined
    material: any
    size: any
    texture: THREE.DataTexture | undefined
    imageTexture: THREE.Texture
    geometry: THREE.PlaneGeometry | undefined
    plane: THREE.Mesh<any, any> | undefined
    settings: {
        grid: number
        mouse: number
        strength: number
        relaxation: number
        image: string
    }
    constructor(options: { dom: any }) {
        this.scene = new THREE.Scene()

        this.container = options.dom
        this.img = this.container.querySelector('img')
        this.width = this.container.offsetWidth
        this.height = this.container.offsetHeight
        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.renderer.setSize(this.width, this.height)
        this.renderer.setClearColor(0xeeeeee, 1)
        this.renderer.physicallyCorrectLights = true
        this.renderer.outputEncoding = THREE.sRGBEncoding

        this.settings = {
            grid: this.getValue('grid') || 34,
            mouse: this.getValue('mouse') || 0.25,
            strength: this.getValue('strength') || 1,
            relaxation: this.getValue('relaxation') || 0.9,
            image: this.container.getAttribute('data-image'),
        }
        // console.log(this.settings.image)
        this.imageTexture = new THREE.TextureLoader().load(this.settings.image)

        this.container.appendChild(this.renderer.domElement)

        this.camera = new THREE.PerspectiveCamera(
            70,
            window.innerWidth / window.innerHeight,
            0.1,
            100
        )

        var frustumSize = 1
        var aspect = window.innerWidth / window.innerHeight
        this.camera = new THREE.OrthographicCamera(
            frustumSize / -2,
            frustumSize / 2,
            frustumSize / 2,
            frustumSize / -2,
            -1000,
            1000
        )
        this.camera.position.set(0, 0, 2)

        this.time = 0

        this.mouse = {
            x: 0,
            y: 0,
            prevX: 0,
            prevY: 0,
            vX: 0,
            vY: 0,
        }

        this.isPlaying = true
        this.initiate(() => {
            this.addObjects()
            this.resize()
            this.render()
            this.setupResize()
            this.mouseEvents()
        })
    }

    initiate(cb: { (): void; (): void }) {
        const promises: any[] = []
        Promise.all(promises).then(() => {
            cb()
        })
    }

    getValue(val: string) {
        return parseFloat(this.container.getAttribute('data-' + val))
    }

    mouseEvents() {
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX / this.width
            this.mouse.y = e.clientY / this.height

            // console.log(this.mouse.x,this.mouse.y)

            this.mouse.vX = this.mouse.x - this.mouse.prevX
            this.mouse.vY = this.mouse.y - this.mouse.prevY

            this.mouse.prevX = this.mouse.x
            this.mouse.prevY = this.mouse.y

            // console.log(this.mouse.vX,'vx')
        })
    }

    settingss() {}

    setupResize() {
        window.addEventListener('resize', this.resize.bind(this))
    }

    resize() {
        this.width = this.container.offsetWidth
        this.height = this.container.offsetHeight
        this.renderer.setSize(this.width, this.height)
        this.camera.aspect = this.width / this.height

        // image cover
        this.imageAspect = 1 / 1.5
        let a1
        let a2
        if (this.height / this.width > this.imageAspect) {
            a1 = (this.width / this.height) * this.imageAspect
            a2 = 1
        } else {
            a1 = 1
            a2 = this.height / this.width / this.imageAspect
        }

        this.material.uniforms.resolution.value.x = this.width
        this.material.uniforms.resolution.value.y = this.height
        this.material.uniforms.resolution.value.z = a1
        this.material.uniforms.resolution.value.w = a2

        this.camera.updateProjectionMatrix()
        this.regenerateGrid()
    }

    regenerateGrid() {
        this.size = this.settings.grid

        const width = this.size
        const height = this.size

        const size = width * height
        const data = new Float32Array(4 * size)
        const color = new THREE.Color(0xffffff)

        const r = Math.floor(color.r * 255)
        const g = Math.floor(color.g * 255)
        const b = Math.floor(color.b * 255)

        for (let i = 0; i < size; i++) {
            let r = Math.random() * 255 - 125
            let r1 = Math.random() * 255 - 125

            const stride = i * 4

            data[stride] = r
            data[stride + 1] = r1
            data[stride + 2] = r
            data[stride + 3] = 255
        }

        // used the buffer to create a DataTexture

        this.texture = new THREE.DataTexture(
            data,
            width,
            height,
            THREE.RGBAFormat,
            THREE.FloatType
        )

        // this.texture.magFilter = this.texture.minFilter = THREE.NearestFilter;

        if (this.material) {
            this.material.uniforms.uDataTexture.value = this.texture
            this.material.uniforms.uDataTexture.value.needsUpdate = true
        }
    }

    addObjects() {
        this.regenerateGrid()
        // let texture = new THREE.Texture()
        // texture.needsUpdate = true;
        this.material = new THREE.ShaderMaterial({
            extensions: {
                derivatives: true,
            },
            side: THREE.DoubleSide,
            uniforms: {
                time: {
                    value: 0,
                },
                resolution: {
                    value: new THREE.Vector4(),
                },
                uTexture: {
                    value: this.imageTexture,
                },
                uDataTexture: {
                    value: this.texture,
                },
            },
            vertexShader: `
                uniform float time;
                varying vec2 vUv;
                varying vec3 vPosition;
                uniform vec2 pixels;
                float PI = 3.141592653589793238;
                void main() {
                vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform float progress;
                uniform sampler2D uDataTexture;
                uniform sampler2D uTexture;
                uniform vec4 resolution;
                varying vec2 vUv;
                varying vec3 vPosition;
                float PI = 3.141592653589793238;
                void main()	{
                    vec2 newUV = (vUv - vec2(0.5))*resolution.w + vec2(0.5);
                    vec4 color = texture2D(uTexture,newUV);
                    vec4 offset = texture2D(uDataTexture,vUv);
                    gl_FragColor = vec4(vUv,0.0,1.);
                    gl_FragColor = vec4(offset.r,0.,0.,1.);
                    gl_FragColor = color;
                    gl_FragColor = texture2D(uTexture,newUV - 0.02*offset.rg);
                }
            `,
        })

        this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1)

        this.plane = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.plane)
    }

    updateDataTexture() {
        let data = this.texture!.image.data
        for (let i = 0; i < data.length; i += 3) {
            data[i] *= this.settings.relaxation
            data[i + 1] *= this.settings.relaxation
        }

        let gridMouseX = this.size * this.mouse.x
        let gridMouseY = this.size * (1 - this.mouse.y)
        let maxDist = this.size * this.settings.mouse
        let aspect = this.height / this.width

        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                let distance =
                    (gridMouseX - i) ** 2 / aspect + (gridMouseY - j) ** 2
                let maxDistSq = maxDist ** 2

                if (distance < maxDistSq) {
                    let index = 3 * (i + this.size * j)

                    let power = maxDist / Math.sqrt(distance)
                    power = clamp(power, 0, 10)
                    // if(distance <this.size/32) power = 1;
                    // power = 1;

                    data[index] +=
                        this.settings.strength * 100 * this.mouse.vX * power
                    data[index + 1] -=
                        this.settings.strength * 100 * this.mouse.vY * power
                }
            }
        }

        this.mouse.vX *= 0.9
        this.mouse.vY *= 0.9
        this.texture!.needsUpdate = true
    }

    render() {
        if (!this.isPlaying) return
        this.time += 0.05
        this.updateDataTexture()
        this.material.uniforms.time.value = this.time
        requestAnimationFrame(this.render.bind(this))
        this.renderer.render(this.scene, this.camera)
    }
}
