function ProgressBar({ launchDate, startDate }) {
  //console.log(startDate);

  const totalDuration =
    new Date(launchDate) - new Date(startDate);
  const remaining =
    new Date(launchDate) - new Date();
  const progress =
    ((totalDuration - remaining) / totalDuration) * 100;
  //console.log(progress);
  return (
    <div className="progress-wrapper">
      <div
        className="progress-bar"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
export default ProgressBar