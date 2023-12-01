const { client } = require('../db/index.js')

let userRepository = client.db('simplebks').collection('olist_sellers')


const getUserBySellerId = async (SellerId) => {
    try {
        let user = await userRepository.findOne({ seller_id: SellerId });
        console.log(user, 'user')
        return user;
    } catch (err) {
        console.log(err.message);
        throw new Error('Oops! an error occured');;
    }

}



const getUserById = async (userId) => {
    try {
        let user = await userRepository.findById(userId);
        console.log(user)
        return user;
    } catch (err) {
        console.log(err.message);
        return { err };
    }

}



const createUser = async (userData) => {

    const user = new userRepository(userData);


    try {
        let userSaved = await user.save();
        console.log(userSaved)
        return userSaved;

    } catch (err) {
        console.log(err.message)
        if (err) return { err };
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
    getUserBySellerId,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}