const request = require("supertest");
const app = require("../app");

jest.mock("mongoose", () => {
  const mockSchema = jest.fn(function () {
    return {
      pre: jest.fn(),
      post: jest.fn(),
    };
  });

  mockSchema.Types = {
    ObjectId: jest.fn().mockReturnValue("mocked-object-id"),
  };

  const mockModel = jest.fn().mockImplementation(() => ({
    find: jest.fn().mockResolvedValue([]),
    findById: jest.fn().mockResolvedValue(null),
    save: jest.fn().mockResolvedValue({}),
  }));

  return {
    connect: jest.fn().mockResolvedValue(),
    connection: { close: jest.fn().mockResolvedValue() },
    Schema: mockSchema,
    model: mockModel,
    Types: {
      ObjectId: jest.fn().mockReturnValue("mocked-object-id"),
    },
  };
});

describe("Book Reservation API", () => {
  it("should return a list of books", async () => {
    const response = await request(app).get("/api/books");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("should return 404 for non-existent book", async () => {
    const mockMongoose = require("mongoose");
    mockMongoose.model("Book").findById.mockResolvedValue(null);
    const response = await request(app).get("/api/books/12345");
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Book not found");
  });
});
