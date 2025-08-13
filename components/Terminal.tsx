"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/all";

// Register ScrollToPlugin for smooth scrolling
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

interface TerminalProps {
  onClose?: () => void;
  onOpenFirefox?: (showProjects?: boolean, showTools?: boolean) => void; // Update to accept both parameters
  initialPosition?: { x: number; y: number }; // Add initial position prop
}

// Add terminal state interface
interface TerminalState {
  isOpen: boolean;
  isMaximized: boolean;
  height: string;
  width: string;
  maxWidth: string;
}

// Add responsive sizing constants
const RESPONSIVE_SIZES = {
  small: {
    width: "95vw",
    height: "60vh",
    maxWidth: "600px",
  },
  medium: {
    width: "85vw",
    height: "65vh",
    maxWidth: "800px",
  },
  large: {
    width: "75vw",
    height: "70vh",
    maxWidth: "1200px",
  },
};

export default function Terminal({
  onClose,
  onOpenFirefox,
  initialPosition,
}: TerminalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [blinkCursor, setBlinkCursor] = useState(true);
  const [terminalState, setTerminalState] = useState<TerminalState>({
    isOpen: true,
    isMaximized: false,
    height: "70vh",
    width: "100%",
    maxWidth: "1200px",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [specialCommand, setSpecialCommand] = useState<string | null>(null);
  const [commandType, setCommandType] = useState<string | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);

  const [needsScrolling, setNeedsScrolling] = useState(false);

  // Add these state variables at the top with other state declarations
  const [position, setPosition] = useState(initialPosition || { x: 0, y: 0 });

  // Create a ref for the taskbar indicator
  const terminalIndicatorRef = useRef<HTMLDivElement>(null);

  // Add window size state
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  const [isFocused, setIsFocused] = useState(false);

  // Add a ref to track ongoing executions
  const executionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isExecutingRef = useRef(false);

  // Add this with other handlers
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setIsTyping(false);
  };

  // Define command categories with their respective colors
  const commandCategories = {
    system: [
      "help",
      "clear",
      "whoami",
      "ls",
      "exit",
      "projects",
      "toolspage",
    ],
    portfolio: [
      "about",
      "education",
      "skills",
      "projects",
      "ctf",
      "contact",
      "blog",
    ],
    // Add more categories as needed
  };

  // Add function to get responsive sizes
  const getResponsiveSizes = () => {
    if (windowSize.width < 768) {
      return RESPONSIVE_SIZES.small;
    } else if (windowSize.width < 1024) {
      return RESPONSIVE_SIZES.medium;
    }
    return RESPONSIVE_SIZES.large;
  };

  const handleClose = () => {
    // If an onClose prop is provided, call it instead of the fake close animation
    if (onClose) {
      onClose();
      return;
    }

    // Existing close animation code for when terminal is used standalone
    const lastMessage = history[history.length - 1] || "";
    const isAlreadyShowing = lastMessage.includes("Nice try!");

    if (!isAlreadyShowing) {
      setHistory((prev) => [
        ...prev,
        `<span class="error-message">Nice try! You can't escape that easily...</span>`,
        `<span class="system-message">System override: Terminal will remain active.</span>`,
      ]);

      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }

    setTimeout(() => {
      setTerminalState((prev) => ({ ...prev, isOpen: false }));

      setTimeout(() => {
        setTerminalState((prev) => ({ ...prev, isOpen: true }));
      }, 800);
    }, 1000);
  };

  const handleMinimize = () => {
    // Get the terminal window element
    const terminalWindow = document.querySelector(".terminal-window");
    if (terminalWindow) {
      console.log('Terminal: Executing minimize animation');
      // Only minimize if not already minimized
      if (!terminalWindow.classList.contains("minimized")) {
        // Add minimized class to track state
        terminalWindow.classList.add("minimized");
        setIsMinimized(true); // Set state to minimized

        // Animate out to the top instead of bottom
        (terminalWindow as HTMLElement).style.transform = "translateY(-100%)";
        (terminalWindow as HTMLElement).style.opacity = "0";

        // After animation completes, hide the window
        setTimeout(() => {
          console.log('Terminal: Animation complete, hiding window');
          (terminalWindow as HTMLElement).style.display = "none";
          // No event listeners added here at all
        }, 300);
      }
    } else {
      console.log('Terminal: Could not find terminal window element!');
    }
  };

  // Add a separate function to handle restoring the terminal
  const handleRestore = () => {
    const terminalWindow = document.querySelector(".terminal-window");
    if (terminalWindow && terminalWindow.classList.contains("minimized")) {
      // Show and restore the window
      (terminalWindow as HTMLElement).style.display = "flex";
      (terminalWindow as HTMLElement).style.opacity = "0";
      (terminalWindow as HTMLElement).style.transform = "translateY(-100%)";

      // Force reflow
      void (terminalWindow as HTMLElement).offsetWidth;

      // Animate back in from the top
      (terminalWindow as HTMLElement).style.transform = "";
      (terminalWindow as HTMLElement).style.opacity = "";

      // Set state back to not minimized
      setIsMinimized(false);

      // Remove minimized class after animation completes
      setTimeout(() => {
        terminalWindow.classList.remove("minimized");
      }, 300);
    }
  };

  // Modify the maximize handler
  const handleMaximize = () => {
    setTerminalState((prev) => {
      if (prev.isMaximized) {
        // Return to responsive size when un-maximizing
        const { width, height, maxWidth } = getResponsiveSizes();
        return {
          ...prev,
          isMaximized: false,
          height,
          width,
          maxWidth,
        };
      }
      return {
        ...prev,
        isMaximized: true,
        height: "calc(100vh - 56px)",
        width: "100%",
        maxWidth: "100%",
      };
    });
  };

  const typeText = (text: string, callback?: () => void) => {
    if (isExecutingRef.current) return; // Don't start new typing if already executing

    setTypingText("");
    setIsTyping(true);
    isExecutingRef.current = true;

    // Create a temporary div to parse HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = text;
    const textContent = tempDiv.textContent || tempDiv.innerText || "";

    // Type the text content without HTML tags, but much faster
    const typeChar = (index: number) => {
      if (!isExecutingRef.current) return; // Stop if execution was cancelled

      if (index < textContent.length) {
        setTypingText((prev) => prev + textContent.charAt(index));
        scrollToBottom();

        executionTimeoutRef.current = setTimeout(
          () => typeChar(index + 1),
          Math.random() * 10 + 5
        );
      } else {
        setIsTyping(false);
        isExecutingRef.current = false;
        if (callback) callback();
      }
    };

    typeChar(0);
  };

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setBlinkCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  const handleCommand = (cmd: string) => {
    if (isExecutingRef.current) return; // Don't process new commands while executing

    const cmdLower = cmd.trim().toLowerCase();
    const [command, ...args] = cmdLower.split(" ");

    // Special handling for exit command
    if (command === "exit") {
      if (onClose) {
        setHistory((prev) => [
          ...prev,
          `<span class="system-message">Exiting terminal. Goodbye!</span>`,
        ]);

        executionTimeoutRef.current = setTimeout(() => {
          onClose();
        }, 1000);
      } else {
        setHistory((prev) => [
          ...prev,
          `<span class="system-message">Exiting terminal. Redirecting to home page...</span>`,
        ]);

        executionTimeoutRef.current = setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
      return "";
    }

    // Special handling for help command
    if (command === "help") {
      // Force scrollbar to be visible during help command to prevent flickering
      setNeedsScrolling(true);
      const response = handleHelpCommand(args);
      setHistory((prev) => [...prev, response]);

      // Delay the scroll with GSAP for smoother experience
      setTimeout(() => {
        if (terminalRef.current) {
          gsap.to(terminalRef.current, {
            scrollTo: { y: "max" },
            duration: 0.6,
            ease: "power2.out",
          });

          // Check scrolling needs after a delay
          setTimeout(checkIfNeedsScrolling, 300);
        }
      }, 50);

      return "";
    }

    if (command === "clear") {
      setHistory([]);
      return "";
    }

    const commands: Record<string, (args?: string[]) => string> = {
      help: () => handleHelpCommand(args),
      ls: () => {
        // Simulate a file system with directories and files
        const files = [
          { name: "projects", type: "directory" },
          { name: "resume.pdf", type: "file" },
          { name: "toolspage", type: "directory" },
          { name: "contacts.txt", type: "file" },
          { name: "certifications", type: "directory" },
        ];

        // Create HTML output for the ls command
        let output = '<div class="ls-output">';

        files.forEach((file) => {
          if (file.type === "directory") {
            output += `<span class="directory-item">${file.name}/</span> `;
          } else {
            output += `<span class="file-item">${file.name}</span> `;
          }
        });

        output += "</div>";
        return output;
      },
      // Add the projects command
      projects: () => {
        // Set loading state to true
        setIsLoading(true);
        
        console.log('Terminal: Executing projects command');

        // Add proper delay to ensure the command executes properly
        setTimeout(() => {
          console.log('Terminal: Minimizing terminal...');
          // First minimize the terminal
          handleMinimize();

          // Give time for the minimize animation to complete
          setTimeout(() => {
            console.log('Terminal: Opening Firefox with showProjects=true');
            // Then open Firefox with the showProjects flag
            if (onOpenFirefox) {
              // Explicitly pass true to indicate showProjects mode
              onOpenFirefox(true, false);
            } else {
              console.log('Terminal: onOpenFirefox callback is not defined!');
            }

            // Reset loading state
            setIsLoading(false);
          }, 200); // Wait 200ms before opening Firefox
        }, 100); // Start after 100ms delay

        return "Opening GitHub projects in Firefox...";
      },
      // Add the toolspage command
      toolspage: () => {
        // Set loading state to true
        setIsLoading(true);
        
        console.log('Terminal: Executing toolspage command');

        // Add proper delay to ensure the command executes properly
        setTimeout(() => {
          console.log('Terminal: Minimizing terminal...');
          // First minimize the terminal
          handleMinimize();

          // Give time for the minimize animation to complete
          setTimeout(() => {
            console.log('Terminal: Opening Firefox with showTools=true');
            // Then open Firefox with the showTools flag
            if (onOpenFirefox) {
              // Pass a second parameter (showTools) to indicate tools mode
              onOpenFirefox(false, true);
            } else {
              console.log('Terminal: onOpenFirefox callback is not defined!');
            }

            // Reset loading state
            setIsLoading(false);
          }, 200); // Wait 200ms before opening Firefox
        }, 100); // Start after 100ms delay

        return "Opening tools page in Firefox...";
      },
      whoami: () => {
        return `<div class="whoami-output">
          <span class="user-info">User: <span class="user-value">Sriram Bharath</span></span>
          <span class="user-info">Role: <span class="user-value">College Student CSE | 🛡️ Aspiring Ethical Hacker and Cybersecurity Expert</span></span>
          <span class="user-info">Status: <span class="user-value">Active</span></span>
        </div>`;
      },
      about: () =>
        `🛡️ Aspiring Ethical Hacker and Cybersecurity Expert

<span class="about-section-title">ABOUT ME</span>
I'm a passionate Computer Science Engineering student with a deep interest in cybersecurity, ethical hacking, and information security. Currently pursuing my degree while actively learning and practicing security concepts.

<span class="about-section-title">PROGRAMMING LANGUAGES</span>
• <span class="lang-python">Python</span> - Learning automation and security tools development
• <span class="lang-bash">Bash</span> - System automation and basic scripting
• <span class="lang-ps">PowerShell</span> - Windows system administration basics
• <span class="lang-java">Java</span> - Object-oriented programming fundamentals
• <span class="lang-html">HTML/CSS/JS</span> - Web development basics
• <span class="lang-markdown">Markdown</span> - Documentation and content creation

<span class="about-section-title">LEARNING AREAS</span>
• <span class="skill-highlight">Network Security</span> - Understanding protocols and vulnerabilities
• <span class="skill-highlight">Web Security</span> - Learning about OWASP Top 10 and web vulnerabilities
• <span class="skill-highlight">Penetration Testing</span> - Ethical hacking methodologies
• <span class="skill-highlight">OSINT</span> - Open source intelligence gathering techniques

<span class="about-section-title">EDUCATION & GOALS</span>
• Bachelor of Engineering in Computer Science (In Progress)
• Learning cybersecurity fundamentals and ethical hacking concepts
• Planning to pursue certifications like CEH, CompTIA Security+, and OSCP
• Active participation in CTF challenges and security communities

<span class="about-section-title">INTERESTS</span>
Passionate about understanding how systems work, finding vulnerabilities, and learning defensive security measures. Currently focused on building a strong foundation in cybersecurity concepts, tools, and methodologies.

<span class="about-section-title">PROJECTS</span>
Working on various cybersecurity projects including vulnerability assessment tools, security awareness applications, and learning platforms. Always eager to contribute to open-source security projects and collaborate with the cybersecurity community.`,
      skills: () =>
        "Programming Languages & Technical Skills\n\nLearning and practicing:\n• Python - Automation and security tools development\n• Bash Scripting - System automation and basic scripting\n• PowerShell - Windows system administration basics\n• Java - Object-oriented programming fundamentals\n• HTML/CSS/JavaScript - Web development basics\n• Markdown - Documentation and content creation\n\nAreas of interest: Network security, web security, penetration testing, OSINT",
      studies: () =>
        "Academic Background & Learning Goals\n\nEducation:\n• Bachelor of Engineering in Computer Science (Currently pursuing)\n• Focus on cybersecurity and information security concepts\n\nLearning Goals:\n• CEH (Certified Ethical Hacker) - Planning to pursue\n• CompTIA Security+ - Foundation certification goal\n• OSCP (Offensive Security Certified Professional) - Long-term goal\n• Active participation in CTF challenges and security communities",
      blog: () =>
        "Learning Journey & Security Interests\n\nCurrently learning and exploring:\n• Cybersecurity fundamentals and concepts\n• Ethical hacking methodologies\n• Web security and OWASP Top 10\n• Network security and protocols\n• Security tools and frameworks\n\nFuture goals include contributing to security research and writing technical articles.",
      tools: () =>
        "Security Tools & Learning Projects\n\nLearning and experimenting with:\n• Security assessment tools and frameworks\n• Network analysis and monitoring tools\n• Web vulnerability scanners\n• Security automation scripts\n• Educational security projects\n\nFocusing on understanding how security tools work and developing basic security applications.",
      education: () =>
        "My Education\n\nBachelor of Engineering in Computer Science (Currently pursuing)\n\nRelevant coursework includes:\n• Computer Networks and Security\n• Operating Systems\n• Programming Fundamentals\n• Data Structures and Algorithms\n• Web Technologies\n• Database Management Systems\n\nCurrently learning cybersecurity concepts and ethical hacking methodologies.",
      // services and pentest removed per request
      ctf: () =>
        "Capture The Flag Learning Journey\n\nCurrently learning and participating in:\n• CTF challenges and competitions\n• Web exploitation and security testing\n• Reverse engineering concepts\n• Cryptography and encoding challenges\n• Network security challenges\n\nBuilding experience through hands-on practice and community participation.",
      contact: () =>
        "Contact Information\n\nEmail: srirambharath7@gmail.com\nGitHub: github.com/SriramBharath-7\nLinkedIn: linkedin.com/in/sriram-bharath-852335306/",
    };

    const htmlFormatters: Record<string, (text: string) => string> = {
      about: (text) => {
        return `<div class="about-section enhanced-about">
          <div class="section-title">About Me</div>
          <div class="section-content">${text}</div>
        </div>`;
      },
      skills: (text) => {
        const [title, ...contentLines] = text.split("\n\n");
        return `<div class="skills-section">
          <div class="section-title">${title}</div>
          <div class="section-content">${contentLines.join("\n\n")}</div>
        </div>`;
      },
      studies: (text) => {
        const [title, ...contentLines] = text.split("\n\n");
        return `<div class="studies-section">
          <div class="section-title">${title}</div>
          <div class="section-content">${contentLines.join("\n\n")}</div>
        </div>`;
      },
      blog: (text) => {
        const [title, ...contentLines] = text.split("\n\n");
        return `<div class="blog-section">
          <div class="section-title">${title}</div>
          <div class="section-content">${contentLines.join("\n\n")}</div>
        </div>`;
      },
      tools: (text) => {
        const [title, ...contentLines] = text.split("\n\n");
        return `<div class="tools-section">
          <div class="section-title">${title}</div>
          <div class="section-content">${contentLines.join("\n\n")}</div>
        </div>`;
      },
      services: undefined as never,
      pentest: undefined as never,
      ctf: (text) => {
        const [title, ...contentLines] = text.split("\n\n");
        return `<div class="ctf-section">
          <div class="section-title">${title}</div>
          <div class="section-content">${contentLines.join("\n\n")}</div>
        </div>`;
      },
      contact: (text) => {
        const [title, ...contentLines] = text.split("\n\n");
        return `<div class="contact-section">
          <div class="section-title">${title}</div>
          <div class="section-content">${contentLines.join("\n\n")}</div>
        </div>`;
      },
    };

    if (cmdLower === "") return "";

    if (command in commands) {
      const response = commands[command](args);

      if (["about", "contact", "ctf"].includes(command) && command in htmlFormatters) {
        // First set loading state to true and add loading indicator to history
        setIsLoading(true);
        setSpecialCommand(command);

        // Add a very minimal delay before starting the typing effect
        setTimeout(() => {
          // Start typing effect after loading
          typeText(response, () => {
            // After typing completes, replace with formatted HTML
            const formattedResponse = htmlFormatters[command](response);
            setHistory((prev) => {
              const newHistory = [...prev];
              // Replace the last item (which is the plain text) with formatted HTML
              if (newHistory.length > 0) {
                newHistory[newHistory.length - 1] = formattedResponse;
              }
              return newHistory;
            });
            setSpecialCommand(null);
            setIsLoading(false); // Set loading state to false when done
          });
        }, 150); // Extremely short delay

        return "";
      }

      return response;
    }

    return `<span class="error-message">Command not found: <span class="error-command">${cmd}</span>. Type <span class="suggestion">help</span> for available commands.</span>`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;

    setIsTyping(false); // Stop typing effect when command is executed
    setCommandHistory([...commandHistory, input]);
    setHistoryIndex(-1);

    if (input.trim().toLowerCase() === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    // Get the command type color class for the current input
    const commandColorClass = getCommandColor();

    // Add the command to history with Kali-style prompt, arrow on its own line
    setHistory([
      ...history,
      `<div class="command-line kali-prompt-block">
        <div class="kali-prompt-top">┌──(kali㉿kali)-[~]</div>
        <div class="kali-bottom"><span class="kali-arrow">└─$</span> <span class="user-command ${commandColorClass.replace(
        "text-",
        ""
        )}">${input}</span></div>
      </div>`,
    ]);

    const response = handleCommand(input);

    // Only add response to history if it's not a special command (which handles its own history)
    if (response && !specialCommand) {
      setHistory((prev) => [...prev, response]);
    }

    setInput("");
    setCommandType(null); // Reset command type after submission

    // Use smooth scrolling after submission
    scrollToBottom();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Add CTRL+C handler
    if (e.ctrlKey && e.key === "c") {
      e.preventDefault();

      // Clear any ongoing execution timeout
      if (executionTimeoutRef.current) {
        clearTimeout(executionTimeoutRef.current);
        executionTimeoutRef.current = null;
      }

      // Reset all execution states
      isExecutingRef.current = false;
      setIsTyping(false);
      setTypingText("");
      setInput("");
      setIsLoading(false);
      setSpecialCommand(null);

      // Add the CTRL+C indicator to history
      setHistory((prev) => [...prev, '<span class="system-message">^C</span>']);

      // Force scroll to bottom
      scrollToBottom();
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (
        commandHistory.length > 0 &&
        historyIndex < commandHistory.length - 1
      ) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    setIsTyping(true);

    // Extract the first word (command) from the input
    const command = value.trim().split(" ")[0].toLowerCase();

    // Check which category the command belongs to
    if (commandCategories.system.includes(command)) {
      setCommandType("system");
    } else if (commandCategories.portfolio.includes(command)) {
      setCommandType("portfolio");
    } else if (command === "") {
      setCommandType(null);
    } else {
      setCommandType("unknown");
    }
  };

  // Update initial position calculation
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Only set initial position once on first mount
      const { width, height } = getResponsiveSizes();
      // Convert vw/vh to pixels
      const parsedWidth = (parseFloat(width) / 100) * window.innerWidth;
      const parsedHeight = (parseFloat(height) / 100) * window.innerHeight;

      // Define waybar height constant
      const WAYBAR_HEIGHT = 48; // Height of the waybar at the top

      // Calculate exact center position only if we haven't manually positioned yet
      const hasCustomPosition = localStorage.getItem("terminal-position");

      if (!hasCustomPosition) {
        const centerX = (window.innerWidth - parsedWidth) / 2;
        const centerY = (window.innerHeight - parsedHeight) / 2;

        // Set initial centered position, ensuring it's below the waybar
        setPosition({
          x: Math.max(0, centerX),
          y: Math.max(WAYBAR_HEIGHT + 2, centerY), // Ensure it's below waybar with small padding
        });
      } else {
        try {
          const savedPosition = JSON.parse(hasCustomPosition);
          // Make sure saved position doesn't overlap waybar
          savedPosition.y = Math.max(WAYBAR_HEIGHT + 2, savedPosition.y);
          setPosition(savedPosition);
        } catch {
          // If parsing fails, fallback to initial position
          const centerX = (window.innerWidth - parsedWidth) / 2;
          const centerY = (window.innerHeight - parsedHeight) / 2;
          setPosition({
            x: Math.max(0, centerX),
            y: Math.max(WAYBAR_HEIGHT + 2, centerY), // Ensure it's below waybar
          });
        }
      }
    }

    inputRef.current?.focus();
    // Only run on initial mount, use empty dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined" && !terminalState.isMaximized) {
        const { width, height } = getResponsiveSizes();
        // Convert vw/vh to pixels
        const parsedWidth = (parseFloat(width) / 100) * window.innerWidth;
        const parsedHeight = (parseFloat(height) / 100) * window.innerHeight;

        // Define waybar height constant
        const WAYBAR_HEIGHT = 48; // Height of the waybar at the top

        // Only update sizes, not position - this prevents snapping back to center on resize
        setTerminalState((prev) => ({
          ...prev,
          width,
          height,
          maxWidth: getResponsiveSizes().maxWidth,
        }));

        // Ensure window stays on screen after resize and respects waybar
        setPosition((currentPos) => ({
          x: Math.min(
            Math.max(0, currentPos.x),
            window.innerWidth - parsedWidth
          ),
          y: Math.min(
            Math.max(WAYBAR_HEIGHT + 2, currentPos.y),
            window.innerHeight - parsedHeight
          ),
        }));
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [terminalState.isMaximized, getResponsiveSizes]);

  useEffect(() => {
    scrollToBottom();
  }, [history]);



  // Function to get the appropriate color class based on command type
  const getCommandColor = () => {
    switch (commandType) {
      case "system":
        return "text-blue-400";
      case "portfolio":
        return "text-purple-400";
      case "unknown":
        return "text-red-400";
      default:
        return "text-green-300";
    }
  };

  // Add this function to handle clicks on the terminal
  const handleTerminalClick = () => {
    // Only focus the input if we're not selecting text
    if (window.getSelection()?.toString() === "") {
      inputRef.current?.focus();
    }
  };

  // Add this function to ensure scrolling to bottom
  const scrollToBottom = () => {
    if (terminalRef.current) {
      // Use GSAP to scroll smoothly to the bottom
      gsap.to(terminalRef.current, {
        scrollTo: { y: "max", autoKill: true },
        duration: 0.4,
        ease: "power3.out",
        overwrite: true,
      });
    }
  };

  // Add a function to check if content needs scrolling
  const checkIfNeedsScrolling = () => {
    if (terminalRef.current) {
      const terminal = terminalRef.current;
      // Add a small buffer to prevent flickering
      const buffer = 5; // 5px buffer
      const needsScroll =
        terminal.scrollHeight > terminal.clientHeight + buffer;
      if (needsScroll !== needsScrolling) {
        setNeedsScrolling(needsScroll);
      }
    }
  };

  // Add a debounced version of the check function

  // Add scroll event listener
  useEffect(() => {
    const terminal = terminalRef.current;
    if (!terminal) return;

    const handleScroll = () => {
      const isScrollable = terminal.scrollHeight > terminal.clientHeight + 5;
      const isScrolled =
        terminal.scrollTop < terminal.scrollHeight - terminal.clientHeight - 5;

      if (isScrollable && needsScrolling !== isScrolled) {
        setNeedsScrolling(isScrolled);
      }
    };

    terminal.addEventListener("scroll", handleScroll);
    return () => terminal.removeEventListener("scroll", handleScroll);
  }, [needsScrolling]);

  // Update the useEffect to check if content needs scrolling
  useEffect(() => {
    // Use requestAnimationFrame to ensure DOM has updated
    const rafId = requestAnimationFrame(() => {
      checkIfNeedsScrolling();
    });

    return () => cancelAnimationFrame(rafId);
  }, [history, isTyping, typingText, isLoading]);

  // Window dragging handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (terminalState.isMaximized) return; // Don't allow dragging when maximized

    // Get the terminal window element
    const terminalWindow = e.currentTarget.parentElement as HTMLElement;
    if (!terminalWindow) return;

    // Get terminal window dimensions and position
    const terminalRect = terminalWindow.getBoundingClientRect();
    const terminalWidth = terminalRect.width;
    const terminalHeight = terminalRect.height;

    // Store initial mouse position
    const startX = e.clientX;
    const startY = e.clientY;

    // Store initial window position from DOM
    const initialLeft = terminalRect.left;
    const initialTop = terminalRect.top;

    // Set cursor style and disable transitions during drag
    document.body.style.cursor = "move";
    terminalWindow.style.transition = "none";

    // Prevent text selection during drag
    document.body.style.userSelect = "none";

    // Define boundary constants
    const WAYBAR_HEIGHT = 48; // Height of the waybar at the top
    const TASKBAR_PADDING = 2; // Small padding to prevent touching the taskbar

    // Calculate the max x position (right edge of screen minus terminal width)
    const maxX = window.innerWidth - terminalWidth;
    // Set minY to waybar height plus padding to prevent overlap
    const minY = WAYBAR_HEIGHT + TASKBAR_PADDING;
    const maxY = window.innerHeight - terminalHeight;

    // Mouse move handler
    function handleMouseMove(moveEvent: MouseEvent) {
      // Calculate new position
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      // Apply boundaries - ensure full window is visible including right edge
      // Also ensure the window doesn't overlap the waybar at the top
      const newX = Math.max(0, Math.min(maxX, initialLeft + dx));
      const newY = Math.max(minY, Math.min(maxY, initialTop + dy));

      // Update window position directly for immediate feedback
      terminalWindow.style.left = `${newX}px`;
      terminalWindow.style.top = `${newY}px`;

      // Prevent default to reduce input lag
      moveEvent.preventDefault();
    }

    // Mouse up handler
    function handleMouseUp() {
      // Re-enable transitions
      terminalWindow.style.transition =
        "transform 300ms ease-out, opacity 300ms ease-out, border-radius 300ms ease-out";
      document.body.style.userSelect = "";

      // Get final position from the actual window position
      const finalRect = terminalWindow.getBoundingClientRect();

      // Final position
      const finalPosition = {
        x: finalRect.left,
        y: finalRect.top,
      };

      // Update state with the final position when drag ends
      setPosition(finalPosition);

      // Save position to localStorage
      try {
        localStorage.setItem(
          "terminal-position",
          JSON.stringify(finalPosition)
        );
      } catch {
        // If localStorage fails, just continue
      }

      // Clean up
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
    }

    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    // Prevent default to avoid text selection
    e.preventDefault();
  };

  // Function to check if Firefox is minimized
  const hasFirefoxMinimized = (): boolean => {
    try {
      // Look for the Firefox indicator with class-based detection
      const firefoxIndicator = document.querySelector(
        ".firefox-taskbar-indicator"
      );
      return !!firefoxIndicator;
    } catch {
      return false;
    }
  };

  // Add this useEffect to add and remove event listeners
  useEffect(() => {
    return () => {
      // Cleanup function to ensure no dangling event listeners
      document.body.style.cursor = "";
    };
  }, []);

  // Add an effect to monitor Firefox indicator changes and update position
  useEffect(() => {
    if (!isMinimized) return;

    let lastFirefoxState = hasFirefoxMinimized();

    // Create polling function to check Firefox indicator state
    const checkFirefoxIndicator = () => {
      const currentFirefoxState = hasFirefoxMinimized();
      if (currentFirefoxState !== lastFirefoxState) {
        lastFirefoxState = currentFirefoxState;
        // Force re-render without actually changing the state value
        setIsMinimized(isMinimized);
      }
    };

    // Set up polling interval to check regularly
    const intervalId = setInterval(checkFirefoxIndicator, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, [isMinimized]);

  // Effect to position the indicator correctly
  useEffect(() => {
    if (!isMinimized || !terminalIndicatorRef.current) return;

    const updatePosition = () => {
      const archLogo = document.querySelector(
        ".arch-logo"
      ) as HTMLElement | null;
      const firefoxIndicator = document.querySelector(
        ".firefox-taskbar-indicator"
      ) as HTMLElement | null;

      if (archLogo) {
        // Position Terminal indicator right after the arch logo
        const archLogoRect = archLogo.getBoundingClientRect();
        const startPosition = archLogoRect.right + 10; // 10px gap
        terminalIndicatorRef.current!.style.left = `${startPosition}px`;

        // Position Firefox indicator if it exists
        if (firefoxIndicator) {
          const terminalRect =
            terminalIndicatorRef.current!.getBoundingClientRect();
          firefoxIndicator.style.left = `${terminalRect.right}px`;
        }
      } else {
        // Fallback position if arch logo not found
        terminalIndicatorRef.current!.style.left = "80px";

        if (firefoxIndicator) {
          firefoxIndicator.style.left = "160px";
        }
      }
    };

    // Update position initially
    updatePosition();

    // Check periodically to ensure correct positioning
    const intervalId = setInterval(updatePosition, 300);

    // Also update on window resize
    window.addEventListener("resize", updatePosition);

    // Set up MutationObserver to detect when Firefox indicator is added or removed
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList" || mutation.type === "attributes") {
          updatePosition();
        }
      });
    });

    // Observe the active-apps container
    const activeApps = document.querySelector(".active-apps");
    if (activeApps) {
      observer.observe(activeApps, {
        childList: true,
        subtree: true,
        attributes: true,
      });
    }

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", updatePosition);
      observer.disconnect();
    };
  }, [isMinimized]);

  // Add window resize handler
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      // Update terminal size when not maximized
      if (!terminalState.isMaximized) {
        const { width, height, maxWidth } = getResponsiveSizes();
        setTerminalState((prev) => ({
          ...prev,
          width,
          height,
          maxWidth,
        }));

        // Adjust position if terminal would go off screen
        if (position.x + parseFloat(width) > window.innerWidth) {
          setPosition((prev) => ({
            ...prev,
            x: Math.max(0, window.innerWidth - parseFloat(width)),
          }));
        }
        if (position.y + parseFloat(height) > window.innerHeight) {
          setPosition((prev) => ({
            ...prev,
            y: Math.max(56, window.innerHeight - parseFloat(height)),
          }));
        }
      }
    };

    // Initialize sizes
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terminalState.isMaximized]);

  return (
    <>
      {terminalState.isOpen ? (
        <div
          className="terminal-window fixed bg-black/60 backdrop-blur-lg text-slate-200 font-mono text-sm rounded-lg overflow-hidden border border-slate-600/30 shadow-xl z-40"
          style={{
            height: terminalState.height,
            width: terminalState.width,
            maxWidth: terminalState.maxWidth,
            transition: terminalState.isMaximized
              ? "none"
              : "all 0.3s ease-in-out",
            top: terminalState.isMaximized ? "56px" : `${position.y}px`,
            left: terminalState.isMaximized ? "0" : `${position.x}px`,
            zIndex: 45,
            backdropFilter: isFocused ? "blur(10px)" : "blur(12px)",
            boxShadow: isFocused
              ? "0 0 20px rgba(0, 0, 0, 0.6), 0 0 30px rgba(51, 65, 85, 0.35), inset 0 0 30px rgba(51, 65, 85, 0.2)"
              : "0 0 20px rgba(0, 0, 0, 0.6), 0 0 30px rgba(30, 41, 59, 0.3), inset 0 0 30px rgba(30, 41, 59, 0.18)",
            borderRadius: terminalState.isMaximized ? "0" : "8px",
          }}
          onClick={handleTerminalClick}
        >
          {/* Terminal title bar - make it draggable */}
          <div
            className="terminal-titlebar p-2 cursor-move bg-slate-900/85 backdrop-blur-sm border-b border-slate-700/40"
            onMouseDown={handleMouseDown}
          >
            <div className="flex items-center w-full">
              <div className="flex-1"></div>
              <div className="kali-title flex-shrink-0 text-gray-200/90 text-sm">
                kali@kali: ~
              </div>
              <div className="flex-1 flex justify-end items-center space-x-1.5">
                <button
                  type="button"
                  className="px-1.5 py-0.5 rounded hover:bg-slate-700/60 text-slate-200/80 hover:text-white transition-colors"
                onClick={handleMinimize}
                title="Minimize"
              >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path d="M4 10.5h12a.5.5 0 0 1 0 1H4a.5.5 0 0 1 0-1Z" />
                </svg>
                </button>
                <button
                  type="button"
                  className="px-1.5 py-0.5 rounded hover:bg-slate-700/60 text-slate-200/80 hover:text-white transition-colors"
                onClick={handleMaximize}
                title="Maximize"
              >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path d="M6 5h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1 2v6h6V7H7Z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="px-1.5 py-0.5 rounded hover:bg-slate-700/60 text-slate-200/80 hover:text-white transition-colors"
                  onClick={handleClose}
                  title="Close"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M6.28 6.28a.75.75 0 0 1 1.06 0L10 8.94l2.66-2.66a.75.75 0 1 1 1.06 1.06L11.06 10l2.66 2.66a.75.75 0 1 1-1.06 1.06L10 11.06l-2.66 2.66a.75.75 0 1 1-1.06-1.06L8.94 10 6.28 7.34a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
                </button>
              </div>
            </div>
          </div>
          <div
            ref={terminalRef}
            className={`terminal-output flex-1 p-4 ${
              needsScrolling ? "custom-scrollbar" : "no-scrollbar"
            } bg-gradient-to-b from-slate-950/70 to-slate-900/60`}
            style={{
              display: terminalState.height === "40px" ? "none" : "block",
              maxHeight: "calc(100% - 65px)",
              overscrollBehavior: "contain",
              overflowY: "scroll",
              backgroundImage: isFocused
                ? "radial-gradient(circle at 50% 50%, rgba(100, 116, 139, 0.08), transparent 25%)"
                : "radial-gradient(circle at 50% 50%, rgba(30, 41, 59, 0.06), transparent 25%)",
              boxShadow: isFocused
                ? "inset 0 0 30px rgba(71, 85, 105, 0.28)"
                : "inset 0 0 30px rgba(30, 41, 59, 0.28)",
              padding: "16px 20px",
              filter: "none",
              transition: "filter 0.2s ease-in-out",
            }}
          >
            {history.map((line, i) => (
              <div
                key={i}
                className="mb-1 break-words whitespace-pre-wrap"
                dangerouslySetInnerHTML={{
                  __html: line,
                }}
              />
            ))}
            {isTyping && !isLoading && (
              <div className="mb-1 break-words whitespace-pre-wrap">
                {typingText}
                {blinkCursor && !input && <span className="cursor">_</span>}
              </div>
            )}
            {isLoading && (
              <div className="loading-container mb-3 mt-2">
                <div className="terminal-loading">
                  <div className="loading-header flex items-center mb-1">
                    <div className="loading-icon mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-blue-500 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                    </div>
                    <div className="loading-text text-blue-400 font-mono text-sm">
                      {specialCommand
                        ? `Loading ${specialCommand} data...`
                        : "Processing..."}
                    </div>
                  </div>
                  <div className="loading-progress-container h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                    <div className="loading-progress-bar h-full bg-gradient-to-r from-blue-500 to-cyan-400 animate-loading-progress"></div>
                  </div>
                  <div className="loading-details mt-1">
                    <div className="text-xs text-gray-500 font-mono flex justify-between">
                      <span>Decrypting data</span>
                      <span className="text-blue-400 loading-percentage">
                        <span className="animate-pulse">...</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Inline prompt input at the bottom of output */}
            <form onSubmit={handleSubmit} className="mt-2">
              <div className="kali-prompt-top text-cyan-300 text-sm mb-1 select-none">┌──(kali㉿kali)-[~]</div>
              <div className="flex items-center">
                <span className="kali-arrow mr-3 text-cyan-300 text-base select-none">└─$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              onBlur={handleBlur}
                  className={`flex-1 bg-transparent outline-none px-0 py-0 ${getCommandColor()} terminal-input`}
              autoFocus
              placeholder="Type a command..."
            />
              </div>
          </form>
          </div>
        </div>
      ) : (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={() =>
              setTerminalState((prev) => ({ ...prev, isOpen: true }))
            }
            className="bg-blue-500 hover:bg-blue-600 text-black p-2 rounded-full shadow-lg"
            title="Open Terminal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h14M12 5v14"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Taskbar indicator for minimized terminal - positioned in the waybar at top left */}
      {isMinimized && (
        <div
          ref={terminalIndicatorRef}
          className="terminal-taskbar-indicator fixed top-0 z-[101] h-12 px-3 flex items-center justify-center cursor-pointer hover:bg-gray-700/50 transition-colors border-b-2 border-transparent hover:border-blue-500"
          onClick={handleRestore}
          style={{
            left: "80px", // Default position is right after the arch logo
            width: "80px", // Fixed width
            transition:
              "left 0.2s ease, background-color 0.2s ease, border-color 0.2s ease",
          }}
        >
          <div className="flex items-center space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l3 3-3 3m5 0h3"
              />
            </svg>
            <span className="text-xs text-blue-400">Terminal</span>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes loadingProgress {
          0% {
            width: 0%;
          }
          20% {
            width: 20%;
          }
          40% {
            width: 40%;
          }
          60% {
            width: 60%;
          }
          80% {
            width: 80%;
          }
          95% {
            width: 95%;
          }
          100% {
            width: 98%;
          }
        }

        .animate-loading-progress {
          animation: loadingProgress 0.2s ease-in-out forwards;
        }

        .loading-container {
          background-color: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 6px;
          padding: 16px;
          max-width: 100%;
          box-shadow: 0 0 10px rgba(0, 50, 100, 0.1);
          margin: 12px 0;
        }

        .loading-percentage::after {
          content: "";
          animation: percentageCount 0.2s linear forwards;
        }

        @keyframes percentageCount {
          0% {
            content: "0%";
          }
          20% {
            content: "20%";
          }
          40% {
            content: "40%";
          }
          60% {
            content: "60%";
          }
          80% {
            content: "80%";
          }
          95% {
            content: "95%";
          }
          100% {
            content: "98%";
          }
        }

        /* Style the prompt to enhance visibility and spacing */
        .prompt.terminal-glow {
          font-weight: bold;
          padding: 0 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 20px;
          height: 26px;
          background-color: rgba(0, 0, 0, 0.4);
          border-radius: 4px;
          border-left: 2px solid rgba(255, 255, 150, 0.4);
        }

        /* Command success animation */
        @keyframes commandSuccess {
          0% {
            background-color: rgba(0, 255, 0, 0.1);
          }
          50% {
            background-color: rgba(0, 255, 0, 0.2);
          }
          100% {
            background-color: transparent;
          }
        }

        .command-success {
          animation: commandSuccess 1s ease-out;
        }

        /* Command error animation */
        @keyframes commandError {
          0% {
            background-color: rgba(255, 0, 0, 0.1);
          }
          50% {
            background-color: rgba(255, 0, 0, 0.2);
          }
          100% {
            background-color: transparent;
          }
        }

        .command-error {
          animation: commandError 1s ease-out;
        }

        /* Terminal window appearance enhancement */
        .terminal-window {
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 50, 0, 0.2),
            inset 0 0 10px rgba(0, 50, 0, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 10px;
          overflow: hidden;
        }

        .error-message {
          color: #ff6b6b;
          padding: 2px 4px;
          border-radius: 3px;
          background-color: rgba(255, 0, 0, 0.1);
          font-weight: 500;
        }

        .system-message {
          color: #4ade80;
          padding: 2px 4px;
          border-radius: 3px;
          background-color: rgba(0, 255, 0, 0.05);
          border-left: 2px solid rgba(74, 222, 128, 0.5);
          font-weight: 500;
        }

        .suggestion {
          color: #60a5fa;
          background-color: rgba(0, 100, 255, 0.1);
          padding: 0 4px;
          border-radius: 3px;
          font-family: monospace;
        }

        .ls-output {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          padding: 12px;
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          margin: 8px 0;
        }

        .directory-item {
          color: #60a5fa;
          background-color: rgba(0, 100, 255, 0.1);
          padding: 4px 8px;
          border-radius: 3px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .file-item {
          color: #e2e8f0;
          padding: 4px 8px;
          border-radius: 3px;
          background-color: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .help-title-text {
          color: #10b981;
          font-weight: bold;
          text-shadow: 0 0 5px rgba(16, 185, 129, 0.5);
        }

        .help-section-text {
          color: #60a5fa;
          font-weight: bold;
          text-shadow: 0 0 5px rgba(96, 165, 250, 0.5);
        }

        .cmd-name {
          color: #f59e0b;
          text-shadow: 0 0 3px rgba(245, 158, 11, 0.5);
        }

        .cmd-desc {
          color: #e2e8f0;
        }

        /* New animated help styles */
        .help-container {
          background: rgba(15, 23, 42, 0.35);
          border: 1px solid rgba(100, 116, 139, 0.25);
          border-radius: 8px;
          padding: 12px 14px;
          margin: 8px 0 10px 0;
          box-shadow: inset 0 0 20px rgba(2, 6, 23, 0.25);
          white-space: normal;
        }
        .help-title {
          color: #93c5fd;
          font-weight: 700;
          letter-spacing: 0.02em;
          margin-bottom: 8px;
          text-shadow: 0 0 6px rgba(59, 130, 246, 0.35);
          animation: typingTitle 1.2s steps(18, end) 0.1s 1 both, blink 1s step-end 3;
          overflow: hidden;
          white-space: nowrap;
          border-right: 2px solid rgba(147, 197, 253, 0.6);
          width: 0;
        }
        @keyframes typingTitle { to { width: 210px; } }
        @keyframes blink { 50% { border-color: transparent; } }
        .help-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px 120px; /* more space between columns */
        }
        .help-row {
          display: grid;
          grid-template-columns: 240px 16px 1fr; /* fixed command width, separator, description */
          column-gap: 24px;
          align-items: baseline;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          opacity: 0;
          transform: translateY(6px);
          animation: helpFadeIn 280ms ease-out forwards;
          line-height: 1.3;
          margin: 0;
          padding: 0;
        }
        .hc-cmd {
          color: #67e8f9 !important; /* cyan */
          text-indent: 8px;
          font-weight: 700;
          text-shadow: 0 0 6px rgba(103, 232, 249, 0.25);
        }
        .hc-sep { color: #64748b; text-align: center; }
        .hc-desc {
          color: #c7d2fe;
          font-weight: 600;
          justify-self: start;
        }

        /* Responsive help grid to avoid scrolling */
        @media (min-width: 920px) {
          .help-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px 80px; }
        }
        @media (min-width: 1280px) {
          .help-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 6px 96px; }
        }
        @keyframes helpFadeIn {
          to { opacity: 1; transform: translateY(0); }
        }

        /* Custom scrollbar styles */
        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          margin: 4px 0;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.55);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.8);
        }

        /* Hide scrollbar when not needed */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .no-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }

        /* Terminal output styles */
        .terminal-output {
          scroll-behavior: auto;
          line-height: 1.6;
        }

        /* Fixed width pre for help command */
        .fixed-width-pre {
          min-width: 100%;
          width: max-content;
          max-width: 100%;
          overflow-x: auto;
          white-space: pre;
          font-family: monospace;
          margin: 0;
          padding: 0;
        }

        /* Help menu styling */
        .no-blink-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.6) !important;
          transition: none !important;
        }

        .no-blink-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.35) !important;
          transition: none !important;
        }

        /* Prevent layout shifts */
        .terminal-output {
          scroll-behavior: auto;
          overflow-y: scroll; /* Always show scrollbar space */
        }

        /* Sticky input at bottom of terminal */
        .sticky-input {
          position: sticky;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.8);
          padding: 8px 0;
          margin-top: auto;
          z-index: 10;
        }

        /* Ensure terminal container uses flex layout */
        .terminal-window {
          display: flex;
          flex-direction: column;
        }

        .terminal-output {
          flex: 1;
          overflow-y: auto;
        }

        /* Glowing cursor animation */
        @keyframes cursorBlink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        .cursor {
          display: inline-block;
          width: 8px;
          height: 16px;
          background-color: #22d3ee;
          vertical-align: middle;
          animation: cursorBlink 1s infinite;
          margin-left: 2px;
        }

        /* Custom output styling */
        .user-command {
          font-weight: bold;
        }

        .blue-400 {
          color: #60a5fa;
        }
        .purple-400 {
          color: #a78bfa;
        }
        .red-400 {
          color: #f87171;
        }
        .green-300 {
          color: #86efac;
        }

        .whoami-output {
          background-color: rgba(0, 0, 0, 0.3);
          border-left: 3px solid #10b981;
          padding: 12px 16px;
          margin: 8px 0;
          border-radius: 0 4px 4px 0;
        }

        .user-info {
          display: block;
          margin-bottom: 4px;
          font-size: 0.95em;
        }

        .user-value {
          color: #60a5fa;
          font-weight: 500;
        }

        /* Banner glitch effect */
        .crypter-banner {
          color: #10b981;
          font-family: monospace;
          position: relative;
          display: inline-block;
          text-shadow: 0 0 5px rgba(16, 185, 129, 0.5);
          margin: 8px 0;
        }

        .crypter-banner::before {
          content: attr(data-text);
          position: absolute;
          left: -2px;
          text-shadow: 2px 0 #ff00ff;
          top: 0;
          color: #10b981;
          background: transparent;
          overflow: hidden;
          animation: noise-anim 2s infinite linear alternate-reverse;
          clip-path: inset(0 0 0 0);
          opacity: 0.5;
        }

        .crypter-banner::after {
          content: attr(data-text);
          position: absolute;
          left: 2px;
          text-shadow: -2px 0 #00ffff;
          top: 0;
          color: #10b981;
          background: transparent;
          overflow: hidden;
          animation: noise-anim 1s infinite linear alternate-reverse;
          clip-path: inset(0 0 0 0);
          opacity: 0.5;
        }

        @keyframes noise-anim {
          0% {
            clip-path: inset(40% 0 61% 0);
          }
          20% {
            clip-path: inset(92% 0 1% 0);
          }
          40% {
            clip-path: inset(43% 0 1% 0);
          }
          60% {
            clip-path: inset(25% 0 58% 0);
          }
          80% {
            clip-path: inset(54% 0 7% 0);
          }
          100% {
            clip-path: inset(58% 0 43% 0);
          }
        }

        /* Section styling */
        .about-section,
        .services-section,
        .pentest-section,
        .ctf-section,
        .contact-section {
          background-color: rgba(0, 0, 0, 0.3);
          border-radius: 6px;
          margin: 12px 0;
          padding: 16px;
          border: 1px solid rgba(74, 222, 128, 0.2);
        }

        .section-title {
          color: #10b981;
          font-size: 1.1em;
          font-weight: bold;
          margin-bottom: 12px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(74, 222, 128, 0.2);
        }

        .section-content {
          white-space: pre-line;
          color: #e2e8f0;
          line-height: 1.5;
        }

        .tools-section {
          border-left: 3px solid #ff5722;
        }

        .skills-section {
          border-left: 3px solid #3498db;
        }

        .studies-section {
          border-left: 3px solid #9b59b6;
        }

        .blog-section {
          border-left: 3px solid #2ecc71;
        }

        /* Welcome message styling */
        .welcome-message {
          color: #f0e68c;
          display: block;
          padding: 12px 16px;
          background-color: rgba(0, 0, 0, 0.3);
          border-radius: 4px;
          margin: 10px 0;
          border-left: 3px solid #f0e68c;
        }

        .command-hint {
          background-color: rgba(0, 0, 0, 0.3);
          padding: 2px 6px;
          border-radius: 3px;
          color: #10b981;
          font-weight: bold;
        }

        .directory-item::before {
          content: "📁";
          font-size: 0.9em;
        }

        .file-item::before {
          content: "📄";
          font-size: 0.9em;
        }

        /* Special terminal text glow effect */
        .terminal-glow {
          text-shadow: 0 0 5px rgba(236, 252, 2, 0.7),
            0 0 10px rgba(236, 252, 2, 0.5);
        }

        /* Command history styling */
        .command-line {
          display: flex;
          flex-direction: column; /* stack prompt and arrow on separate lines */
          align-items: flex-start;
          gap: 2px;
          margin: 6px 0;
          padding-left: 0;
          margin-left: 0;
        }
        /* Ensure styles apply to HTML injected via dangerouslySetInnerHTML */
        :global(.command-line) {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
          margin: 6px 0;
        }

        .prompt-wrapper {
          display: inline-block;
          min-width: 30px;
          margin-right: 10px;
          text-align: center;
        }

        .command-line .user-command {
          padding-left: 4px;
          font-weight: bold;
        }

        .command-line .prompt {
          color: #f0e68c;
          font-weight: bold;
        }

        /* Animated border for input - always on instead of just on focus */
        @keyframes borderPulse {
          0% {
            border-color: rgba(74, 222, 128, 0.3);
            box-shadow: 0 0 5px rgba(74, 222, 128, 0.2),
              inset 0 0 3px rgba(74, 222, 128, 0.1);
          }
          50% {
            border-color: rgba(74, 222, 128, 0.8);
            box-shadow: 0 0 10px rgba(74, 222, 128, 0.5),
              inset 0 0 8px rgba(74, 222, 128, 0.2);
          }
          100% {
            border-color: rgba(74, 222, 128, 0.3);
            box-shadow: 0 0 5px rgba(74, 222, 128, 0.2),
              inset 0 0 3px rgba(74, 222, 128, 0.1);
          }
        }

        /* More advanced animated gradient border */
        @keyframes gradientBorder {
          0% {
            border-image-source: linear-gradient(
              45deg,
              rgba(124, 58, 237, 0.7),
              rgba(139, 92, 246, 0.1),
              rgba(91, 33, 182, 0.7)
            );
          }
          25% {
            border-image-source: linear-gradient(
              90deg,
              rgba(91, 33, 182, 0.7),
              rgba(124, 58, 237, 0.7),
              rgba(139, 92, 246, 0.1)
            );
          }
          50% {
            border-image-source: linear-gradient(
              135deg,
              rgba(139, 92, 246, 0.1),
              rgba(91, 33, 182, 0.7),
              rgba(124, 58, 237, 0.7)
            );
          }
          75% {
            border-image-source: linear-gradient(
              180deg,
              rgba(124, 58, 237, 0.7),
              rgba(139, 92, 246, 0.1),
              rgba(91, 33, 182, 0.7)
            );
          }
          100% {
            border-image-source: linear-gradient(
              225deg,
              rgba(91, 33, 182, 0.7),
              rgba(124, 58, 237, 0.7),
              rgba(139, 92, 246, 0.1)
            );
          }
        }

        /* Combine both animations for a more striking effect */
        .animated-border {
          border-width: 1px;
          border-style: solid;
          border-radius: 9999px;
          border-image-slice: 1;
          border-image-source: linear-gradient(
            45deg,
            rgba(71, 85, 105, 0.6),
            rgba(51, 65, 85, 0.2),
            rgba(30, 41, 59, 0.6)
          );
          animation: gradientBorder 3s infinite linear,
            borderPulse 2s infinite ease-in-out;
          transition: all 0.3s ease;
          padding: 8px 16px;
        }

        .animated-border:focus {
          background-color: transparent;
          border-width: 1px;
          box-shadow: none;
        }

        /* Kali-style prompt visuals */
        .kali-prompt-top {
          color: #22d3ee;
          text-shadow: 0 0 4px rgba(34, 211, 238, 0.35);
        }
        :global(.kali-prompt-top) { color: #22d3ee; }
        .kali-arrow {
          color: #67e8f9;
          text-shadow: 0 0 4px rgba(103, 232, 249, 0.3);
        }
        :global(.kali-arrow) { color: #67e8f9; }
        .kali-prompt-block {
          margin: 6px 0 2px 0;
        }
        .kali-top {
          color: #22d3ee;
          font-weight: 600;
        }
        .kali-bottom {
          display: flex;
          align-items: center;
        }
        :global(.kali-bottom) {
          display: flex;
          align-items: center;
        }
        :global(.user-command) { font-weight: 700; }

        /* Kali-like menubar */
        .kali-menubar .kali-menu-item {
          padding: 2px 6px;
          border-radius: 4px;
          transition: background-color 0.15s ease, color 0.15s ease;
        }
        .kali-menubar .kali-menu-item:hover {
          background-color: rgba(30, 58, 138, 0.5);
          color: #e0f2fe;
        }
        .kali-title {
          text-shadow: 0 0 3px rgba(226, 232, 240, 0.35);
        }

        /* Add a hint of floating animation to the entire input container */
        @keyframes subtleFloat {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
          100% {
            transform: translateY(0);
          }
        }

        /* Add animation to the prompt as well for a coordinated effect */
        .prompt.terminal-glow {
          animation: subtleFloat 4s infinite ease-in-out,
            glowPulse 2s infinite alternate;
        }

        @keyframes glowPulse {
          0% {
            text-shadow: 0 0 5px rgba(236, 252, 2, 0.5),
              0 0 8px rgba(236, 252, 2, 0.3);
          }
          100% {
            text-shadow: 0 0 8px rgba(236, 252, 2, 0.8),
              0 0 12px rgba(236, 252, 2, 0.5);
          }
        }

        .enhanced-about {
          border-width: 1px;
          border-style: solid;
          border-image: linear-gradient(
              to right,
              #3498db,
              #2ecc71,
              #9b59b6,
              #ff5722
            )
            1;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.4),
            rgba(0, 0, 0, 0.3)
          );
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.3);
        }

        .about-section-title {
          display: block;
          color: #10b981;
          font-weight: bold;
          font-size: 1.1em;
          margin-top: 15px;
          margin-bottom: 5px;
          text-decoration: underline;
          text-underline-offset: 5px;
          text-decoration-color: rgba(16, 185, 129, 0.5);
        }

        .lang-python {
          color: #3572a5;
          font-weight: bold;
        }
        .lang-c {
          color: #f34b7d;
          font-weight: bold;
        }
        .lang-bash {
          color: #89e051;
          font-weight: bold;
        }
        .lang-ps {
          color: #012456;
          font-weight: bold;
        }
        .lang-go {
          color: #00add8;
          font-weight: bold;
        }
        .lang-rust {
          color: #dea584;
          font-weight: bold;
        }

        .skill-highlight {
          color: #60a5fa;
          font-weight: bold;
          background-color: rgba(0, 0, 0, 0.2);
          padding: 1px 5px;
          border-radius: 3px;
        }

        .service-category {
          display: block;
          color: #ff9800;
          font-weight: bold;
          font-size: 1.05em;
          margin-top: 15px;
          margin-bottom: 8px;
          text-decoration: underline;
          text-underline-offset: 4px;
          text-decoration-color: rgba(255, 152, 0, 0.5);
        }

        .service-name {
          color: #f0e68c;
          font-weight: bold;
          background-color: rgba(0, 0, 0, 0.25);
          padding: 1px 5px;
          border-radius: 3px;
        }

        .services-section {
          border-width: 1px;
          border-style: solid;
          border-image: linear-gradient(to right, #ff5722, #ffeb3b, #ff9800) 1;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.4),
            rgba(0, 0, 0, 0.3)
          );
          box-shadow: 0 0 15px rgba(255, 87, 34, 0.2);
          position: relative;
          overflow: hidden;
        }

        .services-section::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
              circle at 10% 20%,
              rgba(255, 87, 34, 0.05) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 90% 80%,
              rgba(255, 152, 0, 0.07) 0%,
              transparent 40%
            ),
            radial-gradient(
              circle at 50% 50%,
              rgba(255, 235, 59, 0.03) 0%,
              transparent 70%
            );
          pointer-events: none;
          z-index: 0;
        }

        .services-section .section-title,
        .services-section .section-content {
          position: relative;
          z-index: 1;
        }

        /* Add a subtle texture overlay */
        .services-section::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Cpath d='M1 3h1v1H1V3zm2-2h1v1H3V1z' fill='rgba(255,255,255,0.025)'/%3E%3C/svg%3E");
          opacity: 0.5;
          pointer-events: none;
          z-index: 0;
        }

        .focused-input { }
        .focused-input.animated-border { }

        .cert-status {
          display: inline-block;
          margin-left: 8px;
          font-size: 0.9em;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: bold;
        }

        .cert-status.completed {
          background-color: rgba(16, 185, 129, 0.2);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .cert-status.planned {
          background-color: rgba(245, 158, 11, 0.2);
          color: #f59e0b;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }
      `}</style>
    </>
  );
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleHelpCommand = (args: string[]) => {
  // Animated help list with fade/slide items instead of ASCII box
  const items = [
    { cmd: 'help', desc: 'Show this command reference' },
    { cmd: 'clear', desc: 'Clear the terminal display' },
    { cmd: 'ls', desc: 'List accessible files and directories' },
    { cmd: 'exit', desc: 'Exit the terminal' },
    { cmd: 'about', desc: 'Display profile information' },
    { cmd: 'education', desc: 'My Education' },
    { cmd: 'skills', desc: 'My Tech Skills' },
    { cmd: 'projects', desc: 'View GitHub projects in Firefox' },
    { cmd: 'ctf', desc: 'View CTF achievements and writeups' },
    { cmd: 'contact', desc: 'Display contact information' },
    { cmd: 'blog', desc: 'Visit my blog' },
  ];

  const list = items
    .map(
      (it, idx) =>
        `<div class="help-row" style="animation-delay:${idx * 60}ms">` +
        `<span class="hc-cmd">${it.cmd}</span>` +
        `<span class="hc-sep">&nbsp;-&nbsp;</span>` +
        `<span class="hc-desc">${it.desc}</span>` +
        `</div>`
    )
    .join("");

  return `<div class="help-container">
    <div class="help-title">Available Commands</div>
    <div class="help-grid">${list}</div>
  </div>`;
};