import {
  Page,
  SymbolMaster,
  nodeTreeToSketchGroup
} from "@brainly/html-sketchapp";

const getNodeName = node =>
  node.id || node.className || node.nodeName.toLowerCase();

export const getSymbol = ({
  name = "symbol",
  x = 0,
  y = 0,
  querySelector = "#root"
} = {}) => {
  let nodes;

  if (querySelector === "#root") {
    nodes = document.querySelector(querySelector).firstChild;
  } else {
    nodes = document.querySelector(querySelector);
  }

  if (!nodes) {
    return null;
  }

  const layer = nodeTreeToSketchGroup(nodes, {
    getGroupName: getNodeName,
    getRectangleName: getNodeName
  });

  const symbol = new SymbolMaster({ x, y });

  symbol.setName(name);
  symbol.addLayer(layer);

  return symbol.toJSON();
};

export const getPage = ({ title, width, height }) => {
  const page = new Page({
    width,
    height
  });

  page.setName(title);

  return page.toJSON();
};
