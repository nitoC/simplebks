const { updateSeller } = require("../services/account")


const UpdateAccount = async (req, res) => {
    //   console.log(req);
    try {
        let { seller } = req.user
        let { city, state } = req.body

        let updateObject = {}

        if (!city && !state) {
            res.status(400).json({ message: 'bad request' })
        } else {
            if (city && state) {
                updateObject = { city, state }
            }
            if (city && !state) {
                updateObject = { city }
            }
            if (!city && state) {
                updateObject = { state }
            }

            let updatedSeller = await updateSeller(seller, updateObject)

            return res.status(200).json({ message: 'success', data: updatedSeller })
        }

    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: "oops! an error occured" })
    }
}

module.exports = UpdateAccount