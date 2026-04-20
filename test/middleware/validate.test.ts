import Joi from "joi";
import { validateRequest } from "../../src/api/v1/middleware/validate";
import { createMockRequest, createMockResponse, createNext } from "../helpers/httpMocks";
import { HTTP_STATUS } from "../../src/constants/httpConstants";

describe("validateRequest middleware", () => {
    test("passes and strips unknown body fields by default", () => {
        const middleware = validateRequest({
            body: Joi.object({
                name: Joi.string().required(),
            }),
        });

        const req = createMockRequest({ body: { name: "Amuro", extra: "remove-me" } });
        const res = createMockResponse();
        const next = createNext();

        middleware(req, res, next);

        expect(req.body).toEqual({ name: "Amuro" });
        expect(next).toHaveBeenCalled();
    });

    test("returns 400 with validation errors when body is invalid", () => {
        const middleware = validateRequest({
            body: Joi.object({
                name: Joi.string().required(),
            }),
        });

        const req = createMockRequest({ body: {} });
        const res = createMockResponse();
        const next = createNext();

        middleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            error: expect.stringContaining("Validation error:"),
        }));
        expect(next).not.toHaveBeenCalled();
    });

    test("validates params and query when schemas are provided", () => {
        const middleware = validateRequest({
            params: Joi.object({
                id: Joi.string().required(),
            }),
            query: Joi.object({
                page: Joi.number().integer().min(1),
            }),
        });

        const req = createMockRequest({
            params: { id: "123" } as any,
            query: { page: 1 } as any,
        });
        const res = createMockResponse();
        const next = createNext();

        middleware(req, res, next);
        expect(next).toHaveBeenCalled();
    });
});
