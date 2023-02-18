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
const crypto_js_1 = __importDefault(require("crypto-js"));
//2embed rabbitstream
function rabbitstreamExtract(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const uri = Uri.parse(url);
        const initial_page = yield axios_1.default.get(url.replace("embed-5", "embed-4"), { headers: { "Referer": uri.scheme + "://" + uri.host } }).then(res => res.data);
        const $ = cheerio.load(initial_page);
        const data_id = $('#vidcloud-player').attr('data-id');
        const ajax_url = uri.scheme + "://" + uri.host + '/ajax/embed-4/getSources?id=' + data_id;
        let data = yield axios_1.default.get(ajax_url, { headers: {
                "X-Requested-With": "XMLHttpRequest"
            } }).then(res => res.data);
        const decryptSource = (encryptedSource) => __awaiter(this, void 0, void 0, function* () {
            // There are 3-4 keys possible, just try them all
                        try { // Dokicloud
                let decryptionKey = (yield axios_1.default.get('https://raw.githubusercontent.com/enimax-anime/key/e4/key.txt')).data;
                let bytes = crypto_js_1.default.AES.decrypt(encryptedSource, decryptionKey);
                console.log(decryptionKey+" 3");
                return (JSON.parse(bytes.toString(crypto_js_1.default.enc.Utf8)));
            }
            catch (e) {
                console.log("3 key failed to decrypt source "+e.message);
            }
                        try { // Dokicloud
                let decryptionKey = (yield axios_1.default.get('https://raw.githubusercontent.com/consumet/rapidclown/main/key.txt')).data;
                let bytes = crypto_js_1.default.AES.decrypt(encryptedSource, decryptionKey);
                console.log(decryptionKey+" 0");
                return (JSON.parse(bytes.toString(crypto_js_1.default.enc.Utf8)));
            }
            catch (e) {
                console.log("0 key failed to decrypt source "+e.message);
            }
            try { // Dokicloud
                let decryptionKey = (yield axios_1.default.get('https://raw.githubusercontent.com/consumet/rapidclown/dokicloud/key.txt')).data;
                let bytes = crypto_js_1.default.AES.decrypt(encryptedSource, decryptionKey);
                console.log(decryptionKey+" 1");
                return (JSON.parse(bytes.toString(crypto_js_1.default.enc.Utf8)));
            }
            catch (e) {
                console.log("1 key failed to decrypt source "+e.message);
            }
                        try { // Rabbitstream
                let decryptionKey = (yield axios_1.default.get('https://raw.githubusercontent.com/enimax-anime/key/e6/key.txt')).data;
                let bytes = crypto_js_1.default.AES.decrypt(encryptedSource, decryptionKey);
                console.log(decryptionKey+" 2");
                return (JSON.parse(bytes.toString(crypto_js_1.default.enc.Utf8)));
            }
            catch (e) {
                console.log("2 key failed to decrypt source "+e.message);
            }
        });
        data.sources = yield decryptSource(data.sources);
        let hls_url;
        for (const hls_source of data.sources)
            hls_url = hls_source.file;
        let hls_tracks = data.tracks.map((track) => ({ url: track.file, label: track.label }));
        // var source = {
        //     hls_url: result,
        //     tracks: hls_tracks
        // };
        return { data };
    });
}
exports.rabbitstreamExtract = rabbitstreamExtract;
//# sourceMappingURL=rabbitstream.js.map
