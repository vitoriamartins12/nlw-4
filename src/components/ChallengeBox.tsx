import { useContext, useState } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/componets/ChallengeBox.module.css';

export function ChallengeBox() {
    const { activeChallenge, resetChallenge, completeChallenge } = useContext (ChallengesContext);
    const { resetCountdown} =  useContext(CountdownContext);

    function handleChallengeSucceeded() {
        completeChallenge();
        resetCountdown();

    }

    function handleChallengeFailed() {
        resetChallenge();
        resetCountdown();

    }
   
    return (
        <div className= {styles.ChallengeBoxContainer}>
            { activeChallenge ? (
                <div className={styles.ChallengeActive}>
                    <header>Ganhe{activeChallenge.amount}xp</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} />
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer>
                        <button 
                            type="button"
                            className={styles.ChallengeFailedButton}
                            onClick={handleChallengeFailed}
                        >
                            Falhei
                        </button>
                        <button 
                        type="button"
                        className={styles.ChallengeSucceededButton}
                        onClick={handleChallengeSucceeded}
                        >
                            Conclui
                        </button>
                    </footer>
                </div>
            ) : (
                <div className={styles.ChallengeNotActive}>
                    <strong>Finalize um clico para receber um desafio.</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level Up" />
                        Avance de nivel completando os desafios.
                    </p>
                </div> 

            )}
        </div>
    )
}