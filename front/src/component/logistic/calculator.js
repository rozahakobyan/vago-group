import React from 'react'
import {Account} from "../../helpers/Account";
import translation from "../../assets/data/translation";

const language = Account.getLanguage();

function Calculator() {

    return (
        <div className='calculator-area'>
            <div className='calculator-form'>
                <h4>{translation.calculator[language]}</h4>
                <form>
                    <div className='label-area'>
                        <label>{translation.fromWhatCity[language]}</label><br/>
                        <input type={'text'}></input>
                    </div>
                    <div className='label-area'>
                        <label>{translation.toWhichCity[language]}</label><br/>
                        <input type={'text'}></input>
                    </div>
                    <div className='product-area'>
                        <label>{translation.selectProduct[language]}</label><br/>
                        <input type={'text'}></input>
                    </div>

                </form>
                <div className='logistic-price'>
                    <p>{translation.transportationWillCost[language]} ???$</p>
                </div>
            </div>
        </div>
    )
}

export default Calculator