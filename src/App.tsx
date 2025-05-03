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
  Send,
  Menu, // Added for hamburger icon
  X,    // Added for close icon
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const { scrollY } = useScroll();
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateScroll = () => {
      if (headerRef.current) {
        // Adjust threshold slightly if needed
        setIsScrolled(window.scrollY > headerRef.current.offsetHeight - 60);
      } else {
         // Fallback if headerRef isn't set yet
         setIsScrolled(window.scrollY > 50);
      }
    };
    window.addEventListener('scroll', updateScroll);
    updateScroll(); // Initial check
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    // Always light theme
    <div className={`min-h-screen bg-white text-gray-900 transition-colors duration-500`}>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen // Keep background when mobile menu is open too
          ? 'bg-white/90 backdrop-blur-lg shadow-sm'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Name */}
            <motion.a // Changed to <a> for potential navigation later
              href="#top" // Link to top of page
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold text-gray-900"
              onClick={() => setIsMobileMenuOpen(false)} // Close menu if logo is clicked
            >
              SDA
            </motion.a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink href="#about">About</NavLink>
              <NavLink href="#skills">Skills</NavLink>
              <NavLink href="#projects">Projects</NavLink>
              <NavLink href="#achievements">Achievements</NavLink>
              <NavLink href="#contact">Contact</NavLink>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 inline-flex items-center justify-center rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 z-40 overflow-hidden"
            >
              <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
                 {/* Add onClick to close menu */}
                <NavLink href="#about" isMobile onClick={() => setIsMobileMenuOpen(false)}>About</NavLink>
                <NavLink href="#skills" isMobile onClick={() => setIsMobileMenuOpen(false)}>Skills</NavLink>
                <NavLink href="#projects" isMobile onClick={() => setIsMobileMenuOpen(false)}>Projects</NavLink>
                <NavLink href="#achievements" isMobile onClick={() => setIsMobileMenuOpen(false)}>Achievements</NavLink>
                <NavLink href="#contact" isMobile onClick={() => setIsMobileMenuOpen(false)}>Contact</NavLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <header ref={headerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Light theme gradient */}
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
            Turning ideas into elegant code & seamless experiences.
          </p>
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8"
        >
          <ChevronDown size={32} className="text-gray-600" />
        </motion.div>
      </header>

      {/* --- About Section --- */}
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
                      Hello! I'm P Sudarsan, a passionate developer currently pursuing a B.Tech in Artificial Intelligence & Data Science. I thrive on transforming complex ideas into practical, elegant solutions through code. My journey in tech has equipped me with a diverse skill set, spanning from mobile development with Flutter and Android (Kotlin) to backend logic with Python and PHP.
                  </p>
                  <p>
                      I have a keen interest in the cutting edge of technology, particularly in AI and Neural Networks, where I enjoy building models like handwriting recognition systems and NLP tools for hate speech detection. My curiosity also extends to cybersecurity, exploring tools like Kali Linux and techniques like password cracking to understand system vulnerabilities better.
                  </p>
                  <p>
                      Beyond software, I'm comfortable with hardware management and OS installations, giving me a holistic view of computing systems. I'm a strong believer in continuous learning, as demonstrated by my NPTEL Star recognition and certifications from Harvard's CS50 and Google AI. My goal is to leverage technology to create seamless, impactful user experiences and solve real-world problems. Let's build something amazing together!
                  </p>
              </motion.div>
          </div>
      </section>


      {/* Skills Section */}
      <section id="skills" className="py-32 bg-gray-50 text-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle icon={<Cpu />} title="Technical Skills" />

          {/* Programming & Development */}
          <h3 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mb-6 text-gray-800">Programming & Development</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">
            <SkillIcon icon={<FileCode2 size={32} />} name="Flutter & Dart" />
            <SkillIcon icon={<ArrowDownWideNarrow size={32} />} name="Android (Kotlin)" />
            <SkillIcon icon={<Layers size={32} />} name="Python" />
            <SkillIcon icon={<Palette size={32} />} name="PHP" />
            <SkillIcon icon={<Smartphone size={32} />} name="HTML, CSS, JS" />
          </div>

          {/* AI & Neural Networks */}
          <h3 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mt-10 mb-6 text-gray-800">AI & Neural Networks</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">
            <SkillIcon icon={<Brain size={32} />} name="Neural Networking (Intermediate)" />
          </div>

          {/* Cybersecurity & Ethical Hacking */}
          <h3 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mt-10 mb-6 text-gray-800">Cybersecurity & Ethical Hacking</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">
            <SkillIcon icon={<Shield size={32} />} name="Kali Linux" />
            <SkillIcon icon={<HashIcon size={32} />} name="John the Ripper" />
            <SkillIcon icon={<Terminal size={32} />} name="Termux" />
            <SkillIcon icon={<Key size={32} />} name="Password Cracking" />
            <SkillIcon icon={<Wifi size={32} />} name="WiFi Cracking" />
          </div>

          {/* Hardware & OS Management */}
          <h3 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mt-10 mb-6 text-gray-800">Hardware & OS Management</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">
            <SkillIcon icon={<HardDrive size={32} />} name="Hardware Management" />
            <SkillIcon icon={<Server size={32} />} name="OS Installations" />
          </div>

          {/* Other Technical Skills */}
          <h3 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mt-10 mb-6 text-gray-800">Other Technical Skills</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            <SkillIcon icon={<GitBranch size={32} />} name="Git & GitHub" />
            <SkillIcon icon={<Database size={32} />} name="File Automation (Python)" />
            <SkillIcon icon={<Bug size={32} />} name="Extreme Problem Diagnosis" />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle icon={<Code2 />} title="Projects" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {/* Add your PopupProjectCard components here, removing the isDark prop */}
             <PopupProjectCard
                title="Hate Speech Detection using NLP"
                description="An AI-powered system that identifies and filters harmful language in text, ensuring safer online interactions."
                image="https://source.unsplash.com/600x400/?ai,security"
                tags={['Python', 'NLP', 'ML']}
                link="" // Add link if available
                details={{
                    challenge: "Ensuring online safety by detecting hate speech in text data.",
                    solution: "Used NLP techniques and machine learning models to classify and filter harmful content.",
                    results: "Achieved high accuracy in identifying hate speech, reducing toxic content.",
                    images: [
                        "https://source.unsplash.com/600x400/?text-analysis,ai",
                        "https://source.unsplash.com/600x400/?cybersecurity,nlp"
                    ]
                }}
            />
             <PopupProjectCard
                title="Handwriting Recognition System"
                description="An AI-powered model that recognizes and digitizes handwritten text, useful for document automation."
                image="https://source.unsplash.com/600x400/?handwriting,ai"
                tags={['Python', 'Neural Networks']}
                link="" // Add link if available
                details={{
                    challenge: "Automating the recognition and digitization of handwritten documents.",
                    solution: "Developed a neural network-based model for efficient text recognition.",
                    results: "Successfully built a neural network that can accurately recognize and convert handwritten text.",
                    images: [
                    "https://source.unsplash.com/600x400/?notebook,writing",
                    "https://source.unsplash.com/600x400/?machine-learning,handwriting"
                    ]
                }}
            />
             <PopupProjectCard
                title="Brute-Force ZIP Password Cracker"
                description="A Python script to crack ZIP file passwords using brute-force techniques with GPU acceleration."
                image="https://source.unsplash.com/600x400/?hacking,security"
                tags={['Python', 'Cybersecurity']}
                link="" // Add link if available
                details={{
                    challenge: "Recovering lost ZIP passwords efficiently relying on GPUs.",
                    solution: "Implemented a custom brute-force algorithm optimized for GPU usage.",
                    results: "Successfully cracked passwords within a small timeframe.",
                    images: [
                    "https://source.unsplash.com/600x400/?zip,cracking",
                    "https://source.unsplash.com/600x400/?cybersecurity,attack"
                    ]
                }}
            />
             <PopupProjectCard
                title="DoubtTopia (Flutter Version)"
                description="A real-time doubt resolution platform with live content updates and resource management."
                image="https://source.unsplash.com/600x400/?learning,technology"
                tags={['Flutter', 'Dart', 'Firebase']}
                link="" // Add link if available
                details={{
                    challenge: "Providing a real-time, scalable platform for students and educators.",
                    solution: "Developed a dynamic content display system using Firebase and Flutter.",
                    results: "Enabled live updates and interactive doubt resolution, improving engagement.",
                    images: [
                    "https://source.unsplash.com/600x400/?education,app",
                    "https://source.unsplash.com/600x400/?students,discussion"
                    ]
                }}
            />
             <PopupProjectCard
                title="DoubtTopia (Android Studio Version)"
                description="An Android app for managing doubts, featuring document uploads and discussions."
                image="https://source.unsplash.com/600x400/?education,discussion"
                tags={['Android', 'Java/Kotlin', 'Firebase']}
                link="" // Add link if available
                details={{
                    challenge: "Creating a collaborative platform for students to resolve doubts.",
                    solution: "Built an intuitive Android app that categorizes PDFs by semester/subject.",
                    results: "Provided structured access to study materials, improving collaboration.",
                    images: [
                    "https://source.unsplash.com/600x400/?students,learning",
                    "https://source.unsplash.com/600x400/?pdf,documents"
                    ]
                }}
            />
             <PopupProjectCard
                title="Automated Image Downloader & Excel Updater"
                description="Python script for bulk image downloads and Excel path updates for data management."
                image="https://source.unsplash.com/600x400/?automation,data"
                tags={['Python', 'Automation', 'Excel']}
                link="" // Add link if available
                details={{
                    challenge: "Managing large-scale image downloads and organization in Excel.",
                    solution: "Developed an automated Python script to download images and update paths.",
                    results: "Downloaded 13,000+ images efficiently, ensuring accurate data handling.",
                    images: [
                    "https://source.unsplash.com/600x400/?code,automation",
                    "https://source.unsplash.com/600x400/?excel,data"
                    ]
                }}
            />
             <PopupProjectCard
                title="Tic-Tac-Toe AI"
                description="Reinforcement learning AI model for Tic-Tac-Toe, showing Q-table updates."
                image="https://source.unsplash.com/600x400/?ai,games"
                tags={['Python', 'RL', 'AI']}
                link="" // Add link if available
                details={{
                    challenge: "Developing an AI that learns and improves its gameplay strategy.",
                    solution: "Used Q-learning to train an AI that adapts to player moves.",
                    results: "Successfully demonstrated reinforcement learning principles.",
                    images: [
                    "https://source.unsplash.com/600x400/?tic-tac-toe,ai",
                    "https://source.unsplash.com/600x400/?q-learning,games"
                    ]
                }}
            />
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle icon={<Award />} title="Achievements & Certifications" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Add AchievementCard components here, removing the isDark prop */}
            <AchievementCard
                title="NPTEL Star"
                image="assets\NPTEL_BELIEVERS.png" // Make sure path is correct relative to public folder or import
                date="2024"
                description="Recognition for outstanding performance in NPTEL courses."
            />
            <AchievementCard
                title="Harvard’s CS50 Certificate"
                image="assets\CS50python.png" // Make sure path is correct
                date="2024"
                description="Earned certification demonstrating expertise in Python, problem-solving, and algorithms."
            />
            <AchievementCard
                title="Machine Learning at the Edge"
                image="assets\MachineLearningEdge.png" // Make sure path is correct
                date="2024"
                description="Gained experience deploying AI models on edge devices, focusing on efficiency and optimization."
            />
             <AchievementCard
                title="Java Programming Basic Skills"
                image="assets\JavaProgrammingBasicSkills.png" // Make sure path is correct
                date="2024"
                description="Learned core Java concepts and object-oriented programming."
            />
            <AchievementCard
                title="Introduction to Cloud Computing"
                image="assets\CloudComputing.png" // Make sure path is correct
                date="2024"
                description="Acquired foundational knowledge in cloud architecture, deployment models, and services."
            />
            <AchievementCard
                title="Google AI for Anyone"
                image="assets\GoogleAI.png" // Make sure path is correct
                date="2024"
                description="Completed Google's AI fundamentals course on AI concepts, ML principles, and applications."
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
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
              {/* Light theme form container */}
              <div className="p-8 rounded-2xl bg-white shadow-xl">
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="Your email"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02, filter: 'brightness(1.1)' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300"
                    type="button" // Change to type="submit" if you add form handling logic
                    onClick={(e) => {
                      e.preventDefault(); // Prevent default form submission for now
                      // Add your form submission logic here
                      alert('Form submission not implemented yet.');
                    }}
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
      <footer className="py-12 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">P Sudarsan</h3>
              <p className="text-gray-600">Turning ideas into elegant code & seamless experiences.</p>
            </div>
            <div className="flex justify-start md:justify-end space-x-6">
              {/* Update links */}
              <FooterLink href="https://github.com/your-github-username" icon={<Github size={24}/>} />
              <FooterLink href="https://linkedin.com/in/your-linkedin-profile" icon={<Linkedin size={24}/>} />
              <FooterLink href="mailto:your.email@example.com" icon={<Mail size={24}/>} />
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600">
            <p>© {new Date().getFullYear()} P Sudarsan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Updated NavLink to handle mobile styling and onClick
function NavLink({ href, children, isMobile = false, onClick }: { href: string; children: React.ReactNode; isMobile?: boolean; onClick?: () => void }) {
  const mobileClasses = "block w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 text-left";
  const desktopClasses = "text-gray-700 hover:text-gray-900 transition-colors px-1"; // Simplified desktop

  return (
    <motion.a
      href={href}
      className={isMobile ? mobileClasses : desktopClasses}
      whileHover={{ scale: isMobile ? 1 : 1.05 }} // No scale on mobile hover
      whileTap={{ scale: 0.95 }}
      onClick={onClick} // Execute onClick (e.g., close mobile menu)
    >
      {children}
    </motion.a>
  );
}

// Updated FooterLink (removed isDark)
function FooterLink({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <motion.a
      whileHover={{ scale: 1.1, color: '#3B82F6' }} // Example hover color (blue-500)
      whileTap={{ scale: 0.95 }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 hover:text-gray-900 transition-colors" // Default light theme colors
    >
      {icon}
    </motion.a>
  );
}

// Updated SectionTitle (removed isDark)
function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex items-center gap-4 mb-12 md:mb-16" // Increased bottom margin
    >
      {/* Gradient background for icon */}
      <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white shadow-md">
        {/* Ensure icon itself is white or contrasts well */}
        {React.cloneElement(icon as React.ReactElement, { size: 28, color: 'white' })}
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900">{title}</h2>
    </motion.div>
  );
}

// --- PopupProjectCard Component (Updated) ---
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
  link, // Added link prop
  tags,
  details,
}: {
  title: string;
  description: string;
  image: string;
  link?: string; // Link is optional
  tags: string[];
  details: ProjectDetails;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <> {/* Use Fragment to handle overlay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        layout // Enable layout animation
        className="group relative bg-white shadow-lg rounded-2xl overflow-hidden cursor-pointer border border-gray-100 hover:shadow-xl transition-shadow duration-300"
        onClick={() => setIsExpanded(true)} // Expand on click
      >
        <motion.div layout="position" className="relative">
          <img src={image} alt={title} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105" />
           {/* Subtle gradient overlay on image hover */}
           <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </motion.div>

        <motion.div layout="position" className="p-6">
          <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
          <p className="text-gray-600 mb-4 text-sm line-clamp-2">{description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span key={index} className="px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>
          <motion.div
             className="inline-flex items-center gap-1 text-sm text-blue-600 group-hover:text-blue-700 font-medium"
          >
            View Details <ExternalLink size={14} className="opacity-70 group-hover:opacity-100"/>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Modal Popup Logic */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/70 z-[90]" // Ensure overlay is behind modal
              onClick={() => setIsExpanded(false)}
            />

            {/* Expanded Card Modal */}
            <motion.div
              layoutId={`project-card-${title}`} // Unique ID for layout animation
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-1/2 left-1/2 w-[90vw] max-w-4xl h-[85vh] max-h-[700px] -translate-x-1/2 -translate-y-1/2 z-[100] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h3>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90, backgroundColor: '#f3f4f6' }} // bg-gray-100
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsExpanded(false)}
                  className="p-2 rounded-full text-gray-500 hover:text-gray-800 transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Modal Content (Scrollable) */}
              <div className="p-4 sm:p-6 overflow-y-auto flex-grow">
                 {/* Image Gallery */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {details.images.map((img, index) => (
                        <img key={index} src={img} alt={`${title} screenshot ${index + 1}`} className="rounded-lg shadow-sm w-full h-48 object-cover border border-gray-200" />
                    ))}
                </div>

                 {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {tags.map((tag, index) => (
                     <span key={index} className="px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                         {tag}
                     </span>
                  ))}
                </div>

                {/* Details Sections */}
                <div className="space-y-5 mb-6 text-gray-700 text-base leading-relaxed">
                  <div>
                    <h4 className="text-lg font-semibold mb-1 text-blue-700">The Challenge</h4>
                    <p>{details.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1 text-blue-700">The Solution</h4>
                    <p>{details.solution}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1 text-blue-700">The Results</h4>
                    <p>{details.results}</p>
                  </div>
                </div>
              </div>

              {/* Modal Footer (Optional Link) */}
              {link && (
                  <div className="p-4 sm:p-6 border-t border-gray-200 flex-shrink-0 text-right">
                      <motion.a
                          whileHover={{ scale: 1.03, filter: 'brightness(1.1)' }}
                          whileTap={{ scale: 0.97 }}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors text-sm font-medium shadow-sm"
                      >
                          Visit Project <ExternalLink size={16} />
                      </motion.a>
                  </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}


// Updated SkillIcon (removed isDark)
function SkillIcon({ icon, name }: { icon: React.ReactNode; name: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }} // Added shadow on hover
      className="flex flex-col items-center justify-center p-4 sm:p-6 bg-white hover:bg-white rounded-xl transition-all duration-300 border border-gray-100 text-center shadow-sm hover:shadow-md"
    >
      {/* Icon color */}
      <div className="mb-3 text-blue-600">
        {icon}
      </div>
      <span className="text-sm sm:text-base text-gray-700 font-medium">
        {name}
      </span>
    </motion.div>
  );
}

// Updated AchievementCard (removed isDark)
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
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="overflow-hidden rounded-xl bg-white shadow-lg group border border-gray-100 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-48 overflow-hidden">
         {/* Image */}
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
         {/* Date Badge */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full shadow">
              {date}
          </span>
        </div>
      </div>
      <div className="p-5 sm:p-6">
        <h3 className="text-lg font-bold mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}


export default App;