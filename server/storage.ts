import { users, projects, type User, type InsertUser, type Project, type InsertProject } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private currentUserId: number;
  private currentProjectId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.currentUserId = 1;
    this.currentProjectId = 1;
    this.initializeProjects();
  }

  private initializeProjects() {
    const projectsData: InsertProject[] = [
      {
        title: "Homemade Treasure",
        description: "Full-stack e-commerce web application with modular viewer/uploader roles, real-time CRUD operations, and comprehensive user management.",
        detailedDescription: "A comprehensive full-stack e-commerce web application designed to connect local artisans with customers. The platform features distinct user roles including viewers and uploaders, enabling seamless product management and customer interaction.",
        features: [
          "Modular architecture with separate viewer and uploader roles",
          "Real-time CRUD operations for product listings",
          "Advanced image handling and optimization",
          "Shopping cart functionality with persistent storage",
          "Product rating and review system",
          "Order management and tracking",
          "Responsive design for all devices",
          "Secure user authentication and authorization"
        ],
        technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT Authentication", "Cloudinary", "Stripe API"],
        links: {
          live: "https://homemade-treasure.netlify.app",
          github: "https://github.com/hareshbharadwaj/homemade-treasure"
        },
        category: "web-development",
        image: "shopping-cart"
      },
      {
        title: "Computer Vision Interactive Suite",
        description: "Interactive applications using OpenCV and MediaPipe including Virtual Drawing App, Snake Game, and Subway Surfers Clone with gesture control.",
        detailedDescription: "A collection of innovative computer vision applications leveraging OpenCV and MediaPipe for real-time hand tracking and gesture recognition. These projects demonstrate advanced computer vision techniques applied to interactive gaming and creative applications.",
        features: [
          "Real-time hand tracking with high precision",
          "Gesture-based interaction system",
          "Dynamic color selection and drawing tools",
          "Smooth input processing and noise reduction",
          "Multi-application framework",
          "Responsive game controls",
          "Cross-platform compatibility"
        ],
        projects: [
          {
            name: "Virtual Drawing App",
            description: "Enables precise gesture-based drawing with dynamic color selection and input smoothing for natural drawing experience."
          },
          {
            name: "Snake Game",
            description: "Classic snake game with responsive directional control using tracked finger positions for enhanced gameplay."
          },
          {
            name: "Subway Surfers Clone",
            description: "Action-triggered gameplay through real-time gesture recognition for seamless in-game navigation."
          }
        ],
        technologies: ["Python", "OpenCV", "MediaPipe", "NumPy", "Pygame"],
        links: {
          github: "https://github.com/hareshbharadwaj/computer-vision-projects",
          demo: "https://youtu.be/demo-video"
        },
        category: "computer-vision",
        image: "eye"
      },
      {
        title: "Orbital Collision Risk Prediction",
        description: "Auto-encoder based machine learning classifier to predict satellite-space debris collisions, handling unbalanced datasets effectively.",
        detailedDescription: "An advanced machine learning system developed for the Star Submit competition at SIMATS. The project uses auto-encoder based hybrid classification to predict potential satellite-space debris collisions, addressing the critical challenge of space debris management.",
        features: [
          "Auto-encoder based feature extraction",
          "Hybrid machine learning classification",
          "Unbalanced dataset handling techniques",
          "Real-time collision risk assessment",
          "Comprehensive data preprocessing pipeline",
          "Model performance optimization",
          "Scalable architecture for large datasets"
        ],
        methodology: [
          "Data collection from space tracking databases",
          "Feature engineering for orbital parameters",
          "Auto-encoder implementation for dimensionality reduction",
          "Hybrid classifier training and validation",
          "Performance evaluation and optimization"
        ],
        technologies: ["Python", "TensorFlow", "Keras", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
        links: {
          paper: "https://research-paper-link.com",
          github: "https://github.com/hareshbharadwaj/orbital-collision-prediction"
        },
        category: "machine-learning",
        image: "satellite"
      },
      {
        title: "Foodie - Food Delivery Platform",
        description: "Full-stack multi-user web application with user and admin modules, featuring cart management, payments, and comprehensive analytics.",
        detailedDescription: "A comprehensive food delivery web application developed during training at Corizo. The platform features separate user and admin interfaces, complete order management system, and advanced analytics dashboard.",
        features: [
          "Multi-user authentication system",
          "Separate user and admin dashboards",
          "Shopping cart with persistent storage",
          "Integrated payment gateway",
          "Real-time order tracking",
          "Restaurant management system",
          "Comprehensive analytics and reporting",
          "Cross-device compatibility via LAN access"
        ],
        userFeatures: [
          "User registration and profile management",
          "Restaurant and menu browsing",
          "Advanced search and filtering",
          "Shopping cart management",
          "Secure payment processing",
          "Order history and tracking"
        ],
        adminFeatures: [
          "Secure admin authentication",
          "Product and menu management",
          "Order management and fulfillment",
          "User management and support",
          "Analytics dashboard with insights",
          "Revenue and performance tracking"
        ],
        technologies: ["JavaScript", "Node.js", "Express.js", "MySQL", "HTML/CSS", "Bootstrap", "Chart.js"],
        links: {
          demo: "https://foodie-app-demo.com",
          github: "https://github.com/hareshbharadwaj/foodie-app"
        },
        category: "web-development",
        image: "utensils"
      },
      {
        title: "Android Application Suite",
        description: "Multiple Android applications including healthcare assistant, Tic-Tac-Toe with AI, and urban service booking app with analytics.",
        detailedDescription: "A collection of Android applications developed using various frameworks and technologies, showcasing mobile development expertise across different domains including healthcare, gaming, and service management.",
        features: [
          "Multi-domain application development",
          "Advanced user interface design",
          "Real-time data synchronization",
          "Secure authentication systems",
          "Analytics and reporting features",
          "Cross-platform compatibility"
        ],
        applications: [
          {
            name: "Healthcare Assistant App",
            description: "Comprehensive healthcare management application with core health monitoring features",
            features: [
              "Health metrics tracking",
              "Medication reminders",
              "Appointment scheduling",
              "Emergency contacts",
              "Health data visualization"
            ]
          },
          {
            name: "Intelligent Tic-Tac-Toe",
            description: "Classic game with rule-based AI implementation for challenging single-player gameplay",
            features: [
              "Rule-based AI opponent",
              "Multiple difficulty levels",
              "Game statistics tracking",
              "Smooth animations",
              "Score tracking system"
            ]
          },
          {
            name: "Urban Service Booking Platform",
            description: "Comprehensive service booking application with dual user roles and analytics",
            features: [
              "User and admin role management",
              "Real-time service booking",
              "Secure authentication system",
              "Rating and review system",
              "Streamlit-based worker analytics",
              "Service provider management"
            ]
          }
        ],
        technologies: ["Java", "Android Studio", "SQLite", "Firebase", "Streamlit", "Material Design"],
        links: {
          github: "https://github.com/hareshbharadwaj/android-apps",
          playstore: "https://play.google.com/store/apps/healthcare-assistant"
        },
        category: "mobile-development",
        image: "android"
      },
      {
        title: "Frontend Development Showcase",
        description: "Collection of responsive frontend projects including landing pages, interactive stopwatch, portfolio sites, and weather app with live API integration.",
        detailedDescription: "A comprehensive collection of frontend projects developed during internship at Prodigy Infotech, demonstrating proficiency in modern web technologies, responsive design, and API integration.",
        features: [
          "Responsive design principles",
          "Modern web technologies",
          "API integration capabilities",
          "Interactive user interfaces",
          "Performance optimization",
          "Cross-browser compatibility"
        ],
        projects: [
          {
            name: "Responsive Landing Pages",
            description: "Multiple landing pages showcasing different design approaches and industries",
            features: [
              "Mobile-first responsive design",
              "Modern CSS animations",
              "Cross-browser compatibility",
              "SEO optimization",
              "Fast loading performance"
            ]
          },
          {
            name: "Interactive Stopwatch Application",
            description: "Feature-rich stopwatch with advanced timing capabilities",
            features: [
              "Precise timing functionality",
              "Lap time recording",
              "Multiple timer modes",
              "Local storage persistence",
              "Keyboard shortcuts"
            ]
          },
          {
            name: "Personal Portfolio Sites",
            description: "Professional portfolio websites with modern design principles",
            features: [
              "Interactive project galleries",
              "Smooth scrolling navigation",
              "Contact form integration",
              "Social media integration",
              "Performance optimization"
            ]
          },
          {
            name: "Weather Application",
            description: "Real-time weather app with comprehensive meteorological data",
            features: [
              "Live weather API integration",
              "Location-based weather data",
              "Extended forecast display",
              "Weather alerts and notifications",
              "Interactive weather maps"
            ]
          }
        ],
        technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "jQuery", "Weather API", "Local Storage"],
        links: {
          portfolio: "https://haresh-frontend-showcase.netlify.app",
          github: "https://github.com/hareshbharadwaj/frontend-projects"
        },
        category: "web-development",
        image: "code"
      }
    ];

    projectsData.forEach(project => {
      this.createProject(project);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = { ...insertProject, id };
    this.projects.set(id, project);
    return project;
  }
}

export const storage = new MemStorage();
