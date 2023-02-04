"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCaptchaToken = void 0;
const axios_1 = __importDefault(require("axios"));
const enc_base64_1 = __importDefault(require("crypto-js/enc-base64"));
const enc_utf8_1 = __importDefault(require("crypto-js/enc-utf8"));
const qs_1 = __importDefault(require("qs"));
const cheerio = __importStar(require("cheerio"));
const Uri = __importStar(require("uri-js"));
function getCaptchaToken(url, key) {
    return __awaiter(this, void 0, void 0, function* () {
        const uri = Uri.parse(url);
        const domain = enc_base64_1.default.stringify(enc_utf8_1.default.parse(uri.scheme + "://" + uri.host + ":443")).replace(/=/g, ".");
        const recaptcha_out = yield axios_1.default.get("https://www.google.com/recaptcha/api.js?render=" + key).then(res => res.data);
        const v_token = recaptcha_out.substring(recaptcha_out.indexOf("/releases/") + 10, recaptcha_out.indexOf("/recaptcha__en.js"));
        const anchor_out = yield axios_1.default.get(`https://www.google.com/recaptcha/api2/anchor?ar=1&hl=en&size=invisible&cb=flicklax&k=${key}&co=${domain}&v=${v_token}`).then(res => res.data);
        const $ = cheerio.load(anchor_out);
        const recaptcha_token = $("#recaptcha-token").attr("value");
        const data = {
            v: v_token,
            reason: "q",
            k: key,
            c: recaptcha_token,
            sa: "",
            co: domain,
        };
        const token_out = yield axios_1.default.post(`https://www.google.com/recaptcha/api2/reload?k=${key}`, qs_1.default.stringify(data), { headers: { "referer": "https://www.google.com/recaptcha/api2/" } }).then(res => res.data);
        var token = token_out.match('rresp","(.+?)"');
        return token[1];
    });
}
exports.getCaptchaToken = getCaptchaToken;
//# sourceMappingURL=get_token.js.map