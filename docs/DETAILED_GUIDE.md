# Detailed Code Guide - Sriram Portfolio

This document provides a comprehensive explanation of the codebase architecture, implementation details, and technical decisions with relevant MDN documentation links.

## 📁 Project Structure

```
sriram-portfolio/
├── app/                    # Next.js 14 App Router
│   ├── globals.css        # Global styles and animations
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main page component
├── components/            # React components
│   ├── ArchLinuxOS.tsx    # Desktop environment simulation
│   ├── Terminal.tsx       # Interactive terminal component
│   ├── Firefox.tsx        # Browser simulation component
│   └── ...                # Other utility components
├── constants/             # Configuration constants
│   └── profile.ts         # Profile information
├── public/               # Static assets
│   └── assets/           # Images, icons, and media
└── docs/                 # Documentation
```

## 🏗️ Architecture Overview

### Next.js 14 App Router
The project uses Next.js 14 with the new App Router for improved performance and developer experience.

**Key Features:**
- [Server Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) for better performance
- [App Router](https://nextjs.org/docs/app) for file-based routing
- [TypeScript](https://www.typescriptlang.org/docs/) for type safety

### Component Architecture

#### 1. ArchLinuxOS Component (`components/ArchLinuxOS.tsx`)

**Purpose:** Simulates the entire desktop environment with wallpaper, taskbar, and desktop icons.

**Key Features:**
- **Desktop Icons:** Interactive icons with hover animations
- **Taskbar:** System tray, time display, and window management
- **Wallpaper:** Blurred background with responsive design

**Technical Implementation:**
```typescript
// Desktop icon hover effects with CSS transforms
.desktop-icon:hover {
  transform: scale(1.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

**MDN References:**
- [CSS Transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)
- [CSS Transition](https://developer.mozilla.org/en-US/docs/Web/CSS/transition)
- [CSS Box Shadow](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow)

#### 2. Terminal Component (`components/Terminal.tsx`)

**Purpose:** Provides an interactive command-line interface for portfolio navigation.

**Key Features:**
- **Command Processing:** Real-time command execution
- **History Management:** Command history with arrow key navigation
- **Window Management:** Draggable, resizable, minimizable window
- **Custom Commands:** Portfolio-specific commands (about, projects, etc.)

**Technical Implementation:**
```typescript
// Command processing with state management
const handleCommand = (cmd: string) => {
  const cmdLower = cmd.trim().toLowerCase();
  const [command, ...args] = cmdLower.split(" ");
  
  // Command routing and execution
  if (command in commands) {
    return commands[command](args);
  }
};
```

**MDN References:**
- [String Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- [Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Event Handling](https://developer.mozilla.org/en-US/docs/Web/Events)

#### 3. Firefox Component (`components/Firefox.tsx`)

**Purpose:** Simulates a web browser for displaying projects and content.

**Key Features:**
- **GitHub Integration:** Fetches and displays repositories
- **Window Management:** Full browser window simulation
- **Content Display:** Projects, certifications, and custom pages
- **Responsive Design:** Adapts to different screen sizes

**Technical Implementation:**
```typescript
// GitHub API integration with caching
const fetchGitHubRepos = async () => {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100&page=${page}`,
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Mozilla/5.0",
      },
    }
  );
};
```

**MDN References:**
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Async/Await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

## 🎨 Styling and Animations

### CSS Architecture

**Global Styles (`app/globals.css`):**
- **CSS Variables:** Custom properties for theming
- **Animations:** Keyframe animations for smooth transitions
- **Responsive Design:** Mobile-first approach with Tailwind CSS

**Key Animation Examples:**
```css
/* Smooth hover animations */
.desktop-icon {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
}

/* Multi-layer glow effects */
.desktop-icon:hover .icon-bg {
  box-shadow: 
    0 4px 12px rgba(96, 165, 250, 0.2),
    0 0 20px rgba(96, 165, 250, 0.3),
    0 0 30px rgba(96, 165, 250, 0.2),
    0 0 40px rgba(96, 165, 250, 0.1);
}
```

**MDN References:**
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- [CSS Transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)

### Tailwind CSS Integration

**Utility-First Approach:**
- **Responsive Classes:** Built-in responsive design utilities
- **Custom Configuration:** Extended with project-specific colors and animations
- **Performance:** Purged unused styles in production

**Example Usage:**
```jsx
<div className="bg-gray-900/60 backdrop-blur-sm border border-purple-500/30 shadow-lg">
  {/* Component content */}
</div>
```

**MDN References:**
- [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [CSS Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)
- [CSS Backdrop Filter](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)

## 🔧 State Management

### React Hooks Usage

**useState for Local State:**
```typescript
const [showTerminal, setShowTerminal] = useState(false);
const [currentUrl, setCurrentUrl] = useState(initialUrl);
const [repos, setRepos] = useState<GitHubRepo[]>([]);
```

**useEffect for Side Effects:**
```typescript
useEffect(() => {
  // Fetch GitHub repositories
  if (showProjects || currentUrl.includes("github.com")) {
    fetchGitHubRepos();
  }
}, [showProjects, currentUrl, fetchGitHubRepos]);
```

**useCallback for Performance:**
```typescript
const handleCommand = useCallback((cmd: string) => {
  // Command processing logic
}, [dependencies]);
```

**MDN References:**
- [React Hooks](https://react.dev/reference/react)
- [JavaScript Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- [Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)

## 🌐 API Integration

### GitHub API

**Repository Fetching:**
- **Pagination Support:** Handles large repository lists
- **Caching Strategy:** Local storage for performance
- **Error Handling:** Graceful fallbacks to sample data

**Rate Limiting:**
- **Respects Limits:** Implements proper rate limiting
- **Background Updates:** Non-blocking cache updates
- **User-Agent:** Proper identification for API requests

**MDN References:**
- [HTTP Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

## 📱 Responsive Design

### Mobile-First Approach

**Breakpoint Strategy:**
```css
/* Small screens (mobile) */
@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1280px) { /* Large screens */ }
```

**Flexible Layouts:**
- **CSS Grid:** For complex layouts
- **Flexbox:** For component alignment
- **Viewport Units:** For responsive sizing

**MDN References:**
- [Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries)
- [Viewport Meta Tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag)
- [CSS Units](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units)

## 🔒 Security Considerations

### Input Sanitization

**Command Processing:**
- **Input Validation:** Sanitizes user input
- **XSS Prevention:** Uses React's built-in protection
- **Content Security Policy:** Implements CSP headers

**MDN References:**
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [XSS Prevention](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting)
- [Input Validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)

## 🚀 Performance Optimization

### Code Splitting

**Dynamic Imports:**
```typescript
const Firefox = dynamic(() => import('./Firefox'), { ssr: false });
```

**Lazy Loading:**
- **Component-Level:** Individual components loaded on demand
- **Image Optimization:** Next.js Image component
- **Bundle Splitting:** Automatic code splitting

**MDN References:**
- [Dynamic Imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports)
- [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Web Performance](https://developer.mozilla.org/en-US/docs/Web/Performance)

## 🧪 Testing Strategy

### Component Testing

**Recommended Testing Libraries:**
- **Jest:** Unit testing framework
- **React Testing Library:** Component testing
- **Cypress:** End-to-end testing

**Testing Examples:**
```typescript
// Component test example
test('Terminal processes commands correctly', () => {
  render(<Terminal />);
  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'help' } });
  fireEvent.keyPress(input, { key: 'Enter', code: 'Enter' });
  expect(screen.getByText('Available Commands')).toBeInTheDocument();
});
```

**MDN References:**
- [JavaScript Testing](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_testing)
- [Web APIs Testing](https://developer.mozilla.org/en-US/docs/Web/API)
- [Browser Testing](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing)

## 📚 Additional Resources

### Learning Paths

1. **React Fundamentals:**
   - [React Documentation](https://react.dev/)
   - [React Hooks](https://react.dev/reference/react)

2. **Next.js Development:**
   - [Next.js Documentation](https://nextjs.org/docs)
   - [App Router Guide](https://nextjs.org/docs/app)

3. **CSS and Animations:**
   - [CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
   - [CSS Transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)

4. **JavaScript Modern Features:**
   - [ES6+ Features](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
   - [Async Programming](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous)

### Community Resources

- **GitHub Discussions:** Project-specific questions
- **Stack Overflow:** General programming questions
- **MDN Web Docs:** Comprehensive web development reference
- **React Community:** React-specific resources

---

This guide provides a comprehensive overview of the codebase architecture and implementation details. For specific questions or contributions, please refer to the project's GitHub repository or create an issue for discussion.
