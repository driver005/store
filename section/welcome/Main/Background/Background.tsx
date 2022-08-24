import { Canvas } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
// import { EffectComposer, Noise } from '@react-three/postprocessing';
import { Suspense } from 'react';
import { Scene } from '@section/welcome';
import { Box } from '@chakra-ui/react';
import img from "@assets/globe.png";

const frustumSize = 1;

const Background = () => {
    return (
        <Box position='absolute' w='full' h='full' zIndex='-1'>
            <Canvas fallback={null}>
                <OrthographicCamera
                    makeDefault
                    position={[0, 0, 2]}
                    left={frustumSize / -2}
                    right={frustumSize / 2}
                    top={frustumSize / 2}
                    bottom={frustumSize / -2}
                    near={-1000}
                    far={1000}
                    manual
                >
                    {/* <EffectComposer>
                        <Noise opacity={0.02} />
                    </EffectComposer> */}
                    <Suspense fallback={null}>
                        <Scene
                            img={img.src}
                        // img='https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2FFront-NoModel_ec3be051-d579-4c03-b55b-64449d0b0445.png%3Fv%3D1623255893&w=1200&q=85'
                        />
                    </Suspense>
                </OrthographicCamera>
            </Canvas>
        </Box>
    );
};

export default Background;