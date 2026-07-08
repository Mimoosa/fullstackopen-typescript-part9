import { useState, useEffect } from "react";
import type { Diary, Weather, Visibility } from "./types.ts";
import diaryService from "./services/diaryService.ts";

const App = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [visibility, setVisibility] = useState<Visibility>("great");
  const [weather, setWeather] = useState<Weather>("sunny");
  const [comment, setComment] = useState("");
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    diaryService
      .getAll()
      .then((initialDiaries) => {
        setDiaries(initialDiaries);
      })
      .catch((errorResponse) => {
        console.log(errorResponse);
        setErrorMessage(errorResponse.data.error);

        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      });
  }, []);

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const diaryToAdd = {
      date: date,
      weather: weather,
      visibility: visibility,
      comment: comment,
    };
    diaryService
      .create(diaryToAdd)
      .then((returnedDiary) => {
        setDiaries(diaries.concat(returnedDiary));
      })
      .catch((errorResponse) => {
        console.log(errorResponse);
        setErrorMessage(errorResponse.data.error);

        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      });
    setDate(new Date().toISOString().slice(0, 10));
    setWeather("sunny");
    setVisibility("great");
    setComment("");
  };

  return (
    <div>
      <div>
        <h2>Add new entry</h2>
        <p style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}>
          {errorMessage}
        </p>
        <form onSubmit={diaryCreation}>
          {/* date */}
          <div>
            <label htmlFor="dateInput">date</label>
            <input
              id="dateInput"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>

          {/* visibility */}

          <div>
            <label htmlFor="vis-great">visibility</label>

            <input
              id="vis-great"
              type="radio"
              name="visibility"
              value="great"
              checked={visibility === "great"}
              onChange={() => setVisibility("great")}
            />
            <label htmlFor="vis-great">great</label>

            <input
              id="vis-good"
              type="radio"
              name="visibility"
              value="good"
              checked={visibility === "good"}
              onChange={() => setVisibility("good")}
            />
            <label htmlFor="vis-good">good</label>

            <input
              id="vis-ok"
              type="radio"
              name="visibility"
              value="ok"
              checked={visibility === "ok"}
              onChange={() => setVisibility("ok")}
            />
            <label htmlFor="vis-ok">ok</label>

            <input
              id="vis-poor"
              type="radio"
              name="visibility"
              value="poor"
              checked={visibility === "poor"}
              onChange={() => setVisibility("poor")}
            />
            <label htmlFor="vis-poor">poor</label>
          </div>

          {/* weather */}
          <div>
            <label htmlFor="weather-sunny">weather</label>

            <input
              id="weather-sunny"
              type="radio"
              name="weather"
              value="sunny"
              checked={weather === "sunny"}
              onChange={() => setWeather("sunny")}
            />
            <label htmlFor="weather-sunny">sunny</label>

            <input
              id="weather-rainy"
              type="radio"
              name="weather"
              value="rainy"
              checked={weather === "rainy"}
              onChange={() => setWeather("rainy")}
            />
            <label htmlFor="weather-rainy">rainy</label>

            <input
              id="weather-cloudy"
              type="radio"
              name="weather"
              value="cloudy"
              checked={weather === "cloudy"}
              onChange={() => setWeather("cloudy")}
            />
            <label htmlFor="weather-cloudy">cloudy</label>

            <input
              id="weather-stormy"
              type="radio"
              name="weather"
              value="stormy"
              checked={weather === "stormy"}
              onChange={() => setWeather("stormy")}
            />
            <label htmlFor="weather-stormy">stormy</label>

            <input
              id="weather-windy"
              type="radio"
              name="weather"
              value="windy"
              checked={weather === "windy"}
              onChange={() => setWeather("windy")}
            />
            <label htmlFor="weather-windy">windy</label>
          </div>

          {/* comment */}
          <div>
            <label htmlFor="commentInput">comment</label>
            <input
              id="commentInput"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
          </div>

          <button type="submit">add</button>
        </form>
      </div>
      <div>
        <h2>Diary entries</h2>
        <ul>
          {diaries.map((diary) => (
            <li key={diary.id}>
              date: {diary.date} weather: {diary.weather} visibility:{" "}
              {diary.visibility}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
