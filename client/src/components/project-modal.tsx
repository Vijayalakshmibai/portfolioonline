import { X, ExternalLink, CheckCircle, User, Cog, Settings } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Project } from '@shared/schema';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const links = project.links as Record<string, string> || {};

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-800 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-indigo-400 flex items-center justify-between">
            {project.title}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X size={24} />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Description */}
          <div>
            <p className="text-gray-300 text-lg leading-relaxed">
              {project.detailedDescription || project.description}
            </p>
          </div>

          {/* Features */}
          {project.features && (
            <div>
              <h3 className="text-xl font-bold text-indigo-400 mb-4">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {(project.features as string[]).map((feature, index) => (
                  <div key={index} className="flex items-start text-gray-300">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sub-projects */}
          {project.projects && (
            <div>
              <h3 className="text-xl font-bold text-purple-400 mb-4">Project Components</h3>
              <div className="space-y-4">
                {(project.projects as Array<{ name: string; description: string; features?: string[] }>).map((proj, index) => (
                  <Card key={index} className="bg-gray-700 border-gray-600">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-indigo-400 mb-2">{proj.name}</h4>
                      <p className="text-gray-300 mb-2">{proj.description}</p>
                      {proj.features && (
                        <div className="space-y-1">
                          {proj.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start text-sm text-gray-400">
                              <CheckCircle className="h-3 w-3 text-green-400 mr-2 mt-1 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Applications */}
          {project.applications && (
            <div>
              <h3 className="text-xl font-bold text-orange-400 mb-4">Applications</h3>
              <div className="space-y-4">
                {(project.applications as Array<{ name: string; description: string; features: string[] }>).map((app, index) => (
                  <Card key={index} className="bg-gray-700 border-gray-600">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-orange-400 mb-2">{app.name}</h4>
                      <p className="text-gray-300 mb-3">{app.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                        {app.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start text-sm text-gray-400">
                            <CheckCircle className="h-3 w-3 text-green-400 mr-2 mt-1 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* User & Admin Features */}
          {project.userFeatures && project.adminFeatures && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  User Features
                </h3>
                <div className="space-y-2">
                  {(project.userFeatures as string[]).map((feature, index) => (
                    <div key={index} className="flex items-start text-gray-300">
                      <User className="h-4 w-4 text-green-400 mr-3 mt-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Admin Features
                </h3>
                <div className="space-y-2">
                  {(project.adminFeatures as string[]).map((feature, index) => (
                    <div key={index} className="flex items-start text-gray-300">
                      <Cog className="h-4 w-4 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Methodology */}
          {project.methodology && (
            <div>
              <h3 className="text-xl font-bold text-blue-400 mb-4">Methodology</h3>
              <div className="space-y-2">
                {(project.methodology as string[]).map((method, index) => (
                  <div key={index} className="flex items-start text-gray-300">
                    <Settings className="h-4 w-4 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                    <span>{method}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies */}
          <div>
            <h3 className="text-xl font-bold text-purple-400 mb-4">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {(project.technologies as string[]).map((tech, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-purple-600/20 text-purple-400 hover:bg-purple-600/30"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.keys(links).length > 0 && (
            <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-700">
              {Object.entries(links).map(([key, url]) => (
                <Button
                  key={key}
                  asChild
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </a>
                </Button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
