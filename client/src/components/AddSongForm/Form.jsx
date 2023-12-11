import React from 'react'
import css from "./Form.module.css"
import { useState } from 'react'

const Form = ({ getSongData, getSimilarSongs }) => {
    const [gender, setGender] = useState(0)
    const [age, setAge] = useState(0)
    const [weight, setWeight] = useState(0)
    const [bpm, setBpm] = useState(0)
    const [songTitle, setSongTitle] = useState("")
    return (
        <div>
            <form
                action=''
                className={css.form}
                onSubmit={(e) => {
                    e.preventDefault()
                    console.log(gender, age, weight, bpm, songTitle)
                    getSongData(gender, age, weight, bpm, songTitle)
                    getSimilarSongs(gender, age, weight, bpm, songTitle)
                }}
            >
                <span className={css.title}>General Information</span>
                <span>Gender</span>
                <div>
                    <input
                        type='radio'
                        onChange={
                            () => {
                                setGender(0)
                            }
                        }
                    />
                    <span>Male</span>
                </div>
                <div>
                    <input
                        type='radio'
                        onChange={
                            () => {
                                setGender(1)
                            }
                        }
                    />
                    <span>Female</span>
                </div>
                <span>Age</span>
                <input
                    type='text'
                    placeholder=''
                    className={css.input}
                    onChange={
                        (e) => {
                            setAge(e.target.value)
                        }
                    }

                />
                <span>Weight</span>
                <input
                    type='text'
                    placeholder=''
                    className={css.input}
                    onChange={
                        (e) => {
                            setWeight(e.target.value)
                        }
                    }
                />
                <span>Song / Genre</span>
                <input
                    type='text'
                    placeholder=''
                    className={css.input}
                    onChange={
                        (e) => {
                            setSongTitle(e.target.value)
                        }
                    }
                />
                <span>Heartbeats per minute</span>
                <input
                    type='text'
                    placeholder=''
                    className={css.input}
                    onChange={
                        (e) => {
                            setBpm(e.target.value)
                        }
                    }
                />
                <div className='pt-8 pb-4'>
                    <button className={css.button}>
                        Proceed
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Form
