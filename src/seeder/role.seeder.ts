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

        // Define all possible permissions, including user-related permissions
        const perms = [
            'doc_searching',           // Document Searching
            'doc_viewing',             // Document Viewing
            'doc_contribution',        // Document Contribution
            'doc_rating',              // Document Rating
            'frequently_asked_questions', // Using the FAQ
            'doc_moderation',          // Moderating Documents (for Moderator)
            'analytics_access',        // Access to analytics (for Admin only)
            'view_users',              // View users
            'create_users',            // Create users
            'edit_users',              // Edit users
            'delete_users'             // Delete users
        ];
        

        // Save or get existing permissions
        const permissions = await savePermissions(permissionRepository, perms);

        // Split permissions for each role
    const adminPermissions = permissions; // Admin has all permissions
    const moderatorPermissions = permissions.filter(p => p.name !== 'analytics_access'); 
    const educatorPermissions = moderatorPermissions.filter(p => p.name !== 'doc_moderation');
    const openAccessPermissions = educatorPermissions.filter(p => !['doc_contribution', 'view_users', 'create_users', 'edit_users', 'delete_users'].includes(p.name));


        // Save roles with appropriate permissions
        await saveRole(roleRepository, "Admin", adminPermissions);
        await saveRole(roleRepository, "Moderator", moderatorPermissions);
        await saveRole(roleRepository, "Educator", educatorPermissions);
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
 