"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";
import type { ProjectData } from "@/lib/projects";

interface ProjectCarouselProps {
  images: ProjectData["gallery"];
  title: string;
}

export default function ProjectCarousel({
  images,
  title,
}: ProjectCarouselProps) {
  const [index, setIndex] = useState(0);

  const total = images?.length ?? 0;
  const hasMultiple = total > 1;

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % total);
  }, [total]);

  useEffect(() => {
    if (!hasMultiple) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        goPrev();
      } else if (e.key === "ArrowRight") {
        goNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasMultiple, goPrev, goNext]);

  if (!images || total === 0) return null;

  const current = images[index];

  return (
    <div>
      {/* Image container — fixed 420px height. The motion.div fills the
          container and crossfades on index change; the img inside fills
          the motion.div via inline styles + .carousel-img overrides. */}
      <div
        className="carousel-container"
        style={{
          position: "relative",
          width: "100%",
          height: "420px",
          overflow: "hidden",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="carousel-img"
              src={urlFor(current).width(1200).url()}
              alt={`${title} — image ${index + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation row — inline below the image, only when more than one image */}
      {hasMultiple && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            padding: "0.5rem 0",
          }}
        >
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous image"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: "14px",
              color: "var(--color-muted)",
              transition: "color 150ms ease",
              lineHeight: 1,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-text)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--color-muted)")
            }
          >
            ←
          </button>

          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--color-muted)",
              textAlign: "center",
            }}
          >
            {index + 1} / {total}
          </span>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next image"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: "14px",
              color: "var(--color-muted)",
              transition: "color 150ms ease",
              lineHeight: 1,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-text)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--color-muted)")
            }
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
