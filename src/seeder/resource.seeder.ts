/*# License
This project is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. See the [LICENSE](LICENSE) file for details
*/
import { createConnection, getManager } from "typeorm";
import { Resource } from "../entity/resource.entity";
import { User } from "../entity/user.entity";
import { Module } from "../entity/module.entity";
import { faker } from '@faker-js/faker';

createConnection().then(async connection => {
    console.log("Database connected successfully");

    const resourceRepository = getManager().getRepository(Resource);
    const userRepository = getManager().getRepository(User);
    const moduleRepository = getManager().getRepository(Module);

    // Find the user with id 3
    const user = await userRepository.findOne({ where: { id: 1 } });
    if (!user) {
        console.error("User with id: 1 not found. Exiting...");
        process.exit(1);
    }

    // Find the module with the name 'CMPG323'
    const modules = await moduleRepository.find({ where: { name: "CMPG323" } });
    if (!modules || modules.length === 0) {
        console.error("Module 'CMPG323' not found. Exiting...");
        process.exit(1);
    }

    for (let i = 0; i < 10; i++) {
        try {
            await resourceRepository.save({
                title: faker.lorem.words(2),  // Assuming 'title' exists in Resource entity
                description: faker.lorem.words(20),
                moderationStatus: "pending",
                pdf: faker.image.url({ width: 200, height: 200 }),
                moderationComments: faker.lorem.words(10),
                modules: modules,  // Assign the found module(s)
                user: user,  // Assign the user object
            });

            console.log(`Resource ${i + 1} saved successfully`);
        } catch (error) {
            console.error(`Error saving resource ${i + 1}:`, error);
        }
    }

    console.log("All data generated successfully");
    process.exit(0);

}).catch(error => {
    console.error("Error connecting to the database", error);
    process.exit(1);
});
