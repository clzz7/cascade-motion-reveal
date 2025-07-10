import { Brain, Zap, Target, BarChart3 } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface Service {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  features: string[];
}

const services: Service[] = [
  {
    icon: Brain,
    title: "AI Model Development",
    description: "Custom machine learning models designed for your specific use case and data requirements.",
    features: ["Neural Network Design", "Data Processing", "Model Training", "Performance Optimization"]
  },
  {
    icon: Zap,
    title: "AI Integration",
    description: "Seamlessly integrate AI capabilities into your existing systems and workflows.",
    features: ["API Development", "System Integration", "Real-time Processing", "Cloud Deployment"]
  },
  {
    icon: Target,
    title: "Computer Vision",
    description: "Advanced image and video analysis solutions for automation and insights.",
    features: ["Object Detection", "Image Classification", "Video Analytics", "Quality Control"]
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics",
    description: "Harness the power of data to predict trends and make informed business decisions.",
    features: ["Time Series Analysis", "Risk Assessment", "Demand Forecasting", "Business Intelligence"]
  }
];

export const ServicesSection = () => {
  const sectionRef = useScrollReveal();
  const titleRef = useScrollReveal();

  return (
    <section className="section-spacing page-padding bg-background-alt">
      <div className="max-w-6xl mx-auto">
        <div ref={titleRef} className="scroll-reveal text-center mb-16">
          <h2 className="text-h2 text-foreground mb-6">Services</h2>
          <p className="text-h3 text-muted-foreground max-w-2xl mx-auto">
            Comprehensive AI solutions to transform your business processes and unlock new possibilities
          </p>
        </div>

        <div ref={sectionRef} className="scroll-reveal grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const cardRef = useScrollReveal();
  const Icon = service.icon;

  return (
    <div 
      ref={cardRef} 
      className="scroll-reveal bg-card border border-border rounded-2xl p-8 group hover:shadow-lg transition-shadow duration-300"
    >
      {/* Decorative dots pattern */}
      <div className="flex justify-end mb-6">
        <div className="grid grid-cols-3 gap-1">
          {Array.from({ length: 9 }).map((_, i) => (
            <div 
              key={i}
              className={`w-2 h-2 bg-accent rounded-full 
                         ${i % 3 === 0 ? 'pulse-dots' : ''}
                         ${i % 3 === 1 ? 'pulse-dots-delayed-1' : ''}
                         ${i % 3 === 2 ? 'pulse-dots-delayed-2' : ''}`}
            />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-accent/10 rounded-xl">
            <Icon className="h-6 w-6 text-accent" />
          </div>
          <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
        </div>

        <p className="text-body text-muted-foreground">
          {service.description}
        </p>

        <div className="space-y-2">
          {service.features.map((feature) => (
            <div key={feature} className="flex items-center space-x-2">
              <div className="w-1 h-1 bg-accent rounded-full" />
              <span className="text-sm text-foreground font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};