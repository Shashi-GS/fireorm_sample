import * as path from "path";
import * as fs from "fs";
import * as Handlebars from "handlebars";

// import { log } from "../utils/Log";

export class HandlebarHelper {
    public static HtmlRender(fileName: string, data: Object) {
        var source = path.join(
            __dirname,
            "../../src/assets/templates/" + fileName + ".html"
        );
        console.info("Html Source: " + source);
        source = fs.readFileSync(source, "utf8");
        var template = Handlebars.compile(source);
        data = JSON.parse(JSON.stringify(data));
        var result = template(data);
        console.info("Html Source: " + source);
        console.info(result);
        return result;
    }
}
