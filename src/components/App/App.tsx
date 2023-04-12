import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../Button/Button';
import Intro from '../Intro/Intro';
import Results from '../Results/Results';
import { Section } from '../Section/Section';
import Timer, { StopTimerHandle } from '../Timer/Timer';

import { setEmptyAnswers } from '../../store/action-creators/action-creators';
import { RootState } from '../../store/reducers';
import { LocalStorageKeys } from '../../types/localStorage';

import { clearLocalStorage } from '../../assets/js/utils/LocalStorage';

import './App.css';

const App: React.FC = () => {
  const [questionId, setQuestionId] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  /**
   * Ref's are used to call child functions, when moving between questions to save answers in state or stop the timer
   */
  const timerRef = useRef<StopTimerHandle>(null);

  const { data } = useSelector((state: RootState) => {
    return state.QuizReducer;
  });

  const dispatch = useDispatch();

  const onQuestionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setQuestionId(+e.currentTarget.value);
  };

  const onNextClick = () => {
    if (questionId === 0) {
      localStorage.setItem(LocalStorageKeys.QUIZ_STARTED, 'true');
    }

    setQuestionId(prev => prev + 1);
  };

  const getMobileViewPortUnits = useCallback(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, []);

  const resizeHandler = () => {
    getMobileViewPortUnits();
  };

  useEffect(() => {
    /**
     * In case the quiz was started, but not completed, show first question
     */
    if (localStorage.getItem(LocalStorageKeys.QUIZ_STARTED)
      && !localStorage.getItem(LocalStorageKeys.QUIZ_FINISHED)) {
      setQuestionId(1);
    }

    /**
     * In case the quiz was completed, show results
     */
    if (localStorage.getItem(LocalStorageKeys.QUIZ_FINISHED)) {
      setQuestionId(data.length + 1);
      setIsFinished(true);
    }

    getMobileViewPortUnits();
    window.addEventListener('resize', resizeHandler);

    return (() => {
      window.removeEventListener('resize', resizeHandler);
    });
  }, []);

  useEffect(() => {
    /**
     * In case the quiz was completed:
     * - Stop the timer
     * - Update the data in the localStorage that the quiz is over
     */
    if (questionId === data.length + 1) {
      setIsFinished(true);
      timerRef.current && timerRef.current.stopTimer();
      localStorage.setItem(LocalStorageKeys.QUIZ_FINISHED, 'true');
      localStorage.removeItem(LocalStorageKeys.QUIZ_STARTED);
    }
  }, [questionId]);

  const onPreviousClick = () => {
    /**
     * In case the quiz was completed and the button is used to retake the quiz:
     *  - Answers in state are cleared
     *  - LocalStorage is cleared
     *  - Intro appears
     *
     * Otherwise, go to the previous question and save the answers
     */
    if (isFinished && questionId === data.length + 1) {
      dispatch(setEmptyAnswers());
      clearLocalStorage();

      setIsFinished(false);
      setQuestionId(0);
    } else {
      setQuestionId(prev => prev - 1);
    }
  };

  const getButtonLabel = () => {
    if (questionId === 0) return 'Start';

    if (questionId === data.length && isFinished) return 'Results';

    if (questionId === data.length && !isFinished) return 'Finish';

    return 'Next Question';
  };

  return (
    <div className="container">
      <nav className='nav'>
        <div className='nav__timer'>
          {questionId > 0 && !isFinished
            ? <Timer ref={timerRef} setIsFinished={setIsFinished} setQuestionId={setQuestionId} />
            : null}
        </div>
        <ul className='nav__button-group'>
          {questionId > 0 && data.map((item, index) => {
            return (
              <li key={index}>
                <Button label={item.id.toString()} value={item.id.toString()} onClick={onQuestionClick} />
              </li>
            );
          })}
          {isFinished && <li>
            <Button label='results' value={(data.length + 1).toString()} onClick={onQuestionClick} />
          </li>}
        </ul>
      </nav>
      <main>
        {isFinished && questionId === data.length + 1
          ? <Results data={data} />
          : questionId === 0
            ? <Intro />
            : <Section
              data={data[questionId - 1]}
              isFinished={isFinished}
            />
        }
      </main>
      <div className='control'>
        {questionId > 1 &&
          <Button
            label={isFinished && questionId === data.length + 1 ? 'Repeat' : 'Previous question'}
            value='previousQuestion'
            onClick={onPreviousClick}
          />}
        {questionId < data.length + 1
          ? <Button label={getButtonLabel()} value='nextQuestion' onClick={onNextClick} />
          : null}
      </div>
    </div>
  );
};

export default App;
