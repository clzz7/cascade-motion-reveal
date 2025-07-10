import { Twitter, Linkedin, Github, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-6xl mx-auto page-padding py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">AI Studio</h3>
            <p className="text-body text-muted-foreground">
              Full Stack AI Solutions for modern businesses
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Services</h4>
            <div className="space-y-2">
              <a href="#" className="block text-body text-muted-foreground hover:text-accent transition-colors">
                AI Model Development
              </a>
              <a href="#" className="block text-body text-muted-foreground hover:text-accent transition-colors">
                AI Integration
              </a>
              <a href="#" className="block text-body text-muted-foreground hover:text-accent transition-colors">
                Computer Vision
              </a>
              <a href="#" className="block text-body text-muted-foreground hover:text-accent transition-colors">
                Predictive Analytics
              </a>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Company</h4>
            <div className="space-y-2">
              <a href="#" className="block text-body text-muted-foreground hover:text-accent transition-colors">
                About Us
              </a>
              <a href="#" className="block text-body text-muted-foreground hover:text-accent transition-colors">
                Our Work
              </a>
              <a href="#" className="block text-body text-muted-foreground hover:text-accent transition-colors">
                Careers
              </a>
              <a href="#" className="block text-body text-muted-foreground hover:text-accent transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Resources</h4>
            <div className="space-y-2">
              <a href="#" className="block text-body text-muted-foreground hover:text-accent transition-colors">
                Blog
              </a>
              <a href="#" className="block text-body text-muted-foreground hover:text-accent transition-colors">
                Case Studies
              </a>
              <a href="#" className="block text-body text-muted-foreground hover:text-accent transition-colors">
                Documentation
              </a>
              <a href="#" className="block text-body text-muted-foreground hover:text-accent transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-body text-muted-foreground">
            © 2024 AI Studio. All rights reserved. Built with precision and passion.
          </p>
        </div>
      </div>
    </footer>
  );
};