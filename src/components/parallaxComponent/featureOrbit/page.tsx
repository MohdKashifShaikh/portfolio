"use client";
import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
// Removed Image import - using text labels instead
import styles from "./featureOrbit.module.scss";

// Neural Network Node Configuration - Perfect Hexagonal Layout
const NEURAL_NODES = [
  {
    id: "react",
    label: "React",
    color: "#61DAFB",
    category: "Library",
    connections: ["nextjs", "nodejs", "express"],
    position: { x: -220, y: -127 }, // Top-left
    strength: 95,
  },
  {
    id: "nextjs",
    label: "Next.js",
    color: "#000000",
    category: "Framework",
    connections: ["react", "nodejs", "mongodb"],
    position: { x: 220, y: -127 }, // Top-right
    strength: 75,
  },
  {
    id: "nodejs",
    label: "Node.js",
    color: "#339933",
    category: "Backend",
    connections: ["react", "nextjs", "express", "mongodb", "nestjs"],
    position: { x: -220, y: 127 }, // Bottom-left
    strength: 85,
  },
  {
    id: "mongodb",
    label: "MongoDB",
    color: "#47A248",
    category: "Database",
    connections: ["nodejs", "express", "nestjs"],
    position: { x: 220, y: 127 }, // Bottom-right
    strength: 85,
  },
  {
    id: "express",
    label: "Express",
    color: "#68747A",
    category: "Framework",
    connections: ["nodejs", "mongodb", "react"],
    position: { x: 0, y: -200 }, // Top-center
    strength: 95,
  },
  {
    id: "nestjs",
    label: "NestJS",
    color: "#E0234E",
    category: "Framework",
    connections: ["nodejs", "mongodb"],
    position: { x: 0, y: 200 }, // Bottom-center
    strength: 50,
  },
];

export default function FeatureOrbit() {
  const ref = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fix hydration mismatch
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Get responsive position based on screen size
  const getResponsivePosition = (node: (typeof NEURAL_NODES)[0]) => {
    if (typeof window === "undefined") return node.position;

    const width = window.innerWidth;
    if (width <= 480) {
      // Mobile: smaller distances
      return {
        x: node.position.x * 0.5,
        y: node.position.y * 0.6,
      };
    } else if (width <= 768) {
      // Tablet: medium distances
      return {
        x: node.position.x * 0.7,
        y: node.position.y * 0.8,
      };
    } else if (width <= 1024) {
      // Small desktop: slightly reduced
      return {
        x: node.position.x * 0.85,
        y: node.position.y * 0.9,
      };
    }
    // Desktop: full size
    return node.position;
  };

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.6", "end 0.4"],
  });

  const networkScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const brainWaveIntensity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  // Mouse interaction for neural network response
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const networkTilt = useSpring(useTransform(mouseX, [-400, 400], [-5, 5]), {
    stiffness: 50,
    damping: 20,
  });
  const networkRotateX = useSpring(useTransform(mouseY, [-400, 400], [5, -5]), {
    stiffness: 50,
    damping: 20,
  });

  // Removed neural activity simulation - focusing on entrance animations

  // Mouse interaction handlers
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleNodeHover = (nodeId: string) => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHoveredNode(nodeId);
  };

  const handleNodeLeave = () => {
    // Use timeout to prevent flickering
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredNode(null);
    }, 150);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    handleNodeLeave();
  };

  // Initialize entrance animations on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest > 0.3 && latest < 0.7 && !isInView) {
        setIsInView(true);
      } else if ((latest <= 0.3 || latest >= 0.7) && isInView) {
        setIsInView(false);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, isInView]);

  // Removed continuous simulation - using entrance animations only

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Generate responsive entrance directions for each node
  const getRandomEntranceAnimation = (index: number) => {
    const baseDirections = [
      { x: -800, y: -600, rotate: -180 }, // Top-left
      { x: 800, y: -600, rotate: 180 }, // Top-right
      { x: -800, y: 600, rotate: -90 }, // Bottom-left
      { x: 800, y: 600, rotate: 90 }, // Bottom-right
      { x: 0, y: -800, rotate: -270 }, // Top-center
      { x: 0, y: 800, rotate: 270 }, // Bottom-center
    ];

    const direction = baseDirections[index % baseDirections.length];

    // Scale entrance distances for mobile (only on client)
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      const scale = width <= 480 ? 0.6 : width <= 768 ? 0.8 : 1;
      return {
        x: direction.x * scale,
        y: direction.y * scale,
        rotate: direction.rotate,
      };
    }

    return direction;
  };

  return (
    <section ref={ref} className={styles.section}>
      <motion.div
        className={styles.neuralContainer}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background neural grid */}
        <div className={styles.neuralGrid}>
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className={styles.gridNode}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <motion.div
          className={styles.neuralNetwork}
          style={{
            opacity,
            scale: networkScale,
            rotateY: networkTilt,
            rotateX: networkRotateX,
          }}
        >
          {/* Lines removed - focusing on mobile responsive nodes */}

          {/* Neural nodes */}
          {NEURAL_NODES.map((node, index) => (
            <motion.div
              className={styles[`neuralNode${index + 1}`]}
              // className={styles.neuralNode}
              onMouseEnter={() => handleNodeHover(node.id)}
              onMouseLeave={handleNodeLeave}
              key={node.id}
              style={{
                left: `calc(50% + ${getResponsivePosition(node).x}px)`,
                top: `calc(50% + ${getResponsivePosition(node).y}px)`,
              }}
              initial={
                !isHydrated
                  ? {
                      x: 0,
                      y: 0,
                      scale: 1,
                      opacity: 1,
                      rotate: 0,
                    }
                  : {
                      x: getRandomEntranceAnimation(index).x,
                      y: getRandomEntranceAnimation(index).y,
                      scale: 0,
                      opacity: 0,
                      rotate: getRandomEntranceAnimation(index).rotate,
                    }
              }
              animate={
                !isHydrated
                  ? {
                      x: 0,
                      y: 0,
                      scale: 1,
                      opacity: 1,
                      rotate: 0,
                    }
                  : isInView
                  ? {
                      x: 0,
                      y: 0,
                      scale: 1,
                      opacity: 1,
                      rotate: 0,
                    }
                  : {
                      x: getRandomEntranceAnimation(index).x,
                      y: getRandomEntranceAnimation(index).y,
                      scale: 0,
                      opacity: 0,
                      rotate: getRandomEntranceAnimation(index).rotate,
                    }
              }
              transition={{
                delay: index * 0.2,
                duration: 1.2,
                ease: "easeOut",
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              whileHover={{
                zIndex: 100,
              }}
            >
              <motion.div
                className={styles.nodeCore}
                animate={{
                  boxShadow: [
                    `0 0 20px ${node.color}40`,
                    `0 0 40px ${node.color}80`,
                    `0 0 20px ${node.color}40`,
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className={styles.nodeIcon}>
                  <span className={styles.techLabel}>{node.label}</span>
                </div>

                {/* Neural activity indicator */}
                <motion.div
                  className={styles.activityRing}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 2 + index * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5,
                  }}
                  style={{
                    borderColor: node.color,
                  }}
                />

                {/* Circular progress indicator */}
                <svg className={styles.circularProgress} viewBox="0 0 100 100">
                  <circle
                    className={styles.progressBackground}
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="2"
                  />
                  <motion.circle
                    className={styles.progressBar}
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={node.color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                    animate={
                      isInView
                        ? {
                            strokeDashoffset:
                              2 * Math.PI * 45 * (1 - node.strength / 100),
                          }
                        : {
                            strokeDashoffset: 2 * Math.PI * 45,
                          }
                    }
                    transition={{
                      delay: 1 + index * 0.1,
                      duration: 1.5,
                      ease: "easeOut",
                    }}
                  />
                </svg>
              </motion.div>

              {/* Node tooltip */}
              <AnimatePresence>
                {hoveredNode === node.id && (
                  <motion.div
                    className={styles.nodeTooltip}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4>{node.label}</h4>
                    <p className={styles.category}>{node.category}</p>
                    <div className={styles.strengthDisplay}>
                      <span>Proficiency: {node.strength}%</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {/* Central brain visualization */}
          <motion.div
            className={styles.centralBrain}
            initial={{ scale: 0, opacity: 0 }}
            animate={
              isInView
                ? {
                    scale: 1,
                    opacity: 0.6,
                  }
                : {
                    scale: 0,
                    opacity: 0,
                  }
            }
            transition={{
              delay: 1,
              duration: 1.5,
              ease: "easeOut",
            }}
          >
            <motion.div
              className={styles.brainWaves}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ opacity: brainWaveIntensity }}
            />
            <div className={styles.brainCore}>
              <span>TECH</span>
              <span>ARSENAL</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
