import { ArrowRight, Mail, MessageCircle } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Button } from './ui/button';

export const CTASection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section className="section-spacing-large page-padding">
      <div className="max-w-4xl mx-auto">
        <div ref={sectionRef} className="scroll-reveal text-center space-y-8">
          <div className="space-y-6">
            <h2 className="text-h2 text-foreground">Let's Build Something Amazing</h2>
            <p className="text-h3 text-muted-foreground max-w-2xl mx-auto">
              Ready to transform your business with AI? Let's discuss your project and explore the possibilities together.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 py-4 font-medium"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Start a Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-border text-foreground hover:bg-accent/5 rounded-full px-8 py-4 font-medium"
            >
              <Mail className="mr-2 h-5 w-5" />
              Get in Touch
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            Free consultation • No commitment required • Expert guidance included
          </div>
        </div>
      </div>
    </section>
  );
};