import Joi from "joi";

// Weapon operation schemas organized by request part
export const weaponSchemas = {
    // POST /weapons - Create/add a weapon to the artillery
    create: {
        body: Joi.object({
            weaponName: Joi.string()
            .required()
            .min(3)
            .messages({
                "any.required": `"weaponName" is required`,
                "string.empty": `"weaponName" cannot be empty`,
                "string.min": `"weaponName length must be at least 3 characters long`,
            }),
            type: Joi.string()
            .valid(
                "beam-saber",
                "beam-rifle",
                "beam-sniper",
                "beam-gatling",
                "missile-launcher",
                "rocket-launcher",
                "machine-gun",
                "gatling-gun",
                "railgun",
                "shield",
                "melee"
            )
            .required()
            .messages({
                "any.required": `"type" is required`,
                "any.only": `"type" must be one of [beam-saber, beam-rifle, beam-sniper, beam-gatling, missile-launcher, rocket-launcher, machine-gun, gatling-gun, railgun, shield, melee]`,
            }),
            damage: Joi.number()
            .required()
            .min(10)
            .messages({
                "any.required": `"damage" is required`,
                "number.base": `"damage" must be a number`,
                "number.min": `"damage" must be greater than or equal to 10`,
            }),
            range: Joi.number()
            .required()
            .messages({
                "any.required": `"range" is required`,
                "number.base": `"range" must be a number`,
            }),
            energyCost: Joi.number()
            .required()
            .min(10)
            .messages({
                "any.required": `"energyCost" is required`,
                "number.base": `"energyCost" must be a number`,
                "number.min": `"energyCost" must be greater than or equal to 10`,
            }),
            ammoCapacity: Joi.number()
            .required()
            .min(0)
            .messages({
                "any.required": `"ammoCapacity" is required`,
                "number.base": `"ammoCapacity" must be a number`,
                "number.min": `"ammoCapacity" must be greater than or equal to 0`,
            }),
            weaponRarity: Joi.string()
            .valid("common", "uncommon", "rare", "ultra-rare", "legendary")
            .default("common")
            .messages({
                "any.only": `"weaponRarity" must be one of [common, uncommon, rare, ultra-rare, legendary]`,
            }),
        }),
    },

    // GET /weapons/:id - Weapon by id
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

    // PUT /weapons/:id - Update weapon information
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
            weaponName: Joi.string()
            .min(3)
            .messages({
                "string.empty": `"weaponName" cannot be empty`,
                "string.min": `"weaponName length must be at least 3 characters long`,
            }),
            type: Joi.string()
            .valid(
                "beam-saber",
                "beam-rifle",
                "beam-sniper",
                "beam-gatling",
                "missile-launcher",
                "rocket-launcher",
                "machine-gun",
                "gatling-gun",
                "railgun",
                "shield",
                "melee"
            )
            .messages({
                "any.only": `"type" must be one of [beam-saber, beam-rifle, beam-sniper, beam-gatling, missile-launcher, rocket-launcher, machine-gun, gatling-gun, railgun, shield, melee]`,
            }),
            damage: Joi.number()
            .min(10)
            .messages({
                "number.base": `"damage" must be a number`,
                "number.min": `"damage" must be greater than or equal to 10`,
            }),
            range: Joi.number()
            .messages({
                "number.base": `"range" must be a number`,
            }),
            energyCost: Joi.number()
            .min(10)
            .messages({
                "number.base": `"energyCost" must be a number`,
                "number.min": `"energyCost" must be greater than or equal to 10`,
            }),
            ammoCapacity: Joi.number()
            .min(0)
            .messages({
                "number.base": `"ammoCapacity" must be a number`,
                "number.min": `"ammoCapacity" must be greater than or equal to 0`,
            }),
            weaponRarity: Joi.string()
            .valid("common", "uncommon", "rare", "ultra-rare", "legendary")
            .messages({
                "any.only": `"weaponRarity" must be one of [common, uncommon, rare, ultra-rare, legendary]`,
            }),
        }),
    },

    // DELETE /weapons/:id - Delete weapon from artillery options
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
