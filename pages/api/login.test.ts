import { createMocks } from "node-mocks-http";
import handler from "./login";

describe("/api/login API endpoint", () => {
  test("returns a successful response for valid credentials", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        username: "admin",
        password: "admin",
      },
    });

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({
      message: "Login successful",
      user: {
        id: 1,
        username: "admin",
        token: "fake-jwt-token",
      },
    });
  });

  // test("returns an unauthorized response for invalid credentials", async () => {
  //   const { req, res } = createMocks({
  //     method: "POST",
  //     body: {
  //       username: "wronguser",
  //       password: "wrongpassword",
  //     },
  //   });

  //   await handler(req, res);

  //   expect(res.statusCode).toBe(401);
  //   expect(res._getJSONData()).toEqual({ message: "Unauthorized" });
  // });
});
