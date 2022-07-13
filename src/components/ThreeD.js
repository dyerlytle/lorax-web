import React, { useRef } from 'react'
import {
    Canvas,
    useFrame,
    useLoader,
    useThree,
    extend
} from '@react-three/fiber'
import * as THREE from "three";
import { Suspense } from 'react';

import './styles.css';
// import { Object3D } from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import im1 from "../assets/images/sky-map.png";

// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
extend({ OrbitControls });

var azimuth = 180;
var elevation = 45;

function azChange(event) {
    azimuth = event.target.value;
}

function elChange(event) {
    elevation = event.target.value;
}

const CameraControls = () => {
    // Get a reference to the Three.js Camera, and the canvas html element.
    // We need these to setup the OrbitControls component.
    // https://threejs.org/docs/#examples/en/controls/OrbitControls
    const {
        camera,
        gl: { domElement },
    } = useThree();
    // Ref to the controls, so that we can update them on every frame using useFrame
    const controls = useRef();
    useFrame((state) => controls.current.update());
    return <orbitControls ref={controls} args={[camera, domElement]} />;
};

function Dome(props) {
    const texture = useLoader(THREE.TextureLoader, im1)
    const ref = useRef()
    return (
        <object3D>
            <mesh
                {...props}
                ref={ref} >
                <sphereBufferGeometry attach="geometry" args={[300, 360, 90]} />

                <meshBasicMaterial attach="material" map={texture} side={THREE.BackSide} />
            </mesh>
        </object3D>
    )
}

function Telescope(props) {
    // This reference will give us direct access to the THREE.Mesh object
    const ref = useRef()
    const mountRef = useRef()
    const mountRef2 = useRef()
    const floorRef = useRef()
    const group = useRef()
    const mountGroup = useRef()
    const floorGroup = useRef()
    // Subscribe this component to the render-loop, rotate the mesh every frame
    // useFrame((state, delta) => (ref.current.rotation.x = azimuth, ref.current.rotation.y = elevation))
    useFrame(state => {

        ref.current.position.x = -0.5
        ref.current.position.y = 2.0
        ref.current.position.z = -0.5
        mountRef.current.position.x = -0.0
        mountRef.current.position.y = -11.0
        mountRef.current.position.z = -3.5
        mountRef2.current.position.x = -0.0
        mountRef2.current.position.y = -11.0
        mountRef2.current.position.z = 2.5
        group.current.position.y = -8.0
        group.current.rotation.y = azimuth * 0.0174533
        group.current.rotation.z = elevation * 0.0174533
        floorGroup.current.rotation.y = 0 * 0.0174533
        floorGroup.current.rotation.x = 90 * 0.0174533
        floorGroup.current.rotation.z = 0 * 0.0174533
        floorGroup.current.position.y = -12.0
        mountGroup.current.rotation.y = azimuth * 0.0174533

    })
    // Return the view, these are regular Threejs elements expressed in JSX
    return (

        <object3D>
            <object3D ref={group}>
                <mesh
                    {...props}
                    ref={ref}
                    scale={2.0} >
                    <cylinderGeometry args={[1, 1, 5, 32, 32, true]} />
                    <meshStandardMaterial side={THREE.DoubleSide} color={'red'} />
                </mesh>
            </object3D>

            <object3D ref={mountGroup}>
                <mesh
                    ref={mountRef}
                    scale={2.0} >
                    <boxGeometry args={[2, 2, 1]} />
                    <meshStandardMaterial color={'blue'} />
                </mesh>

                <mesh
                    ref={mountRef2}
                    scale={2.0} >
                    <boxGeometry args={[2, 2, 1]} />
                    <meshStandardMaterial color={'blue'} />
                </mesh>
            </object3D>

            <object3D ref={floorGroup}>
                <mesh
                    ref={floorRef}
                    scale={2.0} >
                    <planeGeometry args={[600, 600]} />
                    <meshStandardMaterial side={THREE.DoubleSide} transparent
                        opacity={1.0} color={'rgb(50,50,50)'} />
                </mesh>
            </object3D>
        </object3D>

    )
}

function ThreeD() {
    return (
        <div id="threedcdiv" >
            <Suspense fallback={<div>Loading... </div>}>
                <Canvas camera={{ fov: 75, position: [0, 0, 20] }}>
                    <CameraControls enableZoom={false} enablePan={false} enableDamping dampingFactor={0.2} autoRotate rotateSpeed={-0.5} />
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <Dome position={[0, -10.0, 0]} />
                    <Telescope position={[0.0, -5, 0]} />
                </Canvas>
            </Suspense>
            <input type="range" id="azimuth" name="azimuth" onChange={azChange} min="0" max="360"></input>
            &nbsp; &nbsp; &nbsp;
            <input type="range" id="elevation" name="elevation" onChange={elChange} min="0" max="90"></input>
        </div>
    );
}

export default ThreeD;