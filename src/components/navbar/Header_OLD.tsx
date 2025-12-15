// "use client";
// import { useEffect, useLayoutEffect, useState } from "react";
// import styles from "./header.module.scss";
// import Link from "next/link";

// export default function Header() {

//   // const [theme, setTheme] = useState<"light" | "dark">("light");
//   // useLayoutEffect(() => {
//   //   const isDark = localStorage.getItem("theme");
//   //   setTheme(isDark ? "dark" : "light");
//   // }, []);

//   // const toggleTheme = () => {
//   //   const html = document.documentElement;
//   //   if (html.classList.contains("dark")) {
//   //     html.classList.remove("dark");
//   //     setTheme("light");
//   //   } else {
//   //     html.classList.add("dark");
//   //     setTheme("dark");
//   //   }
//   // };

//   return (
//     <header className={styles.header}>
//       <div className="container">
//         <div className={styles.row}>
//           <Link href="/" className={styles.brand}>
//             Mohd Kashif Shaikh
//           </Link>

//           <nav className={styles.nav}>
//             <Link href="/projects">Projects</Link>
//             <Link href="/about">About</Link>
//             <Link href="/contact">Contact</Link>

//             <button
//               aria-label="Toggle theme"
//               // onClick={toggleTheme}
//               className={styles.themeBtn}
//               title="Toggle theme"
//             >
//               {theme === "dark" ? "☀️" : "🌙"}
//             </button>
//           </nav>
//         </div>
//       </div>
//     </header>
//   );
// }
