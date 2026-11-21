"use client";

import dynamic from "next/dynamic";

const ShowroomExperience = dynamic(() => import("@/components/showroom/ShowroomExperience"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[460px] items-center justify-center rounded-[28px] bg-luxen-mist text-sm text-luxen-steel">
      Chargement du showroom…
    </div>
  ),
});

export function ShowroomClient() {
  return <ShowroomExperience />;
}
