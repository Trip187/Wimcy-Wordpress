import classes from "./navigation.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../store/user/user.action";
import { selectCurrentUser } from "../store/user/user.selector";
const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const signOutHandler = () => {
    dispatch(setCurrentUser(null));
  };
  return (
    <header className={classes.header}>
      <a to="/" className={classes["nav-link"]}>
        Home
      </a>
      <nav>
        <ul className={classes.navList}>
          <li>
            <a to="/photoshots" className={classes["nav-link"]}>
              Photoshots
            </a>
          </li>
          <li>
            <a to="/weddings" className={classes["nav-link"]}>
              Weddings
            </a>
          </li>
          <li>
            <a to="/Videos" className={classes["nav-link"]}>
              Videos
            </a>
          </li>
          {!currentUser && (
            <li>
              <a to="/login" className={classes["nav-link"]}>
                Login
              </a>
            </li>
          )}
          {currentUser && (
            <li>
              <span className={classes["nav-link"]} onClick={signOutHandler}>
                Sign Out
              </span>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};
export default Navigation;
