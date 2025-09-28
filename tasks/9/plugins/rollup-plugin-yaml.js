import YAML from "yaml";

export default function YamlPlugin() {
    return {
        name: "yaml-plugin",
        transform: (code, id) => {
         if(!(id.endsWith(".yaml") || id.endsWith(".yml"))) {
             return null
         }
        const result = YAML.parse(code);
        return `export default ${JSON.stringify(result)}`;
        }
    };
}