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
exports.TwoEmbed = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
const get_token_1 = require("../utils/get_token");
const rabbitstream_1 = require("../extractors/rabbitstream");
class TwoEmbed {
    static isSrc_available(embed_page) {
        if (embed_page !== null) {
            const $ = cheerio.load(embed_page);
            return $("title").text() !== "404 Page Not Found";
        }
        else {
            return false;
        }
    }
    static list_episodes(library_page, season_n) {
        var $ = cheerio.load(library_page);
        let list_episodes = [];
        let episode_names = [];
        $('.episode-item').each(function (index, element) {
            list_episodes[index] = $(element).attr("data-number");
            episode_names[index] = $(element).text().substring($(element).text().indexOf(":") + 2);
        });
        let sum_total_eps = 0;
        let prev_sum_total_eps = 0;
        let season_details = [];
        var index = 0;
        $(".season-item").each(function (i, el) {
            sum_total_eps += $(`#ss-episodes-${i + 1}`).find("div > div > a").length;
            prev_sum_total_eps += $(`#ss-episodes-${i}`).find("div > div > a").length;
            let season_number = $(el).attr("data-number");
            let episodes_id = list_episodes.slice(prev_sum_total_eps, sum_total_eps);
            let epstotal = episodes_id.length;
            season_details[i] = { season_number, epstotal };
            let episodes = [];
            if (season_n == season_number) {
                episodes_id.forEach((episode_number, index) => {
                    const title = episode_names[index + prev_sum_total_eps];
                    episodes[index] = { episode_number, title };
                });
                index = i;
                season_details[index] = { episodes, season_number, epstotal };
            }
        });
        if (season_n == "all") {
            return { season_details };
        }
        return season_details[index];
    }
    static extract_content(embed_page) {
        return __awaiter(this, void 0, void 0, function* () {
            const $ = cheerio.load(embed_page);
            const source_id = $(".item-server").map(function () {
                if ($(this).text().includes("Vidcloud")) {
                    return $(this).attr("data-id");
                }
            }).get().toString();
            const site_key = $("body").attr("data-recaptcha-key");
            const token = yield (0, get_token_1.getCaptchaToken)(TwoEmbed.url, site_key);
            const rabbitstream_url = yield axios_1.default.get(`${TwoEmbed.url}/ajax/embed/play?id=
                            ${source_id}&_token=${token}`, {
                headers: {
                    "Referer": TwoEmbed.url
                }
            }).then(res => res.data.link);
            return yield (0, rabbitstream_1.rabbitstreamExtract)(rabbitstream_url);
        });
    }
    static getEmbedPageSrc(type, arg) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield axios_1.default.get(`${TwoEmbed.url}/embed/tmdb/${type}`, {
                    params: {
                        id: arg.params.id,
                        s: arg.params.s,
                        e: arg.params.e
                    }
                }).then((res) => res.data);
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.TwoEmbed = TwoEmbed;
TwoEmbed.url = "https://www.2embed.to";
//# sourceMappingURL=2embed.js.map