"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { FloatingNav } from "@/components/FloatingNav";
import Hero from "@/components/Hero";
import { navItems } from "@/data";

// استيراد المكونات بشكل ديناميكي لتحسين الأداء
const Grid = dynamic(() => import("@/components/Grid"), { ssr: false });
const TechStack = dynamic(() => import("@/components/TechStack"), {
  ssr: false,
});
const RecentProjects = dynamic(() => import("@/components/RecentProjects"), {
  ssr: false,
});
const AppleCardsCarouselDemo = dynamic(
  () =>
    import("@/components/Carousel").then((mod) => mod.AppleCardsCarouselDemo),
  { ssr: false },
);
const Clients = dynamic(() => import("@/components/Clients"), { ssr: false });
const Experience = dynamic(() => import("@/components/Experience"), {
  ssr: false,
});
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

// مكون FadeInSection لإضافة تأثير انيميشن عند الظهور
const FadeInSection = ({ children, className = "", delay = 0 }: any) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`${className} transition-all duration-1000 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function Home() {
  return (
    <main
      className="relative bg-black-100 flex justify-center
     items-center flex-col overflow-clip mx-auto sm:px-10 px-5"
    >
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
      </div>

      {/* Hero يظهر دائماً بدون تأخير */}
      <Hero />

      <div className="max-w-7xl w-full">
        <FadeInSection>
          <Grid />
        </FadeInSection>

        <FadeInSection delay={100}>
          <TechStack />
        </FadeInSection>

        <FadeInSection delay={200}>
          <RecentProjects />
        </FadeInSection>

        <FadeInSection delay={300}>
          <AppleCardsCarouselDemo />
        </FadeInSection>

        <FadeInSection delay={400}>
          <Clients />
        </FadeInSection>

        <FadeInSection delay={500}>
          <Experience />
        </FadeInSection>

        <FadeInSection delay={600}>
          <Footer />
        </FadeInSection>
      </div>
    </main>
  );
}
