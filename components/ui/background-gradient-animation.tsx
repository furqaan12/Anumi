"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgba(0, 0, 0, 1)",
  gradientBackgroundEnd = "rgba(0, 0, 0, 1)",
  firstColor = "18, 113, 255",
  secondColor = "221, 74, 255",
  thirdColor = "100, 220, 255",
  fourthColor = "200, 50, 50",
  fifthColor = "180, 180, 50",
  pointerColor = "140, 100, 255",
  size = "80%",
  blendingValue = "hard-light",
  children,
  className,
  interactive = true,
  containerClassName,
}: {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  containerClassName?: string;
}) => {
  const interactiveRef = useRef<HTMLDivElement>(null);

  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--gradient-background-start",
        gradientBackgroundStart
      );
      containerRef.current.style.setProperty(
        "--gradient-background-end",
        gradientBackgroundEnd
      );
      containerRef.current.style.setProperty("--first-color", firstColor);
      containerRef.current.style.setProperty("--second-color", secondColor);
      containerRef.current.style.setProperty("--third-color", thirdColor);
      containerRef.current.style.setProperty("--fourth-color", fourthColor);
      containerRef.current.style.setProperty("--fifth-color", fifthColor);
      containerRef.current.style.setProperty("--pointer-color", pointerColor);
      containerRef.current.style.setProperty("--size", size);
      containerRef.current.style.setProperty("--blending-value", blendingValue);
    }
  }, [
    gradientBackgroundStart,
    gradientBackgroundEnd,
    firstColor,
    secondColor,
    thirdColor,
    fourthColor,
    fifthColor,
    pointerColor,
    size,
    blendingValue,
  ]);

  useEffect(() => {
    let rafId: number;
    const loop = () => {
      setCurX((c) => c + (tgX - c) / 20);
      setCurY((c) => c + (tgY - c) / 20);
      rafId = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(rafId);
  }, [tgX, tgY]);

  useEffect(() => {
    if (interactiveRef.current) {
      interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
    }
  }, [curX, curY]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (interactiveRef.current) {
      const rect = interactiveRef.current.getBoundingClientRect();
      setTgX(event.clientX - rect.left);
      setTgY(event.clientY - rect.top);
    }
  };

  const [isSafari] = useState(() => /^((?!chrome|android).)*safari/i.test(navigator.userAgent));

  return (
    <div
      ref={containerRef}
      className={cn(
        "h-screen w-screen relative overflow-hidden top-0 left-0 bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]",
        containerClassName
      )}
    >
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className={cn("", className)}>{children}</div>
      <div
        className={cn(
          "gradients-container h-full w-full blur-lg [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]",
          isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]"
        )}
      >
        <div
          className={cn(
            `absolute [background:radial-gradient(ellipse_at_center,_rgba(var(--fourth-color),_0.3)_0,_rgba(var(--fourth-color),_0)_100%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-full h-full top-0 left-0`,
            `[transform-origin:center_center]`,
            `animate-[moveHorizontal_100s_ease_infinite]`,
            `opacity-30 z-0`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_var(--first-color)_0%,_rgba(var(--first-color),_0.8)_30%,_rgba(var(--first-color),_0.4)_60%,_transparent_100%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(100%-var(--size))] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:center_center] [clip-path:ellipse(80%_40%_at_50%_100%)]`,
            `animate-first`,
            `opacity-100`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.4)_0,_rgba(var(--second-color),_0)_80%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[300%] h-[var(--size)] top-[calc(100%-var(--size))] left-[-100%]`,
            `[transform-origin:center_center]`,
            `animate-second`,
            `opacity-40`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.9)_0,_rgba(var(--third-color),_0.2)_40%,_transparent_80%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[calc(1.2*var(--size))] h-[calc(1.2*var(--size))] top-[calc(-30%-var(--size)/2)] left-[calc(50%-calc(0.6*var(--size)))]`,
            `[transform-origin:calc(50%+200px)]`,
            `animate-third`,
            `opacity-90`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.6)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(100%-var(--size))] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%-100px)] [clip-path:ellipse(50%_30%_at_30%_80%)]`,
            `animate-fourth`,
            `opacity-60`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.5)_0,_rgba(var(--fifth-color),_0)_70%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[calc(1.5*var(--size))] h-[calc(0.7*var(--size))] top-[calc(100%-calc(0.7*var(--size)))] left-[calc(50%-calc(0.75*var(--size)))]` ,
            `[transform-origin:calc(50%-400px)_calc(50%+400px)] [clip-path:ellipse(60%_30%_at_70%_70%)]`,
            `animate-fifth`,
            `opacity-70`
          )}
        ></div>

        {interactive && (
          <div
            ref={interactiveRef}
            onMouseMove={handleMouseMove}
            className={cn(
              `absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]`,
              `[mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2`,
              `opacity-70`
            )}
          ></div>
        )}
      </div>
    </div>
  );
};
