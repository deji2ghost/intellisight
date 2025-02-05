import axios from "axios"

export const fetchTransactions = async() => {
    try {
        const response = await axios.get("/data/transactions.json")
        return response.data
    } catch (error) {
        throw error
    }
}