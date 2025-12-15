export default function Footer() {
  return (
    <footer style={{ marginTop: 48, padding: "2.5rem 0", textAlign: "center" }}>
      <div className="container">
        <p style={{ margin: 0, color: "var(--muted)" }}>
          © {new Date().getFullYear()} Mohd Kashif — Built with Next.js + TypeScript
        </p>
      </div>
    </footer>
  );
}
