import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

function PollSummary(props) {

    const { avatarUrl, name, optionText } = props

    return (<div className='poll'>
        <div className='user-name'>{name} asks..</div>
        <div className='summary'>
            <div className='avatar' style={{ backgroundImage: `url(${avatarUrl})` }}></div>
            <div className='question'>
                <div style={{ fontWeight: '700', fontSize: '1.2em' }}>Would you rather</div>
                <div style={{ fontSize: '1.1em' }}>{optionText} ...</div>
                <div style={{ fontSize: '0.6em' }}><FontAwesomeIcon icon={faInfoCircle}/> Click to View Poll</div>
            </div>
        </div>
    </div>)

}

export default PollSummary;