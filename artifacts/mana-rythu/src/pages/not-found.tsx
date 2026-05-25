import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Leaf, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex flex-col items-center text-center px-4"
      >
        <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-8">
          <Leaf className="h-12 w-12 opacity-50" />
        </div>
        
        <h1 className="text-8xl font-display font-bold text-foreground mb-4">404</h1>
        <h2 className="text-2xl font-display font-semibold text-muted-foreground mb-8">This field lies fallow.</h2>
        <p className="max-w-md text-muted-foreground mb-8">
          We couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        
        <Link href="/">
          <Button size="lg" className="rounded-full h-14 px-8 shadow-lg shadow-primary/20 group">
            Return to Marketplace
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
