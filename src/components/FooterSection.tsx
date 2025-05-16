import {
  Footer,
  FooterColumn,
  FooterBottom,
  FooterContent,
} from "@/components/ui/footer";
import Image from "next/image";
import Link from "next/link";

export default function FooterSection() {
  return (
    <footer className="w-full bg-background px-4 py-6">
      <div className="mx-auto max-w-container">
        <Footer>
          <FooterContent>
            <FooterColumn className="col-span-4 sm:col-span-2 md:col-span-1">
              <div className="flex items-center gap-2">
                <Image
                  src="/XeeAI Logo (Draft).svg"
                  className="h-8"
                  width={30}
                  height={30}
                  alt="XeeAI Logo"
                />
                <h3 className="text-xl font-bold">XeeAI</h3>
              </div>
            </FooterColumn>
            <FooterColumn className="col-span-2 sm:col-span-1">
              <h3 className="text-md pt-1 font-semibold">Product</h3>
              <Link href="/" className="text-sm text-muted-foreground">
                Changelog
              </Link>
              <Link href="/" className="text-sm text-muted-foreground">
                Documentation
              </Link>
            </FooterColumn>
            <FooterColumn className="col-span-2 sm:col-span-1">
              <h3 className="text-md pt-1 font-semibold">Company</h3>
              <Link href="/" className="text-sm text-muted-foreground">
                About
              </Link>
              <Link href="/" className="text-sm text-muted-foreground">
                Careers
              </Link>
              <Link href="/" className="text-sm text-muted-foreground">
                Blog
              </Link>
            </FooterColumn>
            <FooterColumn className="col-span-4 sm:col-span-2 md:col-span-1">
              <h3 className="text-md pt-1 font-semibold">Contact</h3>
              <div className="flex flex-wrap gap-x-4 sm:gap-x-0 sm:flex-col">
                <Link href="/" className="text-sm text-muted-foreground">
                  Discord
                </Link>
                <Link href="/" className="text-sm text-muted-foreground">
                  Twitter
                </Link>
                <Link href="/" className="text-sm text-muted-foreground">
                  Github
                </Link>
              </div>
            </FooterColumn>
          </FooterContent>
          <FooterBottom className="flex-col sm:flex-row gap-4 sm:gap-0">
            <div className="text-center sm:text-left text-sm">© 2025 Mikołaj Dobrucki. All rights reserved</div>
            <div className="flex items-center justify-center sm:justify-end gap-4 text-sm">
              <Link href="/">Privacy Policy</Link>
              <Link href="/">Terms of Service</Link>
            </div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  );
}
