import Joi from "joi";

// Mission operation schemas organized by request part
export const missionSchemas = {
    // POST /missions - Create/add a mission
    create: {
        body: Joi.object({
            missionName: Joi.string()
            .required()
            .min(6)
            .messages({
                "any.required": `"missionName" is required`,
                "string.empty": `"missionName" cannot be empty`,
                "string.min": `"missionName length must be at least 3 characters long`,
            }),
            missionDescription: Joi.string()
            .required()
            .min(0)
            .max(500)
            .messages({
                "any.required": `"missionDescription" is required`,
                "string.empty": `"missionDescription" cannot be empty`,
                "string.min": `"missionDescription length must be at least 0 characters long`,
                "string.max": `"missionDescription length must be at most 500 characters long`
            }),
            missionType: Joi.string()
            .valid(
                "reconnaissance",
                "testing",
                "escort",
                "defense",
                "infiltration",
                "assault",
                "top-secret"
            )
            .required()
            .messages({
                "any.required": `"missionType" is required`,
                "any.only": `"missionType" must be one of [reconnaissance, testing, escort, defense, infiltration, assault, top-secret]`,
            }),
            missionLocation: Joi.string()
            .required()
            .min(3)
            .messages({
                "any.required": `"missionLocation" is required`,
                "string.empty": `"missionLocation" cannot be empty`,
                "string.min": `"missionLocation length must be at least 3 characters long`,
            }),
            missionPriority: Joi.string()
            .valid("low", "medium", "high", "critical")
            .default("low")
            .messages({
                "any.only": `"missionPriority" must be one of [low, medium, high, critical]`,
            }),
            missionStatus: Joi.string()
            .valid("active", "completed", "abandoned", "failed")
            .default("active")
            .messages({
                "any.only": `"missionStatus" must be one of [active, completed, abandoned, failed]`,
            }),
            assignedAt: Joi.string()
            .isoDate()
            .allow(null)
            .messages({
                "string.base": `"assignedAt" must be a string`,
                "string.isoDate": `"assignedAt" must be a valid ISO 8601 date string`,
            }),
            completedAt: Joi.string()
            .isoDate()
            .allow(null)
            .messages({
                "string.base": `"completedAt" must be a string`,
                "string.isoDate": `"completedAt" must be a valid ISO 8601 date string`,
            }),
            mobileSuitIds: Joi.array()
            .items(
                Joi.string()
                .messages({
                    "string.base": `"mobileSuitIds" must contain only string ids`,
                    "string.empty": `"mobileSuitIds" cannot contain empty ids`,
                })
            )
            .default([])
            .messages({
                "array.base": `"mobileSuitIds" must be an array`,
            }),
            pilotIds: Joi.array()
            .items(
                Joi.string()
                .messages({
                    "string.base": `"pilotIds" must contain only string ids`,
                    "string.empty": `"pilotIds" cannot contain empty ids`,
                })
            )
            .default([])
            .messages({
                "array.base": `"pilotIds" must be an array`,
            }),
        }),
    },

    // GET /missions/:id - Mission by id
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

    // PUT /missions/:id - Update mission information
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
            missionName: Joi.string()
            .min(4)
            .messages({
                "string.empty": `"missionName" cannot be empty`,
                "string.min": `"missionName length must be at least 3 characters long`,
            }),
            missionDescription: Joi.string()
            .min(0)
            .max(500)
            .messages({
                "string.empty": `"missionDescription" cannot be empty`,
                "string.min": `"missionDescription length must be at least 3 characters long`,
                "string.max": `"missionDescription length must be at most 500 characters long`
            }),
            missionType: Joi.string()
            .valid(
                "reconnaissance",
                "testing",
                "escort",
                "defense",
                "infiltration",
                "assault",
                "top-secret"
            )
            .messages({
                "any.only": `"missionType" must be one of [reconnaissance, testing, escort, defense, infiltration, assault, top-secret]`,
            }),
            missionLocation: Joi.string()
            .min(3)
            .messages({
                "string.empty": `"missionLocation" cannot be empty`,
                "string.min": `"missionLocation length must be at least 3 characters long`,
            }),
            missionPriority: Joi.string()
            .valid(
                "low",
                "medium",
                "high",
                "critical"
            )
            .messages({
                "any.only": `"missionPriority" must be one of [low, medium, high, critical]`,
            }),
            missionStatus: Joi.string()
            .valid(
                "active",
                "completed",
                "abandoned",
                "failed"
            )
            .messages({
                "any.only": `"missionStatus" must be one of [active, completed, abandoned, failed]`,
            }),
            assignedAt: Joi.string()
            .isoDate()
            .allow(null)
            .messages({
                "string.base": `"assignedAt" must be a string`,
                "string.isoDate": `"assignedAt" must be a valid ISO 8601 date string`,
            }),
            completedAt: Joi.string()
            .isoDate()
            .allow(null)
            .messages({
                "string.base": `"completedAt" must be a string`,
                "string.isoDate": `"completedAt" must be a valid ISO 8601 date string`,
            }),
            mobileSuitIds: Joi.array()
            .items(
                Joi.string()
                .messages({
                    "string.base": `"mobileSuitIds" must contain only string ids`,
                    "string.empty": `"mobileSuitIds" cannot contain empty ids`,
                })
            )
            .messages({
                "array.base": `"mobileSuitIds" must be an array`,
            }),
            pilotIds: Joi.array()
            .items(
                Joi.string()
                .messages({
                    "string.base": `"pilotIds" must contain only string ids`,
                    "string.empty": `"pilotIds" cannot contain empty ids`,
                })
            )
            .messages({
                "array.base": `"pilotIds" must be an array`,
            }),
        }),
    },

    // DELETE /missions/:id - Delete mission
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
