const { client } = require('../db/index.js')

let userRepository = client.db('simplebks').collection('olist_sellers')


const getUserBySellerId = async (SellerId) => {
    try {
        let user = await userRepository.findOne({ seller_id: SellerId });
        return user;
    } catch (err) {
        console.log(err.message);
        throw new Error('Oops! an error occured');
    }

}










module.exports = {
    getUserBySellerId,
}