import fs from "node:fs";
import crypto from "node:crypto";

import { bundle } from "./bundle.js";

const {output} = bundle(process.argv[2]);

fs.mkdirSync("./dist", { recursive: true });
const hashedPath = crypto.createHash("md5").update(output).digest("hex").slice(0, 6)

fs.writeFileSync(`./dist/main.${hashedPath}.js`, output);
