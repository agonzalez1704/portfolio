import Link from "next/link";
import { profile } from "@/content/profile";

export function SiteFooter() {
  const { contact } = profile;
  return (
    <footer className="mt-auto bg-ink text-paper">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 pt-12 pb-8 md:gap-14 md:px-12 md:pt-18 md:pb-10 xl:px-24">
        <div className="flex flex-col-reverse gap-8 lg:flex-row lg:items-end lg:justify-between">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <Link href="/#about" className="flex h-11 items-center text-[#bdbdbd] hover:text-paper">About</Link>
            <Link href="/#work" className="flex h-11 items-center text-[#bdbdbd] hover:text-paper">Work</Link>
            <Link href="/#experience" className="flex h-11 items-center text-[#bdbdbd] hover:text-paper">Experience</Link>
            <a href={contact.linkedin} className="flex h-11 items-center text-[#bdbdbd] hover:text-paper">LinkedIn</a>
            <a href={contact.whatsapp} className="flex h-11 items-center text-[#bdbdbd] hover:text-paper">WhatsApp</a>
          </nav>
          <a
            href={`mailto:${contact.email}`}
            className="text-[22px] leading-7 font-light tracking-tight break-all sm:text-3xl lg:text-[44px] lg:leading-12"
          >
            {contact.email}
          </a>
        </div>
        <div className="flex flex-col gap-1 text-[13px] text-[#9a9a9a] sm:flex-row sm:justify-between">
          <span>{profile.name}</span>
          <span>{contact.phoneLabel}</span>
        </div>
      </div>
    </footer>
  );
}
