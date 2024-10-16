/*# License
This project is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. See the [LICENSE](LICENSE) file for details
*/
import { createConnection, Repository } from "typeorm";
import { Module } from "../entity/module.entity"; // Import the Module entity

// Function to check and save modules
async function saveModules(moduleRepository: Repository<Module>, moduleNames: string[]): Promise<Module[]> {
    const savedModules: Module[] = [];

    for (const name of moduleNames) {
        // Check if the module already exists
        const existingModule = await moduleRepository.findOne({ where: { name } });

        // If not found, save the new module
        if (!existingModule) {
            const newModule = await moduleRepository.save({ name });
            savedModules.push(newModule);
        } else {
            // If found, add it to the savedModules array
            savedModules.push(existingModule);
        }
    }

    return savedModules;
}

async function main() {
    try {
        const connection = await createConnection();

        // Get repository
        const moduleRepository = connection.getRepository(Module);

        // Define all possible modules to seed
        const moduleNames = [
            'CHEM321',
            'APPM211',
            'TSHIVENDAHL',
            'STTN111',
            'MTHS112',
            'CMPG111',
            'CMPG323',
        ];

        // Save or get existing modules
        const modules = await saveModules(moduleRepository, moduleNames);

        console.log("Modules saved successfully:", modules);
    } catch (error) {
        console.error("Error occurred: ", error);
    } finally {
        process.exit(0);
    }
}

// Execute main function
main();
