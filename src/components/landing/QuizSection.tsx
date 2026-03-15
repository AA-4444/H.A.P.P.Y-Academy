import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const QUIZ_URL = "https://www.happi10.com/quiz";

const QuizSection = () => {
  return (
    <section id="quiz" className="bg-[#F6F1E7]">
      <div className="mx-auto w-full px-3 sm:px-4 lg:px-6 py-10 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
          className="
            relative w-full overflow-hidden
            rounded-[28px] sm:rounded-[36px] lg:rounded-[44px]
            border border-black/10 bg-white
            shadow-[0_30px_100px_rgba(0,0,0,0.08)]
          "
        >
          {/* background accents */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 -right-20 h-52 w-52 rounded-full bg-yellow-200/35 blur-3xl" />
            <div className="absolute -bottom-24 -left-20 h-60 w-60 rounded-full bg-orange-200/30 blur-3xl" />
            <div className="absolute inset-0 ring-1 ring-black/8 rounded-[28px] sm:rounded-[36px] lg:rounded-[44px]" />
          </div>

          {/* content */}
          <div className="relative px-6 sm:px-10 lg:px-14 py-12 sm:py-14 lg:py-16">
            <div className="mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center rounded-full bg-yellow-100 px-4 py-1.5 text-sm font-semibold text-black/70">
                Тест за 1 минуту
              </div>

              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-black sm:text-5xl lg:text-6xl leading-[1.05]">
                Узнайте свой{" "}
                <span className="text-orange-500">уровень счастья</span>
              </h2>

              <p className="mt-5 text-base leading-relaxed text-black/65 sm:text-xl max-w-3xl mx-auto">
                Пройдите короткий тест (1 минута) и получите персональную
                рекомендацию.
              </p>

              <div className="mt-8 sm:mt-10 flex justify-center">
                <Button
                  size="lg"
                  asChild
                  className="rounded-full bg-orange-500 px-8 sm:px-10 text-white hover:bg-orange-400 font-semibold h-12 sm:h-14 text-base sm:text-lg"
                >
                  <a
                    href={QUIZ_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Пройти тест
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuizSection;