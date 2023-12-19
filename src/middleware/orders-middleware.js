// orderMiddleware.js

import { ResponseError } from "../error/response-error";

const checkOrderAuthorization = (req, res, next) => {
    // Anda dapat menambahkan logika otorisasi di sini
    const userRole = req.user.role; // Anda harus menyertakan informasi role dalam objek user atau sesuai dengan kebutuhan aplikasi Anda

    // Misalnya, jika hanya role "customer" yang diizinkan untuk membuat order
    if (userRole !== "customer") {
        throw new ResponseError(403, "Forbidden: Only customers are allowed to create orders.");
    }

    // Lanjutkan ke middleware atau pengendali berikutnya jika pengguna diizinkan
    next();
};

export { checkOrderAuthorization };
