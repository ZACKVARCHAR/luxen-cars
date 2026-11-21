"use client";

import { VEHICLES } from "@/lib/data/vehicles";
import { cn } from "@/lib/utils";
import { ContactShadows, Environment, OrbitControls, RoundedBox } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo, useState } from "react";
import Image from "next/image";

function CarProxy({ color }: { color: string }) {
  return (
    <group position={[0, 0.35, 0]}>
      <RoundedBox args={[2.4, 0.55, 1.15]} radius={0.12} position={[0, 0.15, 0]}>
        <meshStandardMaterial color={color} metalness={0.55} roughness={0.28} />
      </RoundedBox>
      <RoundedBox args={[1.35, 0.55, 1.05]} radius={0.1} position={[-0.1, 0.58, 0]}>
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} />
      </RoundedBox>
      <mesh position={[-0.85, 0.08, 0.58]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.22, 24]} />
        <meshStandardMaterial color="#111" metalness={0.7} roughness={0.4} />
      </mesh>
      <mesh position={[0.85, 0.08, 0.58]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.22, 24]} />
        <meshStandardMaterial color="#111" metalness={0.7} roughness={0.4} />
      </mesh>
      <mesh position={[-0.85, 0.08, -0.58]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.22, 24]} />
        <meshStandardMaterial color="#111" metalness={0.7} roughness={0.4} />
      </mesh>
      <mesh position={[0.85, 0.08, -0.58]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.22, 24]} />
        <meshStandardMaterial color="#111" metalness={0.7} roughness={0.4} />
      </mesh>
      <mesh position={[1.15, 0.28, 0.32]}>
        <boxGeometry args={[0.08, 0.12, 0.22]} />
        <meshStandardMaterial color="#ffe9a8" emissive="#ffd56a" emissiveIntensity={1.4} />
      </mesh>
      <mesh position={[1.15, 0.28, -0.32]}>
        <boxGeometry args={[0.08, 0.12, 0.22]} />
        <meshStandardMaterial color="#ffe9a8" emissive="#ffd56a" emissiveIntensity={1.4} />
      </mesh>
    </group>
  );
}

export default function ShowroomExperience() {
  const [index, setIndex] = useState(0);
  const [color, setColor] = useState("#e8e8e8");
  const vehicle = VEHICLES[index];
  const palette = useMemo(() => ["#e8e8e8", "#1f1f1f", "#e10600", "#6b7280", "#f5f5f5"], []);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="overflow-hidden rounded-[28px] border border-black/5 bg-[#0f131a] shadow-[var(--shadow-card)]">
        <div className="h-[460px] w-full">
          <Canvas
            camera={{ position: [3.2, 1.8, 3.8], fov: 42 }}
            onCreated={({ gl }) => {
              gl.setClearColor("#0f131a");
            }}
          >
              <ambientLight intensity={0.45} />
              <spotLight position={[5, 8, 4]} intensity={80} angle={0.35} penumbra={0.7} castShadow />
              <spotLight position={[-4, 4, -2]} intensity={30} color="#ff6b63" />
              <Suspense fallback={null}>
                <CarProxy color={color} />
                <ContactShadows opacity={0.55} scale={12} blur={2.6} far={8} />
                <Environment preset="city" />
              </Suspense>
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
                <circleGeometry args={[2.4, 64]} />
                <meshStandardMaterial color="#171b24" metalness={0.6} roughness={0.35} />
              </mesh>
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                <ringGeometry args={[1.85, 2.05, 64]} />
                <meshStandardMaterial
                  color="#e10600"
                  emissive="#e10600"
                  emissiveIntensity={2}
                  toneMapped={false}
                />
              </mesh>
            <OrbitControls enablePan={false} minDistance={2.5} maxDistance={7} maxPolarAngle={1.4} />
          </Canvas>
        </div>
        <div className="border-t border-white/10 px-4 py-3 text-xs text-white/55">
          {vehicle.has3d && vehicle.model3dUrl
            ? "Modèle 3D officiel du véhicule."
            : "Showroom interactif stylisé (proxy 3D). Aucun GLB fidèle n’est encore disponible — les photos du catalogue restent la référence visuelle du modèle."}
        </div>
      </div>

      <aside className="space-y-4">
        <div className="rounded-[22px] border border-black/5 bg-white p-5 shadow-[var(--shadow-card)]">
          <h2 className="font-display text-2xl font-bold text-luxen-ink">
            {vehicle.brand} {vehicle.model}
          </h2>
          <p className="mt-2 text-sm text-luxen-steel">{vehicle.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {palette.map((c) => (
              <button
                key={c}
                type="button"
                aria-label={`Couleur ${c}`}
                onClick={() => setColor(c)}
                className={cn(
                  "h-8 w-8 rounded-full border-2",
                  color === c ? "border-luxen-red" : "border-black/10",
                )}
                style={{ background: c }}
              />
            ))}
          </div>
        </div>
        <div className="rounded-[22px] border border-black/5 bg-white p-4 shadow-[var(--shadow-card)]">
          <div className="mb-3 text-xs font-bold uppercase tracking-wide text-luxen-steel">
            Sélectionner un modèle
          </div>
          <div className="max-h-[280px] space-y-2 overflow-auto pr-1">
            {VEHICLES.map((v, i) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setIndex(i)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition",
                  i === index ? "bg-luxen-red/10" : "hover:bg-luxen-mist",
                )}
              >
                <div className="relative h-12 w-16 overflow-hidden rounded-lg bg-luxen-mist">
                  <Image src={v.image} alt="" fill className="object-contain bg-[#0b0d12] p-1" />
                </div>
                <span className="text-sm font-semibold text-luxen-ink">
                  {v.brand} {v.model}
                </span>
              </button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
