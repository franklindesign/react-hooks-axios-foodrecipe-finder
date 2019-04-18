import React from "react";
import style from "./Recipe.module.scss";

const Recipe = ({
  title,
  calories,
  image,
  ingredients,
  source,
  healthLabels
}) => {
  return (
    <div className={style.recipe}>
      <p className={style.title}>{title}</p>
      <img src={image} alt="" />
      <ul>
        {healthLabels.map(healthLabel => (
          <li key={healthLabel} className={style.healthLabels}>
            {" "}
            {healthLabel}
          </li>
        ))}
      </ul>
      <div className={style.ingredients}>
        <ol>
          <p>
            <strong>Ingredients:</strong>{" "}
          </p>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient.text}</li>
          ))}
        </ol>
      </div>

      <p className={style.calories}>
        Total Calories: About {Math.ceil(calories)}
      </p>
      <div className={style.source}>
        <p className={style.sources}>Source: {source}</p>
      </div>
    </div>
  );
};

export default Recipe;
