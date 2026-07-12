import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Hero.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const cardRef = useRef(null);
  const swiperRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 993px)", () => {
      const grid = gridRef.current;
      const leftEl = leftRef.current;
      const rightEl = rightRef.current;
      const card = cardRef.current;
      const section = sectionRef.current;

      const getEnd = () => ({
        x: -rightEl.offsetLeft,
        y: leftEl.offsetTop + leftEl.offsetHeight - rightEl.offsetTop + 40,
        width: grid.offsetWidth,
        height: Math.max(window.innerHeight * 0.55, 420),
      });

      let end = getEnd();

      // Reserve enough space below the hero so the expanded card never
      // overlaps the next section. Runs on load, on image load, and on resize —
      // never during the scroll itself.
      const reserveSpace = () => {
        end = getEnd();
        const cardBottom = rightEl.offsetTop + end.y + end.height;
        const overflowPastGrid = Math.max(0, cardBottom - grid.offsetHeight);
        section.style.paddingBottom = `${80 + overflowPastGrid + 40}px`;
        ScrollTrigger.refresh();
      };

      reserveSpace();
      window.addEventListener("resize", reserveSpace);

      const imgs = section.querySelectorAll("img");
      let pending = imgs.length;
      imgs.forEach((img) => {
        if (img.complete) {
          pending--;
        } else {
          img.addEventListener("load", () => {
            pending--;
            if (pending === 0) reserveSpace();
          });
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=100%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          onRefresh: () => { end = getEnd(); },
          onEnter: () => {
            card.style.willChange = "transform, width, height";
          },
          onEnterBack: () => {
            card.style.willChange = "transform, width, height";
          },
          onLeave: () => {
            card.style.willChange = "auto";
            swiperRef.current?.update();
          },
          onLeaveBack: () => {
            card.style.willChange = "auto";
            swiperRef.current?.update();
          },
        },
      });

      tl.to(card, {
        x: () => end.x,
        y: () => end.y,
        width: () => end.width,
        height: () => end.height,
        borderRadius: 24,
        ease: "none",
        modifiers: {
          x: gsap.utils.unitize(Math.round),
          y: gsap.utils.unitize(Math.round),
          width: gsap.utils.unitize(Math.round),
          height: gsap.utils.unitize(Math.round),
        },
      }, 0).to(leftEl, { autoAlpha: 0, y: -30, ease: "none" }, 0);

      return () => {
        window.removeEventListener("resize", reserveSpace);
        tl.scrollTrigger && tl.scrollTrigger.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="hero-section" ref={sectionRef}>
      <div className="container hero-grid" ref={gridRef}>
        <div className="hero-left" ref={leftRef}>
          <div className="hero-pill">
            <span>💧 Global Impact Overview</span>
          </div>

          <h1 className="hero-title">
            Wings That <span className="highlight-italic">Never Rest</span>
          </h1>

          <p className="hero-description">
            In the delicate flutter of a hummingbird's wings lies the strength of a
            thousand movements. We see a global NGO dedicated to rapid,
            transparent, and high-impact interventions where the world needs them
            most.
          </p>

          <div className="hero-cta-group">
            <button className="btn-primary-flight">
              Start a Flight <span className="arrow">➔</span>
            </button>
            <button className="btn-secondary-report">View Report</button>
          </div>
        </div>

        <div className="hero-right" ref={rightRef}>
          <div className="hero-card" ref={cardRef}>
            <div className="hero-card-image-wrapper">
              <Swiper
                modules={[Autoplay, Pagination]}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                onSwiper={(s) => (swiperRef.current = s)}
                className="hero-swiper"
              >
                <SwiperSlide>
                  <img src="/hummingbird-hero.jpg" alt="Hummingbird" className="hero-card-image" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/evangelion-mecha-robot-8k-wallpaper-uhdpaper.com-298@5@d.jpg" alt="Education" className="hero-card-image" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/wallhaven-og33jl.png" alt="Healthcare" className="hero-card-image" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/wallhaven-yqmlmx.png" alt="Environment" className="hero-card-image" />
                </SwiperSlide>
              </Swiper>
              <div className="floating-stat stat-top">
                <h2>24+</h2>
                <p>Countries</p>
              </div>
              <div className="floating-stat stat-bottom">
                <h2>152</h2>
                <p>Active Missions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;