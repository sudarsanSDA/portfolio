import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';

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
  Moon,
  Sun,
  Send,
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
  LucideWifiOff,
  WifiOff,
  Key,
  HashIcon,
  Tablets,
  Phone,
  ArrowDownWideNarrow
} from 'lucide-react';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isChangingTheme, setIsChangingTheme] = useState(false);
  const [themeTogglePosition, setThemeTogglePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateScroll = () => {
      if (headerRef.current) {
        setIsScrolled(window.scrollY > headerRef.current.offsetHeight - 100);
      }
    };
    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  const toggleTheme = (e: React.MouseEvent) => {
    // Get the position of the click for the wave animation
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setThemeTogglePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });

    setIsChangingTheme(true);
    setTimeout(() => {
      setTheme(theme === 'light' ? 'dark' : 'light');
      setTimeout(() => {
        setIsChangingTheme(false);
      }, 1000);
    }, 300);
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      {/* Theme Toggle Wave Animation */}
      <AnimatePresence>
        {isChangingTheme && (
          <motion.div
            
          />
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled
        ? isDark
          ? 'bg-black/50 backdrop-blur-xl'
          : 'bg-white/50 backdrop-blur-xl shadow-sm'
        : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              SDA
            </motion.span>
            <div className="flex items-center space-x-8">
              <NavLink href="#about" isDark={isDark}>About</NavLink>
              <NavLink href="#skills" isDark={isDark}>Skills</NavLink>
              <NavLink href="#projects" isDark={isDark}>Projects</NavLink>
              <NavLink href="#achievements" isDark={isDark}>Achievements</NavLink>
              <NavLink href="#contact" isDark={isDark}>Contact</NavLink>
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header ref={headerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-b from-blue-900/20 to-purple-900/20' : 'bg-gradient-to-b from-blue-100/50 to-purple-100/50'}`}></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center z-10 px-4"
        >
          <h1 className={`text-7xl md:text-9xl font-bold mb-6 ${
            isDark
              ? 'bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white'
              : 'bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900'
          }`}>
            P Sudarsan
          </h1>
          <p className={`text-2xl md:text-3xl ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-12 tracking-wide`}>
          Turning ideas into elegant code & seamless experiences.
          </p>
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8"
        >
          <ChevronDown size={32} className={isDark ? "text-gray-400" : "text-gray-600"} />
        </motion.div>
      </header>

      {/* About Section */}
      <section id="skills" className={`py-32 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <SectionTitle icon={<Cpu />} title="Technical Skills" isDark={isDark} />

    {/* Programming & Development */}
    <h3 className="text-xl font-semibold border-b-2 border-gray-500 pb-2 mb-4">Programming & Development</h3>
    <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
      <SkillIcon icon={<FileCode2 size={32} />} name="Flutter & Dart" isDark={isDark} />
      <SkillIcon icon={<ArrowDownWideNarrow size={32} />} name="Android (Kotlin)" isDark={isDark} />
      <SkillIcon icon={<Layers size={32} />} name="Python" isDark={isDark} />
      <SkillIcon icon={<Palette size={32} />} name="PHP" isDark={isDark} />
      <SkillIcon icon={<Smartphone size={32} />} name="HTML, CSS, JS" isDark={isDark} />
    </div>

    {/* AI & Neural Networks */}
    <h3 className="text-xl font-semibold border-b-2 border-gray-500 pb-2 mt-10 mb-4">AI & Neural Networks</h3>
    <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
      <SkillIcon icon={<Brain size={32} />} name="Neural Networking (Intermediate)" isDark={isDark} />
    </div>

    {/* Cybersecurity & Ethical Hacking */}
    <h3 className="text-xl font-semibold border-b-2 border-gray-500 pb-2 mt-10 mb-4">Cybersecurity & Ethical Hacking</h3>
    <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
      <SkillIcon icon={<Shield size={32} />} name="Kali Linux" isDark={isDark} />
      <SkillIcon icon={<HashIcon size={32} />} name="John the Ripper" isDark={isDark} />
      <SkillIcon icon={<Terminal size={32} />} name="Termux" isDark={isDark} />
      <SkillIcon icon={<Key size={32} />} name="Password Cracking" isDark={isDark} />
      <SkillIcon icon={<Wifi size={32} />} name="WiFi Cracking" isDark={isDark} />
    </div>

    {/* Hardware & OS Management */}
    <h3 className="text-xl font-semibold border-b-2 border-gray-500 pb-2 mt-10 mb-4">Hardware & OS Management</h3>
    <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
      <SkillIcon icon={<HardDrive size={32} />} name="Hardware Management" isDark={isDark} />
      <SkillIcon icon={<Server size={32} />} name="OS Installations" isDark={isDark} />
    </div>

    {/* Other Technical Skills */}
    <h3 className="text-xl font-semibold border-b-2 border-gray-500 pb-2 mt-10 mb-4">Other Technical Skills</h3>
    <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
      <SkillIcon icon={<GitBranch size={32} />} name="Git & GitHub" isDark={isDark} />
      <SkillIcon icon={<Database size={32} />} name="File Automation (Python)" isDark={isDark} />
      <SkillIcon icon={<Bug size={32} />} name="Extreme Problem Diagnosis" isDark={isDark} />
    </div>
  </div>
</section>


<section id="projects" className={`py-32 ${isDark ? '' : 'bg-gray-50'}`}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <SectionTitle icon={<Code2 />} title="Projects & Achievements" isDark={isDark} />
    <div className="grid md:grid-cols-2 gap-8">

      {/* Hate Speech Detection using NLP */}
      <PopupProjectCard
        title="Hate Speech Detection using NLP"
        description="An AI-powered system that identifies and filters harmful language in text, ensuring safer and more respectful online interactions."
        image="https://source.unsplash.com/600x400/?ai,security"
        tags={['Python', 'NLP', 'Machine Learning']}
        details={{
          challenge: "Ensuring online safety by detecting hate speech in text data.",
          solution: "Used NLP techniques and machine learning models to classify and filter harmful content.",
          results: "Achieved high accuracy in identifying hate speech, reducing toxic content in discussions.",
          images: [
            "https://source.unsplash.com/600x400/?text-analysis,ai",
            "https://source.unsplash.com/600x400/?cybersecurity,nlp"
          ]
        }}
        isDark={isDark}
      />

      {/* Handwriting Recognition System */}
      <PopupProjectCard
  title="Handwriting Recognition System"
  description="An AI-powered model that recognizes and digitizes handwritten text, useful for document automation."
  image="https://source.unsplash.com/600x400/?handwriting,ai"
  tags={['Python', 'Neural Networks']}
  details={{
    challenge: "Automating the recognition and digitization of handwritten documents.",
    solution: "Developed a neural network-based model for efficient text recognition.",
    results: "Successfully built a neural network that can accurately recognize and convert handwritten text into digital format.",
    images: [
      "https://source.unsplash.com/600x400/?notebook,writing",
      "https://source.unsplash.com/600x400/?machine-learning,handwriting"
    ]
  }}
  isDark={isDark}
/>


      {/* Brute-Force ZIP Password Cracker */}
      <PopupProjectCard
        title="Brute-Force ZIP Password Cracker"
        description="A Python script to crack ZIP file passwords using efficient brute-force techniques with GPU acceleration."
        image="https://source.unsplash.com/600x400/?hacking,security"
        tags={['Python', 'Cybersecurity', 'Brute-force']}
        details={{
          challenge: "Recovering lost ZIP passwords efficiently relying on GPUs.",
          solution: "Implemented a custom brute-force algorithm optimized for GPU usage.",
          results: "Successfully cracked passwords within a small timeframe.",
          images: [
            "https://source.unsplash.com/600x400/?zip,cracking",
            "https://source.unsplash.com/600x400/?cybersecurity,attack"
          ]
        }}
        isDark={isDark}
      />

      {/* DoubtTopia (Flutter Version) */}
      <PopupProjectCard
        title="DoubtTopia (Flutter Version)"
        description="A real-time doubt resolution platform with live content updates and resource management."
        image="https://source.unsplash.com/600x400/?learning,technology"
        tags={['Flutter', 'Dart', 'Firebase']}
        details={{
          challenge: "Providing a real-time, scalable platform for students and educators.",
          solution: "Developed a dynamic content display system using Firebase and Flutter.",
          results: "Enabled live updates and interactive doubt resolution, improving engagement.",
          images: [
            "https://source.unsplash.com/600x400/?education,app",
            "https://source.unsplash.com/600x400/?students,discussion"
          ]
        }}
        isDark={isDark}
      />

      {/* DoubtTopia (Android Studio Version) */}
      <PopupProjectCard
  title="DoubtTopia (Android Studio Version)"
  description="An Android app built in Java/Kotlin for managing and resolving doubts, featuring document uploads and discussions."
  image="https://source.unsplash.com/600x400/?education,discussion"
  tags={['Android', 'Java', 'Kotlin', 'Firebase']}
  details={{
    challenge: "Creating a collaborative platform for students resolve doubts.",
    solution: "Built an intuitive Android app that categorizes PDFs of engineering subjects by semester and subject for easy access.",
    results: "Provided students with a structured way to access study materials, improving knowledge sharing and collaboration.",
    images: [
      "https://source.unsplash.com/600x400/?students,learning",
      "https://source.unsplash.com/600x400/?pdf,documents"
    ]
  }}
  isDark={isDark}
/>


      {/* Automated Image Downloader & Excel Updater */}
      <PopupProjectCard
  title="Automated Image Downloader & Excel Updater"
  description="A Python script that automates bulk image downloads and updates Excel files with their paths for efficient data management."
  image="https://source.unsplash.com/600x400/?automation,data"
  tags={['Python', 'Automation', 'Excel', 'Data Processing']}
  details={{
    challenge: "Managing large-scale image downloads and organization in Excel.",
    solution: "Developed an automated Python script to download images in bulk and update their paths in an Excel sheet.",
    results: "Successfully downloaded 13,000+ high-quality product images within a few hours, saving time and ensuring accurate data handling for large datasets.",
    images: [
      "https://source.unsplash.com/600x400/?code,automation",
      "https://source.unsplash.com/600x400/?excel,data"
    ]
  }}
  isDark={isDark}
/>


      {/* Tic-Tac-Toe AI */}
      <PopupProjectCard
        title="Tic-Tac-Toe AI"
        description="A reinforcement learning-based AI model that plays Tic-Tac-Toe, displaying Q-table updates to show learning progress."
        image="https://source.unsplash.com/600x400/?ai,games"
        tags={['Python', 'Reinforcement Learning', 'AI']}
        details={{
          challenge: "Developing an AI that learns and improves its gameplay strategy.",
          solution: "Used Q-learning to train an AI that adapts to player moves.",
          results: "Successfully demonstrated reinforcement learning principles in a classic game.",
          images: [
            "https://source.unsplash.com/600x400/?tic-tac-toe,ai",
            "https://source.unsplash.com/600x400/?q-learning,games"
          ]
        }}
        isDark={isDark}
      />

    </div>
  </div>
</section>


      {/* Achievements Section */}
      <section id="achievements" className={`py-32 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <SectionTitle icon={<Award />} title="Achievements & Certifications" isDark={isDark} />
    <div className="grid md:grid-cols-3 gap-8">
      <AchievementCard
        title="NPTEL Star"  
        image="/assets/NPTEL_BELIEVERS.png"  
        date="2024"  
        description="Recognition for outstanding performance in NPTEL courses."  
        isDark={isDark}
      />
      <AchievementCard
        title="Harvard’s CS50 Certificate"  
        image="/assets/CS50python.png"  
        date="2024"  
        description="Earned a prestigious certification from Harvard’s CS50 course, demonstrating expertise in Python programming, problem-solving, and algorithmic thinking."  
        isDark={isDark}
      />
      <AchievementCard
        title="Machine Learning at the Edge"
        image="/assets/MachineLearningEdge.png"
        date="2024"
        description="Gained hands-on experience in deploying AI models on edge devices, focusing on efficiency, optimization, and real-world ML applications."
        isDark={isDark}
      />
      <AchievementCard
        title="Java Programming Basic Skills"
        image="assets\MachineLearningEdge.png"
        date="2024"
        description="Learned core Java concepts and object-oriented programming."
        isDark={isDark}
      />
      <AchievementCard
        title="Introduction to Cloud Computing"
        image="/assets/CloudComputing.png"
        date="2024"
        description="Acquired foundational knowledge in cloud computing, including cloud architecture, deployment models, and major cloud service providers."
        isDark={isDark}
      />
      <AchievementCard
        title="Google AI for Anyone"
        image="/assets/GoogleAI.png"
        date="2024"
        description="Completed Google's AI fundamentals course, gaining insights into artificial intelligence concepts, machine learning principles, and real-world AI applications."
        isDark={isDark}
      />

    </div>
  </div>
</section>


      {/* Contact Section */}
      <section id="contact" className={`py-32 ${isDark
        ? 'bg-gradient-to-b from-gray-900 to-black'
        : 'bg-gradient-to-b from-white to-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className={`text-5xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Let's Create Something Amazing
            </h2>
            <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-12 max-w-2xl mx-auto text-center`}>
              Whether you have a project in mind or just want to chat, I'm always open to discussing new opportunities.
            </p>

            <div className="max-w-2xl mx-auto">
              <div className={`p-8 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-white shadow-xl'}`}>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className={`w-full px-4 py-3 rounded-lg ${
                        isDark
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                      } focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className={`w-full px-4 py-3 rounded-lg ${
                        isDark
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                      } focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                      placeholder="Your email"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className={`w-full px-4 py-3 rounded-lg ${
                        isDark
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                      } focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center justify-center gap-2 ${
                      isDark
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                        : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                    } text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all`}
                    type="button"
                  >
                    Send Message <Send size={18} />
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 ${isDark ? 'border-t border-gray-800' : 'border-t border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>P Sudarsan</h3>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Turning ideas into elegant code & seamless experiences.</p>
            </div>
            <div className="flex justify-end space-x-6">
              <FooterLink href="https://github.com" icon={<Github />} isDark={isDark} />
              <FooterLink href="https://linkedin.com" icon={<Linkedin />} isDark={isDark} />
              <FooterLink href="mailto:contact@example.com" icon={<Mail />} isDark={isDark} />
            </div>
          </div>
          <div className={`mt-12 pt-8 ${isDark ? 'border-t border-gray-800' : 'border-t border-gray-200'} text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <p>© {new Date().getFullYear()} P Sudarsan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ href, children, isDark }: { href: string; children: React.ReactNode; isDark: boolean }) {
  return (
    <motion.a
      href={href}
      className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
}

function FooterLink({ icon, href, isDark }: { icon: React.ReactNode; href: string; isDark: boolean }) {
  return (
    <motion.a
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={isDark ? 'text-gray-400 hover:text-white transition-colors' : 'text-gray-600 hover:text-gray-900 transition-colors'}
    >
      {icon}
    </motion.a>
  );
}

function SectionTitle({ icon, title, isDark }: { icon: React.ReactNode; title: string; isDark: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex items-center gap-4 mb-16"
    >
      <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">{icon}</div>
      <h2 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
    </motion.div>
  );
}

interface ProjectDetails {
  challenge: string;
  solution: string;
  results: string;
  images: string[];
}

function PopupProjectCard({
  title,
  description,
  image,
  link,
  tags,
  details,
  isDark
}: {
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
  details: ProjectDetails;
  isDark: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`group relative ${isDark ? 'bg-gray-800' : 'bg-white shadow-lg'} rounded-2xl overflow-hidden cursor-pointer`}  // Added cursor-pointer
      onClick={() => setIsExpanded(!isExpanded)} // Expand on click
    >
      <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>

      <AnimatePresence>
        {!isExpanded ? (
          <motion.div
            key="collapsed"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <img src={image} alt={title} className="w-full h-64 object-cover" />
            <div className="p-8">
              <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6`}>{description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {tags.map((tag, index) => (
                  <span key={index} className={`px-3 py-1 ${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-full text-sm`}>
                    {tag}
                  </span>
                ))}
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`inline-flex items-center gap-2 ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} transition-colors`}
              >
                View Details
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              position: "fixed",
              top: "50%",
              left: "50%",
              width: "75vw",
              height: "85vh",
              x: "-50%",
              y: "-50%",
              zIndex: 100
            }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className={`p-8 overflow-y-auto rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-2xl`}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the expanded card
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent event bubbling to the parent div
                  setIsExpanded(false);
                }}
                className={`p-2 rounded-full ${
                  isDark
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-gray-100 hover:bg-gray-200'
                } transition-colors`}
              >
                ✕
              </motion.button>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag, index) => (
                <span key={index} className={`px-3 py-1 ${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-full text-sm`}>
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {details.images.map((img, index) => (
                <img key={index} src={img} alt={`${title} screenshot ${index + 1}`} className="rounded-lg shadow-md w-full h-64 object-cover" />
              ))}
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <h4 className={`text-xl font-semibold mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>The Challenge</h4>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-lg`}>{details.challenge}</p>
              </div>
              <div>
                <h4 className={`text-xl font-semibold mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>The Solution</h4>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-lg`}>{details.solution}</p>
              </div>
              <div>
                <h4 className={`text-xl font-semibold mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>The Results</h4>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-lg`}>{details.results}</p>
              </div>
            </div>
            {link && (
  <motion.a
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg ${
      isDark 
        ? 'bg-blue-600 hover:bg-blue-700' 
        : 'bg-blue-500 hover:bg-blue-600'
    } text-white transition-colors`}
  >
    Visit Project <ExternalLink size={16} />
  </motion.a>
)}

          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Overlay when expanded */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 z-50"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SkillIcon({ icon, name, isDark }: { icon: React.ReactNode; name: string; isDark: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.05 }}
      className={`flex flex-col items-center justify-center p-6 ${
        isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'
      } rounded-xl transition-colors`}
    >
      <div className={`mb-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
        {icon}
      </div>
      <span className={`text-center ${isDark ? 'text-gray-300' : 'text-gray-700'} font-medium`}>
        {name}
      </span>
    </motion.div>
  );
}

function Stat({ number, label, isDark }: { number: string; label: string; isDark: boolean }) {
  return (
    <div className={`text-center p-4 ${
      isDark 
        ? 'bg-gray-900/50' 
        : 'bg-gray-100'
    } rounded-xl backdrop-blur-lg`}>
      <div className={`text-3xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{number}</div>
      <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>{label}</div>
    </div>
  );
}

function AchievementCard({ title, image, date, description, isDark }: { 
  title: string; 
  image: string; 
  date: string; 
  description: string;
  isDark: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`overflow-hidden rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white shadow-lg'} group`}
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute bottom-4 left-4 z-20">
          <span className={`px-3 py-1 bg-blue-500 text-white text-sm rounded-full`}>{date}</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
        <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{description}</p>
      </div>
    </motion.div>
  );
}

export default App;