import React from 'react'

function Calculator() {

    return (
        <div className='calculator-area'>
            <div className='calculator-form'>
                <h4>Calculator</h4>
                <form>
                    <div className='label-area'>
                        <label>From what city</label><br/>
                        <input type={'text'}></input>
                    </div>
                    <div className='label-area'>
                        <label>To which city</label><br/>
                        <input type={'text'}></input>
                    </div>
                    <div className='product-area'>
                        <label>Select product</label><br/>
                        <input type={'text'}></input>
                    </div>

                </form>
                <div className='logistic-price'>
                    <p>transportation will cost ???$</p>
                </div>
            </div>
        </div>
    )
}

export default Calculator