import { hashSync, compareSync } from "bcryptjs";
import { generate } from "randomstring";
import { User } from "src/modules/entities/User";
import * as Config from "src/constants/Config";
const titleize = require("titleize");

export class App {
  private static uniqueId: number = 0;
  public static TOKEN_MESSAGE = "Please enter the token.";
  public static SAVED_SUCCESSFULLY = "Saved Successfully.";
  public static REMOVED_SUCCESSFULLY = "Removed Successfully.";
  public static INVALID_DATA = "Please enter valid data.";
  public static NON_ALPHA_NUMERIC = /[^\w\s]/g;

  public static camelize(str: string) {
    return titleize(str);
  }

  public static DateNow() {
    return new Date().toISOString();
  }

  public static HashSync(data: string) {
    return hashSync(data, 8);
  }

  public static HashCompareSync(param1: string, param2: string) {
    return compareSync(param1, param2);
  }

  public static RandomString(length: number, charset: string) {
    return generate({ length: length, charset: charset });
  }

  public static UniqueID(name: string, type: string): string {
    var str: string = "";

    if (type) {
      str = type + "_" + name;
    } else {
      str = name + "_" + App.UniqueCode();
    }
    str = str.replace(App.NON_ALPHA_NUMERIC, "_");
    str = str.replace(/\s/g, "_");
    str = str.substr(0, 128);

    return str.toUpperCase();
  }

  public static DaysBack(
    date: Date,
    backValue: number,
    isDays: boolean = true
  ) {
    date = new Date(date);
    if (isDays) {
      date.setDate(date.getDate() - backValue);
    } else {
      date.setMilliseconds(date.getMilliseconds() - backValue);
    }

    date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return date;
  }

  public static AddDays(date: Date, addDays: number, isDays: boolean = true) {
    date = new Date(date);
    if (isDays) {
      date.setDate(date.getDate() + addDays);
    } else {
      date.setMilliseconds(date.getMilliseconds() + addDays);
    }

    date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return date;
  }

  public static UniqueCode(): string {
    var time: number = new Date().getTime();
    if (this.uniqueId == time) {
      while (new Date().getTime() < 1 + time) {}
      time = new Date().getTime();
    }
    this.uniqueId = time;
    return time.toString(36).toUpperCase();
  }

  public static uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
      c
    ) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  public static replaceTokens(
    templateHtml: string,
    tokens: string[],
    user: User,
    urlToken?: string
  ) {
    for (let token of tokens) {
      let placeholder;
      if (
        token.endsWith("Link") &&
        placeholder &&
        placeholder.property === "Link"
      ) {
        let url = placeholder.val ? Config.API_URL + placeholder.val : "";
        switch (token) {
          case "Api_Host_Link":
            url = Config.API_URL;
            break;
          case "Unsubscribe_Link":
            url = placeholder.value;
            break;
          case "User_Forgot_Pass_Link":
          case "User_Registration_Link":
            {
              if (urlToken && urlToken !== "undefined") {
                url += "?token=" + encodeURIComponent(urlToken);
                break;
              } else if (
                user.emailToken &&
                user.emailToken !== null &&
                user.emailToken !== "undefined"
              ) {
                url += "?token=" + encodeURIComponent(user.emailToken);
                break;
              }
            }
            templateHtml = templateHtml.replace(new RegExp(token, "gi"), url);
        }
      } else if (
        placeholder &&
        (placeholder.property === "insert" ||
          placeholder.property === "insert&link")
      ) {
        let name: any = "";
        switch (token) {
          case "User_Name":
            name = user.fullName ? App.camelize(user.fullName) : "";
            break;

          case "User_Email":
            {
              name = user ? user.email : "";
            }
            break;

          case "User_Mobile":
            {
              name = user && user.mobile ? user.mobile : "";
            }
            break;
        }
        if (name)
          templateHtml = templateHtml.replace(
            new RegExp("{" + token + "}", "gi"),
            name
          );
      }
    }
    return templateHtml;
  }
}
