import { ArrowRight, ExternalLink } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Button } from './ui/button';

interface ProjectCard {
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}

const projects: ProjectCard[] = [
  {
    title: "Intelligent Document Processing",
    category: "Computer Vision",
    description: "AI-powered document analysis and data extraction system that processes thousands of documents daily with 99.2% accuracy.",
    image: "photo-1461749280684-dccba630e2f6",
    tags: ["OCR", "NLP", "Machine Learning", "Document AI"]
  },
  {
    title: "Predictive Maintenance System",
    category: "IoT & Analytics",
    description: "Real-time equipment monitoring and failure prediction system that reduced downtime by 45% for manufacturing clients.",
    image: "photo-1518770660439-4636190af475",
    tags: ["Time Series", "Anomaly Detection", "IoT", "Predictive Analytics"]
  },
  {
    title: "AI Customer Support Assistant",
    category: "Natural Language Processing",
    description: "Conversational AI that handles 80% of customer inquiries automatically while maintaining high satisfaction scores.",
    image: "photo-1485827404703-89b55fcc595e",
    tags: ["Chatbot", "NLP", "Sentiment Analysis", "Automation"]
  }
];

export const WorkSection = () => {
  const titleRef = useScrollReveal();

  return (
    <section className="section-spacing page-padding">
      <div className="max-w-6xl mx-auto">
        <div ref={titleRef} className="scroll-reveal text-center mb-16">
          <h2 className="text-h2 text-foreground mb-6">Selected Work</h2>
          <p className="text-h3 text-muted-foreground max-w-2xl mx-auto">
            Real-world AI solutions that drive business results and innovation
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="ghost" 
            size="lg"
            className="text-foreground hover:text-accent font-medium"
          >
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }: { project: ProjectCard; index: number }) => {
  const cardRef = useScrollReveal();

  return (
    <div 
      ref={cardRef} 
      className="scroll-reveal group cursor-pointer"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2">
        {/* Project Image */}
        <div className="aspect-video bg-gradient-to-br from-accent/20 to-accent/5 relative overflow-hidden">
          <img 
            src={`https://images.unsplash.com/${project.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
          <div className="absolute top-4 right-4">
            <ExternalLink className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        {/* Project Info */}
        <div className="p-6 space-y-4">
          <div>
            <div className="text-sm text-accent font-medium mb-2">{project.category}</div>
            <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">
              {project.title}
            </h3>
          </div>

          <p className="text-body text-muted-foreground">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};