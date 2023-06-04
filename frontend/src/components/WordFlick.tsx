/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

const WordFlick: React.FC<{ words: string[], styles?: string }> = ({ words, styles }) => {
    const speed: number = 36
    const skipDelay: number = 15
    const [i, setI] = useState<number>(0)
    const [part, setPart] = useState<string>('')
    const [offset, setOffset] = useState<number>(0)
    const [skipCount, setSkipCount] = useState<number>(0)
    const [forwards, setForwards] = useState<boolean>(true)

    useEffect(() => {
        const interval = setInterval(() => {
            if (forwards) {
                if (offset >= words[i].length) {
                    setSkipCount((prevCount: number) => prevCount + 1)
                    if (skipCount === skipDelay) {
                        setForwards(false)
                        setSkipCount(0)
                    }
                }
            } else {
                if (offset === 0) {
                    setForwards(true)
                    setI((prevI: number) => (prevI + 1) % words.length)
                    setOffset(0)
                }
            }
            const updatedPart: string = words[i].substr(0, offset)
            if (skipCount === 0) {
                if (forwards) {
                    setOffset((prevOffset: number) => prevOffset + 1)
                } else {
                    setOffset((prevOffset: number) => prevOffset - 1)
                }
            }
            setPart(updatedPart)
        }, speed)

        return () => clearInterval(interval)
    }, [forwards, i, offset, skipCount, words])

    return (
        <p className={styles}>
            {part}
        </p>
    )
}

export default WordFlick
