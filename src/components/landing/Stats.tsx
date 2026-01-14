import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 250, suffix: "K+", label: "учеников за 15 лет" },
  { value: 94, suffix: "", label: "страны охвата" },
  { value: 15, suffix: "", label: "книг-бестселлеров" },
  { value: 9.3, suffix: "/10", label: "средний уровень счастья", isDecimal: true },
];

const AnimatedCounter = ({ value, suffix, isDecimal = false }: { value: number; suffix: string; isDecimal?: boolean }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const stepValue = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += stepValue;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(current);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground">
      {isDecimal ? count.toFixed(1) : Math.floor(count)}{suffix}
    </span>
  );
};

const Stats = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-20 md:py-28 bg-secondary" ref={containerRef}>
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="text-center"
            >
              <AnimatedCounter 
                value={stat.value} 
                suffix={stat.suffix}
                isDecimal={stat.isDecimal}
              />
              <p className="text-muted-foreground mt-2 text-sm md:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
