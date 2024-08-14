import { useMemo } from "react";
import { renderToString } from 'react-dom/server';
import { graphiteEnabledFeatures } from "font-detect-rhl";

export default function FontFeatureDefaults(FontFeatureDefaultsProps) {
  const {
    featureFont,
  } = FontFeatureDefaultsProps;

  // This creates an array of font settings names and default values
  const fontSettingsJsx = useMemo(() => graphiteEnabledFeatures.filter((name) => name?.name === featureFont).map((font, fontIndex) => (
    <div key={fontIndex}>
      {font.categories.map((categories, categoriesIndex) => {
        return (<div key={categoriesIndex}>
          {font.categories[categoriesIndex].category.map((category, categoryIndex) => {
            return (<div key={categoryIndex}>
              {category.sets.map((sets, setsIndex) => {
                return (<div key={setsIndex}>
                  {category.sets[setsIndex].set.map((set, setIndex) => {
                      return (<div key={setIndex}>
                        [~name~: ~{set.name}~, ~value~: {set.default}],
                      </div>)
                    })}
                </div>)
              })}
            </div>)
          })}
      </div>)
      })}
    </div>
  )), [featureFont]);
  // convert jsx return to string and remove html tags and attributes (e.g., div's)
  const fontSettingsStr = renderToString(fontSettingsJsx).replace(/(<([^>]+)>)/ig, '');
  // remove the last comma, change [] to {} and ~ to " and convert string to an array of objects
  const fontSettingsAdj = '[' + fontSettingsStr.substring(0, fontSettingsStr.length - 1).replace(/\[/gm, "{").replace(/\]/gm, "}").replace(/~/gm, '"') + ']';
  
  return JSON.parse(fontSettingsAdj);
}