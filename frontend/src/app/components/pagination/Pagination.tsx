"use client";

import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import clsx from "clsx";
import Link from "next/link";
import styles from "./pagination.module.css";
import { generatePagination } from "@/app/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const allPages = generatePagination(currentPage, totalPages);

  const createPageURL = (page: string | number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    return `${pathname}?${params.toString()}`
  }

  return (
    <div className={styles.pagination}>
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />

      <div className={styles.paginationPosition}>
        {allPages.map((page, index) => {
          let position: "first" | "last" | "single" | "middle" | undefined;

          if (index === 0) position = "first";
          if (index === allPages.length - 1) position = "last";
          if (allPages.length === 1) position = "single";
          if (page === "...") position = "middle";

          return (
            <PaginationNumber
              key={page}
              href={createPageURL(page)}
              page={page}
              position={position}
              isActive={currentPage === page}
            />
          );
        })}
      </div>

      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
}

function PaginationNumber({
  page,
  href,
  position,
  isActive,
}: {
  page: number | string;
  href: string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) {
  const className = clsx(styles.paginationNumberButton, {
    [styles.roundedStart]: position === "first" || position === "single",
    [styles.roundedEnd]: position === "last" || position === "single",
    [styles.currentPage]: isActive,
    [styles.clickablePage]: !isActive && position !== "middle",
    [styles.ellipsisPage]: position === "middle",
  });

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <Link className={className} href={href}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const className = clsx(styles.paginationArrowButton, {
    [styles.disabledArrow]: isDisabled,
    [styles.activeArrow]: !isDisabled,
    [styles.arrowLeft]: direction === "left",
    [styles.arrowRight]: direction === "right",
  });

  const icon = direction === "left" ? <> <BsChevronLeft /> <p>Atras</p></> : <><p>Siguiente</p> <BsChevronRight /></>;

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}
