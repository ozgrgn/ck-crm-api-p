import { PermissionGroup } from "./permissionGroup.model.js"

async function createPermissionGroup(name, permissions = []) {
	let permissionGroup = await PermissionGroup.findOne({ name: name })

	if (permissionGroup) {
		throw new Error(
			JSON.stringify({
				en: "Permission group name is already using.",
				tr: "Yetki grubu ismi zaten kullanılıyor."
			})
		);
	}

	permissionGroup = await new PermissionGroup({ name, permissions }).save();
	return permissionGroup;
}

async function updatePermissionGroup(permissionGroupId, permissionGroup) {

	const updatedPermissionGroup = await PermissionGroup.findOneAndUpdate(
		{ _id: permissionGroupId },
		{ ...permissionGroup },
		{ returnOriginal: false }
	)

	if (!updatedPermissionGroup) {
		throw new Error(
			JSON.stringify({
				en: "Permission group not found !",
				tr: "Yetki grubu bulunamadı !"
			})
		);
	}
	return updatedPermissionGroup;
}

async function deletePermissionGroup(permissionGroupId) {
	const permissionGroup = await PermissionGroup.findById(permissionGroupId)
	if (!permissionGroup) {
		throw new Error(
			JSON.stringify({
				en: "Permission group not found !",
				tr: "Yetki grubu bulunamadı !"
			})
		);
	}

	await permissionGroup.remove();}

async function getPermissionGroup(permissionGroupId) {
	const permissionGroup = await PermissionGroup.findById(permissionGroupId)
	if (!permissionGroup) {
		throw new Error(
			JSON.stringify({
				en: "Permission group not found !",
				tr: "Yetki grubu bulunamadı !"
			})
		);
	}

	return permissionGroup;
}

async function getPermissionGroupWithByName(name) {
	const permissionGroup = await PermissionGroup.findOne({ name })
	if (!permissionGroup) {
		throw new Error(
			JSON.stringify({
				en: "Permission group not found !",
				tr: "Yetki grubu bulunamadı !"
			})
		);
	}

	return permissionGroup;
}

async function getPermissionGroups() {
	return PermissionGroup.find()
}

export default {
	createPermissionGroup,
	deletePermissionGroup,
	getPermissionGroup,
	getPermissionGroups,
	updatePermissionGroup,
	getPermissionGroupWithByName
};
