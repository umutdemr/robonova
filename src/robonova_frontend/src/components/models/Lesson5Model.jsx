import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const Lesson5Model = ({ isCorrectCode }) => {
    const mountRef = useRef(null);
    const robotRef = useRef(null);
    const mixerRef = useRef(null);
    const clockRef = useRef(new THREE.Clock());

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
            if (mixerRef.current) {
                mixerRef.current.update(clockRef.current.getDelta());
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
    }, []);

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
        loader.load('/robo5/scene.gltf', (gltf) => {
            robotRef.current = gltf.scene;
            robotRef.current.scale.set(7, 7, 7);
            robotRef.current.position.set(0, -15, -20);

            scene.add(robotRef.current);

            if (gltf.animations.length > 0) {
                mixerRef.current = new THREE.AnimationMixer(robotRef.current);
                console.log("Animasyon yüklendi, mixer oluşturuldu:", mixerRef.current);
                gltf.animations.forEach((clip) => {
                    const action = mixerRef.current.clipAction(clip);
                    action.clampWhenFinished = true;
                    console.log("Animasyon eklendi:", action);
                });
            } else {
                console.log("Yüklenen GLTF dosyasında animasyon yok.");
            }
        });
    };


    const startAnimation = () => {
        if (mixerRef.current) {
            mixerRef.current._actions.forEach(action => {
                action.play();
            });
        } else {
            console.log("Mixer bulunamadı, animasyon başlatılamadı.");
        }
    };


    useEffect(() => {
        console.log("isCorrectCode değişti:", isCorrectCode);
        if (isCorrectCode) {
            startAnimation();
        }
    }, [isCorrectCode]);


    return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default Lesson5Model;
