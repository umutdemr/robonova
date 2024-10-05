import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import InfoIcon from '@mui/icons-material/Info';

const Lesson3Model = ({ robotColor }) => {
    const mountRef = useRef(null);
    const robotRef = useRef(null);
    const [showInfoMessage, setShowInfoMessage] = useState(true);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 1.5, 3);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        mountRef.current?.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(10, 10, 10);
        scene.add(dirLight);

        loadWallModel(scene);
        loadRobotModel(scene);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.1;
        controls.enablePan = false;
        controls.minDistance = 1;
        controls.maxDistance = 10;
        controls.maxPolarAngle = Math.PI / 2;

        const handleResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', handleResize);

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            mountRef.current?.removeChild(renderer.domElement);
            controls.dispose();
            renderer.dispose();
        };
    }, []);

    useEffect(() => {
        if (robotRef.current) {
            changeRobotColor(robotColor);
        }
    }, [robotColor]);

    const changeRobotColor = (color) => {
        if (robotRef.current) {
            robotRef.current.traverse((child) => {
                if (child.isMesh) {
                    child.material.color.set(color);
                }
            });
        }
    };

    const loadWallModel = (scene) => {
        const loader = new GLTFLoader();
        loader.load('/EnvironmentModel/scene.gltf', (gltf) => {
            const wallModel = gltf.scene;
            wallModel.scale.set(10, 10, 10);
            wallModel.position.set(0, -5, -30);
            wallModel.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            scene.add(wallModel);
        });
    };

    const loadRobotModel = (scene) => {
        const loader = new GLTFLoader();
        loader.load('/robo3/scene.gltf', (gltf) => {
            robotRef.current = gltf.scene;
            robotRef.current.scale.set(12, 12, 12);
            robotRef.current.position.set(0, -15, -20);
            scene.add(robotRef.current);

            if (gltf.animations.length > 0) {
                const mixer = new THREE.AnimationMixer(robotRef.current);
                gltf.animations.forEach((clip) => {
                    mixer.clipAction(clip).play();
                });

                const clock = new THREE.Clock();
                const animateRobot = () => {
                    requestAnimationFrame(animateRobot);
                    mixer.update(clock.getDelta());
                };
                animateRobot();
            }
        });
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <div ref={mountRef} style={{ width: '100%', height: '100%' }} />

            {showInfoMessage && (
                <div
                    style={{
                        position: 'absolute',
                        bottom: '20px',
                        left: '20px',
                        background: 'linear-gradient(45deg, rgba(33, 33, 33, 0.8), rgba(66, 66, 66, 0.9))',
                        color: 'white',
                        padding: '20px',
                        borderRadius: '12px',
                        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.3)',
                        fontSize: '16px',
                        maxWidth: '400px',
                        zIndex: 10,
                    }}
                >
                    Use <code>color</code> to change the color of the robot!
                    <br />
                    Example: You can make the robot red with <code>red</code>.
                    <button
                        onClick={() => setShowInfoMessage(false)}
                        style={{
                            position: 'absolute',
                            top: '5px',
                            right: '10px',
                            background: 'transparent',
                            border: 'none',
                            color: 'white',
                            cursor: 'pointer',
                            fontSize: '16px',
                        }}
                    >
                        X
                    </button>
                </div>
            )}

            {!showInfoMessage && (
                <div
                    style={{
                        position: 'absolute',
                        bottom: '20px',
                        left: '20px',
                        zIndex: 10,
                    }}
                >
                    <InfoIcon
                        onClick={() => setShowInfoMessage(true)}
                        style={{
                            color: 'white',
                            fontSize: '32px',
                            cursor: 'pointer',
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default Lesson3Model;
