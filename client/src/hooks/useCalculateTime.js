
const useCalculateTime = () => {

    const calculateCompletionTime = (createdAt, updatedAt) => {
        const timec = new Date(createdAt)

        const createdTime = `${timec.getDate()}:${timec.getMonth()}:${timec.getFullYear()}`;

        if (!updatedAt) {
            return { createdTime }
        }
        else {
            const timeu = new Date(updatedAt)
            const updatedTime = `${timeu.getDate()}:${timeu.getMonth()}:${timeu.getFullYear()}`;
            const diff = timeu.getTime() - timec.getTime()
            const diffHour = (((diff / 1000) / 60) / 60)
            let diffResult;
            if (diffHour < 1) {
                diffResult = "less than 1 hour"

            }
            else if (diffHour < 24) {
                diffResult = `${diffHour} hours`

            }
            else {
                diffResult = (diffHour / 24).toFixed() + " days"

            }
            return {
                createdTime,
                updatedTime,
                diffResult
            }
        }
    }

    return { calculateCompletionTime }
}

export default useCalculateTime