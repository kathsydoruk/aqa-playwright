import { test, expect, request as playwrightRequest } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.BASE_URL;

async function createAuthorizedApiContext() {
  const email = process.env.TEST_CREDENTIALS_USERNAME;
  const password = process.env.TEST_CREDENTIALS_PASSWORD;
  const api = await playwrightRequest.newContext({
    baseURL: BASE_URL,
  });

  const loginResponse = await api.post("/api/auth/signin", {
    data: {
      email,
      password,
      remember: false,
    },
  });

  expect(loginResponse.status(), "Login must succeed").toBe(200);
  const state = await api.storageState();
  console.log(state.cookies);

  return api;
}

test.describe("POST /api/cars", () => {
  test("Positive: should create a car", async () => {
    const api = await createAuthorizedApiContext();

    const payload = {
      carBrandId: 1,
      carModelId: 1,
      mileage: 122,
    };

    const res = await api.post("/api/cars", { data: payload });
    expect(res.status()).toBe(201);

    const body = await res.json();

    expect(body.status).toBe("ok");
    expect(body.data).toBeTruthy();
    expect(typeof body.data.id).toBe("number");
    expect(body.data.carBrandId).toBe(payload.carBrandId);
    expect(body.data.carModelId).toBe(payload.carModelId);
    expect(body.data.mileage).toBe(payload.mileage);

    await api.dispose();
  });

  test("Negative: should return 400 for missing mileage", async () => {
    const api = await createAuthorizedApiContext();

    const res = await api.post("/api/cars", {
      data: {
        carBrandId: 1,
        carModelId: 1,
      },
    });

    expect(res.status()).toBe(400);

    const body = await res.json();
    expect(body.status).toBe("error");

    await api.dispose();
  });

  test("Negative: should return 401 if user is not authenticated", async () => {
    const api = await playwrightRequest.newContext({
      baseURL: BASE_URL,
    });

    const res = await api.post("/api/cars", {
      data: {
        carBrandId: 1,
        carModelId: 1,
        mileage: 100,
      },
    });

    expect(res.status()).toBe(401);

    const body = await res.json();
    expect(body.message).toBeTruthy();

    await api.dispose();
  });
});
