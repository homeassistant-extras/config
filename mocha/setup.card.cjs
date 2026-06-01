const { JSDOM } = require("jsdom");

const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>", {
  url: "http://localhost",
  pretendToBeVisual: true,
});

globalThis.window = dom.window;
globalThis.Node = dom.window.Node;
globalThis.document = dom.window.document;
globalThis.HTMLElement = dom.window.HTMLElement;
globalThis.customElements = dom.window.customElements;
globalThis.dispatchEvent = dom.window.dispatchEvent.bind(dom.window);
globalThis.requestAnimationFrame = (callback) => setTimeout(callback, 0);

globalThis.window.matchMedia =
  globalThis.window.matchMedia ||
  (() => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
    media: "",
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }));

// Chai must initialize before this; its PluginEvent is not a jsdom Event.
require("chai");
globalThis.Event = dom.window.Event;
