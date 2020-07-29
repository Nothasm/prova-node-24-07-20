import { JsonController, Get, Post, Body, Put, Delete, Params, OnUndefined, HttpCode} from "routing-controllers";
import { UserService } from "../services/User.service";
import { User } from "../models/User";

@JsonController("/users")
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    @Get()
    getAll() {
        return this.userService.getUsers();
    }

    @Post()
    @HttpCode(201)
    create(@Body() user: User) {
        return this.userService.createUser(user);
    }

    @Delete("/:id")
    @OnUndefined(204)
    delete(@Params() { id }: { id: User["id"] }) {
        return this.userService.removeUser(id);
    }

    @Put("/:id")
    @OnUndefined(204)
    update(@Params() { id }: { id: User["id"] }, @Body() user: User) {
        return this.userService.updateUser(id, user);
    }

}
