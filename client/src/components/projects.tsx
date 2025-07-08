import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ShoppingCart, Eye, Satellite, Utensils, Smartphone, Code } from 'lucide-react';
import { ProjectModal } from './project-modal';
import type { Project } from '@shared/schema';

const iconMap = {
  'shopping-cart': ShoppingCart,
  'eye': Eye,
  'satellite': Satellite,
  'utensils': Utensils,
  'android': Smartphone,
  'code': Code,
};

const colorMap = {
  'web-development': 'from-indigo-500 to-purple-500',
  'computer-vision': 'from-purple-500 to-pink-500',
  'machine-learning': 'from-blue-500 to-cyan-500',
  'mobile-development': 'from-orange-500 to-red-500',
};

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  if (isLoading) {
    return (
      <section id="projects" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 gradient-text">
              Featured Projects
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="bg-gray-800/50 animate-pulse">
                <CardContent className="p-6">
                  <div className="h-48 bg-gray-700 rounded-lg mb-6"></div>
                  <div className="h-6 bg-gray-700 rounded mb-3"></div>
                  <div className="h-20 bg-gray-700 rounded mb-4"></div>
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 w-16 bg-gray-700 rounded-full"></div>
                    <div className="h-6 w-16 bg-gray-700 rounded-full"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="projects" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 gradient-text">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Explore my portfolio of innovative projects spanning web development, machine learning, and computer vision
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.map((project) => {
              const IconComponent = iconMap[project.image as keyof typeof iconMap] || Code;
              const gradientColor = colorMap[project.category as keyof typeof colorMap] || 'from-indigo-500 to-purple-500';
              
              return (
                <Card
                  key={project.id}
                  className="bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 cursor-pointer border-gray-700 group"
                  onClick={() => setSelectedProject(project)}
                >
                  <CardContent className="p-6">
                    <div className={`h-48 bg-gradient-to-br ${gradientColor} rounded-lg mb-6 flex items-center justify-center`}>
                      <IconComponent className="h-16 w-16 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 text-indigo-400 group-hover:text-indigo-300 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(project.technologies as string[]).slice(0, 3).map((tech, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {(project.technologies as string[]).length > 3 && (
                        <Badge variant="secondary" className="bg-gray-600/20 text-gray-400">
                          +{(project.technologies as string[]).length - 3} more
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Click to view details</span>
                      <ArrowRight className="h-4 w-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
