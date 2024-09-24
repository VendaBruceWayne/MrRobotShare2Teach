
/*import { createConnection, getManager } from "typeorm";
import { Resource } from "../entity/resource.entity";
import faker from 'faker';

createConnection().then(async connection => {
    const repository = getManager().getRepository(Resource);

    for (let i = 0; i <30 ; i++)//Generates 30 types of data
    {
        await repository.save({
            title: faker.lorem.words(2), 
            description: faker.lorem.words(20), 
            pdf: faker.pdf.pdfUrl(200,200,"",true), 
            user:1

        })

    }
process.exit(0);
}); */