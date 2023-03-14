import multer from "multer";
import path from "node:path";

const upload = multer({
	storage: multer.diskStorage({
		destination(req, file, callback) {
			callback(null, path.resolve(__dirname, "..", "..", "..", "uploads"));
		},
		filename(req, file, callback) {
			callback(null, `${Date.now()}-${file.originalname}`);
		}
	}),
});

export { upload };
