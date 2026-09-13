import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { COMPANY, menuItems } from "@/lib/content";

export function Footer() {
  const telHref = "tel:" + COMPANY.phone.replace(/\s/g, "");

  return (
    <>
      <div className="border-t border-grey-200 bg-white py-8">
        <Container className="flex justify-center">
          <Image src="/images/logo.png" alt="WC Rent Belgium" width={240} height={64} className="h-auto w-full max-w-[240px]" />
        </Container>
      </div>
      <footer className="bg-navy-900 py-12 text-white">
        <Container className="grid gap-8 md:grid-cols-[1fr_2fr] md:items-start">
          <div className="grid gap-2 content-start">
            <p className="m-0 text-[13px] font-bold uppercase tracking-[0.10em] text-white/60">Nous joindre</p>
            <a href={telHref} className="text-[18px] font-bold text-white no-underline">
              {COMPANY.phone}
            </a>
            <a href={`mailto:${COMPANY.email}`} className="text-[15px] text-white/80 no-underline">
              {COMPANY.email}
            </a>
          </div>
          <nav className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-[14px] text-white/80 no-underline">
                {item.label}
              </Link>
            ))}
          </nav>
        </Container>
        <Container>
          <p className="m-0 mt-8 text-[12px] text-white/50">
            © {new Date().getFullYear()} WC Rent Belgium. Location, nettoyage et débouchage de sanitaires mobiles en
            Belgique.
          </p>
        </Container>
      </footer>
    </>
  );
}
