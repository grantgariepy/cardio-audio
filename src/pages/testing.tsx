import { type NextPage } from "next";
import { Canvas } from "react-three-fiber";
import Logo from "../components/Logo";
import ThreeDeeTest from "../components/ThreeDeeTest";
import { Suspense } from "react";
import { Environment } from "@react-three/drei";

const testing: NextPage = () => {
  return (
    <>
      <div className="hero">
        <Canvas className="canvas" camera={{ position: [0, 0, 5], fov: 45 }}>
          <spotLight
            intensity={0.5}
            angle={0.2}
            penumbra={1}
            position={[5, 15, 10]}
          />
          <Suspense fallback={null}>
            <Logo />
            <Environment preset="warehouse" />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
};

export default testing;
