(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/components/MobileDetector.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>MobileDetector)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$device$2d$detect$2f$dist$2f$lib$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-device-detect/dist/lib.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
// Updated minimum required viewport dimensions
const MIN_WIDTH = 1291;
const MIN_HEIGHT = 713;
function useDeviceInfo() {
    _s();
    const [deviceInfo, setDeviceInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        isMobileDevice: false,
        isTabletDevice: false,
        isLandscape: true,
        viewportWidth: 0,
        viewportHeight: 0,
        browser: '',
        os: '',
        meetsRequirements: true,
        isPcOrLaptop: true
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useDeviceInfo.useEffect": ()=>{
            const updateDeviceInfo = {
                "useDeviceInfo.useEffect.updateDeviceInfo": ()=>{
                    const width = window.innerWidth;
                    const height = window.innerHeight;
                    const isLandscape = width > height;
                    // Detect if device is PC/Laptop based on OS and lack of mobile/tablet detection
                    const isPcOrLaptop = !__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$device$2d$detect$2f$dist$2f$lib$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMobile"] && !__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$device$2d$detect$2f$dist$2f$lib$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTablet"];
                    setDeviceInfo({
                        isMobileDevice: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$device$2d$detect$2f$dist$2f$lib$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMobile"] && !__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$device$2d$detect$2f$dist$2f$lib$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTablet"],
                        isTabletDevice: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$device$2d$detect$2f$dist$2f$lib$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTablet"],
                        isLandscape,
                        viewportWidth: width,
                        viewportHeight: height,
                        browser: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$device$2d$detect$2f$dist$2f$lib$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["browserName"],
                        os: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$device$2d$detect$2f$dist$2f$lib$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["osName"],
                        meetsRequirements: isPcOrLaptop || width >= MIN_WIDTH && height >= MIN_HEIGHT,
                        isPcOrLaptop
                    });
                }
            }["useDeviceInfo.useEffect.updateDeviceInfo"];
            // Initial check
            updateDeviceInfo();
            // Add event listeners for resize and orientation change
            window.addEventListener('resize', updateDeviceInfo);
            window.addEventListener('orientationchange', updateDeviceInfo);
            return ({
                "useDeviceInfo.useEffect": ()=>{
                    window.removeEventListener('resize', updateDeviceInfo);
                    window.removeEventListener('orientationchange', updateDeviceInfo);
                }
            })["useDeviceInfo.useEffect"];
        }
    }["useDeviceInfo.useEffect"], []);
    return deviceInfo;
}
_s(useDeviceInfo, "XC9rdBUbyXyJ7u4lLWVehe3Zs3o=");
function LoadingScreen({ onComplete }) {
    _s1();
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [loadingText, setLoadingText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Initializing Sriram's Portfolio");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LoadingScreen.useEffect": ()=>{
            const texts = [
                "Initializing Sriram's Portfolio",
                'Checking Device Compatibility',
                'Loading Resources',
                'Preparing Environment'
            ];
            let currentIndex = 0;
            const progressInterval = setInterval({
                "LoadingScreen.useEffect.progressInterval": ()=>{
                    setProgress({
                        "LoadingScreen.useEffect.progressInterval": (prev)=>{
                            const next = prev + 1;
                            if (next >= 100) {
                                clearInterval(progressInterval);
                                // Wait a moment then trigger completion
                                setTimeout({
                                    "LoadingScreen.useEffect.progressInterval": ()=>{
                                        onComplete();
                                    }
                                }["LoadingScreen.useEffect.progressInterval"], 500);
                            }
                            return next > 100 ? 100 : next;
                        }
                    }["LoadingScreen.useEffect.progressInterval"]);
                }
            }["LoadingScreen.useEffect.progressInterval"], 30);
            const textInterval = setInterval({
                "LoadingScreen.useEffect.textInterval": ()=>{
                    currentIndex = (currentIndex + 1) % texts.length;
                    setLoadingText(texts[currentIndex]);
                }
            }["LoadingScreen.useEffect.textInterval"], 2000);
            return ({
                "LoadingScreen.useEffect": ()=>{
                    clearInterval(progressInterval);
                    clearInterval(textInterval);
                }
            })["LoadingScreen.useEffect"];
        }
    }["LoadingScreen.useEffect"], [
        onComplete
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-slate-950 flex items-center justify-center cursor-none",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center relative w-64",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 bg-transparent"
                }, void 0, false, {
                    fileName: "[project]/components/MobileDetector.tsx",
                    lineNumber: 115,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-blue-400 text-sm animate-pulse mb-6",
                            children: loadingText
                        }, void 0, false, {
                            fileName: "[project]/components/MobileDetector.tsx",
                            lineNumber: 117,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative h-16 w-16 mx-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 border-r-2 border-l-2 border-transparent rounded-full animate-pulse"
                                    }, void 0, false, {
                                        fileName: "[project]/components/MobileDetector.tsx",
                                        lineNumber: 120,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/MobileDetector.tsx",
                                    lineNumber: 119,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-blue-400 text-sm font-mono",
                                        children: [
                                            progress,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/MobileDetector.tsx",
                                        lineNumber: 123,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/MobileDetector.tsx",
                                    lineNumber: 122,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/MobileDetector.tsx",
                            lineNumber: 118,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/MobileDetector.tsx",
                    lineNumber: 116,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/MobileDetector.tsx",
            lineNumber: 114,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/MobileDetector.tsx",
        lineNumber: 113,
        columnNumber: 5
    }, this);
}
_s1(LoadingScreen, "fOp1JcHqKqTFGt46xZyzbzg1tqM=");
_c = LoadingScreen;
function MobileWarning({ deviceInfo }) {
    _s2();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hovered, setHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MobileWarning.useEffect": ()=>{
            setMounted(true);
            const interval = setInterval({
                "MobileWarning.useEffect.interval": ()=>{
                    setHovered({
                        "MobileWarning.useEffect.interval": (prev)=>!prev
                    }["MobileWarning.useEffect.interval"]);
                }
            }["MobileWarning.useEffect.interval"], 3000);
            return ({
                "MobileWarning.useEffect": ()=>clearInterval(interval)
            })["MobileWarning.useEffect"];
        }
    }["MobileWarning.useEffect"], []);
    const getDeviceSpecificMessage = ()=>{
        if (deviceInfo.isTabletDevice && !deviceInfo.isLandscape) {
            return "Please rotate your tablet to landscape mode for the best experience.";
        }
        if (deviceInfo.viewportWidth < MIN_WIDTH || deviceInfo.viewportHeight < MIN_HEIGHT) {
            return `Your screen resolution (${deviceInfo.viewportWidth}x${deviceInfo.viewportHeight}) is below the recommended minimum of ${MIN_WIDTH}x${MIN_HEIGHT}.`;
        }
        return "This portfolio showcases interactive elements and complex animations that require a larger screen for the optimal experience.";
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-900 flex items-center justify-center px-4 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 overflow-hidden pointer-events-none",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 opacity-30",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-0 -left-10 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"
                        }, void 0, false, {
                            fileName: "[project]/components/MobileDetector.tsx",
                            lineNumber: 159,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-0 -right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"
                        }, void 0, false, {
                            fileName: "[project]/components/MobileDetector.tsx",
                            lineNumber: 160,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute -bottom-8 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"
                        }, void 0, false, {
                            fileName: "[project]/components/MobileDetector.tsx",
                            lineNumber: 161,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/MobileDetector.tsx",
                    lineNumber: 158,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/MobileDetector.tsx",
                lineNumber: 157,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `
          max-w-md w-full space-y-8 p-8 
          bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-2xl 
          border border-green-500/20 
          transform transition-all duration-700 
          hover:shadow-green-500/10 hover:border-green-500/30
          ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
        `,
                onMouseEnter: ()=>setHovered(true),
                onMouseLeave: ()=>setHovered(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-8 relative group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `
              absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 
              blur-xl rounded-full transform transition-all duration-500
              ${hovered ? 'scale-125 opacity-75' : 'scale-100 opacity-50'}
            `
                                }, void 0, false, {
                                    fileName: "[project]/components/MobileDetector.tsx",
                                    lineNumber: 181,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/favicon.ico",
                                    alt: "Logo",
                                    width: 64,
                                    height: 64,
                                    className: `
                mx-auto relative transform transition-all duration-500
                hover:scale-110 hover:rotate-3
                ${hovered ? 'rotate-6' : 'rotate-0'}
              `
                                }, void 0, false, {
                                    fileName: "[project]/components/MobileDetector.tsx",
                                    lineNumber: 186,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/MobileDetector.tsx",
                            lineNumber: 180,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: `
            text-3xl font-bold text-transparent bg-clip-text 
            bg-gradient-to-r from-green-400 to-blue-500 mb-2
            transform transition-all duration-500
            ${hovered ? 'scale-105' : 'scale-100'}
          `,
                            children: deviceInfo.isTabletDevice ? 'Rotate Device' : 'Desktop Experience Required'
                        }, void 0, false, {
                            fileName: "[project]/components/MobileDetector.tsx",
                            lineNumber: 200,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `
            h-1 w-24 mx-auto rounded-full mb-8 transition-all duration-500
            bg-gradient-to-r from-green-400 to-blue-500
            ${hovered ? 'w-32 opacity-100' : 'w-24 opacity-75'}
          `
                        }, void 0, false, {
                            fileName: "[project]/components/MobileDetector.tsx",
                            lineNumber: 209,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `
            space-y-6 transform transition-all duration-700 delay-300
            ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
          `,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-300 text-lg leading-relaxed",
                                    children: getDeviceSpecificMessage()
                                }, void 0, false, {
                                    fileName: "[project]/components/MobileDetector.tsx",
                                    lineNumber: 219,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `
              bg-gray-900/50 backdrop-blur-lg p-6 rounded-lg 
              border border-green-500/20 transition-all duration-500
              ${hovered ? 'border-green-500/40 shadow-lg' : ''}
            `,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-green-400 font-medium mb-4",
                                            children: "Your Device Information:"
                                        }, void 0, false, {
                                            fileName: "[project]/components/MobileDetector.tsx",
                                            lineNumber: 229,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "text-gray-300 space-y-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: "flex items-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-green-400 mr-2",
                                                            children: "•"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/MobileDetector.tsx",
                                                            lineNumber: 232,
                                                            columnNumber: 19
                                                        }, this),
                                                        "Device Type: ",
                                                        deviceInfo.isTabletDevice ? 'Tablet' : deviceInfo.isMobileDevice ? 'Mobile' : 'Desktop'
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/MobileDetector.tsx",
                                                    lineNumber: 231,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: "flex items-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-green-400 mr-2",
                                                            children: "•"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/MobileDetector.tsx",
                                                            lineNumber: 236,
                                                            columnNumber: 19
                                                        }, this),
                                                        "Browser: ",
                                                        deviceInfo.browser
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/MobileDetector.tsx",
                                                    lineNumber: 235,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: "flex items-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-green-400 mr-2",
                                                            children: "•"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/MobileDetector.tsx",
                                                            lineNumber: 240,
                                                            columnNumber: 19
                                                        }, this),
                                                        "OS: ",
                                                        deviceInfo.os
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/MobileDetector.tsx",
                                                    lineNumber: 239,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: "flex items-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-green-400 mr-2",
                                                            children: "•"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/MobileDetector.tsx",
                                                            lineNumber: 244,
                                                            columnNumber: 19
                                                        }, this),
                                                        "Resolution: ",
                                                        deviceInfo.viewportWidth,
                                                        "x",
                                                        deviceInfo.viewportHeight
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/MobileDetector.tsx",
                                                    lineNumber: 243,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: "flex items-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-green-400 mr-2",
                                                            children: "•"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/MobileDetector.tsx",
                                                            lineNumber: 248,
                                                            columnNumber: 19
                                                        }, this),
                                                        "Orientation: ",
                                                        deviceInfo.isLandscape ? 'Landscape' : 'Portrait'
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/MobileDetector.tsx",
                                                    lineNumber: 247,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/MobileDetector.tsx",
                                            lineNumber: 230,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/MobileDetector.tsx",
                                    lineNumber: 224,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `
              text-gray-400 text-sm border-t border-gray-700/50 pt-6
              transform transition-all duration-500
              ${hovered ? 'border-gray-600/50' : ''}
            `,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "flex items-center justify-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: `
                    w-4 h-4 mr-2 transition-all duration-500
                    ${hovered ? 'rotate-180 scale-110' : ''}
                  `,
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: "2",
                                                    d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/MobileDetector.tsx",
                                                    lineNumber: 270,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/MobileDetector.tsx",
                                                lineNumber: 261,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `
                  transition-all duration-500
                  ${hovered ? 'text-green-400' : ''}
                `,
                                                children: [
                                                    "Minimum Resolution: ",
                                                    MIN_WIDTH,
                                                    "x",
                                                    MIN_HEIGHT
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/MobileDetector.tsx",
                                                lineNumber: 277,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/MobileDetector.tsx",
                                        lineNumber: 260,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/MobileDetector.tsx",
                                    lineNumber: 255,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/MobileDetector.tsx",
                            lineNumber: 215,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/MobileDetector.tsx",
                    lineNumber: 178,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/MobileDetector.tsx",
                lineNumber: 165,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/MobileDetector.tsx",
        lineNumber: 155,
        columnNumber: 5
    }, this);
}
_s2(MobileWarning, "HUAPR9Vn3NYgRv+3tqJ7sO6eVtA=");
_c1 = MobileWarning;
function MobileDetector({ children }) {
    _s3();
    const [isClient, setIsClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showContent, setShowContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const deviceInfo = useDeviceInfo();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MobileDetector.useEffect": ()=>{
            setIsClient(true);
        }
    }["MobileDetector.useEffect"], []);
    const handleLoadingComplete = ()=>{
        setIsLoading(false);
        // Add a small delay for the fade animation
        setTimeout(()=>{
            setShowContent(true);
        }, 100);
    };
    if (!isClient || isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LoadingScreen, {
            onComplete: handleLoadingComplete
        }, void 0, false, {
            fileName: "[project]/components/MobileDetector.tsx",
            lineNumber: 311,
            columnNumber: 12
        }, this);
    }
    // Show warning if:
    // 1. Device is mobile
    // 2. Device is tablet in portrait mode
    // 3. Viewport is too small (only for non-PC devices)
    const shouldShowWarning = !deviceInfo.isPcOrLaptop && (deviceInfo.isMobileDevice || deviceInfo.isTabletDevice && !deviceInfo.isLandscape || !deviceInfo.meetsRequirements);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-de9295425a45175d" + " " + `transition-opacity duration-1000 bg-black ${showContent ? 'opacity-100' : 'opacity-0'}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "de9295425a45175d",
                children: "*,html,body,button,a,input,textarea,select,[role=button],[tabindex],input[type=text],input[type=email],textarea,.terminal-output,.command-input-form input{cursor:none!important}"
            }, void 0, false, void 0, this),
            shouldShowWarning ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileWarning, {
                deviceInfo: deviceInfo
            }, void 0, false, {
                fileName: "[project]/components/MobileDetector.tsx",
                lineNumber: 347,
                columnNumber: 28
            }, this) : children
        ]
    }, void 0, true, {
        fileName: "[project]/components/MobileDetector.tsx",
        lineNumber: 326,
        columnNumber: 5
    }, this);
}
_s3(MobileDetector, "Q4zUQk1QU2bnB4/7EetRf00HApM=", false, function() {
    return [
        useDeviceInfo
    ];
});
_c2 = MobileDetector;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "LoadingScreen");
__turbopack_context__.k.register(_c1, "MobileWarning");
__turbopack_context__.k.register(_c2, "MobileDetector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/NewCustomCursor.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
// Kali Linux inspired colors
const CURSOR_COLORS = {
    primary: "#60a5fa",
    secondary: "#1F1E35",
    accent: "#A3C4F3"
};
// Cursor sizes
const CURSOR_SIZES = {
    dot: 5,
    follower: 20,
    ring: 26,
    glow: 82
};
// Follow speed factors
const FOLLOW_SPEED = {
    cursor: 0.1,
    follower: 0.2,
    ring: 0.3,
    glow: 0.4
};
const MIN_VIEWPORT_WIDTH = 1024;
const NewCustomCursor = ()=>{
    _s();
    const cursorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const followerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const glowRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const ringRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLargeViewport, setIsLargeViewport] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const targetPos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    const animationRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NewCustomCursor.useEffect": ()=>{
            const checkViewportSize = {
                "NewCustomCursor.useEffect.checkViewportSize": ()=>{
                    setIsLargeViewport(window.innerWidth >= MIN_VIEWPORT_WIDTH);
                }
            }["NewCustomCursor.useEffect.checkViewportSize"];
            checkViewportSize();
            window.addEventListener("resize", checkViewportSize);
            return ({
                "NewCustomCursor.useEffect": ()=>{
                    window.removeEventListener("resize", checkViewportSize);
                }
            })["NewCustomCursor.useEffect"];
        }
    }["NewCustomCursor.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NewCustomCursor.useEffect": ()=>{
            if (!isLargeViewport) {
                const existingStyle = document.querySelector("style[data-custom-cursor]");
                if (existingStyle) {
                    existingStyle.remove();
                }
                return;
            }
            if (!cursorRef.current || !followerRef.current || !glowRef.current || !ringRef.current) return;
            const cursor = cursorRef.current;
            const follower = followerRef.current;
            const glow = glowRef.current;
            const ring = ringRef.current;
            const style = document.createElement("style");
            style.setAttribute("data-custom-cursor", "true");
            style.innerHTML = `
      @media (min-width: ${MIN_VIEWPORT_WIDTH}px) {
        * {
          cursor: none !important;
        }
      }
    `;
            document.head.appendChild(style);
            const initialX = window.innerWidth / 2;
            const initialY = window.innerHeight / 2;
            targetPos.current = {
                x: initialX,
                y: initialY
            };
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set([
                cursor,
                follower,
                ring,
                glow
            ], {
                x: initialX,
                y: initialY
            });
            animationRef.current = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].timeline({
                repeat: -1,
                onUpdate: {
                    "NewCustomCursor.useEffect": ()=>{
                        if (!cursor || !follower || !ring || !glow) return;
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(cursor, {
                            x: targetPos.current.x,
                            y: targetPos.current.y,
                            duration: FOLLOW_SPEED.cursor,
                            ease: "power1.out",
                            overwrite: "auto"
                        });
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(follower, {
                            x: targetPos.current.x,
                            y: targetPos.current.y,
                            duration: FOLLOW_SPEED.follower,
                            ease: "power2.out",
                            overwrite: "auto"
                        });
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(ring, {
                            x: targetPos.current.x,
                            y: targetPos.current.y,
                            duration: FOLLOW_SPEED.ring,
                            ease: "power2.out",
                            overwrite: "auto"
                        });
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(glow, {
                            x: targetPos.current.x,
                            y: targetPos.current.y,
                            duration: FOLLOW_SPEED.glow,
                            ease: "power3.out",
                            overwrite: "auto"
                        });
                    }
                }["NewCustomCursor.useEffect"]
            });
            const onMouseMove = {
                "NewCustomCursor.useEffect.onMouseMove": (e)=>{
                    targetPos.current = {
                        x: e.clientX,
                        y: e.clientY
                    };
                }
            }["NewCustomCursor.useEffect.onMouseMove"];
            const onMouseEnter = {
                "NewCustomCursor.useEffect.onMouseEnter": ()=>setIsVisible(true)
            }["NewCustomCursor.useEffect.onMouseEnter"];
            const onMouseLeave = {
                "NewCustomCursor.useEffect.onMouseLeave": ()=>setIsVisible(false)
            }["NewCustomCursor.useEffect.onMouseLeave"];
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseenter", onMouseEnter);
            document.addEventListener("mouseleave", onMouseLeave);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(ring, {
                rotation: 360,
                duration: 20,
                ease: "none",
                repeat: -1
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(cursor, {
                scale: 1.2,
                duration: 2,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(glow, {
                opacity: 0.6,
                duration: 3,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true
            });
            setIsVisible(true);
            return ({
                "NewCustomCursor.useEffect": ()=>{
                    if (animationRef.current) animationRef.current.kill();
                    document.removeEventListener("mousemove", onMouseMove);
                    document.removeEventListener("mouseenter", onMouseEnter);
                    document.removeEventListener("mouseleave", onMouseLeave);
                    const existingStyle = document.querySelector("style[data-custom-cursor]");
                    if (existingStyle) existingStyle.remove();
                }
            })["NewCustomCursor.useEffect"];
        }
    }["NewCustomCursor.useEffect"], [
        isLargeViewport
    ]);
    if (!isLargeViewport) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: cursorRef,
                className: `fixed rounded-full pointer-events-none z-[9999] mix-blend-difference ${isVisible ? "opacity-100" : "opacity-0"}`,
                style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: `${CURSOR_SIZES.dot}px`,
                    height: `${CURSOR_SIZES.dot}px`,
                    backgroundColor: CURSOR_COLORS.primary,
                    boxShadow: `0 0 5px ${CURSOR_COLORS.primary}`,
                    transition: "opacity 0.3s ease",
                    transform: "translate(-50%, -50%)"
                }
            }, void 0, false, {
                fileName: "[project]/components/NewCustomCursor.tsx",
                lineNumber: 191,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: followerRef,
                className: `fixed border-2 rounded-full pointer-events-none z-[9998] mix-blend-difference ${isVisible ? "opacity-100" : "opacity-0"}`,
                style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: `${CURSOR_SIZES.follower}px`,
                    height: `${CURSOR_SIZES.follower}px`,
                    borderColor: CURSOR_COLORS.secondary,
                    backdropFilter: "blur(1px)",
                    transition: "opacity 0.3s ease",
                    transform: "translate(-50%, -50%)"
                }
            }, void 0, false, {
                fileName: "[project]/components/NewCustomCursor.tsx",
                lineNumber: 210,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: ringRef,
                className: `fixed border rounded-full pointer-events-none z-[9997] ${isVisible ? "opacity-100" : "opacity-0"}`,
                style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: `${CURSOR_SIZES.ring}px`,
                    height: `${CURSOR_SIZES.ring}px`,
                    borderColor: `rgba(${hexToRgb(CURSOR_COLORS.secondary)}, 0.3)`,
                    backdropFilter: "blur(1px)",
                    transition: "opacity 0.3s ease",
                    transform: "translate(-50%, -50%)"
                }
            }, void 0, false, {
                fileName: "[project]/components/NewCustomCursor.tsx",
                lineNumber: 229,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: glowRef,
                className: `fixed rounded-full pointer-events-none z-[9996] ${isVisible ? "opacity-40" : "opacity-0"}`,
                style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: `${CURSOR_SIZES.glow}px`,
                    height: `${CURSOR_SIZES.glow}px`,
                    background: `radial-gradient(circle, rgba(${hexToRgb(CURSOR_COLORS.accent)}, 0.4) 0%, rgba(${hexToRgb(CURSOR_COLORS.accent)}, 0.1) 50%, rgba(${hexToRgb(CURSOR_COLORS.accent)}, 0) 70%)`,
                    filter: "blur(8px)",
                    transition: "opacity 0.3s ease",
                    transform: "translate(-50%, -50%)"
                }
            }, void 0, false, {
                fileName: "[project]/components/NewCustomCursor.tsx",
                lineNumber: 248,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
};
_s(NewCustomCursor, "ipv5k5nZsGa6R9tuQMv5TaB6jdg=");
_c = NewCustomCursor;
// Helper function to convert hex to RGB
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : "0, 0, 0";
}
const __TURBOPACK__default__export__ = NewCustomCursor;
var _c;
__turbopack_context__.k.register(_c, "NewCustomCursor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/CustomAlert.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const CustomAlert = ({ message, isVisible, onClose, type })=>{
    _s();
    const alertRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const overlayRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const iconRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CustomAlert.useEffect": ()=>{
            if (isVisible) {
                // Initial state
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(alertRef.current, {
                    scale: 0.8,
                    opacity: 0,
                    y: -50,
                    rotation: -5
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(overlayRef.current, {
                    opacity: 0
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(iconRef.current, {
                    scale: 0,
                    rotation: -180
                });
                // Animate in
                const tl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].timeline();
                tl.to(overlayRef.current, {
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out"
                }).to(alertRef.current, {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    rotation: 0,
                    duration: 0.5,
                    ease: "back.out(1.7)"
                }).to(iconRef.current, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.5)"
                });
            }
        }
    }["CustomAlert.useEffect"], [
        isVisible
    ]);
    const handleClose = ()=>{
        // Animate out
        const tl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].timeline({
            onComplete: onClose
        });
        tl.to(iconRef.current, {
            scale: 0,
            rotation: 180,
            duration: 0.3,
            ease: "power2.in"
        }).to(alertRef.current, {
            scale: 0.8,
            opacity: 0,
            y: -50,
            rotation: 5,
            duration: 0.3,
            ease: "power2.in"
        }, "-=0.2").to(overlayRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in"
        }, "-=0.2");
    };
    const getIcon = ()=>{
        switch(type){
            case 'right-click':
                return '🖱️';
            case 'dev-tools':
                return '🔧';
            case 'inspect':
                return '🔍';
            default:
                return '⚠️';
        }
    };
    if (!isVisible) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: overlayRef,
                className: "fixed inset-0 bg-blue-900/50 backdrop-blur-sm z-50",
                onClick: handleClose
            }, void 0, false, {
                fileName: "[project]/components/CustomAlert.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: alertRef,
                className: "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 dark:bg-slate-900/90 rounded-lg shadow-xl p-6 max-w-md w-full z-50 border border-blue-500/30 shadow-blue-500/20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        ref: iconRef,
                                        className: "text-2xl text-blue-500",
                                        children: getIcon()
                                    }, void 0, false, {
                                        fileName: "[project]/components/CustomAlert.tsx",
                                        lineNumber: 110,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-blue-700 dark:text-blue-300",
                                        children: "Inspection Disabled"
                                    }, void 0, false, {
                                        fileName: "[project]/components/CustomAlert.tsx",
                                        lineNumber: 116,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CustomAlert.tsx",
                                lineNumber: 109,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleClose,
                                className: "text-blue-500 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-200 transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-5 h-5",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M6 18L18 6M6 6l12 12"
                                    }, void 0, false, {
                                        fileName: "[project]/components/CustomAlert.tsx",
                                        lineNumber: 125,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/CustomAlert.tsx",
                                    lineNumber: 124,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/CustomAlert.tsx",
                                lineNumber: 120,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CustomAlert.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-blue-700 dark:text-blue-200 mb-4 pl-12",
                        children: message
                    }, void 0, false, {
                        fileName: "[project]/components/CustomAlert.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-end gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleClose,
                                className: "px-4 py-2 bg-blue-500/10 border border-blue-400/30 text-blue-700 dark:text-blue-200 rounded-md hover:bg-blue-500/20 transition-colors",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/components/CustomAlert.tsx",
                                lineNumber: 133,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleClose,
                                className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors",
                                children: "I Understand"
                            }, void 0, false, {
                                fileName: "[project]/components/CustomAlert.tsx",
                                lineNumber: 139,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CustomAlert.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/CustomAlert.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
};
_s(CustomAlert, "DPcbTUIfSw8nMd5zXD+wsHoxIbM=");
_c = CustomAlert;
const __TURBOPACK__default__export__ = CustomAlert;
var _c;
__turbopack_context__.k.register(_c, "CustomAlert");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/InspectionPrevention.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CustomAlert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/CustomAlert.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const InspectionPrevention = ()=>{
    _s();
    const [showAlert, setShowAlert] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [alertMessage, setAlertMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [alertType, setAlertType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('inspect');
    const [attemptCount, setAttemptCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // Function to show custom alert with rate limiting
    const showCustomAlert = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "InspectionPrevention.useCallback[showCustomAlert]": (message, type)=>{
            setAlertType(type);
            setAlertMessage(message);
            setShowAlert(true);
            setAttemptCount({
                "InspectionPrevention.useCallback[showCustomAlert]": (prev)=>prev + 1
            }["InspectionPrevention.useCallback[showCustomAlert]"]);
        }
    }["InspectionPrevention.useCallback[showCustomAlert]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "InspectionPrevention.useEffect": ()=>{
            let devToolsOpen = false;
            // Function to detect dev tools
            const detectDevTools = {
                "InspectionPrevention.useEffect.detectDevTools": ()=>{
                    const threshold = 160;
                    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
                    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
                    if (widthThreshold || heightThreshold) {
                        if (!devToolsOpen) {
                            devToolsOpen = true;
                            showCustomAlert('Developer tools are disabled on this website. Please respect our terms of use.', 'dev-tools');
                        }
                    } else {
                        devToolsOpen = false;
                    }
                }
            }["InspectionPrevention.useEffect.detectDevTools"];
            // Disable right-click
            const handleContextMenu = {
                "InspectionPrevention.useEffect.handleContextMenu": (e)=>{
                    e.preventDefault();
                    showCustomAlert('Right-click is disabled on this website. Please respect our terms of use.', 'right-click');
                }
            }["InspectionPrevention.useEffect.handleContextMenu"];
            // Disable keyboard shortcuts for developer tools
            const handleKeyDown = {
                "InspectionPrevention.useEffect.handleKeyDown": (e)=>{
                    // Check for common dev tools shortcuts
                    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c') || e.key === 'F12' || e.metaKey && e.altKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
                        e.preventDefault();
                        showCustomAlert('Developer tools are disabled on this website. Please respect our terms of use.', 'dev-tools');
                    }
                }
            }["InspectionPrevention.useEffect.handleKeyDown"];
            // Detect element inspection
            const handleMouseOver = {
                "InspectionPrevention.useEffect.handleMouseOver": (e)=>{
                    if (e.target instanceof HTMLElement) {
                        const computedStyle = window.getComputedStyle(e.target);
                        if (computedStyle.position === 'fixed' && computedStyle.zIndex === '9999') {
                            showCustomAlert('Element inspection is disabled on this website. Please respect our terms of use.', 'inspect');
                        }
                    }
                }
            }["InspectionPrevention.useEffect.handleMouseOver"];
            // Add console warning
            console.warn('Inspection is disabled on this website. Please respect our terms of use.');
            // Add event listeners
            document.addEventListener('contextmenu', handleContextMenu);
            document.addEventListener('keydown', handleKeyDown);
            document.addEventListener('mouseover', handleMouseOver);
            window.addEventListener('resize', detectDevTools);
            // Initial check
            detectDevTools();
            // Cleanup function
            return ({
                "InspectionPrevention.useEffect": ()=>{
                    document.removeEventListener('contextmenu', handleContextMenu);
                    document.removeEventListener('keydown', handleKeyDown);
                    document.removeEventListener('mouseover', handleMouseOver);
                    window.removeEventListener('resize', detectDevTools);
                }
            })["InspectionPrevention.useEffect"];
        }
    }["InspectionPrevention.useEffect"], [
        showCustomAlert
    ]);
    // Handle multiple attempts
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "InspectionPrevention.useEffect": ()=>{
            if (attemptCount > 3) {
                const message = 'Multiple inspection attempts detected. Please note that this behavior may be logged.';
                showCustomAlert(message, 'inspect');
            }
        }
    }["InspectionPrevention.useEffect"], [
        attemptCount,
        showCustomAlert
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CustomAlert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        message: alertMessage,
        isVisible: showAlert,
        onClose: ()=>setShowAlert(false),
        type: alertType
    }, void 0, false, {
        fileName: "[project]/components/InspectionPrevention.tsx",
        lineNumber: 110,
        columnNumber: 5
    }, this);
};
_s(InspectionPrevention, "L2MC9/7AwLrfpTTtVedYvS48Z4A=");
_c = InspectionPrevention;
const __TURBOPACK__default__export__ = InspectionPrevention;
var _c;
__turbopack_context__.k.register(_c, "InspectionPrevention");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=components_5b62cde1._.js.map