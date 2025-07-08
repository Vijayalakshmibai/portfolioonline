import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';

export function Hero() {
  const { scrollToSection } = useSmoothScroll();

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-indigo-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(99,102,241,0.1),_transparent_70%)]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center animate-slide-up">
          <div className="w-48 h-48 mx-auto mb-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 p-1 animate-float animate-glow">
            <div className="w-full h-full rounded-full overflow-hidden">
              <img 
                src="/attached_assets/profilepic.jpg" 
                alt="Haresh Bharadwaj R"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/200x200/6366f1/ffffff?text=HBR";
                }}
              />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Haresh Bharadwaj R
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Information Technology Undergraduate specializing in Machine Learning, AI, Computer Vision, and Web Development
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25"
            >
              Get In Touch
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollToSection('projects')}
              className="border-gray-600 hover:border-indigo-400 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-indigo-400/10"
            >
              View My Work
            </Button>
          </div>
          
          <div className="flex justify-center space-x-6">
            <a
              href="https://linkedin.com/in/haresh-bharadwaj-r-566556229"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-indigo-400 transition-colors text-2xl"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://github.com/hareshbharadwaj"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-indigo-400 transition-colors text-2xl"
            >
              <Github size={24} />
            </a>
            <a
              href="mailto:hesh25012006@gmail.com"
              className="text-gray-400 hover:text-indigo-400 transition-colors text-2xl"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
