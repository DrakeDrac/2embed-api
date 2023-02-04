"use strict";
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
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const _2embed_1 = require("../../providers/2embed");
const tmdb_1 = require("../../providers/tmdb");
const router = (0, express_1.Router)();
router.get("/details/:type/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const details = yield axios_1.default.get(`${tmdb_1.tmdb.url}/3/${req.params.type}/${req.params.id}?api_key=${tmdb_1.tmdb.key}&append_to_response=credits,videos`).then((res) => res.data);
        delete details.seasons;
        const query = {
            params: {
                id: req.params.id,
                s: 'null',
                e: 'null'
            }
        };
        const data = yield _2embed_1.TwoEmbed.getEmbedPageSrc(req.params.type, query);
        if (_2embed_1.TwoEmbed.isSrc_available(data)) {
            return res.status(200).json({ details, is_src_available: true });
        }
        else {
            return res.status(200).json({ details, is_src_available: false });
        }
    }
    catch (err) {
        return res.status(404).json({ error: "incorrect request." });
    }
}));
exports.default = router;
//# sourceMappingURL=details.js.map