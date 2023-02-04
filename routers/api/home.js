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
router.get("/home", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trending_movies = yield axios_1.default.get(`${tmdb_1.tmdb.url}/3/trending/all/day?api_key=${tmdb_1.tmdb.key}`).then((res) => res.data.results);
        const trending_tv = yield axios_1.default.get(`${tmdb_1.tmdb.url}/3/trending/all/day?api_key=${tmdb_1.tmdb.key}`).then((res) => res.data.results);
        const popular_movies = yield axios_1.default.get(`${tmdb_1.tmdb.url}/3/movie/popular?api_key=${tmdb_1.tmdb.key}`).then((res) => res.data.results);
        const popular_tv = yield axios_1.default.get(`${tmdb_1.tmdb.url}/3/tv/popular?api_key=${tmdb_1.tmdb.key}`).then((res) => res.data.results);
        const top_movies = yield axios_1.default.get(`${tmdb_1.tmdb.url}/3/tv/popular?api_key=${tmdb_1.tmdb.key}`).then((res) => res.data.results);
        const top_tv = yield axios_1.default.get(`${tmdb_1.tmdb.url}/3/tv/popular?api_key=${tmdb_1.tmdb.key}`).then((res) => res.data.results);
        return res.status(200).json({ trending_movies, trending_tv,
            popular_movies, popular_tv, top_movies, top_tv });
    }
    catch (err) {
        return res.status(404).json({ error: "incorrect api parameter" });
    }
}));
exports.default = router;
//# sourceMappingURL=home.js.map