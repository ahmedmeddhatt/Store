"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// create instance server
const app = (0, express_1.default)();
// parser incoming requests middleware
app.use(express_1.default.json());
const port = 3000;
// http request logger middleware
app.use((0, morgan_1.default)('common'));
// http security middleware
app.use((0, helmet_1.default)());
// request limmiter middleware
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 1,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many accounts created from this IP, please try again after an hour',
}));
//adding route 
app.get('/', (req, res) => {
    res.status(200).send('hello world🌍');
});
// start express server
app.listen(port, () => {
    console.log(`Server is starting at port : ${port}`);
});
exports.default = app;
