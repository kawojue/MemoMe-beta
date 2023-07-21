"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const DBConn_1 = __importDefault(require("./config/DBConn"));
const root_1 = __importDefault(require("./routes/root"));
const corsOptions_1 = __importDefault(require("./config/corsOptions"));
const express_1 = __importDefault(require("express"));
const credentials_1 = __importDefault(require("./middlewares/credentials"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 1707;
(0, DBConn_1.default)(process.env.DB_URI);
// set middlewares
app.use(credentials_1.default);
app.use(express_1.default.json({ limit: '14mb' }));
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)(corsOptions_1.default));
app.use(express_1.default.urlencoded({ limit: '14mb', extended: true }));
// set route
app.use('/', root_1.default);
mongoose_1.default.connection.once('open', () => {
    console.log("Connected to MongoDB!");
    app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
});
