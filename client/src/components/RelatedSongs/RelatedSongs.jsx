import React from 'react'
import { relatedSongs } from '../../data'
import playBtn from "../../assets/icons/play-button-svgrepo-com.svg"
import css from './RelatedSongs.module.css'

const RelatedSongs = () => {
    return (
        <div className={`${css.container} theme-container`}>
            <div className={css.head}>
                <img src="./logo.png" alt="logo" />
                <span>Predictions</span>
            </div>

            <div className={`grey-container ${css.stat}`}>
                <span>Related Songs</span>
            </div>

            <div className={css.relatedSongs}>
                {
                    relatedSongs.map((relatedSong, index) => (
                        <div key={index} className={css.relatedSong}>
                            <div className={css.padding}>
                                <div className={css.col}>
                                    <span>{relatedSong.title}</span>
                                    <span>{relatedSong.genre}</span>
                                </div>
                                <div className={css.playBtn}>
                                    <img src={playBtn} alt="play" />
                                </div>
                            </div>
                            <hr className={css.divider} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default RelatedSongs
