import YAML from "yaml";
import * as fs from "node:fs";

const yamlPlugin = () => {
    return {
        name: 'yamlPlugin',
        setup(build){
            build.onLoad({filter: /\.ya?ml$/},  (args) => {
                const source = fs.readFileSync(args.path, 'utf8');
                console.log(source)
                const result = YAML.parse(source)
                return {
                    contents:`export default ${JSON.stringify(result)}`
                }
            })
        }
    }
}

export default yamlPlugin;