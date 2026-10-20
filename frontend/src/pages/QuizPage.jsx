import { useState } from 'react';
import {
  ArrowLeft, ArrowRight, Check, CheckCircle2, ChevronRight, Grid2X2, X,
  IdCard, Lightbulb, Mail, MessageCircle, UsersRound, Utensils,
} from 'lucide-react';
import quizQuestions from '../data/quizQuestions.js';
import Header from '../components/Header.jsx';

const topics = [
  { icon: MessageCircle, title: <>Chào hỏi &amp;<br />Giao tiếp</>, studyTopic: 'Chào hỏi và giao tiếp', tone: 'pink' },
  { icon: IdCard, title: <>Danh thiếp</>, studyTopic: 'Danh thiếp', tone: 'blue' },
  { icon: Mail, title: <>Email<br />công việc</>, studyTopic: 'Email và công việc', tone: 'yellow' },
  { icon: UsersRound, title: <>Trong<br />cuộc họp</>, studyTopic: 'Trong cuộc họp', tone: 'green' },
  { icon: Utensils, title: <>Quy tắc<br />bàn ăn</>, studyTopic: 'Quy tắc bàn ăn', tone: 'purple' },
];

const quizStyles = `
  .mg-quiz { --quiz-navy: #102c68; --quiz-pink: #ff3e75; --quiz-blue: #4ba8f5; --quiz-green: #4fbd91; min-height: 100vh; padding: 0 0 26px; color: var(--quiz-navy); background: #eff9ff; font-family: 'Be Vietnam Pro', Arial, sans-serif; }
  .mg-quiz *, .mg-quiz *::before, .mg-quiz *::after { box-sizing: border-box; }
  .mg-quiz a { color: inherit; text-decoration: none; }
  .mg-quiz button { font: inherit; color: inherit; }
  .quiz-shell { width: min(100% - 54px, 1360px); margin: 17px auto 0; }
  .quiz-main-grid { display: grid; grid-template-columns: minmax(0, 1fr) 263px; gap: 17px; margin-top: 17px; }
  .quiz-question-card { min-width: 0; padding: 17px 18px 18px; border-radius: 22px; background: white; box-shadow: 0 5px 20px #18426d06; }
  .quiz-label-row { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
  .quiz-count-label, .quiz-category-label { min-height: 34px; display: inline-flex; align-items: center; gap: 8px; padding: 0 17px; border-radius: 20px; background: #cfe7ff; color: #16427d; font-size: 12px; font-weight: 700; }
  .quiz-label-divider { width: 1px; height: 27px; background: #dbe8f4; }
  .quiz-category-label { padding-inline: 15px; background: #ffe8ef; color: #f73870; font-size: 13px; }
  .quiz-question-content { display: grid; grid-template-columns: minmax(0, 1.12fr) minmax(0, .88fr); align-items: center; gap: 23px; }
  .quiz-scene { width: 100%; height: clamp(270px, 34vw, 385px); overflow: hidden; border-radius: 17px; background: #d9edff; }
  .quiz-scene svg { width: 100%; height: 100%; display: block; }
  .quiz-answer-panel { min-width: 0; }
  .quiz-answer-panel h1 { margin: 0 0 16px; color: #102d68; font: 900 clamp(18px, 1.8vw, 22px)/1.3 Nunito, 'Be Vietnam Pro', sans-serif; letter-spacing: -.35px; }
  .quiz-answer-list { display: grid; gap: 9px; }
  .quiz-answer { min-height: 46px; display: flex; align-items: center; gap: 11px; padding: 5px 10px; border: 1px solid #d8e8f9; border-radius: 13px; background: white; color: #223f70; text-align: left; font-size: 12px; line-height: 1.4; cursor: pointer; transition: border-color .15s, background .15s, transform .15s; }
  .quiz-answer:hover { border-color: #86c3ff; transform: translateY(-1px); }
  .quiz-answer-letter { width: 36px; height: 36px; flex: 0 0 36px; display: grid; place-items: center; border-radius: 50%; background: var(--quiz-blue); color: white; font-size: 16px; font-weight: 800; }
  .quiz-answer.selected { border-color: var(--quiz-pink); background: #ffe7ed; }
  .quiz-answer.selected .quiz-answer-letter { background: var(--quiz-pink); }
  .quiz-answer.wrong { border-color: #ff758d; background: #fff0f2; }
  .quiz-answer.wrong .quiz-answer-letter { background: #ff7187; }
  .quiz-answer.correct { border-color: #6ac49a; background: #edfaf3; }
  .quiz-answer.correct .quiz-answer-letter { background: #43af7e; }
  .quiz-answer-result { flex: 0 0 auto; margin-left: auto; }
  .quiz-answer-feedback { margin-top: 13px; padding: 12px 14px; border: 1px solid #cdebd9; border-radius: 13px; background: #f0faf4; color: #315e4a; }
  .quiz-answer-feedback.incorrect { border-color: #ffd3dd; background: #fff4f6; color: #734455; }
  .quiz-feedback-title { display: flex; align-items: center; gap: 7px; margin-bottom: 5px; color: #258455; font-size: 13px; font-weight: 800; }
  .quiz-answer-feedback.incorrect .quiz-feedback-title { color: #d34267; }
  .quiz-answer-feedback p { margin: 0; font-size: 11px; line-height: 1.6; }
  .quiz-feedback-correct { margin-top: 6px !important; font-weight: 700; }
  .quiz-question-actions { display: flex; justify-content: space-between; gap: 10px; margin-top: 19px; }
  .quiz-action { min-height: 46px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 0 19px; border: 1px solid #d7e7f8; border-radius: 26px; background: white; color: #17396f; font-size: 12px; font-weight: 600; white-space: nowrap; cursor: pointer; }
  .quiz-action:hover { border-color: #90b9eb; }
  .quiz-action.primary { min-width: 168px; border-color: transparent; background: linear-gradient(100deg, #ff5380, #ff3771); color: white; }
  .quiz-aside { min-width: 0; display: grid; align-content: start; gap: 16px; }
  .quiz-progress-panel { position: relative; min-height: 207px; padding: 20px 17px 17px; border-radius: 21px; background: white; box-shadow: 0 5px 20px #18426d06; }
  .quiz-progress-panel h2 { margin: 0 0 12px; font: 900 17px Nunito, 'Be Vietnam Pro', sans-serif; }
  .quiz-progress-bar { height: 15px; overflow: hidden; margin-right: 47px; border-radius: 10px; background: #e4f1fc; }
  .quiz-progress-bar span { height: 100%; display: block; border-radius: inherit; background: linear-gradient(90deg, #ff6689, #ff3972); transition: width .2s ease; }
  .quiz-progress-count { position: absolute; top: 55px; right: 18px; font-size: 13px; font-weight: 700; }
  .quiz-question-grid { display: grid; grid-template-columns: repeat(5, minmax(0,1fr)); gap: 8px; margin-top: 19px; }
  .quiz-question-grid button { aspect-ratio: 1; position: relative; display: grid; place-items: center; border: 1px solid #e1ebf8; border-radius: 12px; background: #fff; color: #526c96; font-size: 14px; cursor: pointer; }
  .quiz-question-grid button.current { border-color: var(--quiz-pink); background: var(--quiz-pink); color: #fff; font-weight: 700; }
  .quiz-question-grid button.answered { border-color: #d8f0e4; background: #e7f7ef; color: #318b69; }
  .quiz-question-grid button.answered.current { border-color: var(--quiz-pink); background: var(--quiz-pink); color: #fff; }
  .quiz-grid-check { position: absolute; top: 5px; right: 5px; }
  .quiz-tip-panel { min-height: 234px; position: relative; overflow: hidden; padding: 18px 15px 0; border-radius: 21px; background: linear-gradient(145deg, #fff0f4, #fff8f8); }
  .quiz-tip-heading { display: flex; align-items: center; gap: 9px; color: var(--quiz-pink); font: 900 15px Nunito, 'Be Vietnam Pro', sans-serif; white-space: nowrap; }
  .quiz-tip-bulb { width: 45px; height: 45px; flex: 0 0 45px; display: grid; place-items: center; border-radius: 50%; background: #ffe1e9; color: var(--quiz-pink); }
  .quiz-tip-speech { width: 83%; min-height: 89px; position: relative; z-index: 1; display: grid; place-items: center; margin: 13px auto 0; padding: 12px 19px; border: 1.5px solid #8ca9d3; border-radius: 50%; background: #fff; color: #284779; font-size: 11px; font-weight: 600; line-height: 1.55; text-align: center; transform: rotate(-5deg); }
  .quiz-tip-speech::after { content: ''; width: 14px; height: 14px; position: absolute; right: 23px; bottom: -9px; border-right: 1.5px solid #8ca9d3; border-bottom: 1.5px solid #8ca9d3; background: white; transform: rotate(30deg) skew(10deg, 10deg); }
  .quiz-tip-mascot { width: 142px; height: 139px; position: absolute; right: 5px; bottom: -35px; object-fit: contain; filter: drop-shadow(0 5px 4px #23446b20); }
  .quiz-spark { position: absolute; z-index: 2; right: 24px; bottom: 93px; color: #ffbd29; font-size: 25px; transform: rotate(-15deg); }
  .quiz-topics-panel { margin-top: 17px; padding: 13px 19px 16px; border-radius: 22px; background: white; box-shadow: 0 5px 20px #18426d06; }
  .quiz-topics-heading { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
  .quiz-topics-heading h2 { margin: 0; font: 900 16px Nunito, 'Be Vietnam Pro', sans-serif; }
  .quiz-topics-heading a { display: inline-flex; align-items: center; gap: 7px; color: #27518e; font-size: 12px; font-weight: 600; }
  .quiz-topic-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 10px; }
  .quiz-topic-card { min-height: 80px; display: grid; grid-template-columns: 54px minmax(0,1fr) 26px; align-items: center; gap: 9px; padding: 9px 10px; border: 2px solid white; border-radius: 16px; color: #17376d; font-size: 12px; font-weight: 700; line-height: 1.35; }
  .quiz-topic-card.pink { background: #fff3f6; }
  .quiz-topic-card.blue { background: #eef7ff; }
  .quiz-topic-card.yellow { background: #fff8e9; }
  .quiz-topic-card.green { background: #eff9f2; }
  .quiz-topic-card.purple { background: #f6f0ff; }
  .quiz-topic-icon { width: 48px; height: 48px; display: grid; place-items: center; border-radius: 50%; background: var(--quiz-pink); color: white; }
  .quiz-topic-card.blue .quiz-topic-icon { background: var(--quiz-blue); }
  .quiz-topic-card.yellow .quiz-topic-icon { background: #ffb624; }
  .quiz-topic-card.green .quiz-topic-icon { background: var(--quiz-green); }
  .quiz-topic-card.purple .quiz-topic-icon { background: #a45beb; }
  .quiz-topic-arrow { width: 27px; height: 27px; display: grid; place-items: center; border-radius: 50%; background: #ffe0e8; color: var(--quiz-pink); }
  .quiz-topic-card.blue .quiz-topic-arrow { background: #d5eaff; color: #348fe9; }
  .quiz-topic-card.yellow .quiz-topic-arrow { background: #ffebc3; color: #f2a515; }
  .quiz-topic-card.green .quiz-topic-arrow { background: #d6f0df; color: #46ae7d; }
  .quiz-topic-card.purple .quiz-topic-arrow { background: #e8d7ff; color: #9752df; }
  .quiz-result-panel { padding: 26px; text-align: center; }
  .quiz-result-panel h1 { margin: 0 0 12px; font: 900 27px Nunito, 'Be Vietnam Pro', sans-serif; }
  .quiz-result-panel p { margin: 0 auto 19px; color: #516b94; }
  @media (max-width: 1050px) {
    .quiz-shell { width: min(100% - 36px, 990px); }
    .quiz-main-grid { grid-template-columns: minmax(0,1fr) 235px; gap: 12px; }
    .quiz-question-card { padding-inline: 14px; }
    .quiz-question-content { gap: 14px; }
    .quiz-question-actions { gap: 6px; }
    .quiz-action { padding-inline: 12px; }
    .quiz-action.primary { min-width: 130px; }
    .quiz-progress-panel { padding-inline: 13px; }
    .quiz-progress-count { right: 13px; }
    .quiz-question-grid { gap: 6px; }
    .quiz-topic-card { grid-template-columns: 42px minmax(0,1fr) 23px; gap: 6px; padding-inline: 7px; font-size: 10px; }
    .quiz-topic-icon { width: 40px; height: 40px; }
  }
  @media (max-width: 760px) {
    .mg-quiz { padding-top: 0; }
    .quiz-shell { width: calc(100% - 24px); }
    .quiz-shell { margin-top: 10px; }
    .quiz-main-grid { grid-template-columns: minmax(0,1fr); gap: 10px; margin-top: 0; }
    .quiz-question-card { padding: 12px; border-radius: 16px; }
    .quiz-label-row { gap: 7px; margin-bottom: 10px; }
    .quiz-count-label, .quiz-category-label { min-height: 29px; gap: 5px; padding-inline: 10px; font-size: 10px; }
    .quiz-category-label { font-size: 10px; }
    .quiz-question-content { grid-template-columns: minmax(0,1fr); gap: 12px; }
    .quiz-scene { height: clamp(190px, 56vw, 300px); border-radius: 12px; }
    .quiz-answer-panel h1 { margin-bottom: 10px; font-size: 17px; }
    .quiz-answer-list { gap: 7px; }
    .quiz-answer { min-height: 42px; gap: 8px; padding: 4px 8px; border-radius: 11px; font-size: 10px; }
    .quiz-answer-letter { width: 32px; height: 32px; flex-basis: 32px; font-size: 14px; }
    .quiz-question-actions { margin-top: 12px; }
    .quiz-action { min-height: 39px; padding-inline: 11px; font-size: 10px; }
    .quiz-action.primary { min-width: 0; }
    .quiz-aside { grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 9px; }
    .quiz-progress-panel { min-height: 0; padding: 13px 10px; border-radius: 15px; }
    .quiz-progress-panel h2 { margin-bottom: 9px; font-size: 13px; }
    .quiz-progress-bar { height: 10px; margin-right: 38px; }
    .quiz-progress-count { top: 41px; right: 10px; font-size: 10px; }
    .quiz-question-grid { gap: 5px; margin-top: 12px; }
    .quiz-question-grid button { border-radius: 8px; font-size: 10px; }
    .quiz-grid-check { top: 2px; right: 2px; width: 11px; }
    .quiz-tip-panel { min-height: 185px; padding: 11px 9px 0; border-radius: 15px; }
    .quiz-tip-heading { gap: 5px; font-size: 11px; }
    .quiz-tip-bulb { width: 32px; height: 32px; flex-basis: 32px; }
    .quiz-tip-bulb svg { width: 19px; }
    .quiz-tip-speech { width: 92%; min-height: 65px; margin-top: 9px; padding: 7px 11px; font-size: 9px; }
    .quiz-tip-mascot { width: 102px; height: 102px; right: 0; bottom: -26px; }
    .quiz-spark { right: 16px; bottom: 58px; font-size: 18px; }
    .quiz-topics-panel { margin-top: 10px; padding: 11px; border-radius: 16px; }
    .quiz-topics-heading h2 { font-size: 13px; }
    .quiz-topics-heading a { font-size: 10px; }
    .quiz-topic-grid { grid-template-columns: repeat(2, minmax(0,1fr)); gap: 6px; }
    .quiz-topic-card { min-height: 63px; grid-template-columns: 34px minmax(0,1fr) 20px; gap: 5px; padding: 6px; border-radius: 11px; font-size: 9px; }
    .quiz-topic-icon { width: 33px; height: 33px; }
    .quiz-topic-icon svg { width: 18px; }
    .quiz-topic-arrow { width: 20px; height: 20px; }
    .quiz-topic-arrow svg { width: 13px; }
  }
  @media (max-width: 380px) {
    .quiz-shell { width: calc(100% - 16px); }
    .quiz-aside { grid-template-columns: 1fr; }
    .quiz-tip-panel { min-height: 180px; }
  }
`;

function MeetingScene() {
  return (
    <div className="quiz-scene" role="img" aria-label="Minh hoạ cuộc họp công sở Nhật Bản">
      <svg viewBox="0 0 660 520" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="quiz-wall" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#d7edff" /><stop offset="1" stopColor="#f5fbff" /></linearGradient>
          <linearGradient id="quiz-suit" x1="0" x2="1"><stop offset="0" stopColor="#243e5d" /><stop offset=".5" stopColor="#4b6584" /><stop offset="1" stopColor="#192f4b" /></linearGradient>
          <linearGradient id="quiz-table" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#bbd8f0" /><stop offset="1" stopColor="#809db9" /></linearGradient>
          <filter id="quiz-shadow" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#284560" floodOpacity=".2" /></filter>
        </defs>
        <rect width="660" height="520" fill="url(#quiz-wall)" />
        <path d="M0 0h128v274H0z" fill="#eaf6ff" stroke="#92bce4" strokeWidth="10" />
        <path d="M13 0v274M0 91h128M128 0l-8 16v242" fill="none" stroke="#a6c9e9" strokeWidth="7" />
        <path d="M226 48h399v225H226z" fill="#f8fcff" stroke="#9fc4e7" strokeWidth="12" />
        <path d="M249 82h168m-168 16h104" stroke="#d3e8fb" strokeWidth="5" />
        <path d="M262 213v-50h27v50m17 0v-83h28v83m17 0v-43h28v43" fill="#b9dcfa" />
        <path d="M462 203a62 62 0 0 1 124 0z" fill="#b8dbf8" />
        <path d="M524 203v-61m0 61 43-43m-43 43 57 1" stroke="#f5fbff" strokeWidth="4" />
        <path d="M0 280c41-49 71-61 113-38v100H0zM550 280c42-52 77-55 110-33v96H550z" fill="#acd5b1" />
        <path d="M16 287c29-33 52-43 81-25m475 22c28-37 47-43 77-30" fill="none" stroke="#7cba89" strokeWidth="11" strokeLinecap="round" />
        <path d="M0 374 660 350v170H0z" fill="url(#quiz-table)" />
        <path d="M0 404 660 380" stroke="#7493b1" strokeWidth="5" opacity=".48" />
        <g filter="url(#quiz-shadow)">
          <path d="M204 345h246l40 43H166z" fill="#394a60" />
          <path d="M222 385h14v82h-14m230-82h14v82h-14" fill="#27394e" />
          <rect x="279" y="340" width="112" height="73" rx="8" fill="#313e4c" />
          <path d="M287 347h96v55h-96z" fill="#9bb1c7" />
          <rect x="297" y="416" width="76" height="7" rx="3" fill="#202d3a" />
        </g>
        <g>
          <path d="M25 215c-3-54 28-91 71-91 42 0 67 39 58 94l-11 61H43z" fill="#493a3a" stroke="#382f32" strokeWidth="5" />
          <ellipse cx="96" cy="201" rx="47" ry="58" fill="#f2bb94" />
          <path d="M51 179c8-43 43-62 78-42 17 9 24 24 23 44-17-7-29-20-39-36-14 22-36 31-62 34z" fill="#51403d" />
          <ellipse cx="80" cy="202" rx="4" ry="6" fill="#27354a" /><ellipse cx="111" cy="202" rx="4" ry="6" fill="#27354a" />
          <path d="M84 224q13 13 26 0" fill="none" stroke="#ca5f56" strokeWidth="4" strokeLinecap="round" />
          <path d="M37 260h112l30 133H0v-45z" fill="url(#quiz-suit)" />
          <path d="m89 255 23 6-10 59-18 1-10-57z" fill="#f8f7f1" /><path d="m91 264 12 1-5 39-10-1z" fill="#2489d2" />
          <path d="M102 303c31 18 44 10 62-12 9-11 22 1 12 13-23 31-47 47-83 31z" fill="#f0b88f" stroke="#3a3940" strokeWidth="5" />
          <path d="M165 284c11-15 19-17 25-12m-20 24 23-7m-19 15 21 2" fill="none" stroke="#e5aa86" strokeWidth="5" strokeLinecap="round" />
          <path d="M48 325h54v72H42z" fill="#fffdf7" stroke="#8195a9" strokeWidth="3" transform="rotate(8 48 325)" />
        </g>
        <g>
          <path d="M-5 423c8-75 49-110 101-106 52 5 78 54 80 123l-22 80H0z" fill="#493c3b" />
          <ellipse cx="88" cy="452" rx="54" ry="65" fill="#eeb894" />
          <path d="M33 435c2-66 36-100 84-84 35 12 50 47 43 80-19-9-32-27-42-47-15 26-45 42-85 51z" fill="#493b3a" />
          <path d="M0 487c30-41 72-50 115-32l46 65H0z" fill="url(#quiz-suit)" />
        </g>
        <g>
          <path d="M507 414c8-71 39-103 82-99 48 5 75 48 77 112l-4 58H515z" fill="#493b3a" />
          <ellipse cx="578" cy="443" rx="49" ry="60" fill="#f1bd98" />
          <path d="M530 424c5-64 37-90 79-77 29 9 45 39 45 70-20-10-36-26-46-44-18 25-44 39-78 51z" fill="#493b3a" />
          <path d="M492 487c31-37 77-48 123-28l45 61H490z" fill="url(#quiz-suit)" />
        </g>
        <g filter="url(#quiz-shadow)">
          <path d="M306 318c-4-49 23-81 63-81s66 35 59 83l-10 55h-98z" fill="#8acb55" stroke="#264959" strokeWidth="7" />
          <ellipse cx="353" cy="304" rx="51" ry="44" fill="#a9dc63" />
          <ellipse cx="333" cy="278" rx="19" ry="24" fill="#9fd75b" stroke="#284454" strokeWidth="6" /><ellipse cx="377" cy="277" rx="19" ry="24" fill="#9fd75b" stroke="#284454" strokeWidth="6" />
          <ellipse cx="335" cy="280" rx="8" ry="11" fill="#fff" /><ellipse cx="379" cy="279" rx="8" ry="11" fill="#fff" />
          <ellipse cx="337" cy="282" rx="4" ry="6" fill="#182935" /><ellipse cx="381" cy="281" rx="4" ry="6" fill="#182935" />
          <circle cx="313" cy="313" r="9" fill="#ffb7ad" /><circle cx="397" cy="313" r="9" fill="#ffb7ad" />
          <path d="M345 318q12 17 25 0" fill="#f05d68" stroke="#244353" strokeWidth="4" />
          <path d="M338 363h41l-9 36h-24z" fill="#fff" /><path d="m352 365 16 1-5 33h-11z" fill="#2886d1" />
          <path d="M333 398h59l11 39h-81z" fill="#223b5b" stroke="#20344d" strokeWidth="5" />
          <path d="m335 397-18 20 23 11 16-19m28-12 18 23-22 10-14-19" fill="#29435e" />
          <path d="M330 207 337 229m31-28-1 25m29-17-10 22" stroke="#ffbb24" strokeWidth="9" strokeLinecap="round" />
        </g>
        <path d="M0 514h660" stroke="#607b95" strokeWidth="6" opacity=".5" />
      </svg>
    </div>
  );
}

function QuizTopicStrip() {
  return (
    <section className="quiz-topics-panel">
      <div className="quiz-topics-heading"><h2>Các chủ đề khác</h2><a href="/flashcards?view=topics">Xem tất cả <ArrowRight size={15} /></a></div>
      <div className="quiz-topic-grid">
        {topics.map(({ icon: Icon, title, studyTopic, tone }) => (
          <a className={`quiz-topic-card ${tone}`} href={`/flashcards?topic=${encodeURIComponent(studyTopic)}`} key={tone}>
            <span className="quiz-topic-icon"><Icon size={27} strokeWidth={2.2} /></span>
            <span>{title}</span>
            <span className="quiz-topic-arrow"><ChevronRight size={17} /></span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default function QuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);
  const questions = quizQuestions;
  const current = questions[currentIndex];
  const progress = Math.round(((currentIndex + 1) / questions.length) * 100);
  const score = Object.entries(answers).reduce((total, [index, selected]) => (
    total + (questions[Number(index)].correct === selected ? 1 : 0)
  ), 0);

  function chooseAnswer(answerIndex) {
    setAnswers((saved) => ({ ...saved, [currentIndex]: answerIndex }));
  }
  function goToQuestion(index) {
    setCurrentIndex(Math.max(0, Math.min(index, questions.length - 1)));
    setFinished(false);
  }
  function nextQuestion() {
    if (currentIndex === questions.length - 1) {
      setFinished(true);
      return;
    }
    goToQuestion(currentIndex + 1);
  }
  function previousQuestion() {
    if (currentIndex > 0) goToQuestion(currentIndex - 1);
  }

  return (
    <div className="mg-quiz">
      <style>{quizStyles}</style>
      <Header activePage="quiz" />
      <div className="quiz-shell">
        <main className="quiz-main-grid">
          <section className={`quiz-question-card${finished ? ' quiz-result-panel' : ''}`}>
            {finished ? (
              <>
                <h1>Hoàn thành bài quiz!</h1>
                <p>Bạn trả lời đúng <strong>{score}</strong> / {questions.length} câu. Tiếp tục luyện tập để tự tin hơn trong môi trường công sở Nhật nhé!</p>
                <button className="quiz-action primary" type="button" onClick={() => { setAnswers({}); goToQuestion(0); }}>Làm lại <ArrowRight size={17} /></button>
              </>
            ) : (
              <>
                <div className="quiz-label-row">
                  <span className="quiz-count-label">Câu {currentIndex + 1}/{questions.length}</span>
                  <span className="quiz-label-divider" />
                  <span className="quiz-category-label"><Grid2X2 size={17} fill="currentColor" /> {current.category}</span>
                </div>
                <div className="quiz-question-content">
                  <MeetingScene />
                  <section className="quiz-answer-panel">
                    <h1>{current.question}</h1>
                    <div className="quiz-answer-list">
                      {current.answers.map((answer, index) => {
                        const selected = answers[currentIndex] === index;
                        const isWrong = selected && index !== current.correct;
                        const showCorrect = answers[currentIndex] !== undefined && index === current.correct;
                        const selectedCorrectly = selected && index === current.correct;
                        return (
                          <button
                            className={`quiz-answer${selected ? ' selected' : ''}${isWrong ? ' wrong' : ''}${selectedCorrectly ? ' correct' : ''}`}
                            type="button"
                            key={answer}
                            aria-pressed={selected}
                            onClick={() => chooseAnswer(index)}
                          >
                            <span className="quiz-answer-letter">{String.fromCharCode(65 + index)}</span>
                            <span>{answer}</span>
                            {showCorrect && (selectedCorrectly
                              ? <CheckCircle2 className="quiz-answer-result" size={18} />
                              : answers[currentIndex] !== current.correct && <Check className="quiz-answer-result" size={18} />)}
                          </button>
                        );
                      })}
                    </div>
                    {answers[currentIndex] !== undefined && (
                      <div className={`quiz-answer-feedback${answers[currentIndex] === current.correct ? '' : ' incorrect'}`} role="status" aria-live="polite">
                        <div className="quiz-feedback-title">
                          {answers[currentIndex] === current.correct
                            ? <><CheckCircle2 size={17} /> Chính xác!</>
                            : <><X size={17} /> Chưa chính xác</>}
                        </div>
                        <p>{current.explanation}</p>
                        {answers[currentIndex] !== current.correct && (
                          <p className="quiz-feedback-correct">
                            Đáp án đúng: {String.fromCharCode(65 + current.correct)}. {current.answers[current.correct]}
                          </p>
                        )}
                      </div>
                    )}
                    <div className="quiz-question-actions">
                      <button className="quiz-action" type="button" onClick={previousQuestion} disabled={currentIndex === 0}><ArrowLeft size={17} /> Câu trước</button>
                      <button className="quiz-action primary" type="button" onClick={nextQuestion}>
                        {currentIndex === questions.length - 1 ? 'Xem kết quả' : 'Câu tiếp theo'} <ArrowRight size={17} />
                      </button>
                    </div>
                  </section>
                </div>
              </>
            )}
          </section>

          <aside className="quiz-aside">
            <section className="quiz-progress-panel">
              <h2>Tiến độ làm bài</h2>
              <div className="quiz-progress-bar"><span style={{ width: `${progress}%` }} /></div>
              <strong className="quiz-progress-count">{currentIndex + 1}/{questions.length}</strong>
              <div className="quiz-question-grid">
                {questions.map((_, index) => (
                  <button className={`${index === currentIndex ? 'current' : ''}${answers[index] !== undefined ? ' answered' : ''}`} type="button" key={index} aria-label={`Đi đến câu ${index + 1}`} aria-current={index === currentIndex ? 'step' : undefined} onClick={() => goToQuestion(index)}>
                    {answers[index] !== undefined && index !== currentIndex ? <Check className="quiz-grid-check" size={15} strokeWidth={3} /> : null}
                    {index + 1}
                  </button>
                ))}
              </div>
            </section>
            <section className="quiz-tip-panel">
              <div className="quiz-tip-heading"><span className="quiz-tip-bulb"><Lightbulb size={25} fill="currentColor" /></span>Mẹo nhỏ từ MannersGo</div>
              <p className="quiz-tip-speech">{current.hint}</p>
              <span className="quiz-spark" aria-hidden="true">✦</span>
              <img className="quiz-tip-mascot" src="/mannersgo/frog-good.png" alt="Ếch MannersGo chia sẻ mẹo học" />
            </section>
          </aside>
        </main>
        <QuizTopicStrip />
      </div>
    </div>
  );
}
