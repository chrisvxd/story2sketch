import React from "react";

import { storiesOf } from "@storybook/react";

storiesOf("basic", module)
  .add("with text", () => <div>Hello, world!</div>)
  .add("with pseudo element", () => (
    <div>
      <style
        dangerouslySetInnerHTML={{
          __html: [
            ".my-div:after {",
            '  content: "🤖";',
            "  position: absolute",
            "}"
          ].join("\n")
        }}
      />
      <div className="my-div">Hello, world!</div>
    </div>
  ));
