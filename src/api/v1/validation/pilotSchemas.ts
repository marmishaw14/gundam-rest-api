import Joi from "joi";

// Pilot operation schemas organized by request part
export const pilotSchemas = {
    // POST /pilots - Create/add a pilot
    create: {
        body: Joi.object({
            pilotName: Joi.string()
            .required()
            .min(3)
            .messages({
                "any.required": `"pilotName" is required`,
                "string.empty": `"pilotName" cannot be empty`,
                "string.min": `"pilotName length must be at least 3 characters long`,
            }),
            pilotRank: Joi.string()
            .valid(
                "rookie",
                "novice",
                "intermediate",
                "advanced",
                "veteran"
            )
            .required()
            .messages({
                "any.required": `"pilotRank" is required`,
                "any.only": `"pilotRank" must be one of [rookie, novice, intermediate, advanced, veteran]`,
            }),
            pilotStatus: Joi.string()
            .valid(
                "active",
                "injured",
                "retired",
                "deceased",
                "unknown"
            )
            .required()
            .messages({
                "any.required": `"pilotStatus" is required`,
                "any.only": `"pilotStatus" must be one of [active, injured, retired, deceased, unknown]`,
            }),
            assignedMobileSuitId: Joi.string()
            .allow(null)
            .messages({
                "string.empty": `"assignedMobileSuitId" cannot be empty`,
            }),
            imageUrl: Joi.string()
            .uri()
            .pattern(/\.(jpg|jpeg|png)$/i)
            .allow(null)
            .messages({
                "string.base": `"imageUrl" must be a string`,
                "string.empty": `"imageUrl" cannot be empty`,
                "string.uri": `"imageUrl" must be a valid URI`,
                "string.pattern.base": `"imageUrl" must end with one of [.jpg, .jpeg, .png]`,
            }),
        }),
    },

    // GET /pilots/:id - Pilot by id
    getById: {
        params: Joi.object({
            id: Joi.string()
            .required()
            .messages({
                "any.required": `"id" is required`,
                "string.empty": `"id" cannot be empty`,
            }),
        }),
    },

    // PUT /pilots/:id - Update pilot information
    update: {
        params: Joi.object({
            id: Joi.string()
            .required()
            .messages({
                "any.required": `"id" is required`,
                "string.empty": `"id" cannot be empty`,
            }),
        }),
        body: Joi.object({
            pilotName: Joi.string()
            .min(3)
            .messages({
                "string.empty": `"pilotName" cannot be empty`,
                "string.min": `"pilotName length must be at least 3 characters long`,
            }),
            pilotRank: Joi.string()
            .valid(
                "rookie",
                "novice",
                "intermediate",
                "advanced",
                "veteran"
            )
            .messages({
                "any.only": `"pilotRank" must be one of [rookie, novice, intermediate, advanced, veteran]`,
            }),
            pilotStatus: Joi.string()
            .valid(
                "active",
                "injured",
                "retired",
                "deceased",
                "unknown"
            )
            .messages({
                "any.only": `"pilotStatus" must be one of [active, injured, retired, deceased, unknown]`,
            }),
            assignedMobileSuitId: Joi.string()
            .allow(null)
            .messages({
                "string.empty": `"assignedMobileSuitId" cannot be empty`,
            }),
            imageUrl: Joi.string()
            .uri()
            .pattern(/\.(jpg|jpeg|png)$/i)
            .allow(null)
            .messages({
                "string.base": `"imageUrl" must be a string`,
                "string.empty": `"imageUrl" cannot be empty`,
                "string.uri": `"imageUrl" must be a valid URI`,
                "string.pattern.base": `"imageUrl" must end with one of [.jpg, .jpeg, .png]`,
            }),
        }),
    },

    // DELETE /pilots/:id - Delete pilot
    delete: {
        params: Joi.object({
            id: Joi.string()
            .required()
            .messages({
                "any.required": `"id" is required`,
                "string.empty": `"id" cannot be empty`,
            }),
        }),
    },
};
