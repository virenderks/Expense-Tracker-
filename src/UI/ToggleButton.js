import React from "react";
import classes from "./ToggleButton.module.css";
import { themeActions } from "../Store/ThemeRedux";
import { useSelector, useDispatch } from "react-redux";
const ToggleButton = () => {
  const isDark = useSelector((state) => state.theme.dark);
  const dispatch = useDispatch();
  const toggleThemeHandler = () => {
    dispatch(themeActions.toggleTheme());
  };
  return (
    <div className={classes.container}>
      <div
        className={`${classes.toggleButton} ${isDark && classes.dark}`}
        onClick={toggleThemeHandler}
      >
        {isDark && <div className={classes.toggleLeft}></div>}
        {!isDark && <div className={classes.toggleRight}></div>}
      </div>
    </div>
  );
};

export default ToggleButton;
