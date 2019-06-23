import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

export default function ThreeTest() {
  const mount = useRef(null)

  useEffect(() => {
    //场景初始化
    const canvasDiv = mount.current
    let width = canvasDiv.clientWidth
    let height = canvasDiv.clientHeight
    let frameId

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 4

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setClearColor('#000000')
    renderer.setSize(width, height)
    canvasDiv.appendChild(renderer.domElement)


    // 增加东西
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0xff00ff })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    // 动画部分
    const animate = () => {
      
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01

      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }
    animate()

    //窗口改变
    const handleResize = () => {
      width = canvasDiv.clientWidth
      height = canvasDiv.clientHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.render(scene, camera)
    }
    window.addEventListener('resize', handleResize)

    // 组件删除后清理内容
    return () => {
      // 清理事件监听
      window.removeEventListener('resize', handleResize)

      // 常规清理内容
      cancelAnimationFrame(frameId)
      canvasDiv.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div style={{ width: '100%', height: "100%" }} ref={mount} />
  )
}
