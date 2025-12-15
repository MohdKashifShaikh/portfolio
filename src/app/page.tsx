import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { Benefits } from "@/components/Benefits";
import { Video } from "@/components/Video";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { Cta } from "@/components/Cta";
import { benefitOne, benefitTwo } from "@/components/data";
import ParallaxSection from "@/components/parallaxComponent/ParallaxSection";
import ProjectsList from "@/components/projects/Projects";
import About from "@/components/about/About";
import Contact from "@/components/contact/Contact";
import Hero  from "@/components/hero/Hero";
import CareerHistory from "@/components/careerHistory/page";
import StaticParallax from "@/components/parallaxComponent/StaticParallax/StaticParallax";
import FeatureOrbit from "@/components/parallaxComponent/featureOrbit/page";
import VideoScrub from "@/components/parallaxComponent/videoScrub/page";

export default function Home() {
  const steps = [
    {
      role: "Junior Developer",
      company: "ABC Tech",
      duration: "2018 - 2019",
      description: "Worked on front-end features and UI bug fixes.",
    },
    {
      role: "Frontend Engineer",
      company: "XYZ Solutions",
      duration: "2019 - 2021",
      description: "Built reusable UI components and optimized web performance.",
    },
    {
      role: "Senior Developer",
      company: "GlobalSoft",
      duration: "2021 - Present",
      description: "Leading frontend architecture and mentoring junior developers.",
    },
  ];
  return (
    <>
      <Hero />
      <StaticParallax />
      <About />
      <FeatureOrbit />
      {/* <VideoScrub
        frameCount={120}
        path={(i) => `/videos/frames/frame_${String(i).padStart(4, "1")}.svg`}
      /> */}
      <ParallaxSection bgColor="#84d7e1">
        <div>
          <h2 style={{ fontSize: "2.5rem" }}>
            Driving technical clarity and ensuring scalable, robust solutions.
          </h2>
          <p
            style={{ color: "rgba(255,255,255,0.85)", marginTop: 12, fontSize: "1.5rem" }}
          >
            Guiding engineering execution with pragmatic standards for quality, stability,
            and long-term maintainability
          </p>
        </div>
      </ParallaxSection>
      {/* <StaticParallax image="/images/react.png">Welcome to My Portfolio</StaticParallax> */}
      {/* <ParallaxSection image="/images/img-2.jpg" title="World">
        <h2 style={{ margin: 0 }}>Let's build something great together</h2>
      </ParallaxSection> */}
      {/* <ProjectsList /> */}
      {/* <About />
      <Contact />
      <CareerHistory steps={steps} />
      <About /> */}
    </>
  );
}
// export default function Home() {
//   return (
//     <Container>
//       <Hero />
//       <SectionTitle
//         preTitle="Nextly Benefits"
//         title=" Why should you use this landing page"
//       >
//         Nextly is a free landing page & marketing website template for startups
//         and indie projects. Its built with Next.js & TailwindCSS. And its
//         completely open-source.
//       </SectionTitle>

//       <Benefits data={benefitOne} />
//       <Benefits imgPos="right" data={benefitTwo} />

//       <SectionTitle
//         preTitle="Watch a video"
//         title="Learn how to fullfil your needs"
//       >
//         This section is to highlight a promo or demo video of your product.
//         Analysts says a landing page with video has 3% more conversion rate. So,
//         don&apos;t forget to add one. Just like this.
//       </SectionTitle>

//       <Video videoId="fZ0D0cnR88E" />

//       <SectionTitle
//         preTitle="Testimonials"
//         title="Here's what our customers said"
//       >
//         Testimonials is a great way to increase the brand trust and awareness.
//         Use this section to highlight your popular customers.
//       </SectionTitle>

//       <Testimonials />

//       <SectionTitle preTitle="FAQ" title="Frequently Asked Questions">
//         Answer your customers possible questions here, it will increase the
//         conversion rate as well as support or chat requests.
//       </SectionTitle>

//       <Faq />
//       <Cta />
//     </Container>
//   );
// }
