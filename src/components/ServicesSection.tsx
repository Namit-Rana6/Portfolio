import FadeIn from './FadeIn';


const SERVICES = [
  {
    number: '01',
    title: 'Machine Learning Systems',
    description:
      'I design and build ML pipelines that actually work outside of a notebook - right architecture for the problem, proper validation, handling messy real-world data. Not just training a model and calling it done, but understanding why it works, where it breaks, and how to make it reliable enough to ship.',
  },
  {
    number: '02',
    title: 'Healthcare & Medical AI',
    description:
      'ML in high-stakes domains needs to be right, not just good. I authored a skin cancer classifier that earned Best Paper Award at ICIDSSD \'26 (Jamia Hamdard) - the methodology held up under academic peer review, not just a benchmark. I understand what makes medical AI trustworthy: explainability, proper validation, and knowing where the model should defer to a human.',
  },
  {
    number: '03',
    title: 'LLM Integration & AI Agents',
    description:
      'Getting real, consistent value out of LLMs is harder than it looks. I built a post-training reasoning pipeline that earned an Honorable Mention at Google & Kaggle\'s Tunix Hackathon - on a free Kaggle TPU. The skill isn\'t knowing the APIs, it\'s knowing how to structure the problem so the model actually solves it.',
  },
  {
    number: '04',
    title: 'Accessibility & Assistive Technology',
    description:
      'MindBoard lets people with ALS, Cerebral Palsy, or spinal injuries communicate using only nose movements and a standard webcam - no hardware, no eye trackers. It took 3rd at Gujarat Hackathon. EduAble, an inclusive learning platform for students with visual and cognitive disabilities, won 1st at a national hackathon at DTU. I build assistive tech that works for people who can\'t afford it not to.',
  },
  {
    number: '05',
    title: 'Open Source & Rapid Execution',
    description:
      'Hacktoberfest Super Contributor - 7 merged PRs across 7 projects. Led technical sessions at Open Source Connect India. I write code other people can read, review, and build on. That discipline shows up in every project: clean structure, no shortcuts on what matters.',
  },
  {
    number: '06',
    title: 'Full-Stack Product Development',
    description:
      'When the ML needs a frontend or an API around it, I can build that too. Enough to take a model from a script to something a user can actually open in a browser - without needing a separate dev to finish the job.',
  },
];

const ServicesSection = () => {
  return (
    <section
      id="services"
      className="relative w-full bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn y={40}>
        <h2
          className="text-center font-black uppercase text-[#0C0C0C] mb-16 sm:mb-20 md:mb-28 leading-none"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Services
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-5xl">
        {SERVICES.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1} y={30}>
            <div
              className="flex flex-row items-start gap-6 sm:gap-10 md:gap-14 py-8 sm:py-10 md:py-12"
              style={{
                borderTop: '1px solid rgba(12, 12, 12, 0.15)',
                ...(i === SERVICES.length - 1
                  ? { borderBottom: '1px solid rgba(12, 12, 12, 0.15)' }
                  : {}),
              }}
            >
              <div
                className="shrink-0 font-black text-[#0C0C0C] leading-none"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {service.number}
              </div>

              <div className="group flex flex-col gap-3 sm:gap-4 md:gap-5 pt-2 sm:pt-3 md:pt-4">
                <h3
                  className="font-medium uppercase text-[#0C0C0C] leading-tight relative inline-block w-fit"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {service.title}
                  <span className="absolute left-0 -bottom-1 h-px w-0 bg-[#0C0C0C]/60 transition-all duration-500 group-hover:w-full" />
                </h3>
                <p
                  className="font-light leading-relaxed text-[#0C0C0C] max-w-2xl"
                  style={{
                    fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                    opacity: 0.6,
                  }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
