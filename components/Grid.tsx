"use client";
import React from "react";
const BentoGrid = dynamic(
  () => import("./ui/BentoGrid").then((mod) => mod.BentoGrid),
  {
    ssr: false,
  },
);

const BentoGridItem = dynamic(
  () => import("./ui/BentoGrid").then((mod) => mod.BentoGridItem),
  {
    ssr: false,
  },
);import { gridItems } from "@/data";
import dynamic from "next/dynamic";

type Props = {};

const Grid = (props: Props) => {
  return (
    <section id="about" className="mt-24">
      <BentoGrid>
        {gridItems.map((item) => (
          <BentoGridItem
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            className={item.className}
            imgClassName={item.imgClassName}
            spareImg={item.spareImg}
            titleClassName={item.titleClassName}
            img={item.img}
          />
        ))}
      </BentoGrid>
    </section>
  );
};

export default Grid;
