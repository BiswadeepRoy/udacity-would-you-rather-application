import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAward } from '@fortawesome/free-solid-svg-icons'

function LeaderSummary(props) {

    const { avatarUrl, name, answers, questions, position } = props

    return (<div className='poll'>
        <div className='user-name'>{name}</div>
        <div className='summary'>
            <div className='avatar' style={{ backgroundImage: `url(${avatarUrl})` }}></div>
            <div className='question' >
                <div style={position === 0 ? { color: 'gold', fontSize: '1.5em' } : position === 1 ?
                    { color: 'silver', fontSize: '1.5em' } : { color: 'brown', fontSize: '1.5em' }}>
                    <FontAwesomeIcon icon={faAward} /></div>
                <div style={{ fontWeight: '700' }}>{questions} polls created</div>
                <div style={{ fontWeight: '700' }}>{answers} polls voted</div>
            </div>
            <div className='score'>
                <div className='score-label'>score</div>
                <div className='score-value'>{answers + questions}</div>
            </div>
        </div>
    </div>)

}

export default LeaderSummary;