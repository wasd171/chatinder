export default async function installExtensions() {
	const installer = require('electron-devtools-installer')

	const extensions = [
		'REACT_DEVELOPER_TOOLS',
		'jdkknkkbebbapilgoeccciglkfbmbnfm' // apollo-devtools
	]
	const forceDownload = !!process.env.UPGRADE_EXTENSIONS
	if (forceDownload) {
		for (const name of extensions) {
			try {
				const extension = installer[name] || name
				await installer.default(extension, forceDownload)
			} catch (e) {}
		}
	}
}
