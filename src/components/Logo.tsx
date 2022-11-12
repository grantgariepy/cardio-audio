import React from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

type ModelType = {
  [key: string]: any;
};

type GroupType = {
  group?: {
    current?: any;
  };
};
const g1: GroupType = { group: { current: "" } };

export default function Logo({ ...props }) {
  const group: any = React.useRef();

  useFrame(({ clock }: { clock: any }) => {
    const a = clock.getElapsedTime();
    group.current.rotation.y = -a * 0.5;
  });

  const { nodes, materials }: ModelType = useGLTF("/logo.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0.5, 0]} scale={0.00003}>
          <group scale={700}>
            <mesh
              geometry={nodes.Mesh_1.geometry}
              material={materials["Material.001"]}
              envMapIntensity={0.4}
              clearcoat={0.8}
              clearcoatRoughness={0}
              roughness={1}
              metalness={0}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/logo.gltf");
