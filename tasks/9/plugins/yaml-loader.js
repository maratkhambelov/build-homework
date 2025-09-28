import YAML from "yaml"

export default function YamlLoader(source) {
    const result = YAML.parse(source)
    return `export default ${JSON.stringify(result)}`
};