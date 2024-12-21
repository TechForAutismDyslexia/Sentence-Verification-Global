const ProgressBar = ({ progressPercentage }) => {
  return (
    <div className="container my-3">
      <div className="row justify-content-center mt-5">
        <div className="col-12 col-md-8">
          <div className="progress">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated bg-primary"
              role="progressbar"
              style={{ width: `${progressPercentage}%` }}
              aria-valuenow={progressPercentage}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {progressPercentage}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
