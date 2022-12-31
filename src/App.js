import * as THREE from 'three'
import {Suspense, useEffect, useRef} from 'react'
import {Canvas, useFrame, useThree} from '@react-three/fiber'
import {OrbitControls} from '@react-three/drei'
import { Model} from './Penguine'
import MyVideo from '/Users/dev/Documents/React/3d-text-demo-r3f/src/video.mp4'
// import { Model } from './Dancing'

import './index.css';

function App() {
  useEffect(() => {
    var frameNumber = 0, // start video at frame 0
    // lower numbers = faster playback
    playbackConst = 1000,
    // get page height from video duration
    setHeight = document.getElementById("set-height"),
    // select video element
    vid = document.getElementById('v0');

    // dynamically set the page height according to video length
    vid.addEventListener('loadedmetadata', function() {
      setHeight.style.height = Math.floor(vid.duration) * playbackConst + "px";
    });

    function scrollPlay(){
      var frameNumber  = window.pageYOffset/playbackConst;
      vid.currentTime  = frameNumber;
      window.requestAnimationFrame(scrollPlay);
    }

    window.requestAnimationFrame(scrollPlay);
    scrollPlay();
  }, []);

  function Rig({ children }) {
    const ref = useRef()
    const vec = new THREE.Vector3()
    const { camera, mouse } = useThree()
    useFrame(() => {
      camera.position.lerp(vec.set(mouse.x * -20, 0, 50), 0.5)
      ref.current.position.lerp(vec.set(0, 0, 0), 0.1)
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, 0, 0.01)
    })
    return <group ref={ref}>{children}</group>
  }

  return (
    <div>
      <div id="set-height">
      <div className='overlay-text'>
        <h3>1. Creating a Web Page</h3>
      </div>
        <div className="wrapper">
          <div className='model'>
            <Canvas  camera={{ fov:10, position: [0,-10,0]}}>
              <Suspense fallback={null}>
                <ambientLight />
                <directionalLight intensity={2} position={[0,0,50]} />
                <Rig>
                  <Model />
                </Rig>
                <OrbitControls enablePan={false} enableZoom={false} enableRotate={true} animations={false} rotateSpeed={0.5} />
              </Suspense>

            </Canvas>

          </div>
        </div>
      </div>
      <video id="v0" preload="preload">
        <source  src={MyVideo}></source>
      </video>
    </div>
  );
}

export default App;
