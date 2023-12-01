const { client } = require('../db/index.js')

let orderRepository = client.db('simplebks').collection('olist_order_items')


const getOrdersBySellerId = async (sellerId, limit, sortBy, offset) => {


    const sortOrder = sortBy === 'price' ? { price: 1 } : { shipping_limit_date: 1 };

    try {

        const pipeline = [
            { $match: { seller_id: sellerId } },
            { $sort: sortOrder },
            { $skip: parseInt(offset) },
            { $limit: parseInt(limit) },
            {
                $lookup: {
                    from: 'olist_products',
                    localField: 'product_id',
                    foreignField: 'product_id',
                    as: 'product_info'
                }
            },
            {
                $unwind: '$product_info'
            },
            {
                $project: {
                    _id: 0,
                    id: '$order_item_id',
                    product_id: '$product_id',
                    product_category: '$product_info.product_category_name',
                    price: '$price',
                    date: '$shipping_limit_date'
                }
            }
        ];

        const [orderItems, total] = await Promise.all([
            orderRepository.aggregate(pipeline).toArray(),
            orderRepository.countDocuments({ seller_id: sellerId })
        ]);

        console.log(orderItems, total, 'order')
        return { orderItems, total };
    } catch (err) {
        console.log(err.message);
        throw new Error('Oops! an error occured');;
    }

}








const updateUser = async (type, userData, updateParam) => {
    let result;

    try {
        if (type === 'refreshToken') {
            result = await userRepository.findByIdAndUpdate(userData, { refreshToken: updateParam })
        }
        if (type === 'plan') {
            result = await userRepository.findByIdAndUpdate(userData, { plan: updateParam })
        }
        if (type === 'capital') {
            result = await userRepository.findByIdAndUpdate(userData, { capital: updateParam })
        }
        return result;
    } catch (err) {
        console.log(err.message)
        return { err };
    }
}



const deleteUser = async (userData) => {
    try {
        let deletedUser = await userRepository.deleteOne({ _id: userData });
        console.log(deletedUser)
        return deletedUser;
    } catch (err) {
        console.log(err.message)
        return { err };
    }
}


module.exports = {
    getOrdersBySellerId,
    updateUser,
    deleteUser
}