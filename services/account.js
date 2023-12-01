
const { client } = require('../db/index.js')

let userRepository = client.db('simplebks').collection('olist_sellers')


const updateSeller = async (sellerId, updateObject) => {
    let result;

    try {

        result = await userRepository.findOneAndUpdate({ seller_id: sellerId },
            { $set: updateObject },
            { returnDocument: 'after' })

        return result;
    } catch (err) {
        console.log(err.message)
        throw new Error('Oops! something went wrong')
    }
}


module.exports = {
    updateSeller,
}