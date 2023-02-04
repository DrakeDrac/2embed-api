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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const _2embed_1 = require("../../providers/2embed");
const router = (0, express_1.Router)();
//ex. host/api/get_source/tv?id=37854&s=1&e=1
router.get("/get_source/:type", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = {
            params: {
                id: req.query.id,
                s: req.query.s,
                e: req.query.e
            }
        };
        const embed_page = yield _2embed_1.TwoEmbed.getEmbedPageSrc(req.params.type, query);
        const source = yield _2embed_1.TwoEmbed.extract_content(embed_page);
        return res.status(200).json(source);
    }
    catch (err) {
        return res.status(404).json({ error: "there is no sources available." });
    }
}));
exports.default = router;
//# sourceMappingURL=get_source.js.map