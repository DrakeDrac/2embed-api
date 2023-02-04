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
const tmdb_1 = require("../../providers/tmdb");
const router = (0, express_1.Router)();
//ex. /api/search/tv?query=one%20piece
router.get("/search/:type", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield axios_1.default.get(`${tmdb_1.tmdb.url}/3/search/${req.params.type}`, {
            params: {
                api_key: tmdb_1.tmdb.key,
                query: req.query.query,
            }
        }).then((res) => res.data.results);
        return res.status(404).json({ results, available: false });
    }
    catch (err) {
        return res.status(404).json({ error: "incorrect request" });
    }
}));
exports.default = router;
//# sourceMappingURL=search.js.map