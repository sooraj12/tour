import { useState } from "react";
import Joyride, { STATUS } from "react-joyride";
import "./App.css";

function App() {
  const [{ run, steps }, setState] = useState({
    run: false,
    steps: [
      {
        content: <h2>Let's begin our journey!</h2>,
        locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
        target: "body",
        placement: "center",
      },
      {
        content: <h2>Sticky elements</h2>,
        target: ".star-burst",
      },
      {
        content: "These are our super awesome projects!",
        target: ".demo__projects h2",
        title: "Our projects",
      },
      {
        content: (
          <div>
            You can render anything!
            <br />
            <h3>Like this H3 title</h3>
          </div>
        ),
        target: ".demo__how-it-works h2",
        title: "Our Mission",
      },
      {
        content: (
          <div>
            <h3>All about us</h3>
            <svg
              height="50px"
              preserveAspectRatio="xMidYMid"
              viewBox="0 0 96 96"
              width="50px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  d="M83.2922435,72.3864207 C69.5357835,69.2103145 56.7313553,66.4262214 62.9315626,54.7138297 C81.812194,19.0646376 67.93573,0 48.0030634,0 C27.6743835,0 14.1459311,19.796662 33.0745641,54.7138297 C39.4627778,66.4942237 26.1743334,69.2783168 12.7138832,72.3864207 C0.421472164,75.2265157 -0.0385432192,81.3307198 0.0014581185,92.0030767 L0.0174586536,96.0032105 L95.9806678,96.0032105 L95.9966684,92.1270809 C96.04467,81.3747213 95.628656,75.2385161 83.2922435,72.3864207 Z"
                  fill="#000000"
                />
              </g>
            </svg>
          </div>
        ),
        placement: "left",
        target: ".demo__about h2",
      },
    ],
  });

  const handleClickStart = (event) => {
    event.preventDefault();

    setState({
      run: true,
      steps,
    });
  };

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      setState({ run: false, steps });
    }
  };

  return (
    <>
      <Joyride
        callback={handleJoyrideCallback}
        continuous
        hideCloseButton
        run={run}
        scrollToFirstStep
        showProgress
        showSkipButton
        steps={steps}
        // styles={{
        //   options: {
        //     zIndex: 10000,
        //   },
        // }}
      />
      <div className="App">
        <section className="demo__hero" variant="red">
          <div
            align="center"
            colorVariant="white"
            direction="column"
            display="flex"
            maxWidth={600}
          >
            <div className="star-burst">V2</div>

            <p align="center" style={{ fontSize: 32 }}>
              Create guided tours for your apps
            </p>
            <div mb="xl" variant="white" />
            <button
              type="button"
              onClick={handleClickStart}
              size="lg"
              variant="white"
            >
              Start
            </button>
          </div>
        </section>
        <section className="demo__projects" justify="start" variant="orange">
          <h2>OUR PROJECTS</h2>
        </section>
        <section className="demo__how-it-works" justify="start" variant="green">
          <h2>HOW DOES IT WORK</h2>
        </section>
        <section className="demo__about" justify="start" variant="blue">
          <h2>ABOUT US</h2>
        </section>
      </div>
    </>
  );
}

export default App;
