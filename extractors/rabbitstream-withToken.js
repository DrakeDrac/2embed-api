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
exports.rabbitstreamExtract = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
const Uri = __importStar(require("uri-js"));
const get_token_1 = require("../utils/get_token");
function rabbitstreamExtract(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const uri = Uri.parse(url);
        const initial_page = yield axios_1.default.get(url.replace("embed-5", "embed-4"), { headers: { "Referer": uri.scheme + "://" + uri.host } }).then(res => res.data);
        const site_key_match = initial_page.match("recaptchaSiteKey = '(.+?)'");
        if (site_key_match == null)
            return;
        const number_match = initial_page.match("recaptchaNumber = '(.+?)'");
        if (number_match == null)
            return;
        const token = yield (0, get_token_1.getCaptchaToken)(url.replace("embed-5", "embed-4"), site_key_match[1]);
        const $ = cheerio.load(initial_page);
        const data_id = $('#vidcloud-player').attr('data-id');
        const ajax_url = uri.scheme + "://" + uri.host + '/ajax/embed-4/getSources?id=' + data_id + '&token=' + token + '&number=' + number_match[1];
        return yield axios_1.default.get(ajax_url, { headers: { "X-Requested-With": "XMLHttpRequest" } }).then(res => res.data);
    });
}
exports.rabbitstreamExtract = rabbitstreamExtract;
//# sourceMappingURL=rabbitstream-withToken.js.map