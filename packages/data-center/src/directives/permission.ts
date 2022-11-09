import { useMainStore } from "@/store";

function checkPermission(el, binding) {
    const { value } = binding;
    const store = useMainStore();
    if (Array.isArray(value)) {
        if (value.length > 0) {
            const permissionRoles = value;
            const hasPermission = permissionRoles.includes(store.userRole);
            if (!hasPermission) {
                el.parentNode && el.parentNode.removeChild(el);
            }
        }
    } else {
        throw new Error(`need roles! Like v-permission="['admin','editor']"`);
    }
}
export default {
    mounted(el, binding) {
        checkPermission(el, binding);
    },
    updated(el, binding) {
        checkPermission(el, binding);
    },
};
