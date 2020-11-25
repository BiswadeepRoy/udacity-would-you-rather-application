function VotePoll(props) {
    const { avatarUrl, question, saveAnswer, setAnswer,active } = props
    return (<div className='summary'>
        <div className='avatar' style={{ backgroundImage: `url(.${avatarUrl})` }}></div>
        <div className='question'>
            <div style={{ fontWeight: '700', fontSize: '1.2em' }}>Would you rather</div>

            {active === 'optionOne' ?
                <div className='option active-option' onClick={() => setAnswer(question.optionOne.text, 'optionOne')}>
                    {question.optionOne.text} </div>
                : <div className='option' onClick={() => setAnswer(question.optionOne.text, 'optionOne')}>
                    {question.optionOne.text} </div>}


            {active === 'optionTwo' ?
                <div className='option active-option' onClick={() => setAnswer(question.optionTwo.text, 'optionTwo')}>
                    {question.optionTwo.text} </div>
                : <div className='option' onClick={() => setAnswer(question.optionTwo.text, 'optionTwo')}>
                    {question.optionTwo.text} </div>}

            <button style={{ padding: 10, fontSize: '1em' }} onClick={(event) => saveAnswer(event)}>Submit Poll</button>
        </div>
    </div>)
}

export default VotePoll