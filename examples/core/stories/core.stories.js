import React from "react";
import { storiesOf } from "@storybook/react";

storiesOf("basic", module)
  .add("with text", () => (
    <div className="my-div" style={{ background: "hotpink", padding: 4 }}>
      <div
        className="my-div-inner"
        style={{ background: "lightgray", padding: 4 }}
      >
        Hello, world!
      </div>
    </div>
  ))
  .add("with pseudo element", () => (
    <div className="my-div" style={{ background: "hotpink", padding: 4 }}>
      <style
        dangerouslySetInnerHTML={{
          __html: [
            ".my-div-inner:after {",
            '  content: "🤖";',
            "  position: absolute",
            "}"
          ].join("\n")
        }}
      />
      <div
        className="my-div-inner"
        style={{ background: "lightgray", padding: 4 }}
      >
        Hello, world!
      </div>
    </div>
  ));

storiesOf("advanced", module).add("with text", () => (
  <div>Advanced hello, world!</div>
));

storiesOf("extra", module).add("with text", () => (
  <div>Extra hello, world!</div>
));
