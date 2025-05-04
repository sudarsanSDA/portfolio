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
  LucideWifiOff, // Maybe remove if not used?
  WifiOff,       // Maybe remove if not used?
  Key,
  Hash as HashIcon, // Renamed Hash to avoid conflict with JS Hash
  Tablets,       // Maybe remove if not used?
  Phone,         // Maybe remove if not used?
  ArrowDownWideNarrow,
  FacebookIcon
} from 'lucide-react'; // Ensure 'Hash' is imported correctly if needed, maybe rename it

// Main App Component
function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const { scrollY } = useScroll();
  const headerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null); // Ref for the nav bar

  // Effect to handle header background on scroll
  useEffect(() => {
    const updateScroll = () => {
      if (headerRef.current) {
        // Trigger change slightly before the section starts for better visual transition
        setIsScrolled(window.scrollY > headerRef.current.offsetHeight - 80); // Adjust threshold if needed
      } else {
        setIsScrolled(window.scrollY > 50); // Fallback
      }
    };
    window.addEventListener('scroll', updateScroll);
    updateScroll(); // Initial check
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  // Effect to close mobile menu on resize to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // Tailwind 'md' breakpoint
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- FIX: Handle mobile navigation click ---
  const handleMobileNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // 1. Prevent the browser's default anchor link jump *immediately*.
    //    This often helps avoid conflicts with state updates and animations.
    event.preventDefault();

    // 2. Close the menu *immediately* by updating the state.
    //    This triggers React to re-render and Framer Motion to start the exit animation.
    setIsMobileMenuOpen(false);

    // 3. Check if it's a valid hash link (starts with # and has more characters).
    if (href.startsWith('#') && href.length > 1) {
        const targetId = href.substring(1); // Extract the ID (e.g., "skills")

        // 4. Use setTimeout to delay the scroll action slightly.
        //    This gives the browser time to process the state update and start
        //    the menu closing animation before trying to scroll the page.
        setTimeout(() => {
            const targetElement = document.getElementById(targetId);

            // 5. If the target element exists in the DOM...
            if (targetElement) {
                // Calculate the height of the fixed navigation bar.
                // Use the ref if available, otherwise fallback to a sensible default (e.g., 64px for h-16).
                const navHeight = navRef.current?.offsetHeight || 64;

                // Define an extra pixel offset to add some padding above the scrolled section.
                const extraOffset = 20; // Adjust this value as needed for visual spacing.

                // Calculate the target scroll position:
                // - Get the element's position relative to the viewport top.
                // - Add the current vertical scroll position (window.pageYOffset).
                // - Subtract the navigation bar height.
                // - Subtract the extra offset padding.
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight - extraOffset;

                // 6. Perform the smooth scroll to the calculated position.
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth" // Use smooth scrolling animation.
                });
            } else {
                // Log a warning if the target ID wasn't found, helps debugging.
                console.warn(`[handleMobileNavClick] Target element with id "${targetId}" not found for smooth scroll.`);
            }
        }, 50); // Delay in milliseconds (50ms is usually short enough not to be noticed but allows state update).
               // You might need to adjust this slightly (e.g., 100ms) depending on device/browser performance.
    }
    // Note: If the href was not a hash link (e.g., an external link), nothing
    // further happens here because event.preventDefault() was called earlier.
    // If you need non-hash links to work from the mobile menu, you'd adjust
    // the logic to only call preventDefault for hash links.
};

  return (
    // Always light theme
    <div className={`min-h-screen bg-white text-gray-900 transition-colors duration-500`}>

      {/* Navigation -- Added ref={navRef} */}
      <nav ref={navRef} className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen // Keep background visible when mobile menu is open too
          ? 'bg-white/90 backdrop-blur-lg shadow-md' // Enhanced shadow slightly
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Name */}
            <motion.a // Use anchor tag for navigation
              href="#top" // Link to top (will be handled by handleMobileNavClick if needed on mobile)
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold text-gray-900 cursor-pointer" // Added cursor-pointer
              // Use the same handler for consistency on mobile if menu happens to be open
              onClick={(e) => handleMobileNavClick(e, '#top')}
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
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"} // Improved accessibility
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
              className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 z-40 overflow-hidden border-t border-gray-200" // Added top border
            >
              {/* Use handleMobileNavClick for each link */}
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

      {/* Hero Section -- Added id="top" for logo link */}
      <header ref={headerRef} id="top" className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} // Smoother ease
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
                className="prose prose-lg lg:prose-xl max-w-4xl mx-auto text-gray-700" // Prose classes for better typography
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
            <SkillIcon icon={<HashIcon size={32} />} name="John the Ripper" /> {/* Use HashIcon */}
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
             {/* Project Cards */}
             <PopupProjectCard
                title="Hate Speech Detection using NLP"
                description="An AI-powered system that identifies and filters harmful language in text, ensuring safer online interactions."
                image="https://source.unsplash.com/600x400/?ai,security" // Consider replacing with actual project images
                tags={['Python', 'NLP', 'ML']}
                // link="your-repo-link-here" // Add link if available
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
                // link=""
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
                // link=""
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
                // link=""
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
                tags={['Android', 'Kotlin', 'Firebase']} // Updated tag assuming Kotlin
                // link=""
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
                // link=""
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
                // link=""
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
            {/* Achievement Cards - Make sure image paths are correct relative to your 'public' folder or imported */}
            <AchievementCard
                title="NPTEL Star"
                image="assets/NPTEL_BELIEVERS.png" // Example: Assuming assets is in public
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
                <form className="space-y-6" /* Add onSubmit={handleFormSubmit} if needed */ >
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name" // Add name attribute for form handling
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
                      name="email"
                      required
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
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02, filter: 'brightness(1.1)' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 shadow hover:shadow-md"
                    type="submit" // Changed to submit - add onSubmit handler to <form>
                    // Removed onClick handler - use form's onSubmit
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
              {/* Update href links with your actual profiles */}
              <FooterLink href="https://github.com/your-github-username" ariaLabel="GitHub Profile" icon={<Github size={24}/>} />
              <FooterLink href="https://linkedin.com/in/your-linkedin-profile" ariaLabel="LinkedIn Profile" icon={<Linkedin size={24}/>} />
              <FooterLink href="mailto:your.email@example.com" ariaLabel="Send Email" icon={<Mail size={24}/>} />
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600">
            <p>© {new Date().getFullYear()} P Sudarsan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div> // Close main div
  );
} // Close App Component


// --- Sub Components ---

// UPDATED NavLink Component
function NavLink({ href, children, isMobile = false, onClick }: {
    href: string;
    children: React.ReactNode;
    isMobile?: boolean;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void; // Accepts the event
}) {
  const mobileClasses = "block w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 text-left";
  const desktopClasses = "text-gray-700 hover:text-blue-600 transition-colors px-1 font-medium relative group"; // Added interactive styling for desktop

  // This internal handler just calls the onClick passed from the parent if it exists
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(event);
    }
    // The actual scroll logic for mobile is now in `handleMobileNavClick` in App component
  };

  return (
    <motion.a
      href={href}
      className={isMobile ? mobileClasses : desktopClasses}
      whileHover={isMobile ? {} : { y: -2 }} // Only lift on desktop hover
      whileTap={{ scale: 0.95 }}
      onClick={handleClick} // Use the wrapper function
    >
      {children}
       {/* Underline animation for desktop */}
      {!isMobile && (
        <span className="absolute bottom-0 left-0 h-0.5 bg-blue-600 w-0 group-hover:w-full transition-all duration-300"></span>
      )}
    </motion.a>
  );
}

// FooterLink Component (Added aria-label)
function FooterLink({ icon, href, ariaLabel }: { icon: React.ReactNode; href: string; ariaLabel: string }) {
  return (
    <motion.a
      whileHover={{ scale: 1.15, color: '#2563EB' }} // Adjusted color to blue-600
      whileTap={{ scale: 0.9 }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-500 hover:text-gray-900 transition-colors"
      aria-label={ariaLabel} // Accessibility
    >
      {icon}
    </motion.a>
  );
}

// SectionTitle Component
function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex items-center gap-4 mb-12 md:mb-16"
    >
      {/* Icon wrapper */}
      <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white shadow-lg flex-shrink-0">
        {/* Clone icon to enforce size/color */}
        {React.cloneElement(icon as React.ReactElement, { size: 28, color: 'white', strokeWidth: 2 })}
      </div>
      {/* Title */}
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900">{title}</h2>
    </motion.div>
  );
}

// PopupProjectCard Component Interface and Implementation
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
}: {
  title: string;
  description: string;
  image: string;
  link?: string;
  tags: string[];
  details: ProjectDetails;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup function to restore scroll on component unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isExpanded]);


  return (
    <> {/* Fragment for Portal/Overlay Logic */}
      {/* Card itself */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }} // Trigger slightly earlier
        transition={{ duration: 0.6, delay: 0.1 }}
        layout // Enable layout animation between states
        className="group relative bg-white shadow-lg rounded-2xl overflow-hidden cursor-pointer border border-gray-100 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col" // Added h-full and flex
        onClick={() => setIsExpanded(true)} // Expand on click
      >
        {/* Image Container */}
        <motion.div layout="position" className="relative aspect-video overflow-hidden"> {/* Aspect ratio container */}
          <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </motion.div>

        {/* Content Container */}
        <motion.div layout="position" className="p-6 flex-grow flex flex-col justify-between"> {/* Added flex-grow */}
          <div> {/* Top content group */}
            <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
            <p className="text-gray-600 mb-4 text-sm line-clamp-3">{description}</p> {/* Allow slightly more text */}
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, index) => (
                <span key={index} className="px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
           {/* View Details Button */}
           <motion.div
             className="inline-flex items-center gap-1 text-sm text-blue-600 group-hover:text-blue-700 font-medium mt-auto pt-2" // Ensure it's at bottom
          >
            View Details <ExternalLink size={14} className="opacity-70 group-hover:opacity-100 transition-opacity"/>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* --- Modal Popup --- */}
      <AnimatePresence>
        {isExpanded && (
          // Note: Consider using React Portal for modals `import ReactDOM from 'react-dom';` `ReactDOM.createPortal(...)`
          // For simplicity, keeping it inline here.
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90]" // Added subtle blur
              onClick={() => setIsExpanded(false)} // Close on overlay click
              aria-hidden="true" // Hide from screen readers
            />

            {/* Expanded Card Modal */}
            <motion.div
              layoutId={`project-card-${title}`} // Must match for animation
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              // Improved sizing and positioning
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-4xl h-[90vh] max-h-[700px] z-[100] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
              role="dialog" // ARIA role
              aria-modal="true" // ARIA state
              aria-labelledby={`modal-title-${title}`} // Link to title for screen readers
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-4 sm:p-5 border-b border-gray-200 flex-shrink-0 bg-gray-50 rounded-t-2xl">
                <h3 id={`modal-title-${title}`} className="text-lg sm:text-xl font-bold text-gray-900">{title}</h3>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90, backgroundColor: '#E5E7EB' }} // bg-gray-200
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsExpanded(false)}
                  className="p-2 rounded-full text-gray-500 hover:text-gray-800 transition-colors"
                  aria-label="Close project details" // Accessibility
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Modal Content (Scrollable) */}
              <div className="p-4 sm:p-6 overflow-y-auto flex-grow custom-scrollbar"> {/* Add custom scrollbar class if needed */}
                 {/* Image Gallery */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {details.images.map((img, index) => (
                        <img key={index} src={img} alt={`${title} example ${index + 1}`} className="rounded-lg shadow-sm w-full h-48 object-cover border border-gray-200 bg-gray-100" loading="lazy" />
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
                <div className="space-y-5 mb-6 text-gray-700 text-sm sm:text-base leading-relaxed prose prose-sm sm:prose-base max-w-none"> {/* Prose for better text styling */}
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold mb-1 text-blue-700 !mt-0">The Challenge</h4> {/* Override prose margin */}
                    <p>{details.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold mb-1 text-blue-700">The Solution</h4>
                    <p>{details.solution}</p>
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold mb-1 text-blue-700">The Results</h4>
                    <p>{details.results}</p>
                  </div>
                </div>
              </div>

              {/* Modal Footer (Optional Link) */}
              {link && (
                  <div className="p-4 sm:p-5 border-t border-gray-200 flex-shrink-0 text-right bg-gray-50 rounded-b-2xl">
                      <motion.a
                          whileHover={{ scale: 1.03, filter: 'brightness(1.05)' }} // Subtle hover effect
                          whileTap={{ scale: 0.97 }}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors text-xs sm:text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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


// SkillIcon Component
function SkillIcon({ icon, name }: { icon: React.ReactNode; name: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }} // Trigger when 30% visible
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -5, boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.1), 0 4px 6px -4px rgba(59, 130, 246, 0.1)' }} // Adjusted shadow color (blueish)
      className="flex flex-col items-center justify-center p-4 sm:p-5 bg-white hover:bg-white rounded-xl transition-all duration-300 border border-gray-100 text-center shadow-sm hover:shadow-lg cursor-default" // Changed hover shadow
    >
      {/* Icon styling */}
      <div className="mb-3 text-blue-600">
        {React.cloneElement(icon as React.ReactElement, { strokeWidth: 1.5 })} {/* Standardize stroke */}
      </div>
      {/* Text styling */}
      <span className="text-sm sm:text-base text-gray-700 font-medium leading-tight">
        {name}
      </span>
    </motion.div>
  );
}

// AchievementCard Component
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
      className="overflow-hidden rounded-xl bg-white shadow-lg group border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full" // Added flex/h-full
    >
      {/* Image container with aspect ratio */}
      <div className="relative aspect-[16/10] overflow-hidden"> {/* Adjust aspect ratio if needed */}
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        {/* Darker gradient overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        {/* Date Badge - Positioned bottom-left */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full shadow">
              {date}
          </span>
        </div>
      </div>
      {/* Content container */}
      <div className="p-5 sm:p-6 flex-grow"> {/* Added flex-grow */}
        <h3 className="text-lg font-bold mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

// Default export for the App component
export default App;