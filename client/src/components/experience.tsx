import { Briefcase, Code, Award, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';

export function Experience() {
  const [selectedCert, setSelectedCert] = useState<any>(null);
  
  const experiences = [
    {
      title: "Web Development Trainee",
      company: "Corizo, Chennai",
      period: "September 2024 - November 2024",
      description: "Developed \"Foodie\", a full-stack multi-user web application with comprehensive user and admin modules, featuring cart management, payments, and analytics.",
      icon: Briefcase,
      color: "text-indigo-400"
    },
    {
      title: "Web Developer Intern",
      company: "Prodigy Infotech (Online)",
      period: "June 2024 - July 2024",
      description: "Designed and developed multiple frontend projects including responsive landing pages, interactive applications, and weather app with live API integration.",
      icon: Code,
      color: "text-purple-400"
    }
  ];

  const certifications = [
    {
      title: "Oracle SQL Specialist",
      description: "Oracle Database SQL Certified Specialist",
      color: "text-orange-400",
      imageUrl: "/attached_assets/oraclespl_1751968622048.png"
    },
    {
      title: "FreeCodeCamp JavaScript Developer",
      description: "JavaScript Algorithms & Data Structures (Beta)",
      color: "text-yellow-400",
      imageUrl: "/attached_assets/freejava_1751968636483.png"
    },
    {
      title: "IBM SQL & Relational DB",
      description: "SQL and Relational Databases 101",
      color: "text-blue-400",
      imageUrl: "/attached_assets/ibmsql_1751968626175.png"
    },
    {
      title: "CISCO Networking & Cybersecurity",
      description: "CCNA: Enterprise Networking, Security, and Automation",
      color: "text-cyan-400",
      imageUrl: "/attached_assets/networking_1751968636486.png"
    },
    {
      title: "DevTown Campus Ambassador",
      description: "Leadership & Community",
      color: "text-purple-400",
      imageUrl: "/attached_assets/campuss_1751968636489.png"
    },
    {
      title: "SWAYAM Python Programming",
      description: "Programming in Python - 4 Credit Course",
      color: "text-green-400",
      imageUrl: "/attached_assets/python_1751968636488.png"
    }
  ];

  return (
    <section id="experience" className="py-20 bg-gray-800/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 gradient-text">
            Experience & Achievements
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-indigo-500 to-purple-500"></div>
            
            {experiences.map((exp, index) => (
              <div key={index} className="mb-12 flex flex-col md:flex-row items-start md:items-center">
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:order-2 md:pl-8'} mb-4 md:mb-0`}>
                  <Card className="bg-gray-800 border-gray-700 ml-8 md:ml-0">
                    <CardContent className="p-6">
                      <h3 className={`text-xl font-bold mb-2 ${exp.color}`}>
                        {exp.title}
                      </h3>
                      <p className="text-gray-300 mb-2">{exp.company}</p>
                      <p className="text-sm text-gray-400 mb-4">{exp.period}</p>
                      <p className="text-gray-300">{exp.description}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                  <exp.icon className="h-4 w-4 text-white" />
                </div>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-8 text-center text-indigo-400">
              Certifications & Achievements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <Card 
                  key={index} 
                  className="bg-gray-800 border-gray-700 cursor-pointer hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 project-card"
                  onClick={() => setSelectedCert(cert)}
                >
                  <CardContent className="p-4 flex items-center">
                    <Award className={`h-6 w-6 mr-4 ${cert.color}`} />
                    <div className="flex-1">
                      <h4 className="font-semibold">{cert.title}</h4>
                      <p className="text-gray-400 text-sm">{cert.description}</p>
                    </div>
                    <div className="text-gray-400 text-sm">
                      Click to view
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Certification Modal */}
      {selectedCert && (
        <Dialog open={true} onOpenChange={() => setSelectedCert(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-gray-800 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-indigo-400 mb-4">
                {selectedCert.title}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <p className="text-gray-300 text-lg">{selectedCert.description}</p>
              
              {/* Certificate Image */}
              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <img 
                  src={selectedCert.imageUrl} 
                  alt={selectedCert.title}
                  className="max-w-full max-h-[600px] mx-auto rounded-lg shadow-lg"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'block';
                  }}
                />
                <div className="text-gray-400 hidden">
                  <Award className={`h-24 w-24 mx-auto mb-4 ${selectedCert.color}`} />
                  <p className="text-lg">Certificate Image Not Available</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
