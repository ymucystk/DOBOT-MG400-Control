"use client";
import * as React from 'react'
import Controller from './controller.js'

export default function Home() {
  const [rendered,set_rendered] = React.useState(false)
  const robotNameList = ["A5905S"]
  const [robotName,set_robotName] = React.useState(robotNameList[0])
  const [j0_rotate,set_j0_rotate] = React.useState(90)
  const [j1_rotate,set_j1_rotate] = React.useState(0)
  const [j3_rotate,set_j3_rotate] = React.useState(0)
  const [c_pos_x,set_c_pos_x] = React.useState(0)
  const [c_pos_y,set_c_pos_y] = React.useState(0.25)
  const [c_pos_z,set_c_pos_z] = React.useState(0.45)
  const [c_deg_x,set_c_deg_x] = React.useState(0)
  const [c_deg_y,set_c_deg_y] = React.useState(0)
  const [c_deg_z,set_c_deg_z] = React.useState(0)
  let registered = false

  const robotChange = ()=>{
    const get = (robotName)=>{
      let changeIdx = robotNameList.findIndex((e)=>e===robotName) + 1
      if(changeIdx >= robotNameList.length){
        changeIdx = 0
      }
      return robotNameList[changeIdx]
    }
    set_robotName(get)
  }

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      require("aframe");
      setTimeout(set_rendered(true),1000)
      console.log('set_rendered')

      if(!registered){
        registered = true
        AFRAME.registerComponent('robot-click', {
          init: function () {
            this.el.addEventListener('click', (evt)=>{
              robotChange()
              console.log('robot-click')
            });
          }
        });
      }
    }
  }, [typeof window])

  const controllerProps = {
    robotName, robotNameList, set_robotName,
    j0_rotate,set_j0_rotate,j1_rotate,set_j1_rotate,j3_rotate,set_j3_rotate,
    c_pos_x,set_c_pos_x,c_pos_y,set_c_pos_y,c_pos_z,set_c_pos_z,
    c_deg_x,set_c_deg_x,c_deg_y,set_c_deg_y,c_deg_z,set_c_deg_z
  }

  const robotProps = {
    robotNameList, robotName, j0_rotate, j1_rotate, j3_rotate
  }

  if(rendered){
    return (
    <>
      <a-scene>
        <a-plane position="0 0 0" rotation="-90 0 0" width="10" height="10" color="#7BC8A4" shadow></a-plane>
        <Assets/>
        <Select_Robot {...robotProps}/>
        <a-entity light="type: directional; color: #FFF; intensity: 0.8" position="1 2 1"></a-entity>
        <a-entity light="type: directional; color: #FFF; intensity: 0.8" position="-1 1 2"></a-entity>
        <a-entity id="rig" position={`${c_pos_x} ${c_pos_y} ${c_pos_z}`} rotation={`${c_deg_x} ${c_deg_y} ${c_deg_z}`}>
          <a-camera id="camera" cursor="rayOrigin: mouse;" position="0 0 0"></a-camera>
        </a-entity>
      </a-scene>
      <Controller {...controllerProps}/>
    </>
    );
  }else{
    return(
      <a-scene>
        <Assets/>
      </a-scene>
    )
  }
}

const Assets = ()=>{
  return (
    <a-assets>
      {/*IGUS_REBEL*/}
      <a-asset-items id="base" src="Dobot_mg400_base.gltf" ></a-asset-items>
      <a-asset-items id="j0" src="Dobot_mg400_j0.gltf" ></a-asset-items>
      <a-asset-items id="j1_1" src="Dobot_mg400_j1_1.gltf" ></a-asset-items>
      <a-asset-items id="j1_2" src="Dobot_mg400_j1_2.gltf" ></a-asset-items>
      <a-asset-items id="j2" src="Dobot_mg400_j2.gltf" ></a-asset-items>
      <a-asset-items id="j3_j1" src="Dobot_mg400_j3_j1.gltf" ></a-asset-items>
      <a-asset-items id="j3_j2" src="Dobot_mg400_j3_j2.gltf" ></a-asset-items>
      <a-asset-items id="j3_1" src="Dobot_mg400_j3_1.gltf" ></a-asset-items>
      <a-asset-items id="j3_2" src="Dobot_mg400_j3_2.gltf" ></a-asset-items>
      <a-asset-items id="j4" src="Dobot_mg400_j4.gltf" ></a-asset-items>
    </a-assets>
  )
}

const IGUS_REBEL = (props)=>{
  const {visible, j0_rotate, j1_rotate, j3_rotate} = props
  const j1_j3_rot =  Number.parseFloat(j1_rotate) - Number.parseFloat(j3_rotate)
  return (<>{visible?
    <a-entity gltf-model="#base" position="0 0 0" rotation={`0 0 0`}>
      <a-entity gltf-model="#j0" position="0 0 0" rotation={`0 ${j0_rotate} 0`}>
        <a-entity gltf-model="#j1_1" position="0 0.25052 -0.0005" rotation={`${j1_rotate} 0 0`}>
        </a-entity>
        <a-entity gltf-model="#j1_2" position="0 0.228 0.0385" rotation={`${j1_rotate} 0 0`}>
          <a-entity gltf-model="#j2" position="0 0.175 0" rotation={`${-j1_rotate} 0 0`}>
            <a-entity gltf-model="#j3_1" position="0 0.0345 0.0289" rotation={`${j3_rotate} 0 0`}>
              <a-entity gltf-model="#j4" position="0 0 0.175" rotation={`${-j3_rotate} 0 0`}>
              </a-entity>
            </a-entity>
            <a-entity gltf-model="#j3_2" position="0 0 0" rotation={`${j3_rotate} 0 0`}>
            </a-entity>
          </a-entity>
        </a-entity>
        <a-entity gltf-model="#j3_j1" position="0 0.228 0.0385" rotation={`${j3_rotate} 0 0`}>
          <a-entity gltf-model="#j3_j2" position="0 0 -0.043" rotation={`${j1_j3_rot} 0 0`}>
          </a-entity>
        </a-entity>
      </a-entity>
    </a-entity>:null}</>
  )
}

const Select_Robot = (props)=>{
  const {robotNameList, robotName, ...rotateProps} = props
  const visibletable = robotNameList.map(()=>false)
  const findindex = robotNameList.findIndex((e)=>e===robotName)
  if(findindex >= 0){
    visibletable[findindex] = true
  }
  return (<>
    <IGUS_REBEL visible={visibletable[0]} {...rotateProps}/>
  </>)
}









