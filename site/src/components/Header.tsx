"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./Icon";
import { Button } from "./Button";
import { menuItems } from "@/lib/content";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-grey-200 bg-white">
        <div className="mx-auto flex h-16 max-w-[1160px] items-center justify-between gap-3 px-5 md:px-10">
          <Link href="/" className="flex min-h-11 items-center" onClick={() => setOpen(false)}>
            <Image
              src="/images/logo.png"
              alt="WC Rent Belgium"
              width={140}
              height={38}
              style={{ width: "auto", height: "38px" }}
              priority
            />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {menuItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[14px] font-semibold no-underline ${
                    active ? "text-blue-500" : "text-navy-800 hover:text-blue-500"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Button href="/reserver" size="sm" showArrow={false}>
              Réserver
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-navy-800 hover:bg-grey-050 lg:hidden"
          >
            <Icon name={open ? "x" : "menu"} size={24} />
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-30 lg:hidden" role="dialog" aria-modal="true">
          <button
            aria-label="Fermer le menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-[rgba(4,24,47,0.35)] backdrop-blur-[2px] border-0 cursor-pointer"
          />
          <nav className="absolute left-0 right-0 top-16 mx-auto max-w-[480px] bg-white shadow-lg">
            <ul className="m-0 grid list-none gap-1 p-4">
              {menuItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`block rounded-lg px-4 py-3.5 text-[16px] font-bold no-underline ${
                        active ? "bg-blue-050 text-blue-500" : "text-navy-800 hover:bg-grey-050"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
