

const useCalculateReadingTime = () => {

    const calculateReadingTime = (text) => {
        const wpm = 225;
        const wordsLength = text.trim().split(" ").length;
        const time = Math.ceil(wordsLength / wpm);
        return time
    }
    return { calculateReadingTime }
}

export default useCalculateReadingTime