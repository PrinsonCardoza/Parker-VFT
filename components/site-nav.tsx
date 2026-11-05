"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Plane, Sailboat, BriefcaseBusiness, ShieldCheck, Warehouse, Truck, ArrowRight, Wrench } from "lucide-react"

const servicesmenu = [
  // {
  //   href: "/service",
  //   label: "All service",
  //   icon: <Wrench className="mr-2 h-4 w-4 text-purple-900" />,
  // },
  {
    href: "/air-freight",
    label: "Air Freight",
    icon: <Plane className="mr-2 h-4 w-4 text-purple-900" />,
  },
  {
    href: "/customs",
    label: "Customs Clearance & Security",
    icon: <ShieldCheck className="mr-2 h-4 w-4 text-purple-900" />,
  },
  {
    href: "/land-transportation-cross-border-trucking",
    label: "Land Freight",
    icon: <Truck className="mr-2 h-4 w-4 text-purple-900" />,
  },
  {
    href: "/project-cargo",
    label: "Project Handling, OOG Cargo",
    icon: <BriefcaseBusiness className="mr-2 h-4 w-4 text-purple-900" />,
  },
  {
    href: "/sea-freight",
    label: "Sea Freight",
    icon: <Sailboat className="mr-2 h-4 w-4 text-purple-900" />,
  },

  {
    href: "/warehousing-and-distribution",
    label: "Warehousing & Distribution",
    icon: <Warehouse className="mr-2 h-4 w-4 text-purple-900" />,
  },
]

export function SiteNav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo/parker.png" alt="Parker Express Shipping LLC logo" width={148} height={44} priority />
          <span className="sr-only">Parker Express Shipping LLC</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="text-md font-bold text-purple-900 hover:text-cyan-600 transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
          >
            Home
          </Link>
          <Link
            href="/about-us"
            className="text-md font-bold text-purple-900 hover:text-cyan-600 transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
          >
            About
          </Link>

          {/* <Link
            href="/careers"
            className="text-md font-bold text-purple-900 hover:text-cyan-600 transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
          >
            Career
          </Link> */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-md font-bold text-purple-900 hover:text-cyan-600 transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full">
              Services <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 animate-fade-in-up">
              {servicesmenu.map((menu) => (
                <DropdownMenuItem key={menu.label} asChild>
                  <Link
                    href={menu.href}
                    className="w-full flex font-bold text-purple-900 hover:text-cyan-600 transition-colors"
                  >
                    {menu.icon}
                    {menu.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            href="/contact#locations"
            className="text-md font-bold text-purple-900 hover:text-cyan-600 transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
          >
            Branches
          </Link>
          <Link
            href="/contact"
            className="text-md font-bold text-purple-900 hover:text-cyan-600 transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
          >
            Contact
          </Link>

          <Link
            href="/contact#contact-form"
            className="inline-flex items-center rounded-md bg-cyan-600 px-4 py-2 text-sm font-semibold text-primary-foreground shadow hover:bg-cyan-600/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Get Quote
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="md:hidden inline-flex items-center rounded-md border px-3 py-2"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Sheet Nav */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent id="mobile-nav" side="right" className="w-3/4 sm:max-w-sm p-0">
          <div className="space-y-2 px-4 py-5">
            <Image src="/logo/parker.png" alt="Parker Express Shipping LLC logo" width={148} height={44} priority />
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-sm text-purple-900 font-bold hover:bg-muted"
            >
              Home
            </Link>
            <Link
              href="/about-us"
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-sm text-purple-900 font-bold hover:bg-muted"
            >
              About
            </Link>

            <div className="rounded-md">
              <div className="px-3 py-2 text-sm font-bold text-purple-900">Services</div>
              <div className="ml-2 space-y-1">
                {servicesmenu.map((menu) => (
                  <Link
                    key={menu.label}
                    href={menu.href}
                    onClick={() => setOpen(false)}
                    className="flex rounded-md px-3 py-1.5 text-sm font-semibold text-purple-900 hover:bg-muted"
                  >
                    {menu.icon}
                    {menu.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* <Link
              href="/careers"
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-sm text-purple-900 font-bold hover:bg-muted"
            >
              Careers
            </Link> */}
            <Link
              href="/contact#locations"
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-sm text-purple-900 font-bold hover:bg-muted"
            >
              Branches
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-sm text-purple-900 font-bold hover:bg-muted"
            >
              Contact Us
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="block mt-4 rounded-md bg-cyan-600 px-3 py-2 text-center text-sm font-semibold text-primary-foreground"
            >
              Get Quote
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
