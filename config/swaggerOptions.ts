import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Gundam Artillery and Combat Operations Management API Documentation",
            version: "1.0.0",
            description:
                "This is the API documentation for the Gundam Artillery and Combat Operations Management application.",
        },
        servers: [
            {
                url: "http://localhost:3010",
                description: "Local server",
            },
        ],
        tags: [
            { name: "System", description: "System and health endpoints" },
            { name: "Pilots", description: "Pilot management endpoints" },
            { name: "Mobile Suits", description: "Mobile suit management endpoints" },
            { name: "Weapons", description: "Weapon management endpoints" },
            { name: "Missions", description: "Mission management endpoints" },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                ApiSuccess: {
                    type: "object",
                    properties: {
                        status: { type: "string", example: "success" },
                        data: { type: "object", additionalProperties: true },
                        message: { type: "string", example: "Operation completed successfully." },
                    },
                },
                ApiValidationError: {
                    type: "object",
                    properties: {
                        error: { type: "string", example: "Validation error: Body: \"id\" is required" },
                    },
                },
                ApiAuthError: {
                    type: "object",
                    properties: {
                        error: { type: "string", example: "Forbidden: no role found" },
                    },
                },
                HealthCheckResponse: {
                    type: "object",
                    properties: {
                        status: { type: "string", example: "OK" },
                        uptime: { type: "number", example: 123.456 },
                        timestamp: { type: "string", format: "date-time" },
                        version: { type: "string", example: "1.0.0" },
                    },
                },
                Pilot: {
                    type: "object",
                    properties: {
                        id: { type: "string", example: "pilot-1" },
                        pilotName: { type: "string", example: "Amuro Ray" },
                        pilotRank: {
                            type: "string",
                            enum: ["rookie", "novice", "intermediate", "advanced", "veteran"],
                        },
                        pilotStatus: {
                            type: "string",
                            enum: ["active", "injured", "retired", "deceased", "unknown"],
                        },
                        assignedMobileSuitId: {
                            type: "string",
                            example: "ms-1",
                            nullable: true,
                        },
                        imageUrl: {
                            type: "string",
                            format: "uri",
                            example: "https://cdn.example.com/pilots/amuro.jpg",
                            nullable: true,
                        },
                    },
                },
                CreatePilotRequest: {
                    type: "object",
                    required: ["pilotName", "pilotRank", "pilotStatus"],
                    properties: {
                        pilotName: { type: "string", example: "Amuro Ray" },
                        pilotRank: {
                            type: "string",
                            enum: ["rookie", "novice", "intermediate", "advanced", "veteran"],
                        },
                        pilotStatus: {
                            type: "string",
                            enum: ["active", "injured", "retired", "deceased", "unknown"],
                        },
                        assignedMobileSuitId: {
                            type: "string",
                            example: "ms-1",
                            nullable: true,
                        },
                        imageUrl: {
                            type: "string",
                            format: "uri",
                            example: "https://cdn.example.com/pilots/amuro.jpg",
                            nullable: true,
                        },
                    },
                },
                UpdatePilotRequest: {
                    type: "object",
                    properties: {
                        pilotName: { type: "string", example: "Amuro Ray" },
                        pilotRank: {
                            type: "string",
                            enum: ["rookie", "novice", "intermediate", "advanced", "veteran"],
                        },
                        pilotStatus: {
                            type: "string",
                            enum: ["active", "injured", "retired", "deceased", "unknown"],
                        },
                        assignedMobileSuitId: {
                            type: "string",
                            example: "ms-1",
                            nullable: true,
                        },
                        imageUrl: {
                            type: "string",
                            format: "uri",
                            example: "https://cdn.example.com/pilots/amuro.jpg",
                            nullable: true,
                        },
                    },
                },
                MobileSuit: {
                    type: "object",
                    properties: {
                        id: { type: "string", example: "ms-1" },
                        mobileSuitName: { type: "string", example: "RX-78-2 Gundam" },
                        artilleryType: { type: "string", enum: ["beam", "projectile", "melee"] },
                        status: { type: "string", enum: ["active", "in-repair", "retired"] },
                        timeline: {
                            type: "string",
                            enum: [
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
                                "Tenpou Era",
                            ],
                        },
                        pilotId: { type: "string", example: "pilot-1" },
                        manufacturedAt: { type: "string", format: "date-time" },
                    },
                },
                CreateMobileSuitRequest: {
                    type: "object",
                    required: ["mobileSuitName", "pilotId"],
                    properties: {
                        mobileSuitName: { type: "string", example: "RX-78-2 Gundam" },
                        artilleryType: { type: "string", enum: ["beam", "projectile", "melee"] },
                        status: { type: "string", enum: ["active", "in-repair", "retired"] },
                        timeline: { type: "string" },
                        pilotId: { type: "string", example: "pilot-1" },
                    },
                },
                UpdateMobileSuitRequest: {
                    type: "object",
                    properties: {
                        mobileSuitName: { type: "string", example: "MS-06 Zaku II" },
                        artilleryType: { type: "string", enum: ["beam", "projectile", "melee"] },
                        status: { type: "string", enum: ["active", "in-repair", "retired"] },
                        timeline: { type: "string" },
                        pilotId: { type: "string", example: "pilot-2" },
                    },
                },
                Weapon: {
                    type: "object",
                    properties: {
                        id: { type: "string", example: "weapon-1" },
                        weaponName: { type: "string", example: "Beam Rifle" },
                        type: {
                            type: "string",
                            enum: [
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
                                "melee",
                            ],
                        },
                        damage: { type: "number", example: 120 },
                        range: { type: "number", example: 800 },
                        energyCost: { type: "number", example: 25 },
                        ammoCapacity: { type: "number", example: 10 },
                        weaponRarity: { type: "string", enum: ["common", "uncommon", "rare", "ultra-rare", "legendary"] },
                    },
                },
                CreateWeaponRequest: {
                    type: "object",
                    required: ["weaponName", "type", "damage", "range", "energyCost", "ammoCapacity"],
                    properties: {
                        weaponName: { type: "string", example: "Beam Rifle" },
                        type: {
                            type: "string",
                            enum: [
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
                                "melee",
                            ],
                        },
                        damage: { type: "number", example: 120 },
                        range: { type: "number", example: 800 },
                        energyCost: { type: "number", example: 25 },
                        ammoCapacity: { type: "number", example: 10 },
                        weaponRarity: { type: "string", enum: ["common", "uncommon", "rare", "ultra-rare", "legendary"] },
                    },
                },
                UpdateWeaponRequest: {
                    type: "object",
                    properties: {
                        weaponName: { type: "string", example: "Beam Saber" },
                        type: {
                            type: "string",
                            enum: [
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
                                "melee",
                            ],
                        },
                        damage: { type: "number", example: 150 },
                        range: { type: "number", example: 50 },
                        energyCost: { type: "number", example: 20 },
                        ammoCapacity: { type: "number", example: 1 },
                        weaponRarity: { type: "string", enum: ["common", "uncommon", "rare", "ultra-rare", "legendary"] },
                    },
                },
                Mission: {
                    type: "object",
                    properties: {
                        id: { type: "string", example: "mission-1" },
                        missionName: { type: "string", example: "Operation Silent Dusk" },
                        missionDescription: { type: "string", example: "Secure and hold the target perimeter." },
                        missionType: {
                            type: "string",
                            enum: ["reconnaissance", "testing", "escort", "defense", "infiltration", "assault", "top-secret"],
                        },
                        missionLocation: { type: "string", example: "Side 7" },
                        missionPriority: { type: "string", enum: ["low", "medium", "high", "critical"] },
                        missionStatus: { type: "string", enum: ["active", "completed", "abandoned", "failed"] },
                        assignedAt: { type: "string", format: "date-time", nullable: true },
                        completedAt: { type: "string", format: "date-time", nullable: true },
                        mobileSuitIds: { type: "array", items: { type: "string" } },
                        pilotIds: { type: "array", items: { type: "string" } },
                    },
                },
                CreateMissionRequest: {
                    type: "object",
                    required: ["missionName", "missionDescription", "missionType", "missionLocation"],
                    properties: {
                        missionName: { type: "string", example: "Operation Silent Dusk" },
                        missionDescription: { type: "string", example: "Secure and hold the target perimeter." },
                        missionType: {
                            type: "string",
                            enum: ["reconnaissance", "testing", "escort", "defense", "infiltration", "assault", "top-secret"],
                        },
                        missionLocation: { type: "string", example: "Side 7" },
                        missionPriority: { type: "string", enum: ["low", "medium", "high", "critical"] },
                        missionStatus: { type: "string", enum: ["active", "completed", "abandoned", "failed"] },
                        assignedAt: { type: "string", format: "date-time", nullable: true },
                        completedAt: { type: "string", format: "date-time", nullable: true },
                        mobileSuitIds: { type: "array", items: { type: "string" } },
                        pilotIds: { type: "array", items: { type: "string" } },
                    },
                },
                UpdateMissionRequest: {
                    type: "object",
                    properties: {
                        missionName: { type: "string", example: "Operation Crimson Shield" },
                        missionDescription: { type: "string", example: "Escort convoy through contested zone." },
                        missionType: {
                            type: "string",
                            enum: ["reconnaissance", "testing", "escort", "defense", "infiltration", "assault", "top-secret"],
                        },
                        missionLocation: { type: "string", example: "Earth Orbit" },
                        missionPriority: { type: "string", enum: ["low", "medium", "high", "critical"] },
                        missionStatus: { type: "string", enum: ["active", "completed", "abandoned", "failed"] },
                        assignedAt: { type: "string", format: "date-time", nullable: true },
                        completedAt: { type: "string", format: "date-time", nullable: true },
                        mobileSuitIds: { type: "array", items: { type: "string" } },
                        pilotIds: { type: "array", items: { type: "string" } },
                    },
                },
            },
        },
    },
    apis: ["./src/app.ts", "./src/api/v1/routes/*.ts"], // Path to files containing OpenAPI annotations
};

// Generate the Swagger spec
export const generateSwaggerSpec = (): object => {
    return swaggerJsdoc(swaggerOptions);
};
