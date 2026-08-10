import { getTranslations } from "next-intl/server";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/sections/section-heading";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export async function Faq() {
  const t = await getTranslations("home.faq");
  const items = t.raw("items") as { question: string; answer: string }[];

  return (
    <section className="bg-beige/50 py-24 sm:py-28">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <SectionHeading kicker={t("kicker")} title={t("title")} />

        <Reveal className="mt-14">
          <Accordion type="single" collapsible className="rounded-2xl border border-beige-dark/70 bg-white px-6">
            {items.map((item, i) => (
              <AccordionItem key={item.question} value={`item-${i}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
