import * as yup from 'yup';

const schema = {
    create: {
        body: yup.object({
            user_id: yup.number().min(1).required(),
            group_id: yup.number().min(1).required(),
            skills: yup.array().length(6).of(
                yup.object({
                    type: yup.string().oneOf(['SOFT', 'HARD']).required(),
                    title: yup.string().required(),
                    score: yup.number().integer().max(5).min(0).required()
                })
            )
        }).noUnknown()
    },
    find: {
        params: yup.object({
            id: yup.number().min(1).required()
        }).noUnknown(),
        body: yup.object({
            user_id: yup.number().min(1).required(),
            group_id: yup.number().min(1).required(),
            is_active: yup.boolean().nullable()
        }).noUnknown()
    },
    list: {
        params: yup.object({
            user_id: yup.number().min(1).required(),
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
