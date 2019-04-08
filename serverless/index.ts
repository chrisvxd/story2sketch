import Story2sketch from "../src/server/Story2sketch";

export default async (
  url: string,
  symbolGutter?: number,
  stories?: string,
  viewports?: string,
  fixPseudo?: boolean,
  removePreviewMargin?: boolean
): Promise<string> => {
  const config = {
    url,
    symbolGutter,
    stories,
    viewports,
    fixPseudo,
    removePreviewMargin
  };

  const story2sketch = new Story2sketch(config as any);

  await story2sketch.init();

  return await story2sketch.execute();
};
