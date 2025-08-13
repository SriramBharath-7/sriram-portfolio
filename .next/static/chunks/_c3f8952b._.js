(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/constants/terminal.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "CRYPTER": (()=>CRYPTER)
});
const CRYPTER = `
  _____                  _            
 / ____|                | |           
| |     _ __ _   _ _ __ | |_ ___ _ __ 
| |    | '__| | | | '_ \\| __/ _ \\ '__|
| |____| |  | |_| | |_) | ||  __/ |   
 \\_____|_|   \\__, | .__/ \\__\\___|_|   
              __/ | |                 
             |___/|_|                 
`;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/Terminal.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Terminal)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$terminal$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/terminal.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollToPlugin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollToPlugin.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
// Register ScrollToPlugin for smooth scrolling
if ("TURBOPACK compile-time truthy", 1) {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollToPlugin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollToPlugin"]);
}
// Add responsive sizing constants
const RESPONSIVE_SIZES = {
    small: {
        width: "95vw",
        height: "60vh",
        maxWidth: "600px"
    },
    medium: {
        width: "85vw",
        height: "65vh",
        maxWidth: "800px"
    },
    large: {
        width: "75vw",
        height: "70vh",
        maxWidth: "1200px"
    }
};
function Terminal({ onClose, onOpenFirefox, initialPosition }) {
    _s();
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [history, setHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [commandHistory, setCommandHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [historyIndex, setHistoryIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(-1);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const terminalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [typingText, setTypingText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isTyping, setIsTyping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [blinkCursor, setBlinkCursor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [terminalState, setTerminalState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        isOpen: true,
        isMaximized: false,
        height: "70vh",
        width: "100%",
        maxWidth: "1200px"
    });
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [specialCommand, setSpecialCommand] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [commandType, setCommandType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isMinimized, setIsMinimized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [needsScrolling, setNeedsScrolling] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Add these state variables at the top with other state declarations
    const [position, setPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialPosition || {
        x: 0,
        y: 0
    });
    // Create a ref for the taskbar indicator
    const terminalIndicatorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Add window size state
    const [windowSize, setWindowSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        width: ("TURBOPACK compile-time truthy", 1) ? window.innerWidth : ("TURBOPACK unreachable", undefined),
        height: ("TURBOPACK compile-time truthy", 1) ? window.innerHeight : ("TURBOPACK unreachable", undefined)
    });
    const [isFocused, setIsFocused] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Add a ref to track ongoing executions
    const executionTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isExecutingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Add this with other handlers
    const handleFocus = ()=>{
        setIsFocused(true);
    };
    const handleBlur = ()=>{
        setIsFocused(false);
        setIsTyping(false);
    };
    // Define command categories with their respective colors
    const commandCategories = {
        system: [
            "help",
            "clear",
            "banner",
            "whoami",
            "ls",
            "exit",
            "projects",
            "toolspage"
        ],
        portfolio: [
            "about",
            "services",
            "pentest",
            "ctf",
            "contact"
        ]
    };
    // Add function to get responsive sizes
    const getResponsiveSizes = ()=>{
        if (windowSize.width < 768) {
            return RESPONSIVE_SIZES.small;
        } else if (windowSize.width < 1024) {
            return RESPONSIVE_SIZES.medium;
        }
        return RESPONSIVE_SIZES.large;
    };
    const handleClose = ()=>{
        // If an onClose prop is provided, call it instead of the fake close animation
        if (onClose) {
            onClose();
            return;
        }
        // Existing close animation code for when terminal is used standalone
        const lastMessage = history[history.length - 1] || "";
        const isAlreadyShowing = lastMessage.includes("Nice try!");
        if (!isAlreadyShowing) {
            setHistory((prev)=>[
                    ...prev,
                    `<span class="error-message">Nice try! You can't escape that easily...</span>`,
                    `<span class="system-message">System override: Terminal will remain active.</span>`
                ]);
            if (terminalRef.current) {
                terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
            }
        }
        setTimeout(()=>{
            setTerminalState((prev)=>({
                    ...prev,
                    isOpen: false
                }));
            setTimeout(()=>{
                setTerminalState((prev)=>({
                        ...prev,
                        isOpen: true
                    }));
            }, 800);
        }, 1000);
    };
    const handleMinimize = ()=>{
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
                terminalWindow.style.transform = "translateY(-100%)";
                terminalWindow.style.opacity = "0";
                // After animation completes, hide the window
                setTimeout(()=>{
                    console.log('Terminal: Animation complete, hiding window');
                    terminalWindow.style.display = "none";
                // No event listeners added here at all
                }, 300);
            }
        } else {
            console.log('Terminal: Could not find terminal window element!');
        }
    };
    // Add a separate function to handle restoring the terminal
    const handleRestore = ()=>{
        const terminalWindow = document.querySelector(".terminal-window");
        if (terminalWindow && terminalWindow.classList.contains("minimized")) {
            // Show and restore the window
            terminalWindow.style.display = "flex";
            terminalWindow.style.opacity = "0";
            terminalWindow.style.transform = "translateY(-100%)";
            // Force reflow
            void terminalWindow.offsetWidth;
            // Animate back in from the top
            terminalWindow.style.transform = "";
            terminalWindow.style.opacity = "";
            // Set state back to not minimized
            setIsMinimized(false);
            // Remove minimized class after animation completes
            setTimeout(()=>{
                terminalWindow.classList.remove("minimized");
            }, 300);
        }
    };
    // Modify the maximize handler
    const handleMaximize = ()=>{
        setTerminalState((prev)=>{
            if (prev.isMaximized) {
                // Return to responsive size when un-maximizing
                const { width, height, maxWidth } = getResponsiveSizes();
                return {
                    ...prev,
                    isMaximized: false,
                    height,
                    width,
                    maxWidth
                };
            }
            return {
                ...prev,
                isMaximized: true,
                height: "calc(100vh - 56px)",
                width: "100%",
                maxWidth: "100%"
            };
        });
    };
    const typeText = (text, callback)=>{
        if (isExecutingRef.current) return; // Don't start new typing if already executing
        setTypingText("");
        setIsTyping(true);
        isExecutingRef.current = true;
        // Create a temporary div to parse HTML
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = text;
        const textContent = tempDiv.textContent || tempDiv.innerText || "";
        // Type the text content without HTML tags, but much faster
        const typeChar = (index)=>{
            if (!isExecutingRef.current) return; // Stop if execution was cancelled
            if (index < textContent.length) {
                setTypingText((prev)=>prev + textContent.charAt(index));
                scrollToBottom();
                executionTimeoutRef.current = setTimeout(()=>typeChar(index + 1), Math.random() * 10 + 5);
            } else {
                setIsTyping(false);
                isExecutingRef.current = false;
                if (callback) callback();
            }
        };
        typeChar(0);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Terminal.useEffect": ()=>{
            const cursorInterval = setInterval({
                "Terminal.useEffect.cursorInterval": ()=>{
                    setBlinkCursor({
                        "Terminal.useEffect.cursorInterval": (prev)=>!prev
                    }["Terminal.useEffect.cursorInterval"]);
                }
            }["Terminal.useEffect.cursorInterval"], 500);
            return ({
                "Terminal.useEffect": ()=>clearInterval(cursorInterval)
            })["Terminal.useEffect"];
        }
    }["Terminal.useEffect"], []);
    const handleCommand = (cmd)=>{
        if (isExecutingRef.current) return; // Don't process new commands while executing
        const cmdLower = cmd.trim().toLowerCase();
        const [command, ...args] = cmdLower.split(" ");
        // Special handling for exit command
        if (command === "exit") {
            if (onClose) {
                setHistory((prev)=>[
                        ...prev,
                        `<span class="system-message">Exiting terminal. Goodbye!</span>`
                    ]);
                executionTimeoutRef.current = setTimeout(()=>{
                    onClose();
                }, 1000);
            } else {
                setHistory((prev)=>[
                        ...prev,
                        `<span class="system-message">Exiting terminal. Redirecting to home page...</span>`
                    ]);
                executionTimeoutRef.current = setTimeout(()=>{
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
            setHistory((prev)=>[
                    ...prev,
                    response
                ]);
            // Delay the scroll with GSAP for smoother experience
            setTimeout(()=>{
                if (terminalRef.current) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(terminalRef.current, {
                        scrollTo: {
                            y: "max"
                        },
                        duration: 0.6,
                        ease: "power2.out"
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
        const commands = {
            banner: ()=>`<pre class="crypter-banner" data-text="${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$terminal$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CRYPTER"]}">${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$terminal$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CRYPTER"]}</pre>`,
            help: ()=>handleHelpCommand(args),
            ls: ()=>{
                // Simulate a file system with directories and files
                const files = [
                    {
                        name: "projects",
                        type: "directory"
                    },
                    {
                        name: "resume.pdf",
                        type: "file"
                    },
                    {
                        name: "toolspage",
                        type: "directory"
                    },
                    {
                        name: "contacts.txt",
                        type: "file"
                    },
                    {
                        name: "certifications",
                        type: "directory"
                    }
                ];
                // Create HTML output for the ls command
                let output = '<div class="ls-output">';
                files.forEach((file)=>{
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
            projects: ()=>{
                // Set loading state to true
                setIsLoading(true);
                console.log('Terminal: Executing projects command');
                // Add proper delay to ensure the command executes properly
                setTimeout(()=>{
                    console.log('Terminal: Minimizing terminal...');
                    // First minimize the terminal
                    handleMinimize();
                    // Give time for the minimize animation to complete
                    setTimeout(()=>{
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
            toolspage: ()=>{
                // Set loading state to true
                setIsLoading(true);
                console.log('Terminal: Executing toolspage command');
                // Add proper delay to ensure the command executes properly
                setTimeout(()=>{
                    console.log('Terminal: Minimizing terminal...');
                    // First minimize the terminal
                    handleMinimize();
                    // Give time for the minimize animation to complete
                    setTimeout(()=>{
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
            whoami: ()=>{
                return `<div class="whoami-output">
          <span class="user-info">User: <span class="user-value">crypter</span></span>
          <span class="user-info">Role: <span class="user-value">Ethical Hacker & Cybersecurity Specialist</span></span>
          <span class="user-info">Status: <span class="user-value">Active</span></span>
        </div>`;
            },
            about: ()=>`Ethical Hacker & Cybersecurity Specialist

<span class="about-section-title">EXPERTISE</span>
Specializing in penetration testing, vulnerability assessment, security consulting, malware development, and ethical hacking tools creation.

<span class="about-section-title">PROGRAMMING LANGUAGES</span>
• <span class="lang-python">Python</span> - Advanced automation and security tools
• <span class="lang-c">C/C++</span> - Low-level system programming and exploit development
• <span class="lang-bash">Bash</span> - System automation and penetration testing
• <span class="lang-ps">PowerShell</span> - Windows system administration and security
• <span class="lang-go">Go</span> - Modern backend development and security tools
• <span class="lang-rust">Rust</span> - Memory-safe system programming

<span class="about-section-title">TECHNICAL SKILLS</span>
• <span class="skill-highlight">Reverse Engineering</span> - Binary analysis and malware dissection
• <span class="skill-highlight">Exploit Development</span> - Creating targeted security testing tools
• <span class="skill-highlight">Network Analysis</span> - Protocol inspection and traffic examination
• <span class="skill-highlight">OSINT</span> - Open source intelligence gathering techniques

<span class="about-section-title">EDUCATION & CERTIFICATIONS</span>
• Computer Science with focus on Cybersecurity
• CEH  (Certified Ethical Hacker) <span class="cert-status completed">✓</span>
• PWPA (Practical Web Pentest Associate) <span class="cert-status completed">✓</span>
• PWPP (Practical Web Pentest Professional) <span class="cert-status completed">✓</span>
• OSWE (Offensive Security Web Expert) <span class="cert-status planned">⏳</span>


<span class="about-section-title">SECURITY RESEARCH</span>
Published articles on zero-day vulnerability discoveries, advanced persistence techniques, malware analysis methodologies, and security best practices. Recent research includes kernel exploitation, IoT security vulnerabilities, and supply chain attack vectors.

<span class="about-section-title">TOOLS DEVELOPMENT</span>
Creator of specialized security testing tools including network sniffers, custom payload generators, vulnerability scanners, and security assessment frameworks designed for ethical security professionals.`,
            skills: ()=>"Programming Languages & Technical Skills\n\nProficient in:\n• Python - Advanced automation and security tools\n• C/C++ - Low-level system programming and exploit development\n• Bash Scripting - System automation and penetration testing\n• PowerShell - Windows system administration and security\n• Go - Modern backend development and security tools\n• Rust - Memory-safe system programming\n\nAdditional skills: Reverse engineering, binary analysis, network protocol analysis",
            studies: ()=>"Academic Background & Certifications\n\nEducation:\n• Computer Science with focus on Cybersecurity\n• Specialized training in offensive security techniques\n\nCertifications:\n• OSCP (Offensive Security Certified Professional)\n• CEH (Certified Ethical Hacker)\n• CISSP (Certified Information Systems Security Professional)\n• CompTIA Security+",
            blog: ()=>"Security Research & Write-ups\n\nPublished articles on:\n• Zero-day vulnerability discoveries\n• Advanced persistence techniques\n• Malware analysis methodologies\n• Security best practices\n\nRecent topics include kernel exploitation, IoT security flaws, and supply chain attacks.",
            tools: ()=>"Malware Development & Ethical Hacking Tools\n\nCreating advanced security testing tools, including network sniffers, custom payload generators, vulnerability scanners, and security assessment frameworks designed for ethical use by security professionals.",
            services: ()=>`Cybersecurity Services

<span class="service-category">OFFENSIVE SECURITY</span>
• <span class="service-name">Advanced Penetration Testing</span> - Comprehensive exploitation of systems with custom tools and manual techniques
• <span class="service-name">Red Team Operations</span> - Simulated targeted attacks against your organization using real-world adversary tactics
• <span class="service-name">Web Application Security</span> - In-depth assessment of web applications for OWASP Top 10 and business logic vulnerabilities
• <span class="service-name">Mobile Application Testing</span> - Security assessment of iOS and Android applications for data leakage and API vulnerabilities

<span class="service-category">VULNERABILITY MANAGEMENT</span>
• <span class="service-name">Network Vulnerability Assessment</span> - Comprehensive scanning and verification of infrastructure security posture
• <span class="service-name">Cloud Security Assessment</span> - Evaluation of AWS, Azure, GCP configurations for misconfigurations and security gaps
• <span class="service-name">DevSecOps Integration</span> - Embedding security into CI/CD pipelines for early vulnerability detection
• <span class="service-name">IoT Security Testing</span> - Hardware and firmware security analysis of connected devices

<span class="service-category">ADVISORY SERVICES</span>
• <span class="service-name">Security Architecture Review</span> - Evaluation of security designs and implementations
• <span class="service-name">Incident Response Planning</span> - Development of tailored incident response procedures
• <span class="service-name">Security Awareness Training</span> - Custom phishing simulations and security education for employees
• <span class="service-name">Compliance Consulting</span> - Guidance for PCI DSS, HIPAA, GDPR, and industry-specific security requirements`,
            pentest: ()=>"Penetration Testing Services\n\nProviding thorough security assessments to identify vulnerabilities in your systems before malicious actors can exploit them.",
            ctf: ()=>"Capture The Flag Achievements\n\nParticipated in numerous CTF competitions with a focus on web exploitation, reverse engineering, and cryptography challenges.",
            contact: ()=>"Contact Information\n\nEmail: contact@crypter.com\nGitHub: github.com/CrypterENC\nLinkedIn: linkedin.com/in/crypter"
        };
        const htmlFormatters = {
            about: (text)=>{
                return `<div class="about-section enhanced-about">
          <div class="section-title">About Me</div>
          <div class="section-content">${text}</div>
        </div>`;
            },
            skills: (text)=>{
                const [title, ...contentLines] = text.split("\n\n");
                return `<div class="skills-section">
          <div class="section-title">${title}</div>
          <div class="section-content">${contentLines.join("\n\n")}</div>
        </div>`;
            },
            studies: (text)=>{
                const [title, ...contentLines] = text.split("\n\n");
                return `<div class="studies-section">
          <div class="section-title">${title}</div>
          <div class="section-content">${contentLines.join("\n\n")}</div>
        </div>`;
            },
            blog: (text)=>{
                const [title, ...contentLines] = text.split("\n\n");
                return `<div class="blog-section">
          <div class="section-title">${title}</div>
          <div class="section-content">${contentLines.join("\n\n")}</div>
        </div>`;
            },
            tools: (text)=>{
                const [title, ...contentLines] = text.split("\n\n");
                return `<div class="tools-section">
          <div class="section-title">${title}</div>
          <div class="section-content">${contentLines.join("\n\n")}</div>
        </div>`;
            },
            services: (text)=>{
                return `<div class="services-section">
          <div class="section-title">Cybersecurity Services</div>
          <div class="section-content">${text}</div>
        </div>`;
            },
            pentest: (text)=>{
                const [title, ...contentLines] = text.split("\n\n");
                return `<div class="pentest-section">
          <div class="section-title">${title}</div>
          <div class="section-content">${contentLines.join("\n\n")}</div>
        </div>`;
            },
            ctf: (text)=>{
                const [title, ...contentLines] = text.split("\n\n");
                return `<div class="ctf-section">
          <div class="section-title">${title}</div>
          <div class="section-content">${contentLines.join("\n\n")}</div>
        </div>`;
            },
            contact: (text)=>{
                const [title, ...contentLines] = text.split("\n\n");
                return `<div class="contact-section">
          <div class="section-title">${title}</div>
          <div class="section-content">${contentLines.join("\n\n")}</div>
        </div>`;
            }
        };
        if (cmdLower === "") return "";
        if (command in commands) {
            const response = commands[command](args);
            if ([
                "about",
                "contact",
                "services",
                "pentest",
                "ctf"
            ].includes(command) && command in htmlFormatters) {
                // First set loading state to true and add loading indicator to history
                setIsLoading(true);
                setSpecialCommand(command);
                // Add a very minimal delay before starting the typing effect
                setTimeout(()=>{
                    // Start typing effect after loading
                    typeText(response, ()=>{
                        // After typing completes, replace with formatted HTML
                        const formattedResponse = htmlFormatters[command](response);
                        setHistory((prev)=>{
                            const newHistory = [
                                ...prev
                            ];
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
        return `<span class="error-message">Command not found: <span class="error-command">${cmd}</span>. Type <span class="suggestion">'help'</span> for available commands.</span>`;
    };
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (input.trim() === "") return;
        setIsTyping(false); // Stop typing effect when command is executed
        setCommandHistory([
            ...commandHistory,
            input
        ]);
        setHistoryIndex(-1);
        if (input.trim().toLowerCase() === "clear") {
            setHistory([]);
            setInput("");
            return;
        }
        // Get the command type color class for the current input
        const commandColorClass = getCommandColor();
        // Add the command to history with Kali-style two-line prompt
        setHistory([
            ...history,
            `<div class="command-line kali-prompt-block"><div class="kali-prompt-top">┌──(kali㉿kali)-[~]</div><div class="kali-bottom"><span class="kali-arrow">└─$</span> <span class="user-command ${commandColorClass.replace("text-", "")}">${input}</span></div></div>`
        ]);
        const response = handleCommand(input);
        // Only add response to history if it's not a special command (which handles its own history)
        if (response && !specialCommand) {
            setHistory((prev)=>[
                    ...prev,
                    response
                ]);
        }
        setInput("");
        setCommandType(null); // Reset command type after submission
        // Use smooth scrolling after submission
        scrollToBottom();
    };
    const handleKeyDown = (e)=>{
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
            setHistory((prev)=>[
                    ...prev,
                    '<span class="system-message">^C</span>'
                ]);
            // Force scroll to bottom
            scrollToBottom();
            return;
        }
        if (e.key === "ArrowUp") {
            e.preventDefault();
            if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
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
    const handleInputChange = (e)=>{
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Terminal.useEffect": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                // Only set initial position once on first mount
                const { width, height } = getResponsiveSizes();
                // Convert vw/vh to pixels
                const parsedWidth = parseFloat(width) / 100 * window.innerWidth;
                const parsedHeight = parseFloat(height) / 100 * window.innerHeight;
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
                        y: Math.max(WAYBAR_HEIGHT + 2, centerY)
                    });
                } else {
                    try {
                        const savedPosition = JSON.parse(hasCustomPosition);
                        // Make sure saved position doesn't overlap waybar
                        savedPosition.y = Math.max(WAYBAR_HEIGHT + 2, savedPosition.y);
                        setPosition(savedPosition);
                    } catch  {
                        // If parsing fails, fallback to initial position
                        const centerX = (window.innerWidth - parsedWidth) / 2;
                        const centerY = (window.innerHeight - parsedHeight) / 2;
                        setPosition({
                            x: Math.max(0, centerX),
                            y: Math.max(WAYBAR_HEIGHT + 2, centerY)
                        });
                    }
                }
            }
            inputRef.current?.focus();
        // Only run on initial mount, use empty dependency array
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["Terminal.useEffect"], []);
    // Handle window resizing
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Terminal.useEffect": ()=>{
            const handleResize = {
                "Terminal.useEffect.handleResize": ()=>{
                    if ("object" !== "undefined" && !terminalState.isMaximized) {
                        const { width, height } = getResponsiveSizes();
                        // Convert vw/vh to pixels
                        const parsedWidth = parseFloat(width) / 100 * window.innerWidth;
                        const parsedHeight = parseFloat(height) / 100 * window.innerHeight;
                        // Define waybar height constant
                        const WAYBAR_HEIGHT = 48; // Height of the waybar at the top
                        // Only update sizes, not position - this prevents snapping back to center on resize
                        setTerminalState({
                            "Terminal.useEffect.handleResize": (prev)=>({
                                    ...prev,
                                    width,
                                    height,
                                    maxWidth: getResponsiveSizes().maxWidth
                                })
                        }["Terminal.useEffect.handleResize"]);
                        // Ensure window stays on screen after resize and respects waybar
                        setPosition({
                            "Terminal.useEffect.handleResize": (currentPos)=>({
                                    x: Math.min(Math.max(0, currentPos.x), window.innerWidth - parsedWidth),
                                    y: Math.min(Math.max(WAYBAR_HEIGHT + 2, currentPos.y), window.innerHeight - parsedHeight)
                                })
                        }["Terminal.useEffect.handleResize"]);
                    }
                }
            }["Terminal.useEffect.handleResize"];
            window.addEventListener("resize", handleResize);
            return ({
                "Terminal.useEffect": ()=>window.removeEventListener("resize", handleResize)
            })["Terminal.useEffect"];
        }
    }["Terminal.useEffect"], [
        terminalState.isMaximized,
        getResponsiveSizes
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Terminal.useEffect": ()=>{
            scrollToBottom();
        }
    }["Terminal.useEffect"], [
        history
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Terminal.useEffect": ()=>{
            const welcomeMessage = `<span class="welcome-message">Welcome. Type <span class="command-hint">help</span> for available commands.</span>`;
            setTimeout({
                "Terminal.useEffect": ()=>{
                    setHistory([
                        welcomeMessage
                    ]);
                }
            }["Terminal.useEffect"], 150);
        }
    }["Terminal.useEffect"], []);
    // Function to get the appropriate color class based on command type
    const getCommandColor = ()=>{
        switch(commandType){
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
    const handleTerminalClick = ()=>{
        // Only focus the input if we're not selecting text
        if (window.getSelection()?.toString() === "") {
            inputRef.current?.focus();
        }
    };
    // Add this function to ensure scrolling to bottom
    const scrollToBottom = ()=>{
        if (terminalRef.current) {
            // Use GSAP to scroll smoothly to the bottom
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(terminalRef.current, {
                scrollTo: {
                    y: "max",
                    autoKill: true
                },
                duration: 0.4,
                ease: "power3.out",
                overwrite: true
            });
        }
    };
    // Add a function to check if content needs scrolling
    const checkIfNeedsScrolling = ()=>{
        if (terminalRef.current) {
            const terminal = terminalRef.current;
            // Add a small buffer to prevent flickering
            const buffer = 5; // 5px buffer
            const needsScroll = terminal.scrollHeight > terminal.clientHeight + buffer;
            if (needsScroll !== needsScrolling) {
                setNeedsScrolling(needsScroll);
            }
        }
    };
    // Add a debounced version of the check function
    // Add scroll event listener
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Terminal.useEffect": ()=>{
            const terminal = terminalRef.current;
            if (!terminal) return;
            const handleScroll = {
                "Terminal.useEffect.handleScroll": ()=>{
                    const isScrollable = terminal.scrollHeight > terminal.clientHeight + 5;
                    const isScrolled = terminal.scrollTop < terminal.scrollHeight - terminal.clientHeight - 5;
                    if (isScrollable && needsScrolling !== isScrolled) {
                        setNeedsScrolling(isScrolled);
                    }
                }
            }["Terminal.useEffect.handleScroll"];
            terminal.addEventListener("scroll", handleScroll);
            return ({
                "Terminal.useEffect": ()=>terminal.removeEventListener("scroll", handleScroll)
            })["Terminal.useEffect"];
        }
    }["Terminal.useEffect"], [
        needsScrolling
    ]);
    // Update the useEffect to check if content needs scrolling
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Terminal.useEffect": ()=>{
            // Use requestAnimationFrame to ensure DOM has updated
            const rafId = requestAnimationFrame({
                "Terminal.useEffect.rafId": ()=>{
                    checkIfNeedsScrolling();
                }
            }["Terminal.useEffect.rafId"]);
            return ({
                "Terminal.useEffect": ()=>cancelAnimationFrame(rafId)
            })["Terminal.useEffect"];
        }
    }["Terminal.useEffect"], [
        history,
        isTyping,
        typingText,
        isLoading
    ]);
    // Window dragging handlers
    const handleMouseDown = (e)=>{
        if (terminalState.isMaximized) return; // Don't allow dragging when maximized
        // Get the terminal window element
        const terminalWindow = e.currentTarget.parentElement;
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
        function handleMouseMove(moveEvent) {
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
            terminalWindow.style.transition = "transform 300ms ease-out, opacity 300ms ease-out, border-radius 300ms ease-out";
            document.body.style.userSelect = "";
            // Get final position from the actual window position
            const finalRect = terminalWindow.getBoundingClientRect();
            // Final position
            const finalPosition = {
                x: finalRect.left,
                y: finalRect.top
            };
            // Update state with the final position when drag ends
            setPosition(finalPosition);
            // Save position to localStorage
            try {
                localStorage.setItem("terminal-position", JSON.stringify(finalPosition));
            } catch  {
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
    const hasFirefoxMinimized = ()=>{
        try {
            // Look for the Firefox indicator with class-based detection
            const firefoxIndicator = document.querySelector(".firefox-taskbar-indicator");
            return !!firefoxIndicator;
        } catch  {
            return false;
        }
    };
    // Add this useEffect to add and remove event listeners
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Terminal.useEffect": ()=>{
            return ({
                "Terminal.useEffect": ()=>{
                    // Cleanup function to ensure no dangling event listeners
                    document.body.style.cursor = "";
                }
            })["Terminal.useEffect"];
        }
    }["Terminal.useEffect"], []);
    // Add an effect to monitor Firefox indicator changes and update position
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Terminal.useEffect": ()=>{
            if (!isMinimized) return;
            let lastFirefoxState = hasFirefoxMinimized();
            // Create polling function to check Firefox indicator state
            const checkFirefoxIndicator = {
                "Terminal.useEffect.checkFirefoxIndicator": ()=>{
                    const currentFirefoxState = hasFirefoxMinimized();
                    if (currentFirefoxState !== lastFirefoxState) {
                        lastFirefoxState = currentFirefoxState;
                        // Force re-render without actually changing the state value
                        setIsMinimized(isMinimized);
                    }
                }
            }["Terminal.useEffect.checkFirefoxIndicator"];
            // Set up polling interval to check regularly
            const intervalId = setInterval(checkFirefoxIndicator, 500);
            return ({
                "Terminal.useEffect": ()=>{
                    clearInterval(intervalId);
                }
            })["Terminal.useEffect"];
        }
    }["Terminal.useEffect"], [
        isMinimized
    ]);
    // Effect to position the indicator correctly
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Terminal.useEffect": ()=>{
            if (!isMinimized || !terminalIndicatorRef.current) return;
            const updatePosition = {
                "Terminal.useEffect.updatePosition": ()=>{
                    const archLogo = document.querySelector(".arch-logo");
                    const firefoxIndicator = document.querySelector(".firefox-taskbar-indicator");
                    if (archLogo) {
                        // Position Terminal indicator right after the arch logo
                        const archLogoRect = archLogo.getBoundingClientRect();
                        const startPosition = archLogoRect.right + 10; // 10px gap
                        terminalIndicatorRef.current.style.left = `${startPosition}px`;
                        // Position Firefox indicator if it exists
                        if (firefoxIndicator) {
                            const terminalRect = terminalIndicatorRef.current.getBoundingClientRect();
                            firefoxIndicator.style.left = `${terminalRect.right}px`;
                        }
                    } else {
                        // Fallback position if arch logo not found
                        terminalIndicatorRef.current.style.left = "80px";
                        if (firefoxIndicator) {
                            firefoxIndicator.style.left = "160px";
                        }
                    }
                }
            }["Terminal.useEffect.updatePosition"];
            // Update position initially
            updatePosition();
            // Check periodically to ensure correct positioning
            const intervalId = setInterval(updatePosition, 300);
            // Also update on window resize
            window.addEventListener("resize", updatePosition);
            // Set up MutationObserver to detect when Firefox indicator is added or removed
            const observer = new MutationObserver({
                "Terminal.useEffect": (mutations)=>{
                    mutations.forEach({
                        "Terminal.useEffect": (mutation)=>{
                            if (mutation.type === "childList" || mutation.type === "attributes") {
                                updatePosition();
                            }
                        }
                    }["Terminal.useEffect"]);
                }
            }["Terminal.useEffect"]);
            // Observe the active-apps container
            const activeApps = document.querySelector(".active-apps");
            if (activeApps) {
                observer.observe(activeApps, {
                    childList: true,
                    subtree: true,
                    attributes: true
                });
            }
            return ({
                "Terminal.useEffect": ()=>{
                    clearInterval(intervalId);
                    window.removeEventListener("resize", updatePosition);
                    observer.disconnect();
                }
            })["Terminal.useEffect"];
        }
    }["Terminal.useEffect"], [
        isMinimized
    ]);
    // Add window resize handler
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Terminal.useEffect": ()=>{
            const handleResize = {
                "Terminal.useEffect.handleResize": ()=>{
                    setWindowSize({
                        width: window.innerWidth,
                        height: window.innerHeight
                    });
                    // Update terminal size when not maximized
                    if (!terminalState.isMaximized) {
                        const { width, height, maxWidth } = getResponsiveSizes();
                        setTerminalState({
                            "Terminal.useEffect.handleResize": (prev)=>({
                                    ...prev,
                                    width,
                                    height,
                                    maxWidth
                                })
                        }["Terminal.useEffect.handleResize"]);
                        // Adjust position if terminal would go off screen
                        if (position.x + parseFloat(width) > window.innerWidth) {
                            setPosition({
                                "Terminal.useEffect.handleResize": (prev)=>({
                                        ...prev,
                                        x: Math.max(0, window.innerWidth - parseFloat(width))
                                    })
                            }["Terminal.useEffect.handleResize"]);
                        }
                        if (position.y + parseFloat(height) > window.innerHeight) {
                            setPosition({
                                "Terminal.useEffect.handleResize": (prev)=>({
                                        ...prev,
                                        y: Math.max(56, window.innerHeight - parseFloat(height))
                                    })
                            }["Terminal.useEffect.handleResize"]);
                        }
                    }
                }
            }["Terminal.useEffect.handleResize"];
            // Initialize sizes
            handleResize();
            window.addEventListener("resize", handleResize);
            return ({
                "Terminal.useEffect": ()=>window.removeEventListener("resize", handleResize)
            })["Terminal.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["Terminal.useEffect"], [
        terminalState.isMaximized
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            terminalState.isOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    height: terminalState.height,
                    width: terminalState.width,
                    maxWidth: terminalState.maxWidth,
                    transition: terminalState.isMaximized ? "none" : "all 0.3s ease-in-out",
                    top: terminalState.isMaximized ? "56px" : `${position.y}px`,
                    left: terminalState.isMaximized ? "0" : `${position.x}px`,
                    zIndex: 45,
                    backdropFilter: isFocused ? "blur(10px)" : "blur(12px)",
                    boxShadow: isFocused ? "0 0 20px rgba(0, 0, 0, 0.6), 0 0 30px rgba(51, 65, 85, 0.35), inset 0 0 30px rgba(51, 65, 85, 0.2)" : "0 0 20px rgba(0, 0, 0, 0.6), 0 0 30px rgba(30, 41, 59, 0.3), inset 0 0 30px rgba(30, 41, 59, 0.18)",
                    borderRadius: terminalState.isMaximized ? "0" : "8px"
                },
                onClick: handleTerminalClick,
                className: "jsx-6af870cc49ca110f" + " " + "terminal-window fixed bg-black/60 backdrop-blur-lg text-slate-200 font-mono text-sm rounded-lg overflow-hidden border border-slate-600/30 shadow-xl z-40",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onMouseDown: handleMouseDown,
                        className: "jsx-6af870cc49ca110f" + " " + "terminal-titlebar p-2 cursor-move bg-slate-900/85 backdrop-blur-sm border-b border-slate-700/40",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-6af870cc49ca110f" + " " + "flex items-center w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-6af870cc49ca110f" + " " + "flex-1"
                                }, void 0, false, {
                                    fileName: "[project]/components/Terminal.tsx",
                                    lineNumber: 1182,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-6af870cc49ca110f" + " " + "kali-title flex-shrink-0 text-gray-200/90 text-sm",
                                    children: "kali@kali: ~"
                                }, void 0, false, {
                                    fileName: "[project]/components/Terminal.tsx",
                                    lineNumber: 1183,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-6af870cc49ca110f" + " " + "flex-1 flex justify-end items-center space-x-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: handleMinimize,
                                            title: "Minimize",
                                            className: "jsx-6af870cc49ca110f" + " " + "px-1.5 py-0.5 rounded hover:bg-slate-700/60 text-slate-200/80 hover:text-white transition-colors",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                xmlns: "http://www.w3.org/2000/svg",
                                                viewBox: "0 0 20 20",
                                                fill: "currentColor",
                                                className: "jsx-6af870cc49ca110f" + " " + "w-4 h-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M4 10.5h12a.5.5 0 0 1 0 1H4a.5.5 0 0 1 0-1Z",
                                                    className: "jsx-6af870cc49ca110f"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Terminal.tsx",
                                                    lineNumber: 1194,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/Terminal.tsx",
                                                lineNumber: 1193,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/Terminal.tsx",
                                            lineNumber: 1187,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: handleMaximize,
                                            title: "Maximize",
                                            className: "jsx-6af870cc49ca110f" + " " + "px-1.5 py-0.5 rounded hover:bg-slate-700/60 text-slate-200/80 hover:text-white transition-colors",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                xmlns: "http://www.w3.org/2000/svg",
                                                viewBox: "0 0 20 20",
                                                fill: "currentColor",
                                                className: "jsx-6af870cc49ca110f" + " " + "w-4 h-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M6 5h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1 2v6h6V7H7Z",
                                                    className: "jsx-6af870cc49ca110f"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Terminal.tsx",
                                                    lineNumber: 1204,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/Terminal.tsx",
                                                lineNumber: 1203,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/Terminal.tsx",
                                            lineNumber: 1197,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: handleClose,
                                            title: "Close",
                                            className: "jsx-6af870cc49ca110f" + " " + "px-1.5 py-0.5 rounded hover:bg-slate-700/60 text-slate-200/80 hover:text-white transition-colors",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                xmlns: "http://www.w3.org/2000/svg",
                                                viewBox: "0 0 20 20",
                                                fill: "currentColor",
                                                className: "jsx-6af870cc49ca110f" + " " + "w-4 h-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    fillRule: "evenodd",
                                                    d: "M6.28 6.28a.75.75 0 0 1 1.06 0L10 8.94l2.66-2.66a.75.75 0 1 1 1.06 1.06L11.06 10l2.66 2.66a.75.75 0 1 1-1.06 1.06L10 11.06l-2.66 2.66a.75.75 0 1 1-1.06-1.06L8.94 10 6.28 7.34a.75.75 0 0 1 0-1.06Z",
                                                    clipRule: "evenodd",
                                                    className: "jsx-6af870cc49ca110f"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Terminal.tsx",
                                                    lineNumber: 1214,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/Terminal.tsx",
                                                lineNumber: 1213,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/Terminal.tsx",
                                            lineNumber: 1207,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Terminal.tsx",
                                    lineNumber: 1186,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Terminal.tsx",
                            lineNumber: 1181,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/Terminal.tsx",
                        lineNumber: 1177,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: terminalRef,
                        style: {
                            display: terminalState.height === "40px" ? "none" : "block",
                            maxHeight: "calc(100% - 65px)",
                            overscrollBehavior: "contain",
                            overflowY: "scroll",
                            backgroundImage: isFocused ? "radial-gradient(circle at 50% 50%, rgba(100, 116, 139, 0.08), transparent 25%)" : "radial-gradient(circle at 50% 50%, rgba(30, 41, 59, 0.06), transparent 25%)",
                            boxShadow: isFocused ? "inset 0 0 30px rgba(71, 85, 105, 0.28)" : "inset 0 0 30px rgba(30, 41, 59, 0.28)",
                            padding: "16px 20px",
                            filter: "none",
                            transition: "filter 0.2s ease-in-out"
                        },
                        className: "jsx-6af870cc49ca110f" + " " + `terminal-output flex-1 p-4 ${needsScrolling ? "custom-scrollbar" : "no-scrollbar"} bg-gradient-to-b from-slate-950/70 to-slate-900/60`,
                        children: [
                            history.map((line, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    dangerouslySetInnerHTML: {
                                        __html: line
                                    },
                                    className: "jsx-6af870cc49ca110f" + " " + "mb-1 break-words whitespace-pre-wrap"
                                }, i, false, {
                                    fileName: "[project]/components/Terminal.tsx",
                                    lineNumber: 1242,
                                    columnNumber: 15
                                }, this)),
                            isTyping && !isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-6af870cc49ca110f" + " " + "mb-1 break-words whitespace-pre-wrap",
                                children: [
                                    typingText,
                                    blinkCursor && !input && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-6af870cc49ca110f" + " " + "cursor",
                                        children: "_"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Terminal.tsx",
                                        lineNumber: 1253,
                                        columnNumber: 43
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Terminal.tsx",
                                lineNumber: 1251,
                                columnNumber: 15
                            }, this),
                            isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-6af870cc49ca110f" + " " + "loading-container mb-3 mt-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-6af870cc49ca110f" + " " + "terminal-loading",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-6af870cc49ca110f" + " " + "loading-header flex items-center mb-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-6af870cc49ca110f" + " " + "loading-icon mr-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        xmlns: "http://www.w3.org/2000/svg",
                                                        fill: "none",
                                                        viewBox: "0 0 24 24",
                                                        stroke: "currentColor",
                                                        className: "jsx-6af870cc49ca110f" + " " + "h-4 w-4 text-green-500 animate-spin",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
                                                            className: "jsx-6af870cc49ca110f"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Terminal.tsx",
                                                            lineNumber: 1268,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Terminal.tsx",
                                                        lineNumber: 1261,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Terminal.tsx",
                                                    lineNumber: 1260,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-6af870cc49ca110f" + " " + "loading-text text-green-400 font-mono text-sm",
                                                    children: specialCommand ? `Loading ${specialCommand} data...` : "Processing..."
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Terminal.tsx",
                                                    lineNumber: 1276,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/Terminal.tsx",
                                            lineNumber: 1259,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-6af870cc49ca110f" + " " + "loading-progress-container h-1.5 w-full bg-gray-800 rounded-full overflow-hidden",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-6af870cc49ca110f" + " " + "loading-progress-bar h-full bg-gradient-to-r from-green-500 to-emerald-400 animate-loading-progress"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Terminal.tsx",
                                                lineNumber: 1283,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/Terminal.tsx",
                                            lineNumber: 1282,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-6af870cc49ca110f" + " " + "loading-details mt-1",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-6af870cc49ca110f" + " " + "text-xs text-gray-500 font-mono flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-6af870cc49ca110f",
                                                        children: "Decrypting data"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Terminal.tsx",
                                                        lineNumber: 1287,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-6af870cc49ca110f" + " " + "text-green-400 loading-percentage",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-6af870cc49ca110f" + " " + "animate-pulse",
                                                            children: "..."
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Terminal.tsx",
                                                            lineNumber: 1289,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Terminal.tsx",
                                                        lineNumber: 1288,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/Terminal.tsx",
                                                lineNumber: 1286,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/Terminal.tsx",
                                            lineNumber: 1285,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Terminal.tsx",
                                    lineNumber: 1258,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/Terminal.tsx",
                                lineNumber: 1257,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: handleSubmit,
                                className: "jsx-6af870cc49ca110f" + " " + "mt-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-6af870cc49ca110f" + " " + "kali-prompt-top text-cyan-300 text-sm mb-1 select-none",
                                        children: "┌──(kali㉿kali)-[~]"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Terminal.tsx",
                                        lineNumber: 1298,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-6af870cc49ca110f" + " " + "flex items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-6af870cc49ca110f" + " " + "kali-arrow mr-3 text-cyan-300 text-base select-none",
                                                children: "└─$"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Terminal.tsx",
                                                lineNumber: 1300,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                ref: inputRef,
                                                type: "text",
                                                value: input,
                                                onChange: handleInputChange,
                                                onKeyDown: handleKeyDown,
                                                onFocus: handleFocus,
                                                onBlur: handleBlur,
                                                autoFocus: true,
                                                placeholder: "Type a command...",
                                                className: "jsx-6af870cc49ca110f" + " " + `flex-1 bg-transparent outline-none px-0 py-0 ${getCommandColor()} terminal-input`
                                            }, void 0, false, {
                                                fileName: "[project]/components/Terminal.tsx",
                                                lineNumber: 1301,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Terminal.tsx",
                                        lineNumber: 1299,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Terminal.tsx",
                                lineNumber: 1297,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Terminal.tsx",
                        lineNumber: 1220,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Terminal.tsx",
                lineNumber: 1156,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-6af870cc49ca110f" + " " + "fixed bottom-4 right-4 z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>setTerminalState((prev)=>({
                                ...prev,
                                isOpen: true
                            })),
                    title: "Open Terminal",
                    className: "jsx-6af870cc49ca110f" + " " + "bg-green-500 hover:bg-green-600 text-black p-2 rounded-full shadow-lg",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        className: "jsx-6af870cc49ca110f" + " " + "h-6 w-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M5 12h14M12 5v14",
                            className: "jsx-6af870cc49ca110f"
                        }, void 0, false, {
                            fileName: "[project]/components/Terminal.tsx",
                            lineNumber: 1333,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/Terminal.tsx",
                        lineNumber: 1326,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/Terminal.tsx",
                    lineNumber: 1319,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Terminal.tsx",
                lineNumber: 1318,
                columnNumber: 9
            }, this),
            isMinimized && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: terminalIndicatorRef,
                onClick: handleRestore,
                style: {
                    left: "80px",
                    width: "80px",
                    transition: "left 0.2s ease, background-color 0.2s ease, border-color 0.2s ease"
                },
                className: "jsx-6af870cc49ca110f" + " " + "terminal-taskbar-indicator fixed top-0 z-[101] h-12 px-3 flex items-center justify-center cursor-pointer hover:bg-gray-700/50 transition-colors border-b-2 border-transparent hover:border-green-500",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-6af870cc49ca110f" + " " + "flex items-center space-x-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            className: "jsx-6af870cc49ca110f" + " " + "h-4 w-4 text-green-400",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M8 9l3 3-3 3m5 0h3",
                                className: "jsx-6af870cc49ca110f"
                            }, void 0, false, {
                                fileName: "[project]/components/Terminal.tsx",
                                lineNumber: 1365,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/Terminal.tsx",
                            lineNumber: 1358,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "jsx-6af870cc49ca110f" + " " + "text-xs text-green-400",
                            children: "Terminal"
                        }, void 0, false, {
                            fileName: "[project]/components/Terminal.tsx",
                            lineNumber: 1372,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Terminal.tsx",
                    lineNumber: 1357,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Terminal.tsx",
                lineNumber: 1346,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "6af870cc49ca110f",
                children: '@keyframes loadingProgress{0%{width:0%}20%{width:20%}40%{width:40%}60%{width:60%}80%{width:80%}95%{width:95%}to{width:98%}}.animate-loading-progress.jsx-6af870cc49ca110f{animation:.2s ease-in-out forwards loadingProgress}.loading-container.jsx-6af870cc49ca110f{background-color:#0006;border:1px solid #4ade8033;border-radius:6px;max-width:100%;margin:12px 0;padding:16px;box-shadow:0 0 10px #0032001a}.loading-percentage.jsx-6af870cc49ca110f:after{content:"";animation:.2s linear forwards percentageCount}@keyframes percentageCount{0%{content:"0%"}20%{content:"20%"}40%{content:"40%"}60%{content:"60%"}80%{content:"80%"}95%{content:"95%"}to{content:"98%"}}.prompt.terminal-glow.jsx-6af870cc49ca110f{background-color:#0006;border-left:2px solid #ffff9666;border-radius:4px;justify-content:center;align-items:center;min-width:20px;height:26px;padding:0 2px;font-weight:700;display:flex}@keyframes commandSuccess{0%{background-color:#00ff001a}50%{background-color:#0f03}to{background-color:#0000}}.command-success.jsx-6af870cc49ca110f{animation:1s ease-out commandSuccess}@keyframes commandError{0%{background-color:#ff00001a}50%{background-color:#f003}to{background-color:#0000}}.command-error.jsx-6af870cc49ca110f{animation:1s ease-out commandError}.terminal-window.jsx-6af870cc49ca110f{backdrop-filter:blur(10px);border-radius:10px;overflow:hidden;box-shadow:0 0 20px #0009,0 0 30px #00320033,inset 0 0 10px #0032001a}.error-message.jsx-6af870cc49ca110f{color:#ff6b6b;background-color:#ff00001a;border-radius:3px;padding:2px 4px;font-weight:500}.system-message.jsx-6af870cc49ca110f{color:#4ade80;background-color:#00ff000d;border-left:2px solid #4ade8080;border-radius:3px;padding:2px 4px;font-weight:500}.suggestion.jsx-6af870cc49ca110f{color:#60a5fa;background-color:#0064ff1a;border-radius:3px;padding:0 4px;font-family:monospace}.ls-output.jsx-6af870cc49ca110f{background-color:#0003;border-radius:4px;flex-wrap:wrap;gap:10px;margin:8px 0;padding:12px;display:flex}.directory-item.jsx-6af870cc49ca110f{color:#60a5fa;background-color:#0064ff1a;border-radius:3px;align-items:center;gap:6px;padding:4px 8px;display:flex}.file-item.jsx-6af870cc49ca110f{color:#e2e8f0;background-color:#ffffff1a;border-radius:3px;align-items:center;gap:6px;padding:4px 8px;display:flex}.help-title-text.jsx-6af870cc49ca110f{color:#10b981;text-shadow:0 0 5px #10b98180;font-weight:700}.help-section-text.jsx-6af870cc49ca110f{color:#60a5fa;text-shadow:0 0 5px #60a5fa80;font-weight:700}.cmd-name.jsx-6af870cc49ca110f{color:#f59e0b;text-shadow:0 0 3px #f59e0b80}.cmd-desc.jsx-6af870cc49ca110f{color:#e2e8f0}.custom-scrollbar.jsx-6af870cc49ca110f::-webkit-scrollbar{width:10px}.custom-scrollbar.jsx-6af870cc49ca110f::-webkit-scrollbar-track{background:#0003;border-radius:4px;margin:4px 0}.custom-scrollbar.jsx-6af870cc49ca110f::-webkit-scrollbar-thumb{background:#4ade8080;border-radius:4px}.custom-scrollbar.jsx-6af870cc49ca110f.jsx-6af870cc49ca110f::-webkit-scrollbar-thumb:hover{background:#4ade80b3}.no-scrollbar.jsx-6af870cc49ca110f::-webkit-scrollbar{display:none}.no-scrollbar.jsx-6af870cc49ca110f{-ms-overflow-style:none;scrollbar-width:none}.terminal-output.jsx-6af870cc49ca110f{scroll-behavior:auto;line-height:1.6}.fixed-width-pre.jsx-6af870cc49ca110f{white-space:pre;width:max-content;min-width:100%;max-width:100%;margin:0;padding:0;font-family:monospace;overflow-x:auto}.no-blink-scrollbar.jsx-6af870cc49ca110f::-webkit-scrollbar-thumb{background:#4ade8080!important;transition:none!important}.no-blink-scrollbar.jsx-6af870cc49ca110f::-webkit-scrollbar-track{background:#0003!important;transition:none!important}.terminal-output.jsx-6af870cc49ca110f{scroll-behavior:auto;overflow-y:scroll}.sticky-input.jsx-6af870cc49ca110f{z-index:10;background-color:#000c;margin-top:auto;padding:8px 0;position:sticky;bottom:0}.terminal-window.jsx-6af870cc49ca110f{flex-direction:column;display:flex}.terminal-output.jsx-6af870cc49ca110f{flex:1;overflow-y:auto}@keyframes cursorBlink{0%,to{opacity:1}50%{opacity:0}}.cursor.jsx-6af870cc49ca110f{vertical-align:middle;background-color:#22d3ee;width:8px;height:16px;margin-left:2px;animation:1s infinite cursorBlink;display:inline-block}.user-command.jsx-6af870cc49ca110f{font-weight:700}.blue-400.jsx-6af870cc49ca110f{color:#60a5fa}.purple-400.jsx-6af870cc49ca110f{color:#a78bfa}.red-400.jsx-6af870cc49ca110f{color:#f87171}.green-300.jsx-6af870cc49ca110f{color:#86efac}.whoami-output.jsx-6af870cc49ca110f{background-color:#0000004d;border-left:3px solid #10b981;border-radius:0 4px 4px 0;margin:8px 0;padding:12px 16px}.user-info.jsx-6af870cc49ca110f{margin-bottom:4px;font-size:.95em;display:block}.user-value.jsx-6af870cc49ca110f{color:#60a5fa;font-weight:500}.crypter-banner.jsx-6af870cc49ca110f{color:#10b981;text-shadow:0 0 5px #10b98180;margin:8px 0;font-family:monospace;display:inline-block;position:relative}.crypter-banner.jsx-6af870cc49ca110f:before{content:attr(data-text);text-shadow:2px 0 #f0f;color:#10b981;clip-path:inset(0);opacity:.5;background:0 0;animation:2s linear infinite alternate-reverse noise-anim;position:absolute;top:0;left:-2px;overflow:hidden}.crypter-banner.jsx-6af870cc49ca110f:after{content:attr(data-text);text-shadow:-2px 0 #0ff;color:#10b981;clip-path:inset(0);opacity:.5;background:0 0;animation:1s linear infinite alternate-reverse noise-anim;position:absolute;top:0;left:2px;overflow:hidden}@keyframes noise-anim{0%{clip-path:inset(40% 0 61%)}20%{clip-path:inset(92% 0 1%)}40%{clip-path:inset(43% 0 1%)}60%{clip-path:inset(25% 0 58%)}80%{clip-path:inset(54% 0 7%)}to{clip-path:inset(58% 0 43%)}}.about-section.jsx-6af870cc49ca110f,.services-section.jsx-6af870cc49ca110f,.pentest-section.jsx-6af870cc49ca110f,.ctf-section.jsx-6af870cc49ca110f,.contact-section.jsx-6af870cc49ca110f{background-color:#0000004d;border:1px solid #4ade8033;border-radius:6px;margin:12px 0;padding:16px}.section-title.jsx-6af870cc49ca110f{color:#10b981;border-bottom:1px solid #4ade8033;margin-bottom:12px;padding-bottom:10px;font-size:1.1em;font-weight:700}.section-content.jsx-6af870cc49ca110f{white-space:pre-line;color:#e2e8f0;line-height:1.5}.tools-section.jsx-6af870cc49ca110f{border-left:3px solid #ff5722}.skills-section.jsx-6af870cc49ca110f{border-left:3px solid #3498db}.studies-section.jsx-6af870cc49ca110f{border-left:3px solid #9b59b6}.blog-section.jsx-6af870cc49ca110f{border-left:3px solid #2ecc71}.welcome-message.jsx-6af870cc49ca110f{color:khaki;background-color:#0000004d;border-left:3px solid khaki;border-radius:4px;margin:10px 0;padding:12px 16px;display:block}.command-hint.jsx-6af870cc49ca110f{color:#10b981;background-color:#0000004d;border-radius:3px;padding:2px 6px;font-weight:700}.directory-item.jsx-6af870cc49ca110f:before{content:"📁";font-size:.9em}.file-item.jsx-6af870cc49ca110f:before{content:"📄";font-size:.9em}.terminal-glow.jsx-6af870cc49ca110f{text-shadow:0 0 5px #ecfc02b3,0 0 10px #ecfc0280}.command-line.jsx-6af870cc49ca110f{align-items:center;margin:6px 0;padding-left:0;display:flex}.prompt-wrapper.jsx-6af870cc49ca110f{text-align:center;min-width:30px;margin-right:10px;display:inline-block}.command-line.jsx-6af870cc49ca110f .user-command.jsx-6af870cc49ca110f{padding-left:4px;font-weight:700}.command-line.jsx-6af870cc49ca110f .prompt.jsx-6af870cc49ca110f{color:khaki;font-weight:700}@keyframes borderPulse{0%{border-color:#4ade804d;box-shadow:0 0 5px #4ade8033,inset 0 0 3px #4ade801a}50%{border-color:#4ade80cc;box-shadow:0 0 10px #4ade8080,inset 0 0 8px #4ade8033}to{border-color:#4ade804d;box-shadow:0 0 5px #4ade8033,inset 0 0 3px #4ade801a}}@keyframes gradientBorder{0%{border-image-source:linear-gradient(45deg,#7c3aedb3,#8b5cf61a,#5b21b6b3)}25%{border-image-source:linear-gradient(90deg,#5b21b6b3,#7c3aedb3,#8b5cf61a)}50%{border-image-source:linear-gradient(135deg,#8b5cf61a,#5b21b6b3,#7c3aedb3)}75%{border-image-source:linear-gradient(#7c3aedb3,#8b5cf61a,#5b21b6b3)}to{border-image-source:linear-gradient(225deg,#5b21b6b3,#7c3aedb3,#8b5cf61a)}}.animated-border.jsx-6af870cc49ca110f{border-style:solid;border-width:1px;border-image-source:linear-gradient(45deg,#47556999,#33415533,#1e293b99);border-image-slice:1;border-radius:9999px;padding:8px 16px;transition:all .3s;animation:3s linear infinite gradientBorder,2s ease-in-out infinite borderPulse}.animated-border.jsx-6af870cc49ca110f:focus{box-shadow:none;background-color:#0000;border-width:1px}.kali-prompt-top.jsx-6af870cc49ca110f{color:#22d3ee;text-shadow:0 0 4px #22d3ee59}.kali-arrow.jsx-6af870cc49ca110f{color:#67e8f9;text-shadow:0 0 4px #67e8f94d}.kali-prompt-block.jsx-6af870cc49ca110f{margin:6px 0 2px}.kali-top.jsx-6af870cc49ca110f{color:#22d3ee;font-weight:600}.kali-bottom.jsx-6af870cc49ca110f{align-items:center;display:flex}.kali-menubar.jsx-6af870cc49ca110f .kali-menu-item.jsx-6af870cc49ca110f{border-radius:4px;padding:2px 6px;transition:background-color .15s,color .15s}.kali-menubar.jsx-6af870cc49ca110f .kali-menu-item.jsx-6af870cc49ca110f:hover{color:#e0f2fe;background-color:#1e3a8a80}.kali-title.jsx-6af870cc49ca110f{text-shadow:0 0 3px #e2e8f059}@keyframes subtleFloat{0%{transform:translateY(0)}50%{transform:translateY(-2px)}to{transform:translateY(0)}}.prompt.terminal-glow.jsx-6af870cc49ca110f{animation:4s ease-in-out infinite subtleFloat,2s infinite alternate glowPulse}@keyframes glowPulse{0%{text-shadow:0 0 5px #ecfc0280,0 0 8px #ecfc024d}to{text-shadow:0 0 8px #ecfc02cc,0 0 12px #ecfc0280}}.enhanced-about.jsx-6af870cc49ca110f{background:linear-gradient(#0006,#0000004d);border-style:solid;border-width:1px;border-image:linear-gradient(90deg,#3498db,#2ecc71,#9b59b6,#ff5722) 1;box-shadow:0 0 15px #10b9814d}.about-section-title.jsx-6af870cc49ca110f{color:#10b981;text-underline-offset:5px;margin-top:15px;margin-bottom:5px;font-size:1.1em;font-weight:700;-webkit-text-decoration:underline #10b98180;text-decoration:underline #10b98180;display:block}.lang-python.jsx-6af870cc49ca110f{color:#3572a5;font-weight:700}.lang-c.jsx-6af870cc49ca110f{color:#f34b7d;font-weight:700}.lang-bash.jsx-6af870cc49ca110f{color:#89e051;font-weight:700}.lang-ps.jsx-6af870cc49ca110f{color:#012456;font-weight:700}.lang-go.jsx-6af870cc49ca110f{color:#00add8;font-weight:700}.lang-rust.jsx-6af870cc49ca110f{color:#dea584;font-weight:700}.skill-highlight.jsx-6af870cc49ca110f{color:#60a5fa;background-color:#0003;border-radius:3px;padding:1px 5px;font-weight:700}.service-category.jsx-6af870cc49ca110f{color:#ff9800;text-underline-offset:4px;margin-top:15px;margin-bottom:8px;font-size:1.05em;font-weight:700;-webkit-text-decoration:underline #ff980080;text-decoration:underline #ff980080;display:block}.service-name.jsx-6af870cc49ca110f{color:khaki;background-color:#00000040;border-radius:3px;padding:1px 5px;font-weight:700}.services-section.jsx-6af870cc49ca110f{background:linear-gradient(#0006,#0000004d);border-style:solid;border-width:1px;border-image:linear-gradient(90deg,#ff5722,#ffeb3b,#ff9800) 1;position:relative;overflow:hidden;box-shadow:0 0 15px #ff572233}.services-section.jsx-6af870cc49ca110f:before{content:"";pointer-events:none;z-index:0;background:radial-gradient(circle at 10% 20%,#ff57220d 0%,#0000 50%),radial-gradient(circle at 90% 80%,#ff980012 0%,#0000 40%),radial-gradient(circle,#ffeb3b08 0%,#0000 70%);position:absolute;inset:0}.services-section.jsx-6af870cc49ca110f .section-title.jsx-6af870cc49ca110f,.services-section.jsx-6af870cc49ca110f .section-content.jsx-6af870cc49ca110f{z-index:1;position:relative}.services-section.jsx-6af870cc49ca110f:after{content:"";opacity:.5;pointer-events:none;z-index:0;background-image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'4\' height=\'4\'%3E%3Cpath d=\'M1 3h1v1H1V3zm2-2h1v1H3V1z\' fill=\'rgba(255,255,255,0.025)\'/%3E%3C/svg%3E");position:absolute;inset:0}.cert-status.jsx-6af870cc49ca110f{border-radius:4px;margin-left:8px;padding:2px 6px;font-size:.9em;font-weight:700;display:inline-block}.cert-status.completed.jsx-6af870cc49ca110f{color:#10b981;background-color:#10b98133;border:1px solid #10b9814d}.cert-status.planned.jsx-6af870cc49ca110f{color:#f59e0b;background-color:#f59e0b33;border:1px solid #f59e0b4d}'
            }, void 0, false, void 0, this)
        ]
    }, void 0, true);
}
_s(Terminal, "k3XZAxYS2OAgy9zJ//BJp1+baLI=");
_c = Terminal;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleHelpCommand = (args)=>{
    return `<pre class="help-menu fixed-width-pre no-blink-scrollbar static-scrollbar">
╔══════════════════════════════════════════════════════════════════╗
║                   <span class="help-title-text">CRYPTER TERMINAL COMMANDS</span>                   ║
╠══════════════════════════════════════════════════════════════════╣
║  <span class="cmd-name">help</span>     - <span class="cmd-desc">Display this interactive command reference</span>           ║
║  <span class="cmd-name">clear</span>    - <span class="cmd-desc">Clear the terminal display</span>                           ║
║  <span class="cmd-name">banner</span>   - <span class="cmd-desc">Show the Crypter ASCII art banner</span>                    ║
║  <span class="cmd-name">ls</span>       - <span class="cmd-desc">List accessible files and directories</span>                ║
║  <span class="cmd-name">exit</span>     - <span class="cmd-desc">Exit the terminal and return to OS</span>                   ║
╠══════════════════════════════════════════════════════════════════╣
║                   <span class="help-section-text">PORTFOLIO COMMANDS</span>                           ║
╠══════════════════════════════════════════════════════════════════╣
║  <span class="cmd-name">about</span>    - <span class="cmd-desc">Display comprehensive profile information</span>            ║
║  <span class="cmd-name">projects</span> - <span class="cmd-desc">View GitHub projects in Firefox</span>                      ║
║  <span class="cmd-name">toolspage</span> - <span class="cmd-desc">View security tools in Firefox</span>                      ║
║  <span class="cmd-name">services</span> - <span class="cmd-desc">View cybersecurity services offered</span>                  ║
║  <span class="cmd-name">pentest</span>  - <span class="cmd-desc">Information about penetration testing services</span>       ║
║  <span class="cmd-name">ctf</span>      - <span class="cmd-desc">View CTF achievements and writeups</span>                   ║
║  <span class="cmd-name">contact</span>  - <span class="cmd-desc">Display contact information</span>                          ║
╚══════════════════════════════════════════════════════════════════╝</pre>`;
};
var _c;
__turbopack_context__.k.register(_c, "Terminal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/public/assets/svg/firefox.svg (static in ecmascript)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v("/_next/static/media/firefox.d81cffff.svg");}}),
"[project]/public/assets/svg/firefox.svg.mjs { IMAGE => \"[project]/public/assets/svg/firefox.svg (static in ecmascript)\" } [app-client] (structured image object, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$assets$2f$svg$2f$firefox$2e$svg__$28$static__in__ecmascript$29$__ = __turbopack_context__.i("[project]/public/assets/svg/firefox.svg (static in ecmascript)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$assets$2f$svg$2f$firefox$2e$svg__$28$static__in__ecmascript$29$__["default"],
    width: 1200,
    height: 800,
    blurDataURL: null,
    blurWidth: 0,
    blurHeight: 0
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/public/assets/svg/terminal.svg (static in ecmascript)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v("/_next/static/media/terminal.3d1e878c.svg");}}),
"[project]/public/assets/svg/terminal.svg.mjs { IMAGE => \"[project]/public/assets/svg/terminal.svg (static in ecmascript)\" } [app-client] (structured image object, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$assets$2f$svg$2f$terminal$2e$svg__$28$static__in__ecmascript$29$__ = __turbopack_context__.i("[project]/public/assets/svg/terminal.svg (static in ecmascript)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$assets$2f$svg$2f$terminal$2e$svg__$28$static__in__ecmascript$29$__["default"],
    width: 800,
    height: 800,
    blurDataURL: null,
    blurWidth: 0,
    blurHeight: 0
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/public/assets/svg/kali-logo.png (static in ecmascript)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v("/_next/static/media/kali-logo.b8788e02.png");}}),
"[project]/public/assets/svg/kali-logo.png.mjs { IMAGE => \"[project]/public/assets/svg/kali-logo.png (static in ecmascript)\" } [app-client] (structured image object, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$assets$2f$svg$2f$kali$2d$logo$2e$png__$28$static__in__ecmascript$29$__ = __turbopack_context__.i("[project]/public/assets/svg/kali-logo.png (static in ecmascript)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$assets$2f$svg$2f$kali$2d$logo$2e$png__$28$static__in__ecmascript$29$__["default"],
    width: 100,
    height: 100,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAuklEQVR42oWPvwqCQACHPfVOU9PLy8v/RSWFEIUQEVFLBzU1GbQ0REtrS1OvUPQE0Sv0RL1KR5uD9Js/+L6fIPybDJFvYLo2nTg3SMAkqNgFQDcJc+L02hyxd7LYfdz+9G7Wg1xGqv8DkKL1MI0P2G3v7Sg9Rdnq5aWzBwdvkgwtAQBRFSXZ5Cyo4EZGk/FFq7kT7HW3UNHCgg6IIuIdc7s1OIbD5bNKgk1ZO9AxZcTrnEvfca0FkRp9AUflFJQdrKK2AAAAAElFTkSuQmCC",
    blurWidth: 8,
    blurHeight: 8
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/public/assets/wallpaper/kali-ferrofluid.jpg (static in ecmascript)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v("/_next/static/media/kali-ferrofluid.d81f2df8.jpg");}}),
"[project]/public/assets/wallpaper/kali-ferrofluid.jpg.mjs { IMAGE => \"[project]/public/assets/wallpaper/kali-ferrofluid.jpg (static in ecmascript)\" } [app-client] (structured image object, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$assets$2f$wallpaper$2f$kali$2d$ferrofluid$2e$jpg__$28$static__in__ecmascript$29$__ = __turbopack_context__.i("[project]/public/assets/wallpaper/kali-ferrofluid.jpg (static in ecmascript)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$assets$2f$wallpaper$2f$kali$2d$ferrofluid$2e$jpg__$28$static__in__ecmascript$29$__["default"],
    width: 3840,
    height: 2160,
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/wAARCAAFAAgDAREAAhEBAxEB/9sAQwAKBwcIBwYKCAgICwoKCw4YEA4NDQ4dFRYRGCMfJSQiHyIhJis3LyYpNCkhIjBBMTQ5Oz4+PiUuRElDPEg3PT47/9sAQwEKCwsODQ4cEBAcOygiKDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDzEuzWWSFyrcEDmnbS5PWx/9k=",
    blurWidth: 8,
    blurHeight: 5
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/ArchLinuxOS.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ArchLinuxOS)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$assets$2f$svg$2f$firefox$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$assets$2f$svg$2f$firefox$2e$svg__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/public/assets/svg/firefox.svg.mjs { IMAGE => "[project]/public/assets/svg/firefox.svg (static in ecmascript)" } [app-client] (structured image object, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$assets$2f$svg$2f$terminal$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$assets$2f$svg$2f$terminal$2e$svg__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/public/assets/svg/terminal.svg.mjs { IMAGE => "[project]/public/assets/svg/terminal.svg (static in ecmascript)" } [app-client] (structured image object, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$assets$2f$svg$2f$kali$2d$logo$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$assets$2f$svg$2f$kali$2d$logo$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/public/assets/svg/kali-logo.png.mjs { IMAGE => "[project]/public/assets/svg/kali-logo.png (static in ecmascript)" } [app-client] (structured image object, ecmascript)');
// Import the wallpaper
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$assets$2f$wallpaper$2f$kali$2d$ferrofluid$2e$jpg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$assets$2f$wallpaper$2f$kali$2d$ferrofluid$2e$jpg__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/public/assets/wallpaper/kali-ferrofluid.jpg.mjs { IMAGE => "[project]/public/assets/wallpaper/kali-ferrofluid.jpg (static in ecmascript)" } [app-client] (structured image object, ecmascript)');
;
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
// Import Firefox dynamically to fix the rendering issue
const Firefox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.r("[project]/components/Firefox.tsx [app-client] (ecmascript, next/dynamic entry, async loader)")(__turbopack_context__.i), {
    loadableGenerated: {
        modules: [
            "[project]/components/Firefox.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c = Firefox;
;
;
;
;
function ArchLinuxOS({ onOpenTerminal }) {
    _s();
    const [currentTime, setCurrentTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [currentDate, setCurrentDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [showHint, setShowHint] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showFirefox, setShowFirefox] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showFirefoxProjects, setShowFirefoxProjects] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [initialWindowPosition, setInitialWindowPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ArchLinuxOS.useEffect": ()=>{
            // Set initial time and date values on client-side only
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString());
            setCurrentDate(now.toLocaleDateString());
            // Set the initial window position safely on the client side
            setInitialWindowPosition({
                x: window.innerWidth * 0.025,
                y: window.innerHeight * 0.05 + 48
            });
            // Update the time every second
            const timer = setInterval({
                "ArchLinuxOS.useEffect.timer": ()=>{
                    const now = new Date();
                    setCurrentTime(now.toLocaleTimeString());
                    setCurrentDate(now.toLocaleDateString());
                }
            }["ArchLinuxOS.useEffect.timer"], 1000);
            // Hide hint after 5 seconds (reduced from 10)
            const hintTimer = setTimeout({
                "ArchLinuxOS.useEffect.hintTimer": ()=>{
                    setShowHint(false);
                }
            }["ArchLinuxOS.useEffect.hintTimer"], 5000); // Increased to 8 seconds to give more time to read
            return ({
                "ArchLinuxOS.useEffect": ()=>{
                    clearInterval(timer);
                    clearTimeout(hintTimer);
                }
            })["ArchLinuxOS.useEffect"];
        }
    }["ArchLinuxOS.useEffect"], []);
    // Function to handle opening Firefox from Terminal with projects
    const handleOpenFirefox = (showProjects = false, showTools = false)=>{
        console.log('ArchLinuxOS: Opening Firefox with params:', {
            showProjects,
            showTools
        });
        // Calculate a properly centered position for Firefox
        if ("TURBOPACK compile-time truthy", 1) {
            // First determine the appropriate size of Firefox window
            let width, height;
            if (window.innerWidth < 768) {
                width = '95vw';
                height = '75vh';
            } else if (window.innerWidth < 1024) {
                width = '85vw';
                height = '80vh';
            } else {
                width = '80vw';
                height = '85vh';
            }
            // Convert vw/vh to pixels
            const parsedWidth = parseFloat(width) / 100 * window.innerWidth;
            const parsedHeight = parseFloat(height) / 100 * window.innerHeight;
            // Define waybar height
            const WAYBAR_HEIGHT = 48;
            // Calculate exact center position
            const centerX = (window.innerWidth - parsedWidth) / 2;
            const centerY = (window.innerHeight - parsedHeight) / 2;
            // Set centered position for Firefox
            setInitialWindowPosition({
                x: Math.max(0, centerX),
                y: Math.max(WAYBAR_HEIGHT + 2, centerY)
            });
            console.log('ArchLinuxOS: Firefox position set to:', {
                x: Math.max(0, centerX),
                y: Math.max(WAYBAR_HEIGHT + 2, centerY)
            });
        } else {
            "TURBOPACK unreachable";
        }
        // Use a slight delay to prevent flickering
        setTimeout(()=>{
            console.log('ArchLinuxOS: Setting Firefox states');
            setShowFirefoxProjects(showProjects);
            setShowFirefox(true);
        }, 50);
    };
    // Set initial position for windows to be below the waybar
    // This declaration was moved to the useEffect hook to avoid "window is not defined" error
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "hyprland-desktop w-full h-full absolute inset-0 z-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 z-0 overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "wallpaper-blur-container",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$assets$2f$wallpaper$2f$kali$2d$ferrofluid$2e$jpg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$assets$2f$wallpaper$2f$kali$2d$ferrofluid$2e$jpg__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object$2c$__ecmascript$29$__["default"],
                        alt: "Desktop Wallpaper",
                        fill: true,
                        priority: false,
                        quality: 100,
                        loading: "lazy",
                        className: "wallpaper-image",
                        style: {
                            objectFit: "cover",
                            objectPosition: "center",
                            width: "100%",
                            height: "100%",
                            filter: "blur(2px)",
                            transform: "scale(1.05)" // Slightly scale up to avoid blur edges
                        },
                        unoptimized: true,
                        sizes: "100vw",
                        placeholder: "blur",
                        blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                    }, void 0, false, {
                        fileName: "[project]/components/ArchLinuxOS.tsx",
                        lineNumber: 122,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/ArchLinuxOS.tsx",
                    lineNumber: 121,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ArchLinuxOS.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, this),
            showHint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "welcome-hint fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900/90 backdrop-blur-md p-5 rounded-lg shadow-2xl z-50 text-center max-w-md border-2 border-green-500/50 animate-fadeIn",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute -top-3 -right-3 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full p-1.5 shadow-lg pulse-glow",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            className: "h-5 w-5 text-gray-900",
                            viewBox: "0 0 24 24",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                fill: "none",
                                stroke: "currentColor",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            }, void 0, false, {
                                fileName: "[project]/components/ArchLinuxOS.tsx",
                                lineNumber: 155,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/ArchLinuxOS.tsx",
                            lineNumber: 150,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ArchLinuxOS.tsx",
                        lineNumber: 149,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 animate-slideUp",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-2 flex items-center justify-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        className: "h-6 w-6 mr-2 text-green-400",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        stroke: "currentColor",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                        }, void 0, false, {
                                            fileName: "[project]/components/ArchLinuxOS.tsx",
                                            lineNumber: 175,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/ArchLinuxOS.tsx",
                                        lineNumber: 168,
                                        columnNumber: 15
                                    }, this),
                                    "Welcome to My Portfolio"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ArchLinuxOS.tsx",
                                lineNumber: 167,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-20 h-0.5 bg-gradient-to-r from-green-500 to-cyan-500 mx-auto rounded-full mb-3"
                            }, void 0, false, {
                                fileName: "[project]/components/ArchLinuxOS.tsx",
                                lineNumber: 184,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ArchLinuxOS.tsx",
                        lineNumber: 166,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 animate-fadeIn delay-300",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "instruction-container bg-gray-800/70 p-3 rounded-lg border border-green-500/30 text-left animate-float",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center mb-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-1.5 rounded-full bg-green-500/20 mr-2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                xmlns: "http://www.w3.org/2000/svg",
                                                className: "h-4 w-4 text-green-400",
                                                viewBox: "0 0 24 24",
                                                fill: "none",
                                                stroke: "currentColor",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 1.5,
                                                    d: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ArchLinuxOS.tsx",
                                                    lineNumber: 193,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/ArchLinuxOS.tsx",
                                                lineNumber: 192,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/ArchLinuxOS.tsx",
                                            lineNumber: 191,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-green-400 font-bold text-sm",
                                            children: "Terminal Interaction"
                                        }, void 0, false, {
                                            fileName: "[project]/components/ArchLinuxOS.tsx",
                                            lineNumber: 196,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/ArchLinuxOS.tsx",
                                    lineNumber: 190,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-300 text-xs leading-relaxed pl-8",
                                    children: [
                                        "Click ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-green-400 font-medium",
                                            children: "Terminal"
                                        }, void 0, false, {
                                            fileName: "[project]/components/ArchLinuxOS.tsx",
                                            lineNumber: 199,
                                            columnNumber: 23
                                        }, this),
                                        " icon for CLI. Type ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "bg-gray-700/70 px-1 rounded text-yellow-300 font-mono text-xs",
                                            children: "help"
                                        }, void 0, false, {
                                            fileName: "[project]/components/ArchLinuxOS.tsx",
                                            lineNumber: 199,
                                            columnNumber: 103
                                        }, this),
                                        " for commands."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/ArchLinuxOS.tsx",
                                    lineNumber: 198,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ArchLinuxOS.tsx",
                            lineNumber: 189,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ArchLinuxOS.tsx",
                        lineNumber: 187,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center animate-fadeIn delay-500",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full h-6 bg-gradient-to-r from-gray-800/90 to-gray-900/90 p-1.5 rounded-md border border-green-500/30 mb-2 flex items-center justify-center overflow-hidden",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-0.5 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 w-full animate-scanning"
                            }, void 0, false, {
                                fileName: "[project]/components/ArchLinuxOS.tsx",
                                lineNumber: 206,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/ArchLinuxOS.tsx",
                            lineNumber: 205,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ArchLinuxOS.tsx",
                        lineNumber: 204,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center justify-center animate-fadeIn delay-600",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center text-xs bg-gradient-to-r from-gray-800/90 to-gray-900/90 p-2 rounded-md border border-green-500/30 w-full mb-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        className: "h-4 w-4 text-green-400 mr-1.5 animate-pulse",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        stroke: "currentColor",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 1.5,
                                            d: "M13 10V3L4 14h7v7l9-11h-7z"
                                        }, void 0, false, {
                                            fileName: "[project]/components/ArchLinuxOS.tsx",
                                            lineNumber: 219,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/ArchLinuxOS.tsx",
                                        lineNumber: 212,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-green-400 font-medium",
                                        children: "Click Terminal to begin exploring"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ArchLinuxOS.tsx",
                                        lineNumber: 226,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ArchLinuxOS.tsx",
                                lineNumber: 211,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[10px] text-gray-400 flex items-center mt-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        className: "h-3 w-3 mr-1 text-gray-500",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        stroke: "currentColor",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 1.5,
                                            d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        }, void 0, false, {
                                            fileName: "[project]/components/ArchLinuxOS.tsx",
                                            lineNumber: 238,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/ArchLinuxOS.tsx",
                                        lineNumber: 231,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Auto-closing in a few seconds..."
                                    }, void 0, false, {
                                        fileName: "[project]/components/ArchLinuxOS.tsx",
                                        lineNumber: 245,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ArchLinuxOS.tsx",
                                lineNumber: 230,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ArchLinuxOS.tsx",
                        lineNumber: 210,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ArchLinuxOS.tsx",
                lineNumber: 148,
                columnNumber: 9
            }, this),
            showFirefox && initialWindowPosition && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Firefox, {
                onClose: ()=>{
                    console.log('ArchLinuxOS: Closing Firefox');
                    setShowFirefox(false);
                    setShowFirefoxProjects(false);
                },
                initialUrl: "https://crypter.security",
                showProjects: showFirefoxProjects,
                showTools: false,
                initialPosition: initialWindowPosition
            }, void 0, false, {
                fileName: "[project]/components/ArchLinuxOS.tsx",
                lineNumber: 253,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "desktop-icons absolute top-16 left-4 grid gap-6 z-30",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "desktop-icon flex flex-col items-center cursor-pointer",
                        onClick: ()=>initialWindowPosition && onOpenTerminal(initialWindowPosition),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "icon-bg p-3 mb-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$assets$2f$svg$2f$terminal$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$assets$2f$svg$2f$terminal$2e$svg__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object$2c$__ecmascript$29$__["default"],
                                    alt: "Terminal Logo",
                                    width: 56,
                                    height: 56,
                                    className: "transition-all duration-300",
                                    style: {
                                        width: '56px',
                                        height: '56px',
                                        maxWidth: '100%',
                                        objectFit: 'contain'
                                    },
                                    priority: true
                                }, void 0, false, {
                                    fileName: "[project]/components/ArchLinuxOS.tsx",
                                    lineNumber: 273,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/ArchLinuxOS.tsx",
                                lineNumber: 272,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-white font-medium px-2 py-1 rounded",
                                children: "Terminal"
                            }, void 0, false, {
                                fileName: "[project]/components/ArchLinuxOS.tsx",
                                lineNumber: 283,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ArchLinuxOS.tsx",
                        lineNumber: 268,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "desktop-icon flex flex-col items-center cursor-pointer",
                        onClick: ()=>handleOpenFirefox(false, false),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "icon-bg p-3 mb-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$assets$2f$svg$2f$firefox$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$assets$2f$svg$2f$firefox$2e$svg__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object$2c$__ecmascript$29$__["default"],
                                    alt: "Firefox Logo",
                                    width: 56,
                                    height: 56,
                                    className: "transition-all duration-300",
                                    style: {
                                        width: '56px',
                                        height: '56px',
                                        maxWidth: '100%',
                                        objectFit: 'contain'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/ArchLinuxOS.tsx",
                                    lineNumber: 293,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/ArchLinuxOS.tsx",
                                lineNumber: 292,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-white font-medium px-2 py-1 rounded",
                                children: "Firefox"
                            }, void 0, false, {
                                fileName: "[project]/components/ArchLinuxOS.tsx",
                                lineNumber: 302,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ArchLinuxOS.tsx",
                        lineNumber: 288,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ArchLinuxOS.tsx",
                lineNumber: 267,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hyprland-window-effect"
            }, void 0, false, {
                fileName: "[project]/components/ArchLinuxOS.tsx",
                lineNumber: 309,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "taskbar fixed top-0 left-0 right-0 h-12 bg-gray-900/60 backdrop-blur-sm flex items-center px-4 z-[100] border-b border-gray-800/40 shadow-md pointer-events-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "arch-logo mr-4 text-green-400 flex items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$assets$2f$svg$2f$kali$2d$logo$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$assets$2f$svg$2f$kali$2d$logo$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object$2c$__ecmascript$29$__["default"],
                            alt: "Arch Linux Logo",
                            width: 24,
                            height: 24,
                            className: "transition-all duration-300",
                            style: {
                                width: '24px',
                                height: '24px',
                                maxWidth: '100%',
                                objectFit: 'contain'
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/ArchLinuxOS.tsx",
                            lineNumber: 314,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ArchLinuxOS.tsx",
                        lineNumber: 313,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "active-apps flex space-x-2 ml-4"
                    }, void 0, false, {
                        fileName: "[project]/components/ArchLinuxOS.tsx",
                        lineNumber: 325,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "system-tray ml-auto flex items-center space-x-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "tray-icon",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    className: "h-5 w-5",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 1.5,
                                        d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ArchLinuxOS.tsx",
                                        lineNumber: 341,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/ArchLinuxOS.tsx",
                                    lineNumber: 334,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/ArchLinuxOS.tsx",
                                lineNumber: 333,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "tray-icon",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    className: "h-5 w-5",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 1.5,
                                        d: "M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 010-7.072m12.728 0l-3.536 3.536M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ArchLinuxOS.tsx",
                                        lineNumber: 357,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/ArchLinuxOS.tsx",
                                    lineNumber: 350,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/ArchLinuxOS.tsx",
                                lineNumber: 349,
                                columnNumber: 11
                            }, this),
                            currentDate && currentTime && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "datetime-widget flex items-center space-x-2 bg-gray-800/40 px-2 py-1 rounded-md border border-gray-700/50 backdrop-blur-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "date-section flex items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                xmlns: "http://www.w3.org/2000/svg",
                                                className: "h-3.5 w-3.5 text-green-400 mr-1",
                                                fill: "none",
                                                viewBox: "0 0 24 24",
                                                stroke: "currentColor",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 1.5,
                                                    d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ArchLinuxOS.tsx",
                                                    lineNumber: 375,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/ArchLinuxOS.tsx",
                                                lineNumber: 368,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] text-gray-400 font-medium tracking-wide leading-tight",
                                                        children: new Date().toLocaleDateString('en-US', {
                                                            weekday: 'short'
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ArchLinuxOS.tsx",
                                                        lineNumber: 383,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-gray-200 font-medium leading-tight",
                                                        children: new Date().toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ArchLinuxOS.tsx",
                                                        lineNumber: 386,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/ArchLinuxOS.tsx",
                                                lineNumber: 382,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ArchLinuxOS.tsx",
                                        lineNumber: 367,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "time-section flex items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                xmlns: "http://www.w3.org/2000/svg",
                                                className: "h-3.5 w-3.5 text-cyan-400 mr-1",
                                                fill: "none",
                                                viewBox: "0 0 24 24",
                                                stroke: "currentColor",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 1.5,
                                                    d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ArchLinuxOS.tsx",
                                                    lineNumber: 399,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/ArchLinuxOS.tsx",
                                                lineNumber: 392,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] text-gray-400 font-medium tracking-wide leading-tight",
                                                        children: [
                                                            new Date().toLocaleTimeString('en-US', {
                                                                hour12: false
                                                            }).split(':')[0],
                                                            "h"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/ArchLinuxOS.tsx",
                                                        lineNumber: 407,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-gray-200 font-mono leading-tight",
                                                        children: new Date().toLocaleTimeString('en-US', {
                                                            hour12: false,
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ArchLinuxOS.tsx",
                                                        lineNumber: 410,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/ArchLinuxOS.tsx",
                                                lineNumber: 406,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ArchLinuxOS.tsx",
                                        lineNumber: 391,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ArchLinuxOS.tsx",
                                lineNumber: 366,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ArchLinuxOS.tsx",
                        lineNumber: 332,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ArchLinuxOS.tsx",
                lineNumber: 312,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-4 right-4 z-50 group",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: "https://github.com/CrypterENC/OS_PORTFOLIO.git",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "flex items-center gap-2 bg-gradient-to-r from-gray-900/90 to-gray-800/90 hover:from-gray-800/90 hover:to-gray-700/90 text-white px-4 py-2 rounded-lg border border-gray-700/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/20 group-hover:border-green-500/50",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    className: "h-5 w-5 text-yellow-400 transform group-hover:rotate-12 transition-transform duration-300",
                                    fill: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M12 .587l3.668 7.431 8.2 1.191-5.932 5.783 1.4 8.168-7.336-3.857-7.336 3.857 1.4-8.168-5.932-5.783 8.2-1.191z"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ArchLinuxOS.tsx",
                                        lineNumber: 439,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/ArchLinuxOS.tsx",
                                    lineNumber: 433,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] font-bold text-gray-900",
                                        children: "★"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ArchLinuxOS.tsx",
                                        lineNumber: 442,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/ArchLinuxOS.tsx",
                                    lineNumber: 441,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ArchLinuxOS.tsx",
                            lineNumber: 432,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-start",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm font-medium group-hover:text-green-400 transition-colors duration-300",
                                    children: "Star on GitHub"
                                }, void 0, false, {
                                    fileName: "[project]/components/ArchLinuxOS.tsx",
                                    lineNumber: 446,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] text-gray-400 group-hover:text-gray-300 transition-colors duration-300",
                                    children: "Support the project"
                                }, void 0, false, {
                                    fileName: "[project]/components/ArchLinuxOS.tsx",
                                    lineNumber: 447,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ArchLinuxOS.tsx",
                            lineNumber: 445,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "ml-2 px-2 py-1 bg-gray-800/50 rounded-md border border-gray-700/50 group-hover:border-green-500/30 transition-colors duration-300",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-mono text-gray-300 group-hover:text-green-400 transition-colors duration-300",
                                children: "★"
                            }, void 0, false, {
                                fileName: "[project]/components/ArchLinuxOS.tsx",
                                lineNumber: 450,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/ArchLinuxOS.tsx",
                            lineNumber: 449,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ArchLinuxOS.tsx",
                    lineNumber: 426,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ArchLinuxOS.tsx",
                lineNumber: 425,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ArchLinuxOS.tsx",
        lineNumber: 118,
        columnNumber: 5
    }, this);
}
_s(ArchLinuxOS, "pn5q5wAiDvDDRFHnBSl4nU30+OA=");
_c1 = ArchLinuxOS;
var _c, _c1;
__turbopack_context__.k.register(_c, "Firefox");
__turbopack_context__.k.register(_c1, "ArchLinuxOS");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/Firefox.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Firefox)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollToPlugin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollToPlugin.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
// Register ScrollToPlugin for smooth scrolling
if ("TURBOPACK compile-time truthy", 1) {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollToPlugin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollToPlugin"]);
}
// Add responsive sizing constants
const FIREFOX_SIZES = {
    small: {
        width: "95vw",
        height: "75vh",
        maxWidth: "700px"
    },
    medium: {
        width: "85vw",
        height: "80vh",
        maxWidth: "1000px"
    },
    large: {
        width: "80vw",
        height: "85vh",
        maxWidth: "1400px"
    }
};
// Helper function to format date
const formatDate = (dateString)=>{
    const date = new Date(dateString);
    // Return date in format like "Jan 15, 2023"
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};
function Firefox({ onClose, initialUrl = "https://crypter.security", showProjects = false, showTools = false, githubUsername = "CrypterENC", initialPosition = {
    x: 0,
    y: 0
} }) {
    _s();
    const [currentUrl, setCurrentUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(showProjects ? `https://github.com/${githubUsername}` : showTools ? "https://crypter.security/tools" : initialUrl);
    const [history, setHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        showProjects ? `https://github.com/${githubUsername}` : showTools ? "https://crypter.security/tools" : initialUrl
    ]);
    const [historyIndex, setHistoryIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [bookmarks, setBookmarks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        "https://crypter.security",
        "https://github.com/CrypterENC"
    ]);
    const [isMinimized, setIsMinimized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [position, setPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialPosition);
    // GitHub projects related states
    const [repos, setRepos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [repoError, setRepoError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    // Update repos per page based on screen size
    const [reposPerPage, setReposPerPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(8); // Default to 8 repos per page for larger screens
    const username = githubUsername; // Use the provided GitHub username
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // First add a state to track the rate limit info
    // const [rateLimitInfo, setRateLimitInfo] = useState<RateLimitInfo | null>(null);
    // Sample repositories to use as fallback when API fails
    const sampleRepos = [
        {
            id: 1,
            name: "NMap-Scanner",
            description: "Advanced network scanning tool with enhanced security features",
            html_url: "https://github.com/CrypterENC/NMap-Scanner",
            stargazers_count: 87,
            language: "Python",
            topics: [
                "security",
                "network",
                "scanner"
            ],
            updated_at: "2023-10-15T12:30:45Z",
            owner: {
                login: "CrypterENC",
                avatar_url: "https://avatars.githubusercontent.com/u/12345678"
            },
            fork: false,
            private: false
        },
        {
            id: 2,
            name: "Vulnerability-DB",
            description: "Comprehensive database of vulnerabilities with mitigation strategies",
            html_url: "https://github.com/CrypterENC/Vulnerability-DB",
            stargazers_count: 124,
            language: "JavaScript",
            topics: [
                "security",
                "database",
                "vulnerabilities"
            ],
            updated_at: "2023-11-05T08:15:22Z",
            owner: {
                login: "CrypterENC",
                avatar_url: "https://avatars.githubusercontent.com/u/12345678"
            },
            fork: false,
            private: false
        },
        {
            id: 3,
            name: "CipherBreaker",
            description: "Tool for analyzing and breaking common encryption methods",
            html_url: "https://github.com/CrypterENC/CipherBreaker",
            stargazers_count: 65,
            language: "Rust",
            topics: [
                "cryptography",
                "security",
                "encryption"
            ],
            updated_at: "2023-09-22T14:45:10Z",
            owner: {
                login: "CrypterENC",
                avatar_url: "https://avatars.githubusercontent.com/u/12345678"
            },
            fork: false,
            private: false
        }
    ];
    // Create a ref for the Firefox indicator
    const firefoxIndicatorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Add ref for GitHub projects container
    const projectsContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Update window size state
    const [windowSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        width: ("TURBOPACK compile-time truthy", 1) ? window.innerWidth : ("TURBOPACK unreachable", undefined),
        height: ("TURBOPACK compile-time truthy", 1) ? window.innerHeight : ("TURBOPACK unreachable", undefined)
    });
    // Add Firefox window state
    const [firefoxState, setFirefoxState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        isMaximized: false,
        isMinimized: false,
        width: FIREFOX_SIZES.large.width,
        height: FIREFOX_SIZES.large.height,
        maxWidth: FIREFOX_SIZES.large.maxWidth
    });
    // Function to get responsive sizes
    const getResponsiveSizes = ()=>{
        if (windowSize.width < 768) {
            return FIREFOX_SIZES.small;
        } else if (windowSize.width < 1024) {
            return FIREFOX_SIZES.medium;
        }
        return FIREFOX_SIZES.large;
    };
    // Update initial position calculation
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Firefox.useEffect": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                // Use initialPosition as-is, without any centering calculations
                setPosition(initialPosition);
            }
        // Only run when component mounts
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["Firefox.useEffect"], []);
    // Handle window resizing
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Firefox.useEffect": ()=>{
            const handleResize = {
                "Firefox.useEffect.handleResize": ()=>{
                    if ("object" !== "undefined" && !firefoxState.isMaximized) {
                        const { width, height, maxWidth } = getResponsiveSizes();
                        // Only update sizes, not position
                        setFirefoxState({
                            "Firefox.useEffect.handleResize": (prev)=>({
                                    ...prev,
                                    width,
                                    height,
                                    maxWidth
                                })
                        }["Firefox.useEffect.handleResize"]);
                    }
                }
            }["Firefox.useEffect.handleResize"];
            window.addEventListener("resize", handleResize);
            return ({
                "Firefox.useEffect": ()=>window.removeEventListener("resize", handleResize)
            })["Firefox.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["Firefox.useEffect"], [
        firefoxState.isMaximized
    ]);
    // Modify maximize/minimize handlers
    const handleMaximize = ()=>{
        // Get the main OS container to maximize relative to it
        const mainContainer = document.querySelector("main");
        const firefoxWindow = document.querySelector(".firefox-window");
        if (!mainContainer || !firefoxWindow) return;
        // Get main container dimensions
        const mainRect = mainContainer.getBoundingClientRect();
        // Disable transitions during state change to prevent visual glitches
        firefoxWindow.style.transition = "none";
        // Toggle maximized state
        const newMaximizedState = !firefoxState.isMaximized;
        if (newMaximizedState) {
            // Save current position before maximizing
            if ("TURBOPACK compile-time truthy", 1) {
                try {
                    // Get the current window dimensions from the DOM (not state)
                    const currentRect = firefoxWindow.getBoundingClientRect();
                    // Store position and size in localStorage
                    localStorage.setItem("firefox-position-before-maximize", JSON.stringify({
                        x: currentRect.left,
                        y: currentRect.top
                    }));
                    localStorage.setItem("firefox-size-before-maximize", JSON.stringify({
                        width: firefoxState.width,
                        height: firefoxState.height,
                        maxWidth: firefoxState.maxWidth,
                        actualWidth: currentRect.width,
                        actualHeight: currentRect.height
                    }));
                } catch  {
                // If localStorage fails, just continue
                }
            }
            // Force maximized position and size
            // Set directly on DOM for immediate effect
            firefoxWindow.style.width = `${mainRect.width}px`;
            firefoxWindow.style.height = `${mainRect.height - 56}px`;
            firefoxWindow.style.maxWidth = "100%";
            firefoxWindow.style.left = `${mainRect.left}px`;
            firefoxWindow.style.top = "56px";
            firefoxWindow.style.borderRadius = "0";
            // Also update React state
            setPosition({
                x: mainRect.left,
                y: 56
            });
            // Add maximized class for additional styling
            firefoxWindow.classList.add("firefox-maximized");
        } else {
            // Get saved position and size
            try {
                const savedPositionStr = localStorage.getItem("firefox-position-before-maximize");
                const savedSizeStr = localStorage.getItem("firefox-size-before-maximize");
                if (savedPositionStr && savedSizeStr) {
                    const savedPosition = JSON.parse(savedPositionStr);
                    const savedSize = JSON.parse(savedSizeStr);
                    // Restore previous size and position directly to DOM
                    firefoxWindow.style.width = savedSize.width;
                    firefoxWindow.style.height = savedSize.height;
                    firefoxWindow.style.maxWidth = savedSize.maxWidth;
                    firefoxWindow.style.left = `${savedPosition.x}px`;
                    firefoxWindow.style.top = `${savedPosition.y}px`;
                    firefoxWindow.style.borderRadius = "6px";
                    // Update React state
                    setPosition(savedPosition);
                    // Update size state as well
                    setFirefoxState((prev)=>({
                            ...prev,
                            width: savedSize.width,
                            height: savedSize.height,
                            maxWidth: savedSize.maxWidth,
                            isMaximized: false
                        }));
                    // Remove maximized class
                    firefoxWindow.classList.remove("firefox-maximized");
                    // Re-enable transitions after brief delay
                    setTimeout(()=>{
                        firefoxWindow.style.transition = "transform 300ms ease-out, opacity 300ms ease-out, border-radius 300ms ease-out";
                    }, 50);
                    return;
                }
            } catch  {
            // If restoration fails, use default sizing from getResponsiveSizes
            }
            // Fallback if we couldn't restore from localStorage
            const responsiveSizes = getResponsiveSizes();
            // Apply responsive sizes directly to DOM
            firefoxWindow.style.width = responsiveSizes.width;
            firefoxWindow.style.height = responsiveSizes.height;
            firefoxWindow.style.maxWidth = responsiveSizes.maxWidth;
            // Use the initial position instead of centering
            firefoxWindow.style.left = `${initialPosition.x}px`;
            firefoxWindow.style.top = `${initialPosition.y}px`;
            firefoxWindow.style.borderRadius = "6px";
            // Update React state
            setPosition(initialPosition);
            // Remove maximized class
            firefoxWindow.classList.remove("firefox-maximized");
        }
        // Update the state
        setFirefoxState((prev)=>({
                ...prev,
                isMaximized: newMaximizedState,
                width: newMaximizedState ? `${mainRect.width}px` : prev.width,
                height: newMaximizedState ? `${mainRect.height - 56}px` : prev.height,
                maxWidth: newMaximizedState ? "100%" : prev.maxWidth
            }));
        // Re-enable transitions after brief delay
        setTimeout(()=>{
            if (firefoxWindow) {
                firefoxWindow.style.transition = "transform 300ms ease-out, opacity 300ms ease-out, border-radius 300ms ease-out";
            }
        }, 50);
    };
    const handleMinimize = ()=>{
        setFirefoxState((prev)=>({
                ...prev,
                isMinimized: true
            }));
        setIsMinimized(true);
    };
    const handleRestore = ()=>{
        // Simple restore without any centering logic
        if ("TURBOPACK compile-time truthy", 1) {
            const firefoxWindow = document.querySelector(".firefox-window");
            if (firefoxWindow) {
                // Just make it visible again at its current position
                firefoxWindow.style.display = "flex";
            }
        }
        // Update minimized state
        setIsMinimized(false);
        setFirefoxState((prev)=>({
                ...prev,
                isMinimized: false
            }));
    };
    // Add smooth scrolling function for GitHub projects
    const scrollToProjectsTop = ()=>{
        if (projectsContainerRef.current) {
            // Use GSAP to scroll smoothly to the top
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(projectsContainerRef.current, {
                scrollTo: {
                    y: 0,
                    autoKill: true
                },
                duration: 0.4,
                ease: "power3.out",
                overwrite: true
            });
        }
    };
    // Update pagination to use smooth scrolling
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Firefox.useEffect": ()=>{
            // Smooth scroll to top when page changes
            if (currentUrl.includes("github.com") && projectsContainerRef.current) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(projectsContainerRef.current, {
                    scrollTo: {
                        y: 0,
                        autoKill: true
                    },
                    duration: 0.4,
                    ease: "power3.out",
                    overwrite: true
                });
            }
        }
    }["Firefox.useEffect"], [
        currentPage,
        currentUrl
    ]);
    // Update the scroll progress indicator useEffect to use the correct container
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Firefox.useEffect": ()=>{
            // Only run if we're on the GitHub projects page and the ref is available
            if (currentUrl.includes("github.com") && projectsContainerRef.current) {
                const container = projectsContainerRef.current;
                const progressBar = container.querySelector(".scroll-progress-bar");
                if (!progressBar) return;
                // Set initial width
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(progressBar, {
                    width: "0%"
                });
                // Function to update scroll progress
                const updateScrollProgress = {
                    "Firefox.useEffect.updateScrollProgress": ()=>{
                        if (!container) return;
                        const scrollTop = container.scrollTop;
                        const scrollHeight = container.scrollHeight;
                        const clientHeight = container.clientHeight;
                        // Calculate scroll percentage
                        const scrollPercentage = scrollTop / (scrollHeight - clientHeight) * 100;
                        // Update progress bar width with smooth animation
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(progressBar, {
                            width: `${Math.min(scrollPercentage, 100)}%`,
                            duration: 0.3,
                            ease: "power2.out"
                        });
                    }
                }["Firefox.useEffect.updateScrollProgress"];
                // Add scroll event listener
                container.addEventListener("scroll", updateScrollProgress);
                // Initial update
                updateScrollProgress();
                // Clean up event listener on unmount
                return ({
                    "Firefox.useEffect": ()=>{
                        container.removeEventListener("scroll", updateScrollProgress);
                    }
                })["Firefox.useEffect"];
            }
        }
    }["Firefox.useEffect"], [
        currentUrl
    ]);
    // Add an effect to animate the repo cards with GSAP
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Firefox.useEffect": ()=>{
            if (currentUrl.includes("github.com") && projectsContainerRef.current) {
                const cards = projectsContainerRef.current.querySelectorAll(".floating-card");
                // Create random floating animation for each card
                cards.forEach({
                    "Firefox.useEffect": (card, index)=>{
                        const randomDelay = index * 0.1;
                        const randomDuration = 2 + Math.random() * 1;
                        // Create subtle floating animation
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(card, {
                            y: "5px",
                            duration: randomDuration,
                            repeat: -1,
                            yoyo: true,
                            ease: "sine.inOut",
                            delay: randomDelay
                        });
                    }
                }["Firefox.useEffect"]);
                // Clear animations on unmount
                return ({
                    "Firefox.useEffect": ()=>{
                        cards.forEach({
                            "Firefox.useEffect": (card)=>{
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].killTweensOf(card);
                            }
                        }["Firefox.useEffect"]);
                    }
                })["Firefox.useEffect"];
            }
        }
    }["Firefox.useEffect"], [
        currentUrl,
        repos,
        currentPage
    ]);
    // Window dragging functions
    const handleMouseDown = (e)=>{
        if (firefoxState.isMaximized) return; // Don't allow dragging when maximized
        // Get the Firefox window element
        const firefoxWindow = e.currentTarget.parentElement;
        if (!firefoxWindow) return;
        // Get Firefox window dimensions and position
        const firefoxRect = firefoxWindow.getBoundingClientRect();
        const firefoxWidth = firefoxRect.width;
        const firefoxHeight = firefoxRect.height;
        // Store initial mouse position
        const startX = e.clientX;
        const startY = e.clientY;
        // Store initial window position from DOM
        const initialLeft = firefoxRect.left;
        const initialTop = firefoxRect.top;
        // Set cursor style and disable transitions during drag
        document.body.style.cursor = "move";
        firefoxWindow.style.transition = "none";
        // Prevent text selection during drag
        document.body.style.userSelect = "none";
        // Define boundary constants
        const WAYBAR_HEIGHT = 48; // Height of the waybar at the top
        const TASKBAR_PADDING = 2; // Small padding to prevent touching the taskbar
        // Calculate the max x position (right edge of screen minus Firefox width)
        const maxX = window.innerWidth - firefoxWidth;
        // Set minY to waybar height plus padding to prevent overlap
        const minY = WAYBAR_HEIGHT + TASKBAR_PADDING;
        const maxY = window.innerHeight - firefoxHeight;
        // Mouse move handler
        function handleMouseMove(moveEvent) {
            // Calculate new position
            const dx = moveEvent.clientX - startX;
            const dy = moveEvent.clientY - startY;
            // Apply boundaries - ensure full window is visible including right edge
            // Also ensure the window doesn't overlap the waybar at the top
            const newX = Math.max(0, Math.min(maxX, initialLeft + dx));
            const newY = Math.max(minY, Math.min(maxY, initialTop + dy));
            // Update window position directly for immediate feedback
            firefoxWindow.style.left = `${newX}px`;
            firefoxWindow.style.top = `${newY}px`;
            // Prevent default to reduce input lag
            moveEvent.preventDefault();
        }
        // Mouse up handler
        function handleMouseUp() {
            // Re-enable transitions
            firefoxWindow.style.transition = "transform 300ms ease-out, opacity 300ms ease-out, border-radius 300ms ease-out";
            document.body.style.userSelect = "";
            // Get final position from the actual window position
            const finalRect = firefoxWindow.getBoundingClientRect();
            // Final position
            const finalPosition = {
                x: finalRect.left,
                y: finalRect.top
            };
            // Update state with the final position when drag ends
            setPosition(finalPosition);
            // Save position to localStorage
            try {
                localStorage.setItem("firefox-position", JSON.stringify(finalPosition));
            } catch  {
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
    // Navigation functions
    const navigateTo = (url)=>{
        // If not different, don't add to history
        if (url === currentUrl) return;
        // Add the new URL to history and update current URL
        setHistory((prev)=>[
                ...prev.slice(0, historyIndex + 1),
                url
            ]);
        setCurrentUrl(url);
        setHistoryIndex((prev)=>prev + 1);
    };
    const goBack = ()=>{
        if (historyIndex > 0) {
            setHistoryIndex((prev)=>prev - 1);
            setCurrentUrl(history[historyIndex - 1]);
        }
    };
    const goForward = ()=>{
        if (historyIndex < history.length - 1) {
            setHistoryIndex((prev)=>prev + 1);
            setCurrentUrl(history[historyIndex + 1]);
        }
    };
    const refresh = ()=>{
        // For now, just simulate a refresh by resetting currentUrl
        const currentUrlValue = currentUrl;
        setCurrentUrl("");
        setTimeout(()=>{
            setCurrentUrl(currentUrlValue);
        }, 100);
    };
    const toggleBookmark = ()=>{
        if (bookmarks.includes(currentUrl)) {
            // Remove bookmark
            setBookmarks((prev)=>prev.filter((b)=>b !== currentUrl));
        } else {
            // Add bookmark
            setBookmarks((prev)=>[
                    ...prev,
                    currentUrl
                ]);
        }
    };
    // Function to get paginated repos
    const paginatedRepos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Firefox.useMemo[paginatedRepos]": ()=>{
            const startIndex = (currentPage - 1) * reposPerPage;
            const endIndex = startIndex + reposPerPage;
            return repos.slice(startIndex, endIndex);
        }
    }["Firefox.useMemo[paginatedRepos]"], [
        repos,
        currentPage,
        reposPerPage
    ]);
    // Add this new function to completely clear and refresh GitHub repos
    const forceRefreshRepos = async ()=>{
        try {
            console.log('🔄 Performing complete GitHub repo refresh...');
            setIsLoading(true);
            setRepoError(null);
            // First, completely clear all cache entries for this user
            // Clear state
            setRepos([]);
            // Force a fresh API request outside the regular useEffect flow
            await fetchGitHubRepos();
            console.log('✅ Force refresh complete!');
        } catch (err) {
            console.error('Error during force refresh:', err);
            setRepoError('Failed to refresh repositories');
        } finally{
            setIsLoading(false);
        }
    };
    // Add an effect to update repos per page based on screen size
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Firefox.useEffect": ()=>{
            const updateReposPerPage = {
                "Firefox.useEffect.updateReposPerPage": ()=>{
                    if ("TURBOPACK compile-time truthy", 1) {
                        // 8 repos for larger screens (4x2 grid)
                        // 6 repos for medium screens (3x2 grid)
                        // 4 repos for smaller screens (2x2 grid)
                        if (window.innerWidth >= 1280) {
                            setReposPerPage(8); // Large screens: 8 repos in a 4x2 grid
                        } else if (window.innerWidth >= 768) {
                            setReposPerPage(6); // Medium screens: 6 repos in a 3x2 grid
                        } else {
                            setReposPerPage(4); // Small screens: 4 repos in a 2x2 grid
                        }
                    }
                }
            }["Firefox.useEffect.updateReposPerPage"];
            // Set initial value
            updateReposPerPage();
            // Update on resize
            window.addEventListener('resize', updateReposPerPage);
            return ({
                "Firefox.useEffect": ()=>window.removeEventListener('resize', updateReposPerPage)
            })["Firefox.useEffect"];
        }
    }["Firefox.useEffect"], []);
    // Update the useEffect for loading projects
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Firefox.useEffect": ()=>{
            if (showProjects || currentUrl.includes("github.com")) {
                // Introduce a small delay before fetching repos to ensure smooth rendering
                const timer = setTimeout({
                    "Firefox.useEffect.timer": ()=>{
                        fetchGitHubRepos();
                    }
                }["Firefox.useEffect.timer"], 100);
                return ({
                    "Firefox.useEffect": ()=>clearTimeout(timer)
                })["Firefox.useEffect"];
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["Firefox.useEffect"], [
        showProjects,
        currentUrl
    ]);
    // Function to fetch GitHub repos
    const fetchGitHubRepos = async ()=>{
        setIsLoading(true);
        try {
            // First check if we have valid cached data
            const cacheKey = `github-repos-${username}`;
            const cachedRepos = localStorage.getItem(cacheKey);
            const cacheTimestamp = localStorage.getItem(`${cacheKey}-timestamp`);
            const cacheExpiry = 5 * 60 * 1000; // 5 minutes
            if (cachedRepos && cacheTimestamp) {
                const cachedData = JSON.parse(cachedRepos);
                const timestamp = parseInt(cacheTimestamp);
                if (Date.now() - timestamp < cacheExpiry && cachedData.length > 0) {
                    setRepos(cachedData);
                    setRepoError(null);
                    setIsLoading(false);
                    scrollToProjectsTop();
                    // Update cache in background
                    updateCacheInBackground(username, cacheKey);
                    return;
                }
            }
            // Fetch all repositories by handling pagination
            let allRepos = [];
            let page = 1;
            let hasMorePages = true;
            // while (hasMorePages) {
            //   // const response = await fetch(
            //     // ``,
            //     // {
            //       // headers: {
            //         // Accept: "application/vnd.github.v3+json",
            //         // "User-Agent": "Mozilla/5.0",
            //       // },
            //     // }
            //   // );
            //   if (!response.ok) {
            //     throw new Error(`GitHub API error: ${response.status}`);
            //   }
            //   const data = await response.json();
            //   if (Array.isArray(data) && data.length > 0) {
            //     allRepos = [...allRepos, ...data];
            //     // Check if we received fewer repos than the maximum per page
            //     // If so, we've reached the last page
            //     if (data.length < 100) {
            //       hasMorePages = false;
            //     } else {
            //       page++;
            //     }
            //   } else {
            //     hasMorePages = false;
            //   }
            // }
            // Filter out forked repositories and the "CrypterENC" repository
            const originalRepos = allRepos.filter((repo)=>!repo.fork && repo.name !== "CrypterENC").map((repo)=>({
                    ...repo,
                    description: repo.description || "No description available",
                    language: repo.language || "Unknown",
                    stargazers_count: repo.stargazers_count || 0,
                    topics: repo.topics || []
                }))// Sort repositories by star count in descending order
            .sort((a, b)=>b.stargazers_count - a.stargazers_count);
            if (originalRepos.length > 0) {
                // Save to cache
                try {
                    localStorage.setItem(cacheKey, JSON.stringify(originalRepos));
                    localStorage.setItem(`${cacheKey}-timestamp`, Date.now().toString());
                } catch (error) {
                    console.warn("Failed to cache GitHub repos:", error);
                }
                setRepos(originalRepos);
                setRepoError(null);
                scrollToProjectsTop();
            } else {
                // No repos found, use sample data
                setRepos(sampleRepos);
                setRepoError("No repositories found. Using sample data instead.");
                scrollToProjectsTop();
            }
        } catch (error) {
            console.error("Error fetching GitHub repos:", error);
            setRepos(sampleRepos);
            setRepoError(error instanceof Error ? error.message : "Failed to load GitHub projects. Using sample data as fallback.");
        } finally{
            setIsLoading(false);
        }
    };
    // Function to update the cache in the background without blocking the UI
    const updateCacheInBackground = async (username, cacheKey)=>{
        try {
            // Fetch all repositories by handling pagination
            let allRepos = [];
            let page = 1;
            let hasMorePages = true;
            while(hasMorePages){
                const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100&page=${page}`, {
                    headers: {
                        Accept: "application/vnd.github.v3+json",
                        "User-Agent": "Mozilla/5.0"
                    }
                });
                if (!response.ok) {
                    return; // Silently fail background update
                }
                const data = await response.json();
                if (Array.isArray(data) && data.length > 0) {
                    allRepos = [
                        ...allRepos,
                        ...data
                    ];
                    if (data.length < 100) {
                        hasMorePages = false;
                    } else {
                        page++;
                    }
                } else {
                    hasMorePages = false;
                }
            }
            // Filter out forked repositories and the "CrypterENC" repository
            const originalRepos = allRepos.filter((repo)=>!repo.fork && repo.name !== "CrypterENC").map((repo)=>({
                    ...repo,
                    description: repo.description || "No description available",
                    language: repo.language || "Unknown",
                    stargazers_count: repo.stargazers_count || 0,
                    topics: repo.topics || []
                }))// Sort repositories by star count in descending order
            .sort((a, b)=>b.stargazers_count - a.stargazers_count);
            if (originalRepos.length > 0) {
                // Update cache silently
                localStorage.setItem(cacheKey, JSON.stringify(originalRepos));
                localStorage.setItem(`${cacheKey}-timestamp`, Date.now().toString());
                // Update state if user is still viewing the page
                if (currentUrl.includes("github.com")) {
                    setRepos(originalRepos);
                }
            }
        } catch  {
        // Silently fail background updates
        }
    };
    // Return the Firefox browser component JSX
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            !isMinimized && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `firefox-window bg-gray-900/40 backdrop-blur-sm border border-purple-500/30 shadow-lg overflow-hidden flex flex-col z-40 absolute ${firefoxState.isMaximized ? "firefox-maximized" : "rounded-md"}`,
                style: {
                    transition: showProjects || firefoxState.isMaximized ? "none" : "transform 300ms ease-out, opacity 300ms ease-out, border-radius 300ms ease-out",
                    width: firefoxState.isMaximized ? "100%" : firefoxState.width,
                    height: firefoxState.isMaximized ? "calc(100% - 56px)" : firefoxState.height,
                    maxWidth: firefoxState.isMaximized ? "100%" : firefoxState.maxWidth,
                    top: firefoxState.isMaximized ? "56px" : `${position.y}px`,
                    left: firefoxState.isMaximized ? "0" : `${position.x}px`,
                    boxShadow: firefoxState.isMaximized ? "none" : "0 0 20px rgba(123, 104, 238, 0.3)",
                    display: isMinimized ? "none" : "flex",
                    zIndex: 40
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "firefox-titlebar bg-gray-800/70 backdrop-blur-sm flex items-center p-2 justify-between cursor-move",
                        onMouseDown: handleMouseDown,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "window-controls flex space-x-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-600 transition-colors flex items-center justify-center",
                                        onClick: onClose,
                                        title: "Close",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-2 h-2 text-red-900 opacity-0 hover:opacity-100",
                                            viewBox: "0 0 20 20",
                                            fill: "currentColor",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                fillRule: "evenodd",
                                                d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                                                clipRule: "evenodd"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Firefox.tsx",
                                                lineNumber: 952,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/Firefox.tsx",
                                            lineNumber: 947,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Firefox.tsx",
                                        lineNumber: 942,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-3 h-3 rounded-full bg-yellow-500 cursor-pointer hover:bg-yellow-600 transition-colors flex items-center justify-center",
                                        onClick: handleMinimize,
                                        title: "Minimize",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-2 h-2 text-yellow-900 opacity-0 hover:opacity-100",
                                            viewBox: "0 0 20 20",
                                            fill: "currentColor",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                fillRule: "evenodd",
                                                d: "M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z",
                                                clipRule: "evenodd"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Firefox.tsx",
                                                lineNumber: 969,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/Firefox.tsx",
                                            lineNumber: 964,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Firefox.tsx",
                                        lineNumber: 959,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-3 h-3 rounded-full bg-green-500 cursor-pointer hover:bg-green-600 transition-colors flex items-center justify-center",
                                        onClick: handleMaximize,
                                        title: "Maximize",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-2 h-2 text-green-900 opacity-0 hover:opacity-100",
                                            viewBox: "0 0 20 20",
                                            fill: "currentColor",
                                            children: firefoxState.isMaximized ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                fillRule: "evenodd",
                                                d: "M5 4a1 1 0 011-1h8a1 1 0 011 1v12a1 1 0 01-1 1H6a1 1 0 01-1-1V4zm2 1v10h6V5H7z",
                                                clipRule: "evenodd"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Firefox.tsx",
                                                lineNumber: 987,
                                                columnNumber: 21
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                fillRule: "evenodd",
                                                d: "M4 4a1 1 0 011-1h10a1 1 0 011 1v10a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm2 1v8h8V5H6z",
                                                clipRule: "evenodd"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Firefox.tsx",
                                                lineNumber: 993,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/Firefox.tsx",
                                            lineNumber: 981,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Firefox.tsx",
                                        lineNumber: 976,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Firefox.tsx",
                                lineNumber: 941,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "window-title text-xs text-gray-300",
                                children: currentUrl.includes("github.com") ? "GitHub Projects - Mozilla Firefox" : "Crypter Security - Mozilla Firefox"
                            }, void 0, false, {
                                fileName: "[project]/components/Firefox.tsx",
                                lineNumber: 1003,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Firefox.tsx",
                        lineNumber: 937,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "browser-content flex-1 bg-transparent overflow-auto custom-scrollbar",
                        ref: projectsContainerRef,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "scroll-progress-container",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "scroll-progress-bar"
                                }, void 0, false, {
                                    fileName: "[project]/components/Firefox.tsx",
                                    lineNumber: 1017,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/Firefox.tsx",
                                lineNumber: 1016,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "url-bar flex items-center p-2 bg-gray-800/70 backdrop-blur-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: goBack,
                                        disabled: historyIndex <= 0,
                                        className: `p-1 rounded ${historyIndex <= 0 ? "text-gray-500" : "text-gray-300 hover:bg-gray-700/50"}`,
                                        children: "←"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Firefox.tsx",
                                        lineNumber: 1022,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: goForward,
                                        disabled: historyIndex >= history.length - 1,
                                        className: `p-1 rounded ${historyIndex >= history.length - 1 ? "text-gray-500" : "text-gray-300 hover:bg-gray-700/50"}`,
                                        children: "→"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Firefox.tsx",
                                        lineNumber: 1033,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: refresh,
                                        className: "p-1 rounded text-gray-300 hover:bg-gray-700/50",
                                        children: "↻"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Firefox.tsx",
                                        lineNumber: 1044,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 mx-2 bg-gray-700/50 rounded flex items-center px-3 py-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-green-400 mr-2",
                                                children: "🔒"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Firefox.tsx",
                                                lineNumber: 1051,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: currentUrl,
                                                onChange: (e)=>setCurrentUrl(e.target.value),
                                                onKeyDown: (e)=>{
                                                    if (e.key === "Enter") {
                                                        navigateTo(currentUrl);
                                                    }
                                                },
                                                className: "flex-1 bg-transparent text-gray-200 outline-none text-sm"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Firefox.tsx",
                                                lineNumber: 1052,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Firefox.tsx",
                                        lineNumber: 1050,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: toggleBookmark,
                                        className: `p-1 rounded ${bookmarks.includes(currentUrl) ? "text-yellow-400" : "text-gray-300 hover:bg-gray-700/50"}`,
                                        children: "★"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Firefox.tsx",
                                        lineNumber: 1064,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Firefox.tsx",
                                lineNumber: 1021,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "browser-page p-6 text-gray-200 bg-slate-900/30 min-h-[500px] custom-scrollbar",
                                children: currentUrl.includes("github.com") ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "github-projects-page custom-scrollbar overflow-y-auto relative",
                                    ref: projectsContainerRef,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "scroll-progress-container",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "scroll-progress-bar"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Firefox.tsx",
                                                lineNumber: 1085,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/Firefox.tsx",
                                            lineNumber: 1084,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "github-header bg-gray-800/60 backdrop-blur-md p-6 rounded-lg border border-purple-500/30 shadow-lg mb-6",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "github-logo mr-3 flex-shrink-0",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    xmlns: "http://www.w3.org/2000/svg",
                                                                    width: "32",
                                                                    height: "32",
                                                                    viewBox: "0 0 24 24",
                                                                    fill: "white",
                                                                    className: "transition-transform hover:rotate-12 duration-300",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        d: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Firefox.tsx",
                                                                        lineNumber: 1099,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/Firefox.tsx",
                                                                    lineNumber: 1091,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Firefox.tsx",
                                                                lineNumber: 1090,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                                        className: "text-2xl font-bold text-white mb-1",
                                                                        children: "GitHub Projects"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Firefox.tsx",
                                                                        lineNumber: 1103,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-gray-400",
                                                                        children: [
                                                                            "Cybersecurity repositories by",
                                                                            " ",
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-purple-400 font-semibold",
                                                                                children: username
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/Firefox.tsx",
                                                                                lineNumber: 1108,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/Firefox.tsx",
                                                                        lineNumber: 1106,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/Firefox.tsx",
                                                                lineNumber: 1102,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/Firefox.tsx",
                                                        lineNumber: 1089,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "github-stats px-4 py-2 bg-gray-900/60 rounded-lg border border-gray-700/50 flex items-center justify-between min-w-[170px]",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-sm text-gray-300",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-semibold text-purple-300",
                                                                        children: repos.length
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Firefox.tsx",
                                                                        lineNumber: 1114,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    " ",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-400",
                                                                        children: "repositories"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Firefox.tsx",
                                                                        lineNumber: 1115,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/Firefox.tsx",
                                                                lineNumber: 1113,
                                                                columnNumber: 25
                                                            }, this),
                                                            isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "loading-indicator ml-2 w-5 h-5 border-t-2 border-r-2 border-purple-500 rounded-full animate-spin"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Firefox.tsx",
                                                                lineNumber: 1118,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/Firefox.tsx",
                                                        lineNumber: 1112,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/Firefox.tsx",
                                                lineNumber: 1088,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/Firefox.tsx",
                                            lineNumber: 1087,
                                            columnNumber: 19
                                        }, this),
                                        repoError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "error-message bg-red-900/30 text-red-300 p-4 rounded-lg mb-6 border border-red-500/30",
                                            children: repoError
                                        }, void 0, false, {
                                            fileName: "[project]/components/Firefox.tsx",
                                            lineNumber: 1125,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "repos-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-4",
                                            children: paginatedRepos.map((repo)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "repo-card floating-card bg-gray-800/50 backdrop-blur-sm rounded-lg border border-purple-500/20 p-5 p-3 sm:p-4 lg:p-5 transition-all hover:border-purple-500/50 hover:shadow-lg overflow-hidden h-auto",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between items-start mb-2 sm:mb-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    className: "text-lg sm:text-xl font-bold text-purple-300 hover:text-purple-400 transition-colors truncate max-w-[70%]",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                        href: repo.html_url,
                                                                        target: "_blank",
                                                                        rel: "noopener noreferrer",
                                                                        className: "hover:underline",
                                                                        children: repo.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Firefox.tsx",
                                                                        lineNumber: 1139,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/Firefox.tsx",
                                                                    lineNumber: 1138,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center text-yellow-400 bg-gray-900/30 px-2 py-1 text-xs sm:text-sm rounded-full",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                            xmlns: "http://www.w3.org/2000/svg",
                                                                            className: "h-3 w-3 sm:h-4 sm:w-4 mr-1",
                                                                            viewBox: "0 0 20 20",
                                                                            fill: "currentColor",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/Firefox.tsx",
                                                                                lineNumber: 1155,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/Firefox.tsx",
                                                                            lineNumber: 1149,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-mono text-xs sm:text-sm",
                                                                            children: repo.stargazers_count
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/Firefox.tsx",
                                                                            lineNumber: 1157,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/Firefox.tsx",
                                                                    lineNumber: 1148,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/Firefox.tsx",
                                                            lineNumber: 1137,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-gray-300 mb-3 sm:mb-4 line-clamp-2 text-sm sm:text-base h-8 sm:h-12",
                                                            children: repo.description || "No description available"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Firefox.tsx",
                                                            lineNumber: 1161,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "repo-meta flex flex-col space-y-2 sm:space-y-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "tech-stack flex flex-wrap items-center justify-between",
                                                                    children: [
                                                                        repo.language && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "language-tag flex items-center",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-1 sm:mr-1.5",
                                                                                    style: {
                                                                                        backgroundColor: repo.language === "JavaScript" ? "#f1e05a" : repo.language === "TypeScript" ? "#3178c6" : repo.language === "Python" ? "#3572A5" : repo.language === "Rust" ? "#dea584" : repo.language === "Go" ? "#00ADD8" : repo.language === "C++" ? "#f34b7d" : repo.language === "Java" ? "#b07219" : repo.language === "Ruby" ? "#701516" : repo.language === "HTML" ? "#e34c26" : repo.language === "CSS" ? "#563d7c" : "#8A8A8A"
                                                                                    }
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/Firefox.tsx",
                                                                                    lineNumber: 1169,
                                                                                    columnNumber: 33
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-xs sm:text-sm text-gray-300",
                                                                                    children: repo.language
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/Firefox.tsx",
                                                                                    lineNumber: 1186,
                                                                                    columnNumber: 33
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/Firefox.tsx",
                                                                            lineNumber: 1168,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-xs text-gray-400",
                                                                            children: [
                                                                                "Updated: ",
                                                                                formatDate(repo.updated_at)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/Firefox.tsx",
                                                                            lineNumber: 1191,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/Firefox.tsx",
                                                                    lineNumber: 1166,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex justify-between items-center",
                                                                    children: [
                                                                        repo.topics && repo.topics.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "topics flex flex-wrap gap-1",
                                                                            children: [
                                                                                repo.topics.slice(0, 2).map((topic)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-xs bg-purple-900/30 text-purple-300 px-1.5 sm:px-2 py-0.5 rounded-full border border-purple-500/20",
                                                                                        children: topic
                                                                                    }, topic, false, {
                                                                                        fileName: "[project]/components/Firefox.tsx",
                                                                                        lineNumber: 1200,
                                                                                        columnNumber: 35
                                                                                    }, this)),
                                                                                repo.topics.length > 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-xs text-gray-400",
                                                                                    children: [
                                                                                        "+",
                                                                                        repo.topics.length - 2
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/components/Firefox.tsx",
                                                                                    lineNumber: 1208,
                                                                                    columnNumber: 35
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/Firefox.tsx",
                                                                            lineNumber: 1198,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                            href: repo.html_url,
                                                                            target: "_blank",
                                                                            rel: "noopener noreferrer",
                                                                            className: "view-repo-btn text-xs bg-purple-600/40 hover:bg-purple-600/60 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-md transition-colors flex items-center",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: "View"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/Firefox.tsx",
                                                                                    lineNumber: 1219,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                    xmlns: "http://www.w3.org/2000/svg",
                                                                                    className: "h-2.5 w-2.5 sm:h-3 sm:w-3 ml-1",
                                                                                    fill: "none",
                                                                                    viewBox: "0 0 24 24",
                                                                                    stroke: "currentColor",
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                        strokeLinecap: "round",
                                                                                        strokeLinejoin: "round",
                                                                                        strokeWidth: 2,
                                                                                        d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/Firefox.tsx",
                                                                                        lineNumber: 1221,
                                                                                        columnNumber: 33
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/Firefox.tsx",
                                                                                    lineNumber: 1220,
                                                                                    columnNumber: 31
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/Firefox.tsx",
                                                                            lineNumber: 1213,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/Firefox.tsx",
                                                                    lineNumber: 1196,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/Firefox.tsx",
                                                            lineNumber: 1165,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, repo.id, true, {
                                                    fileName: "[project]/components/Firefox.tsx",
                                                    lineNumber: 1133,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/Firefox.tsx",
                                            lineNumber: 1131,
                                            columnNumber: 19
                                        }, this),
                                        repos.length > reposPerPage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "pagination-controls flex justify-center items-center mt-6 sm:mt-8 space-x-2 sm:space-x-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        if (currentPage > 1) {
                                                            setCurrentPage(currentPage - 1);
                                                            scrollToProjectsTop();
                                                        }
                                                    },
                                                    disabled: currentPage === 1,
                                                    className: `px-2 sm:px-4 py-1 sm:py-2 rounded-md flex items-center text-xs sm:text-sm ${currentPage === 1 ? 'bg-gray-700/30 text-gray-500 cursor-not-allowed' : 'bg-purple-600/40 hover:bg-purple-600/60 text-white'} transition-colors`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            xmlns: "http://www.w3.org/2000/svg",
                                                            className: "h-3 w-3 sm:h-4 sm:w-4 mr-1",
                                                            fill: "none",
                                                            viewBox: "0 0 24 24",
                                                            stroke: "currentColor",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M15 19l-7-7 7-7"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Firefox.tsx",
                                                                lineNumber: 1248,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Firefox.tsx",
                                                            lineNumber: 1247,
                                                            columnNumber: 25
                                                        }, this),
                                                        "Prev"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/Firefox.tsx",
                                                    lineNumber: 1233,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "page-info text-gray-300 text-xs sm:text-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-medium text-purple-400",
                                                            children: currentPage
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Firefox.tsx",
                                                            lineNumber: 1254,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "mx-1 sm:mx-2 text-gray-500",
                                                            children: "/"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Firefox.tsx",
                                                            lineNumber: 1255,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: Math.ceil(repos.length / reposPerPage)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Firefox.tsx",
                                                            lineNumber: 1256,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/Firefox.tsx",
                                                    lineNumber: 1253,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        if (currentPage < Math.ceil(repos.length / reposPerPage)) {
                                                            setCurrentPage(currentPage + 1);
                                                            scrollToProjectsTop();
                                                        }
                                                    },
                                                    disabled: currentPage >= Math.ceil(repos.length / reposPerPage),
                                                    className: `px-2 sm:px-4 py-1 sm:py-2 rounded-md flex items-center text-xs sm:text-sm ${currentPage >= Math.ceil(repos.length / reposPerPage) ? 'bg-gray-700/30 text-gray-500 cursor-not-allowed' : 'bg-purple-600/40 hover:bg-purple-600/60 text-white'} transition-colors`,
                                                    children: [
                                                        "Next",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            xmlns: "http://www.w3.org/2000/svg",
                                                            className: "h-3 w-3 sm:h-4 sm:w-4 ml-1",
                                                            fill: "none",
                                                            viewBox: "0 0 24 24",
                                                            stroke: "currentColor",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M9 5l7 7-7 7"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Firefox.tsx",
                                                                lineNumber: 1275,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Firefox.tsx",
                                                            lineNumber: 1274,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/Firefox.tsx",
                                                    lineNumber: 1259,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/Firefox.tsx",
                                            lineNumber: 1232,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "refresh-controls flex justify-between items-center mt-4 sm:mt-6 p-2 sm:p-3 bg-gray-800/50 rounded-lg border border-purple-500/20",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "repo-count text-xs sm:text-sm text-gray-300",
                                                    children: [
                                                        "Showing ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-medium text-purple-400",
                                                            children: paginatedRepos.length
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Firefox.tsx",
                                                            lineNumber: 1284,
                                                            columnNumber: 31
                                                        }, this),
                                                        " of ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-medium text-purple-400",
                                                            children: repos.length
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Firefox.tsx",
                                                            lineNumber: 1284,
                                                            columnNumber: 111
                                                        }, this),
                                                        " repos"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/Firefox.tsx",
                                                    lineNumber: 1283,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: forceRefreshRepos,
                                                    disabled: isLoading,
                                                    className: "refresh-btn flex items-center px-2 sm:px-3 py-0.5 sm:py-1 bg-purple-600/40 hover:bg-purple-600/60 text-white rounded-md transition-colors text-xs sm:text-sm",
                                                    children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "animate-spin h-3 w-3 sm:h-4 sm:w-4 border-2 border-purple-300 border-t-transparent rounded-full mr-1 sm:mr-2"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Firefox.tsx",
                                                                lineNumber: 1294,
                                                                columnNumber: 27
                                                            }, this),
                                                            "Refreshing..."
                                                        ]
                                                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                xmlns: "http://www.w3.org/2000/svg",
                                                                className: "h-3 w-3 sm:h-4 sm:w-4 mr-1",
                                                                fill: "none",
                                                                viewBox: "0 0 24 24",
                                                                stroke: "currentColor",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    strokeLinecap: "round",
                                                                    strokeLinejoin: "round",
                                                                    strokeWidth: 2,
                                                                    d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/Firefox.tsx",
                                                                    lineNumber: 1300,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Firefox.tsx",
                                                                lineNumber: 1299,
                                                                columnNumber: 27
                                                            }, this),
                                                            "Refresh"
                                                        ]
                                                    }, void 0, true)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Firefox.tsx",
                                                    lineNumber: 1287,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/Firefox.tsx",
                                            lineNumber: 1282,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Firefox.tsx",
                                    lineNumber: 1080,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "default-page p-6",
                                    children: [
                                        !currentUrl.includes("/tools") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-2xl font-bold mb-6 text-purple-300 backdrop-blur-sm inline-block px-3 py-1 rounded",
                                            style: {
                                                backgroundColor: 'rgba(126, 34, 206, 0.1)'
                                            },
                                            children: "Crypter Security"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Firefox.tsx",
                                            lineNumber: 1312,
                                            columnNumber: 21
                                        }, this),
                                        !currentUrl.includes("/tools") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mb-6 text-gray-200 max-w-3xl backdrop-blur-sm inline-block px-3 py-2 rounded-md",
                                            style: {
                                                backgroundColor: 'rgba(30, 30, 30, 0.2)'
                                            },
                                            children: "Welcome to Crypter Security - Elite cybersecurity services specializing in offensive security solutions and advanced threat mitigation strategies for organizations worldwide."
                                        }, void 0, false, {
                                            fileName: "[project]/components/Firefox.tsx",
                                            lineNumber: 1317,
                                            columnNumber: 21
                                        }, this),
                                        currentUrl.includes("/tools") ? // Tools page content
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "tools-page",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-2xl font-bold text-purple-200 mb-4 sm:mb-6 border-b border-purple-500/20 pb-2",
                                                    children: "Security Tools"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Firefox.tsx",
                                                    lineNumber: 1325,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Firefox.tsx",
                                                    lineNumber: 1329,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xl font-bold text-purple-200 mt-8 sm:mt-10 mb-3 sm:mb-4 border-b border-purple-500/20 pb-2",
                                                    children: "Tools Made By Me"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Firefox.tsx",
                                                    lineNumber: 1334,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "tool-card bg-gray-800/40 backdrop-blur-sm rounded-lg border border-purple-500/20 p-3 sm:p-4 hover:border-purple-500/40 transition-all hover:shadow-lg shadow-purple-500/10",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center mb-2 sm:mb-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "tool-icon w-8 h-8 sm:w-10 sm:h-10 bg-indigo-700/30 rounded-lg flex items-center justify-center mr-2 sm:mr-3",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                            xmlns: "http://www.w3.org/2000/svg",
                                                                            className: "h-5 w-5 sm:h-6 sm:w-6 text-indigo-300",
                                                                            viewBox: "0 0 20 20",
                                                                            fill: "currentColor",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                fillRule: "evenodd",
                                                                                d: "M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z",
                                                                                clipRule: "evenodd"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/Firefox.tsx",
                                                                                lineNumber: 1344,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/Firefox.tsx",
                                                                            lineNumber: 1343,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Firefox.tsx",
                                                                        lineNumber: 1342,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                        className: "text-base sm:text-lg font-bold text-indigo-300",
                                                                        children: "RAT-RATATOUILLE"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Firefox.tsx",
                                                                        lineNumber: 1347,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/Firefox.tsx",
                                                                lineNumber: 1341,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-gray-300 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-3 sm:line-clamp-2",
                                                                children: "A comprehensive client-server remote access tool with advanced monitoring and control capabilities."
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Firefox.tsx",
                                                                lineNumber: 1349,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between items-center",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "px-2 py-0.5 bg-indigo-900/30 text-indigo-300 text-xs rounded-full",
                                                                        children: "Open Source"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Firefox.tsx",
                                                                        lineNumber: 1353,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                        href: "https://github.com/CrypterENC/RAT-RATATOUILLE.git",
                                                                        target: "_blank",
                                                                        rel: "noopener noreferrer",
                                                                        className: "text-xs bg-indigo-600/40 hover:bg-indigo-600/60 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-md transition-colors flex items-center",
                                                                        children: [
                                                                            "GitHub",
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                xmlns: "http://www.w3.org/2000/svg",
                                                                                className: "h-2.5 w-2.5 sm:h-3 sm:w-3 ml-1",
                                                                                fill: "none",
                                                                                viewBox: "0 0 24 24",
                                                                                stroke: "currentColor",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                    strokeLinecap: "round",
                                                                                    strokeLinejoin: "round",
                                                                                    strokeWidth: 2,
                                                                                    d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/Firefox.tsx",
                                                                                    lineNumber: 1359,
                                                                                    columnNumber: 33
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/Firefox.tsx",
                                                                                lineNumber: 1358,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/Firefox.tsx",
                                                                        lineNumber: 1356,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/Firefox.tsx",
                                                                lineNumber: 1352,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/Firefox.tsx",
                                                        lineNumber: 1340,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Firefox.tsx",
                                                    lineNumber: 1338,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-gray-800/30 backdrop-blur-sm rounded-lg border border-purple-500/20 p-3 sm:p-4 mb-4 sm:mb-6",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "text-base sm:text-lg font-bold text-purple-300 mb-2",
                                                            children: "Custom Tool Development"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Firefox.tsx",
                                                            lineNumber: 1370,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-gray-300 text-xs sm:text-sm",
                                                            children: "Need a specialized security tool for your unique environment? Our team develops custom security solutions tailored to your specific requirements and threat model."
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Firefox.tsx",
                                                            lineNumber: 1371,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "mt-2 sm:mt-3 text-xs sm:text-sm bg-purple-600/40 hover:bg-purple-600/60 text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-md transition-colors flex items-center w-max",
                                                            children: [
                                                                "Inquire About Custom Tools",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    xmlns: "http://www.w3.org/2000/svg",
                                                                    className: "h-3 w-3 sm:h-4 sm:w-4 ml-1",
                                                                    fill: "none",
                                                                    viewBox: "0 0 24 24",
                                                                    stroke: "currentColor",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        strokeLinecap: "round",
                                                                        strokeLinejoin: "round",
                                                                        strokeWidth: 2,
                                                                        d: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Firefox.tsx",
                                                                        lineNumber: 1377,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/Firefox.tsx",
                                                                    lineNumber: 1376,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/Firefox.tsx",
                                                            lineNumber: 1374,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/Firefox.tsx",
                                                    lineNumber: 1369,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs text-gray-400 p-2 sm:p-3 bg-gray-900/30 rounded-lg border border-gray-700/30",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "IMPORTANT:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Firefox.tsx",
                                                                lineNumber: 1384,
                                                                columnNumber: 28
                                                            }, this),
                                                            " All tools are provided for legitimate security testing and educational purposes only. Use responsibly and only on systems you own or have explicit permission to test. Crypter Security is not responsible for misuse of these tools."
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/Firefox.tsx",
                                                        lineNumber: 1384,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Firefox.tsx",
                                                    lineNumber: 1383,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/Firefox.tsx",
                                            lineNumber: 1324,
                                            columnNumber: 21
                                        }, this) : // Default homepage content
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "card border border-purple-500/20 rounded-lg p-6 backdrop-blur-sm hover:bg-gray-800/40 transition-colors hover:shadow-lg hover:shadow-purple-500/10",
                                                    style: {
                                                        backgroundColor: 'rgba(30, 30, 30, 0.2)'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                            className: "text-xl font-bold text-purple-200 mb-3 border-b border-purple-500/20 pb-2",
                                                            children: "Professional Services"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Firefox.tsx",
                                                            lineNumber: 1392,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "service-item flex items-start",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-purple-400 mr-2",
                                                                            children: "▹"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/Firefox.tsx",
                                                                            lineNumber: 1395,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-gray-200",
                                                                            children: "Advanced penetration testing with custom-tailored exploitation techniques"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/Firefox.tsx",
                                                                            lineNumber: 1396,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/Firefox.tsx",
                                                                    lineNumber: 1394,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "service-item flex items-start",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-purple-400 mr-2",
                                                                            children: "▹"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/Firefox.tsx",
                                                                            lineNumber: 1399,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-gray-200",
                                                                            children: "Comprehensive vulnerability assessment with detailed remediation strategies"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/Firefox.tsx",
                                                                            lineNumber: 1400,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/Firefox.tsx",
                                                                    lineNumber: 1398,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "service-item flex items-start",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-purple-400 mr-2",
                                                                            children: "▹"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/Firefox.tsx",
                                                                            lineNumber: 1403,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-gray-200",
                                                                            children: "Red team operations simulating real-world adversary tactics"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/Firefox.tsx",
                                                                            lineNumber: 1404,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/Firefox.tsx",
                                                                    lineNumber: 1402,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "service-item flex items-start",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-purple-400 mr-2",
                                                                            children: "▹"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/Firefox.tsx",
                                                                            lineNumber: 1407,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-gray-200",
                                                                            children: "Security architecture consulting and implementation guidance"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/Firefox.tsx",
                                                                            lineNumber: 1408,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/Firefox.tsx",
                                                                    lineNumber: 1406,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/Firefox.tsx",
                                                            lineNumber: 1393,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/Firefox.tsx",
                                                    lineNumber: 1390,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "card border border-purple-500/20 rounded-lg p-6 backdrop-blur-sm hover:bg-gray-800/40 transition-colors hover:shadow-lg hover:shadow-purple-500/10",
                                                    style: {
                                                        backgroundColor: 'rgba(30, 30, 30, 0.2)'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                            className: "text-xl font-bold text-purple-200 mb-3 border-b border-purple-500/20 pb-2",
                                                            children: "About Our Expertise"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Firefox.tsx",
                                                            lineNumber: 1415,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "expertise-item flex items-start",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-purple-400 mr-2",
                                                                            children: "▹"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/Firefox.tsx",
                                                                            lineNumber: 1418,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-gray-200",
                                                                            children: "Led by veteran security researchers with 10+ years of industry experience"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/Firefox.tsx",
                                                                            lineNumber: 1419,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/Firefox.tsx",
                                                                    lineNumber: 1417,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "expertise-item flex items-start",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-purple-400 mr-2",
                                                                            children: "▹"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/Firefox.tsx",
                                                                            lineNumber: 1422,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-gray-200",
                                                                            children: "Specialized in zero-day vulnerability discovery and exploit development"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/Firefox.tsx",
                                                                            lineNumber: 1423,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/Firefox.tsx",
                                                                    lineNumber: 1421,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "expertise-item flex items-start",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-purple-400 mr-2",
                                                                            children: "▹"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/Firefox.tsx",
                                                                            lineNumber: 1426,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-gray-200",
                                                                            children: "Published security research featured in major industry conferences"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/Firefox.tsx",
                                                                            lineNumber: 1427,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/Firefox.tsx",
                                                                    lineNumber: 1425,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "expertise-item flex items-start",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-purple-400 mr-2",
                                                                            children: "▹"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/Firefox.tsx",
                                                                            lineNumber: 1430,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-gray-200",
                                                                            children: "Certified expertise: OSCP, CEH, CISSP, and custom-developed methodologies"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/Firefox.tsx",
                                                                            lineNumber: 1431,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/Firefox.tsx",
                                                                    lineNumber: 1429,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/Firefox.tsx",
                                                            lineNumber: 1416,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/Firefox.tsx",
                                                    lineNumber: 1413,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/Firefox.tsx",
                                            lineNumber: 1389,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-6 p-4 border border-purple-500/20 rounded-lg backdrop-blur-sm",
                                            style: {
                                                backgroundColor: 'rgba(30, 30, 30, 0.2)'
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-center text-gray-300",
                                                children: [
                                                    "Explore our ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "https://crypter.security/services",
                                                        className: "text-purple-300 font-semibold hover:underline",
                                                        children: "services"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Firefox.tsx",
                                                        lineNumber: 1440,
                                                        columnNumber: 35
                                                    }, this),
                                                    " or check out our ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "https://crypter.security/tools",
                                                        onClick: (e)=>{
                                                            e.preventDefault();
                                                            navigateTo("https://crypter.security/tools");
                                                        },
                                                        className: "text-purple-300 font-semibold hover:underline",
                                                        children: "security tools"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Firefox.tsx",
                                                        lineNumber: 1440,
                                                        columnNumber: 167
                                                    }, this),
                                                    " for professional-grade cybersecurity solutions"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/Firefox.tsx",
                                                lineNumber: 1439,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/Firefox.tsx",
                                            lineNumber: 1438,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Firefox.tsx",
                                    lineNumber: 1309,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/Firefox.tsx",
                                lineNumber: 1077,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Firefox.tsx",
                        lineNumber: 1011,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Firefox.tsx",
                lineNumber: 913,
                columnNumber: 9
            }, this),
            isMinimized && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: firefoxIndicatorRef,
                className: "firefox-taskbar-indicator fixed top-0 z-[101] h-12 px-3 flex items-center justify-center cursor-pointer hover:bg-gray-700/50 transition-colors border-b-2 border-purple-500/30 bg-gray-800/30 backdrop-blur-sm",
                onClick: handleRestore,
                style: {
                    left: "160px",
                    width: "80px",
                    transition: "left 0.2s ease, background-color 0.2s ease, border-color 0.2s ease"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center space-x-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            className: "h-4 w-4 text-purple-400",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M12 21a9 9 0 100-18 9 9 0 000 18z"
                                }, void 0, false, {
                                    fileName: "[project]/components/Firefox.tsx",
                                    lineNumber: 1473,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M8 10h8",
                                    fill: "purple"
                                }, void 0, false, {
                                    fileName: "[project]/components/Firefox.tsx",
                                    lineNumber: 1479,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Firefox.tsx",
                            lineNumber: 1466,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs text-purple-400",
                            children: "Firefox"
                        }, void 0, false, {
                            fileName: "[project]/components/Firefox.tsx",
                            lineNumber: 1487,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Firefox.tsx",
                    lineNumber: 1465,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Firefox.tsx",
                lineNumber: 1455,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes loadingProgress {
          0% {
            width: 0%;
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            width: 100%;
            opacity: 0.7;
          }
        }

        @keyframes pulseAnimation {
          0% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.02);
          }
          100% {
            opacity: 0.7;
            transform: scale(1);
          }
        }

        @keyframes rotateGradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes loadingCircle {
          0% {
            transform: rotate(0deg);
            border-width: 4px;
          }
          50% {
            border-width: 2px;
          }
          100% {
            transform: rotate(360deg);
            border-width: 4px;
          }
        }

        @keyframes scrollbarPulse {
          0% {
            background: rgba(124, 58, 237, 0.5);
            box-shadow: 0 0 5px rgba(124, 58, 237, 0.3);
          }
          50% {
            background: rgba(139, 92, 246, 0.7);
            box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
          }
          100% {
            background: rgba(124, 58, 237, 0.5);
            box-shadow: 0 0 5px rgba(124, 58, 237, 0.3);
          }
        }

        /* Scroll progress container and bar */
        .scroll-progress-container {
          position: sticky;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: rgba(30, 30, 30, 0.3);
          z-index: 100;
        }

        .scroll-progress-bar {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: linear-gradient(
            90deg,
            #a855f7 0%,
            #8b5cf6 50%,
            #6366f1 100%
          );
          background-size: 200% 200%;
          animation: rotateGradient 3s ease infinite;
          width: 0%;
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
        }

        /* Floating card effect */
        .floating-card {
          transition: all 0.3s ease;
        }

        .floating-card:hover {
          transform: translateY(-5px) !important;
          box-shadow: 0 10px 20px -5px rgba(124, 58, 237, 0.3) !important;
        }

        /* Enhanced custom scrollbar styles */
        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 30, 40, 0.3);
          border-radius: 8px;
          margin: 4px 0;
          box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(124, 58, 237, 0.5);
          border-radius: 8px;
          border: 2px solid rgba(20, 20, 30, 0.3);
          animation: scrollbarPulse 3s infinite ease-in-out;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.8);
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.7);
        }

        /* Firefox specific scrollbar styles */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(124, 58, 237, 0.6) rgba(30, 30, 40, 0.3);
        }

        .animate-pulse-slow {
          animation: pulseAnimation 3s infinite ease-in-out;
        }

        .firefox-loading-progress {
          animation: loadingProgress 1.5s ease-in-out,
            rotateGradient 3s ease infinite;
          background: linear-gradient(
            90deg,
            #0060df 0%,
            #0a84ff 30%,
            #00ddff 100%
          );
          background-size: 200% 200%;
          box-shadow: 0 0 8px rgba(10, 132, 255, 0.6);
        }

        .loading-circle-container {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .loading-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 4px solid transparent;
          border-top-color: #0a84ff;
          border-left-color: #00ddff;
          border-right-color: rgba(10, 132, 255, 0.3);
          border-bottom-color: rgba(0, 221, 255, 0.3);
          animation: loadingCircle 1.5s linear infinite;
        }

        .firefox-maximized {
          border-radius: 0 !important;
          border-width: 0 !important;
          width: 100% !important;
          max-width: 100% !important;
          left: 0 !important;
          right: 0 !important;
          top: 56px !important;
          bottom: 0 !important;
        }

        /* Line clamp utilities */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }
        `
            }, void 0, false, {
                fileName: "[project]/components/Firefox.tsx",
                lineNumber: 1492,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(Firefox, "Mv3IjvJSG3Q5QB5ZDsQlIk6wtRM=");
_c = Firefox;
var _c;
__turbopack_context__.k.register(_c, "Firefox");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Home)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Terminal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Terminal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ArchLinuxOS$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ArchLinuxOS.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Firefox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Firefox.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function Home() {
    _s();
    const [showTerminal, setShowTerminal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showFirefox, setShowFirefox] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showGitHubProjects, setShowGitHubProjects] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showTools, setShowTools] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [githubUsername, setGithubUsername] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("CrypterENC"); // Default username
    const [firefoxPosition, setFirefoxPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 50
    });
    // Function to handle opening Firefox from Terminal with the projects command
    const handleOpenFirefox = (showProjects = false, showTools = false)=>{
        console.log('Opening Firefox with params:', {
            showProjects,
            showTools
        });
        // Hardcode the username instead of prompting
        setGithubUsername("CrypterENC");
        // Calculate center position for Firefox
        if ("TURBOPACK compile-time truthy", 1) {
            // Short timeout to ensure main component is fully rendered
            setTimeout(()=>{
                // Find the main OS container to position relative to it
                const osContainer = document.querySelector("main");
                if (!osContainer) return;
                // Get OS container dimensions and position
                const osRect = osContainer.getBoundingClientRect();
                const osCenter = {
                    x: osRect.left + osRect.width / 2,
                    y: osRect.top + osRect.height / 2
                };
                // Determine the appropriate size of Firefox window
                let width, height, maxWidth;
                if (window.innerWidth < 768) {
                    width = "95vw";
                    height = "75vh";
                    maxWidth = "700px";
                } else if (window.innerWidth < 1024) {
                    width = "85vw";
                    height = "80vh";
                    maxWidth = "1000px";
                } else {
                    width = "80vw";
                    height = "85vh";
                    maxWidth = "1400px";
                }
                // Convert vw/vh to pixels
                const parsedWidth = parseFloat(width) / 100 * window.innerWidth;
                // Account for maxWidth constraint
                const actualWidth = Math.min(parsedWidth, parseFloat(maxWidth));
                const parsedHeight = parseFloat(height) / 100 * window.innerHeight;
                // Define waybar height
                const WAYBAR_HEIGHT = 48;
                // Calculate position to center Firefox relative to OS center
                const centerX = Math.floor(osCenter.x - actualWidth / 2);
                const centerY = Math.floor(osCenter.y - parsedHeight / 2);
                // Ensure it's below the waybar and within window bounds
                const boundedX = Math.max(0, Math.min(window.innerWidth - actualWidth, centerX));
                const boundedY = Math.max(WAYBAR_HEIGHT + 2, Math.min(window.innerHeight - parsedHeight, centerY));
                // Set centered position for Firefox with precise values
                setFirefoxPosition({
                    x: boundedX,
                    y: boundedY
                });
                console.log('Firefox position set to:', {
                    x: boundedX,
                    y: boundedY
                });
                // Set these state variables AFTER position is calculated
                setShowFirefox(true);
                setShowGitHubProjects(showProjects);
                setShowTools(showTools);
                console.log('Firefox states set:', {
                    showFirefox: true,
                    showGitHubProjects: showProjects,
                    showTools: showTools
                });
            }, 50); // Increased timeout to ensure reliable execution
        } else {
            "TURBOPACK unreachable";
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen p-4 font-mono text-green-400 flex items-center justify-center relative overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ArchLinuxOS$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                onOpenTerminal: ()=>setShowTerminal(true)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            showTerminal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Terminal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                onClose: ()=>setShowTerminal(false),
                onOpenFirefox: handleOpenFirefox
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 115,
                columnNumber: 9
            }, this),
            showFirefox && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Firefox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                onClose: ()=>{
                    console.log('Closing Firefox');
                    setShowFirefox(false);
                    setShowGitHubProjects(false);
                    setShowTools(false);
                },
                initialUrl: "https://crypter.security",
                showProjects: showGitHubProjects,
                showTools: showTools,
                githubUsername: githubUsername,
                initialPosition: firefoxPosition
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 123,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 109,
        columnNumber: 5
    }, this);
}
_s(Home, "KnBLiFngRxcB9uSgIONN5Tp5/N4=");
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_c3f8952b._.js.map