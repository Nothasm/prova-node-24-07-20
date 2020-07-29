import * as request from "supertest";
import { userBody, app } from "./helpers";

let id: string;

test("should create a media successfully", async () => {
    const { body, status } = await request(app)
        .post("/users")
        .send(userBody);

    id = body.id;
    
    expect(status).toBe(201);
});

test("should fail to create a media with invalida data", async () => {
    const { status } = await request(app)
        .post("/users")
        .send({ name: "Teste "});

    expect(status).toBe(400);
});

test("should return not found when ID is invalid", async () => {
    const { status } = await request(app).get(`/users/2`);

    expect(status).toBe(404);
});

test("shoud update a user", async () => {
    const newName = "Jon Snow";
    const { status } = await request(app)
        .put(`/users/${id}`)
        .send({
            ...userBody,
            name: newName
        });

    expect(status).toBe(204);
});

test("should delete a media", async () => {
    const { status: deleteStatus } = await request(app).delete(`/users/${id}`);

    expect(deleteStatus).toBe(204);
});