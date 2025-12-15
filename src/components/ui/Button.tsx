import styles from "./button.module.scss";
import React from "react";
import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline";
  theme?: string;
};

export default function Button({
  children,
  href,
  variant = "primary",
  theme,
}: ButtonProps) {
  const className = `${styles.btn} ${variant === "outline" ? styles.outline : ""} ${
    theme === "dark" ? styles.dark : ""
  }`;
  if (href) {
    return (
      <>
        {/* <button className={className}>{children}</button> */}
        <Link href={href} className={className} target="_blank">
          {children}
        </Link>
      </>
    );
  }
  return <button className={className}>{children}</button>;
}
