// auth-api.test.js
import authAPI from "./auth-api";
// import { axiosClient } from "./axios-client";

// Mock axiosClient
// jest.mock("./axios-client", () => ({
//     axiosClient: {
//         post: jest.fn(),
//     },
// }));

describe("authAPI", () => {
    afterEach(() => {
        jest.clearAllMocks(); // Reset tất cả mock sau mỗi test
    });

    describe("login", () => {
        it("Gọi axiosClient.post với URL và dữ liệu người dùng chính xác:", async () => {
            const user = {
                email: "viettuekk123@gmail.com",
                password: "Viettuekk123",
            };
            const result = await authAPI.login(user);
            // console.log("response: " + JSON.stringify(result.data.message));
            expect(result.status).toBe(200); // hoặc status mà server trả về
            expect(result.data).toHaveProperty("message", "Login successfully"); // Kiểm tra phản hồi API
        });

        it("Gọi axiosClient.post với URL và dữ liệu người dùng rỗng:", async () => {
            const user = {
                email: "",
                password: "",
            };
            try {
                const result = await authAPI.login(user);
            } catch (error) {
                // Bắt lỗi và tiếp tục kiểm tra mã trạng thái và thông báo
                expect(error.response.status).toBe(400); // Kiểm tra mã lỗi
                expect(error.response.data).toHaveProperty(
                    "message",
                    "Email and Password is empty"
                ); // Kiểm tra thông báo lỗi
            }
        });

        it("Gọi axiosClient.post với URL đúng và tài khoản rỗng mật khẩu có:", async () => {
            const user = {
                email: "",
                password: "Viettuekk123",
            };
            try {
                const result = await authAPI.login(user);
            } catch (error) {
                // console.log("response: " + JSON.stringify(result.data.message));
                expect(error.response.status).toBe(400); // hoặc status mà server trả về
                expect(error.response.data).toHaveProperty(
                    "message",
                    "Email is empty"
                ); // Kiểm tra phản hồi API
            }
        });

        it("Gọi axiosClient.post với URL và email đúng mật khẩu người dùng rỗng:", async () => {
            const user = {
                email: "viettuekk123@gmail.com",
                password: "",
            };
            try {
                const result = await authAPI.login(user);
            } catch (error) {
                // console.log("response: " + JSON.stringify(result.data.message));
                expect(error.response.status).toBe(400); // hoặc status mà server trả về
                expect(error.response.data).toHaveProperty(
                    "message",
                    "Password is empty"
                ); // Kiểm tra phản hồi API
            }
        });

        it("Gọi axiosClient.post với URL và emai người dùng đúng mật khẩu người dùng sai:", async () => {
            const user = {
                email: "viettuekk123@gmail.com",
                password: "mksai",
            };
            try {
                const result = await authAPI.login(user);
            } catch (error) {
                // console.log("response: " + JSON.stringify(result.data.message));
                expect(error.response.status).toBe(400); // hoặc status mà server trả về
                expect(error.response.data).toHaveProperty(
                    "message",
                    "Your password is not correct"
                ); // Kiểm tra phản hồi API
            }
        });

        it("Gọi axiosClient.post với URL và email người dùng sai và mật khẩu đúng:", async () => {
            const user = {
                email: "viettuekk123+sai@gmail.com",
                password: "Viettuekk123",
            };
            // console.log("response: " + JSON.stringify(result.data.message));
            try {
                const result = await authAPI.login(user);
            } catch (error) {
                expect(error.response.status).toBe(409); // hoặc status mà server trả về
                expect(error.response.data).toHaveProperty(
                    "message",
                    "Your email address is not exists"
                ); // Kiểm tra phản hồi API
            }
        });

        it("Gọi axiosClient.post với URL với email sai và mật khẩu người dùng sai:", async () => {
            const user = {
                email: "viettuekk123+sai@gmail.com",
                password: "saisaisai    ",
            };
            try {
                const result = await authAPI.login(user);
            } catch (error) {
                // console.log("response: " + JSON.stringify(result.data.message));
                expect(error.response.status).toBe(409); // hoặc status mà server trả về
                expect(error.response.data).toHaveProperty(
                    "message",
                    "Your email address is not exists"
                ); // Kiểm tra phản hồi API
            }
        });
    });

    describe("register", () => {
        // it("should call axiosClient.post with the correct URL and user data", async () => {
        //     const user = {
        //         first_name: "dvt test fn",
        //         last_name: "dvt ln",
        //         email: "viettuekk123+test1@gmail.com",
        //         password: "Viettuekk123",
        //     };

        //     const result = await authAPI.register(user);
        //     // console.log(result);
        //     expect(result.status).toBe(201); // hoặc status mà server trả về
        //     expect(result.data).toHaveProperty(
        //         "message",
        //         "User created successfully"
        //     ); // Kiểm tra phản hồi API
        // });

        it("gọi axiosClient.post với URL đúng và user data rỗng", async () => {
            const user = {
                first_name: "",
                last_name: "",
                email: "",
                password: "",
            };

            try {
                const result = await authAPI.register(user);
            } catch (error) {
                expect(error.response.status).toBe(400); // hoặc status mà server trả về
                expect(error.response.data).toHaveProperty(
                    "message",
                    "first_name should not be empty, last_name should not be empty, email must be an email,email should not be empty, Password is short!,password should not be empty"
                ); // Kiểm tra phản hồi API
            }
        });

        it("gọi axiosClient.post với URL đúng và user data đúng first_name rỗng", async () => {
            const user = {
                first_name: "",
                last_name: "trung",
                email: "dokhactrungvn-test@gmail.com",
                password: "Dotrung123",
            };

            try {
                const result = await authAPI.register(user);
            } catch (error) {
                expect(error.response.status).toBe(400); // hoặc status mà server trả về
                expect(error.response.data).toHaveProperty(
                    "message",
                    "first_name should not be empty"
                ); // Kiểm tra phản hồi API
            }
        });

        it("gọi axiosClient.post với URL đúng và user data đúng last name rỗng", async () => {
            const user = {
                first_name: "Khac Trung",
                last_name: "",
                email: "dokhactrungvn@gmail.com",
                password: "Dotrung123",
            };

            try {
                const result = await authAPI.register(user);
            } catch (error) {
                expect(error.response.status).toBe(400); // hoặc status mà server trả về
                expect(error.response.data).toHaveProperty(
                    "message",
                    "last_name should not be empty"
                ); // Kiểm tra phản hồi API
            }
        });

        it("gọi axiosClient.post với URL đúng và user data đúng email rỗng", async () => {
            const user = {
                first_name: "Khac Trung",
                last_name: "trung",
                email: "",
                password: "Dotrung123",
            };

            try {
                const result = await authAPI.register(user);
            } catch (error) {
                expect(error.response.status).toBe(400); // hoặc status mà server trả về
                expect(error.response.data).toHaveProperty(
                    "message",
                    "email must be an email,email should not be empty"
                ); // Kiểm tra phản hồi API
            }
        });

        it("gọi axiosClient.post với URL đúng và user data đúng password rỗng", async () => {
            const user = {
                first_name: "Khac Trung",
                last_name: "trung",
                email: "dokhactrungvn@gmail.com",
                password: "",
            };

            try {
                const result = await authAPI.register(user);
            } catch (error) {
                expect(error.response.status).toBe(400); // hoặc status mà server trả về
                expect(error.response.data).toHaveProperty(
                    "message",
                    "Password is short!,password should not be empty"
                ); // Kiểm tra phản hồi API
            }
        });

        it("gọi axiosClient.post với URL đúng và user data email đã tồn tại", async () => {
            const user = {
                "first_name":"Khac Trung",
                "last_name":"trung",
                "email":"dokhactrungvn@gmail.com",
                "password":"Dotrung123"
            };

            try {
                const result = await authAPI.register(user);
            } catch (error) {
                expect(error.response.status).toBe(409); // hoặc status mà server trả về
                expect(error.response.data).toHaveProperty(
                    "message",
                    "Your email address is already exists"
                ); // Kiểm tra phản hồi API
            }
        });

        it("gọi axiosClient.post với URL đúng và user data đúng, mật khẩu ngắn hơn 8 kí tự", async () => {
            const user = {
                "first_name":"Khac Trung",
                "last_name":"trung",
                "email":"dokhactrungvn+test1@gmail.com",
                "password":"1234567"
            };

            try {
                const result = await authAPI.register(user);
            } catch (error) {
                expect(error.response.status).toBe(400); // hoặc status mà server trả về
                expect(error.response.data).toHaveProperty(
                    "message",
                    "Password is short!"
                ); // Kiểm tra phản hồi API
            }
        });

        it("gọi axiosClient.post với URL đúng và user data đúng, email k đúng định dạng", async () => {
            const user = {
                "first_name":"Khac Trung",
                "last_name":"trung",
                "email":"dokhactrungvn@gmail",
                "password":"Dotrung123"
            };

            try {
                const result = await authAPI.register(user);
            } catch (error) {
                expect(error.response.status).toBe(400); // hoặc status mà server trả về
                expect(error.response.data).toHaveProperty(
                    "message",
                    "email must be an email"
                ); // Kiểm tra phản hồi API
            }
        });

    });
});
