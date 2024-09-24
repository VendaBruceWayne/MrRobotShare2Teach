import { createConnection, Repository } from "typeorm";
import { Permission } from "../entity/permission.entity";
import { Role } from "../entity/role.entity";

// Function to check and save permissions
async function savePermissions(permissionRepository: Repository<Permission>, perms: string[]): Promise<Permission[]> {
    const savedPermissions: Permission[] = [];

    for (const perm of perms) {
        // Check if the permission already exists
        const existingPermission = await permissionRepository.findOne({ where: { name: perm } });
        
        // If not found, save the new permission
        if (!existingPermission) {
            const newPermission = await permissionRepository.save({ name: perm });
            savedPermissions.push(newPermission);
        } else {
            // If found, add it to the savedPermissions array
            savedPermissions.push(existingPermission);
        }
    }

    return savedPermissions;
}

// Function to check and save roles
async function saveRole(roleRepository: Repository<Role>, name: string, permissions: Permission[]): Promise<void> {
    // Check if the role already exists
    const existingRole = await roleRepository.findOne({ where: { name } });

    if (!existingRole) {
        // If role does not exist, save it
        await roleRepository.save({ name, permissions });
    } else {
        // Role already exists, update permissions if needed
        existingRole.permissions = permissions;
        await roleRepository.save(existingRole);
    }
}

async function main() {
    try {
        const connection = await createConnection();

        // Get repositories
        const permissionRepository = connection.getRepository(Permission);
        const roleRepository = connection.getRepository(Role);

        // Define permissions
        const perms = [
            'doc_searching',
            'doc_viewing',
            'doc_contribution',
            'doc_rating',
            'frequently_asked_questions',
            'doc_moderation'
        ];

        // Save or get existing permissions
        const permissions = await savePermissions(permissionRepository, perms);

        // Save roles with permissions
        await saveRole(roleRepository, "Admin", permissions);
        await saveRole(roleRepository, "Moderator", permissions);

        // For Educator role, exclude 'doc_moderation'
        const educatorPermissions = permissions.filter((_, index) => index !== 5);
        await saveRole(roleRepository, "Educator", educatorPermissions);

        // For Open_Access_User role, exclude 'doc_contribution' and 'doc_moderation'
        const openAccessPermissions = educatorPermissions.filter((_, index) => index !== 2);
        await saveRole(roleRepository, "Open_Access_User", openAccessPermissions);

        console.log("Permissions and roles saved successfully!");
    } catch (error) {
        console.error("Error occurred: ", error);
    } finally {
        process.exit(0);
    }
}

// Execute main function
main();
