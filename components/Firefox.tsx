"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import {
  DEFAULT_GITHUB_USERNAME,
  DEFAULT_LINKEDIN_URL,
  DEFAULT_BRAND_NAME,
  DEFAULT_WELCOME_TEXT,
  DEFAULT_NAME,
  DEFAULT_EMAIL,
} from "../constants/profile";

// Register ScrollToPlugin for smooth scrolling
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

interface Tab {
  id: string;
  title: string;
  url: string;
  type: 'projects' | 'blogs' | 'certs' | 'start' | 'custom';
  isActive: boolean;
}

interface FirefoxProps {
  onClose: () => void;
  initialUrl?: string;
  showProjects?: boolean; // Add flag for projects mode
  showTools?: boolean; // Add flag for tools mode
  showBlogs?: boolean; // Add flag for blogs mode
  githubUsername?: string; // Add prop for custom GitHub username
  initialPosition?: { x: number; y: number }; // Add initial position prop
  onTabChange?: (tabs: Tab[]) => void; // Callback for tab changes
}

// Define GitHub repo interface
interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  fork: boolean;
  private: boolean;
}

// Add responsive sizing constants
const FIREFOX_SIZES = {
  small: {
    width: "95vw",
    height: "75vh",
    maxWidth: "700px",
  },
  medium: {
    width: "85vw",
    height: "80vh",
    maxWidth: "1000px",
  },
  large: {
    width: "80vw",
    height: "85vh",
    maxWidth: "1400px",
  },
};

interface FirefoxState {
  isMaximized: boolean;
  isMinimized: boolean;
  width: string;
  height: string;
  maxWidth: string;
}

// Helper function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  // Return date in format like "Jan 15, 2023"
  return date.toLocaleDateString('en-US', { 
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export default function Firefox({
  onClose,
  initialUrl = `home://start`,
  showProjects = false, // Default to false
  showTools = false, // Default to false
  showBlogs = false, // Default to false
  githubUsername = DEFAULT_GITHUB_USERNAME, // User's actual GitHub username
  initialPosition = { x: 0, y: 0 }, // Default initial position
  onTabChange,
}: FirefoxProps) {
  // Initialize tabs based on props
  const getInitialTabs = (): Tab[] => {
    const tabs: Tab[] = [];
    
    if (showProjects) {
      tabs.push({
        id: 'projects',
        title: 'GitHub Projects',
        url: `https://github.com/${githubUsername}`,
        type: 'projects',
        isActive: true
      });
    } else if (showTools) {
      tabs.push({
        id: 'tools',
        title: 'GitHub Tools',
        url: `https://github.com/${DEFAULT_GITHUB_USERNAME}`,
        type: 'projects',
        isActive: true
      });
    } else if (showBlogs) {
      tabs.push({
        id: 'blogs',
        title: 'Blogs',
        url: 'home://blogs',
        type: 'blogs',
        isActive: true
      });
    } else {
      tabs.push({
        id: 'start',
        title: 'Home',
        url: initialUrl,
        type: 'start',
        isActive: true
      });
    }
    
    return tabs;
  };

  const [tabs, setTabs] = useState<Tab[]>(getInitialTabs);
  const [currentUrl, setCurrentUrl] = useState(() => {
    const activeTab = getInitialTabs().find(tab => tab.isActive);
    return activeTab?.url || initialUrl;
  });
  const [history, setHistory] = useState<string[]>([
    showProjects
      ? `https://github.com/${githubUsername}`
      : showTools
      ? `https://github.com/${DEFAULT_GITHUB_USERNAME}`
      : showBlogs
      ? `home://blogs`
      : initialUrl,
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [bookmarks, setBookmarks] = useState<string[]>([
    `https://github.com/${DEFAULT_GITHUB_USERNAME}`,
    DEFAULT_LINKEDIN_URL,
  ]);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [position, setPosition] = useState(initialPosition);

  // GitHub projects related states
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [repoError, setRepoError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  // Update repos per page based on screen size
  const [reposPerPage, setReposPerPage] = useState(8); // Default to 8 repos per page for larger screens
  const username = githubUsername; // Use the provided GitHub username
  const [isLoading, setIsLoading] = useState(false);
  const [startSearch, setStartSearch] = useState("");
  const [visitsCount, setVisitsCount] = useState<number | null>(null);
  const [visitsLoading, setVisitsLoading] = useState(false);
  const [visitsError, setVisitsError] = useState<string | null>(null);
  const [blogPosts, setBlogPosts] = useState<Array<{
    id: string;
    title: string;
    url: string;
    coverImage?: string | null;
    publishedAt?: string | null;
    tags?: string[];
    excerpt?: string | null;
    source: "devto" | "medium";
  }>>([]);
  const [blogsLoading, setBlogsLoading] = useState(false);
  const [blogsError, setBlogsError] = useState<string | null>(null);
  const [blogsLastUpdated, setBlogsLastUpdated] = useState<string | null>(null);
  
  interface Certification {
    id: number;
    title: string;
    status: string;
    issued?: string;
    completed?: string;
    expires?: string;
    provider?: string;
    description: string;
    image: string;
  }

  // Sample certifications to display on the start/certs page
  const certifications: Certification[] = [
    {
      id: 1,
      title: "How to use AI effectively",
      status: "Completed",
      issued: "",
      completed: "Apr 22, 2025",
      expires: "",
      provider: "",
      description:
        "Fundamentals of leveraging AI tools efficiently for learning and productivity.",
      image: "/assets/certs/How%20to%20use%20Ai.jpg",
    },
    {
      id: 2,
      title: "ZTM – Efficient Learning",
      status: "Completed",
      issued: "",
      completed: "Apr 20, 2025",
      expires: "",
      provider: "Zero To Mastery",
      description:
        "Techniques and frameworks for mastering topics faster with deliberate practice.",
      image: "/assets/certs/ZTM%20%5BEfficient%20Learning%5D.png",
    },
    {
      id: 3,
      title: "AI Career Coach",
      status: "Completed",
      issued: "",
      completed: "Apr 20, 2025",
      expires: "",
      provider: "",
      description:
        "Guidance on building an AI-focused career: positioning, portfolios, and growth roadmap.",
      image: "/assets/certs/AI%20Career%20Coath.png",
    },
  ];
  const [activeCert, setActiveCert] = useState<Certification | null>(null);

  useEffect(() => {
    if (!activeCert) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveCert(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [activeCert]);

  // First add a state to track the rate limit info
  // const [rateLimitInfo, setRateLimitInfo] = useState<RateLimitInfo | null>(null);

  // Sample repositories to use as fallback when API fails
  const sampleRepos: GitHubRepo[] = [
    {
      id: 1,
      name: "awesome-projects",
      description:
        `🚀 A collection of beginner to advanced projects by ${DEFAULT_NAME}.`,
      html_url: `https://github.com/${DEFAULT_GITHUB_USERNAME}/awesome-projects`,
      stargazers_count: 2,
      language: "TypeScript",
      topics: ["projects", "learning"],
      updated_at: "2024-01-15T12:30:45Z",
      owner: {
        login: DEFAULT_GITHUB_USERNAME,
        avatar_url: "https://avatars.githubusercontent.com/u/12345678",
      },
      fork: false,
      private: false,
    },
    {
      id: 2,
      name: "100-days-of-code",
      description:
        "My 100 Days of Code challenge to master coding.",
      html_url: `https://github.com/${DEFAULT_GITHUB_USERNAME}/100-days-of-code`,
      stargazers_count: 2,
      language: "Python",
      topics: ["python", "learning", "challenge", "coding"],
      updated_at: "2024-01-10T08:15:22Z",
      owner: {
        login: DEFAULT_GITHUB_USERNAME,
        avatar_url: "https://avatars.githubusercontent.com/u/12345678",
      },
      fork: false,
      private: false,
    },
    {
      id: 3,
      name: "dev-notes",
      description: "Notes and snippets for daily mastery",
      html_url: `https://github.com/${DEFAULT_GITHUB_USERNAME}/dev-notes`,
      stargazers_count: 2,
      language: "Markdown",
      topics: ["notes", "cheat-sheets", "learning"],
      updated_at: "2024-01-05T14:45:10Z",
      owner: {
        login: DEFAULT_GITHUB_USERNAME,
        avatar_url: "https://avatars.githubusercontent.com/u/12345678",
      },
      fork: false,
      private: false,
    },
    {
      id: 4,
      name: "portfolio",
      description: "Personal portfolio website",
      html_url: `https://github.com/${DEFAULT_GITHUB_USERNAME}/portfolio`,
      stargazers_count: 2,
      language: "HTML",
      topics: ["portfolio", "html", "personal"],
      updated_at: "2024-01-03T10:20:30Z",
      owner: {
        login: DEFAULT_GITHUB_USERNAME,
        avatar_url: "https://avatars.githubusercontent.com/u/12345678",
      },
      fork: false,
      private: false,
    },
    {
      id: 5,
      name: "projects",
      description: "Various projects and experiments",
      html_url: `https://github.com/${DEFAULT_GITHUB_USERNAME}/projects`,
      stargazers_count: 2,
      language: "Python",
      topics: ["projects", "python", "experiments"],
      updated_at: "2024-01-01T09:15:45Z",
      owner: {
        login: DEFAULT_GITHUB_USERNAME,
        avatar_url: "https://avatars.githubusercontent.com/u/12345678",
      },
      fork: false,
      private: false,
    },
  ];

  // Create a ref for the Firefox indicator
  const firefoxIndicatorRef = useRef<HTMLDivElement>(null);

  // Add ref for GitHub projects container
  const projectsContainerRef = useRef<HTMLDivElement>(null);

  // Update window size state
  const [windowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  // Add Firefox window state
  const [firefoxState, setFirefoxState] = useState<FirefoxState>({
    isMaximized: false,
    isMinimized: false,
    width: FIREFOX_SIZES.large.width,
    height: FIREFOX_SIZES.large.height,
    maxWidth: FIREFOX_SIZES.large.maxWidth,
  });

  // Function to get responsive sizes
  const getResponsiveSizes = useCallback(() => {
    if (windowSize.width < 768) {
      return FIREFOX_SIZES.small;
    } else if (windowSize.width < 1024) {
      return FIREFOX_SIZES.medium;
    }
    return FIREFOX_SIZES.large;
  }, [windowSize.width]);

  // Update initial position calculation
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Use initialPosition as-is, without any centering calculations
      setPosition(initialPosition);
    }
    // Only run when component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined" && !firefoxState.isMaximized) {
        const { width, height, maxWidth } = getResponsiveSizes();

        // Only update sizes, not position
        setFirefoxState((prev) => ({
          ...prev,
          width,
          height,
          maxWidth,
        }));
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [firefoxState.isMaximized, getResponsiveSizes]);

  // Modify maximize/minimize handlers
  const handleMaximize = () => {
    // Get the main OS container to maximize relative to it
    const mainContainer = document.querySelector("main") as HTMLElement;
    const firefoxWindow = document.querySelector(
      ".firefox-window"
    ) as HTMLElement;

    if (!mainContainer || !firefoxWindow) return;

    // Get main container dimensions
    const mainRect = mainContainer.getBoundingClientRect();

    // Disable transitions during state change to prevent visual glitches
    firefoxWindow.style.transition = "none";

    // Toggle maximized state
    const newMaximizedState = !firefoxState.isMaximized;

    if (newMaximizedState) {
      // Save current position before maximizing
      if (typeof window !== "undefined") {
        try {
          // Get the current window dimensions from the DOM (not state)
          const currentRect = firefoxWindow.getBoundingClientRect();
          
          // Store position and size in localStorage
          localStorage.setItem(
            "firefox-position-before-maximize",
            JSON.stringify({
              x: currentRect.left,
              y: currentRect.top
            })
          );
          localStorage.setItem(
            "firefox-size-before-maximize",
            JSON.stringify({
              width: firefoxState.width,
              height: firefoxState.height,
              maxWidth: firefoxState.maxWidth,
              actualWidth: currentRect.width,
              actualHeight: currentRect.height
            })
          );
        } catch {
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
      setPosition({ x: mainRect.left, y: 56 });

      // Add maximized class for additional styling
      firefoxWindow.classList.add("firefox-maximized");
    } else {
      // Get saved position and size
      try {
        const savedPositionStr = localStorage.getItem(
          "firefox-position-before-maximize"
        );
        const savedSizeStr = localStorage.getItem(
          "firefox-size-before-maximize"
        );

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
          setFirefoxState((prev) => ({
            ...prev,
            width: savedSize.width,
            height: savedSize.height,
            maxWidth: savedSize.maxWidth,
            isMaximized: false,
          }));

          // Remove maximized class
          firefoxWindow.classList.remove("firefox-maximized");

          // Re-enable transitions after brief delay
          setTimeout(() => {
            firefoxWindow.style.transition =
              "transform 300ms ease-out, opacity 300ms ease-out, border-radius 300ms ease-out";
          }, 50);

          return;
        }
      } catch {
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
    setFirefoxState((prev) => ({
      ...prev,
      isMaximized: newMaximizedState,
      width: newMaximizedState ? `${mainRect.width}px` : prev.width,
      height: newMaximizedState ? `${mainRect.height - 56}px` : prev.height,
      maxWidth: newMaximizedState ? "100%" : prev.maxWidth,
    }));

    // Re-enable transitions after brief delay
    setTimeout(() => {
      if (firefoxWindow) {
        firefoxWindow.style.transition =
          "transform 300ms ease-out, opacity 300ms ease-out, border-radius 300ms ease-out";
      }
    }, 50);
  };

  const handleMinimize = () => {
    setFirefoxState((prev) => ({
      ...prev,
      isMinimized: true,
    }));
    setIsMinimized(true);
  };

  const handleRestore = () => {
    // Simple restore without any centering logic
    if (typeof window !== "undefined") {
        const firefoxWindow = document.querySelector(
          ".firefox-window"
        ) as HTMLElement;

      if (firefoxWindow) {
        // Just make it visible again at its current position
        firefoxWindow.style.display = "flex";
      }
    }

    // Update minimized state
    setIsMinimized(false);
    setFirefoxState((prev) => ({ ...prev, isMinimized: false }));
  };

  // Add smooth scrolling function for GitHub projects
  const scrollToProjectsTop = useCallback(() => {
    if (projectsContainerRef.current) {
      // Use GSAP to scroll smoothly to the top
      gsap.to(projectsContainerRef.current, {
        scrollTo: { y: 0, autoKill: true },
        duration: 0.4,
        ease: "power3.out",
        overwrite: true,
      });
    }
  }, []);

  // Update pagination to use smooth scrolling (only when page number changes)
  useEffect(() => {
    if (projectsContainerRef.current) {
      gsap.to(projectsContainerRef.current, {
        scrollTo: { y: 0, autoKill: true },
        duration: 0.3,
        ease: "power3.out",
        overwrite: true,
      });
    }
  }, [currentPage]);

  // Remove scroll-progress logic completely

  // No scroll-progress effect

  // Remove continuous card animations to prevent scroll jank

  // Window dragging functions
  const handleMouseDown = (e: React.MouseEvent) => {
    if (firefoxState.isMaximized) return; // Don't allow dragging when maximized

    // Get the Firefox window element
    const firefoxWindow = e.currentTarget.parentElement as HTMLElement;
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
    function handleMouseMove(moveEvent: MouseEvent) {
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
      firefoxWindow.style.transition =
        "transform 300ms ease-out, opacity 300ms ease-out, border-radius 300ms ease-out";
      document.body.style.userSelect = "";

      // Get final position from the actual window position
      const finalRect = firefoxWindow.getBoundingClientRect();

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
          "firefox-position",
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

  // Navigation functions
  const navigateTo = useCallback((url: string) => {
    if (!url) return;

    // Handle special schemes and external sites
    if (url.startsWith('mailto:')) {
      if (typeof window !== 'undefined') {
        window.location.href = url;
      }
      return;
    }

    if (url.startsWith('home://')) {
      // Navigate to the internal start page
    if (url === currentUrl) return;
      setHistory((prev) => [...prev.slice(0, historyIndex + 1), url]);
      setCurrentUrl(url);
      setHistoryIndex((prev) => prev + 1);
      return;
    }

    // For external HTTP(S) URLs that aren't GitHub, open a new tab
    const isHttp = /^https?:\/\//i.test(url);
    if (isHttp && !url.includes('github.com')) {
      if (typeof window !== 'undefined') {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
      return;
    }

    // Internal navigation (e.g., GitHub view within the app)
    if (url === currentUrl) return;
    setHistory((prev) => [...prev.slice(0, historyIndex + 1), url]);
    setCurrentUrl(url);
    setHistoryIndex((prev) => prev + 1);
  }, [currentUrl, history, historyIndex]);

  const goBack = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex((prev) => prev - 1);
      setCurrentUrl(history[historyIndex - 1]);
    }
  }, [historyIndex, history]);

  const goForward = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((prev) => prev + 1);
      setCurrentUrl(history[historyIndex + 1]);
    }
  }, [historyIndex, history]);

  const refresh = useCallback(() => {
    // For now, just simulate a refresh by resetting currentUrl
    const currentUrlValue = currentUrl;
    setCurrentUrl("");
    setTimeout(() => {
      setCurrentUrl(currentUrlValue);
    }, 100);
  }, [currentUrl]);

  const toggleBookmark = useCallback(() => {
    if (bookmarks.includes(currentUrl)) {
      // Remove bookmark
      setBookmarks((prev) => prev.filter((b) => b !== currentUrl));
    } else {
      // Add bookmark
      setBookmarks((prev) => [...prev, currentUrl]);
    }
  }, [bookmarks, currentUrl]);

  // Tab management functions
  const addTab = useCallback((type: Tab['type'], title: string, url: string) => {
    const newTab: Tab = {
      id: `${type}-${Date.now()}`,
      title,
      url,
      type,
      isActive: true
    };

    setTabs(prev => {
      const updated = prev.map(tab => ({ ...tab, isActive: false }));
      return [...updated, newTab];
    });

    setCurrentUrl(url);
    setHistory([url]);
    setHistoryIndex(0);
  }, []);

  const switchTab = useCallback((tabId: string) => {
    setTabs(prev => prev.map(tab => ({
      ...tab,
      isActive: tab.id === tabId
    })));

    const targetTab = tabs.find(tab => tab.id === tabId);
    if (targetTab) {
      setCurrentUrl(targetTab.url);
      setHistory([targetTab.url]);
      setHistoryIndex(0);
    }
  }, [tabs]);

  const closeTab = useCallback((tabId: string) => {
    setTabs(prev => {
      const filtered = prev.filter(tab => tab.id !== tabId);
      
      // If we're closing the active tab, activate the last remaining tab
      const activeTab = prev.find(tab => tab.id === tabId);
      if (activeTab?.isActive && filtered.length > 0) {
        const lastTab = filtered[filtered.length - 1];
        lastTab.isActive = true;
        setCurrentUrl(lastTab.url);
        setHistory([lastTab.url]);
        setHistoryIndex(0);
      }
      
      // If no tabs left, close the window
      if (filtered.length === 0) {
        onClose();
        return [];
      }
      
      return filtered;
    });
  }, [onClose]);

  // Update currentUrl when active tab changes
  useEffect(() => {
    const activeTab = tabs.find(tab => tab.isActive);
    if (activeTab && activeTab.url !== currentUrl) {
      setCurrentUrl(activeTab.url);
    }
  }, [tabs, currentUrl]);

  // Notify parent of tab changes
  useEffect(() => {
    if (onTabChange) {
      onTabChange(tabs);
    }
  }, [tabs, onTabChange]);

  // Expose addTab function globally for terminal commands
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).firefoxAddTab = addTab;
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        delete (window as any).firefoxAddTab;
      }
    };
  }, [addTab]);

  // Function to get paginated repos
  const paginatedRepos = useMemo(() => {
    const startIndex = (currentPage - 1) * reposPerPage;
    const endIndex = startIndex + reposPerPage;
    return repos.slice(startIndex, endIndex);
  }, [repos, currentPage, reposPerPage]);

  // Add this new function to completely clear and refresh GitHub repos
  const forceRefreshRepos = useCallback(async () => {
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
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Add an effect to update repos per page based on screen size
  useEffect(() => {
    const updateReposPerPage = () => {
      if (typeof window !== 'undefined') {
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
    };

    // Set initial value
    updateReposPerPage();

    // Update on resize
    window.addEventListener('resize', updateReposPerPage);
    return () => window.removeEventListener('resize', updateReposPerPage);
  }, []);

  // Update the useEffect for loading projects
  const fetchGitHubRepos = useCallback(async () => {
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

          // Update cache in background
          updateCacheInBackground(username, cacheKey);
          return;
        }
      }

      // Fetch all repositories by handling pagination
      let allRepos: GitHubRepo[] = [];
      let page = 1;
      let hasMorePages = true;

      while (hasMorePages) {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=100&page=${page}`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
              "User-Agent": "Mozilla/5.0",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          allRepos = [...allRepos, ...data];
          // Check if we received fewer repos than the maximum per page
          // If so, we've reached the last page
          if (data.length < 100) {
            hasMorePages = false;
          } else {
            page++;
          }
        } else {
          hasMorePages = false;
        }
      }

      // Filter out forked repositories and the "OS_PORTFOLIO" repository (since it's a fork)
      const originalRepos = allRepos
        .filter((repo: GitHubRepo) => !repo.fork && repo.name !== "OS_PORTFOLIO")
        .map((repo: GitHubRepo) => ({
          ...repo,
          description: repo.description || "No description available",
          language: repo.language || "Unknown",
          stargazers_count: repo.stargazers_count || 0,
          topics: repo.topics || [],
        }))
        // Sort repositories by star count in descending order
        .sort(
          (a: GitHubRepo, b: GitHubRepo) =>
            b.stargazers_count - a.stargazers_count
        );

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
      } else {
        // No repos found, use sample data
        setRepos(sampleRepos);
        setRepoError("No repositories found. Using sample data instead.");
      }
    } catch (error) {
      console.error("Error fetching GitHub repos:", error);
      setRepos(sampleRepos);
      setRepoError(
        error instanceof Error
          ? error.message
          : "Failed to load GitHub projects. Using sample data as fallback."
      );
    } finally {
      setIsLoading(false);
    }
  }, [username, scrollToProjectsTop, sampleRepos, currentUrl]);

  useEffect(() => {
    if (showProjects || currentUrl.includes("github.com")) {
      // Introduce a small delay before fetching repos to ensure smooth rendering
      const timer = setTimeout(() => {
        fetchGitHubRepos();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [showProjects, currentUrl, fetchGitHubRepos]);

  // Function to update the cache in the background without blocking the UI
  const updateCacheInBackground = useCallback(async (
    username: string,
    cacheKey: string
  ) => {
    try {
      // Fetch all repositories by handling pagination
      let allRepos: GitHubRepo[] = [];
      let page = 1;
      let hasMorePages = true;

      while (hasMorePages) {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=100&page=${page}`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
              "User-Agent": "Mozilla/5.0",
            },
          }
        );

        if (!response.ok) {
          return; // Silently fail background update
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          allRepos = [...allRepos, ...data];
          if (data.length < 100) {
            hasMorePages = false;
          } else {
            page++;
          }
        } else {
          hasMorePages = false;
        }
      }

      // Filter out forked repositories and the "OS_PORTFOLIO" repository (since it's a fork)
      const originalRepos = allRepos
        .filter((repo: GitHubRepo) => !repo.fork && repo.name !== "OS_PORTFOLIO")
        .map((repo: GitHubRepo) => ({
          ...repo,
          description: repo.description || "No description available",
          language: repo.language || "Unknown",
          stargazers_count: repo.stargazers_count || 0,
          topics: repo.topics || [],
        }))
        // Sort repositories by star count in descending order
        .sort(
          (a: GitHubRepo, b: GitHubRepo) =>
            b.stargazers_count - a.stargazers_count
        );

      if (originalRepos.length > 0) {
        // Update cache silently
        localStorage.setItem(cacheKey, JSON.stringify(originalRepos));
        localStorage.setItem(`${cacheKey}-timestamp`, Date.now().toString());

        // Update state if user is still viewing the page
        if (currentUrl.includes("github.com")) {
          setRepos(originalRepos);
        }
      }
    } catch {
      // Silently fail background updates
    }
  }, [currentUrl, username]);

  // Load blogs when entering blogs page
  useEffect(() => {
    const isBlogs = currentUrl.startsWith('home://blogs');
    if (!isBlogs) return;
    
    const cacheKey = 'blogs-cache';
    const cacheTsKey = 'blogs-cache-ts';
    const expiry = 2 * 60 * 1000; // Reduced to 2 minutes for faster updates
    
    // Try to load from cache first for immediate display
    try {
      const cached = localStorage.getItem(cacheKey);
      const ts = localStorage.getItem(cacheTsKey);
      if (cached && ts && Date.now() - parseInt(ts, 10) < expiry) {
        const parsed = JSON.parse(cached);
        setBlogPosts(parsed);
      }
    } catch (error) {
      console.error('Cache read error:', error);
    }
    
    setBlogsLoading(true);
    setBlogsError(null);
    
         // Use the simple, guaranteed-to-work API
     const timestamp = Date.now();
     fetch(`/api/blogs/simple?t=${timestamp}`, { 
       cache: 'no-store',
       headers: {
         'Cache-Control': 'no-cache, no-store, must-revalidate',
         'Pragma': 'no-cache'
       }
     })
      .then(async (r) => {
        if (!r.ok) {
          throw new Error(`HTTP ${r.status}: ${r.statusText}`);
        }
        return r.json();
      })
             .then((data) => {
         console.log('Simple API response:', data);
         
         if (data.success && Array.isArray(data.posts)) {
           const posts = data.posts;
           console.log('Blog posts received:', posts.length, 'posts');
           if (posts.length > 0) {
             console.log('Latest post:', posts[0].title);
           }
           setBlogPosts(posts);
         } else {
           console.error('API returned error or invalid data:', data);
           setBlogsError(data.error || 'Invalid response from API');
           setBlogPosts([]);
         }
        
                 // Update cache with fresh data
         if (data.success && Array.isArray(data.posts)) {
           try {
             localStorage.setItem(cacheKey, JSON.stringify(data.posts));
             localStorage.setItem(cacheTsKey, Date.now().toString());
           } catch (error) {
             console.error('Cache write error:', error);
           }
         }
        
        // Update last updated timestamp
        setBlogsLastUpdated(new Date().toLocaleTimeString());
        
        // Log meta info for debugging
        if (data.meta) {
          console.log('Blogs loaded:', data.meta);
        }
      })
      .catch((error) => {
        console.error('Blog fetch error:', error);
        // If we have cached data, show it but with a warning
        if (blogPosts.length > 0) {
          setBlogsError('Showing cached data. Failed to fetch latest blogs.');
        } else {
          setBlogsError('Failed to load blogs. Please try refreshing.');
        }
      })
      .finally(() => setBlogsLoading(false));
  }, [currentUrl]);

  // Simple site visits analytics using countapi.xyz when on the start/home view
  useEffect(() => {
    const onHomeStart =
      currentUrl.startsWith('home://start') ||
      (!currentUrl.includes('github.com') &&
        !currentUrl.startsWith('home://blogs') &&
        !currentUrl.startsWith('home://certs'));

    if (!onHomeStart) return;
    setVisitsLoading(true);
    setVisitsError(null);
    try {
      const host = typeof window !== 'undefined' ? window.location.host : 'local';
      fetch(`/api/visits?host=${encodeURIComponent(host)}`, { cache: 'no-store' })
        .then(async (r) => (r.ok ? r.json() : { value: null }))
        .then((data) => {
          if (typeof data?.value === 'number') {
            setVisitsCount(data.value);
          } else {
            setVisitsError('Unavailable');
          }
        })
        .catch(() => setVisitsError('Unavailable'))
        .finally(() => setVisitsLoading(false));
    } catch {
      setVisitsLoading(false);
      setVisitsError('Unavailable');
    }
  }, [currentUrl]);

  // Effect to handle window focus and pop up Firefox when minimized
  useEffect(() => {
    const handleWindowFocus = () => {
      if (isMinimized) {
        // Pop up Firefox when window gains focus
        setIsMinimized(false);
        setFirefoxState(prev => ({ ...prev, isMinimized: false }));
      }
    };

    // Listen for window focus events
    window.addEventListener('focus', handleWindowFocus);
    
    // Also listen for document visibility changes
    const handleVisibilityChange = () => {
      if (!document.hidden && isMinimized) {
        setIsMinimized(false);
        setFirefoxState(prev => ({ ...prev, isMinimized: false }));
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Listen for custom event to pop up Firefox from terminal commands
    const handlePopupFirefox = () => {
      if (isMinimized) {
        setIsMinimized(false);
        setFirefoxState(prev => ({ ...prev, isMinimized: false }));
      }
    };
    
    window.addEventListener('popup-firefox', handlePopupFirefox);

    return () => {
      window.removeEventListener('focus', handleWindowFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('popup-firefox', handlePopupFirefox);
    };
  }, [isMinimized]);

  // Return the Firefox browser component JSX
  return (
    <>
      {!isMinimized && (
        <div
           className={`firefox-window bg-gray-900/40 backdrop-blur-sm border border-purple-500/30 shadow-lg overflow-hidden flex flex-col z-40 fixed ${
            firefoxState.isMaximized ? "firefox-maximized" : "rounded-md"
          }`}
          style={{
            transition:
              showProjects || firefoxState.isMaximized
                ? "none"
                : "transform 300ms ease-out, opacity 300ms ease-out, border-radius 300ms ease-out",
            width: firefoxState.isMaximized ? "100%" : firefoxState.width,
            height: firefoxState.isMaximized
              ? "calc(100% - 56px)"
              : firefoxState.height,
            maxWidth: firefoxState.isMaximized ? "100%" : firefoxState.maxWidth,
            top: firefoxState.isMaximized ? "56px" : `${position.y}px`,
            left: firefoxState.isMaximized ? "0" : `${position.x}px`,
            boxShadow: firefoxState.isMaximized
              ? "none"
              : "0 0 20px rgba(123, 104, 238, 0.3)",
            display: isMinimized ? "none" : "flex",
            zIndex: 40,
          }}
        >
                     {/* Firefox title bar */}
           <div
             className="firefox-titlebar bg-gray-800/70 backdrop-blur-sm flex items-center p-2 cursor-move"
             onMouseDown={handleMouseDown}
           >
             <div className="flex items-center w-full">
               <div className="flex-1"></div>
               <div className="firefox-title flex-shrink-0 text-gray-200/90 text-sm">
                 {currentUrl.includes("github.com")
                   ? "GitHub Projects - Mozilla Firefox"
                   : currentUrl.startsWith("home://certs")
                   ? "Certifications - Mozilla Firefox"
                   : currentUrl.startsWith("home://blogs")
                   ? "Blogs - Mozilla Firefox"
                   : `${DEFAULT_BRAND_NAME} - Mozilla Firefox`}
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
                   onClick={onClose}
                   title="Close"
                 >
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                     <path fillRule="evenodd" d="M6.28 6.28a.75.75 0 0 1 1.06 0L10 8.94l2.66-2.66a.75.75 0 1 1 1.06 1.06L11.06 10l2.66 2.66a.75.75 0 1 1-1.06 1.06L10 11.06l-2.66 2.66a.75.75 0 1 1-1.06-1.06L8.94 10 6.28 7.34a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                   </svg>
                 </button>
               </div>
             </div>
           </div>

           {/* Tab Bar */}
           <div className="tab-bar bg-gray-700/50 backdrop-blur-sm border-b border-gray-600/30">
             <div className="flex items-center h-8 px-2 gap-1 overflow-x-auto custom-scrollbar">
               {tabs.map((tab) => (
                 <div
                   key={tab.id}
                   className={`tab-item flex items-center gap-2 px-3 py-1 rounded-t-md cursor-pointer transition-all duration-200 min-w-0 flex-shrink-0 ${
                     tab.isActive
                       ? 'bg-gray-800/80 text-white border-b-2 border-blue-500'
                       : 'bg-gray-600/30 text-gray-300 hover:bg-gray-600/50 hover:text-white'
                   }`}
                   onClick={() => switchTab(tab.id)}
                 >
                   {/* Tab Icon */}
                   <div className="tab-icon flex-shrink-0">
                     {tab.type === 'projects' && (
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                         <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                       </svg>
                     )}
                     {tab.type === 'blogs' && (
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                       </svg>
                     )}
                     {tab.type === 'certs' && (
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                       </svg>
                     )}
                     {tab.type === 'start' && (
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                       </svg>
                     )}
                   </div>
                   
                   {/* Tab Title */}
                   <span className="tab-title text-xs font-medium truncate max-w-24">
                     {tab.title}
                   </span>
                   
                   {/* Close Button */}
                   {tabs.length > 1 && (
                     <button
                       onClick={(e) => {
                         e.stopPropagation();
                         closeTab(tab.id);
                       }}
                       className="tab-close ml-1 p-0.5 rounded hover:bg-gray-500/50 transition-colors opacity-60 hover:opacity-100"
                       title="Close tab"
                     >
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                       </svg>
                     </button>
                   )}
                 </div>
               ))}
               
               {/* New Tab Button - Removed to prevent misuse */}
             </div>
           </div>

          {/* Browser content */}
          <div
            className="browser-content flex-1 bg-transparent overflow-auto custom-scrollbar will-change-transform will-change-scroll-position"
            ref={projectsContainerRef}
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollBehavior: 'smooth',
              contain: 'layout style paint',
              overscrollBehavior: 'contain'
            }}
          >
            {/* Removed progress bar to avoid scroll interference */}

            {/* URL bar */}
            <div className="url-bar flex items-center p-2 bg-gray-800/70 backdrop-blur-sm">
              <button
                onClick={goBack}
                disabled={historyIndex <= 0}
                className={`p-1 rounded ${
                  historyIndex <= 0
                    ? "text-gray-500"
                    : "text-gray-300 hover:bg-gray-700/50"
                }`}
              >
                ←
              </button>
              <button
                onClick={goForward}
                disabled={historyIndex >= history.length - 1}
                className={`p-1 rounded ${
                  historyIndex >= history.length - 1
                    ? "text-gray-500"
                    : "text-gray-300 hover:bg-gray-700/50"
                }`}
              >
                →
              </button>
              <button
                onClick={refresh}
                className="p-1 rounded text-gray-300 hover:bg-gray-700/50"
              >
                ↻
              </button>
              <div className="flex-1 mx-2 bg-gray-700/50 rounded flex items-center px-3 py-1">
                <span className="text-green-400 mr-2">🔒</span>
                <input
                  type="text"
                  value={currentUrl}
                  onChange={(e) => setCurrentUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      navigateTo(currentUrl);
                    }
                  }}
                  className="flex-1 bg-transparent text-gray-200 outline-none text-sm"
                />
              </div>
              <button
                onClick={toggleBookmark}
                className={`p-1 rounded ${
                  bookmarks.includes(currentUrl)
                    ? "text-yellow-400"
                    : "text-gray-300 hover:bg-gray-700/50"
                }`}
              >
                ★
              </button>
            </div>

            {/* Browser page content */}
            <div className="browser-page p-6 text-gray-200 bg-slate-900/30 min-h-[500px] custom-scrollbar">
              {/* Content varies based on URL */}
                {currentUrl.includes("github.com") ? (
                <div className="github-projects-page relative">
                  <div className="github-header bg-gray-800/60 backdrop-blur-md p-6 rounded-lg border border-purple-500/30 shadow-lg mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                      <div className="flex items-center">
                        <div className="github-logo mr-3 flex-shrink-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="white"
                            className="transition-transform hover:rotate-12 duration-300"
                          >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </div>
                        <div>
                          <h1 className="text-2xl font-bold text-white mb-1">
                            GitHub Projects
                          </h1>
                          <p className="text-gray-400">
                            Repositories by{" "}
                            <span className="text-purple-400 font-semibold">{DEFAULT_NAME}</span>
                          </p>
                        </div>
                      </div>
                      <div className="github-stats px-4 py-2 bg-gray-900/60 rounded-lg border border-gray-700/50 flex items-center justify-between min-w-[170px]">
                        <div className="text-sm text-gray-300">
                          <span className="font-semibold text-purple-300">{repos.length}</span>{" "}
                          <span className="text-gray-400">repositories</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              // Clear cache and force refresh
                              const cacheKey = `github-repos-${username}`;
                              localStorage.removeItem(cacheKey);
                              localStorage.removeItem(`${cacheKey}-timestamp`);
                              fetchGitHubRepos();
                            }}
                            disabled={isLoading}
                            className="refresh-btn p-1.5 rounded-md bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Refresh repositories"
                          >
                            <svg
                              className={`w-4 h-4 text-purple-300 ${isLoading ? 'animate-spin' : ''}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                              />
                            </svg>
                          </button>
                        {isLoading && (
                            <div className="loading-indicator w-5 h-5 border-t-2 border-r-2 border-purple-500 rounded-full animate-spin"></div>
                        )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {repoError && (
                    <div className="error-message bg-red-900/30 text-red-300 p-4 rounded-lg mb-6 border border-red-500/30">
                      {repoError}
                    </div>
                  )}

                  {/* Improved grid layout that adapts to screen sizes */}
                  <div className="repos-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-4">
                    {paginatedRepos.map((repo) => (
                      <div
                        key={repo.id}
                        className="repo-card floating-card bg-gray-800/50 backdrop-blur-sm rounded-lg border border-purple-500/20 p-3 sm:p-4 lg:p-5 transition-all hover:border-purple-500/50 hover:shadow-lg overflow-hidden h-auto"
                      >
                        <div className="flex justify-between items-start mb-2 sm:mb-3">
                          <h3 className="text-lg sm:text-xl font-bold text-purple-300 hover:text-purple-400 transition-colors truncate max-w-[70%]">
                            <a
                              href={repo.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline"
                            >
                              {repo.name}
                            </a>
                          </h3>
                          <div className="flex items-center text-yellow-400 bg-gray-900/30 px-2 py-1 text-xs sm:text-sm rounded-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3 sm:h-4 sm:w-4 mr-1"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="font-mono text-xs sm:text-sm">{repo.stargazers_count}</span>
                          </div>
                        </div>

                        <p className="text-gray-300 mb-3 sm:mb-4 line-clamp-2 text-sm sm:text-base h-8 sm:h-12">
                          {repo.description || "No description available"}
                        </p>

                        <div className="repo-meta flex flex-col space-y-2 sm:space-y-3">
                          <div className="tech-stack flex flex-wrap items-center justify-between">
                            {repo.language && (
                              <div className="language-tag flex items-center">
                                <span
                                  className="w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-1 sm:mr-1.5"
                                  style={{
                                    backgroundColor: 
                                      repo.language === "JavaScript" ? "#f1e05a" :
                                      repo.language === "TypeScript" ? "#3178c6" :
                                      repo.language === "Python" ? "#3572A5" :
                                      repo.language === "Rust" ? "#dea584" :
                                      repo.language === "Go" ? "#00ADD8" :
                                      repo.language === "C++" ? "#f34b7d" :
                                      repo.language === "Java" ? "#b07219" :
                                      repo.language === "Ruby" ? "#701516" :
                                      repo.language === "HTML" ? "#e34c26" :
                                      repo.language === "CSS" ? "#563d7c" : 
                                      "#8A8A8A"
                                  }}
                                ></span>
                                <span className="text-xs sm:text-sm text-gray-300">
                                  {repo.language}
                                </span>
                              </div>
                            )}
                            <div className="text-xs text-gray-400">
                              Updated: {formatDate(repo.updated_at)}
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            {repo.topics && repo.topics.length > 0 && (
                              <div className="topics flex flex-wrap gap-1">
                                {repo.topics.slice(0, 2).map((topic) => (
                                  <span 
                                    key={topic} 
                                    className="text-xs bg-purple-900/30 text-purple-300 px-1.5 sm:px-2 py-0.5 rounded-full border border-purple-500/20"
                                  >
                                    {topic}
                                  </span>
                                ))}
                                {repo.topics.length > 2 && (
                                  <span className="text-xs text-gray-400">+{repo.topics.length - 2}</span>
                                )}
                              </div>
                            )}
                            
                            <a
                              href={repo.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="view-repo-btn text-xs bg-purple-600/40 hover:bg-purple-600/60 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-md transition-colors flex items-center"
                            >
                              <span>View</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 sm:h-3 sm:w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Add pagination controls */}
                  {repos.length > reposPerPage && (
                    <div className="pagination-controls flex justify-center items-center mt-6 sm:mt-8 space-x-2 sm:space-x-4">
                      <button 
                        onClick={() => {
                          if (currentPage > 1) {
                            setCurrentPage(currentPage - 1);
                            scrollToProjectsTop();
                          }
                        }}
                        disabled={currentPage === 1}
                        className={`px-2 sm:px-4 py-1 sm:py-2 rounded-md flex items-center text-xs sm:text-sm ${
                          currentPage === 1 
                            ? 'bg-gray-700/30 text-gray-500 cursor-not-allowed' 
                            : 'bg-purple-600/40 hover:bg-purple-600/60 text-white'
                        } transition-colors`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Prev
                      </button>
                      
                      <div className="page-info text-gray-300 text-xs sm:text-sm">
                        <span className="font-medium text-purple-400">{currentPage}</span>
                        <span className="mx-1 sm:mx-2 text-gray-500">/</span>
                        <span>{Math.ceil(repos.length / reposPerPage)}</span>
                      </div>
                      
                      <button 
                        onClick={() => {
                          if (currentPage < Math.ceil(repos.length / reposPerPage)) {
                            setCurrentPage(currentPage + 1);
                            scrollToProjectsTop();
                          }
                        }}
                        disabled={currentPage >= Math.ceil(repos.length / reposPerPage)}
                        className={`px-2 sm:px-4 py-1 sm:py-2 rounded-md flex items-center text-xs sm:text-sm ${
                          currentPage >= Math.ceil(repos.length / reposPerPage)
                            ? 'bg-gray-700/30 text-gray-500 cursor-not-allowed' 
                            : 'bg-purple-600/40 hover:bg-purple-600/60 text-white'
                        } transition-colors`}
                      >
                        Next
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  )}
                  
                  {/* Add repo count and refresh button */}
                  <div className="refresh-controls flex justify-between items-center mt-4 sm:mt-6 p-2 sm:p-3 bg-gray-800/50 rounded-lg border border-purple-500/20">
                    <div className="repo-count text-xs sm:text-sm text-gray-300">
                      Showing <span className="font-medium text-purple-400">{paginatedRepos.length}</span> of <span className="font-medium text-purple-400">{repos.length}</span> repos
                    </div>
                    
                    <button 
                      onClick={forceRefreshRepos}
                      disabled={isLoading}
                      className="refresh-btn flex items-center px-2 sm:px-3 py-0.5 sm:py-1 bg-purple-600/40 hover:bg-purple-600/60 text-white rounded-md transition-colors text-xs sm:text-sm"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin h-3 w-3 sm:h-4 sm:w-4 border-2 border-purple-300 border-t-transparent rounded-full mr-1 sm:mr-2"></div>
                          Refreshing...
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Refresh
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="default-page p-6">
                  {currentUrl.startsWith('home://certs') ? (
                    <div className="certs-page">
                      <div className="bg-gray-800/60 backdrop-blur-md p-6 rounded-lg border border-blue-500/30 shadow-[0_0_25px_rgba(59,130,246,0.25)] mb-6">
                        <div className="flex items-center gap-3">
                          <span className="text-blue-400 text-xl">✅</span>
                          <div>
                            <h2 className="text-2xl font-bold text-blue-200">My Certificates</h2>
                            <p className="text-blue-300/80">Professional certifications and achievements</p>
                      </div>
                          </div>
                        </div>
                        
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {certifications.map((c) => (
                          <div key={c.id} className="cert-card group perspective" onClick={() => setActiveCert(c)}>
                            <div className="card-inner">
                              <div className="card-face card-front">
                                <div className="h-40 w-40 bg-gray-900/50 rounded-xl border border-blue-500/30 flex items-center justify-center shadow-[0_10px_30px_rgba(37,99,235,0.25)]">
                                  <Image src={c.image} alt={c.title} className="h-24 w-24 object-contain opacity-90" width={96} height={96} />
                      </div>
                      </div>
                              <div className="card-face card-back">
                                <div className="bg-gradient-to-b from-blue-900/40 to-indigo-900/30 p-5 rounded-xl border border-blue-500/30 shadow-[0_10px_35px_rgba(37,99,235,0.35)] h-full">
                                  <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-xl font-bold text-blue-200">{c.title}</h3>
                                    <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">{c.status}</span>
                      </div>
                                  <p className="text-blue-100/80 text-sm leading-relaxed max-h-28 overflow-y-auto pr-1 custom-scrollbar">{c.description}</p>
                                  <div className="flex gap-3 mt-3 text-xs flex-wrap">
                                    {c.issued && (
                                      <span className="px-2 py-1 rounded-full bg-blue-900/40 text-blue-200 border border-blue-500/30">Issued: {c.issued}</span>
                                    )}
                                    {c.completed && (
                                      <span className="px-2 py-1 rounded-full bg-indigo-900/40 text-indigo-200 border border-indigo-500/30">Completed: {c.completed}</span>
                                    )}
                                    {c.expires && (
                                      <span className="px-2 py-1 rounded-full bg-blue-900/40 text-blue-200 border border-blue-500/30">Expires: {c.expires}</span>
                                    )}
                    </div>
                          </div>
                          </div>
                          </div>
                          </div>
                        ))}
                        </div>
                      </div>
                  ) : currentUrl.startsWith('home://blogs') ? (
                    <div className="blogs-page">
                      <div className="bg-gray-800/60 backdrop-blur-md p-6 rounded-lg border border-pink-500/30 shadow-[0_0_25px_rgba(236,72,153,0.25)] mb-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-pink-400 text-xl">📝</span>
                            <div>
                              <h2 className="text-2xl font-bold text-pink-200">Latest Blogs</h2>
                              <p className="text-pink-300/80">From DEV.to and Medium</p>
                              {blogsLastUpdated && (
                                <p className="text-xs text-pink-300/60 mt-1">Last updated: {blogsLastUpdated}</p>
                              )}
                            </div>
                          </div>
                                                                                <button
                             onClick={async () => {
                               try {
                                 setBlogsLoading(true);
                                 // Clear cache
                                 try {
                                   localStorage.removeItem('blogs-cache');
                                   localStorage.removeItem('blogs-cache-ts');
                                 } catch (error) {
                                   console.error('Cache clear error:', error);
                                 }
                                 
                                 // Fetch fresh data
                                 const timestamp = Date.now();
                                 const response = await fetch(`/api/blogs/simple?t=${timestamp}`);
                                 const data = await response.json();
                                 console.log('Blog refresh result:', data);
                                 
                                 if (data.success && Array.isArray(data.posts)) {
                                   setBlogPosts(data.posts);
                                   setBlogsLastUpdated(new Date().toLocaleTimeString());
                                   
                                   // Update cache with fresh data
                                   try {
                                     localStorage.setItem('blogs-cache', JSON.stringify(data.posts));
                                     localStorage.setItem('blogs-cache-ts', Date.now().toString());
                                   } catch (error) {
                                     console.error('Cache write error:', error);
                                   }
                                 } else {
                                   setBlogsError(data.error || 'Failed to load blogs');
                                 }
                               } catch (error) {
                                 console.error('Blog refresh failed:', error);
                                 setBlogsError('Failed to refresh blogs');
                               } finally {
                                 setBlogsLoading(false);
                               }
                             }}
                             disabled={blogsLoading}
                             className="px-3 py-1.5 bg-pink-600/60 hover:bg-pink-600/80 disabled:bg-pink-600/30 text-white rounded-md text-sm transition-colors flex items-center gap-2"
                           >
                             {blogsLoading ? (
                               <>
                                 <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                 Refreshing...
                               </>
                             ) : (
                               <>
                                 <span>🔄</span>
                                 Refresh Blogs
                               </>
                             )}
                           </button>
                        </div>
                      </div>
                      {blogsError && (
                        <div className="bg-red-900/30 text-red-300 p-3 rounded border border-red-500/30 mb-4">{blogsError}</div>
                      )}
                      {blogsLoading ? (
                        <div className="flex items-center justify-center h-40">
                          <div className="loading-circle-container">
                            <div className="loading-circle"></div>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {blogPosts.length === 0 ? (
                            <div className="col-span-full text-center py-12">
                              <div className="text-pink-300/60 text-6xl mb-4">📝</div>
                              <h3 className="text-xl font-semibold text-pink-200 mb-2">No blogs found</h3>
                              <p className="text-pink-300/60 mb-4">Check back later for new content from DEV.to and Medium</p>
                              <button
                                onClick={() => {
                                  try {
                                    localStorage.removeItem('blogs-cache');
                                    localStorage.removeItem('blogs-cache-ts');
                                  } catch (error) {
                                    console.error('Cache clear error:', error);
                                  }
                                  const current = currentUrl;
                                  setCurrentUrl('home://temp');
                                  setTimeout(() => setCurrentUrl(current), 100);
                                }}
                                className="px-4 py-2 bg-pink-600/60 hover:bg-pink-600/80 text-white rounded-md"
                              >
                                Try Again
                              </button>
                            </div>
                          ) : (
                            blogPosts.map((post) => (
                            <a
                              key={post.id}
                              href={post.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group relative rounded-xl overflow-hidden border border-pink-500/20 hover:border-pink-500/50 bg-gray-900/40 shadow-lg transition-all hover:-translate-y-1"
                            >
                              <div className="h-40 bg-gradient-to-br from-gray-800/60 to-gray-900/60 relative overflow-hidden">
                                {post.coverImage ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img src={post.coverImage} alt={post.title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                ) : (
                                  <div className="absolute inset-0 flex items-center justify-center text-pink-300/60 text-4xl">✍️</div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full bg-pink-600/30 text-pink-200 border border-pink-500/30">
                                  {post.source === 'devto' ? 'DEV.to' : 'Medium'}
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="text-lg font-semibold text-white line-clamp-2 group-hover:text-pink-300 transition-colors">{post.title}</h3>
                                {post.publishedAt && (
                                  <div className="mt-2 text-xs text-gray-400">{new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                                )}
                                {post.tags && post.tags.length > 0 && (
                                  <div className="mt-3 flex flex-wrap gap-1">
                                    {post.tags.slice(0, 3).map((t) => (
                                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-pink-900/30 text-pink-200 border border-pink-500/20">{t}</span>
                                    ))}
                                  </div>
                                )}
                              </div>
                              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10" />
                                <div className="absolute bottom-3 right-3 text-pink-300 text-sm flex items-center">Read <span className="ml-1">→</span></div>
                              </div>
                            </a>
                          )))}
                        </div>
                      )}
                    </div>
                  ) : (
                  <>
                  <div className="bg-gray-800/60 backdrop-blur-md p-6 rounded-lg border border-purple-500/30 shadow-lg mb-6">
                    <h1 className="text-2xl font-bold text-white mb-2">Hi, I&apos;m {DEFAULT_NAME} 👋</h1>
                    <p className="text-gray-300">{DEFAULT_WELCOME_TEXT}</p>
                          </div>
                   <div className="bg-gray-800/50 rounded-lg border border-purple-500/20 p-4 mb-6">
                    <div className="text-sm text-gray-400 mb-2">Quick Search</div>
                    <div className="flex gap-2">
                      <input
                        value={startSearch}
                        onChange={(e) => setStartSearch(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const q = startSearch.trim();
                            if (!q) return;
                            const isUrl = /^(https?:\/\/|home:\/\/)/i.test(q) || /\.[a-z]{2,}$/i.test(q);
                            const target = isUrl ? (q.startsWith('http') || q.startsWith('home://') ? q : `https://${q}`) : `https://duckduckgo.com/?q=${encodeURIComponent(q)}`;
                            navigateTo(target);
                          }
                        }}
                        placeholder="Type a URL or search the web and press Enter"
                        className="flex-1 bg-gray-900/60 text-gray-200 px-3 py-2 rounded-md border border-gray-700/50 outline-none focus:border-purple-500/50"
                      />
                      <button
                        onClick={() => {
                          const q = startSearch.trim();
                          if (!q) return;
                          const isUrl = /^(https?:\/\/|home:\/\/)/i.test(q) || /\.[a-z]{2,}$/i.test(q);
                          const target = isUrl ? (q.startsWith('http') || q.startsWith('home://') ? q : `https://${q}`) : `https://duckduckgo.com/?q=${encodeURIComponent(q)}`;
                          navigateTo(target);
                        }}
                        className="px-4 py-2 bg-purple-600/60 hover:bg-purple-600/80 text-white rounded-md"
                      >Go</button>
                          </div>
                          </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <button
                      onClick={() => { if (typeof window !== 'undefined') { window.open(`https://github.com/${username}`, '_blank', 'noopener,noreferrer'); } }}
                      className="group relative overflow-hidden rounded-lg p-4 text-left bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-purple-500/20 hover:border-purple-500/40 transition-all hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(124,58,237,0.25)]"
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,0.25),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.2),transparent_40%)]" />
                      <div className="relative">
                        <div className="text-purple-300 font-semibold mb-1">GitHub</div>
                        <div className="text-gray-400 text-sm">{username}</div>
                      </div>
                    </button>
                    <button
                      onClick={() => navigateTo(DEFAULT_LINKEDIN_URL)}
                      className="group relative overflow-hidden rounded-lg p-4 text-left bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-purple-500/20 hover:border-purple-500/40 transition-all hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(59,130,246,0.25)]"
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.25),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(139,92,246,0.2),transparent_40%)]" />
                      <div className="relative">
                        <div className="text-purple-300 font-semibold mb-1">LinkedIn</div>
                        <div className="text-gray-400 text-sm">Profile</div>
                      </div>
                    </button>
                    <button
                      onClick={() => navigateTo(`mailto:${DEFAULT_EMAIL}`)}
                      className="group relative overflow-hidden rounded-lg p-4 text-left bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-purple-500/20 hover:border-purple-500/40 transition-all hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(16,185,129,0.25)]"
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.25),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(34,197,94,0.2),transparent_40%)]" />
                      <div className="relative">
                        <div className="text-purple-300 font-semibold mb-1">Email</div>
                        <div className="text-gray-400 text-sm">{DEFAULT_EMAIL}</div>
                      </div>
                    </button>
                    <button
                      onClick={() => navigateTo(`https://github.com/${username}?tab=repositories`)}
                      className="group relative overflow-hidden rounded-lg p-4 text-left bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-purple-500/20 hover:border-purple-500/40 transition-all hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(234,179,8,0.2)]"
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_20%_20%,rgba(234,179,8,0.25),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(139,92,246,0.2),transparent_40%)]" />
                      <div className="relative">
                        <div className="text-purple-300 font-semibold mb-1">Repositories</div>
                        <div className="text-gray-400 text-sm">View all projects</div>
                      </div>
                    </button>
                   </div>

                   {/* Simple analytics card */}
                   <div className="mt-6 bg-gray-800/50 rounded-lg border border-purple-500/20 p-4">
                     <div className="flex items-center justify-between">
                       <div>
                         <div className="text-sm text-gray-400">Total Visits</div>
                         <div className="text-2xl font-bold text-purple-300">
                           {visitsLoading ? '…' : visitsError ? '—' : visitsCount ?? '—'}
                         </div>
                       </div>
                       <div className="text-xs text-gray-500">live via countapi.xyz</div>
                     </div>
                   </div>
                   </>
                  )}
                    </div>
                  )}
                        </div>
                      </div>
                    </div>
                  )}

      {activeCert && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setActiveCert(null)}>
          <div className="absolute top-6 right-8 text-gray-300 hover:text-white cursor-pointer" onClick={() => setActiveCert(null)}>✕</div>
          <div className="mx-4 max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="text-2xl font-bold text-blue-200 mb-3 flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]"></span>
              {activeCert.title}
                  </div>
            <div className="bg-gray-900/80 border border-blue-500/30 rounded-lg shadow-[0_0_25px_rgba(59,130,246,0.35)] overflow-hidden">
              <Image src={activeCert.image} alt={activeCert.title} className="w-full h-auto object-contain" width={1000} height={700} />
            </div>
            {(activeCert.provider || activeCert.issued) && (
              <div className="text-blue-300/90 text-sm mt-3 text-center">
                {activeCert.provider ? `${activeCert.provider}` : ''}
                {activeCert.provider && activeCert.issued ? ' • ' : ''}
                {activeCert.issued ? `${activeCert.issued}` : ''}
                </div>
              )}
          </div>
        </div>
      )}
      
      {/* Taskbar indicator for minimized firefox */}
      {isMinimized && (
        <div
          ref={firefoxIndicatorRef}
          className="firefox-taskbar-indicator fixed top-0 z-[101] h-12 px-3 flex items-center justify-center cursor-pointer hover:bg-gray-700/50 transition-colors border-b-2 border-purple-500/30 bg-gray-800/30 backdrop-blur-sm"
          onClick={handleRestore}
          style={{
            left: "160px", // Position after terminal indicator
            width: "80px", // Fixed width
            transition: "left 0.2s ease, background-color 0.2s ease, border-color 0.2s ease",
          }}
        >
          <div className="flex items-center space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 21a9 9 0 100-18 9 9 0 000 18z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h8"
                fill="purple"
              />
            </svg>
            <span className="text-xs text-purple-400">Firefox</span>
          </div>
        </div>
      )}

      <style>
        {`
        /* 3D flip card for certifications */
        .perspective { perspective: 1200px; }
        .card-inner {
          position: relative;
          width: 100%;
          height: 220px;
          transform-style: preserve-3d;
          transition: transform 0.6s ease;
        }
        .cert-card:hover .card-inner { transform: rotateY(180deg); }
        .card-face {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          backface-visibility: hidden;
          border-radius: 12px;
        }
        .card-back { transform: rotateY(180deg); }
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

         /* Tab styles */
         .tab-bar {
           scrollbar-width: none;
           -ms-overflow-style: none;
         }
         
         .tab-bar::-webkit-scrollbar {
           display: none;
         }
         
         .tab-item {
           position: relative;
           overflow: hidden;
         }
         
         .tab-item::before {
           content: '';
           position: absolute;
           top: 0;
           left: 0;
           right: 0;
           bottom: 0;
           background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
           transform: translateX(-100%);
           transition: transform 0.3s ease;
         }
         
         .tab-item:hover::before {
           transform: translateX(100%);
         }
         
         .tab-item.active {
           box-shadow: 0 2px 4px rgba(0,0,0,0.2);
         }
         
         .tab-close {
           opacity: 0;
           transition: opacity 0.2s ease;
         }
         
         .tab-item:hover .tab-close {
           opacity: 1;
         }
         

        `}
      </style>
    </>
  );
}
