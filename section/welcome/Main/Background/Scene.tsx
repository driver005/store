import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DataTexture, DoubleSide, RGBAFormat, FloatType, NearestFilter, Vector4, MathUtils } from 'three';
import { useWindowSize } from 'react-use';
import { extend, useFrame, useLoader, useThree } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { vertex, fragment } from '@utils/index';
import { StaticImageData } from 'next/image';


const settings = {
    grid: 607,
    mouse: 0.11,
    strength: 0.36,
    relaxation: 0.96,
};
let time = 0;
const mouse = {
    x: 0,
    y: 0,
    vX: 0,
    vY: 0,
    prevX: 0,
    prevY: 0,
};

// Tree-shaking
extend({ DataTexture, DoubleSide, RGBAFormat, FloatType, NearestFilter, Vector4 });

interface SceneProps {
    img: string
}

const Scene: React.FC<SceneProps> = ({ img }) => {
    const shaderRef: any = useRef();
    const { camera } = useThree();
    const texture = useLoader(TextureLoader, img);
    const { width: winWidth, height: winHeight } = useWindowSize();
    const [dataTexture, setDataTexture] = useState(new DataTexture());

    const regenerateGrid = useCallback(() => {
        const width = settings.grid;
        const height = settings.grid;
        const size = winWidth * winHeight;
        const data = new Float32Array(4 * size);

        for (let i = 0; i < size; i++) {
            let r = Math.random() * 255 - 125;
            let g = Math.random() * 255 - 125;
            let b = Math.random() * 255 - 125;

            const stride = i * 4;

            data[stride] = r;
            data[stride + 1] = g;
            data[stride + 2] = b;
            data[stride + 3] = 1;
        }

        const texture = new DataTexture(data, width, height, RGBAFormat, FloatType);

        texture.magFilter = texture.minFilter = NearestFilter;

        if (shaderRef.current) {
            shaderRef.current.uniforms.uDataTexture.value = texture;
            shaderRef.current.uniforms.uDataTexture.value.needsUpdate = true;
        }

        setDataTexture(texture);
    }, [setDataTexture, shaderRef]);

    const onMouseMove = useCallback(
        (e: { clientX: number; clientY: number; }) => {
            mouse.x = e.clientX / winWidth;
            mouse.y = e.clientY / winHeight;

            mouse.vX = mouse.x - mouse.prevX;
            mouse.vY = mouse.y - mouse.prevY;

            mouse.prevX = mouse.x;
            mouse.prevY = mouse.y;
        },
        [winWidth, winHeight]
    );

    const onResize = useCallback(() => {
        const img = texture.image;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const imageAspect = img.height / img.width;

        let a1;
        let a2;

        if (screenHeight / screenWidth > imageAspect) {
            a1 = (screenWidth / screenHeight) * imageAspect;
            a2 = 1;
        } else {
            a1 = 1;
            a2 = (screenHeight / screenWidth) * imageAspect;
        }

        if (shaderRef.current) {
            shaderRef.current.uniforms.resolution.value.x = img.offsetWidth;
            shaderRef.current.uniforms.resolution.value.y = img.offsetHeight;
            shaderRef.current.uniforms.resolution.value.z = a1;
            shaderRef.current.uniforms.resolution.value.w = a2;
        }

        camera.updateProjectionMatrix();

        regenerateGrid();
    }, [camera, texture, regenerateGrid]);

    const updateDataTexture = useCallback(() => {
        let data = dataTexture.image.data;

        if (!data) {
            return;
        }

        for (let i = 0; i < data.length; i += 4) {
            data[i] *= settings.relaxation;
            data[i + 1] *= settings.relaxation;
        }

        let gridMouseX = settings.grid * mouse.x;
        let gridMouseY = settings.grid * (1 - mouse.y);
        let maxDist = settings.grid * settings.mouse;
        let aspect = winHeight / winWidth;

        for (let i = 0; i < settings.grid; i++) {
            for (let j = 0; j < settings.grid; j++) {
                let distance = (gridMouseX - i) ** 2 / aspect + (gridMouseY - j) ** 2;
                let maxDistSq = maxDist ** 2;

                if (distance < maxDistSq) {
                    let index = 4 * (i + settings.grid * j);
                    let power = maxDist / Math.sqrt(distance);

                    power = MathUtils.clamp(power, 0, 10);

                    data[index] += settings.strength * 100 * mouse.vX * power;
                    data[index + 1] -= settings.strength * 100 * mouse.vY * power;
                }
            }
        }

        mouse.vX *= 0.9;
        mouse.vY *= 0.9;

        dataTexture.needsUpdate = true;
    }, [winWidth, winHeight, dataTexture]);

    useFrame(({ camera }) => {
        time += 0.5;

        updateDataTexture();

        if (shaderRef.current) {
            shaderRef.current.uniforms.time.value = time;
        }

        camera.updateProjectionMatrix();
    });

    useEffect(() => {
        regenerateGrid();

        window.addEventListener('resize', onResize);
        window.addEventListener('mousemove', onMouseMove);

        return () => {
            window.removeEventListener('resize', onResize);
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, [onMouseMove, onResize, regenerateGrid]);

    return (
        <mesh>
            <planeGeometry

            />
            <shaderMaterial
                ref={shaderRef}
                side={DoubleSide}
                uniforms={{
                    time: {
                        value: 0,
                    },
                    resolution: {
                        value: new Vector4(),
                    },

                    uTexture: {
                        value: texture,
                    },
                    uDataTexture: {
                        value: dataTexture,
                    },
                }}
                vertexShader={vertex}
                fragmentShader={fragment}
                extensions={{
                    derivatives: true,
                    fragDepth: false,
                    drawBuffers: false,
                    shaderTextureLOD: false
                }}
            />
        </mesh>
    );
};

export default Scene;