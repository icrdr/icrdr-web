import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import * as AMI from 'ami.js';
import * as dat from 'dat.gui';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

const filenames = [
  '88599835'
];

const files = filenames.map(filename => {
  return `./static/dicom/test/${filename}`;
});

const colors = {
  red: 0xff0000,
  blue: 0x0000ff,
  darkGrey: 0x353535,
};

export default function DicomViewer() {
  const mount = useRef(null)

  useEffect(() => {
    //场景初始化
    const container = mount.current
    let frameId

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000)
    camera.position.z = 4

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setClearColor('#000000')
    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)


    // 增加东西
    // 加灯
    var light = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(light);

    // 加模型
    // const objLoader = new OBJLoader();
    // objLoader.setPath('./static/model/');

    // objLoader.load('femur.obj', function (object) {
    //   object.traverse(function (child) {
    //     if (child instanceof THREE.Mesh) {
    //       scene.add(child);
    //     }
    //   });
    // });
    const loader = new AMI.VolumeLoader(container);
    loader
      .load(files)
      .then(() => {
        const series = loader.data[0].mergeSeries(loader.data);
        const stack = series[0].stack[0];
        loader.free();
        console.log(stack)
        const stackHelper = new AMI.StackHelper(stack);
        stackHelper.bbox.color = colors.red;
        stackHelper.border.color = colors.blue;

        scene.add(stackHelper);

        // build the gui
        gui(stackHelper);

        // center camera and interactor to center of bouding box
        const centerLPS = stackHelper.stack.worldCenter();
        camera.lookAt(centerLPS.x, centerLPS.y, centerLPS.z);
        camera.updateProjectionMatrix();
        controls.target.set(centerLPS.x, centerLPS.y, centerLPS.z);
      })
      .catch(error => {
        window.console.log('oops... something went wrong...');
        window.console.log(error);
      });

    // setup gui
    const gui = stackHelper => {
      const stack = stackHelper.stack;
      const gui = new dat.GUI({
        autoPlace: false,
      });
      const customContainer = document.getElementById('my-gui-container');
      customContainer.appendChild(gui.domElement);

      // stack
      const stackFolder = gui.addFolder('Stack');
      // index range depends on stackHelper orientation.
      const index = stackFolder
        .add(stackHelper, 'index', 0, stack.dimensionsIJK.z - 1)
        .step(1)
        .listen();
      const orientation = stackFolder
        .add(stackHelper, 'orientation', 0, 2)
        .step(1)
        .listen();
      orientation.onChange(value => {
        index.__max = stackHelper.orientationMaxIndex;
        stackHelper.index = Math.floor(index.__max / 2);
      });
      stackFolder.open();

      // slice
      const sliceFolder = gui.addFolder('Slice');
      sliceFolder
        .add(stackHelper.slice, 'windowWidth', 1, stack.minMax[1] - stack.minMax[0])
        .step(1)
        .listen();
      sliceFolder
        .add(stackHelper.slice, 'windowCenter', stack.minMax[0], stack.minMax[1])
        .step(1)
        .listen();
      sliceFolder.add(stackHelper.slice, 'intensityAuto').listen();
      sliceFolder.add(stackHelper.slice, 'invert');
      sliceFolder.open();

      // bbox
      const bboxFolder = gui.addFolder('Bounding Box');
      bboxFolder.add(stackHelper.bbox, 'visible');
      bboxFolder.addColor(stackHelper.bbox, 'color');
      bboxFolder.open();

      // border
      const borderFolder = gui.addFolder('Border');
      borderFolder.add(stackHelper.border, 'visible');
      borderFolder.addColor(stackHelper.border, 'color');
      borderFolder.open();
    };
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 0.7, 0);
    controls.rotateSpeed = 0.2;
    controls.maxDistance = 7;
    controls.minDistance = 3;

    // 动画部分
    const animate = () => {

      controls.update();
      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }
    animate()

    //窗口改变
    const handleResize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight)
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', handleResize)

    // 组件删除后清理内容
    return () => {
      // 清理事件监听
      window.removeEventListener('resize', handleResize)

      // 常规清理内容
      cancelAnimationFrame(frameId)
      container.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div style={{ width: '100%', height: "100%" }} ref={mount} />
  )
}
