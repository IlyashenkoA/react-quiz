import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import Timer, { StopTimerHandle } from '../Timer';
import Button from '../Button/Button';
import Intro from '../Intro/Intro';
import Section from '../Section/Section';

import { SaveDataHandle } from '../../types';

import { RootState } from '../../store/reducers';

import './App.css';

const App: React.FC = () => {
  const [questionId, setQuestionId] = useState<number>(0);
  const timerRef = useRef<StopTimerHandle>(null);
  const inputRef = useRef<SaveDataHandle>(null);

  const data = useSelector((state: RootState) => {
    return state.QuizReducer.data;
  });

  const onQuestionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setQuestionId(+e.currentTarget.value);
    inputRef.current?.saveData();
  };

  const onNextClick = () => {
    setQuestionId(prev => prev + 1);
    inputRef.current?.saveData();
  };

  useEffect(() => {
    if (questionId === data.length + 1) {
      timerRef.current && timerRef.current.stopTimer();
    }
  }, [questionId]);

  const onPreviousClick = () => {
    setQuestionId(prev => prev - 1);
    inputRef.current?.saveData();
  };

  return (
    <div className="container">
      <nav className='nav'>
        <div className='nav__timer'>
          {questionId > 0 && <Timer ref={timerRef} />}
        </div>
        <ul className='nav__button-group'>
          {questionId > 0 && data.map((item, index) => {
            return (
              <li key={index}>
                <Button label={item.id.toString()} value={item.id.toString()} onClick={onQuestionClick} />
              </li>
            );
          })}
        </ul>
      </nav>
      <main>
        {questionId === 0 ? <Intro /> : <Section data={data[questionId - 1]} inputRef={inputRef} />}
      </main>
      <div className='control'>
        {questionId > 1 && <Button label={'Previous question'} value='previousQuestion' onClick={onPreviousClick} />}
        <Button label={questionId === 0 ? "Start" : questionId === data.length ? 'Finish' : 'Next Question'} value='nextQuestion' onClick={onNextClick} />
      </div>
    </div>
  );
};

export default App;
