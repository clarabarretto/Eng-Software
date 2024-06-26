import * as yup from 'yup';

const sanitizeValue = value => {
	if (!value) return null;

	let parsedValue = value;

	if (!parsedValue) return null;

	parsedValue = parsedValue.trim();
	parsedValue = parsedValue.replace(/&amp;/g, '&');
	parsedValue = parsedValue.replace(/&lt;/g, '<');
	parsedValue = parsedValue.replace(/&gt;/g, '>');

	return parsedValue;
};

const schema = {
    create: {
        body: yup.object({
            name: yup.string().required(),
            admin_id: yup.number().min(1).required()
        }).noUnknown()
    },
    find: {
        params: yup.object({
            id: yup.number().min(1).required()
        }).noUnknown()
    },
    list: {
        params: yup.object({
            user_id: yup.number().min(1).required()
        }).noUnknown(),
    },
    update: {
        params: yup.object({
            id: yup.number().min(1).required()
        }).noUnknown(),
        body: yup.object().shape({
            name: yup.string().nullable(),
            is_admin: yup.boolean().nullable()
        }).noUnknown()
    }
};

export default schema
