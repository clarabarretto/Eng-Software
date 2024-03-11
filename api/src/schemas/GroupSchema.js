import * as yup from 'yup'

const schema = {
    create: {
        body: yup.object({
            name: yup.string().required()
        }).noUnknown()
    },
    find: {
        params: yup.object({
            id: yup.number().min(1).required()
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
