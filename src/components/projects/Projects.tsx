import styles from "./projects.module.scss";
import Card from "../cards/Card";

const projects = [
  {
    title: "SaaS Dashboard",
    desc: "Multi-tenant analytics dashboard with dynamic filters and realtime charts.",
    tech: ["Next.js", "TypeScript", "Recharts"],
  },
  {
    title: "Design System",
    desc: "Accessible component library and tokens for consistent product UI.",
    tech: ["React", "SCSS Modules", "Storybook"],
  },
  {
    title: "Micro-frontend Interaction",
    desc: "Embeddable micro-frontend with communication contracts and lazy loading.",
    tech: ["Module Federation", "Webpack 5", "React"],
  },
];

export default function ProjectsList() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <h2>Projects</h2>
        <div className={styles.grid}>
          {projects.map((p) => (
            <Card key={p.title}>
              <h3>{p.title}</h3>
              <p style={{ color: "var(--muted)" }}>{p.desc}</p>
              <div className={styles.tech}>
                {p.tech.map((t) => (
                  <span key={t} className={styles.tag}>
                    {t}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
