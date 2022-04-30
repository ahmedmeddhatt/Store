"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user_model"));
const database_1 = __importDefault(require("../database"));
const userModel = new user_model_1.default();
const user = {
    email: 'test100@test.com',
    first_name: 'tessst',
    last_name: 'userLname',
    user_name: 'userName',
    password: 'test123'
};
describe('user model', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const createUser = yield userModel.create(user);
        user.id = createUser.id;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield database_1.default.connect();
        const deleteTestData = 'DELETE FROM users;';
        yield connection.query(deleteTestData);
        connection.release();
    }));
    describe('Test methods exists', () => {
        it('Should Successfully Pass Test if create method exists', () => {
            expect(userModel.create).toBeDefined();
        });
        it('Should Successfully Pass Test if getMany method exists', () => {
            expect(userModel.getMany).toBeDefined();
        });
        it('Should Successfully Pass Test if getOne method exists', () => {
            expect(userModel.getOne).toBeDefined();
        });
        it('Should Successfully Pass Test if updateOne method exists', () => {
            expect(userModel.updateOne).toBeDefined();
        });
        it('Should Successfully Pass Test if deleteOne method exists', () => {
            expect(userModel.deleteOne).toBeDefined();
        });
        it('Should Successfully Pass Test if authenticate method exists', () => {
            expect(userModel.authenticate).toBeDefined();
        });
    });
    describe('test authenticate process', () => {
        it('Should Successfully Pass Test if return the authenticated user', () => __awaiter(void 0, void 0, void 0, function* () {
            const authenticatedUser = yield userModel.authenticate(user.email, user.password);
            expect(authenticatedUser === null || authenticatedUser === void 0 ? void 0 : authenticatedUser.email).toBe(user.email);
            expect(authenticatedUser === null || authenticatedUser === void 0 ? void 0 : authenticatedUser.first_name).toBe(user.first_name);
            expect(authenticatedUser === null || authenticatedUser === void 0 ? void 0 : authenticatedUser.last_name).toBe(user.last_name);
            expect(authenticatedUser === null || authenticatedUser === void 0 ? void 0 : authenticatedUser.user_name).toBe(user.user_name);
        }));
        it('Should Successfully Pass Test if return null for wrong credentials', () => __awaiter(void 0, void 0, void 0, function* () {
            const authenticatedUser = yield userModel.authenticate('wrongTest@test.com', 'Wrongpassword');
            expect(authenticatedUser).toBe(null);
        }));
    });
    describe('test user model process', () => {
        it('Should Successfully Pass Test return a new user', () => __awaiter(void 0, void 0, void 0, function* () {
            const createdUser = yield userModel.create({
                email: 'create_test@test.com',
                first_name: 'userFname1',
                last_name: 'userLname1',
                user_name: 'userName1',
                password: 'test123'
            });
            expect(createdUser).toEqual({
                id: createdUser.id,
                email: 'create_test@test.com',
                first_name: 'userFname1',
                last_name: 'userLname1',
                user_name: 'userName1'
            });
        }));
        it('Should Successfully Pass Test and return all available users in DB', () => __awaiter(void 0, void 0, void 0, function* () {
            const users = yield userModel.getMany();
            expect(users.length).toBe(2);
        }));
        it('Should Successfully Pass Test and return testUser when called with ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const returnedUser = yield userModel.getOne(user.id);
            expect(returnedUser.id).toBe(user.id);
            expect(returnedUser.email).toBe(user.email);
            expect(returnedUser.first_name).toBe(user.first_name);
            expect(returnedUser.last_name).toBe(user.last_name);
            expect(returnedUser.user_name).toBe(user.user_name);
        }));
        // it('Should Successfully Pass Test and return user with edited attributes', async () => {
        //   const updatedUser = await userModel.updateOne(
        //     user.id as unknown as string,
        //     {
        //       ...user,
        //       email: 'test22@test.com',
        //       first_name: 'userFname22',
        //       last_name: 'userLname22',
        //       user_name: 'userName22',
        //       password: 'test12322'
        //     }
        //   );
        //   expect(updatedUser.id).toBe(user.id);
        //   expect(updatedUser.email).toBe('test22@test.com');
        //   expect(updatedUser.first_name).toBe('userFname22');
        //   expect(updatedUser.last_name).toBe('userLname22');
        //   expect(updatedUser.user_name).toBe('userName22');
        // });
        it('Should Successfully Pass Test and delete user from DB', () => __awaiter(void 0, void 0, void 0, function* () {
            const deletedUser = yield userModel.deleteOne(user.id);
            expect(deletedUser.id).toBe(user.id);
        }));
    });
});
