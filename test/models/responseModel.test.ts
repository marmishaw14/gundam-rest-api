import { successResponse } from "../../src/api/v1/models/responseModel";

describe("successResponse", () => {
    test("builds a success response with data and message", () => {
        const response = successResponse({ id: "1" }, "ok");
        expect(response).toEqual({
            status: "success",
            data: { id: "1" },
            message: "ok",
        });
    });

    test("builds a success response without optional fields", () => {
        const response = successResponse();
        expect(response).toEqual({
            status: "success",
            data: undefined,
            message: undefined,
        });
    });
});
