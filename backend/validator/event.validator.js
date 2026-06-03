const Joi = require('joi');

const createEventSchema = Joi.object({
    // --- plain text fields ---
    eventCode: Joi.string().min(3).max(50).required(),
    title: Joi.string().min(3).max(100).required(),
    organizer: Joi.string().min(3).max(100).required(),
    category: Joi.string().min(3).max(50).required(),
    username: Joi.string().min(3).max(50).required(),
    venueName: Joi.string().min(3).max(100).required(),
    venueAddress: Joi.string().min(3).max(200).required(),
    city: Joi.string().min(2).max(50).required(),
    prerequisites: Joi.string().min(3).max(200).optional(),
    tags: Joi.string().min(3).max(100).optional(),

    // --- rich text / long fields ---
    shortDescription: Joi.string().min(3).max(300).required(),
    fullDescription: Joi.string().min(3).max(2000).required(),
    agenda: Joi.string().min(3).max(5000).optional(),

    // --- links & numbers ---
    venueMapLink: Joi.string().uri().optional(),
    priceAmount: Joi.number().min(0).required(),
    priceCurrency: Joi.string().length(3).required(), // e.g. "INR", "USD"
    isEarlyBird: Joi.boolean().required(),

    // --- dates (ISO string) ---
    eventDate: Joi.string().isoDate().required(),
    eventTimeStart: Joi.string().required(),
    eventTimeEnd: Joi.string().required(),
    registrationDeadline: Joi.string().isoDate().required(),
    visibleFrom: Joi.string().isoDate().required(),
    bookingOpenDate: Joi.string().isoDate().required(),

    // --- capacity ---
    numberOfGuests: Joi.number().min(1).required(),
    capacityTotal: Joi.number().min(1).required(),
    capacityRemaining: Joi.number().min(0).required(),

    // --- file ---
    fileUpload: Joi.string().optional(),
});


const updateEventSchema = Joi.object({
    // --- plain text fields ---
    eventCode: Joi.string().min(3).max(50).optional(),
    title: Joi.string().min(3).max(100).optional(),
    organizer: Joi.string().min(3).max(100).optional(),
    category: Joi.string().min(3).max(50).optional(),
    username: Joi.string().min(3).max(50).optional(),
    venueName: Joi.string().min(3).max(100).optional(),
    venueAddress: Joi.string().min(3).max(200).optional(),
    city: Joi.string().min(2).max(50).optional(),
    prerequisites: Joi.string().min(3).max(200).optional(),
    tags: Joi.string().min(3).max(100).optional(),

    // --- rich text / long fields ---
    shortDescription: Joi.string().min(3).max(300).optional(),
    fullDescription: Joi.string().min(3).max(2000).optional(),
    agenda: Joi.string().min(3).max(5000).optional(),

    // --- links & numbers ---
    venueMapLink: Joi.string().uri().optional(),
    priceAmount: Joi.number().min(0).optional(),
    priceCurrency: Joi.string().length(3).optional(),
    isEarlyBird: Joi.boolean().optional(),

    // --- dates (ISO string) ---
    eventDate: Joi.string().isoDate().optional(),
    eventTimeStart: Joi.string().optional(),
    eventTimeEnd: Joi.string().optional(),
    registrationDeadline: Joi.string().isoDate().optional(),
    visibleFrom: Joi.string().isoDate().optional(),
    bookingOpenDate: Joi.string().isoDate().optional(),

    // --- capacity ---
    numberOfGuests: Joi.number().min(1).optional(),
    capacityTotal: Joi.number().min(1).optional(),
    capacityRemaining: Joi.number().min(0).optional(),

    // --- file ---
    fileUpload: Joi.string().optional(),
}).min(1); // <--- Crucial: Forces at least 1 key to be present in the object


module.exports = { createEventSchema, updateEventSchema };