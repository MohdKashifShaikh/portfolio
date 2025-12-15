import styles from "./contact.module.scss";

export default function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <h2>Contact</h2>
      <p>If you'd like to collaborate, feel free to email me.</p>
      <a className={styles.btn} href="mailto:kashif@example.com">
        Email Me
      </a>
    </section>
  );
}
