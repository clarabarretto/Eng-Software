import * as yup from 'yup';

const schema = {
    create: {
        body: yup.object({
            user_id: yup.number().min(1).required(),
            group_id: yup.number().min(1).required()
        }).noUnknown()
    },
    find: {
        params: yup.object({
            id: yup.number().min(1).required()
        }).noUnknown()
    },
    list: {
        params: yup.object({
            group_id: yup.number().min(1).required()
        }).noUnknown()
    },
    delete: {
        params: yup.object({
            id: yup.number().min(1).required()
        }).noUnknown()
    }
};

export default schema
