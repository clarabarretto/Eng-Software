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
            email: yup.string().email().required(),
            password: yup.string().required(),
            is_admin: yup.boolean().default(false).required()
        }).noUnknown()
    },
    find: {
        params: yup.object({
            id: yup.number().min(1).required()
        }).noUnknown()
    },
    list: {
        query: yup.object({
            id: yup.mixed().transform(value => Array.isArray(value) ? value : [].concat(value || [])).default([]).nullable(),
            search_text: yup.string().transform(sanitizeValue).nullable(),
            is_deleted: yup.boolean().nullable().default(false),
            email: yup.string().email().nullable()
        }).noUnknown()
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
