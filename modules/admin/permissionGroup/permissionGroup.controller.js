import PermissionGroupService from "./permissionGroup.service.js";

async function createPermissionGroup(req, res) {
	const { clientIp } = req;
	const { adminId } = req.admin;
	const { name, permissions } = req.body;

	try {
		let permissionGroup = await PermissionGroupService.createPermissionGroup(name, permissions)
		return res.json({
			status: true,
			permissionGroup,
			message: JSON.stringify({ en: "The process successful.", tr: "İşlem başarı ile tamamlandı." })
		});

	} catch (error) {
		return res.json({ status: false, message: error.message });
	}

}

async function updatePermissionGroup(req, res) {
	const { permissionGroupId } = req.params;
	const { permissionGroup } = req.body;
	try {
		let updatedPermissionGroup = await PermissionGroupService.updatePermissionGroup(permissionGroupId, permissionGroup)
		return res.json({
			status: true,
			updatedPermissionGroup,
			message: JSON.stringify({ en: "The process successful.", tr: "İşlem başarı ile tamamlandı." })
		});
	} catch (error) {
		return res.json({ status: false, message: error.message });
	}


}

async function deletePermissionGroup(req, res) {
	const { clientIp } = req;
	const { adminId } = req.admin;
	const { permissionGroupId } = req.params;

	try {
		await PermissionGroupService.deletePermissionGroup(permissionGroupId)


		LogService.adminLog("admin_activity_permissionGroup_delete", adminId, {
			ip: clientIp,
			permissionGroupId
		});

		return res.json({
			status: true,
			message: JSON.stringify({
				en: "The permissionGroup has been deleted",
				tr: "Yetki grubu silindi"
			})
		});

	} catch (error) {
		return res.json({ status: false, message: error.message });
	}

}

async function getPermissionGroup(req, res) {
	const { permissionGroupId } = req.params;

	try {
		let permissionGroup = await PermissionGroupService.getPermissionGroup(permissionGroupId)
		return res.json({ status: true, permissionGroup });
	} catch (error) {
		return res.json({ status: false, message: error.message });
	}

}

async function getPermissionGroups(req, res) {
	try {
		let permissionGroups = await PermissionGroupService.getPermissionGroups()

		return res.json({ status: true, permissionGroups });
	} catch (error) {
		return res.json({ status: false, message: error.message });
	}

}

async function getMyPermissions(req, res) {
	const { adminId } = req.admin;

	try {
		let permissions = await PermissionGroupService.getPermissionsByAdminId(adminId)
		return res.json({ status: true, permissions });
	} catch (error) {
		return res.json({ status: false, message: error.message });
	}

}

export default {
	createPermissionGroup,
	updatePermissionGroup,
	deletePermissionGroup,
	getPermissionGroup,
	getPermissionGroups,
	getMyPermissions
};
