import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';

// Lucide Icons (ensure all used icons are here)
import {
  Code2,
  User,
  ChevronDown,
  Globe, 
  Mail,
  Github,
  Linkedin, 
  ExternalLink,
  Award,
  Cpu,
  Send,
  Menu, // Hamburger icon
  X,    // Close icon
  // Technical skill icons
  Figma, 
  FileCode2,
  Database,
  Server,
  Cloud, 
  Layers,
  Palette,
  Smartphone,
  GitBranch,
  Zap, 
  Network, 
  Terminal,
  Brain,
  Code, 
  Shield,
  Bug,
  HardDrive,
  Wifi,
  Key,
  GlobeLock,
  Hash as HashIcon,
  ArrowDownWideNarrow,
  ActivitySquare,
} from 'lucide-react';

// --- Type Definitions ---
interface ProjectDetailsData {
  challenge: string;
  solution: string;
  results: string;
  images: string[]; // Gallery images
}

interface ProjectCardData {
  title: string;
  description: string;
  image: string;
  tags: string[];
  details: ProjectDetailsData;
  link?: string; // Optional external link for the project
}

interface ModalProjectData {
  title: string;
  mainImage: string;
  challenge: string;
  solution: string;
  results: string;
  galleryImages: string[];
  tags: string[];
  liveLink?: string;
}


// Main App Component
function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll(); 
  const headerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const [selectedProject, setSelectedProject] = useState<ModalProjectData | null>(null);

  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submissionMessage, setSubmissionMessage] = useState('');

  // Effect to handle header background on scroll
  useEffect(() => {
    const updateScroll = () => {
      if (headerRef.current) {
        setIsScrolled(window.scrollY > headerRef.current.offsetHeight - 80);
      } else {
        setIsScrolled(window.scrollY > 50);
      }
    };
    window.addEventListener('scroll', updateScroll);
    updateScroll();
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  // Effect to close mobile menu on resize to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMobileNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setIsMobileMenuOpen(false);
    if (href.startsWith('#') && href.length > 1) {
      const targetId = href.substring(1);
      setTimeout(() => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const navHeight = navRef.current?.offsetHeight || 64;
          const extraOffset = 20;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navHeight - extraOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        } else {
          console.warn(`[handleMobileNavClick] Target element with id "${targetId}" not found for smooth scroll.`);
        }
      }, 50); 
    }
  };

  // Modal open/close functions
  const openModal = (projectData: ModalProjectData) => {
    setSelectedProject(projectData);
    document.body.style.overflow = 'hidden'; 
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto'; 
  };

  // Contact Form Input Change Handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Contact Form Submission Handler
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmissionStatus('submitting');
    setSubmissionMessage('');

    // !!! IMPORTANT: Your Formspree endpoint is now here !!!
    const formspreeEndpoint = 'https://formspree.io/f/xwpozakp'; 

    // This check is still good practice, though less likely to be an issue now
    if (!formspreeEndpoint.startsWith('https://formspree.io/f/')) {
        console.error("Formspree endpoint is not configured correctly. Please verify the URL in the code.");
        setSubmissionStatus('error');
        setSubmissionMessage('Form submission configuration error. Please contact the site administrator.');
        return;
    }

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json' 
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmissionStatus('success');
        setSubmissionMessage('Thank you! Your message has been sent successfully.');
        setFormData({ name: '', email: '', message: '' }); // Reset form
      } else {
        const data = await response.json();
        if (data.errors && data.errors.length > 0) {
          setSubmissionMessage(data.errors.map((error: { message: string }) => error.message).join(', '));
        } else if (data.error) { // Formspree often returns a single 'error' field for issues
           setSubmissionMessage(data.error);
        } else {
          setSubmissionMessage('Oops! Something went wrong. Please try again.');
        }
        setSubmissionStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmissionStatus('error');
      setSubmissionMessage('An error occurred while sending your message. Please try again later.');
    }
  };


  const projectsData: ProjectCardData[] = [
   {
  title: "Computer Based Test Web Application",
  description: "A pure Node.js-based web application for conducting computer-based exams with SQL-backed data handling.",
  image: "assets/cbt1.png",
  tags: ['Node.js', 'JavaScript', 'SQL', 'HTML/CSS'],
  details: {
    challenge: "Creating a computer-based testing platform using raw Node.js without frameworks like Express, while managing routing, sessions, and SQL database interactions manually.",
    solution: "Built the app using Node.js core modules with custom routing and logic in JavaScript. Integrated SQL database to manage users, questions, results, and admin functions. Used HTML, CSS, and client-side JS for the frontend.",
    results: "Delivered a lightweight CBT (Computer-Based Testing) platform with minimal dependencies, enabling secure user login, real-time evaluation, and result tracking — successfully scaled to support and evaluate over 4,500 candidates.",
    images: [
      "assets/cbtmain.png",
      "assets/cbt2.png",
      "assets/cbt3.png",
      "assets/cbt4.png",
      
    ]
  },

},


    
      
      {
        title: "DoubtTopia (Web Version)",
        description: "A centralized online library for B.Tech students to access textbooks, reference materials, and curated resources across all semesters.",
        image: "assets/Doubttopia_web_1.png",
        tags: ['HTML', 'CSS', 'JavaScript', 'Web Deployment'],
        details: {
          challenge: "Creating a user-friendly platform that organizes a wide range of B.Tech books and resources across multiple branches and semesters, all in one place.",
          solution: "Developed a fully responsive web application using HTML, CSS, and JavaScript. Integrated Firebase for hosting and structured storage of book metadata. Designed an intuitive UI with branch-wise and semester-wise filtering. Added support for PDF previews, downloads, and real-time updates to the library.",
          results: "Successfully deployed a centralized B.Tech academic resource portal. Users can easily browse, search, and access important textbooks and study guides, reducing their dependency on physical books or scattered sources.",
          images: [
            "assets/Doubttopia_web_1.png",
            "assets/Doubttopia_web_2.png",
          ]
        },
        link: "https://doubttopia.sudarsan.net.in/"
      },
      {
        title: "DoubtTopia (Android Studio Version)",
        description: "An Android app for managing doubts, featuring document uploads and discussions.",
        image: "assets/Doubtopia_android_1.png",
        tags: ['Android', 'Kotlin', 'Firebase'],
        details: {
            challenge: "Creating a native Android collaborative platform for students to resolve academic doubts and access shared study materials like PDFs.",
            solution: "Built an intuitive Android application using Kotlin and Android Jetpack components. Leveraged Firebase for backend services, including authentication, storage for PDF uploads, and Firestore for organizing doubts and discussions by semester and subject.",
            results: "Provided a structured and easily navigable platform for students to access study materials and participate in doubt-clearing sessions, improving collaborative learning.",
            images: []
        },
         link: "https://play.google.com/store/apps/details?id=com.sda.doubttopia&pcampaignid=web_share"
      },
      {
        title: "Brute-Force ZIP Password Cracker",
        description: "A Python script to crack ZIP file passwords using brute-force techniques with GPU acceleration.",
        image: "assets/John_the_Ripper.png",
        tags: ['Python', 'Cybersecurity', 'GPU'],
        details: {
            challenge: "Recovering lost passwords for encrypted ZIP files when other recovery methods fail. The main challenge is the computational time required for brute-force attacks.",
            solution: "Implemented a custom multi-threaded Python script that systematically tries password combinations. Explored using CUDA for GPU acceleration to significantly speed up the process for certain hash types (though ZIP's default encryption is CPU-bound).",
            results: "Successfully cracked passwords for ZIP files with simple to moderately complex passwords within a reasonable timeframe. Demonstrated the importance of strong, unique passwords.",
            images: [
              "assets/John.png",
              "assets/hashcat.png",
            ]
        }
      },
      {
        title: "Hate Speech Detection using NLP",
        description: "An AI-powered system that identifies and filters harmful language in text, ensuring safer online interactions.",
        image: "assets/Hate_speach_header.png",
        tags: ['Python', 'NLP', 'ML'],
        details: {
            challenge: "Ensuring online safety by detecting hate speech in text data. The rise of online platforms has also seen an increase in harmful content, making automated detection crucial.",
            solution: "Used Natural Language Processing (NLP) techniques and machine learning models (e.g., SVM, LSTM) to classify text. The model was trained on a diverse dataset of labeled text.",
            results: "Achieved high accuracy (e.g., 92%) in identifying various forms of hate speech, contributing to a significant reduction in toxic content on a simulated platform.",
            images: []
        },
      },
      {
        title: "Handwriting Recognition System",
        description: "An AI-powered model that recognizes and digitizes handwritten text, useful for document automation.",
        image: "assets/Hand_writing.png",
        tags: ['Python', 'Neural Networks', 'OpenCV'],
        details: {
            challenge: "Automating the tedious process of transcribing handwritten documents into digital text, especially for archival purposes or data entry.",
            solution: "Developed a Convolutional Neural Network (CNN) combined with a Recurrent Neural Network (RNN) for sequence recognition. Preprocessing steps included noise reduction and character segmentation.",
            results: "Successfully built a neural network that can accurately recognize and convert handwritten English text with a character error rate below 10% on test datasets.",
            images: [
                "assets/Hand_writing1.png",
                "assets/Hand_writings.png",
            ]
        }
      },
  ];


  return (
    <div className="min-h-screen bg-white text-gray-900 transition-colors duration-500">
      <nav ref={navRef} className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-white/90 backdrop-blur-lg shadow-md'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.a
              href="#top"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold text-gray-900 cursor-pointer"
              onClick={(e) => handleMobileNavClick(e, '#top')}
            >
              SDA
            </motion.a>
            <div className="hidden md:flex items-center space-x-8">
              <NavLink href="#about" onClick={(e) => handleMobileNavClick(e, '#about')}>About</NavLink>
              <NavLink href="#skills" onClick={(e) => handleMobileNavClick(e, '#skills')}>Skills</NavLink>
              <NavLink href="#projects" onClick={(e) => handleMobileNavClick(e, '#projects')}>Projects</NavLink>
              <NavLink href="#achievements" onClick={(e) => handleMobileNavClick(e, '#achievements')}>Achievements</NavLink>
              <NavLink href="#contact" onClick={(e) => handleMobileNavClick(e, '#contact')}>Contact</NavLink>
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 inline-flex items-center justify-center rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition"
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 z-40 overflow-hidden border-t border-gray-200"
            >
              <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
                <NavLink href="#about" isMobile onClick={(e) => handleMobileNavClick(e, '#about')}>About</NavLink>
                <NavLink href="#skills" isMobile onClick={(e) => handleMobileNavClick(e, '#skills')}>Skills</NavLink>
                <NavLink href="#projects" isMobile onClick={(e) => handleMobileNavClick(e, '#projects')}>Projects</NavLink>
                <NavLink href="#achievements" isMobile onClick={(e) => handleMobileNavClick(e, '#achievements')}>Achievements</NavLink>
                <NavLink href="#contact" isMobile onClick={(e) => handleMobileNavClick(e, '#contact')}>Contact</NavLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <header ref={headerRef} id="top" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100/50 to-purple-100/50"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center z-10 px-4"
        >
          <h1 className="text-7xl md:text-9xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900">
            P Sudarsan
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 mb-12 tracking-wide">
            Jack of all trades, master of none, but oftentimes better than master of one.
          </p>
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8"
        >
          <a href="#about" onClick={(e) => handleMobileNavClick(e, '#about')} aria-label="Scroll to about section">
            <ChevronDown size={32} className="text-gray-600" />
          </a>
        </motion.div>
      </header>

      <section id="about" className="py-32 bg-white text-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle icon={<User />} title="About Me" />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="prose prose-lg lg:prose-xl max-w-4xl mx-auto text-gray-700"
            >
                <p>
  I’m P. Sudarsan, a B.Tech student specializing in AI & Data Science, with a strong foundation in software development and a focus on delivering smart, scalable solutions. I develop full-stack web and mobile applications, as well as AI-powered systems that solve real-world problems.
</p>
<p>
  My technical interests include machine learning, neural networks, and natural language processing. I’ve built projects like handwriting recognition tools and hate speech detection systems using Python and TensorFlow. I also develop secure and efficient web applications using modern frameworks such as Flask, Node.js, and React.
</p>
<p>
  I actively freelance on Fiverr, delivering customized solutions to clients worldwide — from Android and web apps to automation tools and AI integrations. My certifications from Harvard’s CS50, Google AI, and NPTEL reflect my commitment to continuous learning and staying ahead in the tech space.
</p>
<p>
  I'm driven by the goal of creating clean, impactful digital experiences, whether it's through a well-designed frontend or an optimized ML model. I'm always open to opportunities where I can contribute, grow, and build technology that matters.
</p>

            </motion.div>
        </div>
      </section>

     <section id="skills" className="py-32 bg-gray-50 text-gray-900">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <SectionTitle icon={<Cpu />} title="Technical Skills" />

    {/* Web & Mobile Development */}
    <h3 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mb-6 text-gray-800">Web & Mobile Development</h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">
      <SkillIcon icon={<FileCode2 size={32} />} name="Flutter & Dart" />
      <SkillIcon icon={<ArrowDownWideNarrow size={32} />} name="Android (Kotlin, Jetpack)" />
      <SkillIcon icon={<Smartphone size={32} />} name="HTML, CSS, JavaScript" />
      <SkillIcon icon={<Palette size={32} />} name="PHP & MySQL" />
      <SkillIcon icon={<Layers size={32} />} name="React (Basics)" />
    </div>

    {/* AI & Machine Learning */}
    <h3 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mt-10 mb-6 text-gray-800">AI & Machine Learning</h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">
      <SkillIcon icon={<Brain size={32} />} name="Neural Networks (Intermediate)" />
      <SkillIcon icon={<Brain size={32} />} name="NLP – Hate Speech Detection" />
      <SkillIcon icon={<Brain size={32} />} name="Computer Vision – Handwriting Recognition" />
      <SkillIcon icon={<Layers size={32} />} name="TensorFlow & Scikit-learn" />
      <SkillIcon icon={<Database size={32} />} name="Model Deployment (TFLite)" />
    </div>

    {/* System & DevOps */}
    <h3 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mt-10 mb-6 text-gray-800">System Skills & DevOps</h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">
      <SkillIcon icon={<Server size={32} />} name="Linux & OS Installations" />
      <SkillIcon icon={<Terminal size={32} />} name="Bash & Terminal Environments" />
      <SkillIcon icon={<HardDrive size={32} />} name="Hardware Management" />
      <SkillIcon icon={<GitBranch size={32} />} name="Git & GitHub (Advanced)" />
      <SkillIcon icon={<Cpu size={32} />} name="Docker (Basics)" />
    </div>

    {/* Tools & Utilities */}
    <h3 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mt-10 mb-6 text-gray-800">Tools & Automation</h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">
      <SkillIcon icon={<Bug size={32} />} name="Debugging & Optimization" />
      <SkillIcon icon={<Database size={32} />} name="Python File & Data Automation" />
      <SkillIcon icon={<Terminal size={32} />} name="Termux & Custom Android Environments" />
    </div>
    <h3 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mt-10 mb-6 text-gray-800">
  Security & System Fundamentals
</h3>
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">
  <SkillIcon icon={<Shield size={32} />} name="Kali Linux (Familiar)" />
  <SkillIcon icon={<Terminal size={32} />} name="Linux Networking Tools" />
  <SkillIcon icon={<ActivitySquare size={32} />} name="System Vulnerability Analysis" />
  <SkillIcon icon={<Bug size={32} />} name="Basic Security Scripting" />
  <SkillIcon icon={<GlobeLock size={32} />} name="Secure Shell & Network Protocols" />
</div>
  </div>
</section>


      <section id="projects" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle icon={<Code2 />} title="Projects" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mx-auto">
            {projectsData.map((project, index) => (
              <PopupProjectCard
                key={index}
                {...project}
                onCardClick={openModal}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="achievements" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle icon={<Award />} title="Achievements & Certifications" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AchievementCard
                title="NPTEL Star"
                image="assets/NPTEL_BELIEVERS.png"
                date="2024"
                description="Recognition for outstanding performance in NPTEL courses."
            />
            <AchievementCard
                title="Harvard’s CS50 Certificate"
                image="assets/CS50python.png"
                date="2024"
                description="Earned certification demonstrating expertise in Python, problem-solving, and algorithms."
            />
            <AchievementCard
                title="Machine Learning at the Edge"
                image="assets/MachineLearningEdge.png"
                date="2024"
                description="Gained experience deploying AI models on edge devices, focusing on efficiency and optimization."
            />
            <AchievementCard
                title="Java Programming Basic Skills"
                image="assets/JavaProgrammingBasicSkills.png"
                date="2024"
                description="Learned core Java concepts and object-oriented programming."
            />
            <AchievementCard
                title="Introduction to Cloud Computing"
                image="assets/CloudComputing.png"
                date="2024"
                description="Acquired foundational knowledge in cloud architecture, deployment models, and services."
            />
            <AchievementCard
                title="Google AI for Anyone"
                image="assets/GoogleAI.png"
                date="2024"
                description="Completed Google's AI fundamentals course on AI concepts, ML principles, and applications."
            />
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 bg-gradient-to-b from-white to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold mb-8 text-center text-gray-900">
              Let's Create Something Amazing
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto text-center">
              Whether you have a project in mind or just want to chat, I'm always open to discussing new opportunities.
            </p>
            <div className="max-w-2xl mx-auto">
              <div className="p-8 rounded-2xl bg-white shadow-xl">
                <form className="space-y-6" onSubmit={handleFormSubmit}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={submissionStatus === 'submitting'}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                      placeholder="Your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={submissionStatus === 'submitting'}
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={5} 
                      required 
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                      placeholder="Your message"
                      value={formData.message}
                      onChange={handleInputChange}
                      disabled={submissionStatus === 'submitting'}
                    ></textarea>
                  </div>
                  <motion.button
                    whileHover={submissionStatus !== 'submitting' ? { scale: 1.02, filter: 'brightness(1.1)' } : {}}
                    whileTap={submissionStatus !== 'submitting' ? { scale: 0.98 } : {}}
                    className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 shadow hover:shadow-md ${submissionStatus === 'submitting' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    type="submit"
                    disabled={submissionStatus === 'submitting'}
                  >
                    {submissionStatus === 'submitting' ? 'Sending...' : <>Send Message <Send size={18} /></>}
                  </motion.button>
                  {submissionMessage && (
                    <p className={`mt-4 text-center text-sm ${submissionStatus === 'success' ? 'text-green-600' : submissionStatus === 'error' ? 'text-red-600' : 'text-gray-700'}`}>
                      {submissionMessage}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-12 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">P Sudarsan</h3>
              <p className="text-gray-600">Jack of all trades, master of none, but oftentimes better than master of one.</p>
            </div>
            <div className="flex justify-start md:justify-end space-x-6">
              <FooterLink href="https://github.com/sudarsansda" ariaLabel="GitHub Profile" icon={<Github size={24}/>} />
              <FooterLink href="mailto:sudarsanjcr@gmail.com" ariaLabel="Send Email" icon={<Mail size={24}/>} />
              <FooterLink href="https://linkedin.com/in/psudarsan" ariaLabel="LinkedIn Profile" icon={<Linkedin size={24}/>} />
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600">
            <p>© {new Date().getFullYear()} P Sudarsan. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <ProjectDetailModal project={selectedProject} onClose={closeModal} />

    </div>
  );
}

// --- Sub Components ---

function NavLink({ href, children, isMobile = false, onClick }: {
  href: string;
  children: React.ReactNode;
  isMobile?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void; 
}) {
  const mobileClasses = "block w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 text-left";
  const desktopClasses = "text-gray-700 hover:text-blue-600 transition-colors px-1 font-medium relative group";

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(event); 
    } else if (href.startsWith('#')) { 
      event.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const navHeight = (document.querySelector('nav')?.offsetHeight || 64) + 20; 
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  };

  return (
    <motion.a
      href={href}
      className={isMobile ? mobileClasses : desktopClasses}
      whileHover={isMobile ? {} : { y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
    >
      {children}
      {!isMobile && (
        <span className="absolute bottom-0 left-0 h-0.5 bg-blue-600 w-0 group-hover:w-full transition-all duration-300"></span>
      )}
    </motion.a>
  );
}

function FooterLink({ icon, href, ariaLabel }: { icon: React.ReactNode; href: string; ariaLabel: string }) {
  return (
    <motion.a
      whileHover={{ scale: 1.15, color: '#2563EB' }}
      whileTap={{ scale: 0.9 }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-500 hover:text-gray-900 transition-colors"
      aria-label={ariaLabel}
    >
      {icon}
    </motion.a>
  );
}

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex items-center gap-4 mb-12 md:mb-16"
    >
      <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white shadow-lg flex-shrink-0">
        {React.cloneElement(icon as React.ReactElement, { size: 28, color: 'white', strokeWidth: 2 })}
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900">{title}</h2>
    </motion.div>
  );
}

interface PopupProjectCardProps extends ProjectCardData {
  onCardClick: (modalData: ModalProjectData) => void;
}

function PopupProjectCard({
  title,
  description,
  image,
  tags,
  details,
  link,
  onCardClick,
}: PopupProjectCardProps) {
  const handleCardClick = () => {
    onCardClick({
      title,
      mainImage: image,
      challenge: details.challenge,
      solution: details.solution,
      results: details.results,
      galleryImages: details.images,
      tags,
      liveLink: link,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      layout
      onClick={handleCardClick}
      className="group relative bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col cursor-pointer"
    >
      <motion.div layout="position" className="relative aspect-video overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </motion.div>
      <motion.div layout="position" className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
          <p className="text-gray-600 mb-4 text-sm line-clamp-3">{description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span key={index} className="px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface ProjectDetailModalProps {
  project: ModalProjectData | null;
  onClose: () => void;
}

function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [project, onClose]);

  if (!project) {
    return null;
  }

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto"
          onClick={onClose} 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[95vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()} 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200, duration: 0.3 }}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-400 hover:text-gray-700 transition-colors z-20 bg-white/50 hover:bg-gray-100 rounded-full p-1.5"
              aria-label="Close project details"
            >
              <X size={24} />
            </button>

            <div className="w-full h-56 md:h-72 overflow-hidden rounded-t-xl">
                <img src={project.mainImage} alt={project.title} className="w-full h-full object-cover" />
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">{project.title}</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="prose prose-sm sm:prose-base max-w-none text-gray-700">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-1 !mt-0">The Challenge:</h4>
                  <p>{project.challenge}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-1">Our Solution:</h4>
                  <p>{project.solution}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-1">Key Results:</h4>
                  <p>{project.results}</p>
                </div>
              </div>

              {project.galleryImages && project.galleryImages.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Gallery:</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                    {project.galleryImages.map((imgSrc, index) => (
                      <motion.div 
                        key={index} 
                        className="aspect-video rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                        whileHover={{ scale: 1.03 }}
                      >
                        <img
                          src={imgSrc}
                          alt={`${project.title} gallery image ${index + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {project.liveLink && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <motion.a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-base font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
                  >
                    View Project <ExternalLink size={18} />
                  </motion.a>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


function SkillIcon({ icon, name }: { icon: React.ReactNode; name: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -5, boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.1), 0 4px 6px -4px rgba(59, 130, 246, 0.1)' }}
      className="flex flex-col items-center justify-center p-4 sm:p-5 bg-white hover:bg-white rounded-xl transition-all duration-300 border border-gray-100 text-center shadow-sm hover:shadow-lg cursor-default"
    >
      <div className="mb-3 text-blue-600">
        {React.cloneElement(icon as React.ReactElement, { strokeWidth: 1.5 })}
      </div>
      <span className="text-sm sm:text-base text-gray-700 font-medium leading-tight">
        {name}
      </span>
    </motion.div>
  );
}

function AchievementCard({ title, image, date, description }: {
  title: string;
  image: string;
  date: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="overflow-hidden rounded-xl bg-white shadow-lg group border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute bottom-3 left-3 z-10">
          <span className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full shadow">
            {date}
          </span>
        </div>
      </div>
      <div className="p-5 sm:p-6 flex-grow">
        <h3 className="text-lg font-bold mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

export default App;