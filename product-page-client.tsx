"use client"

import Image from "next/image"
import { Star, Check, ExternalLink } from "lucide-react"
import { Header } from "@/components/header"
import { StickyBuyButton } from "@/components/sticky-buy-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { Product } from "@/lib/products"
import { useLanguage } from "@/contexts/language-context"

interface ProductPageClientProps {
  product: Product
}

export function ProductPageClient({ product }: ProductPageClientProps) {
  const { t } = useLanguage()

  const handleBuyClick = () => {
    window.open(product.hoplink, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Sticky Buy Buttons - positioned on both sides */}
      <StickyBuyButton hoplink={product.hoplink} price={product.price} productName={product.name} position="left" />

      <StickyBuyButton hoplink={product.hoplink} price={product.price} productName={product.name} position="right" />

      <div className="h-32" />

      {/* Hero Section */}
      <section className="border-b border-border bg-secondary/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="flex flex-col justify-center">
              <div className="mb-3 inline-block w-fit rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent">
                {product.category}
              </div>

              <h1 className="mb-4 text-balance text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
                {product.name}
              </h1>

              <div className="mb-4 flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "fill-accent text-accent" : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-medium">
                  {product.rating} ({product.reviews} avis)
                </span>
              </div>

              <p className="mb-6 text-balance text-lg text-muted-foreground">{product.shortDescription}</p>

              <div className="mb-6 flex items-baseline gap-3">
                <span className="text-4xl font-bold text-accent">{product.price}€</span>
                <span className="text-sm text-muted-foreground">Paiement unique</span>
              </div>

              <Button size="lg" onClick={handleBuyClick} className="gap-2 bg-accent text-lg hover:bg-accent/90">
                {t("buy")}
                <ExternalLink className="h-5 w-5" />
              </Button>

              <p className="mt-4 text-sm text-muted-foreground">
                ✓ Paiement 100% sécurisé via ClickBank
                <br />✓ Garantie satisfait ou remboursé 60 jours
                <br />✓ Accès immédiat après achat
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          {/* Description */}
          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-bold">{t("description")}</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">{product.longDescription}</p>
          </section>

          {/* Features */}
          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-bold">Ce que vous obtenez</h2>
            <Card>
              <CardContent className="p-6">
                <ul className="grid gap-4 sm:grid-cols-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                        <Check className="h-3 w-3 text-accent" />
                      </div>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Benefits */}
          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-bold">{t("benefits")}</h2>
            <div className="grid gap-4">
              {product.benefits.map((benefit, index) => (
                <Card key={index}>
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                      <Check className="h-6 w-6" />
                    </div>
                    <p className="text-lg font-medium">{benefit}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="mb-16">
            <Card className="border-accent/20 bg-accent/5">
              <CardContent className="p-8 text-center">
                <h3 className="mb-4 text-2xl font-bold">Prêt à commencer votre transformation ?</h3>
                <p className="mb-6 text-lg text-muted-foreground">
                  Rejoignez les milliers de personnes qui ont déjà transformé leur vie
                </p>
                <Button size="lg" onClick={handleBuyClick} className="gap-2 bg-accent text-lg hover:bg-accent/90">
                  {t("buy")} - {product.price}€
                  <ExternalLink className="h-5 w-5" />
                </Button>
                <p className="mt-4 text-sm text-muted-foreground">Garantie satisfait ou remboursé 60 jours</p>
              </CardContent>
            </Card>
          </section>

          {/* Testimonials */}
          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-bold">{t("testimonials")}</h2>
            <div className="grid gap-6">
              {product.testimonials.map((testimonial, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating ? "fill-accent text-accent" : "fill-muted text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="mb-4 leading-relaxed text-muted-foreground">"{testimonial.content}"</p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-bold">{t("faq")}</h2>
            <Accordion type="single" collapsible className="w-full">
              {product.faq.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg font-semibold">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Final CTA */}
          <section>
            <Card className="border-2 border-accent">
              <CardContent className="p-8 text-center">
                <h3 className="mb-4 text-3xl font-bold">Ne manquez pas cette opportunité</h3>
                <p className="mb-6 text-lg text-muted-foreground">Investissez en vous-même dès aujourd'hui</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-accent">{product.price}€</span>
                </div>
                <Button size="lg" onClick={handleBuyClick} className="gap-2 bg-accent text-xl hover:bg-accent/90">
                  {t("buy")}
                  <ExternalLink className="h-6 w-6" />
                </Button>
                <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                  <p>✓ Accès immédiat après paiement</p>
                  <p>✓ Garantie satisfait ou remboursé 60 jours</p>
                  <p>✓ Paiement 100% sécurisé</p>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">{t("copyright")}</p>
        </div>
      </footer>
    </div>
  )
}
