import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { validate } from "../validation/validation";

const createOrder = async (request) => {
    const {
        tailorName,
        customerUsername,
        gender,
        service,
        clothingSize,
        clothingColor,
        clothingModel,
        qty,
        orderEstimation,
    } = validate(orderValidation, request);

    // Cari customer berdasarkan username
    const customer = await prismaClient.customer.findUnique({
        where: {
            user_id: customerUsername,
        },
        select: {
            customer_id: true,
        },
    });

    if (!customer) {
        throw new ResponseError(404, "Customer not found!");
    }

    // Cari tailor berdasarkan nama tailor
    const tailor = await prismaClient.tailor.findUnique({
        where: {
            tailor_name: tailorName,
        },
        select: {
            tailor_id: true,
        },
    });

    if (!tailor) {
        throw new ResponseError(404, "Tailor not found!");
    }

    // Insert order ke dalam tabel
    const order = await prismaClient.order.create({
        data: {
            tailor_id: tailor.tailor_id,
            customer_id: customer.customer_id,
            gender,
            service,
            clothing_size: clothingSize,
            clothing_color: clothingColor,
            clothing_model: clothingModel,
            qty,
            order_estimation: orderEstimation,
            status: "pending",
            price: 0,
            comment: "",
        },
    });

    return {
        status: true,
        message: "Order created successfully!",
    };
};

const getAllOrderByClientUsername = async (customerUsername) => {
    customerUsername = validate(usernameValidation, customerUsername);

    // Cari customer berdasarkan username
    const customer = await prismaClient.customer.findUnique({
        where: {
            user_id: customerUsername,
        },
        select: {
            customer_id: true,
        },
    });

    if (!customer) {
        // Jika customer tidak ditemukan, kembalikan array kosong
        return {
            status: false,
            message: "No orders found for the given customer.",
            orders: [],
        };
    }

    // Ambil semua order berdasarkan customer_id
    const orders = await prismaClient.order.findMany({
        where: {
            customer_id: customer.customer_id,
        },
        select: {
            order_id: true,
            tailor_name: {
                select: {
                    tailor_name: true,
                },
            },
            service: true,
            gender: true,
            status: true,
            order_estimation: true,
        },
    });

    return {
        status: true,
        message: "Orders retrieved successfully.",
        orders,
    };
};

const getDetailOrderByOrderId = async (orderId) => {
    orderId = validate(orderIdValidation, orderId);

    // Ambil detail order berdasarkan order_id
    const order = await prismaClient.order.findUnique({
        where: {
            order_id: orderId,
        },
        include: {
            tailor: {
                select: {
                    tailor_name: true,
                    phone_number: true,
                },
            },
        },
    });

    if (!order) {
        return {
            status: false,
            message: "Order not found.",
        };
    }

    return {
        status: true,
        message: "Order details retrieved successfully.",
        order: {
            order_id: order.order_id,
            tailor_name: order.tailor.tailor_name,
            tailor_phone_number: order.tailor.phone_number,
            gender: order.gender,
            created_at: order.created_at,
            service: order.service,
            status: order.status,
            clothing_color: order.clothing_color,
            clothing_size: order.clothing_size,
            clothing_model: order.clothing_model,
            quantity: order.qty,
            comment: order.comment,
            order_estimation: order.order_estimation,
        },
    };
};

export default {
    createOrder,
    getAllOrderByClientUsername,
    getDetailOrderByOrderId,
};
