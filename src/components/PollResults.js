import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

function PollResults(props) {
    const { avatarUrl, question, optionOneVotes, optionTwoVotes, totalVotes, active } = props
    return (<div className='summary'>
        <div className='avatar' style={{ backgroundImage: `url(.${avatarUrl})` }}></div>
        <div className='question'>
            <div style={{ fontWeight: '700', fontSize: '1.2em' }}>Would you rather</div>

            {active === 'optionOne' ?
                <div className='option active-option' style={{ cursor: 'context-menu' }}>
                    {question.optionOne.text} <FontAwesomeIcon icon={faCheckCircle} />
                    <div className='loader-box'>
                        <div className='loader' style={{ width: `${parseInt((optionOneVotes / totalVotes) * 100, 10)}%` }}>
                            {parseInt((optionOneVotes / totalVotes) * 100, 10)}%
            </div>
                    </div>
                    <div style={{ width: '100%', textAlign: 'center' }}>{optionOneVotes} out of {totalVotes} votes</div>
                </div>
                : <div className='option' >
                    {question.optionOne.text}
                    <div className='loader-box'>
                        <div className='loader' style={{ width: `${parseInt((optionOneVotes / totalVotes) * 100, 10)}%` }}>
                            {parseInt((optionOneVotes / totalVotes) * 100, 10)}%
            </div>
                    </div>
                    <div style={{ width: '100%', textAlign: 'center' }}>{optionOneVotes} out of {totalVotes}  votes</div>
                </div>}


            {active === 'optionTwo' ?
                <div className='option active-option' style={{ cursor: 'context-menu' }}>
                    {question.optionTwo.text} <FontAwesomeIcon icon={faCheckCircle} />
                    <div className='loader-box'>
                        <div className='loader' style={{ width: `${parseInt((optionTwoVotes / totalVotes) * 100, 10)}%` }}>
                            {parseInt((optionTwoVotes / totalVotes) * 100, 10)}%
            </div>
                    </div>
                    <div style={{ width: '100%', textAlign: 'center' }}>{optionTwoVotes} out of {totalVotes}  votes</div>
                </div>
                : <div className='option' >
                    {question.optionTwo.text}
                    <div className='loader-box'>
                        <div className='loader' style={{ width: `${parseInt((optionTwoVotes / totalVotes) * 100, 10)}%` }}>
                            {parseInt((optionTwoVotes / totalVotes) * 100, 10)}%
            </div>
                    </div>
                    <div style={{ width: '100%', textAlign: 'center' }}>{optionTwoVotes} out of {totalVotes}  votes</div>
                </div>}

        </div>
    </div>)
}

export default PollResults