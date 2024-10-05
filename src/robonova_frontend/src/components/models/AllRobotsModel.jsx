import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import InfoIcon from '@mui/icons-material/Info';

const AllRobotsModel = () => {
    const mountRef = useRef(null);
    const [showMessage, setShowMessage] = useState(true);
    const mixers = useRef([]);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
        camera.position.set(0, 20, 100);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);
        const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
        dirLight.position.set(10, 20, 10);
        scene.add(dirLight);

        loadGLTFModel(scene);
        loadAllRobots(scene);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.1;
        controls.enablePan = false;
        controls.maxPolarAngle = Math.PI / 2;
        controls.minDistance = 0;
        controls.maxDistance = 800;

        const handleResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);

        const clock = new THREE.Clock();
        const animate = () => {
            requestAnimationFrame(animate);
            const delta = clock.getDelta();
            mixers.current.forEach((mixer) => mixer.update(delta));
            controls.update();
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
    }, []);

    const loadGLTFModel = (scene) => {
        const loader = new GLTFLoader();

        loader.load('/allRobots/scene.gltf', (gltf) => {
            const model = gltf.scene;
            model.scale.set(5, 5, 5);
            model.position.set(0, -5, 0);
            scene.add(model);

            if (gltf.animations && gltf.animations.length > 0) {
                const mixer = new THREE.AnimationMixer(model);
                gltf.animations.forEach((clip) => {
                    const action = mixer.clipAction(clip);
                    action.play();
                });
                mixers.current.push(mixer);
            }
        });
    };

    const loadAllRobots = (scene) => {
        const loader = new GLTFLoader();
        const radius = 100;
        const totalRobots = 7;
        const robotScales = [
            { x: 5, y: 5, z: 5 },
            { x: 35, y: 35, z: 35 },
            { x: 45, y: 45, z: 45 },
            { x: 35, y: 35, z: 35 },
            { x: 35, y: 35, z: 35 },
            { x: 35, y: 35, z: 35 },
            { x: 35, y: 35, z: 35 },
        ];

        const robotModels = [
            '/robo1/scene.gltf',
            '/robo2/scene.gltf',
            '/robo3/scene.gltf',
            '/robo4/scene.gltf',
            '/robo5/scene.gltf',
            '/robo6/scene.gltf',
            '/robo7/scene.gltf',
        ];

        robotModels.forEach((model, index) => {
            loader.load(model, (gltf) => {
                const robot = gltf.scene;
                const angle = (index / totalRobots) * Math.PI * 2; // Calculate angle for each robot
                const x = radius * Math.cos(angle); // X position using cosine
                const z = radius * Math.sin(angle); // Z position using sine

                // Adjust Y position for the 4th robot
                const y = index === 3 ? 55 : -5;  // Lifting the 4th robot slightly higher

                robot.scale.set(robotScales[index].x, robotScales[index].y, robotScales[index].z);
                robot.position.set(x, y, z); // Adjusted Y position for the 4th robot
                scene.add(robot);

                if (gltf.animations.length > 0) {
                    const mixer = new THREE.AnimationMixer(robot);
                    gltf.animations.forEach((clip) => {
                        const action = mixer.clipAction(clip);
                        action.play();
                    });

                    const clock = new THREE.Clock();
                    const animateRobot = () => {
                        requestAnimationFrame(animateRobot);
                        mixer.update(clock.getDelta());
                    };
                    animateRobot();
                }
            });
        });
    };



    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <div ref={mountRef} style={{ width: '100%', height: '100%' }} />

            {showMessage && (
                <div style={{
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
                }}>
                    This view shows all robot models! You can rotate and zoom to explore each robot.
                    <button style={{
                        position: 'absolute',
                        top: '5px',
                        right: '10px',
                        background: 'transparent',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '16px',
                    }}
                        onClick={() => setShowMessage(false)}>X</button>
                </div>
            )}

            {!showMessage && (
                <InfoIcon
                    style={{
                        position: 'absolute',
                        bottom: '20px',
                        left: '20px',
                        fontSize: '30px',
                        color: 'white',
                        cursor: 'pointer'
                    }}
                    onClick={() => setShowMessage(true)}
                />
            )}
        </div>
    );
};

export default AllRobotsModel;
