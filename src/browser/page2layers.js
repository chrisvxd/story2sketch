import {
  Page,
  SymbolMaster,
  nodeTreeToSketchGroup
} from "@brainly/html-sketchapp";

export const getSymbol = ({
  name = "symbol",
  x = 0,
  y = 0,
  querySelector = "*"
} = {}) => {
  let nodes;

  if (querySelector === "*") {
    nodes = document.querySelector("#root").firstChild;
  } else {
    nodes = document.querySelector(querySelector);
  }

  const layer = nodeTreeToSketchGroup(nodes);

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
