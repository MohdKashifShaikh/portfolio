"use client";
import { useState, useEffect } from "react";
import styles from "./hero.module.scss";

const words = ["Mohd Kashif Shaikh", "Kashif"];
const TYPING_SPEED = 150;
const DELETING_SPEED = 70;
const PAUSE_END_OF_WORD = 1500;

const NameWriter = () => {
  const [index, setIndex] = useState(0); // Index of the current word in the 'words' array
  const [text, setText] = useState(""); // The text currently displayed
  const [isDeleting, setIsDeleting] = useState(false); // True when deleting text

  useEffect(() => {
    // 1. Determine the full text we want to display
    const currentWord = words[index % words.length];

    // 2. Typing logic (isDeleting is false)
    if (!isDeleting && text.length < currentWord.length) {
      const timeout = setTimeout(() => {
        setText(currentWord.substring(0, text.length + 1));
      }, TYPING_SPEED);
      return () => clearTimeout(timeout);
    }

    // 3. Pause before deleting (Finished typing the word)
    if (!isDeleting && text.length === currentWord.length) {
      const timeout = setTimeout(() => setIsDeleting(true), PAUSE_END_OF_WORD);
      return () => clearTimeout(timeout);
    }

    // 4. Deleting logic (isDeleting is true)
    if (isDeleting && text.length > 0) {
      const timeout = setTimeout(() => {
        setText(currentWord.substring(0, text.length - 1));
      }, DELETING_SPEED);
      return () => clearTimeout(timeout);
    }

    // 5. Start next word (Finished deleting)
    if (isDeleting && text.length === 0) {
      setIsDeleting(false);
      setIndex((prev) => prev + 1); // Move to the next word
    }
  }, [text, isDeleting, index]);

  return (
    <span className={styles.typewriter_text}>
      {text}
      <span className={styles.cursor}>|</span> {/* Use a span for the blinking cursor */}
    </span>
  );
};

export default NameWriter;
