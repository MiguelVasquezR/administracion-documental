import "./FigureStyle.css";

const Empty = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <p className="font-bold text-[32px]">
        Por el momento no tenemos contenido que mostrarte
      </p>
      <Figure />
    </div>
  );
};

const Figure = () => {
  return (
    <>
      {/* <!-- From Uiverse.io by elijahgummer -->  */}
      <div className="main-dog">
        <div className="dog">
          {/* <div className="dog__paws">
            <div className="dog__bl-leg leg">
              <div className="dog__bl-paw paw"></div>
              <div className="dog__bl-top top"></div>
            </div>
            <div className="dog__fl-leg leg">
              <div className="dog__fl-paw paw"></div>
              <div className="dog__fl-top top"></div>
            </div>
            <div className="dog__fr-leg leg">
              <div className="dog__fr-paw paw"></div>
              <div className="dog__fr-top top"></div>
            </div>
          </div> */}

          <div className="dog__body">
            <div className="dog__tail"></div>
          </div>

          <div className="dog__head">
            <div className="dog__snout">
              <div className="dog__nose"></div>
              <div className="dog__eyes">
                <div className="dog__eye-l"></div>
                <div className="dog__eye-r"></div>
              </div>
            </div>
          </div>

          <div className="dog__head-c">
            <div className="dog__ear-l"></div>
            <div className="dog__ear-r"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Empty;
