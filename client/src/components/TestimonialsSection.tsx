import { Star } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    role: "CTO", 
    company: "TechFlow Inc",
    content: "AI Studio transformed our data processing pipeline. The custom model they built increased our accuracy by 40% and reduced processing time by 60%.",
    rating: 5
  },
  {
    name: "Marcus Rodriguez",
    role: "Head of Operations",
    company: "Manufacturing Plus",
    content: "The predictive maintenance system has been a game-changer. We've prevented three major equipment failures and saved over $200K in the first quarter alone.",
    rating: 5
  },
  {
    name: "Emily Watson",
    role: "Product Manager",
    company: "RetailNext",
    content: "Their computer vision solution for inventory management is incredibly precise. It's like having a team of experts working 24/7 with perfect accuracy.",
    rating: 5
  }
];

export const TestimonialsSection = () => {
  const titleRef = useScrollReveal();

  return (
    <section className="section-spacing page-padding bg-background-alt">
      <div className="max-w-6xl mx-auto">
        <div ref={titleRef} className="scroll-reveal text-center mb-16">
          <h2 className="text-h2 text-foreground mb-6">What Our Clients Say</h2>
          <p className="text-h3 text-muted-foreground max-w-2xl mx-auto">
            Trusted by forward-thinking companies to deliver exceptional AI solutions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial, index }: { testimonial: Testimonial; index: number }) => {
  const cardRef = useScrollReveal();

  return (
    <div 
      ref={cardRef} 
      className="scroll-reveal bg-card border border-border rounded-2xl p-8 space-y-6"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Rating Stars */}
      <div className="flex space-x-1">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-accent text-accent" />
        ))}
      </div>

      {/* Testimonial Content */}
      <blockquote className="text-body text-foreground">
        "{testimonial.content}"
      </blockquote>

      {/* Author Info */}
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/5 rounded-full flex items-center justify-center">
          <span className="text-accent font-bold text-lg">
            {testimonial.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div>
          <div className="font-medium text-foreground">{testimonial.name}</div>
          <div className="text-sm text-muted-foreground">
            {testimonial.role} at {testimonial.company}
          </div>
        </div>
      </div>
    </div>
  );
};