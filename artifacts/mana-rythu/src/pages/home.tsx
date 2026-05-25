import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary/10">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-primary">
                  Direct from Our Farmers to You
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Mana Rythu connects Indian farmers directly with buyers. Fair prices for them, fresh produce for you.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/marketplace">
                  <Button size="lg" className="h-11 px-8">Shop Now</Button>
                </Link>
                <Link href="/register">
                  <Button variant="outline" size="lg" className="h-11 px-8">Join as Farmer</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
