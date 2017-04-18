export default function linkRef(component, name) {
	let cache = component._linkedRefs || (component._linkedRefs = {});
	return cache[name] || (cache[name] = c => {
		component[name] = c;
	});
}