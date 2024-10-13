import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import InfoIcon from '@mui/icons-material/Info';

const Lesson6Model = ({ robotType, robotName, robotActive }) => {
    const mountRef = useRef(null);
    const robotRef = useRef(null);
    const mixerRef = useRef(null);
    const clockRef = useRef(new THREE.Clock());
    const [showMessage, setShowMessage] = useState(true);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 1.5, 3);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(10, 10, 10);
        scene.add(dirLight);

        loadWallModel(scene);
        loadRobotModel(scene, robotType, robotActive);

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

            const delta = clockRef.current.getDelta();
            if (mixerRef.current) {
                mixerRef.current.update(delta);
            }

            renderer.render(scene, camera);
        };
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            controls.dispose();
            renderer.dispose();
        };
    }, [robotType, robotActive]);

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

    const loadRobotModel = (scene, robotType, robotActive) => {
        const loader = new GLTFLoader();
        const modelPath = robotType === 'Astromech' ? '/robo6/scene.gltf' : '/robo2/scene.gltf';

        loader.load(modelPath, (gltf) => {
            robotRef.current = gltf.scene;
            robotRef.current.scale.set(7, 7, 7);
            robotRef.current.position.set(0, -15, -20);

            scene.add(robotRef.current);

            if (gltf.animations.length > 0 && robotActive) {
                mixerRef.current = new THREE.AnimationMixer(robotRef.current);
                gltf.animations.forEach((clip) => {
                    const action = mixerRef.current.clipAction(clip);
                    action.setEffectiveTimeScale(1);
                    action.play();
                });
            } else {
                console.log(`No animation in the loaded GLTF file or robot is not active! (${robotActive}).`);
            }
        });
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <div ref={mountRef} style={{ width: '100%', height: '100%' }} />

            {showMessage && (
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
                    Robot Name: <b>{robotName}</b>
                    <br />
                    ENTER <b>Astromech</b> OR <b>Mechdroid</b> TO CHANGE YOUR ROBOT.
                    <button
                        onClick={() => setShowMessage(false)}
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

            {!showMessage && (
                <div
                    style={{
                        position: 'absolute',
                        bottom: '20px',
                        left: '20px',
                        zIndex: 10,
                    }}
                >
                    <InfoIcon
                        onClick={() => setShowMessage(true)}
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

export default Lesson6Model;
