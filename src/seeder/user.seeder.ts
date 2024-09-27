import { createConnection, getManager } from "typeorm";
import { User } from "../entity/user.entity";
import { Role } from "../entity/role.entity";
import { faker } from '@faker-js/faker';
import bcryptjs from "bcryptjs";

createConnection().then(async connection => {
    console.log("Database connected successfully");

    const userRepository = getManager().getRepository(User);
    const roleRepository = getManager().getRepository(Role);

    const role = await roleRepository.findOne({ where: { id: 4} });

    if (!role) {
        console.error("Role with id: 4 not found. Exiting...");
        process.exit(1);
    }

    for (let i = 0; i < 10; i++) {
        try {
            const password = await bcryptjs.hash('password@123', 10);

            await userRepository.save({
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password,
                role,
            });

            console.log(`User ${i + 1} saved successfully`);
        } catch (error) {
            console.error(`Error saving user ${i + 1}`, error);
        }
    }

    console.log("All users generated successfully");
    process.exit(0);

}).catch(error => {
    console.error("Error connecting to the database", error);
    process.exit(1);
});
