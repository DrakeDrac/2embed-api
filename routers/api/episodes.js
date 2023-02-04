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
const router = (0, express_1.Router)();
router.get("/episodes/tv/:id/seasons/:season_n_query", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const library_page = yield axios_1.default.get(`${_2embed_1.TwoEmbed.url}/library/tv/${req.params.id}`, { timeout: 3500 }).then((res) => res.data);
        const season_n_query = req.params.season_n_query;
        const episodes = _2embed_1.TwoEmbed.list_episodes(library_page, season_n_query);
        return res.status(200).json(episodes);
    }
    catch (err) {
        return res.status(404).json({ error: "No media source found." });
    }
}));
exports.default = router;
//# sourceMappingURL=episodes.js.map