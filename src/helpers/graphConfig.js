export const graphConfig = {
  nodeHighlightBehavior: true,
  automaticRearrangeAfterDropNode: false,
  directed: true,
  linkHighlightBehavior: true,
  maxZoom: 12,
  minZoom: 0.05,
  staticGraph: false,
  collapsible: false,
  d3: {
    alphaTarget: 0.05,
    gravity: -250,
    linkLength: 120,
    linkStrength: 2,
  },
  node: {
    color: "#1890ff",
    highlightStrokeColor: "#141414",
    fontSize: 12,
    highlightFontSize: 16,
    size: 300,
    highlightColor: "#f91529",
    highlightFontWeight: "bold",
    highlightStrokeWidth: 1.5,
    labelProperty: (n) => `${n.id} - ${n.name}`,
    viewGenerator: null,
  },
  link: {
    color: "lightgray",
    opacity: 1,
    semanticStrokeWidth: true,
    strokeWidth: 3,
  },
};
