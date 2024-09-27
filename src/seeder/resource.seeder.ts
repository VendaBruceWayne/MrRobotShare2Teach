import { createConnection, getManager } from "typeorm";
import { Resource } from "../entity/resource.entity";
import { User } from "../entity/user.entity";
import { faker } from '@faker-js/faker';

createConnection().then(async connection => {
    console.log("Database connected successfully");

    const repository = getManager().getRepository(Resource);
    const user = await getManager().findOne(User, { where: { id: 3 } });

    if (!user) {
        console.error("User with id: 3 not found. Exiting...");
        process.exit(1);
    }

    for (let i = 0; i < 30; i++) {
        try {
            await repository.save({
                title: faker.lorem.words(2),
                description: faker.lorem.words(20),
                moderationStatus: "pending",
                pdf: faker.image.url({ width: 200, height: 200 }),
                moderationComments: faker.lorem.words(10),
                user,
            });

            console.log(`Resource ${i + 1} saved successfully`);
        } catch (error) {
            console.error(`Error saving resource ${i + 1}`, error);
        }
    }

    console.log("All data generated successfully");
    process.exit(0);
}).catch(error => {
    console.error("Error connecting to the database", error);
    process.exit(1);
});
