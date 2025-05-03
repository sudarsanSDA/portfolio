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
  Menu, // Import Menu icon for mobile nav
  X,    // Import X icon for closing mobile nav
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
        setIsScrolled(window.scrollY > headerRef.current.offsetHeight - 100);
      }
    };
    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };


  return (
    <div className={`min-h-screen bg-white text-gray-900`}>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled
        ? 'bg-white/80 backdrop-blur-xl shadow-sm'
        : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand Name */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-xl font-bold text-gray-900`}
            >
              SDA
            </motion.span>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink href="#about" onClick={closeMobileMenu}>About</NavLink>
              <NavLink href="#skills" onClick={closeMobileMenu}>Skills</NavLink>
              <NavLink href="#projects" onClick={closeMobileMenu}>Projects</NavLink>
              <NavLink href="#achievements" onClick={closeMobileMenu}>Achievements</NavLink>
              <NavLink href="#contact" onClick={closeMobileMenu}>Contact</NavLink>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-white shadow-lg absolute w-full"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <NavLink href="#about" isMobile onClick={closeMobileMenu}>About</NavLink>
                <NavLink href="#skills" isMobile onClick={closeMobileMenu}>Skills</NavLink>
                <NavLink href="#projects" isMobile onClick={closeMobileMenu}>Projects</NavLink>
                <NavLink href="#achievements" isMobile onClick={closeMobileMenu}>Achievements</NavLink>
                <NavLink href="#contact" isMobile onClick={closeMobileMenu}>Contact</NavLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <header ref={headerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-b from-blue-100/50 to-purple-100/50`}></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center z-10 px-4"
        >
          <h1 className={`text-7xl md:text-9xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900`}>
            P Sudarsan
          </h1>
          <p className={`text-2xl md:text-3xl text-gray-600 mb-12 tracking-wide`}>
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

      {/* About Section Placeholder (Add content here if needed) */}
       <section id="about" className={`py-32 bg-white text-gray-900`}>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <SectionTitle icon={<User />} title="About Me" />
           <motion.p
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
           >
             Highly motivated and detail-oriented B.Tech student specializing in Computer Science & Engineering with a passion for developing innovative solutions. Proficient in diverse areas including AI/ML, cybersecurity, mobile app development (Flutter, Android), and web technologies. Proven ability to tackle complex problems, automate tasks, and contribute effectively to team projects. Eager to apply my skills and continuously learn in a challenging and dynamic environment.
           </motion.p>
             <div className="mt-12 flex justify-center space-x-6">
                <FooterLink href="https://github.com/sudarsanSDA" icon={<Github size={28} />} />
                <FooterLink href="https://linkedin.com/in/sudarsan-p-78390725a" icon={<Linkedin size={28} />} />
                <FooterLink href="mailto:sudarsanjcr@gmail.com" icon={<Mail size={28} />} />
             </div>
         </div>
       </section>

      {/* Skills Section */}
      <section id="skills" className={`py-32 bg-gray-100 text-gray-900`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle icon={<Cpu />} title="Technical Skills" />

          {/* Programming & Development */}
          <h3 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mb-6">Programming & Development</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
            <SkillIcon icon={<FileCode2 size={32} />} name="Flutter & Dart" />
            <SkillIcon icon={<ArrowDownWideNarrow size={32} />} name="Android (Kotlin)" />
            <SkillIcon icon={<Layers size={32} />} name="Python" />
            <SkillIcon icon={<Palette size={32} />} name="PHP" />
            <SkillIcon icon={<Smartphone size={32} />} name="HTML, CSS, JS" />
          </div>

          {/* AI & Neural Networks */}
          <h3 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mt-10 mb-6">AI & Neural Networks</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
            <SkillIcon icon={<Brain size={32} />} name="Neural Networking (Intermediate)" />
            <SkillIcon icon={<Brain size={32} />} name="Machine Learning" />
          </div>

          {/* Cybersecurity & Ethical Hacking */}
          <h3 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mt-10 mb-6">Cybersecurity & Ethical Hacking</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
            <SkillIcon icon={<Shield size={32} />} name="Kali Linux" />
            <SkillIcon icon={<HashIcon size={32} />} name="John the Ripper" />
            <SkillIcon icon={<Terminal size={32} />} name="Termux" />
            <SkillIcon icon={<Key size={32} />} name="Password Cracking" />
            <SkillIcon icon={<Wifi size={32} />} name="WiFi Cracking" />
          </div>

          {/* Hardware & OS Management */}
          <h3 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mt-10 mb-6">Hardware & OS Management</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
            <SkillIcon icon={<HardDrive size={32} />} name="Hardware Management" />
            <SkillIcon icon={<Server size={32} />} name="OS Installations" />
          </div>

          {/* Other Technical Skills */}
          <h3 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mt-10 mb-6">Other Technical Skills</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
            <SkillIcon icon={<GitBranch size={32} />} name="Git & GitHub" />
            <SkillIcon icon={<Database size={32} />} name="File Automation (Python)" />
            <SkillIcon icon={<Bug size={32} />} name="Problem Diagnosis" />
          </div>
        </div>
      </section>


      {/* Projects Section */}
      <section id="projects" className={`py-32 bg-gray-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle icon={<Code2 />} title="Projects" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Hate Speech Detection using NLP */}
            <PopupProjectCard
              title="Hate Speech Detection using NLP"
              description="AI system identifying harmful language in text for safer online interactions."
              image="https://source.unsplash.com/600x400/?ai,security"
              tags={['Python', 'NLP', 'Machine Learning']}
              details={{
                challenge: "Ensuring online safety by detecting hate speech in text data.",
                solution: "Used NLP techniques and machine learning models to classify and filter harmful content.",
                results: "Achieved high accuracy in identifying hate speech, contributing to reduced toxic content.",
                images: [
                  "https://source.unsplash.com/600x400/?text-analysis,ai",
                  "https://source.unsplash.com/600x400/?cybersecurity,nlp"
                ]
              }}
              link="https://github.com/sudarsan2004/Hatespeech_detection_NLP" // Optional link
            />

            {/* Handwriting Recognition System */}
            <PopupProjectCard
              title="Handwriting Recognition System"
              description="AI model that recognizes and digitizes handwritten text for document automation."
              image="https://source.unsplash.com/600x400/?handwriting,ai"
              tags={['Python', 'Neural Networks', 'AI']}
              details={{
                challenge: "Automating the recognition and digitization of handwritten documents.",
                solution: "Developed a neural network-based model for efficient text recognition.",
                results: "Successfully built a neural network capable of accurately converting handwritten text to digital format.",
                images: [
                  "https://source.unsplash.com/600x400/?notebook,writing",
                  "https://source.unsplash.com/600x400/?machine-learning,handwriting"
                ]
              }}
              // link="YOUR_PROJECT_LINK_HERE" // Optional link
            />


            {/* Brute-Force ZIP Password Cracker */}
            <PopupProjectCard
              title="Brute-Force ZIP Password Cracker"
              description="Python script to crack ZIP passwords using brute-force with GPU acceleration."
              image="https://source.unsplash.com/600x400/?hacking,security"
              tags={['Python', 'Cybersecurity', 'Brute-force']}
              details={{
                challenge: "Recovering lost ZIP passwords efficiently, leveraging GPU power.",
                solution: "Implemented a custom brute-force algorithm optimized for GPU usage.",
                results: "Significantly reduced the time required to crack passwords compared to CPU-only methods.",
                images: [
                  "https://source.unsplash.com/600x400/?zip,cracking",
                  "https://source.unsplash.com/600x400/?cybersecurity,attack"
                ]
              }}
             link="https://github.com/sudarsan2004/ZipPasswordBruteForcer" // Optional link
            />

            {/* DoubtTopia (Flutter Version) */}
            <PopupProjectCard
              title="DoubtTopia (Flutter Version)"
              description="Real-time doubt resolution platform with live content updates via Firebase."
              image="https://source.unsplash.com/600x400/?learning,technology"
              tags={['Flutter', 'Dart', 'Firebase', 'Mobile App']}
              details={{
                challenge: "Providing a real-time, scalable platform for students and educators to interact.",
                solution: "Developed a dynamic content display system using Firebase Realtime Database and Flutter for cross-platform deployment.",
                results: "Enabled live updates and interactive doubt resolution, improving user engagement and knowledge sharing.",
                images: [
                  "https://source.unsplash.com/600x400/?education,app",
                  "https://source.unsplash.com/600x400/?students,discussion"
                ]
              }}
             link="https://github.com/sudarsan2004/DoubtTopia" // Optional link
            />

            {/* DoubtTopia (Android Studio Version) */}
            <PopupProjectCard
              title="DoubtTopia (Android Native Version)"
              description="Android app (Java/Kotlin) for managing doubts and accessing categorized study materials."
              image="https://source.unsplash.com/600x400/?education,discussion"
              tags={['Android', 'Java', 'Kotlin', 'Firebase']}
              details={{
                challenge: "Creating a collaborative platform for students to resolve doubts and access resources.",
                solution: "Built an intuitive Android app organizing PDFs by semester/subject via Firebase.",
                results: "Provided students structured access to study materials, enhancing collaboration.",
                images: [
                  "https://source.unsplash.com/600x400/?students,learning",
                  "https://source.unsplash.com/600x400/?pdf,documents"
                ]
              }}
             // link="YOUR_PROJECT_LINK_HERE" // Optional link
            />


            {/* Automated Image Downloader & Excel Updater */}
            <PopupProjectCard
              title="Automated Image Downloader & Excel Updater"
              description="Python script automating bulk image downloads and updating Excel paths."
              image="https://source.unsplash.com/600x400/?automation,data"
              tags={['Python', 'Automation', 'Excel', 'Data Processing']}
              details={{
                challenge: "Managing large-scale image downloads and organizing paths in Excel.",
                solution: "Developed an automated Python script to download images from URLs and update Excel.",
                results: "Successfully downloaded 13,000+ images efficiently, saving significant manual effort.",
                images: [
                  "https://source.unsplash.com/600x400/?code,automation",
                  "https://source.unsplash.com/600x400/?excel,data"
                ]
              }}
             // link="YOUR_PROJECT_LINK_HERE" // Optional link
            />


            {/* Tic-Tac-Toe AI */}
            <PopupProjectCard
              title="Tic-Tac-Toe AI (Reinforcement Learning)"
              description="RL model playing Tic-Tac-Toe, visualizing Q-table updates during learning."
              image="https://source.unsplash.com/600x400/?ai,games"
              tags={['Python', 'Reinforcement Learning', 'AI', 'Q-Learning']}
              details={{
                challenge: "Developing an AI that learns and improves its Tic-Tac-Toe strategy through play.",
                solution: "Used Q-learning to train an agent that adapts based on game outcomes.",
                results: "Successfully demonstrated reinforcement learning principles in a classic game context.",
                images: [
                  "https://source.unsplash.com/600x400/?tic-tac-toe,ai",
                  "https://source.unsplash.com/600x400/?q-learning,games"
                ]
              }}
             // link="YOUR_PROJECT_LINK_HERE" // Optional link
            />

          </div>
        </div>
      </section>


      {/* Achievements Section */}
      <section id="achievements" className={`py-32 bg-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle icon={<Award />} title="Achievements & Certifications" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AchievementCard
              title="NPTEL Star"
              image="assets/NPTEL_BELIEVERS.png" // Ensure this path is correct relative to public folder or imported
              date="2024"
              description="Recognition for outstanding performance in NPTEL online courses."
            />
            <AchievementCard
              title="Harvard’s CS50x Certificate"
              image="assets/CS50python.png" // Ensure path is correct
              date="2024"
              description="Completed Harvard's renowned introduction to computer science course."
            />
            <AchievementCard
              title="Machine Learning at the Edge"
              image="assets/MachineLearningEdge.png" // Ensure path is correct
              date="2024"
              description="Gained experience deploying AI models on edge devices, focusing on optimization."
            />
            <AchievementCard
              title="Java Programming Basic Skills"
              image="assets/JavaProgrammingBasicSkills.png" // Ensure path is correct
              date="2024"
              description="Certified proficiency in core Java concepts and object-oriented programming."
            />
            <AchievementCard
              title="Introduction to Cloud Computing"
              image="assets/CloudComputing.png" // Ensure path is correct
              date="2024"
              description="Acquired foundational knowledge in cloud architecture, models, and services."
            />
            <AchievementCard
              title="Google AI for Anyone"
              image="assets/GoogleAI.png" // Ensure path is correct
              date="2024"
              description="Completed Google's AI fundamentals course on concepts and applications."
            />

          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className={`py-32 bg-gradient-to-b from-white to-gray-100`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className={`text-5xl font-bold mb-8 text-center text-gray-900`}>
              Let's Connect
            </h2>
            <p className={`text-xl text-gray-600 mb-12 max-w-2xl mx-auto text-center`}>
              Have a project idea or just want to chat? Feel free to reach out!
            </p>

            <div className="max-w-2xl mx-auto">
              <div className={`p-8 rounded-2xl bg-white shadow-xl`}>
                {/* Replace with your actual form or contact info */}
                <form action="https://formspree.io/f/your_form_id" method="POST" className="space-y-6"> {/* Replace 'your_form_id' */}
                   <div>
                     <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                       Name
                     </label>
                     <input
                       type="text"
                       id="name"
                       name="name" // Add name attribute for form submission
                       required // Add required attribute
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
                       name="email" // Add name attribute
                       required // Add required attribute
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
                       name="message" // Add name attribute
                       rows={5}
                       required // Add required attribute
                       className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                       placeholder="Your message"
                     ></textarea>
                   </div>
                   <motion.button
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                     type="submit" // Change type to submit
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
      <footer className={`py-12 border-t border-gray-200`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className={`text-2xl font-bold mb-4 text-gray-900`}>P Sudarsan</h3>
              <p className={'text-gray-600'}>Turning ideas into elegant code & seamless experiences.</p>
            </div>
            <div className="flex justify-center md:justify-end space-x-6">
              <FooterLink href="https://github.com/sudarsansda" icon={<Github size={24} />} />
              <FooterLink href="https://linkedin.com/in/sudarsan-p-78390725a" icon={<Linkedin size={24} />} />
              <FooterLink href="mailto:sudarsanjcr@gmail.com" icon={<Mail size={24} />} />
            </div>
          </div>
          <div className={`mt-12 pt-8 border-t border-gray-200 text-center text-gray-600`}>
            <p>© {new Date().getFullYear()} P Sudarsan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Updated NavLink to handle mobile styles and click handling
function NavLink({ href, children, isMobile = false, onClick }: { href: string; children: React.ReactNode; isMobile?: boolean; onClick?: () => void; }) {
  const mobileClasses = "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50";
  const desktopClasses = "text-gray-700 hover:text-gray-900 transition-colors";

  return (
    <motion.a
      href={href}
      className={isMobile ? mobileClasses : desktopClasses}
      whileHover={{ scale: isMobile ? 1.0 : 1.05 }} // No scale hover on mobile links needed
      whileTap={{ scale: 0.95 }}
      onClick={onClick} // Close mobile menu on click
    >
      {children}
    </motion.a>
  );
}

function FooterLink({ icon, href }: { icon: React.ReactNode; href: string; }) {
  return (
    <motion.a
      whileHover={{ scale: 1.1, y: -2 }} // Add subtle lift on hover
      whileTap={{ scale: 0.95 }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={'text-gray-600 hover:text-blue-600 transition-colors'} // Updated hover color
    >
      {icon}
    </motion.a>
  );
}

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string; }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-center gap-4 mb-12 md:mb-16" // Centered title
    >
      {/* Gradient background for icon */}
      <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-md text-white">
        {React.cloneElement(icon as React.ReactElement, { size: 24 })}
      </div>
      <h2 className={`text-4xl md:text-5xl font-bold text-gray-900`}>{title}</h2>
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
  link, // Added link prop
  tags,
  details
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
    <> {/* Use Fragment to handle overlay and card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`group relative bg-white shadow-lg rounded-2xl overflow-hidden cursor-pointer transition-shadow duration-300 hover:shadow-xl`}
        onClick={() => setIsExpanded(true)} // Expand on click
        layout // Animate layout changes
      >
        {/* Subtle gradient overlay on hover */}
        {/* <div className={`absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div> */}

        <div className="relative">
          <img src={image} alt={title} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105" />
          {/* Add a subtle inner shadow or overlay if needed */}
           {/* <div className="absolute inset-0 bg-black/5"></div> */}
        </div>
        <div className="p-6">
          <h3 className={`text-xl font-bold mb-2 text-gray-900`}>{title}</h3>
          <p className={`text-gray-600 mb-4 text-sm line-clamp-3`}>{description}</p> {/* Use line-clamp */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span key={index} className={`px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium`}>
                {tag}
              </span>
            ))}
          </div>
           {/* Keep the View Details indicator subtle */}
           <div className="text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
             View Details ›
           </div>
        </div>
      </motion.div>

      {/* Expanded View Modal */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/70 z-[90]" // Ensure overlay is below modal content
              onClick={() => setIsExpanded(false)} // Close on overlay click
            />

            {/* Modal Content */}
            <motion.div
              key="expanded-content"
              layoutId={`project-card-${title}`} // Unique ID for layout animation
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 m-auto w-[90vw] max-w-4xl h-[85vh] max-h-[800px] z-[100] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              {/* Header */}
              <div className="flex justify-between items-center p-4 md:p-6 border-b border-gray-200 flex-shrink-0">
                <h3 className={`text-2xl md:text-3xl font-bold text-gray-900`}>{title}</h3>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsExpanded(false)}
                  className={`p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors`}
                  aria-label="Close project details"
                >
                  <X size={24} />
                </motion.button>
              </div>

              {/* Scrollable Content */}
              <div className="p-4 md:p-6 overflow-y-auto flex-grow">
                <div className="flex flex-wrap gap-2 mb-6">
                  {tags.map((tag, index) => (
                    <span key={index} className={`px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium`}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                  {details.images.map((img, index) => (
                    <img key={index} src={img} alt={`${title} screenshot ${index + 1}`} className="rounded-lg shadow-md w-full h-auto object-contain max-h-64" />
                  ))}
                </div>

                <div className="space-y-5 mb-8 text-gray-700 text-base leading-relaxed">
                  <div>
                    <h4 className={`text-lg font-semibold mb-1 text-blue-700`}>The Challenge</h4>
                    <p>{details.challenge}</p>
                  </div>
                  <div>
                    <h4 className={`text-lg font-semibold mb-1 text-blue-700`}>The Solution</h4>
                    <p>{details.solution}</p>
                  </div>
                  <div>
                    <h4 className={`text-lg font-semibold mb-1 text-blue-700`}>The Results</h4>
                    <p>{details.results}</p>
                  </div>
                </div>

                {/* Optional Project Link Button */}
                {link && (
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors font-medium text-sm`}
                  >
                    Visit Project <ExternalLink size={16} />
                  </motion.a>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}


function SkillIcon({ icon, name }: { icon: React.ReactNode; name: string; }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -5 }} // Lift effect on hover
      className={`flex flex-col items-center justify-center text-center p-4 md:p-6 bg-white hover:bg-blue-50/50 border border-gray-200/80 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md`}
    >
      <div className={`mb-3 text-blue-600`}>
        {/* Ensure icon has a fixed size */}
        {React.cloneElement(icon as React.ReactElement, { size: 36 })}
      </div>
      <span className={`text-sm md:text-base text-gray-700 font-medium`}>
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`overflow-hidden rounded-xl bg-white shadow-lg group border border-gray-200/70 hover:shadow-xl transition-shadow duration-300`}
    >
      <div className="relative h-48 overflow-hidden">
        {/* Image */}
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" />
        {/* Optional: Subtle gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
        {/* Date Badge */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className={`px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full shadow-sm`}>{date}</span>
        </div>
      </div>
      <div className="p-5 md:p-6">
        <h3 className={`text-lg font-bold mb-2 text-gray-900`}>{title}</h3>
        <p className={'text-gray-600 text-sm leading-relaxed'}>{description}</p>
      </div>
    </motion.div>
  );
}


export default App;