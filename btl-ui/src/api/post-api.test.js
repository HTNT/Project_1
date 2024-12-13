import authAPI from "./auth-api";
import postAPI from "./post-api";

describe("POST api", () => {
    describe("create post", () => {
        it("tạo 1 post mới bằng auto test khi có auth-token", async () => {
            let tokenName = "";
            const user = {
                email: "viettuekk123@gmail.com",
                password: "Viettuekk123",
            };
            const result = await authAPI.login(user);
            if (result && result.data && result.data.tokenData) {
                tokenName = result.data.tokenData.token;
            }

            const data = {
                text: "post được tạo bởi test unit 3h15 chieu 12-11",
                imageUrl: "",
            };
            const result_post = await postAPI.addPost(tokenName, data);
            expect(result_post.status).toBe(201);
            expect(result_post.data).toHaveProperty(
                "message",
                "Create post successful"
            );
        });

        it("tạo 1 post mới bằng auto test khi không có auth-token", async () => {
            const data = {
                text: "post được tạo bởi test unit",
                imageUrl: "",
            };
            try {
                const result_post = await postAPI.addPost("", data);
            } catch (error) {
                expect(error.response.status).toBe(401);
                expect(error.response.data).toHaveProperty(
                    "message",
                    "Invalid token, authorization denied!"
                );
            }
        });
    });
});
