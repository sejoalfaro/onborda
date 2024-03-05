"use client";
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var OnbordaContext_1 = require("./OnbordaContext");
var framer_motion_1 = require("framer-motion");
var Onborda = function (_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    var children = _a.children, steps = _a.steps, _m = _a.showOnborda, showOnborda = _m === void 0 ? false : _m, // Default to false
    _o = _a.shadowRgb, // Default to false
    shadowRgb = _o === void 0 ? "0, 0, 0" : _o, _p = _a.shadowOpacity, shadowOpacity = _p === void 0 ? "0.2" : _p;
    var _q = (0, OnbordaContext_1.useOnborda)(), currentStep = _q.currentStep, setCurrentStep = _q.setCurrentStep, isOnbordaVisible = _q.isOnbordaVisible;
    var _r = (0, react_1.useState)(null), pointerPosition = _r[0], setPointerPosition = _r[1];
    var currentElementRef = (0, react_1.useRef)(null);
    // - -
    // Helper function to get element position
    var getElementPosition = function (element) {
        var _a = element.getBoundingClientRect(), top = _a.top, left = _a.left, width = _a.width, height = _a.height;
        var scrollTop = window.scrollY || document.documentElement.scrollTop;
        var scrollLeft = window.scrollX || document.documentElement.scrollLeft;
        return {
            x: left + scrollLeft,
            y: top + scrollTop,
            width: width,
            height: height,
        };
    };
    // - -
    // Initialize and update step positioning
    (0, react_1.useEffect)(function () {
        if (steps.length > 0) {
            var firstStepElement = document.querySelector(steps[0].selector);
            if (firstStepElement) {
                var position = getElementPosition(firstStepElement);
                setPointerPosition(position);
            }
        }
    }, [steps]); // Dependency on steps ensures this runs once after initial render
    // - -
    // Update pointerPosition when currentStep changes
    (0, react_1.useEffect)(function () {
        var step = steps[currentStep];
        if (step) {
            var element = document.querySelector(step.selector);
            if (element) {
                setPointerPosition(getElementPosition(element));
            }
        }
    }, [currentStep, steps]); // Reacting to currentStep changes
    // - -
    // Update pointerPosition for currentStep changes or window resize
    var updatePointerPosition = function () {
        var step = steps[currentStep];
        if (step) {
            var element = document.querySelector(step.selector);
            if (element) {
                setPointerPosition(getElementPosition(element));
                currentElementRef.current = element;
            }
        }
    };
    // - -
    // Update pointer position on window resize
    (0, react_1.useEffect)(function () {
        updatePointerPosition();
        // Add window resize listener
        window.addEventListener("resize", updatePointerPosition);
        return function () {
            // Cleanup resize listener
            window.removeEventListener("resize", updatePointerPosition);
        };
    }, [currentStep, steps]);
    // - -
    // Step Controls
    var nextStep = function () {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };
    var prevStep = function () {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };
    // - -
    // Card Side
    var getCardStyle = function (side) {
        switch (side) {
            case "top":
                return {
                    transform: "translate(-50%, 0)",
                    left: "50%",
                    bottom: "100%",
                    marginBottom: "25px",
                };
            case "bottom":
                return {
                    transform: "translate(-50%, 0)",
                    left: "50%",
                    top: "100%",
                    marginTop: "25px",
                };
            case "left":
                return {
                    transform: "translate(0, -50%)",
                    right: "100%",
                    top: "50%",
                    marginRight: "25px",
                };
            case "right":
                return {
                    transform: "translate(0, -50%)",
                    left: "100%",
                    top: "50%",
                    marginLeft: "25px",
                };
            default:
                return {}; // Default case if no side is specified
        }
    };
    // - -
    // Arrow position based on card side
    var getArrowStyle = function (side) {
        switch (side) {
            case "bottom":
                return {
                    transform: "translate(-50%, 0) rotate(45deg)",
                    left: "50%",
                    top: "-10px",
                };
            case "top":
                return {
                    transform: "translate(-50%, 0) rotate(45deg)",
                    left: "50%",
                    bottom: "-10px",
                };
            case "right":
                return {
                    transform: "translate(0, -50%) rotate(45deg)",
                    top: "50%",
                    left: "-10px",
                };
            case "left":
                return {
                    transform: "translate(0, -50%) rotate(45deg)",
                    top: "50%",
                    right: "-10px",
                };
            default:
                return {}; // Default case if no side is specified
        }
    };
    // - -
    // Overlay Variants
    var variants = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
    };
    // - -
    // Pointer Options
    var pointerPadding = (_c = (_b = steps[currentStep]) === null || _b === void 0 ? void 0 : _b.pointerPadding) !== null && _c !== void 0 ? _c : 30;
    var pointerPadOffset = pointerPadding / 2;
    var pointerRadius = (_e = (_d = steps[currentStep]) === null || _d === void 0 ? void 0 : _d.pointerRadius) !== null && _e !== void 0 ? _e : 28;
    return (react_1.default.createElement("div", { "data-name": "onborda-wrapper", className: "relative w-full" },
        react_1.default.createElement("div", { "data-name": "onborda-site", className: "relative block w-full" }, children),
        pointerPosition && showOnborda && (react_1.default.createElement(framer_motion_1.motion.div, { "data-name": "onborda-overlay", className: "fixed inset-0 z-[995] pointer-events-none", initial: "hidden", animate: isOnbordaVisible ? "visible" : "hidden", variants: variants, transition: { duration: 0.5 } },
            react_1.default.createElement(framer_motion_1.motion.div, { "data-name": "onborda-pointer", className: "relative z-[999]", style: {
                    boxShadow: "0 0 200vw 200vh rgba(".concat(shadowRgb, ", ").concat(shadowOpacity, ")"),
                    borderRadius: "".concat(pointerRadius, "px ").concat(pointerRadius, "px ").concat(pointerRadius, "px ").concat(pointerRadius, "px"),
                }, initial: pointerPosition
                    ? {
                        x: pointerPosition.x - pointerPadOffset,
                        y: pointerPosition.y - pointerPadOffset,
                        width: pointerPosition.width + pointerPadding,
                        height: pointerPosition.height + pointerPadding,
                    }
                    : {}, animate: pointerPosition
                    ? {
                        x: pointerPosition.x - pointerPadOffset,
                        y: pointerPosition.y - pointerPadOffset,
                        width: pointerPosition.width + pointerPadding,
                        height: pointerPosition.height + pointerPadding,
                    }
                    : {}, transition: { ease: "anticipate", duration: 0.6 } },
                react_1.default.createElement("div", { className: "absolute flex flex-col w-[400px] p-8 text-black transition-all bg-white shadow-lg rounded-20 min-w-min pointer-events-auto", "data-name": "onborda-card", style: getCardStyle((_f = steps[currentStep]) === null || _f === void 0 ? void 0 : _f.side) },
                    react_1.default.createElement("div", { "data-name": "onborda-arrow", className: "absolute w-5 h-5 origin-center bg-white", style: getArrowStyle((_g = steps[currentStep]) === null || _g === void 0 ? void 0 : _g.side) }),
                    react_1.default.createElement("div", { className: "flex items-center justify-between gap-5 mb-4" },
                        react_1.default.createElement("h2", { className: "text-xl leading-[25px] font-bold" }, (_h = steps[currentStep]) === null || _h === void 0 ? void 0 :
                            _h.icon,
                            " ", (_j = steps[currentStep]) === null || _j === void 0 ? void 0 :
                            _j.title),
                        react_1.default.createElement("div", { className: "text-utility140 text-[15px] font-semibold" },
                            currentStep + 1,
                            " of ",
                            steps.length)),
                    react_1.default.createElement("div", { "data-name": "onborda-stepper", className: "flex w-full gap-1 mb-8" }, steps.map(function (_, index) { return (react_1.default.createElement("span", { key: index, "data-name": "onborda-step", className: "self-stretch w-full h-1 rounded-xl ".concat(index === currentStep ? "bg-primary1" : "bg-utility140") })); })),
                    react_1.default.createElement("div", { className: "text-[15px]" }, (_k = steps[currentStep]) === null || _k === void 0 ? void 0 : _k.content),
                    ((_l = steps[currentStep]) === null || _l === void 0 ? void 0 : _l.showControls) && (react_1.default.createElement("div", { className: "flex items-center w-full gap-4" },
                        react_1.default.createElement("button", { "data-control": "prev", onClick: prevStep }, "prev"),
                        react_1.default.createElement("button", { "data-control": "next", onClick: nextStep }, "next")))))))));
};
exports.default = Onborda;