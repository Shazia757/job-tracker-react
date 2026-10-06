import { useState } from "react"

function Counter() {
    const [counterValue, setCounterValue] = useState(0)

    return (
        <>
            <h1>Counter</h1>
            <h3>{counterValue}</h3>
            <button onClick={function () {
                if (counterValue > 0) {
                    setCounterValue(prev => prev - 1)
                }
            }}>-</button>
            <button onClick={function () {
                setCounterValue(prev => prev + 1)
            }}>+</button>
        </>
    )
}
export default Counter