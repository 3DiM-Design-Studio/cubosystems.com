'use client';

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { motion, useMotionValue, useTransform, type PanInfo, type Transition } from 'framer-motion';
import { usePrefersReducedMotion } from './useReducedMotion';

export type CarouselItem = {
  id: number;
  title: string;
  description: string;
  tags?: string[];
  icon: ReactNode;
};

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS: Transition = { type: 'spring', stiffness: 300, damping: 30 };
const AUTOPLAY_INTERVAL = 4500;
const AUTOPLAY_RESUME_DELAY = 6000;

function CarouselCard({
  item,
  index,
  itemWidth,
  trackItemOffset,
  x,
  transition,
  isActive,
}: {
  item: CarouselItem;
  index: number;
  itemWidth: number;
  trackItemOffset: number;
  x: ReturnType<typeof useMotionValue<number>>;
  transition: Transition;
  isActive: boolean;
}) {
  const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
  const outputRange = [90, 0, -90];
  const rotateY = useTransform(x, range, outputRange, { clamp: false });

  return (
    <motion.div
      className={'carousel-card' + (isActive ? ' is-active' : '')}
      style={{ width: itemWidth, rotateY }}
      transition={transition}
    >
      <span className="carousel-card-outline-num" aria-hidden="true">0{item.id + 1}</span>
      <div className="carousel-card-top">
        <span className="carousel-card-icon">{item.icon}</span>
      </div>
      <div className="carousel-card-body">
        <span className="carousel-card-body-rule" aria-hidden="true" />
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        {item.tags && item.tags.length > 0 && (
          <ul className="carousel-card-tags">
            {item.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

export default function Carousel({
  items,
  baseWidth = 340,
  loop = true,
  onActiveChange,
}: {
  items: CarouselItem[];
  baseWidth?: number;
  loop?: boolean;
  onActiveChange?: (index: number) => void;
}) {
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;
  const reduceMotion = usePrefersReducedMotion();

  const itemsForRender = useMemo(() => {
    if (!loop || items.length === 0) return items;
    return [items[items.length - 1], ...items, items[0]];
  }, [items, loop]);

  const startingPosition = loop ? 1 : 0;
  const [position, setPosition] = useState(startingPosition);
  const x = useMotionValue(-startingPosition * trackItemOffset);
  const [isJumping, setIsJumping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoplayPaused, setAutoplayPaused] = useState(false);

  const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationStart = () => setIsAnimating(true);

  const handleAnimationComplete = () => {
    if (!loop || itemsForRender.length <= 1) {
      setIsAnimating(false);
      return;
    }
    const lastCloneIndex = itemsForRender.length - 1;

    if (position === lastCloneIndex) {
      setIsJumping(true);
      setPosition(1);
      x.set(-1 * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    if (position === 0) {
      setIsJumping(true);
      setPosition(items.length);
      x.set(-items.length * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    setIsAnimating(false);
  };

  const step = (direction: 1 | -1) => {
    setPosition((prev) => {
      const next = prev + direction;
      const max = itemsForRender.length - 1;
      return Math.max(0, Math.min(next, max));
    });
  };

  const pauseAutoplayThenResume = () => {
    setAutoplayPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => setAutoplayPaused(false), AUTOPLAY_RESUME_DELAY);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info;
    const direction =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
        ? 1
        : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
          ? -1
          : 0;

    pauseAutoplayThenResume();
    if (direction === 0) return;
    step(direction as 1 | -1);
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0),
          right: 0,
        },
      };

  const activeIndex =
    items.length === 0 ? 0 : loop ? (position - 1 + items.length) % items.length : Math.min(position, items.length - 1);

  useEffect(() => {
    onActiveChange?.(activeIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  const goTo = (i: number) => {
    pauseAutoplayThenResume();
    setPosition(loop ? i + 1 : i);
  };

  const handleArrowClick = (direction: 1 | -1) => {
    pauseAutoplayThenResume();
    step(direction);
  };

  // Autoplay: advances one card at a fixed interval, only while idle — any
  // drag, arrow click or dot click pauses it and schedules a resume so it
  // never fights an in-progress user interaction.
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (reduceMotion || autoplayPaused || items.length <= 1) return undefined;
    const timer = setInterval(() => step(1), AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion, autoplayPaused, items.length]);

  useEffect(() => () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  }, []);

  return (
    <div
      className="carousel"
      style={{ width: baseWidth }}
      onMouseEnter={() => setAutoplayPaused(true)}
      onMouseLeave={() => setAutoplayPaused(false)}
    >
      <motion.div
        className="carousel-track"
        drag={isAnimating ? false : 'x'}
        {...dragProps}
        style={{
          width: itemWidth,
          gap: GAP,
          perspective: 1000,
          perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(position * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationStart={handleAnimationStart}
        onAnimationComplete={handleAnimationComplete}
      >
        {itemsForRender.map((item, index) => (
          <CarouselCard
            key={`${item.id}-${index}`}
            item={item}
            index={index}
            itemWidth={itemWidth}
            trackItemOffset={trackItemOffset}
            x={x}
            transition={effectiveTransition}
            isActive={item.id === activeIndex}
          />
        ))}
      </motion.div>

      <div className="carousel-nav-row">
        <div className="carousel-dots">
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              className={'carousel-dot' + (activeIndex === index ? ' active' : '')}
              aria-label={`Go to step ${index + 1}`}
              aria-current={activeIndex === index}
              onClick={() => goTo(index)}
            />
          ))}
        </div>

        <div className="carousel-arrows">
          <button
            type="button"
            className="carousel-arrow"
            aria-label="Previous stage"
            onClick={() => handleArrowClick(-1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button
            type="button"
            className="carousel-arrow"
            aria-label="Next stage"
            onClick={() => handleArrowClick(1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
