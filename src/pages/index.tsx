import Head from "next/head";
import { GetServerSideProps } from "next";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChallengeBox } from "../components/ChallengeBox";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { CountdownProvider } from "../contexts/CountdownContext";
import styles from '../styles/pages/Home.module.css';
import { ChallengesProvider } from "../contexts/ChallengesContext";
import { isNumberObject } from "util/types";



export default function Home (props) {
  return (
    <ChallengesProvider 
    level={props.level} 
    currentExpience={props.currentExpience} 
    challengesCompleted = {props.challengesCompleted}
    >
    <div className={styles.container}>
      
      <ExperienceBar/>
      
      <CountdownProvider>
      <section>
        <div>
          <Profile />
          <CompletedChallenges />
          <Countdown />
        </div>
        <div>
          <ChallengeBox />
        </div>
      </section>
      </CountdownProvider>
      <ToastContainer />
    </div>
    </ChallengesProvider>
  )
}

export const  getServerSideProps : GetServerSideProps = async (ctx) => {
  
  const {level, currentExpience, challengesCompleted} = ctx.req.cookies;

  return{
    props: {
      level: Number(level),
      currentExpience: Number(currentExpience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}  