import type { Metadata } from "next";
import { SITE_URL, OG_IMAGE } from "@/lib/siteConfig";
import CarRentalContent from "./CarRentalContent";

export const metadata: Metadata = {
  title: "Car Rental Growth System | Sample Project",
  description:
    "A sample local growth system built for independent car rental businesses — local SEO, review generation, and booking tracking.",
  openGraph: {
    title: "Car Rental Growth System | Foundational AI Systems",
    description:
      "A sample local growth system built for independent car rental businesses — local SEO, review generation, and booking tracking.",
    url: `${SITE_URL}/work/car-rental`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Foundational AI Systems" }],
  },
  alternates: { canonical: `${SITE_URL}/work/car-rental` },
  robots: { index: false },
};

export default function CarRentalPage() {
  return <CarRentalContent />;
}
