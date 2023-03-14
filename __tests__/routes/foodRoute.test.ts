import request from "supertest";
import app from "../../src/app";
import foodService from "../../src/services/foodService";

describe("Foodtruck Route", () => {
  describe("POST /foodtruck", () => {
    beforeEach(() => {
      jest.spyOn(foodService, "storeFoodTruck").mockResolvedValue(1);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should return 201 status code with id on successful request", async () => {
      const validFoodTruck = {
        date: "2020-12-12",
        name: "foodtruck1",
      };
      const response = await request(app)
        .post("/api/v1/foodtruck")
        .send(validFoodTruck);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
    });

    it("should return 400 status code when required fields are missing", async () => {
      const invalidFoodTruck = {
        name: "foodtruck1",
      };
      const response = await request(app)
        .post("/api/v1/foodtruck")
        .send(invalidFoodTruck);
      expect(response.status).toBe(400);
    });

    it("should return 500 status code when an error occurs", async () => {
      jest
        .spyOn(foodService, "storeFoodTruck")
        .mockRejectedValue(new Error("Something went wrong"));

      const validFoodTruck = {
        date: "2020-12-12",
        name: "foodtruck1",
      };
      const response = await request(app)
        .post("/api/v1/foodtruck")
        .send(validFoodTruck);
      expect(response.status).toBe(500);
    });
  });

  describe("GET /foodtruck", () => {
    beforeEach(() => {
      jest.spyOn(foodService, "getFoodTrucksFor").mockResolvedValue([
        {
          date: new Date("2020-12-12"),
          name: "foodtruck1",
          id: 1,
        },
      ]);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("returns 200 OK with foodTrucks for that date when date is valid", async () => {
      const response = await request(app)
        .get("/api/v1/foodtruck")
        .query({ date: "2023-03-14" });

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
    });

    it("returns 400 Bad Request when date is not provided", async () => {
      const response = await request(app).get("/api/v1/foodtruck");

      expect(response.status).toBe(400);
    });

    it("returns 400 Bad Request when date is invalid", async () => {
      const response = await request(app)
        .get("/api/v1/foodtruck")
        .query({ date: "invalid-date" });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
    });
  });
});
