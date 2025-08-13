(function() {
  // Store the original console.warn
  const originalWarn = console.warn;
  
  // Override console.warn to filter out preload warnings
  console.warn = function(...args) {
    // Check if this is a preload warning
    if (args.length > 0 && 
        typeof args[0] === 'string' && 
        (args[0].includes('preloaded using link preload but not used') || 
         args[0].includes('was preloaded using link preload but not used'))) {
      // Ignore the warning
      return;
    }
    
    // Pass through other warnings
    return originalWarn.apply(console, args);
  };
})(); 