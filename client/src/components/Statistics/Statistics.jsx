import css from './Statistics.module.css'
import { relatedSongs } from '../../data'
import { BsArrowUpShort } from 'react-icons/bs'
import StatisticsChart from '../StatisticsChart/StatisticsChart'


const Statistics = ({ similarSongs }) => {
    return (
        <div className={`${css.container} theme-container`}>
            <span className={css.title}>Overview Statistics</span>

            <div className={`${css.cards} grey-container`}>

                <div>
                    <div className={css.arrowIcon}>
                        <BsArrowUpShort />
                    </div>

                    <div className={css.card}>
                        <span></span><span>Song Comparisons</span>
                    </div>
                </div>
                {
                    relatedSongs.map((item, index) => {
                        return <div className={css.card} key={index} >
                            <span>{item.title}</span><span>{item.effectiveness} %</span>
                        </div>
                    })
                }

            </div>


            <StatisticsChart similarSongs={similarSongs} />
        </div>
    )
}

export default Statistics
