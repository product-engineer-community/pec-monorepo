"use client";

import Link from "next/link";
import { CAMP_PAYMENT_PATHNAME } from "@/shared/config/pathname";
import { useEffect, useRef, useState } from "react";

export const BasicApplyButton = ({ isFixed = false }) => {
  const baseClasses =
    "w-36 rounded-lg bg-yellow-400 p-4 text-lg font-semibold text-blue-800";
  const fixedClasses = "fixed bottom-[80px] left-[calc(50%-72px)] z-50";

  return (
    <div className={isFixed ? fixedClasses : "my-16 flex justify-center"}>
      <Link href={CAMP_PAYMENT_PATHNAME}>
        <button className={baseClasses}>결제하기</button>
      </Link>
    </div>
  );
};

export const ApplyButton = () => {
  const [isSecondButtonVisible, setIsSecondButtonVisible] = useState(false);
  const secondButtonRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSecondButtonVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1, // 10%가 보이면 visible로 간주
      },
    );

    if (secondButtonRef.current) {
      observer.observe(secondButtonRef.current);
    }

    return () => {
      if (secondButtonRef.current) {
        observer.unobserve(secondButtonRef.current);
      }
    };
  }, []);

  return (
    <>
      {!isSecondButtonVisible && <BasicApplyButton isFixed={true} />}
      <div ref={secondButtonRef}>
        <BasicApplyButton />
      </div>
    </>
  );
};
