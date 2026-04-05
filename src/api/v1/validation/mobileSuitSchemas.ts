import Joi from "joi";

// Mobile suit operation schemas organized by request part
export const mobileSuitSchemas = {
    // POST /mobile-suits - Create/add a mobile suit to the fleet
    create: {
        body: Joi.object({
            mobileSuitName: Joi.string()
            .required()
            .min(3)
            .messages({
                "any.required": `"mobileSuitName" is required`,
                "string.empty": `"mobileSuitName" cannot be empty`,
                "string.min": `"mobileSuitName length must be at least 3 characters long`,
            }),
            artilleryType: Joi.string()
            .valid("beam", "projectile", "melee")
            .default("beam")
            .messages({
                "any.only": `"artilleryType" must be one of [beam, projectile, melee]`,
            }),
            status: Joi.string()
            .valid("active", "in-repair", "retired")
            .default("active")
            .messages({
                "any.only": `"status" must be one of [active, in-repair, retired]`,
            }),
            timeline: Joi.string()
            .valid(
                "Universal Century",
                "Future Century",
                "After Colony/Mars Century",
                "After War",
                "Correct Century",
                "Cosmic Era",
                "Anno Domini",
                "Advanced Generation",
                "Reglid Century",
                "Post Disaster",
                "Ad Stella",
                "Tenpou Era"
            )
            .messages({
                "any.only": `"timeline" must be one of ["Universal Century", "Future Century", "After Colony/Mars Century", "After War", "Correct Century", "Cosmic Era", "Anno Domini", "Advanced Generation", "Reglid Century", "Post Disaster", "Ad Stella", "Tenpou Era"]`,
            }),
            pilotId: Joi.string()
            .required()
            .messages({
                "any.required": `"pilotId" is required`,
                "string.empty": `"pilotId" cannot be empty`
            }),
        }),
    },

    // GET /mobile-suits/:id - Mobile suits by id
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

    // PUT /mobile-suits/:id - Update mobile suit information
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
            mobileSuitName: Joi.string()
            .min(3)
            .messages({
                "string.empty": `"mobileSuitName" cannot be empty`,
                "string.min": `"mobileSuitName length must be at least 3 characters long`,
            }),
            artilleryType: Joi.string()
            .valid("beam", "projectile", "melee")
            .messages({
                "any.only": `"artilleryType" must be one of [beam, projectile, melee]`,
            }),
            status: Joi.string().valid("active", "in-repair", "retired")
            .messages({
                "any.only": `"status" must be one of [active, in-repair, retired]`,
            }),
            timeline: Joi.string()
            .valid(
                "Universal Century",
                "Future Century",
                "After Colony/Mars Century",
                "After War",
                "Correct Century",
                "Cosmic Era",
                "Anno Domini",
                "Advanced Generation",
                "Reglid Century",
                "Post Disaster",
                "Ad Stella",
                "Tenpou Era"
            )
            .messages({
                "any.only": `"timeline" must be one of ["Universal Century", "Future Century", "After Colony/Mars Century", "After War", "Correct Century", "Cosmic Era", "Anno Domini", "Advanced Generation", "Reglid Century", "Post Disaster", "Ad Stella", "Tenpou Era"]`,
            }),
            pilotId: Joi.string()
            .min(1)
            .messages({
                "string.empty": `"pilotId" cannot be empty`,
            }),
        }),
    },

    // DELETE /mobile-suits/:id - Delete mobile suit from the fleet
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
