import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import Timer, { StopTimerHandle } from '../Timer/Timer';
import Button from '../Button/Button';
import Intro from '../Intro/Intro';
import Section from '../Section/Section';
import Results from '../Results/Results';

import { SaveDataHandle } from '../../types/ref';
import { RootState } from '../../store/reducers';
import { LocalStorageKeys } from '../../types/localStorage';

import './App.css';

const App: React.FC = () => {
  const [questionId, setQuestionId] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

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
    if (questionId === 0) {
      setHasStarted(true);
    }

    setQuestionId(prev => prev + 1);
    inputRef.current?.saveData();
  };

  useEffect(() => {
    if (localStorage.getItem(LocalStorageKeys.QUIZ_ANSWERS)) {
      setQuestionId(1);
    }

    if (localStorage.getItem(LocalStorageKeys.QUIZ_FINISHED) && JSON.parse(localStorage.getItem(LocalStorageKeys.QUIZ_FINISHED)!) === true) {
      setQuestionId(data.length + 1);
    }
  }, []);

  useEffect(() => {
    if (questionId === data.length + 1) {
      timerRef.current && timerRef.current.stopTimer();
      setIsFinished(true);
    }
  }, [questionId]);

  const onPreviousClick = () => {
    if (isFinished) {
      setQuestionId(prev => prev - 1);
    } else {
      setQuestionId(prev => prev - 1);
      inputRef.current?.saveData();
    }
  };

  const getButtonLabel = () => {
    if (questionId === 0) return 'Start';

    if (questionId === data.length && isFinished) return 'Results';

    if (questionId === data.length && !isFinished) return 'Finish';

    return 'Next Question;';
  };

  return (
    <div className="container">
      <nav className='nav'>
        <div className='nav__timer'>
          {questionId > 0 && !isFinished ? <Timer ref={timerRef} setIsFinished={setIsFinished} /> : null}
        </div>
        <ul className='nav__button-group'>
          {questionId > 0 && data.map((item, index) => {
            return (
              <li key={index}>
                <Button label={item.id.toString()} value={item.id.toString()} onClick={onQuestionClick} />
              </li>
            );
          })}
          {isFinished && <li><Button label='results' value={(data.length + 1).toString()} onClick={onQuestionClick} /></li>}
        </ul>
      </nav>
      <main>
        {isFinished && questionId === data.length + 1 ? <Results data={data} /> : questionId === 0 ? <Intro /> : <Section data={data[questionId - 1]} inputRef={inputRef} />}
      </main>
      <div className='control'>
        {questionId > 1 && <Button label={'Previous question'} value='previousQuestion' onClick={onPreviousClick} />}
        {questionId < data.length + 1 ? <Button label={getButtonLabel()} value='nextQuestion' onClick={onNextClick} /> : null}
      </div>
    </div>
  );
};

export default App;
