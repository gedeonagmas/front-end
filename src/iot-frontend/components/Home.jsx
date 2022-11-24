import { useState } from "react";
import "./css/styles.css";
import {useFeedbackPostMutation} from './../../features/api/apiSlice';
import axios from 'axios';
import { Link } from "react-router-dom";

const Home = () => {
  const [feedbackPost]=useFeedbackPostMutation();
  const [thanks, setThanks] = useState(false);
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [feedback,setFeedback]=useState('');
  const submitHandler = () => {
    console.log(name,email,feedback);
    //const data=axios.post('http://localhost:2200/feedback/post',);
    feedbackPost({
      name,
      email,
      feedback,
      date:new Date().toISOString()
    });
    setThanks(true);
    setTimeout(() => {
      setThanks(false);
    }, 6000);
  };
  return (
    <div className="mt-10 home">
      <section class="section-hero parallax--bg--top">
        <div class="hero-container">
          <div class="cta">
            <div class="hero-text-container">
              <h2 class="primary-heading">
                <span class="cta1">DTU</span>
              </h2>
              <h2 class="primary heading">
                <span class="cta2">Internet</span>
              </h2>
              <h2 class="primary-heading">
                <span class="cta3">of</span>
              </h2>
            </div>
            <div class="hero-text-container">
              <h2 class="primary-heading">
                <span class="cta4">Things</span>
              </h2>
              <h2 class="primary-heading">
                <span class="cta5">(IoT)</span>
              </h2>
              <h2 class="primary-heading">
                <span class="cta6">Center</span>
              </h2>
            </div>
          </div>

          <p class="hero-text-discription">
            Come on students study, learn and build this promising future full
            of interconnected devices with us!
          </p>
        </div>
      </section>

      <section class="section-feature parallax--bg--bottom">
        <div class="feature-container">
          <div class="feature-sub-container">
            <div class="title-container">
              <h2 class="feature-title secondary-heading">What we do!</h2>
            </div>
            <div class="image-container">
              <img
                class="feature-img fi-1"
                src="./img/teach.jpg"
                alt="teacher teaching students"
              />
            </div>

            <div class="feature-text-container teach">
              <p class="feature-number">01</p>

              <h3 class="feature-heading tertiary-heading">
                teaching you all about IoT
              </h3>
              <p class="feature-description">
                our main goal is to introduce the concepts behind the
                development and implementation of IoT technologies to help you
                reach your goals.
              </p>
            </div>

            <div class="feature-text-container accept">
              <p class="feature-number">02</p>

              <h3 class="feature-heading tertiary-heading">
                help you in your projects
              </h3>
              <p class="feature-description">
                We give all the help we can for students who are attempting to
                create a brand-new project on the subjects we are involved in.
              </p>
            </div>

            <div class="image-container">
              <img
                class="feature-img fi-2"
                src="img/help.jpg"
                alt="instractor helping his student"
              />
            </div>

            <div class="image-container">
              <img
                class="feature-img fi-3"
                src="./img/internship.jpg"
                alt="a group of students hapily laughing"
              />
            </div>
            <div class="feature-text-contianer accept">
              <p class="feature-number">03</p>
              <h3 class="feature-heading tertiary-heading">
                Accept internship
              </h3>
              <p class="feature-description">
                We welcome students from different institutions and offer our
                own training by supporting them as they pursue careers as
                successful IoT developers.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="feedback">
        <div class="feedback-container">
          <div class="form">
            <div class="feedback-left ">
              <h2 className="text-white text-2xl font-extrabold w-[400px]">
                Give us your feedback
              </h2>
              <p className="text-white text-lg mt-7">
                tell us what you think about our institution, what should we
                improve? and what do you like about us?
              </p>
              <Link to='/feedback' className="absolute hover:bg-emerald-500 bg-emerald-400 text-white px-3 py-1 right-16 top-[440px] text-sm font-bold my-1">show feedback</Link>
            </div>
            <div class="feedback-right">
              <div class="input-container">
                <input
                  onChange={(e)=>setName(e.target.value)}
                  type="text"
                  name="name"
                  autocomplete="off"
                  class="input-name input"
                  placeholder="name"
                />
                <svg
                  class="line-svg"
                  width="300"
                  height="2"
                  viewBox="0 0 300 2"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    class="elastic-line"
                    d="M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512"
                    stroke="#D1D4DA"
                    stroke-width="2"
                  />
                </svg>
              </div>

              <div class="input-container text-xs">
                <input
                  onChange={(e)=>setEmail(e.target.value)}
                  type="email"
                  name="email"
                  autocomplete="off"
                  className="input-email input mt-2"
                  placeholder="email"
                />
                <svg
                  className="line-svg mt-2"
                  width="300"
                  height="2"
                  viewBox="0 0 300 2"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    class="elastic-line"
                    d="M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512"
                    stroke="#D1D4DA"
                    stroke-width="2"
                  />
                </svg>
              </div>

              <textarea
                onChange={(e)=>setFeedback(e.target.value)}
                name="feedback"
                className="feedback-ta mt-2"
                id="feedback"
                cols="30"
                rows="10"
                placeholder="write your feedback"
              ></textarea>
              {thanks && (
                <div className="absolute bg-white text-emerald-500 ml-44 border-4 font-extrabold border-emerald-500 px-2 py-2">
                  thank you for your feedback
                </div>
              )}
              <div class="link-container">
                <button onClick={submitHandler} class="link">
                  submit
                  <div class="wave"></div>
                </button>
              </div>
            </div>
            <svg
              width="241"
              id="character"
              height="336"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Group">
                <path
                  id="Vector"
                  d="m6.93 256.814 29.813 62.368-3.697 1.768a5.215 5.215 0 0 1-6.953-2.455L.776 265.535a5.218 5.218 0 0 1 2.456-6.953l3.698-1.768Z"
                  fill="#3A4279"
                />
                <path
                  id="Vector_2"
                  d="m39.389 242.73-20.576 8.506 11.543 16.323 18.24-5.566-9.207-19.263Z"
                  fill="#FFCCB3"
                />
                <path
                  id="Vector_3"
                  d="M26.246 251.887s8.033 12.408 9.245 19.34c1.211 6.933 5.362 42 4.245 45.161-.803 2.272-3.718 3.247-5.568 3.454a1.966 1.966 0 0 1-1.986-1.116L5.12 262.113a4 4 0 0 1 1.811-5.299c3.744-1.881 9.471-4.7 11.883-5.578 3.727-1.356 6.187-1.348 7.432.651Z"
                  fill="#00aeff"
                />
                <path
                  id="Vector_4"
                  d="m171.896 281.568-27.96 51.613a5.21 5.21 0 0 1-7.067 2.101l-3.604-1.952 32.926-60.782 3.604 1.953a5.212 5.212 0 0 1 2.101 7.067Z"
                  fill="#3A4279"
                />
                <path
                  id="Vector_5"
                  d="m134.488 256.843 20.119 9.534-12.353 15.719-17.936-6.48 10.17-18.773Z"
                  fill="#FFCCB3"
                />
                <path
                  id="Vector_6"
                  d="M147.15 266.652s-8.65 11.985-10.21 18.847c-1.56 6.863-7.477 41.675-6.522 44.889.687 2.31 3.549 3.431 5.386 3.73a1.963 1.963 0 0 0 2.04-1.013l29.889-55.174a3.999 3.999 0 0 0-1.541-5.384c-3.644-2.067-9.222-5.172-11.586-6.17-3.654-1.543-6.111-1.66-7.456.275Z"
                  fill="#00aeff"
                />
                <path
                  id="Vector_7"
                  d="M195.099 183.321s7.702 38.248 1.725 45.742L44.519 268.062l-12.988-24.328 88.939-40.358 17.812-24.414 56.817 4.359Z"
                  fill="#4E6797"
                />
                <path
                  id="Vector_8"
                  d="M83.823 181.09s-43.067-2.336-64.413-.46c-13.746 1.208-18.7 36.382-7.732 42.781L129.4 283.687l13.872-25.068-75.94-51.404 54.329-7.642-37.838-18.483Z"
                  fill="#4E6797"
                />
                <path
                  id="Vector_9"
                  d="M23.03 226.405c12.718 0 23.029-10.31 23.029-23.029s-10.31-23.029-23.03-23.029C10.31 180.347 0 190.657 0 203.376s10.31 23.029 23.03 23.029Z"
                  fill="#4E6797"
                />
                <path
                  id="Vector_10"
                  d="M192.998 229.379c12.719 0 23.03-10.31 23.03-23.03 0-12.718-10.311-23.029-23.03-23.029-12.719 0-23.029 10.311-23.029 23.029 0 12.72 10.31 23.03 23.029 23.03Z"
                  fill="#4E6797"
                />
                <path
                  id="Vector_11"
                  d="M141.342 109.706c8.293-2.778 12.764-11.753 9.987-20.046-2.778-8.293-11.753-12.764-20.046-9.987-8.293 2.778-12.765 11.753-9.987 20.046 2.778 8.293 11.753 12.765 20.046 9.987Z"
                  fill="#6392E8"
                />
                <path
                  id="Vector_12"
                  d="M139.933 122.545c-.416-2.503-1.247-7.51-2.141-12.073l-4.755-22.085s12.769 18.872 18.652 32.017c4.357 9.851 9.411 19.891 10.247 28.385l-10.033-11.967-10.731-12.789-1.239-1.488Z"
                  fill="#3A4279"
                />
                <path
                  id="Vector_13"
                  d="m223.729 59.417 6.96-12.849-6.96 12.849Z"
                  fill="#E56441"
                />
                <path
                  id="Vector_14"
                  d="m228.289 61.499 7.585-11.966-7.585 11.966Z"
                  fill="#E56441"
                />
                <path
                  id="Vector_15"
                  d="m233.708 63.8 4.335-7.248-4.335 7.247Z"
                  fill="#E56441"
                />
                <path
                  id="Vector_16"
                  d="M222.009 70.73c-.037-4.45-2.706-9.833-2.706-9.833l2.706 9.832Z"
                  fill="#E56441"
                />
                <g id="hand">
                  <path
                    id="Vector_17"
                    d="M129.913 97.679c-2.426-11.978 3.28-11.669 5.179-13.574 0 0 7.123-5.874 12.551-.398 5.745 5.792 38.679 50.784 38.679 50.784l-20.607 18.952-3.873-4.622-10.034-11.966-10.731-12.79-1.333-1.456-14.477-16.398s6.018-2.227 4.646-8.532Z"
                    fill="#6392E8"
                  />
                  <path
                    id="Vector_18"
                    d="M206.904 83.837c4.897-8.931 2.544-10.447 4.627-15.529 2.052-4.959-1.592-17.25 1.897-15.574 3.488 1.676 4.567 6.13 4.567 6.13 2.386-4.22 4.583-11.985 10.293-12.874 5.712-.889 6.218.909 9.455 3.565 8.612 7.166-2.37 17.934-4.203 22.035-1.179 2.57-9.844 10.407-10.804 12.12l-4.361 6.326-11.471-6.2Z"
                    fill="#FFCCB3"
                  />
                  <path
                    id="Vector_19"
                    d="m223.729 59.417 6.96-12.849"
                    stroke="#E56441"
                    stroke-width=".947"
                    stroke-linecap="round"
                  />
                  <path
                    id="Vector_20"
                    d="m228.289 61.499 7.585-11.966"
                    stroke="#E56441"
                    stroke-width=".947"
                    stroke-linecap="round"
                  />
                  <path
                    id="Vector_21"
                    d="m233.708 63.8 4.335-7.248"
                    stroke="#E56441"
                    stroke-width=".947"
                    stroke-linecap="round"
                  />
                  <path
                    id="Vector_22"
                    d="M222.009 70.73c-.037-4.45-2.706-9.833-2.706-9.833"
                    stroke="#E56441"
                    stroke-width=".947"
                    stroke-linecap="round"
                  />
                  <path
                    id="Vector_23"
                    d="m165.542 134.132 41.903-55.803a1.707 1.707 0 0 1 2.262-.351l10.973 7.255a2.536 2.536 0 0 1 .808 3.31l-33.697 62.145-22.249-16.556Z"
                    fill="#6392E8"
                  />
                </g>
                <path
                  id="Vector_24"
                  d="M175.722 157.701c7.75 0 14.032-6.282 14.032-14.032 0-7.749-6.282-14.032-14.032-14.032s-14.033 6.283-14.033 14.032c0 7.75 6.283 14.032 14.033 14.032Z"
                  fill="#6392E8"
                />
                <path
                  id="Vector_25"
                  d="M113.496 71.77s23.514 6.223 27.551 7.838c4.037 1.614 4.305 8.073 4.575 12.648.268 4.574-.635 107.317-.635 107.317l-52.04-2.001-38.92-22.782s1.692-81.522 2.231-85.29c.538-3.767-3.69-7.011.893-8.908l29.468-7.784 26.877-1.038Z"
                  fill="#6392E8"
                />
                <path
                  id="Vector_26"
                  d="m74.337 108.371.42 75.91-22.373-24.936 10.824-53.336 11.13 2.362Z"
                  fill="#3A4279"
                />
                <path
                  id="Vector_27"
                  d="M82.783 73.968s-3.329 6.695 0 11.314c3.33 4.618 16.656 9.104 25.761 8.972 9.104-.132 13.928-8.812 9.801-20.966l-15.079-4.236-16.645 3.756-3.838 1.16Z"
                  fill="#3A4279"
                />
                <path
                  id="Vector_28"
                  d="M120.472 16.269s6.557 14.147-.436 17.07c-6.993 2.922-6.178-16.384.436-17.07Z"
                  fill="#93523E"
                />
                <path
                  id="Vector_29"
                  d="m113.076 61.54 1.897 21.389s1.819 2.867-5.263 4.373c-4.556.97-16.824-3.864-19.203-5.314a4.925 4.925 0 0 1-2.396-5.802c.723-2.618 3.72-24.422 3.72-24.422l21.245 9.777Z"
                  fill="#FFCCB3"
                />
                <path
                  id="Vector_30"
                  d="m113.442 65.664-11.299-5.583 12.597 20.21-1.298-14.627Z"
                  fill="#FF967C"
                />
                <path
                  id="Vector_31"
                  d="M116.708 20.363s6.631 16.63 9.036 28.298c2.427 11.77-1.445 14.71-6.555 16.442-4.029 1.365-10.464 2.454-14.842 1.084-7.982-2.5-15.791-9.712-17.659-11.194-2.892-2.294-5.747-12.698-1.508-18.585 4.238-5.885 20.938-24.383 31.528-16.045Z"
                  fill="#FFCCB3"
                />
                <path
                  id="eye"
                  d="M108.17 43.319c.882-.347 1.167-1.72.637-3.065-.529-1.347-1.673-2.156-2.555-1.81-.882.347-1.168 1.72-.639 3.066.53 1.346 1.675 2.156 2.557 1.809Z"
                  fill="#080B09"
                />
                <path
                  id="eye"
                  d="M120.291 38.462c.882-.347 1.167-1.72.637-3.066-.529-1.345-1.673-2.156-2.555-1.808-.882.346-1.168 1.72-.638 3.065.529 1.346 1.674 2.156 2.556 1.81Z"
                  fill="#080B09"
                />
                <path
                  id="Vector_32"
                  d="M115.845 40.759s-1.077 3.26 1.187 2.942c2.152-.378 3.611.685 1.732 2.868"
                  fill="#E56441"
                />
                <path
                  id="Vector_33"
                  d="M115.845 40.759s-1.077 3.26 1.187 2.942c2.152-.378 3.611.685 1.732 2.868"
                  stroke="#E56441"
                  stroke-width=".947"
                  stroke-linecap="round"
                />
                <path
                  id="Vector_34"
                  d="m118.869 49.45.011-.002.011-.004a.186.186 0 0 1 .181.044.182.182 0 0 1 .051.18l-.007.027-.003.028c-.138 1.426-.493 2.273-.924 2.75-.417.46-.939.614-1.531.568-.608-.046-1.275-.302-1.922-.653a11.943 11.943 0 0 1-1.692-1.14.254.254 0 0 1-.067-.107.238.238 0 0 1-.004-.133.257.257 0 0 1 .065-.115.247.247 0 0 1 .116-.064l.003-.002c1.75-.442 4.39-1.065 5.712-1.377Z"
                  fill="#E56441"
                  stroke="#E56441"
                />
                <g id="eyebrow" fill="#080B09">
                  <path
                    id="left-eyebrow"
                    d="m100.491 37.62.166.233a1.581 1.581 0 0 0 2.158.565l6.116-3.768a1.388 1.388 0 0 0 .586-1.787 1.518 1.518 0 0 0-.891-.86 1.512 1.512 0 0 0-1.234.096l-6.283 3.536a1.45 1.45 0 0 0-.731.861 1.444 1.444 0 0 0 .113 1.124Z"
                  />
                  <path
                    id="right-eyebrow"
                    d="m121.622 27.955-7.179.666a1.505 1.505 0 0 0-1.312 1.837 1.384 1.384 0 0 0 1.497 1.136l7.174-.38a1.583 1.583 0 0 0 1.453-1.693l.005-.285a1.444 1.444 0 0 0-1.638-1.281Z"
                  />
                </g>
                <path
                  id="Vector_35"
                  d="M108.475 23.681s-3.583 6.818-10.083 8.84c-6.5 2.022-2.948 12.282-2.948 12.282s-4.458-4.434-9.582-1.938c-5.124 2.496-1.234 12.292 5.845 12.417L89.78 66.305s-3.585-4.466-7.355-6.855c-3.771-2.388-17.317-11.662-11.333-23.875 0 0-4.681-17.15 8.158-26.041 12.84-8.892 23.953-5.537 23.953-5.537S106.265-.858 113.36.134c7.095.992 8.731 13.785 6.382 18.413-2.35 4.627-6.179 6.593-11.267 5.134Z"
                  fill="#93523E"
                />
                <path
                  id="Vector_36"
                  d="M54.984 92.038c9.029-8.235 11.695-3.182 14.305-2.531 0 0 8.699 3.093 6.79 10.563-2.017 7.905-23.697 59.275-23.697 59.275l-26.846-7.941 1.975-5.698 5.111-14.756 5.46-15.778.563-1.892 6.63-20.845s5.004 4.02 9.709-.397Z"
                  fill="#6392E8"
                />
                <path
                  id="Vector_37"
                  d="M72.865 106.29c5.689-6.644 4.913-16.642-1.73-22.33-6.645-5.687-16.642-4.912-22.33 1.732-5.688 6.644-4.913 16.641 1.732 22.329 6.644 5.688 16.64 4.913 22.328-1.731Z"
                  fill="#6392E8"
                />
                <path
                  id="Vector_38"
                  d="M38.938 169.606c7.75 0 14.033-6.282 14.033-14.032s-6.282-14.032-14.033-14.032c-7.75 0-14.032 6.282-14.032 14.032s6.283 14.032 14.032 14.032Z"
                  fill="#6392E8"
                />
                <path
                  id="Vector_39"
                  d="m120.028 137.319-27.05 74.941H38.59a8.63 8.63 0 0 1 8.628-8.628h39.348l23.357-66.313h10.105Z"
                  fill="#fff"
                />
                <path
                  id="Vector_40"
                  d="M120.026 137.319h72.973l-28.222 74.941h-71.8l27.049-74.941Z"
                  fill="url(#paint0_linear_2_3)"
                />
                <path
                  id="Vector_41"
                  d="m49.725 146.728 49.843 48.841a1.709 1.709 0 0 1 .053 2.289l-8.629 9.929a2.54 2.54 0 0 1-3.388.368L30.4 166.62l19.324-19.892Z"
                  fill="#6392E8"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_2_3"
                  x1="140.498"
                  y1="137.141"
                  x2="153.471"
                  y2="296.846"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#fff" />
                  <stop offset="1" stop-color="#94B9FF" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.0/gsap.min.js"
        integrity="sha512-GQ5/eIhs41UXpG6fGo4xQBpwSEj9RrBvMuKyE2h/2vw3a9x85T1Bt0JglOUVJJLeyIUl/S/kCdDXlE/n7zCjIg=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      ></script>

      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.0/ScrollTrigger.min.js"
        integrity="sha512-6BvDODEWgjWWyBrg6YFio6xmzgKWpf54tDlnCtG05m++/jgh/7jQcx6jUJrq44lB84cf68FzYiT0LipabA5g8g=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      ></script>

      <script src="script.js"></script>
      <script src="parallax.js"></script>
    </div>
  );
};

export default Home;
