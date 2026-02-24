function ProgressBar({ launchDate, startDate }) {

  const totalDuration =
    new Date(launchDate) - new Date(startDate);

  const remaining =
    new Date(launchDate) - new Date();

  const progress =
    ((totalDuration - remaining) / totalDuration) * 100;

  return (
    <div className="progress-wrapper">
      <div
        className="progress-fill"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
export default ProgressBar