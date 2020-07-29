import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../models/User";
import { UserRepository } from "../repository/User.repository";
import { NotFoundError } from "routing-controllers";

@Service()
export class UserService {

    @InjectRepository()
    private readonly userRepository: UserRepository

    getUsers () {
        return this.userRepository.find();
    }

    createUser (user: User) {
        return this.userRepository.save(user);
    }

    removeUser (id: User["id"]) {
        this.userRepository.delete({ id });
    }

    async updateUser (id: User["id"], updatedUser: User) {
        const user = await this.userRepository.findOne(id);

        if (!user) throw new NotFoundError("");

        delete updatedUser.id;

        this.userRepository.update({ id }, updatedUser);
    }
}
